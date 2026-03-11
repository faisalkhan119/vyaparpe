'use client';
import { useState } from 'react';
import styles from '../AccountPages.module.css';
import subStyles from './Subscriptions.module.css';

export default function SubscriptionsPage() {
    const [showPauseModal, setShowPauseModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [editSubId, setEditSubId] = useState('');
    const [cancelSubId, setCancelSubId] = useState('');
    const [editFrequency, setEditFrequency] = useState('');
    const [editQty, setEditQty] = useState(1);
    const [editAddress, setEditAddress] = useState('');
    const [editSaved, setEditSaved] = useState(false);
    const [showWinback, setShowWinback] = useState(false);
    const [cancelConfirmed, setCancelConfirmed] = useState<string[]>([]);

    const mockSubscriptions = [
        {
            id: 'SUB-001',
            product: 'Organic Toor Dal (1kg)',
            frequency: 'Every 2 Weeks',
            nextDelivery: 'March 22, 2026',
            price: 189,
            qty: 1,
            status: 'Active',
            address: '123 Park Street, Chembur East, Mumbai 400071',
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
            qty: 2,
            status: 'Active',
            address: '123 Park Street, Chembur East, Mumbai 400071',
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
            qty: 1,
            status: 'Paused',
            address: '456 Residency Rd, Bengaluru 560034',
            deliveries: [
                { date: 'Jan 15', status: 'Delivered' },
                { date: 'Dec 15', status: 'Delivered' },
            ]
        },
    ];

    const openEditModal = (sub: typeof mockSubscriptions[0]) => {
        setEditSubId(sub.id);
        setEditFrequency(sub.frequency);
        setEditQty(sub.qty);
        setEditAddress(sub.address);
        setEditSaved(false);
        setShowEditModal(true);
    };

    const openCancelModal = (subId: string) => {
        setCancelSubId(subId);
        setShowWinback(false);
        setShowCancelModal(true);
    };

    const handleSaveEdit = () => {
        setEditSaved(true);
        setTimeout(() => {
            setShowEditModal(false);
        }, 1200);
    };

    const handleCancelSub = () => {
        setCancelConfirmed(prev => [...prev, cancelSubId]);
        setShowCancelModal(false);
    };

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
                                    {sub.id} · {sub.frequency} · Qty: {sub.qty} · ₹{sub.price}/cycle
                                </div>
                            </div>
                            <span className={`${subStyles.statusBadge} ${
                                cancelConfirmed.includes(sub.id) ? subStyles.badgePaused :
                                sub.status === 'Active' ? subStyles.badgeActive : subStyles.badgePaused
                            }`}>
                                {cancelConfirmed.includes(sub.id) ? 'Canceled' : sub.status}
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

                        {/* Upcoming Delivery Calendar */}
                        {sub.status === 'Active' && (
                            <div style={{ margin: '0.5rem 0', padding: '0.6rem 0.75rem', background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: 600 }}>📅 Upcoming Schedule</div>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {[0, 1, 2, 3].map(i => {
                                        const d = new Date();
                                        const freq = sub.frequency === 'Daily' ? 1 : sub.frequency === 'Every 2 Weeks' ? 14 : sub.frequency === 'Weekly' ? 7 : 30;
                                        d.setDate(d.getDate() + freq * (i + 1));
                                        return (
                                            <span key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-color)', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-main)' }}>
                                                {d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {!cancelConfirmed.includes(sub.id) && (
                            <div className={subStyles.subActions}>
                                {sub.status === 'Active' ? (
                                    <>
                                        <button className="btn btn-outline" onClick={() => openEditModal(sub)}>✏️ Edit</button>
                                        <button className="btn btn-outline" onClick={() => setShowPauseModal(true)}>⏸️ Pause</button>
                                        <button className="btn btn-outline">⏭️ Skip Next</button>
                                        <button className="btn btn-outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => openCancelModal(sub.id)}>❌ Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-primary">▶️ Resume</button>
                                        <button className="btn btn-outline" onClick={() => openEditModal(sub)}>✏️ Edit</button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Pause Modal */}
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

            {/* Edit Modal */}
            {showEditModal && (
                <div className={subStyles.modalOverlay} onClick={() => setShowEditModal(false)}>
                    <div className={`glass-panel ${subStyles.modal}`} onClick={(e) => e.stopPropagation()}>
                        <h3>Edit Subscription</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Update frequency, quantity, or delivery address.</p>

                        {editSaved ? (
                            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
                                <p style={{ color: 'var(--success)', fontWeight: 700 }}>Changes saved successfully!</p>
                            </div>
                        ) : (
                            <>
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Delivery Frequency</label>
                                    <select
                                        value={editFrequency}
                                        onChange={(e) => setEditFrequency(e.target.value)}
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: 'white', padding: '0.75rem', borderRadius: '4px' }}
                                    >
                                        <option>Daily</option>
                                        <option>Every 2 Days</option>
                                        <option>Every 3 Days</option>
                                        <option>Weekly</option>
                                        <option>Every 2 Weeks</option>
                                        <option>Monthly</option>
                                    </select>
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Quantity per Delivery</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <button className="btn btn-outline" style={{ width: '36px', height: '36px', padding: 0 }} onClick={() => setEditQty(Math.max(1, editQty - 1))}>−</button>
                                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', minWidth: '30px', textAlign: 'center' }}>{editQty}</span>
                                        <button className="btn btn-outline" style={{ width: '36px', height: '36px', padding: 0 }} onClick={() => setEditQty(editQty + 1)}>+</button>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Delivery Address</label>
                                    <textarea
                                        value={editAddress}
                                        onChange={(e) => setEditAddress(e.target.value)}
                                        rows={3}
                                        style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: 'white', padding: '0.75rem', borderRadius: '4px', resize: 'vertical' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSaveEdit}>Save Changes</button>
                                    <button className="btn btn-outline" onClick={() => setShowEditModal(false)}>Cancel</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Cancel Modal with Win-back */}
            {showCancelModal && (
                <div className={subStyles.modalOverlay} onClick={() => setShowCancelModal(false)}>
                    <div className={`glass-panel ${subStyles.modal}`} onClick={(e) => e.stopPropagation()}>
                        {!showWinback ? (
                            <>
                                <h3>Cancel Subscription</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>We&apos;re sorry to see you go. Please tell us why:</p>
                                <select style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', color: 'white', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
                                    <option>Product quality not satisfactory</option>
                                    <option>Too expensive</option>
                                    <option>Found a better alternative</option>
                                    <option>Don&apos;t need it anymore</option>
                                    <option>Other</option>
                                </select>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button className="btn btn-primary" style={{ background: 'var(--danger)', borderColor: 'var(--danger)', flex: 1 }} onClick={() => setShowWinback(true)}>Proceed to Cancel</button>
                                    <button className="btn btn-outline" onClick={() => setShowCancelModal(false)}>Keep Subscription</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 style={{ color: '#fbbf24' }}>🎁 Wait! We have an offer for you</h3>
                                <div style={{
                                    background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
                                    borderRadius: '10px', padding: '1.25rem', margin: '1rem 0 1.5rem', textAlign: 'center'
                                }}>
                                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.35rem' }}>20% OFF for 3 months</div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Stay subscribed and save! We&apos;ll apply a 20% discount on your next 3 billing cycles automatically.</p>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setShowCancelModal(false)}>🎉 Accept & Stay</button>
                                    <button className="btn btn-outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={handleCancelSub}>Cancel Anyway</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

