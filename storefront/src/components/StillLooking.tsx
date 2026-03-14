'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './StillLooking.module.css';

interface BrowsedItem {
    id: string;
    title: string;
    image: string;
    price: number;
}

export default function StillLooking() {
    const [items, setItems] = useState<BrowsedItem[]>([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        try {
            // Get user name
            const auth = localStorage.getItem('userAuth');
            if (auth) {
                const parsed = JSON.parse(auth);
                setUserName(parsed.name?.split(' ')[0] || '');
            }

            // Get recently viewed from localStorage  
            const viewed = localStorage.getItem('recentlyViewed');
            if (viewed) {
                const parsed = JSON.parse(viewed);
                setItems(parsed.slice(0, 6));
            }
        } catch { /* ignore */ }
    }, []);

    if (items.length === 0) {
        // Show placeholder items when no browse history
        return (
            <section className={styles.container}>
                <h3 className={styles.heading}>
                    {userName ? `${userName}, discover something new!` : 'Discover something new!'}
                </h3>
                <div className={styles.scrollRow}>
                    {['📱 Phones', '👟 Shoes', '🎧 Audio', '💻 Laptops', '👕 Fashion', '🧴 Beauty'].map((item, i) => (
                        <Link key={i} href="/products" className={styles.card}>
                            <div className={styles.cardImage}>
                                <span style={{ fontSize: '2rem' }}>{item.split(' ')[0]}</span>
                            </div>
                            <span className={styles.cardLabel}>{item.split(' ')[1]}</span>
                        </Link>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className={styles.container}>
            <h3 className={styles.heading}>
                {userName ? `${userName}, still looking for these?` : 'Still looking for these?'}
            </h3>
            <div className={styles.scrollRow}>
                {items.map((item) => (
                    <Link key={item.id} href={`/product/${item.id}`} className={styles.card}>
                        <div className={styles.cardImage}>
                            {item.image?.startsWith('http') || item.image?.startsWith('/') ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                            ) : (
                                <span style={{ fontSize: '2rem' }}>{item.image}</span>
                            )}
                        </div>
                        <span className={styles.cardLabel}>{item.title}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
