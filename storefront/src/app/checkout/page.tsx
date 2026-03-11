'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Checkout.module.css';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [isGuest, setIsGuest] = useState(false);
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [deliverySlot, setDeliverySlot] = useState('any');
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const { cartItems, subtotal, clearCart } = useCart();
    const shippingCost = shippingMethod === 'express' ? 500 : 0;
    const orderTotal = subtotal + shippingCost;

    const goToNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 3) setStep(step + 1);
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        clearCart();
        window.location.href = '/order-success';
    };

    return (
        <main className={styles.checkoutContainer}>
            <div className="container">
                <h1 className={styles.pageTitle}>Secure Checkout</h1>

                <div className={styles.checkoutGrid}>
                    {/* Left Column: Form Steps */}
                    <div className={styles.stepsColumn}>

                        {/* Step 1: Shipping Address */}
                        <div className={`${styles.checkoutStep} ${step >= 1 ? styles.activeStep : ''} ${step > 1 ? styles.completedStep : ''}`}>
                            <div className={styles.stepHeader} onClick={() => step > 1 && setStep(1)}>
                                <div className={styles.stepIndicator}>1</div>
                                <h3>Shipping Address</h3>
                                {step > 1 && <span className={styles.editBtn}>Edit</span>}
                            </div>

                            {step === 1 && (
                                <form className={styles.stepForm} onSubmit={goToNextStep}>
                                    <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                        <label className={styles.checkboxLabel} style={{ fontWeight: '600' }}>
                                            <input type="checkbox" checked={isGuest} onChange={(e) => setIsGuest(e.target.checked)} />
                                            <span>Continue as Guest (Do not create an account)</span>
                                        </label>
                                        {!isGuest && <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem', marginLeft: '1.8rem' }}>You are logged in as aryan@example.com. Your address is pre-filled below.</p>}
                                        {isGuest && <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem', marginLeft: '1.8rem' }}>You will checkout as a guest. Order tracking will be sent to your email.</p>}
                                    </div>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>First Name</label>
                                            <input type="text" required defaultValue="Aryan" />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Last Name</label>
                                            <input type="text" required defaultValue="Kumar" />
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Email Address</label>
                                        <input type="email" required defaultValue="aryan@example.com" />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Address</label>
                                        <input type="text" required defaultValue="123 Park Street, Apartment 4B" />
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>City</label>
                                            <input type="text" required defaultValue="Mumbai" />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>State</label>
                                            <select required defaultValue="MH">
                                                <option value="MH">Maharashtra</option>
                                                <option value="DL">Delhi</option>
                                                <option value="KA">Karnataka</option>
                                            </select>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>PIN Code</label>
                                            <input type="text" required defaultValue="400001" />
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label>Phone Number</label>
                                        <input type="tel" required defaultValue="+91 9876543210" />
                                    </div>

                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                                        Continue to Delivery
                                    </button>
                                </form>
                            )}

                            {step > 1 && (
                                <div className={styles.stepSummary}>
                                    Aryan Kumar<br />
                                    123 Park Street, Apartment 4B<br />
                                    Mumbai, Maharashtra 400001<br />
                                    +91 9876543210
                                </div>
                            )}
                        </div>

                        {/* Step 2: Delivery Options */}
                        <div className={`${styles.checkoutStep} ${step >= 2 ? styles.activeStep : ''} ${step > 2 ? styles.completedStep : ''}`}>
                            <div className={styles.stepHeader} onClick={() => step > 2 && setStep(2)}>
                                <div className={styles.stepIndicator}>2</div>
                                <h3>Delivery Method</h3>
                                {step > 2 && <span className={styles.editBtn}>Edit</span>}
                            </div>

                            {step === 2 && (
                                <form className={styles.stepForm} onSubmit={goToNextStep}>
                                    <h4 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Select Speed</h4>
                                    <div className={styles.deliveryOptions}>
                                        <label className={`${styles.radioCard} ${shippingMethod === 'standard' ? styles.selectedCard : ''}`}>
                                            <input
                                                type="radio"
                                                name="shipping"
                                                value="standard"
                                                checked={shippingMethod === 'standard'}
                                                onChange={() => setShippingMethod('standard')}
                                            />
                                            <div className={styles.radioInfo}>
                                                <span className={styles.radioTitle}>Standard Delivery</span>
                                                <span className={styles.radioDesc}>3-5 Business Days</span>
                                            </div>
                                            <span className={styles.radioPrice}>Free</span>
                                        </label>

                                        <label className={`${styles.radioCard} ${shippingMethod === 'express' ? styles.selectedCard : ''}`}>
                                            <input
                                                type="radio"
                                                name="shipping"
                                                value="express"
                                                checked={shippingMethod === 'express'}
                                                onChange={() => setShippingMethod('express')}
                                            />
                                            <div className={styles.radioInfo}>
                                                <span className={styles.radioTitle}>Express Delivery</span>
                                                <span className={styles.radioDesc}>1-2 Business Days</span>
                                            </div>
                                            <span className={styles.radioPrice}>₹500</span>
                                        </label>
                                    </div>

                                    <h4 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-color)' }}>Select Time Slot</h4>
                                    <div className={styles.deliveryOptions}>
                                        <label className={`${styles.radioCard} ${deliverySlot === 'any' ? styles.selectedCard : ''}`}>
                                            <input type="radio" name="slot" value="any" checked={deliverySlot === 'any'} onChange={() => setDeliverySlot('any')} />
                                            <div className={styles.radioInfo}>
                                                <span className={styles.radioTitle}>Any Time Range</span>
                                                <span className={styles.radioDesc}>9 AM - 9 PM</span>
                                            </div>
                                        </label>
                                        <label className={`${styles.radioCard} ${deliverySlot === 'morning' ? styles.selectedCard : ''}`}>
                                            <input type="radio" name="slot" value="morning" checked={deliverySlot === 'morning'} onChange={() => setDeliverySlot('morning')} />
                                            <div className={styles.radioInfo}>
                                                <span className={styles.radioTitle}>Morning</span>
                                                <span className={styles.radioDesc}>8 AM - 12 PM</span>
                                            </div>
                                        </label>
                                        <label className={`${styles.radioCard} ${deliverySlot === 'evening' ? styles.selectedCard : ''}`}>
                                            <input type="radio" name="slot" value="evening" checked={deliverySlot === 'evening'} onChange={() => setDeliverySlot('evening')} />
                                            <div className={styles.radioInfo}>
                                                <span className={styles.radioTitle}>Evening</span>
                                                <span className={styles.radioDesc}>5 PM - 9 PM</span>
                                            </div>
                                        </label>
                                    </div>

                                    <div className={styles.stepActions}>
                                        <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                                        <button type="submit" className="btn btn-primary">Continue to Payment</button>
                                    </div>
                                </form>
                            )}

                            {step > 2 && (
                                <div className={styles.stepSummary}>
                                    <div>{shippingMethod === 'standard' ? 'Standard Delivery (3-5 Days) - Free' : 'Express Delivery (1-2 Days) - ₹500'}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Time Slot: {deliverySlot === 'any' ? 'Any Time (9 AM - 9 PM)' : deliverySlot === 'morning' ? 'Morning (8 AM - 12 PM)' : 'Evening (5 PM - 9 PM)'}</div>
                                </div>
                            )}
                        </div>

                        {/* Step 3: Payment */}
                        <div className={`${styles.checkoutStep} ${step >= 3 ? styles.activeStep : ''}`}>
                            <div className={styles.stepHeader}>
                                <div className={styles.stepIndicator}>3</div>
                                <h3>Payment</h3>
                            </div>

                            {step === 3 && (
                                <form className={styles.stepForm} onSubmit={handlePlaceOrder}>
                                    <p className="text-muted" style={{ marginBottom: '1.5rem' }}>All transactions are secure and encrypted.</p>

                                    <div className={styles.paymentMethods}>
                                        {/* UPI Option */}
                                        <label className={`${styles.radioCard} ${paymentMethod === 'upi' ? styles.selectedCard : ''}`}>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="upi"
                                                checked={paymentMethod === 'upi'}
                                                onChange={() => setPaymentMethod('upi')}
                                            />
                                            <div className={styles.radioInfo}>
                                                <span className={styles.radioTitle}>UPI (GPay, PhonePe, Paytm)</span>
                                            </div>
                                            <span className={styles.paymentIcons}>📱</span>
                                        </label>

                                        {paymentMethod === 'upi' && (
                                            <div className={styles.paymentDetailsBox}>
                                                <div className={styles.formGroup}>
                                                    <label>Enter UPI ID</label>
                                                    <input type="text" placeholder="username@upi" />
                                                </div>
                                                <p className={styles.hint}>A payment request will be sent to your UPI app.</p>
                                            </div>
                                        )}

                                        {/* Card Option */}
                                        <label className={`${styles.radioCard} ${paymentMethod === 'card' ? styles.selectedCard : ''}`}>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="card"
                                                checked={paymentMethod === 'card'}
                                                onChange={() => setPaymentMethod('card')}
                                            />
                                            <div className={styles.radioInfo}>
                                                <span className={styles.radioTitle}>Credit / Debit Card</span>
                                            </div>
                                            <span className={styles.paymentIcons}>💳</span>
                                        </label>

                                        {paymentMethod === 'card' && (
                                            <div className={styles.paymentDetailsBox}>
                                                <div className={styles.formGroup}>
                                                    <label>Card Number</label>
                                                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" />
                                                </div>
                                                <div className={styles.formRow}>
                                                    <div className={styles.formGroup}>
                                                        <label>Expiry (MM/YY)</label>
                                                        <input type="text" placeholder="MM/YY" />
                                                    </div>
                                                    <div className={styles.formGroup}>
                                                        <label>CVV</label>
                                                        <input type="text" placeholder="123" />
                                                    </div>
                                                </div>
                                                <div className={styles.formGroup}>
                                                    <label>Name on Card</label>
                                                    <input type="text" />
                                                </div>
                                            </div>
                                        )}

                                        {/* COD Option */}
                                        <label className={`${styles.radioCard} ${paymentMethod === 'cod' ? styles.selectedCard : ''}`}>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="cod"
                                                checked={paymentMethod === 'cod'}
                                                onChange={() => setPaymentMethod('cod')}
                                            />
                                            <div className={styles.radioInfo}>
                                                <span className={styles.radioTitle}>Cash on Delivery (COD)</span>
                                            </div>
                                            <span className={styles.paymentIcons}>💵</span>
                                        </label>
                                    </div>

                                    <div className={styles.billingAddressToggle}>
                                        <label className={styles.checkboxLabel}>
                                            <input type="checkbox" defaultChecked />
                                            <span>Billing address is same as shipping address</span>
                                        </label>
                                    </div>

                                    <div className={styles.stepActions}>
                                        <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>Back</button>
                                        <button type="submit" className={`btn btn-primary ${styles.placeOrderBtn}`}>Place Order (₹{orderTotal.toLocaleString()})</button>
                                    </div>
                                </form>
                            )}
                        </div>

                    </div>

                    {/* Right Column: Order Summary (Sidebar) */}
                    <div className={styles.summaryColumn}>
                        <div className={`glass-panel ${styles.summaryCard}`}>
                            <h3>In Your Cart</h3>

                            <div className={styles.miniCartList}>
                                {cartItems.map(item => (
                                    <div key={item.id} className={styles.miniCartItem}>
                                        <div className={styles.miniImageHolder}>
                                            <span className={styles.qtyBadge}>{item.quantity}</span>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                        </div>
                                        <div className={styles.miniItemInfo}>
                                            <h4>{item.name.length > 25 ? item.name.slice(0, 25) + '...' : item.name}</h4>
                                            {item.variantLabels?.map((label, i) => (
                                                <div key={i} className="text-muted mt-1" style={{ fontSize: '0.85rem' }}>
                                                    {label}
                                                </div>
                                            ))}
                                        </div>
                                        <div className={styles.miniPrice}>₹{(item.price * item.quantity).toLocaleString()}</div>
                                    </div>
                                ))}
                                {cartItems.length === 0 && (
                                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>Your cart is empty</p>
                                )}
                            </div>

                            <hr className={styles.divider} />

                            <div className={styles.summaryRow}>
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Shipping</span>
                                <span>{shippingMethod === 'express' ? '₹500' : 'Free'}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Taxes</span>
                                <span>Included</span>
                            </div>

                            <hr className={styles.divider} />

                            <div className={styles.totalRow}>
                                <span>Total</span>
                                <span>₹{orderTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
