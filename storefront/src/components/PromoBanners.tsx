import Link from 'next/link';
import styles from './PromoBanners.module.css';

export default function PromoBanners() {
    return (
        <section className={styles.promoContainer}>
            <div className={styles.promoHeader}>
                <h2>🎉 Live Festive Sales</h2>
            </div>
            <div className={styles.promoGrid}>
                {/* Maha Bachat Days Banner */}
                <Link href="/festival" className={`${styles.promoCard} ${styles.bbdBanner}`}>
                    <div className={styles.promoContent}>
                        <span className={styles.promoBadge}>Live Now</span>
                        <h3>MAHA BACHAT DAYS</h3>
                        <p>Biggest Sale of the Year</p>
                    </div>
                    {/* Decorative Elements */}
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
                    {/* Decorative Elements */}
                    <span className={`${styles.decoIcon} ${styles.lantern1}`}>🏮</span>
                    <span className={`${styles.decoIcon} ${styles.moon}`}>🌙</span>
                    <span className={`${styles.decoIcon} ${styles.star}`}>⭐</span>
                </Link>
            </div>
        </section>
    );
}
