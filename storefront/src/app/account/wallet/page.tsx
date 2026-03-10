import styles from '../AccountPages.module.css';

export default function WalletPage() {
    return (
        <div>
            <div className={styles.pageHeader}>
                <h2>Wallet & Loyalty</h2>
            </div>

            <div className={styles.walletCards}>
                {/* Wallet Balance */}
                <div className={styles.balanceCard}>
                    <div className={styles.balanceLabel}>Vyaparpe Wallet Balance</div>
                    <div className={styles.balanceAmount}>₹ 4,500.00</div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Top Up</button>
                        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', borderColor: 'white', color: 'white' }}>Withdraw</button>
                    </div>
                </div>

                {/* Loyalty Points */}
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
        </div>
    );
}
