'use client';
import { useState, useEffect } from 'react';
import styles from './DealTimer.module.css';

const categoryTitles: Record<string, string> = {
    'electronics': 'Gadget Blowout',
    'fashion': 'Wardrobe Refresh',
    'groceries': 'Pantry Essentials',
    'home & kitchen': 'Kitchen Appliance Sale',
    'beauty': 'Glow Up Deals',
    'sports': 'Sports Equipment Sale',
    'books': 'Bestseller Price Drop',
    'toys': 'Playtime Blowout',
    'jewelry': 'Fine Jewelry Sale',
    'digital': 'Software Discounts',
    'services': 'Service Booking Sale',
    'gifts': 'Gifting Bonanza',
    'automotive': 'Car Care Deals',
    'health': 'Health Supplements Sale',
    'baby & kids': 'Baby Care Deals',
    'pet supplies': 'Pet Care Mega Deals',
    'stationery': 'Office Supplies Sale',
    'fitness': 'Home Gym Deals',
    'travel': 'Travel Gear Blowout',
    'furniture': 'Home Makeover Sale',
    'default': 'Flash Sale'
};

export default function DealTimer({ category = '' }: { category?: string }) {
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });
    const title = category 
        ? categoryTitles[category.toLowerCase()] || categoryTitles.default 
        : categoryTitles.default;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else {
                    seconds = 59;
                    if (minutes > 0) minutes--;
                    else {
                        minutes = 59;
                        if (hours > 0) hours--;
                        else return { hours: 0, minutes: 0, seconds: 0 }; // end
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const format = (num: number) => num.toString().padStart(2, '0');

    return (
        <div className={styles.bannerContainer}>
            <div className="container">
                <div className={`glass-panel ${styles.bannerContent}`}>
                    <div className={styles.dealInfo}>
                        <span className={styles.flashBadge}>⚡ Flash Sale</span>
                        <h3>Up to 60% Off {title}</h3>
                        <p>Don&apos;t miss out! Limited stock available on premium items.</p>
                    </div>

                    <div className={styles.timerBlock}>
                        <div className={styles.timerUnit}>
                            <span className={styles.timeVal}>{format(timeLeft.hours)}</span>
                            <span className={styles.timeLabel}>HRS</span>
                        </div>
                        <span className={styles.timeColon}>:</span>
                        <div className={styles.timerUnit}>
                            <span className={styles.timeVal}>{format(timeLeft.minutes)}</span>
                            <span className={styles.timeLabel}>MIN</span>
                        </div>
                        <span className={styles.timeColon}>:</span>
                        <div className={styles.timerUnit}>
                            <span className={styles.timeVal}>{format(timeLeft.seconds)}</span>
                            <span className={styles.timeLabel}>SEC</span>
                        </div>
                    </div>

                    <button className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                        Shop Flash Deals
                    </button>
                </div>
            </div>
        </div>
    );
}
