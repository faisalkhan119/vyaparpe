'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../AccountPages.module.css';
import wlStyles from './Wishlist.module.css';

export default function WishlistPage() {
    const [items, setItems] = useState([
        { id: 1, name: 'Sony WH-1000XM5 Headphones', price: 24990, oldPrice: 29990, image: '🎧', inStock: true },
        { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 129999, oldPrice: 139999, image: '📱', inStock: true },
        { id: 3, name: 'Kindle Paperwhite (16GB)', price: 13999, oldPrice: 15999, image: '📚', inStock: false },
        { id: 4, name: 'Nike Air Max 90', price: 12995, oldPrice: 14995, image: '👟', inStock: true },
    ]);

    const removeItem = (id: number) => {
        setItems(items.filter(i => i.id !== id));
    };

    return (
        <div>
            <div className={styles.pageHeader}>
                <h2>My Wishlist</h2>
                <span style={{ color: 'var(--text-muted)' }}>{items.length} items</span>
            </div>

            <div className={wlStyles.wishlistGrid}>
                {items.map((item) => (
                    <div key={item.id} className={wlStyles.wishItem}>
                        <button className={wlStyles.removeBtn} onClick={() => removeItem(item.id)} title="Remove">✕</button>

                        <div className={wlStyles.itemImage}>{item.image}</div>

                        <div className={wlStyles.itemInfo}>
                            <Link href={`/product/${item.id}`} className={wlStyles.itemName}>{item.name}</Link>
                            <div className={wlStyles.priceRow}>
                                <span className={wlStyles.price}>₹{item.price.toLocaleString()}</span>
                                <span className={wlStyles.oldPrice}>₹{item.oldPrice.toLocaleString()}</span>
                                <span className={wlStyles.discount}>{Math.round((1 - item.price / item.oldPrice) * 100)}% off</span>
                            </div>
                        </div>

                        {item.inStock ? (
                            <button className={`btn btn-primary ${wlStyles.cartBtn}`}>🛒 Add to Cart</button>
                        ) : (
                            <button className={`btn btn-outline ${wlStyles.cartBtn}`} style={{ color: '#f59e0b', borderColor: '#f59e0b' }}>🔔 Notify Me</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
