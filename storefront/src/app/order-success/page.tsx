'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import styles from './OrderSuccess.module.css';

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const orderType = searchParams.get('type') || 'physical'; // physical | digital | service | mixed

    return (
        <main className={styles.successContainer}>
            <div className={`container ${styles.contentWrapper}`}>
                <div className={`glass-panel ${styles.successCard}`}>

                    <div className={styles.iconWrapper}>
                        <div className={styles.confetti}>🎉</div>
                        <div className={styles.checkmarkIcon}>✓</div>
                    </div>

                    <h1 className={styles.successTitle}>
                        {orderType === 'service' ? 'Booking Confirmed!' : 'Order Confirmed!'}
                    </h1>
                    <p className={styles.successMessage}>
                        {orderType === 'service'
                            ? 'Your service booking has been confirmed. Our professional will arrive at the scheduled time.'
                            : 'Thank you for your purchase. We\u0027ve received your order and will begin processing it shortly.'
                        }
                    </p>

                    <div className={styles.orderDetailsBox}>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Order Number:</span>
                            <span className={styles.detailValue}>#ORD-84A29B</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Date:</span>
                            <span className={styles.detailValue}>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
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

                    {/* Digital Product: Instant Download */}
                    {(orderType === 'digital' || orderType === 'mixed') && (
                        <div style={{
                            background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
                            borderRadius: '12px', padding: '1.25rem', marginTop: '1.5rem', textAlign: 'left'
                        }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                📥 Your Digital Downloads Are Ready!
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px'
                                }}>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Professional Lightroom Presets Pack</div>
                                        <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>ZIP • 45 MB • 3 downloads remaining</div>
                                    </div>
                                    <button className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.82rem' }}>
                                        ⬇ Download
                                    </button>
                                </div>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.75rem', margin: '0.75rem 0 0 0' }}>
                                💡 Downloads also available in <Link href="/account/downloads" style={{ color: 'var(--primary)', fontWeight: 600 }}>My Downloads</Link>
                            </p>
                        </div>
                    )}

                    {/* Service Booking: Appointment Details */}
                    {orderType === 'service' && (
                        <div style={{
                            background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)',
                            borderRadius: '12px', padding: '1.25rem', marginTop: '1.5rem', textAlign: 'left'
                        }}>
                            <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                📅 Booking Details
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Service</span>
                                    <strong>AC Deep Clean & Service</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Date & Time</span>
                                    <strong>Mar 15, 2026 at 10:30 AM</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Professional</span>
                                    <strong>Anil Sharma ★ 4.9</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Address</span>
                                    <strong>123 Park St, Mumbai</strong>
                                </div>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: '0.75rem 0 0 0' }}>
                                📱 Your professional will reach 15 mins before the scheduled time.
                            </p>
                        </div>
                    )}

                    <p className={styles.emailNotice}>
                        We&apos;ve sent a confirmation email to <strong>aryan@example.com</strong>
                    </p>

                    <div className={styles.actionButtons}>
                        <Link href="/products" className="btn btn-outline">
                            Continue Shopping
                        </Link>
                        <Link href="/account/orders/ORD-84A29B" className="btn btn-primary">
                            {orderType === 'service' ? 'View Booking' : 'Track Order'}
                        </Link>
                    </div>

                    {/* Guest Account Creation CTA */}
                    <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', textAlign: 'center', border: '1px dashed var(--border-color)' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Want to track orders easily?</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Create an account to view all your past orders, downloads, and invoices in one place.</p>
                        <button className="btn btn-outline" style={{ background: 'var(--bg-body)', padding: '0.5rem 1.5rem' }}>Create Account with aryan@example.com</button>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>}>
            <OrderSuccessContent />
        </Suspense>
    );
}
