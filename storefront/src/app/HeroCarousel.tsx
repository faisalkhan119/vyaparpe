"use client";
import { useState, useEffect } from 'react';
import styles from './HeroCarousel.module.css';

const offers = [
    {
        id: 1,
        title: "Big Diwali Sale - Flat 50% Off",
        description: "Upgrade your electronics with our biggest sale of the year. Grab the best deals before they run out!",
        bgColor: "linear-gradient(135deg, #2874f0 0%, #1e5fc9 100%)",
        link: "/deals",
    },
    {
        id: 2,
        title: "New Arrivals in Fashion",
        description: "Explore the latest trends and styles. Handpicked collections from top sellers.",
        bgColor: "linear-gradient(135deg, #ff6161 0%, #e53935 100%)",
        link: "/products",
    },
    {
        id: 3,
        title: "Super Saver Grocery Deals",
        description: "Get up to 30% off on monthly groceries and daily essentials.",
        bgColor: "linear-gradient(135deg, #ff9f00 0%, #e89100 100%)",
        link: "/products",
    }
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % offers.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.carouselContainer}>
            <div
                className={styles.carouselTrack}
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {offers.map((offer) => (
                    <div
                        key={offer.id}
                        className={styles.slide}
                        style={{ background: offer.bgColor }}
                    >
                        <div className={`container ${styles.slideContent}`}>
                            <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '2rem', display: 'inline-block', marginBottom: '1.5rem', fontWeight: 600, fontSize: '0.875rem' }}>Limited Time Offer</span>
                            <h1>{offer.title}</h1>
                            <p>{offer.description}</p>
                            <a href={offer.link} className="btn" style={{ background: 'white', color: '#0F172A', marginTop: '1rem', padding: '0.75rem 2rem' }}>
                                Explore Deals →
                            </a>
                        </div>

                        <div className={styles.glowOrb1}></div>
                        <div className={styles.glowOrb2}></div>
                    </div>
                ))}
            </div>

            <div className={styles.indicators}>
                {offers.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${current === index ? styles.active : ''}`}
                        onClick={() => setCurrent(index)}
                    />
                ))}
            </div>
        </div>
    );
}
