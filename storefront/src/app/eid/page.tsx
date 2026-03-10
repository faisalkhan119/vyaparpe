'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Eid.module.css';
import { products } from '@/data/products';

export default function EidPage() {
    // Eidi Countdown timer logic
    const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 12, minutes: 45, seconds: 30 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else {
                    seconds = 59;
                    if (minutes > 0) minutes--;
                    else {
                        minutes = 59;
                        if (hours > 0) hours--;
                        else {
                            hours = 23;
                            if (days > 0) days--;
                        }
                    }
                }
                return { days, hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Find products suitable for Eid (Fashion, Beauty, Books)
    const eidDeals = products
        .filter(p => ['Fashion', 'Beauty', 'Books'].includes(p.category))
        .slice(0, 6);

    const categories = [
        { name: 'Fashion', offer: 'Festive Wear Min 50% Off', icon: '👗', color: '#e0f2f1' },
        { name: 'Beauty', offer: 'Makeup & Grooming', icon: '✨', color: '#f3e5f5' },
        { name: 'Groceries', offer: 'Dry Fruits & Sweets', icon: '🍬', color: '#fff8e1' },
        { name: 'Home & Kitchen', offer: 'Serveware & Decor', icon: '🍽️', color: '#e8eaf6' },
    ];

    return (
        <main className={styles.eidMain}>
            {/* HERO SECTION */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <div className={styles.badge}>🌙 EID-UL-FITR SPECIAL</div>
                    <h1 className={styles.heroTitle}>
                        <span className={styles.highlightText}>EID MUBARAK</span><br />
                        GRAND SALE
                    </h1>
                    <p className={styles.heroSubtitle}>Celebrate with Joy. Share the Blessings. Grab the Best Eidi!</p>

                    <div className={styles.timerBox}>
                        <span>Offers end in:</span>
                        <div className={styles.timeBlock}>
                            <span>{String(timeLeft.days).padStart(2, '0')}</span><small>d</small>
                        </div>
                        <span className={styles.colon}>:</span>
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
                <div className={styles.lantern1}>🏮</div>
                <div className={styles.moon}>🌙</div>
                <div className={styles.lantern2}>🏮</div>
                <div className={styles.star1}>⭐</div>
                <div className={styles.star2}>✨</div>
            </section>

            {/* EIDI OFFER STRIP */}
            <section className={styles.eidiStrip}>
                <div className="container">
                    <div className={styles.eidiOfferContent}>
                        <span className={styles.eidiIcon}>🎁</span>
                        <strong>Special Eidi:</strong> Get Flat ₹500 Cashback on your first festive order above ₹2000!
                        <Link href="/deals" className={styles.claimNowBtn}>Claim Now</Link>
                    </div>
                </div>
            </section>

            <div className="container">
                {/* CATEGORY OFFERS */}
                <section className={styles.sectionBlock}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>🕌 Festive Store</h2>
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

                {/* EID PICKS (Horizontal Scroll) */}
                <section className={styles.sectionBlock}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>✨ Top Picks for You</h2>
                        <Link href="/products" className={styles.viewAllBtn}>View All →</Link>
                    </div>

                    <div className={styles.horizontalScroll}>
                        {eidDeals.map(product => {
                            const discount = Math.round((1 - product.price / product.originalPrice) * 100);
                            return (
                                <Link href={`/product/${product.id}`} key={product.id} className={styles.dealCard}>
                                    {discount > 0 && <div className={styles.discountBadge}>{discount}% OFF</div>}
                                    <div className={styles.dealImage}>{product.image}</div>
                                    <div className={styles.dealInfo}>
                                        <h3 className={styles.dealName}>{product.title}</h3>
                                        <div className={styles.dealPriceRow}>
                                            <span className={styles.dealPrice}>₹{product.price.toLocaleString()}</span>
                                            {product.originalPrice > product.price && (
                                                <span className={styles.dealOriginalPrice}>₹{product.originalPrice.toLocaleString()}</span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>

                {/* BANNER 2 */}
                <section className={styles.midBanner}>
                    <div className={styles.midBannerContent}>
                        <h2>Send Gifts to Loved Ones</h2>
                        <p>Beautiful packaging and express delivery available.</p>
                        <Link href="/gift-cards" className={styles.shopNowBtn}>Explore Gift Cards</Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
