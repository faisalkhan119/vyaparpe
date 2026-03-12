import Link from 'next/link';
import styles from './PromoBanners.module.css';

export default function PromoBanners({ category = '' }: { category?: string }) {
    const title = category ? `Top ${category} Deals` : 'Live Festive Sales';
    const isSpecialCategory = ['electronics', 'fashion', 'groceries'].includes(category.toLowerCase());

    return (
        <section className={styles.promoContainer}>
            <div className={styles.promoHeader}>
                <h2>🎉 {title}</h2>
            </div>
            <div className={styles.promoGrid}>
                {(!category || isSpecialCategory) ? (
                    <>
                        {/* Maha Bachat Days Banner */}
                        <Link href="/festival" className={`${styles.promoCard} ${styles.bbdBanner}`}>
                            <div className={styles.promoContent}>
                                <span className={styles.promoBadge}>Live Now</span>
                                <h3>MAHA BACHAT DAYS</h3>
                                <p>Biggest Sale of the Year</p>
                            </div>
                            <span className={`${styles.decoIcon} ${styles.confetti1}`}>🎉</span>
                            <span className={`${styles.decoIcon} ${styles.confetti2}`}>✨</span>
                            <span className={`${styles.decoIcon} ${styles.confetti3}`}>🎁</span>
                        </Link>

                        {/* Eid Special Banner */}
                        <Link href="/eid" className={`${styles.promoCard} ${styles.eidBanner}`}>
                            <div className={styles.promoContent}>
                                <span className={styles.promoBadge}>Special Edition</span>
                                <h3>EID MUBARAK SALE</h3>
                                <p>Grand Offers & Eidi Cashbacks</p>
                            </div>
                            <span className={`${styles.decoIcon} ${styles.lantern1}`}>🏮</span>
                            <span className={`${styles.decoIcon} ${styles.moon}`}>🌙</span>
                            <span className={`${styles.decoIcon} ${styles.star}`}>⭐</span>
                        </Link>
                    </>
                ) : (
                    <>
                        {/* Generic Generic Banner 1 */}
                        <Link href={`/products?category=${category}`} className={`${styles.promoCard}`} style={{ background: 'linear-gradient(135deg, #1fa2ff 0%, #12d8fa 50%, #a6ffcb 100%)' }}>
                            <div className={styles.promoContent}>
                                <span className={styles.promoBadge}>Trending</span>
                                <h3>BESTSELLERS IN {category.toUpperCase()}</h3>
                                <p>Explore Top Rated Items</p>
                            </div>
                        </Link>
                        {/* Generic Generic Banner 2 */}
                        <Link href={`/products?category=${category}`} className={`${styles.promoCard}`} style={{ background: 'linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)' }}>
                            <div className={styles.promoContent}>
                                <span className={styles.promoBadge}>Discount</span>
                                <h3>UP TO 50% OFF</h3>
                                <p>On select {category} products</p>
                            </div>
                        </Link>
                    </>
                )}
            </div>
        </section>
    );
}
