'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import styles from './CategoryPills.module.css';

const categories = [
    { id: 'home', name: 'Home', icon: '🏠', slug: '' }, // For You / Home
    { id: 'electronics', name: 'Electronics', icon: '💻', slug: 'Electronics' },
    { id: 'fashion', name: 'Fashion', icon: '👕', slug: 'Fashion' },
    { id: 'grocery', name: 'Groceries', icon: '🛒', slug: 'Groceries' },
    { id: 'appliances', name: 'Appliances', icon: '🧺', slug: 'Home & Kitchen' },
    { id: 'beauty', name: 'Beauty', icon: '💄', slug: 'Beauty' },
    { id: 'sports', name: 'Sports', icon: '⚽', slug: 'Sports' },
    { id: 'books', name: 'Books', icon: '📚', slug: 'Books' },
    { id: 'toys', name: 'Toys', icon: '🎲', slug: 'Toys' },
];

export default function CategoryPills() {
    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const isScrolledDownRef = useRef(false);
    const lastScrollY = useRef(0);
    const isTransitioning = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        lastScrollY.current = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Always expand at the very top, forcibly
            if (currentScrollY <= 10) {
                if (isScrolledDownRef.current) {
                    setIsScrolledDown(false);
                    isScrolledDownRef.current = false;
                    
                    isTransitioning.current = true;
                    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
                    scrollTimeout.current = setTimeout(() => {
                        lastScrollY.current = window.scrollY;
                        isTransitioning.current = false;
                    }, 350);
                } else if (!isTransitioning.current) {
                    lastScrollY.current = currentScrollY;
                }
                return;
            }

            // Ignored during layout shift transitions to stop vibration loops
            if (isTransitioning.current) return;

            const delta = currentScrollY - lastScrollY.current;

            // Using 5px sensitivity for "instant" feel, without triggering on micro-jitters
            if (delta > 5 && !isScrolledDownRef.current) {
                // Scrolled down -> Shrink
                setIsScrolledDown(true);
                isScrolledDownRef.current = true;
                
                isTransitioning.current = true;
                if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
                scrollTimeout.current = setTimeout(() => {
                    lastScrollY.current = window.scrollY; // Reset anchor to post-shift position
                    isTransitioning.current = false;
                }, 350);
                
            } else if (delta < -5 && isScrolledDownRef.current) {
                // Scrolled up -> Expand
                setIsScrolledDown(false);
                isScrolledDownRef.current = false;
                
                isTransitioning.current = true;
                if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
                scrollTimeout.current = setTimeout(() => {
                    lastScrollY.current = window.scrollY;
                    isTransitioning.current = false;
                }, 350);
                
            } else if (!isTransitioning.current) {
                // If scrolling in the 'same' direction as current state, keep the anchor updated
                if ((delta > 0 && isScrolledDownRef.current) || (delta < 0 && !isScrolledDownRef.current)) {
                    lastScrollY.current = currentScrollY;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`${styles.categoryContainer} ${isScrolledDown ? styles.scrolled : ''}`}>
            <div className="container">
                <div className={styles.scrollWrapper}>
                    {categories.map((cat, idx) => (
                        <Link
                            key={cat.id}
                            href={cat.slug ? `/products?category=${encodeURIComponent(cat.slug)}` : '/products'}
                            className={`${styles.pill} ${idx === 0 ? styles.active : ''}`}
                        >
                            <span className={styles.iconContainer}>
                                <span className={styles.icon}>{cat.icon}</span>
                            </span>
                            <span className={styles.pillText}>{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
