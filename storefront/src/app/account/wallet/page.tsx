'use client';
import { useState } from 'react';
import styles from '../AccountPages.module.css';

export default function WalletPage() {
    const [showTopUp, setShowTopUp] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [balance, setBalance] = useState(4500);
    const [amount, setAmount] = useState('');

    const handleTopUp = () => {
        const val = parseInt(amount);
        if (val > 0) {
            setBalance(prev => prev + val);
            setShowTopUp(false);
            setAmount('');
            alert(`₹${val.toLocaleString()} added to your wallet successfully!`);
        }
    };

    const handleWithdraw = () => {
        const val = parseInt(amount);
        if (val > 0 && val <= balance) {
            setBalance(prev => prev - val);
            setShowWithdraw(false);
            setAmount('');
            alert(`₹${val.toLocaleString()} withdrawal initiated. It will reflect in 2-3 business days.`);
        } else if (val > balance) {
            alert('Insufficient balance!');
        }
    };

    return (
        <div>
            <div className={styles.pageHeader}>
                <h2>Wallet &amp; Loyalty</h2>
            </div>

            <div className={styles.walletCards}>
                <div className={styles.balanceCard}>
                    <div className={styles.balanceLabel}>Vyaparpe Wallet Balance</div>
                    <div className={styles.balanceAmount}>₹ {balance.toLocaleString()}.00</div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }} onClick={() => { setShowTopUp(true); setAmount(''); }}>Top Up</button>
                        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderColor: 'white', color: 'white' }} onClick={() => { setShowWithdraw(true); setAmount(''); }}>Withdraw</button>
                    </div>
                </div>

                <div className={styles.loyaltyCard}>
                    <div className={styles.balanceLabel}>Reward Points</div>
                    <div className={styles.pointsAmount}>1,240 <span style={{ fontSize: '1rem' }}>Pts</span></div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                        Equivalent to ₹124.00. Use points at checkout to receive discounts.
                    </p>
                </div>
            </div>

            <h3 style={{ color: 'white', marginBottom: '1rem', marginTop: '2rem' }}>Transaction History</h3>
            <div className="glass-panel" style={{ overflowX: 'auto' }}>
                <table className={styles.transactionsTable}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Mar 05, 2026</td>
                            <td>Top Up via UPI</td>
                            <td><span style={{ color: 'var(--success)' }}>Success</span></td>
                            <td className={styles.txCredit}>+ ₹5,000.00</td>
                        </tr>
                        <tr>
                            <td>Feb 14, 2026</td>
                            <td>Order #ORD-77F12C Refund</td>
                            <td><span style={{ color: 'var(--success)' }}>Success</span></td>
                            <td className={styles.txCredit}>+ ₹4,500.00</td>
                        </tr>
                        <tr>
                            <td>Jan 05, 2026</td>
                            <td>Paid for Order #ORD-12X99D</td>
                            <td><span style={{ color: 'white' }}>Success</span></td>
                            <td className={styles.txDebit}>- ₹125,000.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Top Up Modal */}
            {showTopUp && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowTopUp(false)}>
                    <div className="glass-panel" style={{ padding: '2rem', maxWidth: '400px', width: '90%' }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ marginBottom: '1rem' }}>Top Up Wallet</h3>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Enter Amount (₹)</label>
                            <input type="number" placeholder="e.g. 1000" value={amount} onChange={e => setAmount(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-body)', color: 'var(--text-color)' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                            {[500, 1000, 2000, 5000].map(v => (
                                <button key={v} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => setAmount(String(v))}>₹{v.toLocaleString()}</button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleTopUp} disabled={!amount || parseInt(amount) <= 0}>Add Money</button>
                            <button className="btn btn-outline" onClick={() => setShowTopUp(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Withdraw Modal */}
            {showWithdraw && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowWithdraw(false)}>
                    <div className="glass-panel" style={{ padding: '2rem', maxWidth: '400px', width: '90%' }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ marginBottom: '1rem' }}>Withdraw Funds</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Available: ₹{balance.toLocaleString()}.00</p>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Amount (₹)</label>
                            <input type="number" placeholder="e.g. 1000" value={amount} onChange={e => setAmount(e.target.value)} max={balance} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-body)', color: 'var(--text-color)' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleWithdraw} disabled={!amount || parseInt(amount) <= 0}>Withdraw</button>
                            <button className="btn btn-outline" onClick={() => setShowWithdraw(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
