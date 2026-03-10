import Link from 'next/link';
import styles from './OrderSuccess.module.css';

export default function OrderSuccessPage() {
    return (
        <main className={styles.successContainer}>
            <div className={`container ${styles.contentWrapper}`}>
                <div className={`glass-panel ${styles.successCard}`}>

                    <div className={styles.iconWrapper}>
                        <div className={styles.confetti}>🎉</div>
                        <div className={styles.checkmarkIcon}>✓</div>
                    </div>

                    <h1 className={styles.successTitle}>Order Confirmed!</h1>
                    <p className={styles.successMessage}>
                        Thank you for your purchase. We&apos;ve received your order and will begin processing it shortly.
                    </p>

                    <div className={styles.orderDetailsBox}>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Order Number:</span>
                            <span className={styles.detailValue}>#ORD-84A29B</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Date:</span>
                            <span className={styles.detailValue}>March 10, 2026</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Total Amount:</span>
                            <span className={styles.detailValue}>₹32,988</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Payment Status:</span>
                            <span className={styles.statusBadge}>Paid via UPI</span>
                        </div>
                    </div>

                    <p className={styles.emailNotice}>
                        We&apos;ve sent an order confirmation email to <strong>aryan@example.com</strong>
                    </p>

                    <div className={styles.actionButtons}>
                        <Link href="/products" className="btn btn-outline">
                            Continue Shopping
                        </Link>
                        <Link href="/" className="btn btn-primary">
                            Track Order
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}
