'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Checkout.module.css';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/data/products';

export default function CheckoutPage() {
    const { cartItems, subtotal, clearCart } = useCart();

    // Detect if cart has digital or service items
    const hasDigitalItem = cartItems.some(item => {
        const p = getProductById(item.productId);
        return p?.type === 'digital';
    });
    const hasServiceItem = cartItems.some(item => {
        const p = getProductById(item.productId);
        return p?.type === 'service';
    });
    const hasOnlyDigital = cartItems.length > 0 && cartItems.every(item => {
        const p = getProductById(item.productId);
        return p?.type === 'digital';
    });
    const hasOnlyService = cartItems.length > 0 && cartItems.every(item => {
        const p = getProductById(item.productId);
        return p?.type === 'service';
    });
    const skipDelivery = hasOnlyDigital || hasOnlyService;

    // Digital-only: skip address (step 1) and delivery (step 2), go straight to payment
    const [step, setStep] = useState(hasOnlyDigital ? 3 : 1);
    const [isGuest, setIsGuest] = useState(false);
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [deliverySlot, setDeliverySlot] = useState('any');
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [useWallet, setUseWallet] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponDiscount, setCouponDiscount] = useState(0);
    
    // Batch C States
    const [selectedAddressIndex, setSelectedAddressIndex] = useState<number | null>(0);
    const [showCoupons, setShowCoupons] = useState(false);
    const [deliveryInstructions, setDeliveryInstructions] = useState('');
    const [giftWrap, setGiftWrap] = useState(false);
    const [giftCardCode, setGiftCardCode] = useState('');
    const [giftCardApplied, setGiftCardApplied] = useState(false);
    const [giftCardBalance, setGiftCardBalance] = useState(0);

    const hasPhysical = cartItems.some(item => {
        const p = getProductById(item.productId);
        return !p?.type || p?.type === 'physical';
    });
    const isMixedCart = (hasDigitalItem || hasServiceItem) && hasPhysical;

    const handleApplyCoupon = () => {
        if (couponCode.trim().toUpperCase() === 'VYAPAR10') {
            setCouponDiscount(Math.round(subtotal * 0.1));
            setCouponApplied(true);
        } else if (couponCode.trim()) {
            alert('Invalid code. Try VYAPAR10 for 10% off!');
        }
    };

    const handleApplyGiftCard = () => {
        if (giftCardCode.trim().length >= 8) {
            setGiftCardBalance(1500); // Mock 1500 balance
            setGiftCardApplied(true);
        } else if (giftCardCode.trim()) {
            alert('Invalid Gift Card code.');
        }
    };

    const walletBalance = 4500; // Mock wallet balance
    const shippingCost = (hasOnlyDigital || hasOnlyService) ? 0 : (shippingMethod === 'express' ? 500 : 0);
    const giftWrapCost = giftWrap ? 49 : 0;
    const subtotalWithExtras = subtotal + shippingCost + giftWrapCost;
    
    const walletDeduction = useWallet ? Math.min(walletBalance, subtotalWithExtras - couponDiscount) : 0;
    const remainingAfterWallet = Math.max(0, subtotalWithExtras - couponDiscount - walletDeduction);
    const giftCardDeduction = giftCardApplied ? Math.min(giftCardBalance, remainingAfterWallet) : 0;
    const orderTotal = remainingAfterWallet - giftCardDeduction;

    const goToNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1 && skipDelivery) {
            setStep(3);
        } else if (step < 3) {
            setStep(step + 1);
        }
    };

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        const type = hasOnlyDigital ? 'digital' : hasOnlyService ? 'service' : isMixedCart ? 'mixed' : 'physical';
        clearCart();
        window.location.href = `/order-success?type=${type}`;
    };

    return (
        <main className={styles.checkoutContainer}>
            <div className="container">
                <h1 className={styles.pageTitle}>Secure Checkout</h1>

                {/* Mixed cart info banner */}
                {isMixedCart && (
                    <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>📦💾</span>
                        <span><strong>Mixed cart:</strong> Physical items will be shipped to your address. Digital items will be available for instant download after payment.</span>
                    </div>
                )}

                <div className={styles.checkoutGrid}>
                    {/* Left Column: Form Steps */}
                    <div className={styles.stepsColumn}>

                        {/* Digital-only: Show simplified email step */}
                        {hasOnlyDigital && (
                            <div className={`${styles.checkoutStep} ${styles.activeStep} ${styles.completedStep}`}>
                                <div className={styles.stepHeader}>
                                    <div className={styles.stepIndicator}>📥</div>
                                    <h3>Digital Delivery</h3>
                                </div>
                                <div className={styles.stepSummary}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '1.1rem' }}>⚡</span>
                                        <strong style={{ color: 'var(--success)' }}>Instant Download — No shipping needed!</strong>
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                                        Download links will be sent to <strong style={{ color: 'var(--text-main)' }}>aryan@example.com</strong> immediately after payment.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Step 1: Shipping Address (hidden for digital-only) */}
                        {!hasOnlyDigital && (
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
                                        {!isGuest && <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem', marginLeft: '1.8rem' }}>You are logged in as aryan@example.com.</p>}
                                        {isGuest && <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem', marginLeft: '1.8rem' }}>You will checkout as a guest. Order tracking will be sent to your email.</p>}
                                    </div>

                                    {!isGuest && (
                                        <div style={{ marginBottom: '2rem' }}>
                                            <h4 style={{ marginBottom: '1rem', color: 'var(--text-color)' }}>Saved Addresses</h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                                {[
                                                    { id: 0, type: 'Home', name: 'Aryan Kumar', address: '123 Park Street, Apartment 4B', city: 'Mumbai', state: 'MH', pin: '400001', phone: '+91 9876543210' },
                                                    { id: 1, type: 'Office', name: 'Aryan Kumar (Work)', address: 'TechHub Building, Floor 9, Powai', city: 'Mumbai', state: 'MH', pin: '400076', phone: '+91 9876543210' },
                                                ].map((addr, idx) => (
                                                    <div 
                                                        key={addr.id} 
                                                        style={{ 
                                                            border: `1px solid ${selectedAddressIndex === idx ? 'var(--primary)' : 'var(--border-color)'}`,
                                                            background: selectedAddressIndex === idx ? 'rgba(99,102,241,0.05)' : 'transparent',
                                                            borderRadius: '8px', padding: '1rem', cursor: 'pointer', transition: 'all 0.2s'
                                                        }}
                                                        onClick={() => setSelectedAddressIndex(idx)}
                                                    >
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                            <strong style={{ fontSize: '0.9rem' }}>{addr.type}</strong>
                                                            {selectedAddressIndex === idx && <span style={{ color: 'var(--primary)' }}>✓ Selected</span>}
                                                        </div>
                                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                                            {addr.name}<br/>{addr.address}<br/>{addr.city}, {addr.state} {addr.pin}<br/>{addr.phone}
                                                        </div>
                                                    </div>
                                                ))}
                                                <div 
                                                    style={{ 
                                                        border: `1px dashed var(--border-color)`, borderRadius: '8px', padding: '1rem', 
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                                        color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem'
                                                    }}
                                                    onClick={() => setSelectedAddressIndex(null)}
                                                >
                                                    + Add New Address
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {(isGuest || selectedAddressIndex === null) && (
                                        <div style={{ borderTop: !isGuest ? '1px solid var(--border-color)' : 'none', paddingTop: !isGuest ? '1.5rem' : '0' }}>
                                            <h4 style={{ marginBottom: '1rem' }}>Enter New Address</h4>
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
                                                {skipDelivery ? 'Continue to Payment' : 'Continue to Delivery'}
                                            </button>
                                        </div>
                                    )}

                                    {!isGuest && selectedAddressIndex !== null && (
                                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                                            Deliver to Selected Address
                                        </button>
                                    )}
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
                        )}

                        {/* Step 2: Delivery Options (hidden for digital & service only) */}
                        {!skipDelivery && (
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

                                    <h4 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-color)' }}>Delivery Preferences</h4>
                                    
                                    {/* Gift Wrap option */}
                                    <label className={styles.checkboxLabel} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'flex-start' }}>
                                        <input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} style={{ marginTop: '0.2rem' }} />
                                        <div style={{ marginLeft: '0.5rem' }}>
                                            <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🎁 Add Gift Wrap <span style={{ color: 'var(--primary)' }}>(+₹49)</span></div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>We&apos;ll wrap your items in premium paper and hide the price tags.</div>
                                        </div>
                                    </label>

                                    {/* Delivery Instructions */}
                                    <div className={styles.formGroup}>
                                        <label>Delivery Instructions (Optional)</label>
                                        <textarea 
                                            placeholder="E.g. Leave package with security guard, call before arriving..." 
                                            value={deliveryInstructions}
                                            onChange={(e) => setDeliveryInstructions(e.target.value)}
                                            style={{ minHeight: '80px', padding: '0.75rem', width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }} 
                                        />
                                    </div>

                                    <div className={styles.stepActions}>
                                        <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                                        <button type="submit" className="btn btn-primary">Continue to Payment</button>
                                    </div>
                                </form>
                            )}

                            {step > 2 && (
                                <div className={styles.stepSummary}>
                                    <div style={{ fontWeight: 600, color: 'var(--success)', marginBottom: '0.5rem' }}>
                                        📅 Est. delivery: {
                                            (() => {
                                                const d = new Date();
                                                d.setDate(d.getDate() + (shippingMethod === 'express' ? 2 : 5));
                                                return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                            })()
                                        }
                                    </div>
                                    <div>{shippingMethod === 'standard' ? 'Standard Delivery (3-5 Days) - Free' : 'Express Delivery (1-2 Days) - ₹500'}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>Time Slot: {deliverySlot === 'any' ? 'Any Time (9 AM - 9 PM)' : deliverySlot === 'morning' ? 'Morning (8 AM - 12 PM)' : 'Evening (5 PM - 9 PM)'}</div>
                                    {giftWrap && <div style={{ color: 'var(--primary)', fontSize: '0.85rem', marginTop: '0.25rem' }}>🎁 Gift Wrap Added</div>}
                                    {deliveryInstructions && <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem', fontStyle: 'italic' }}>Note: {deliveryInstructions}</div>}
                                </div>
                            )}
                        </div>
                        )}

                        {/* Step 3: Payment */}
                        <div className={`${styles.checkoutStep} ${step >= 3 ? styles.activeStep : ''}`}>
                            <div className={styles.stepHeader}>
                                <div className={styles.stepIndicator}>3</div>
                                <h3>Payment</h3>
                            </div>

                            {step === 3 && (
                                <form className={styles.stepForm} onSubmit={handlePlaceOrder}>
                                    <p className="text-muted" style={{ marginBottom: '1.5rem' }}>All transactions are secure and encrypted.</p>

                                    {/* Wallet Balance Toggle */}
                                    <div style={{
                                        background: useWallet ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.03)',
                                        border: `1px solid ${useWallet ? 'rgba(16,185,129,0.4)' : 'var(--border-color)'}`,
                                        borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem',
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        cursor: 'pointer', transition: 'all 0.2s'
                                    }} onClick={() => setUseWallet(!useWallet)}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <span style={{ fontSize: '1.5rem' }}>💰</span>
                                            <div>
                                                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>VyaparPe Wallet</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Available Balance: ₹{walletBalance.toLocaleString()}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            {useWallet && (
                                                <span style={{ color: 'var(--success)', fontWeight: 700, fontSize: '0.9rem' }}>−₹{walletDeduction.toLocaleString()}</span>
                                            )}
                                            <div style={{
                                                width: '44px', height: '24px', borderRadius: '12px',
                                                background: useWallet ? 'var(--success)' : 'var(--border-color)',
                                                position: 'relative', transition: 'background 0.2s'
                                            }}>
                                                <div style={{
                                                    width: '20px', height: '20px', borderRadius: '50%',
                                                    background: 'white', position: 'absolute', top: '2px',
                                                    left: useWallet ? '22px' : '2px', transition: 'left 0.2s',
                                                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                                                }} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Digital item notice */}
                                    {hasDigitalItem && (
                                        <div style={{
                                            background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)',
                                            borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem',
                                            fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem', alignItems: 'center'
                                        }}>
                                            <span>📥</span> Your cart contains digital products. Download links will be available instantly after payment.
                                        </div>
                                    )}

                                    {orderTotal <= 0 ? (
                                        <div style={{
                                            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                                            borderRadius: '10px', padding: '1.25rem', textAlign: 'center', marginBottom: '1rem'
                                        }}>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--success)', marginBottom: '0.25rem' }}>Fully Covered by Wallet!</div>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>No additional payment needed. ₹{walletDeduction.toLocaleString()} will be deducted from your wallet.</p>
                                        </div>
                                    ) : (
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

                                            {/* COD Option — hidden for digital and service products */}
                                            {!hasDigitalItem && !hasServiceItem && (
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
                                            )}
                                        </div>
                                    )}

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
                                <span>{(hasOnlyDigital || hasOnlyService) ? 'N/A' : (shippingMethod === 'express' ? '₹500' : 'Free')}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Taxes</span>
                                <span>Included</span>
                            </div>
                            {giftWrap && (
                                <div className={styles.summaryRow}>
                                    <span>Gift Wrap</span>
                                    <span>₹49</span>
                                </div>
                            )}
                            {useWallet && walletDeduction > 0 && (
                                <div className={styles.summaryRow} style={{ color: 'var(--success)' }}>
                                    <span>💰 Wallet Applied</span>
                                    <span>−₹{walletDeduction.toLocaleString()}</span>
                                </div>
                            )}
                            {couponApplied && (
                                <div className={styles.summaryRow} style={{ color: 'var(--success)' }}>
                                    <span>🎁 Coupon (VYAPAR10)</span>
                                    <span>−₹{couponDiscount.toLocaleString()}</span>
                                </div>
                            )}

                            {/* Coupon Input */}
                            <div style={{ marginTop: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Discount Coupon</span>
                                    <button 
                                        className="btn btn-link" 
                                        style={{ fontSize: '0.8rem', padding: 0, color: 'var(--primary)' }}
                                        onClick={(e) => { e.preventDefault(); setShowCoupons(!showCoupons); }}
                                    >
                                        {showCoupons ? 'Hide Coupons' : '📋 View Available Coupons'}
                                    </button>
                                </div>
                                
                                {showCoupons && !couponApplied && (
                                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                                            <div>
                                                <strong style={{ fontSize: '0.85rem', color: 'var(--success)' }}>VYAPAR10</strong>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Get 10% off your entire order</div>
                                            </div>
                                            <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }} onClick={(e) => { e.preventDefault(); setCouponCode('VYAPAR10'); handleApplyCoupon(); }}>Apply</button>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <strong style={{ fontSize: '0.85rem', color: 'var(--success)' }}>FREESHIP</strong>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Free express shipping</div>
                                            </div>
                                            <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }} onClick={(e) => { e.preventDefault(); alert('Conditions not met (Minimum ₹5000)'); }}>Apply</button>
                                        </div>
                                    </div>
                                )}

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input type="text" placeholder="Enter coupon code" value={couponCode}
                                        onChange={e => setCouponCode(e.target.value)} disabled={couponApplied}
                                        style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.82rem' }} />
                                    {couponApplied ? (
                                        <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                                            onClick={(e) => { e.preventDefault(); setCouponApplied(false); setCouponDiscount(0); setCouponCode(''); }}>Remove</button>
                                    ) : (
                                        <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                                            onClick={(e) => { e.preventDefault(); handleApplyCoupon(); }}>Apply</button>
                                    )}
                                </div>
                            </div>
                            
                            {/* Gift Card */}
                            <div style={{ marginTop: '1rem' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Gift Card</div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input type="text" placeholder="Enter gift card code" value={giftCardCode}
                                        onChange={e => setGiftCardCode(e.target.value)} disabled={giftCardApplied}
                                        style={{ flex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', padding: '0.5rem 0.75rem', borderRadius: '8px', fontSize: '0.82rem' }} />
                                    {giftCardApplied ? (
                                        <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                                            onClick={(e) => { e.preventDefault(); setGiftCardApplied(false); setGiftCardBalance(0); setGiftCardCode(''); }}>Remove</button>
                                    ) : (
                                        <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                                            onClick={(e) => { e.preventDefault(); handleApplyGiftCard(); }}>Redeem</button>
                                    )}
                                </div>
                                {giftCardApplied && (
                                    <div style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '0.5rem' }}>
                                        Gift card balance applied: ₹{giftCardDeduction.toLocaleString()}
                                    </div>
                                )}
                            </div>

                            <hr className={styles.divider} />

                            <div className={styles.totalRow}>
                                <span>Total</span>
                                <span>₹{Math.max(0, orderTotal).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
