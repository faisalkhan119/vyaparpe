'use client';
import styles from './SocialProofPopup.module.css';
import { useState, useEffect } from 'react';

const purchases = [
    { name: 'Rahul from Mumbai', product: 'Sony WH-1000XM5', time: '2 min ago' },
    { name: 'Priya from Delhi', product: 'Organic Toor Dal', time: '5 min ago' },
    { name: 'Amit from Bangalore', product: 'Nike Air Max 90', time: '8 min ago' },
    { name: 'Sneha from Pune', product: 'Samsung Galaxy S24', time: '12 min ago' },
];

export default function SocialProofPopup() {
    const [visible, setVisible] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const showInterval = setInterval(() => {
            setVisible(true);
            setIndex((prev) => (prev + 1) % purchases.length);
            setTimeout(() => setVisible(false), 4000);
        }, 8000);

        // Show first one after 3s
        const firstTimeout = setTimeout(() => {
            setVisible(true);
            setTimeout(() => setVisible(false), 4000);
        }, 3000);

        return () => {
            clearInterval(showInterval);
            clearTimeout(firstTimeout);
        };
    }, []);

    const purchase = purchases[index];

    return (
        <div className={`${styles.popup} ${visible ? styles.show : ''}`}>
            <div className={styles.icon}>🛒</div>
            <div className={styles.content}>
                <strong>{purchase.name}</strong> just bought
                <div className={styles.product}>{purchase.product}</div>
                <span className={styles.time}>{purchase.time}</span>
            </div>
            <button className={styles.close} onClick={() => setVisible(false)}>✕</button>
        </div>
    );
}
