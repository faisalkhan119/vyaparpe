import Link from 'next/link';
import styles from './Deals.module.css';
import PromoBanners from '@/components/PromoBanners';

export default function DealsPage() {
    const coupons = [
        { code: 'FLAT200', desc: '₹200 off on orders above ₹1,500', type: 'Flat', expires: 'Mar 31, 2026', minOrder: 1500 },
        { code: 'SAVE15', desc: '15% off on Electronics (Max ₹3,000)', type: 'Percentage', expires: 'Mar 25, 2026', minOrder: 2000 },
        { code: 'FREESHIP', desc: 'Free shipping on all orders', type: 'Free Shipping', expires: 'Apr 15, 2026', minOrder: 0 },
        { code: 'NEWUSER50', desc: '50% off on your first order (Max ₹500)', type: 'Percentage', expires: 'Dec 31, 2026', minOrder: 500 },
    ];

    const flashDeals = [
        { id: 'boat-airdopes-141', name: 'boAt Airdopes 141', price: 999, oldPrice: 2990, image: '🎵', endsIn: '2h 15m' },
        { id: 'prestige-mixer', name: 'Prestige Mixer Grinder', price: 2499, oldPrice: 4999, image: '🍳', endsIn: '5h 30m' },
        { id: 'levis-511-jeans', name: 'Levi\'s Men Jeans', price: 1299, oldPrice: 3599, image: '👖', endsIn: '1h 45m' },
    ];

    return (
        <main className={styles.dealsContainer}>
            <div className="container">
                <div className={styles.dealsHeader}>
                    <h1>Deals & Offers</h1>
                    <p>Grab the best discounts before they expire!</p>
                </div>

                <PromoBanners />

                {/* Flash Sales */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>⚡ Flash Sales</h2>
                    <div className={styles.flashGrid}>
                        {flashDeals.map((deal, i) => (
                            <Link href={`/product/${deal.id}`} key={i} className={`glass-panel ${styles.flashCard}`}>
                                <div className={styles.flashTimer}>Ends in {deal.endsIn}</div>
                                <div className={styles.flashImage}>{deal.image}</div>
                                <h3 className={styles.flashName}>{deal.name}</h3>
                                <div className={styles.flashPricing}>
                                    <span className={styles.flashPrice}>₹{deal.price.toLocaleString()}</span>
                                    <span className={styles.flashOld}>₹{deal.oldPrice.toLocaleString()}</span>
                                    <span className={styles.flashOff}>{Math.round((1 - deal.price / deal.oldPrice) * 100)}% OFF</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Coupons */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>🎁 Available Coupons</h2>
                    <div className={styles.couponGrid}>
                        {coupons.map((coupon, i) => (
                            <div key={i} className={styles.couponCard}>
                                <div className={styles.couponLeft}>
                                    <div className={styles.couponCode}>{coupon.code}</div>
                                    <div className={styles.couponType}>{coupon.type}</div>
                                </div>
                                <div className={styles.couponRight}>
                                    <div className={styles.couponDesc}>{coupon.desc}</div>
                                    <div className={styles.couponMeta}>
                                        {coupon.minOrder > 0 && <span>Min order: ₹{coupon.minOrder}</span>}
                                        <span>Expires: {coupon.expires}</span>
                                    </div>
                                    <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', marginTop: '0.75rem' }}>Copy Code</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
