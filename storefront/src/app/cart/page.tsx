'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './CartPage.module.css';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoDiscount, setPromoDiscount] = useState(0);

    const taxes = subtotal * 0.18;
    const shipping = subtotal > 50000 ? 0 : (subtotal > 0 ? 500 : 0);
    const total = subtotal + taxes + shipping - promoDiscount;

    const handleApplyPromo = () => {
        if (promoCode.trim().toUpperCase() === 'VYAPAR10') {
            setPromoDiscount(Math.round(subtotal * 0.1));
            setPromoApplied(true);
        } else if (promoCode.trim()) {
            alert('Invalid promo code. Try VYAPAR10 for 10% off!');
        }
    };

    return (
        <main className={styles.cartContainer}>
            <div className="container">
                <h1 className={styles.pageTitle}>Your Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
                        <h2 style={{ marginBottom: '0.5rem' }}>Your cart is empty</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Looks like you haven&apos;t added anything yet.</p>
                        <Link href="/products" className="btn btn-primary">Browse Products</Link>
                    </div>
                ) : (
                    <div className={styles.cartGrid}>
                        {/* Left Column: Cart Items List */}
                        <div className={styles.itemsColumn}>
                            <div className={styles.tableHeader}>
                                <div className={styles.colProduct}>Product</div>
                                <div className={styles.colQuantity}>Quantity</div>
                                <div className={styles.colTotal}>Total</div>
                            </div>

                            <div className={styles.cartList}>
                                {cartItems.map(item => (
                                    <div key={item.id} className={styles.cartItemRow}>
                                        <div className={styles.colProduct}>
                                            <div className={styles.itemImage}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                            </div>
                                            <div className={styles.itemDetails}>
                                                <h4><Link href={`/product/${item.productId}`}>{item.name}</Link></h4>
                                                {item.variant && <p className={styles.itemVariant}>Variant: {item.variant}</p>}
                                                <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>Remove</button>
                                            </div>
                                        </div>

                                        <div className={styles.colQuantity}>
                                            <div className={styles.qtyControls}>
                                                <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                            </div>
                                        </div>

                                        <div className={styles.colTotal}>
                                            <span className={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className={styles.summaryColumn}>
                            <div className={`glass-panel ${styles.summaryCard}`}>
                                <h3>Order Summary</h3>

                                <div className={styles.summaryRow}>
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Estimated Taxes (18%)</span>
                                    <span>₹{Math.round(taxes).toLocaleString()}</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                                </div>
                                {promoApplied && (
                                    <div className={styles.summaryRow} style={{ color: 'var(--success)' }}>
                                        <span>Promo (VYAPAR10)</span>
                                        <span>-₹{promoDiscount.toLocaleString()}</span>
                                    </div>
                                )}

                                <div className={styles.promoCodeBox}>
                                    <input
                                        type="text"
                                        placeholder="Promo code (try VYAPAR10)"
                                        className={styles.promoInput}
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        disabled={promoApplied}
                                    />
                                    <button className="btn btn-outline" onClick={handleApplyPromo} disabled={promoApplied}>
                                        {promoApplied ? '✓ Applied' : 'Apply'}
                                    </button>
                                </div>

                                <hr className={styles.divider} />

                                <div className={styles.totalRow}>
                                    <span>Total</span>
                                    <span>₹{Math.round(total).toLocaleString()}</span>
                                </div>

                                <Link href="/checkout" className={`btn btn-primary ${styles.checkoutBtn}`}>
                                    Proceed to Checkout
                                </Link>

                                <div className={styles.secureCheckout}>
                                    <span className="icon">🔒</span> Secure Checkout
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
