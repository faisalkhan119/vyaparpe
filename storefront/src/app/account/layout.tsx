'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './AccountLayout.module.css';

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Profile Overview', path: '/account', icon: '👤' },
        { name: 'My Orders', path: '/account/orders', icon: '📦' },
        { name: 'Subscriptions', path: '/account/subscriptions', icon: '🔄' },
        { name: 'My Downloads', path: '/account/downloads', icon: '📥' },
        { name: 'Wishlist', path: '/account/wishlist', icon: '❤️' },
        { name: 'Saved Addresses', path: '/account/addresses', icon: '📍' },
        { name: 'Wallet & Loyalty', path: '/account/wallet', icon: '💳' },
        { name: 'Refer & Earn', path: '/account/referrals', icon: '🎁' },
    ];

    return (
        <main className={styles.accountContainer}>
            <div className={`container ${styles.layoutGrid}`}>

                {/* Sidebar Navigation */}
                <aside className={styles.sidebar}>
                    <div className={`glass-panel ${styles.userProfileCard}`}>
                        <div className={styles.avatar}>AK</div>
                        <div className={styles.userInfo}>
                            <h3>Aryan Kumar</h3>
                            <p>aryan@example.com</p>
                        </div>
                    </div>

                    <nav className={styles.navMenu}>
                        {navLinks.map((link) => {
                            const isActive = pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                                >
                                    <span className={styles.navIcon}>{link.icon}</span>
                                    {link.name}
                                </Link>
                            );
                        })}

                        <button className={styles.logoutBtn}>
                            <span className={styles.navIcon}>🚪</span>
                            Logout
                        </button>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <section className={styles.mainContent}>
                    {children}
                </section>

            </div>
        </main>
    );
}
