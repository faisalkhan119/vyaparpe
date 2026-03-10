'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Legal.module.css';

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();

    const legalLinks = [
        { name: 'Privacy Policy', path: '/legal/privacy' },
        { name: 'Terms of Service', path: '/legal/terms' },
        { name: 'Refund & Returns', path: '/legal/refund' },
    ];

    return (
        <main className={styles.legalContainer}>
            <div className={`container ${styles.layoutGrid}`}>

                {/* Sidebar Navigation */}
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeader}>
                        <h3>Legal Information</h3>
                        <p>Read our policies and terms.</p>
                    </div>

                    <nav className={styles.navMenu}>
                        {legalLinks.map((link) => {
                            const isActive = pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Legal Document Content */}
                <section className={`glass-panel ${styles.documentContent}`}>
                    {children}
                </section>

            </div>
        </main>
    );
}
