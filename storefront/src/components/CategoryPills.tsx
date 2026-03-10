'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
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
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDifference = currentScrollY - lastScrollY;

            // Apply hysteresis: only change state if scroll amount is significant (>20px)
            if (Math.abs(scrollDifference) > 20) {
                if (scrollDifference > 0 && currentScrollY > 50) {
                    setIsScrolledDown(true); // Scrolling down significantly - compress!
                } else if (scrollDifference < 0) {
                    setIsScrolledDown(false); // Scrolling up significantly - expand!
                }
                setLastScrollY(currentScrollY);
            }

            // Always expand at the very top, regardless of threshold
            if (currentScrollY < 10) {
                setIsScrolledDown(false);
                setLastScrollY(currentScrollY);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

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
