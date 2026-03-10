'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './OrderDetail.module.css';

export default function OrderDetailPage() {
    const [showReturnModal, setShowReturnModal] = useState(false);

    const order = {
        id: 'ORD-84A29B',
        date: 'March 10, 2026',
        status: 'Shipped',
        paymentMethod: 'UPI (PhonePe)',
        paymentStatus: 'Paid',
        trackingNumber: 'AWB1234567890',
        courier: 'Delhivery',
        timeline: [
            { step: 'Order Placed', date: 'Mar 10, 12:30 PM', done: true },
            { step: 'Payment Confirmed', date: 'Mar 10, 12:31 PM', done: true },
            { step: 'Packed & Ready', date: 'Mar 10, 3:45 PM', done: true },
            { step: 'Shipped', date: 'Mar 11, 10:15 AM', done: true },
            { step: 'Out for Delivery', date: 'Expected Mar 13', done: false },
            { step: 'Delivered', date: '—', done: false },
        ],
        items: [
            { name: 'Sony WH-1000XM5 Headphones', qty: 1, price: 24990, image: '🎧' },
            { name: 'USB-C Cable (1.5m)', qty: 2, price: 499, image: '🔌' },
        ],
        subtotal: 25988,
        shipping: 0,
        tax: 4678,
        total: 30666,
        address: '123 Park Street, Apt 4B\nChembur East, Mumbai 400071',
    };

    return (
        <div>
            <div className={styles.breadcrumb}>
                <Link href="/account/orders">← My Orders</Link>
                <span> / {order.id}</span>
            </div>

            <div className={styles.header}>
                <div>
                    <h2>Order {order.id}</h2>
                    <p className={styles.meta}>Placed on {order.date} · {order.paymentMethod}</p>
                </div>
                <span className={styles.statusBadge}>{order.status}</span>
            </div>

            {/* Timeline */}
            <div className={`glass-panel ${styles.timelineSection}`}>
                <h3>Order Timeline</h3>
                <div className={styles.timeline}>
                    {order.timeline.map((step, i) => (
                        <div key={i} className={`${styles.timelineStep} ${step.done ? styles.done : ''}`}>
                            <div className={styles.stepDot}></div>
                            {i < order.timeline.length - 1 && <div className={styles.stepLine}></div>}
                            <div className={styles.stepInfo}>
                                <div className={styles.stepName}>{step.step}</div>
                                <div className={styles.stepDate}>{step.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.trackingInfo}>
                    <span>Tracking: <strong>{order.trackingNumber}</strong></span>
                    <span>Courier: <strong>{order.courier}</strong></span>
                </div>
            </div>

            {/* Items */}
            <div className={`glass-panel ${styles.itemsSection}`}>
                <h3>Items in this Order</h3>
                {order.items.map((item, i) => (
                    <div key={i} className={styles.itemRow}>
                        <div className={styles.itemThumb}>{item.image}</div>
                        <div className={styles.itemDetails}>
                            <div className={styles.itemName}>{item.name}</div>
                            <div className={styles.itemMeta}>Qty: {item.qty} × ₹{item.price.toLocaleString()}</div>
                        </div>
                        <div className={styles.itemTotal}>₹{(item.qty * item.price).toLocaleString()}</div>
                    </div>
                ))}
            </div>

            {/* Summary + Actions */}
            <div className={styles.bottomGrid}>
                <div className={`glass-panel ${styles.summaryCard}`}>
                    <h3>Order Summary</h3>
                    <div className={styles.summaryRow}><span>Subtotal</span><span>₹{order.subtotal.toLocaleString()}</span></div>
                    <div className={styles.summaryRow}><span>Shipping</span><span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span></div>
                    <div className={styles.summaryRow}><span>GST (18%)</span><span>₹{order.tax.toLocaleString()}</span></div>
                    <div className={`${styles.summaryRow} ${styles.totalRow}`}><span>Total</span><span>₹{order.total.toLocaleString()}</span></div>
                </div>

                <div className={`glass-panel ${styles.actionsCard}`}>
                    <h3>Actions</h3>
                    <button className="btn btn-outline" style={{ width: '100%', marginBottom: '0.75rem' }}>📄 Download Invoice</button>
                    <button className="btn btn-outline" style={{ width: '100%', marginBottom: '0.75rem' }}>✍️ Write a Review</button>
                    <button className="btn btn-outline" style={{ width: '100%', color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => setShowReturnModal(true)}>↩️ Request Return</button>
                </div>

                <div className={`glass-panel ${styles.addressCard}`}>
                    <h3>Delivery Address</h3>
                    <p style={{ color: 'var(--text-muted)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{order.address}</p>
                </div>
            </div>

            {/* Return Modal */}
            {showReturnModal && (
                <div className={styles.modalOverlay} onClick={() => setShowReturnModal(false)}>
                    <div className={`glass-panel ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
                        <h3>Request a Return</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Please select the item and reason for your return.</p>
                        <select style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: 'white', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>
                            <option>Sony WH-1000XM5 Headphones</option>
                            <option>USB-C Cable (1.5m)</option>
                        </select>
                        <select style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: 'white', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>
                            <option>Defective / Not Working</option>
                            <option>Wrong Item Received</option>
                            <option>Item Damaged in Transit</option>
                            <option>Changed My Mind</option>
                        </select>
                        <textarea rows={3} placeholder="Additional notes (optional)..." style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: 'white', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.5rem', resize: 'vertical' }}></textarea>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary" onClick={() => setShowReturnModal(false)}>Submit Return Request</button>
                            <button className="btn btn-outline" onClick={() => setShowReturnModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
