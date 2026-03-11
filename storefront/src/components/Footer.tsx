'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerGrid}>
                    <div className={styles.brandSection}>
                        <div className={styles.logo}>
                            <Image src="/vyapaarpe_logo.jpg" alt="VyaparPe" width={140} height={44} className={styles.logoImg} />
                        </div>
                        <p className={styles.brandDesc}>
                            Empowering local businesses and premium sellers. Experience next-gen e-commerce built for speed, security, and scale.
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="https://twitter.com/vyaparpe" target="_blank" rel="noopener noreferrer" aria-label="Twitter">𝕏</a>
                            <a href="https://instagram.com/vyaparpe" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
                            <a href="https://linkedin.com/company/vyaparpe" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">💼</a>
                        </div>
                    </div>

                    <div className={styles.linkGroup}>
                        <h4>Shop</h4>
                        <ul>
                            <li><Link href="/products">All Products</Link></li>
                            <li><Link href="/products">Category Directory</Link></li>
                            <li><Link href="/deals">Flash Sales</Link></li>
                            <li><Link href="/">Store Locator</Link></li>
                            <li><Link href="/gift-cards">Gift Cards</Link></li>
                            <li><Link href="/sell" style={{ fontWeight: 600, color: 'var(--primary)' }}>Sell on VyaparPe</Link></li>
                        </ul>
                    </div>

                    <div className={styles.linkGroup}>
                        <h4>Customer Service</h4>
                        <ul>
                            <li><Link href="/account/orders">Track Order</Link></li>
                            <li><Link href="/legal/refund">Returns & Refunds</Link></li>
                            <li><Link href="/help">Help Center</Link></li>
                            <li><Link href="/legal/terms">Shipping Policy</Link></li>
                            <li><Link href="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className={styles.newsletterSection}>
                        <h4>Stay Updated</h4>
                        <p>Subscribe to our newsletter for exclusive offers and updates.</p>
                        <form className={styles.newsletterForm} onSubmit={(e) => { e.preventDefault(); alert('🎉 Subscribed! You will receive exclusive offers and updates.'); (e.target as HTMLFormElement).reset(); }}>
                            <input type="email" placeholder="Enter your email" required />
                            <button type="submit" className="btn btn-primary">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>&copy; {new Date().getFullYear()} VyapaarPe Platforms. All rights reserved.</p>
                    <div className={styles.legalLinks}>
                        <Link href="/legal/privacy">Privacy Policy</Link>
                        <Link href="/legal/terms">Terms of Service</Link>
                        <Link href="/">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
