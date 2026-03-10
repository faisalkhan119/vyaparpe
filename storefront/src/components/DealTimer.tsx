'use client';
import { useState, useEffect } from 'react';
import styles from './DealTimer.module.css';

export default function DealTimer() {
    const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

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
                        <h3>Up to 60% Off Top Brands</h3>
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
