'use client';
import { useState } from 'react';
import styles from '../AccountPages.module.css';
import subStyles from './Subscriptions.module.css';

export default function SubscriptionsPage() {
    const [showPauseModal, setShowPauseModal] = useState(false);

    const mockSubscriptions = [
        {
            id: 'SUB-001',
            product: 'Organic Toor Dal (1kg)',
            frequency: 'Every 2 Weeks',
            nextDelivery: 'March 22, 2026',
            price: 189,
            status: 'Active',
            deliveries: [
                { date: 'Mar 8', status: 'Delivered' },
                { date: 'Feb 22', status: 'Delivered' },
                { date: 'Feb 8', status: 'Skipped' },
            ]
        },
        {
            id: 'SUB-002',
            product: 'A2 Cow Milk (500ml)',
            frequency: 'Daily',
            nextDelivery: 'March 11, 2026',
            price: 35,
            status: 'Active',
            deliveries: [
                { date: 'Mar 10', status: 'Delivered' },
                { date: 'Mar 9', status: 'Delivered' },
                { date: 'Mar 8', status: 'Delivered' },
            ]
        },
        {
            id: 'SUB-003',
            product: 'Premium Green Tea (50 bags)',
            frequency: 'Monthly',
            nextDelivery: '—',
            price: 450,
            status: 'Paused',
            deliveries: [
                { date: 'Jan 15', status: 'Delivered' },
                { date: 'Dec 15', status: 'Delivered' },
            ]
        },
    ];

    return (
        <div>
            <div className={styles.pageHeader}>
                <h2>My Subscriptions</h2>
            </div>

            <div className={subStyles.subList}>
                {mockSubscriptions.map((sub) => (
                    <div key={sub.id} className={subStyles.subCard}>
                        <div className={subStyles.subHeader}>
                            <div>
                                <div className={subStyles.productName}>{sub.product}</div>
                                <div className={subStyles.subMeta}>
                                    {sub.id} · {sub.frequency} · ₹{sub.price}/cycle
                                </div>
                            </div>
                            <span className={`${subStyles.statusBadge} ${sub.status === 'Active' ? subStyles.badgeActive : subStyles.badgePaused}`}>
                                {sub.status}
                            </span>
                        </div>

                        <div className={subStyles.deliveryTimeline}>
                            <div className={subStyles.timelineLabel}>Recent Deliveries</div>
                            <div className={subStyles.timelineRow}>
                                {sub.deliveries.map((d, i) => (
                                    <div key={i} className={subStyles.timelineDot}>
                                        <div className={`${subStyles.dot} ${d.status === 'Delivered' ? subStyles.dotDelivered : subStyles.dotSkipped}`}></div>
                                        <span className={subStyles.dotDate}>{d.date}</span>
                                        <span className={subStyles.dotStatus}>{d.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={subStyles.nextDelivery}>
                            <span style={{ color: 'var(--text-muted)' }}>Next delivery:</span>
                            <strong style={{ color: 'white' }}> {sub.nextDelivery}</strong>
                        </div>

                        <div className={subStyles.subActions}>
                            {sub.status === 'Active' ? (
                                <>
                                    <button className="btn btn-outline" onClick={() => setShowPauseModal(true)}>⏸️ Pause</button>
                                    <button className="btn btn-outline">⏭️ Skip Next</button>
                                    <button className="btn btn-outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>❌ Cancel</button>
                                </>
                            ) : (
                                <button className="btn btn-primary">▶️ Resume</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {showPauseModal && (
                <div className={subStyles.modalOverlay} onClick={() => setShowPauseModal(false)}>
                    <div className={`glass-panel ${subStyles.modal}`} onClick={(e) => e.stopPropagation()}>
                        <h3>Pause Subscription</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Select a reason and optionally set an auto-resume date.</p>
                        <select style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: 'white', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>
                            <option>Going on vacation</option>
                            <option>Too much stock at home</option>
                            <option>Trying a different product</option>
                            <option>Other</option>
                        </select>
                        <input type="date" style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: 'white', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.5rem' }} />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary" onClick={() => setShowPauseModal(false)}>Confirm Pause</button>
                            <button className="btn btn-outline" onClick={() => setShowPauseModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
