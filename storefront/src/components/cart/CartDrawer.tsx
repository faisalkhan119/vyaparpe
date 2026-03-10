'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './CartDrawer.module.css';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    // Mock cart items
    const [cartItems, setCartItems] = useState([
        {
            id: 'c1',
            name: 'Sony WH-1000XM5 Wireless Headphones',
            price: 29990,
            quantity: 1,
            image: '📸',
            color: 'Midnight Black'
        },
        {
            id: 'c2',
            name: 'Premium Leather Headphone Stand',
            price: 1499,
            quantity: 2,
            image: '📸',
            color: 'Brown'
        }
    ]);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const freeShippingThreshold = 50000;
    const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100);

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(cartItems.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return { ...item, quantity: newQty > 0 ? newQty : 1 };
            }
            return item;
        }));
    };

    const removeItem = (id: string) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

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
                                    <div className={styles.itemImage}>{item.image}</div>
                                    <div className={styles.itemDetails}>
                                        <div className={styles.itemHeader}>
                                            <h4>{item.name}</h4>
                                            <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>🗑️</button>
                                        </div>
                                        <p className={styles.itemVariant}>Color: {item.color}</p>
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
