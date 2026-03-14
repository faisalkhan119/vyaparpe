'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './NotificationDrawer.module.css';

interface NotificationDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    const [notifications] = useState([
        { id: 1, type: 'order', title: 'Order Shipped! 🚚', message: 'Your order ORD-84A29B has been shipped via Delhivery.', time: '2 hours ago', read: false },
        { id: 2, type: 'promo', title: 'Flash Sale Live! ⚡', message: 'Up to 67% off on Electronics. Ends in 5 hours!', time: '3 hours ago', read: false },
        { id: 3, type: 'wallet', title: 'Cashback Credited 💰', message: '₹150 cashback added to your wallet for order ORD-72B18.', time: '1 day ago', read: true },
        { id: 4, type: 'stock', title: 'Back in Stock! 📦', message: 'Kindle Paperwhite from your wishlist is now available.', time: '2 days ago', read: true },
        { id: 5, type: 'loyalty', title: 'Level Up! 🏆', message: 'Congratulations! You\'ve reached Gold tier. Enjoy 2x rewards!', time: '3 days ago', read: true },
        { id: 6, type: 'sub', title: 'Subscription Renewed 🔄', message: 'Your A2 Cow Milk daily subscription has been renewed.', time: '4 days ago', read: true },
    ]);

    if (!isOpen || !mounted) return null;

    const drawerContent = (
        <>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.drawer}>
                <div className={styles.drawerHeader}>
                    <h3>Notifications</h3>
                    <button className={styles.markAll}>Mark all as read</button>
                    <button className={styles.closeBtn} onClick={onClose}>✕</button>
                </div>
                <div className={styles.notifList}>
                    {notifications.map((n) => (
                        <div key={n.id} className={`${styles.notifItem} ${!n.read ? styles.unread : ''}`}>
                            <div className={styles.notifDot}>{!n.read && <span className={styles.dot}></span>}</div>
                            <div className={styles.notifContent}>
                                <div className={styles.notifTitle}>{n.title}</div>
                                <p className={styles.notifMsg}>{n.message}</p>
                                <span className={styles.notifTime}>{n.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

    return createPortal(drawerContent, document.body);
}
