import Link from 'next/link';
import styles from './NotFound.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.illustration}>
                🔍📦
            </div>
            <h1 className={styles.title}>Oops! Page Not Found</h1>
            <p className={styles.message}>
                We looked everywhere, but the page you are trying to reach seems to have gone missing or the link is broken.
            </p>

            <div className={styles.actions}>
                <Link href="/" className={styles.homeBtn}>
                    Back to Homepage
                </Link>
                <Link href="/deals" className={styles.dealsBtn}>
                    View Active Deals
                </Link>
            </div>

            <div className={styles.suggestedSection}>
                <h3>In the meantime, check out these categories</h3>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty'].map((cat) => (
                        <Link
                            key={cat}
                            href={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '100px',
                                color: 'var(--text-main)',
                                textDecoration: 'none',
                                fontWeight: 500,
                                transition: 'all 0.2s',
                            }}
                        >
                            {cat}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
