"use client";
import { useState, useEffect } from 'react';
import styles from './HeroCarousel.module.css';

const defaultOffers = [
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

const categoryOffers: Record<string, typeof defaultOffers> = {
    'electronics': [
        { id: 101, title: "Top Smartphones at 40% Off", description: "Upgrade your phone today with our massive clearance.", bgColor: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", link: "/products?category=Electronics" },
        { id: 102, title: "Laptops for Professionals", description: "High performance laptops starting at ₹35,000.", bgColor: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)", link: "/products?category=Electronics" }
    ],
    'fashion': [
        { id: 201, title: "Bestselling Sarees Under ₹499", description: "Ethnic wear blockbusters for this festive season.", bgColor: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)", link: "/products?category=Fashion" },
        { id: 202, title: "Men's Casuals 50-80% Off", description: "Jeans, shirts, and t-shirts to upgrade your wardrobe.", bgColor: "linear-gradient(135deg, #0cebeb 0%, #20e3b2 100%)", link: "/products?category=Fashion" }
    ],
    'groceries': [
        { id: 301, title: "Super Saver Grocery Deals", description: "Buy 1 Get 1 Free on staples, snacks, and beverages.", bgColor: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", link: "/products?category=Groceries" }
    ],
    'home & kitchen': [
        { id: 401, title: "Upgrade Your Kitchen", description: "Massive discounts on appliances and cookware.", bgColor: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)", link: "/products?category=Home & Kitchen" }
    ],
    'beauty': [
        { id: 501, title: "Glow Up Sale", description: "Top makeup & skincare brands up to 60% off.", bgColor: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)", link: "/products?category=Beauty" }
    ],
    'sports': [
        { id: 601, title: "Top Sports Gear @ 50% Off", description: "Boost your performance with premium equipment.", bgColor: "linear-gradient(135deg, #FF8008 0%, #FFA03A 100%)", link: "/products?category=Sports" }
    ],
    'books': [
        { id: 701, title: "Bestseller Library", description: "Expand your mind with top-rated fiction and non-fiction.", bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", link: "/products?category=Books" }
    ],
    'toys': [
        { id: 801, title: "Kids Carnival Mega Sale", description: "Joyful learning & fun starting at just ₹199.", bgColor: "linear-gradient(135deg, #f2709c 0%, #ff9472 100%)", link: "/products?category=Toys" }
    ],
    'jewelry': [
        { id: 901, title: "Timeless Elegance", description: "Exclusive gold and diamond collections.", bgColor: "linear-gradient(135deg, #B79891 0%, #94716B 100%)", link: "/products?category=Jewelry" }
    ],
    'digital': [
        { id: 1001, title: "Digital Downloads & Software", description: "Instant access to premium tools and templates.", bgColor: "linear-gradient(135deg, #232526 0%, #414345 100%)", link: "/products?category=Digital" }
    ],
    'services': [
        { id: 1101, title: "Expert Home Services", description: "Trusted professionals for cleaning, repair & salon.", bgColor: "linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)", link: "/products?category=Services" }
    ],
    'gifts': [
        { id: 1201, title: "Perfect Gifts for Loved Ones", description: "Customized & thoughtful gifting ideas.", bgColor: "linear-gradient(135deg, #e52d27 0%, #b31217 100%)", link: "/products?category=Gifts" }
    ],
    'automotive': [
        { id: 1301, title: "Rev Up Your Ride", description: "Car care, accessories and helmets on sale.", bgColor: "linear-gradient(135deg, #4ca1af 0%, #c4e0e5 100%)", link: "/products?category=Automotive" }
    ],
    'health': [
        { id: 1401, title: "Health & Wellness Essentials", description: "Vitamins, supplements and nutrition boosters.", bgColor: "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)", link: "/products?category=Health" }
    ],
    'baby & kids': [
        { id: 1501, title: "Baby Care Bonanza", description: "Diapers, strollers, and care products.", bgColor: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", link: "/products?category=Baby & Kids" }
    ],
    'pet supplies': [
        { id: 1601, title: "Pet Care Mega Deals", description: "Everything your furry friend needs.", bgColor: "linear-gradient(135deg, #ffb347 0%, #ffcc33 100%)", link: "/products?category=Pet Supplies" }
    ],
    'stationery': [
        { id: 1701, title: "Back to Office Essentials", description: "Premium pens, notebooks, and organizers.", bgColor: "linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%)", link: "/products?category=Stationery" }
    ],
    'fitness': [
        { id: 1801, title: "Upgrade Your Home Gym", description: "Treadmills, weights, and bands at unbeatable prices.", bgColor: "linear-gradient(135deg, #D31027 0%, #EA384D 100%)", link: "/products?category=Fitness" }
    ],
    'travel': [
        { id: 1901, title: "Travel in Style", description: "Tough luggage and comfortable accessories.", bgColor: "linear-gradient(135deg, #1fa2ff 0%, #12d8fa 50%, #a6ffcb 100%)", link: "/products?category=Travel" }
    ],
    'furniture': [
        { id: 2001, title: "Home Makeover Sale", description: "Modern furniture for your living space and office.", bgColor: "linear-gradient(135deg, #870000 0%, #190a05 100%)", link: "/products?category=Furniture" }
    ]
};

export default function HeroCarousel({ category = '' }: { category?: string }) {
    const [current, setCurrent] = useState(0);

    const offers = categoryOffers[category.toLowerCase()] || defaultOffers;

    useEffect(() => {
        setCurrent(0);
        
        if (offers.length <= 1) return;

        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % offers.length);
        }, 5000);
        
        return () => clearInterval(timer);
    }, [category, offers.length]);

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

            {offers.length > 1 && (
                <div className={styles.indicators}>
                    {offers.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${current === index ? styles.active : ''}`}
                            onClick={() => setCurrent(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
