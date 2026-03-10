'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Festival.module.css';
import { products } from '@/data/products';

export default function FestivalPage() {
    // Basic countdown timer logic
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else {
                    seconds = 59;
                    if (minutes > 0) minutes--;
                    else {
                        minutes = 59;
                        if (hours > 0) hours--;
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Find products with biggest discounts (> 40% off) for Steal Deals
    const stealDeals = products
        .filter(p => p.originalPrice > p.price && (1 - p.price / p.originalPrice) > 0.4)
        .slice(0, 6);

    const categories = [
        { name: 'Mobiles', offer: 'Up to 40% Off', icon: '📱', color: '#e8f0fe' },
        { name: 'Fashion', offer: 'Under ₹499', icon: '👕', color: '#fce8e6' },
        { name: 'Electronics', offer: 'Crazy Deals', icon: '💻', color: '#e6f4ea' },
        { name: 'Beauty', offer: 'Min 50% Off', icon: '💄', color: '#f3e8fd' },
    ];

    return (
        <main className={styles.festivalMain}>
            {/* HERO SECTION */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <div className={styles.badge}>Biggest Sale of the Year</div>
                    <h1 className={styles.heroTitle}>
                        <span className={styles.highlightText}>MAHA</span> BACHAT<br />
                        DAYS
                    </h1>
                    <p className={styles.heroSubtitle}>Unbeatable Offers. Once a Year Prices.</p>

                    <div className={styles.timerBox}>
                        <span>Ends in:</span>
                        <div className={styles.timeBlock}>
                            <span>{String(timeLeft.hours).padStart(2, '0')}</span><small>h</small>
                        </div>
                        <span className={styles.colon}>:</span>
                        <div className={styles.timeBlock}>
                            <span>{String(timeLeft.minutes).padStart(2, '0')}</span><small>m</small>
                        </div>
                        <span className={styles.colon}>:</span>
                        <div className={styles.timeBlock}>
                            <span>{String(timeLeft.seconds).padStart(2, '0')}</span><small>s</small>
                        </div>
                    </div>
                </div>

                {/* Decorative background elements */}
                <div className={styles.confetti1}>✨</div>
                <div className={styles.confetti2}>🎉</div>
                <div className={styles.confetti3}>🎁</div>
            </section>

            {/* BANK OFFER STRIP */}
            <section className={styles.bankStrip}>
                <div className="container">
                    <div className={styles.bankOfferContent}>
                        <span className={styles.bankIcon}>💳</span>
                        <strong>10% Instant Discount</strong> on HDFC Bank Credit Cards & EMI
                        <Link href="/deals" className={styles.knowMoreBtn}>Know More</Link>
                    </div>
                </div>
            </section>

            <div className="container">
                {/* STEAL DEALS (Horizontal Scroll) */}
                <section className={styles.sectionBlock}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>🔥 Steal Deals</h2>
                        <Link href="/products?sort=discount" className={styles.viewAllBtn}>View All →</Link>
                    </div>

                    <div className={styles.horizontalScroll}>
                        {stealDeals.map(product => {
                            const discount = Math.round((1 - product.price / product.originalPrice) * 100);
                            return (
                                <Link href={`/product/${product.id}`} key={product.id} className={styles.dealCard}>
                                    <div className={styles.discountBadge}>{discount}% OFF</div>
                                    <div className={styles.dealImage}>{product.image}</div>
                                    <div className={styles.dealInfo}>
                                        <h3 className={styles.dealName}>{product.title}</h3>
                                        <div className={styles.dealPriceRow}>
                                            <span className={styles.dealPrice}>₹{product.price.toLocaleString()}</span>
                                            <span className={styles.dealOriginalPrice}>₹{product.originalPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>

                {/* CATEGORY OFFERS */}
                <section className={styles.sectionBlock}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>🛍️ Top Offers by Category</h2>
                    </div>

                    <div className={styles.categoryGrid}>
                        {categories.map((cat, i) => (
                            <Link href={`/products?category=${encodeURIComponent(cat.name)}`} key={i} className={styles.categoryOfferCard} style={{ backgroundColor: cat.color }}>
                                <div className={styles.catOfferText}>
                                    <h3>{cat.name}</h3>
                                    <p className={styles.catOfferHighlight}>{cat.offer}</p>
                                </div>
                                <div className={styles.catOfferIcon}>{cat.icon}</div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* BANNER 2 */}
                <section className={styles.midBanner}>
                    <div className={styles.midBannerContent}>
                        <h2>Upgrade Your Electronics</h2>
                        <p>Extra ₹5000 Off on Exchange</p>
                        <Link href="/products?category=Electronics" className={styles.shopNowBtn}>Shop Now</Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
