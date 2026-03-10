'use client';
import { useState } from 'react';
import styles from '../AccountPages.module.css';
import refStyles from './Referrals.module.css';

export default function ReferralsPage() {
    const [copied, setCopied] = useState(false);
    const referralCode = 'ARYAN2026';
    const referralLink = 'https://vyaparpe.in/ref/ARYAN2026';

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const referrals = [
        { name: 'Priya S.', date: 'Mar 8, 2026', status: 'Completed', earned: 100 },
        { name: 'Rahul M.', date: 'Mar 5, 2026', status: 'Completed', earned: 100 },
        { name: 'Sneha K.', date: 'Mar 2, 2026', status: 'Pending', earned: 0 },
    ];

    return (
        <div>
            <div className={styles.pageHeader}>
                <h2>Refer & Earn</h2>
            </div>

            {/* Share Card */}
            <div className={`glass-panel ${refStyles.shareCard}`}>
                <div className={refStyles.shareIcon}>🎁</div>
                <h3>Invite friends, earn ₹100 each!</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Share your referral code. When your friend makes their first purchase, you both get ₹100 in your wallet!</p>

                <div className={refStyles.codeBox}>
                    <span className={refStyles.code}>{referralCode}</span>
                    <button className="btn btn-primary" onClick={handleCopy}>{copied ? '✓ Copied!' : 'Copy Code'}</button>
                </div>

                <div className={refStyles.shareButtons}>
                    <button className={refStyles.shareBtn} style={{ background: '#25D366' }}>💬 WhatsApp</button>
                    <button className={refStyles.shareBtn} style={{ background: '#1877F2' }}>📘 Facebook</button>
                    <button className={refStyles.shareBtn} style={{ background: '#1DA1F2' }}>🐦 Twitter</button>
                    <button className={refStyles.shareBtn} style={{ background: '#6366f1' }}>🔗 Copy Link</button>
                </div>
            </div>

            {/* Stats */}
            <div className={refStyles.statsGrid}>
                <div className={refStyles.statCard}>
                    <div className={refStyles.statValue}>3</div>
                    <div className={refStyles.statLabel}>Total Referrals</div>
                </div>
                <div className={refStyles.statCard}>
                    <div className={refStyles.statValue}>2</div>
                    <div className={refStyles.statLabel}>Successful</div>
                </div>
                <div className={refStyles.statCard}>
                    <div className={refStyles.statValue}>₹200</div>
                    <div className={refStyles.statLabel}>Total Earned</div>
                </div>
            </div>

            {/* Referral History */}
            <div className={refStyles.historySection}>
                <h3 style={{ color: 'white', marginBottom: '1rem' }}>Referral History</h3>
                {referrals.map((ref, i) => (
                    <div key={i} className={refStyles.historyRow}>
                        <div>
                            <div style={{ color: 'white', fontWeight: 600 }}>{ref.name}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{ref.date}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <span className={`${refStyles.statusBadge} ${ref.status === 'Completed' ? refStyles.completed : refStyles.pending}`}>{ref.status}</span>
                            {ref.earned > 0 && <div style={{ color: 'var(--success)', fontWeight: 700, marginTop: '0.25rem' }}>+₹{ref.earned}</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
