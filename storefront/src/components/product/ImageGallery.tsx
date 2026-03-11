'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './ImageGallery.module.css';

interface ProductData {
    id: string;
    title: string;
    rating: number;
    reviewsCount: number;
    images?: string[];
    video?: string;
    highlights?: string[];
}

export default function ImageGallery({ product, variantImage }: { product?: ProductData, variantImage?: string }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

    // Dynamic media array based on product data if available, else fallback
    const dynamicMedia = product?.images?.length ? [
        { id: 'm1', type: 'img', label: 'Front', content: variantImage || product.images[0] },
        // Only map up to 3 extra images to leave room for video/highlights mock
        ...product.images.slice(1, 4).map((img: string, i: number) => ({ id: `m${i+2}`, type: 'img', label: `View ${i+2}`, content: img }))
    ] : [
        { id: 'm1', type: 'img', label: 'Front', content: variantImage || 'https://via.placeholder.com/600x600/f8fafc/334155?text=Front+View' },
        { id: 'm2', type: 'img', label: 'Angle', content: 'https://via.placeholder.com/600x800/f8fafc/334155?text=Tall+Angle+View' },
        { id: 'm4', type: 'img', label: 'Wearing', content: 'https://via.placeholder.com/800x600/f8fafc/334155?text=Wide+Wearing+View' },
    ];

    // Push Video if available
    if (product?.video) {
        dynamicMedia.push({ id: 'm-vid', type: 'video', label: 'Video', content: product.video });
    } else if (!product?.images?.length) {
        dynamicMedia.push({ id: 'm3', type: 'video', label: 'Video', content: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' });
    }

    // Push Highlights if available
    if (product?.highlights?.length) {
         dynamicMedia.push({ id: 'm-high', type: 'highlights', label: 'Details', content: 'Highlights' });
    } else if (!product?.images?.length) {
         dynamicMedia.push({ id: 'm5', type: 'highlights', label: 'Details', content: 'Highlights' });
    }

    const media = dynamicMedia;

    // Create extended array for infinite scrolling (clone last to start, clone first to end)
    const extendedMedia = [
        { ...media[media.length - 1], id: `clone-start-${media[media.length - 1].id}` },
        ...media,
        { ...media[0], id: `clone-end-${media[0].id}` }
    ];

    // Mobile scroll observer to detect which slide is currently viewed
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Initialize scroll to the first REAL slide (index 1 in extended array)
        if (container.scrollLeft === 0) {
            container.scrollLeft = container.clientWidth;
        }

        let isJumping = false;

        const handleScroll = () => {
            if (isJumping) return;

            const scrollLeft = container.scrollLeft;
            const itemWidth = container.clientWidth;
            const visualIndex = Math.round(scrollLeft / itemWidth);
            const maxIndex = extendedMedia.length - 1;
            
            let realIndex = visualIndex - 1;

            // Handle infinite loop jumps
            if (visualIndex === 0) {
                // Reached start clone -> jump to real last slide
                realIndex = media.length - 1;
                isJumping = true;
                container.style.scrollBehavior = 'auto'; // Disable smooth scrolling momentarily
                container.scrollLeft = itemWidth * media.length;
                setTimeout(() => {
                    isJumping = false;
                }, 50);
            } else if (visualIndex === maxIndex) {
                // Reached end clone -> jump to real first slide
                realIndex = 0;
                isJumping = true;
                container.style.scrollBehavior = 'auto'; // Disable smooth scrolling momentarily
                container.scrollLeft = itemWidth;
                setTimeout(() => {
                    isJumping = false;
                }, 50);
            }

            if (realIndex !== mobileActiveIndex && realIndex >= 0 && realIndex < media.length) {
                setMobileActiveIndex(realIndex);

                // Auto pause all videos when they leave screen
                Object.values(videoRefs.current).forEach(video => {
                    if (video && !video.paused) {
                        video.pause();
                    }
                });
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [mobileActiveIndex, media.length, extendedMedia.length]);

    return (
        <div className={styles.galleryWrapper}>
            {/* Desktop Flipkart-Style Grid Layout */}
            <div className={styles.desktopGrid}>
                {media.map((item) => (
                    <div 
                        key={item.id} 
                        className={`${styles.gridItem} ${item.type === 'video' ? styles.videoItem : ''}`}
                    >
                        {item.type === 'img' && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={item.content} alt={item.label} loading="lazy" />
                        )}
                        
                        {item.type === 'video' && (
                            <video 
                                src={item.content}
                                preload="metadata"
                                poster="https://via.placeholder.com/600x400/000/fff?text=Play+Video"
                                controls={false}
                            />
                        )}

                        {item.type === 'highlights' && (
                            <div className={styles.gridHighlights}>
                                <h3>Key Highlights</h3>
                                <ul>
                                    {product?.highlights?.map((highlight, index) => (
                                        <li key={index}>{highlight}</li>
                                    )) || (
                                        <>
                                            <li>Premium Active Noise Cancellation</li>
                                            <li>Up to 30 hours of battery life</li>
                                            <li>Ultra-comfortable lightweight design</li>
                                            <li>Multipoint connection for 2 devices</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Mobile Swipe Layout */}
            <div className={styles.mobileGalleryWrapper}>
                <div className={styles.swipeContainer} ref={scrollContainerRef}>
                    {extendedMedia.map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className={`${styles.swipeItem} ${item.type === 'highlights' ? styles.highlightsSlide : ''}`}>
                            
                            {item.type === 'img' && (
                                /* We use real img tags here with placehold.co to demonstrate variable sizes fitting into the box */
                                <img src={item.content} alt={item.label} loading="lazy" />
                            )}

                            {item.type === 'video' && (
                                <video 
                                    src={item.content}
                                    controls 
                                    preload="metadata"
                                    // only assign ref to the REAL video items, not clones, to avoid playback confusion
                                    ref={el => { if (idx >= 1 && idx <= media.length) videoRefs.current[idx - 1] = el; }}
                                    poster="https://via.placeholder.com/600x400/000/fff?text=Play+Video"
                                />
                            )}

                            {item.type === 'highlights' && (
                                <div>
                                    <h3>Key Highlights</h3>
                                    <ul>
                                        {product?.highlights?.map((highlight, index) => (
                                            <li key={index}>{highlight}</li>
                                        )) || (
                                            <>
                                                <li>Premium Active Noise Cancellation</li>
                                                <li>Up to 30 hours of battery life</li>
                                                <li>Ultra-comfortable lightweight design</li>
                                                <li>Multipoint connection for 2 devices</li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            )}
                            
                        </div>
                    ))}
                </div>
                
                {/* Floating Elements Over Mobile Gallery (Hidden on video/highlights) */}
                {/* Moved OUTSIDE .swipeContainer so they hover perfectly still */}
                {product && (
                    <div className={`${styles.imageOverlay} ${media[mobileActiveIndex]?.type !== 'img' ? styles.hidden : ''}`}>
                        <div className={styles.topActions}>
                            <button 
                                className={styles.actionBtn} 
                                aria-label="Share product"
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: product.title,
                                            url: window.location.href
                                        });
                                    }
                                }}
                            >
                                📤
                            </button>
                        </div>
                        <div className={styles.bottomActions}>
                            <a 
                                href="#reviews"
                                className={styles.ratingBadge}
                            >
                                <span className={styles.star}>★</span>
                                {product.rating}
                                <span className={styles.count}>({product.reviewsCount})</span>
                            </a>
                        </div>
                    </div>
                )}

                {/* Progress Indicators */}
                <div className={styles.indicatorContainer}>
                    {media.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`${styles.indicatorDot} ${mobileActiveIndex === idx ? styles.active : ''}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
