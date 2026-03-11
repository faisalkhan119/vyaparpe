'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../AccountPages.module.css';
import wlStyles from './Wishlist.module.css';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
    const { addToCart } = useCart();
    const [addedId, setAddedId] = useState<number | null>(null);
    const [items, setItems] = useState([
        { id: 1, productId: 'sony-wh1000xm5', name: 'Sony WH-1000XM5 Headphones', price: 24990, oldPrice: 29990, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800', inStock: true },
        { id: 2, productId: 'samsung-galaxy-s24-ultra', name: 'Samsung Galaxy S24 Ultra', price: 129999, oldPrice: 139999, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800', inStock: true },
        { id: 3, productId: 'kindle-paperwhite', name: 'Kindle Paperwhite (16GB)', price: 13999, oldPrice: 15999, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80&w=800', inStock: false },
        { id: 4, productId: 'nike-air-max-90', name: 'Nike Air Max 90', price: 12995, oldPrice: 14995, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', inStock: true },
    ]);
    const [notifyItems, setNotifyItems] = useState<number[]>([]);

    const toggleNotify = (id: number) => {
        setNotifyItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const removeItem = (id: number) => {
        setItems(items.filter(i => i.id !== id));
    };

    const handleAddToCart = (item: typeof items[0]) => {
        addToCart({ productId: item.productId, name: item.name, price: item.price, image: item.image });
        setAddedId(item.id);
        setTimeout(() => setAddedId(null), 2000);
    };

    return (
        <div>
            <div className={styles.pageHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2>My Wishlist</h2>
                    <span style={{ color: 'var(--text-muted)' }}>{items.length} items</span>
                </div>
                <button 
                    className="btn btn-outline" 
                    onClick={() => {
                        navigator.clipboard.writeText('https://vyaparpe.com/wishlist/v7x9p2q');
                        alert('Wishlist link copied to clipboard!');
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
                >
                    📤 Share Wishlist
                </button>
            </div>

            <div className={wlStyles.wishlistGrid}>
                {items.map((item) => (
                    <div key={item.id} className={wlStyles.wishItem}>
                        <button className={wlStyles.removeBtn} onClick={() => removeItem(item.id)} title="Remove">✕</button>

                        <div className={wlStyles.itemImage}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                        </div>

                        <div className={wlStyles.itemInfo}>
                            <Link href={`/product/${item.productId}`} className={wlStyles.itemName}>{item.name}</Link>
                            <div className={wlStyles.priceRow}>
                                <span className={wlStyles.price}>₹{item.price.toLocaleString()}</span>
                                <span className={wlStyles.oldPrice}>₹{item.oldPrice.toLocaleString()}</span>
                                <span className={wlStyles.discount}>{Math.round((1 - item.price / item.oldPrice) * 100)}% off</span>
                            </div>
                        </div>

                        {item.inStock ? (
                            <button
                                className={`btn ${addedId === item.id ? 'btn-success' : 'btn-primary'} ${wlStyles.cartBtn}`}
                                onClick={() => handleAddToCart(item)}
                                disabled={addedId === item.id}
                            >
                                {addedId === item.id ? '✓ Added!' : '🛒 Add to Cart'}
                            </button>
                        ) : (
                            <button
                                className={`btn btn-outline ${wlStyles.cartBtn}`}
                                style={{ color: '#f59e0b', borderColor: '#f59e0b' }}
                                onClick={() => alert('You will be notified when this item is back in stock!')}
                            >
                                🔔 Notify Me
                            </button>
                        )}
                        
                        <label className={wlStyles.priceDropToggle} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                            <input 
                                type="checkbox" 
                                checked={notifyItems.includes(item.id)}
                                onChange={() => toggleNotify(item.id)}
                                style={{ width: '14px', height: '14px', accentColor: 'var(--primary)' }}
                            />
                            <span>Notify on price drop</span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
