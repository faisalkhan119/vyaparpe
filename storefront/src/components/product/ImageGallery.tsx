'use client';
import { useState, useRef, useEffect } from 'react';
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
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
    const desktopVideoRef = useRef<HTMLVideoElement | null>(null);

    // Build media array: images + video (NO highlights here — they go in a separate section)
    const dynamicMedia = product?.images?.length ? [
        { id: 'm1', type: 'img', label: 'Front', content: variantImage || product.images[0] },
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

    const media = dynamicMedia;

    // Extended array for infinite mobile scrolling
    const extendedMedia = [
        { ...media[media.length - 1], id: `clone-start-${media[media.length - 1].id}` },
        ...media,
        { ...media[0], id: `clone-end-${media[0].id}` }
    ];

    // Mobile scroll observer
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

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

            if (visualIndex === 0) {
                realIndex = media.length - 1;
                isJumping = true;
                container.style.scrollBehavior = 'auto';
                container.scrollLeft = itemWidth * media.length;
                setTimeout(() => { isJumping = false; }, 50);
            } else if (visualIndex === maxIndex) {
                realIndex = 0;
                isJumping = true;
                container.style.scrollBehavior = 'auto';
                container.scrollLeft = itemWidth;
                setTimeout(() => { isJumping = false; }, 50);
            }

            if (realIndex !== mobileActiveIndex && realIndex >= 0 && realIndex < media.length) {
                setMobileActiveIndex(realIndex);
                Object.values(videoRefs.current).forEach(video => {
                    if (video && !video.paused) video.pause();
                });
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [mobileActiveIndex, media.length, extendedMedia.length]);

    const handleDesktopVideoClick = () => {
        if (desktopVideoRef.current) {
            if (desktopVideoRef.current.paused) {
                desktopVideoRef.current.play();
                setIsVideoPlaying(true);
            } else {
                desktopVideoRef.current.pause();
                setIsVideoPlaying(false);
            }
        }
    };

    // Highlight icons for Flipkart-style display
    const highlightIcons = ['🔋', '🎧', '📱', '⚡', '🛡️', '🎵', '🔊', '💎'];

    const renderOverlayHighlights = () => {
        if (!product?.highlights || product.highlights.length === 0) return null;
        return (
            <div className={styles.overlayHighlights}>
                <h3>Key Highlights</h3>
                <div className={styles.overlayList}>
                    {product.highlights.slice(0, 4).map((highlight, index) => (
                        <div key={index} className={styles.overlayItem}>
                            <span>{highlightIcons[index % highlightIcons.length]} Featured</span>
                            <p>{highlight}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.galleryWrapper}>
            {/* Desktop Flipkart-Style Grid Layout */}
            <div className={styles.desktopGrid}>
                {media.map((item, index) => (
                    <div 
                        key={item.id} 
                        className={`${styles.gridItem} ${item.type === 'video' ? styles.videoItem : ''}`}
                    >
                        {item.type === 'img' && index === 1 && renderOverlayHighlights()}
                        {item.type === 'img' && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={item.content} alt={item.label} loading="lazy" />
                        )}
                        
                        {item.type === 'video' && (
                            <div className={styles.videoContainer} onClick={handleDesktopVideoClick}>
                                <video 
                                    ref={desktopVideoRef}
                                    src={item.content}
                                    preload="metadata"
                                    controls={isVideoPlaying}
                                    playsInline
                                    onEnded={() => setIsVideoPlaying(false)}
                                    onPause={() => setIsVideoPlaying(false)}
                                    onPlay={() => setIsVideoPlaying(true)}
                                />
                                {!isVideoPlaying && (
                                    <div className={styles.playOverlay}>
                                        <div className={styles.playButton}>▶</div>
                                        <span className={styles.playLabel}>Watch Video</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Mobile Swipe Layout */}
            <div className={styles.mobileGalleryWrapper}>
                <div className={styles.swipeContainer} ref={scrollContainerRef}>
                    {extendedMedia.map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className={styles.swipeItem}>
                            
                            {item.type === 'img' && item.id !== media[0].id && renderOverlayHighlights()}
                            
                            {item.type === 'img' && (
                                <img src={item.content} alt={item.label} loading="lazy" />
                            )}

                            {item.type === 'video' && (
                                <video 
                                    src={item.content}
                                    controls 
                                    preload="metadata"
                                    playsInline
                                    ref={el => { if (idx >= 1 && idx <= media.length) videoRefs.current[idx - 1] = el; }}
                                />
                            )}
                            
                        </div>
                    ))}
                </div>
                
                {/* Floating Elements Over Mobile Gallery */}
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
