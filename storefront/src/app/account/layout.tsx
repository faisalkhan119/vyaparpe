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
    const isSubPage = pathname !== '/account';

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

    // Find the current page name for the back button header
    const currentPageName = navLinks.find(l => pathname.startsWith(l.path) && l.path !== '/account')?.name
        || navLinks.find(l => pathname === l.path)?.name
        || 'Account';

    return (
        <main className={styles.accountContainer}>
            <div className={`container ${styles.layoutGrid}`}>

                {/* Sidebar Navigation - hidden on mobile sub-pages */}
                <aside className={`${styles.sidebar} ${isSubPage ? styles.hiddenOnMobile : ''}`}>
                    <div className={`glass-panel ${styles.userProfileCard}`}>
                        <div className={styles.avatar}>AK</div>
                        <div className={styles.userInfo}>
                            <h3>Aryan Kumar</h3>
                            <p>aryan@example.com</p>
                        </div>
                    </div>

                    <nav className={styles.navMenu}>
                        {navLinks.map((link) => {
                            const isActive = pathname === link.path || (link.path !== '/account' && pathname.startsWith(link.path));
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
                    {/* Mobile Back Button - only visible on sub-pages on mobile */}
                    {isSubPage && (
                        <div className={styles.mobileBackHeader}>
                            <Link href="/account" className={styles.backBtn}>
                                ← Back
                            </Link>
                            <span className={styles.mobilePageTitle}>{currentPageName}</span>
                        </div>
                    )}
                    {children}
                </section>

            </div>
        </main>
    );
}
