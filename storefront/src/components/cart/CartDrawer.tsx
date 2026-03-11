'use client';
import Link from 'next/link';
import styles from './CartDrawer.module.css';
import { useCart } from '@/context/CartContext';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();

    const freeShippingThreshold = 50000;
    const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

    if (!isOpen) return null;

    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={`glass-panel ${styles.drawer}`}>

                <div className={styles.header}>
                    <h2>Your Cart ({cartItems.length})</h2>
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>

                {cartItems.length > 0 ? (
                    <>
                        <div className={styles.shippingBar}>
                            <p>
                                {subtotal >= freeShippingThreshold
                                    ? "🎉 You've unlocked Free Shipping!"
                                    : `Add ₹${(freeShippingThreshold - subtotal).toLocaleString()} more for Free Shipping`}
                            </p>
                            <div className={styles.progressBarBg}>
                                <div
                                    className={styles.progressBarFill}
                                    style={{ width: `${progressPercent}%`, backgroundColor: subtotal >= freeShippingThreshold ? 'var(--success)' : 'var(--primary)' }}
                                />
                            </div>
                        </div>

                        <div className={styles.itemList}>
                            {cartItems.map(item => (
                                <div key={item.id} className={styles.cartItem}>
                                    <div className={styles.itemImage}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <div className={styles.itemHeader}>
                                            <h4>{item.name}</h4>
                                            <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>🗑️</button>
                                        </div>
                                        {item.variantLabels?.map((label, i) => (
                                            <div key={i} className="text-muted mt-1" style={{ fontSize: '0.85rem' }}>
                                                {label}
                                            </div>
                                        ))}
                                        <div className={styles.itemBottomRow}>
                                            <div className={styles.qtyControls}>
                                                <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                            </div>
                                            <span className={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.footer}>
                            <div className={styles.subtotalRow}>
                                <span>Subtotal</span>
                                <span className={styles.subtotalValue}>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <p className={styles.taxesNote}>Taxes and shipping calculated at checkout</p>
                            <div className={styles.actionButtons}>
                                <Link href="/cart" className="btn btn-outline" onClick={onClose}>View Cart</Link>
                                <Link href="/checkout" className="btn btn-primary" onClick={onClose}>Checkout</Link>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>🛒</div>
                        <h3>Your cart is empty</h3>
                        <p>Looks like you haven&apos;t added anything yet.</p>
                        <button className="btn btn-primary" onClick={onClose}>Continue Shopping</button>
                    </div>
                )}

            </div>
        </>
    );
}
