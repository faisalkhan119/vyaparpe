'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import styles from './CategoryPills.module.css';
import { getPlatformCategories } from '@/data/platformData';


export default function CategoryPills({ activeCategory = '', platform = 'vyaparpe' }: { activeCategory?: string; platform?: string }) {
    const categories = getPlatformCategories(platform);
    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const isScrolledDownRef = useRef(false);
    const lastScrollY = useRef(0);
    const isTransitioning = useRef(false);
    const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        lastScrollY.current = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

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

            if (isTransitioning.current) return;

            const delta = currentScrollY - lastScrollY.current;

            if (delta > 5 && !isScrolledDownRef.current) {
                setIsScrolledDown(true);
                isScrolledDownRef.current = true;
                
                isTransitioning.current = true;
                if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
                scrollTimeout.current = setTimeout(() => {
                    lastScrollY.current = window.scrollY;
                    isTransitioning.current = false;
                }, 350);
                
            } else if (delta < -5 && isScrolledDownRef.current) {
                setIsScrolledDown(false);
                isScrolledDownRef.current = false;
                
                isTransitioning.current = true;
                if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
                scrollTimeout.current = setTimeout(() => {
                    lastScrollY.current = window.scrollY;
                    isTransitioning.current = false;
                }, 350);
                
            } else if (!isTransitioning.current) {
                if ((delta > 0 && isScrolledDownRef.current) || (delta < 0 && !isScrolledDownRef.current)) {
                    lastScrollY.current = currentScrollY;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const platformParam = platform !== 'vyaparpe' ? `&platform=${platform}` : '';

    return (
        <div className={`${styles.categoryContainer} ${isScrolledDown ? styles.scrolled : ''}`}>
            <div className="container">
                <div className={styles.scrollWrapper}>
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={cat.slug ? `/?category=${encodeURIComponent(cat.slug)}${platformParam}` : `/${platform !== 'vyaparpe' ? `?platform=${platform}` : ''}`}
                            className={`${styles.pill} ${activeCategory.toLowerCase() === cat.slug.toLowerCase() ? styles.active : ''}`}
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

