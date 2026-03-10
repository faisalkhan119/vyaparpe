'use client';
import { useState } from 'react';
import styles from './TrackOrder.module.css';

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState('');
    const [phone, setPhone] = useState('');
    const [isTracking, setIsTracking] = useState(false);
    const [resultReady, setResultReady] = useState(false);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        setIsTracking(true);

        // Simulate API call to fetch order status
        setTimeout(() => {
            setIsTracking(false);
            setResultReady(true);
        }, 1500);
    };

    const handleReset = () => {
        setResultReady(false);
        setOrderId('');
        setPhone('');
    };

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Track Your Order</h1>
                <p className={styles.subtitle}>Enter your Order ID and Phone Number to check current delivery status</p>
            </div>

            <div className={styles.trackingCard}>
                {!resultReady ? (
                    <form className={styles.form} onSubmit={handleTrack}>
                        <div className={styles.inputGroup}>
                            <label>Order ID</label>
                            <input
                                type="text"
                                placeholder="e.g. OD1234567890"
                                required
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Mobile Number</label>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <span style={{ padding: '0.9rem', background: 'var(--bg-body)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-muted)' }}>+91</span>
                                <input
                                    type="tel"
                                    placeholder="9876543210"
                                    required
                                    pattern="[0-9]{10}"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    style={{ flex: 1 }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isTracking || !orderId || phone.length < 10}
                        >
                            {isTracking ? 'Searching...' : 'Track Order'}
                        </button>
                    </form>
                ) : (
                    <div className={styles.resultView}>
                        <div className={styles.orderHeader}>
                            <div>
                                <div className={styles.orderId}>Order #{orderId}</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Placed on Oct 12, 2026</div>
                            </div>
                            <div className={styles.statusBadge}>Shipped</div>
                        </div>

                        <div className={styles.timeline}>
                            <div className={`${styles.timelineItem} ${styles.completed}`}>
                                <div className={styles.timelineTitle}>Order Confirmed</div>
                                <div className={styles.timelineDate}>Oct 12, 10:30 AM</div>
                                <div className={styles.timelineDesc}>Your order has been placed successfully and payment is confirmed.</div>
                            </div>

                            <div className={`${styles.timelineItem} ${styles.completed}`}>
                                <div className={styles.timelineTitle}>Packed & Ready</div>
                                <div className={styles.timelineDate}>Oct 13, 09:15 AM</div>
                                <div className={styles.timelineDesc}>Item packed safely at Delhi Warehouse.</div>
                            </div>

                            <div className={`${styles.timelineItem} ${styles.completed}`}>
                                <div className={styles.timelineTitle}>Shipped</div>
                                <div className={styles.timelineDate}>Oct 13, 04:45 PM</div>
                                <div className={styles.timelineDesc}>Handed over to Ecom Express delivery partner. Tracking ID: EE9823483</div>
                            </div>

                            <div className={`${styles.timelineItem} ${styles.pending}`}>
                                <div className={styles.timelineTitle}>Out for Delivery</div>
                                <div className={styles.timelineDate}>Expected by tomorrow</div>
                                <div className={styles.timelineDesc}>Package has not yet reached the final delivery hub.</div>
                            </div>
                        </div>

                        <button className={styles.resetBtn} onClick={handleReset}>Track Another Order</button>
                    </div>
                )}
            </div>
        </main>
    );
}
