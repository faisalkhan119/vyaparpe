'use client';
import { useState } from 'react';
import styles from './GiftCards.module.css';

export default function GiftCardsPage() {
    const [selectedAmount, setSelectedAmount] = useState(1000);
    const amounts = [500, 1000, 2000, 5000];

    return (
        <main className={styles.giftContainer}>
            <div className="container">
                <div className={styles.giftHeader}>
                    <h1>🎁 Gift Cards</h1>
                    <p>The perfect gift for any occasion. Send a Vyaparpe gift card to your loved ones!</p>
                </div>

                <div className={styles.mainGrid}>
                    {/* Gift Card Preview */}
                    <div className={styles.previewSection}>
                        <div className={styles.giftCardPreview}>
                            <div className={styles.cardGlow}></div>
                            <div className={styles.cardLogo}>🛍️ Vyaparpe</div>
                            <div className={styles.cardAmount}>₹{selectedAmount.toLocaleString()}</div>
                            <div className={styles.cardText}>GIFT CARD</div>
                            <div className={styles.cardCode}>XXXX-XXXX-XXXX</div>
                        </div>
                    </div>

                    {/* Gift Card Form */}
                    <div className={`glass-panel ${styles.formSection}`}>
                        <h2>Customize Your Card</h2>

                        <div className={styles.formGroup}>
                            <label>Select Amount</label>
                            <div className={styles.amountGrid}>
                                {amounts.map((amt) => (
                                    <button key={amt} className={`${styles.amountBtn} ${selectedAmount === amt ? styles.selected : ''}`} onClick={() => setSelectedAmount(amt)}>
                                        ₹{amt.toLocaleString()}
                                    </button>
                                ))}
                            </div>
                            <input type="number" placeholder="Or enter custom amount..." className={styles.customInput} onChange={(e) => setSelectedAmount(Number(e.target.value) || 1000)} />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Recipient's Name</label>
                            <input type="text" placeholder="Enter name" className={styles.input} />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Recipient's Email</label>
                            <input type="email" placeholder="Enter email address" className={styles.input} />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Personal Message (optional)</label>
                            <textarea rows={3} placeholder="Add a personal message..." className={styles.textarea}></textarea>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Delivery Method</label>
                            <div className={styles.deliveryOptions}>
                                <label className={styles.radioOption}><input type="radio" name="delivery" defaultChecked /> 📧 Email</label>
                                <label className={styles.radioOption}><input type="radio" name="delivery" /> 💬 WhatsApp</label>
                                <label className={styles.radioOption}><input type="radio" name="delivery" /> 📱 SMS</label>
                            </div>
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }}>
                            Buy Gift Card — ₹{selectedAmount.toLocaleString()}
                        </button>
                    </div>
                </div>

                {/* Check Balance */}
                <div className={`glass-panel ${styles.balanceSection}`}>
                    <h3>Already have a gift card?</h3>
                    <div className={styles.balanceRow}>
                        <input type="text" placeholder="Enter gift card code (e.g. ABCD-EFGH-1234)" className={styles.input} style={{ flex: 1 }} />
                        <button className="btn btn-outline">Check Balance</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
