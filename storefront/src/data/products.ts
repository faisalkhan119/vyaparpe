// Shared mock product data for the Vyaparpe Demo Storefront
export interface Product {
    id: string;
    title: string;
    brand: string;
    category: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviewsCount: number;
    description: string;
    inStock: boolean;
    image: string;
    badge?: string;
}

export const products: Product[] = [
    {
        id: 'sony-wh1000xm5',
        title: 'Sony WH-1000XM5 Wireless Headphones',
        brand: 'Sony',
        category: 'Electronics',
        price: 24990,
        originalPrice: 29990,
        rating: 4.8,
        reviewsCount: 1245,
        description: 'Industry-leading noise cancellation with two processors. 30-hour battery life, touch controls, speak-to-chat technology.',
        inStock: true,
        image: '🎧',
        badge: 'Bestseller',
    },
    {
        id: 'samsung-s24-ultra',
        title: 'Samsung Galaxy S24 Ultra 256GB',
        brand: 'Samsung',
        category: 'Electronics',
        price: 129999,
        originalPrice: 139999,
        rating: 4.7,
        reviewsCount: 892,
        description: 'Galaxy AI built-in. 200MP camera, titanium frame, S Pen included. The ultimate smartphone experience.',
        inStock: true,
        image: '📱',
    },
    {
        id: 'nike-air-max-90',
        title: 'Nike Air Max 90 Running Shoes',
        brand: 'Nike',
        category: 'Fashion',
        price: 12995,
        originalPrice: 14995,
        rating: 4.5,
        reviewsCount: 567,
        description: 'Classic comfort meets modern style. Visible Max Air unit in the heel and waffle outsole for traction.',
        inStock: true,
        image: '👟',
        badge: 'New',
    },
    {
        id: 'kindle-paperwhite',
        title: 'Kindle Paperwhite (16GB) 6.8" Display',
        brand: 'Amazon',
        category: 'Electronics',
        price: 13999,
        originalPrice: 15999,
        rating: 4.6,
        reviewsCount: 2103,
        description: 'Adjustable warm light, waterproof, 6.8" display, 10 weeks of battery. Your perfect reading companion.',
        inStock: false,
        image: '📚',
    },
    {
        id: 'organic-toor-dal',
        title: 'Organic Toor Dal Premium (1kg)',
        brand: 'FarmFresh',
        category: 'Groceries',
        price: 189,
        originalPrice: 249,
        rating: 4.4,
        reviewsCount: 324,
        description: 'Unpolished, chemical-free toor dal sourced directly from organic farms. Rich in protein and fiber.',
        inStock: true,
        image: '🫘',
        badge: 'Organic',
    },
    {
        id: 'boat-airdopes-141',
        title: 'boAt Airdopes 141 Wireless Earbuds',
        brand: 'boAt',
        category: 'Electronics',
        price: 999,
        originalPrice: 2990,
        rating: 4.1,
        reviewsCount: 15672,
        description: '42H playtime, ENx™ tech, BEAST mode for gaming, IPX4 water resistance. Best-selling earbuds in India.',
        inStock: true,
        image: '🎵',
        badge: '67% OFF',
    },
    {
        id: 'prestige-mixer',
        title: 'Prestige Iris 750W Mixer Grinder',
        brand: 'Prestige',
        category: 'Home & Kitchen',
        price: 2499,
        originalPrice: 4999,
        rating: 4.3,
        reviewsCount: 890,
        description: '3 stainless steel jars, 750W motor, 3 speed control with incher. Perfect for Indian cooking.',
        inStock: true,
        image: '🍳',
        badge: '50% OFF',
    },
    {
        id: 'levis-511-jeans',
        title: "Levi's 511 Slim Fit Men's Jeans",
        brand: "Levi's",
        category: 'Fashion',
        price: 1799,
        originalPrice: 3599,
        rating: 4.4,
        reviewsCount: 445,
        description: 'Classic slim fit with stretch fabric. Sits below waist, slim through hip and thigh. Timeless style.',
        inStock: true,
        image: '👖',
        badge: 'Sale',
    },
    {
        id: 'macbook-air-m3',
        title: 'MacBook Air M3 15" 16GB/512GB',
        brand: 'Apple',
        category: 'Electronics',
        price: 149900,
        originalPrice: 159900,
        rating: 4.9,
        reviewsCount: 312,
        description: 'Supercharged by M3. 18-hour battery life, Liquid Retina display, fanless design. The ultimate laptop.',
        inStock: true,
        image: '💻',
    },
    {
        id: 'dyson-v12',
        title: 'Dyson V12 Detect Slim Vacuum',
        brand: 'Dyson',
        category: 'Home & Kitchen',
        price: 42900,
        originalPrice: 52900,
        rating: 4.6,
        reviewsCount: 178,
        description: 'Laser detects dust you can\'t see. Piezo sensor auto-adjusts suction power. 60 min runtime.',
        inStock: true,
        image: '🧹',
    },
    {
        id: 'the-north-face-jacket',
        title: 'The North Face Thermoball Eco Jacket',
        brand: 'The North Face',
        category: 'Fashion',
        price: 8999,
        originalPrice: 12999,
        rating: 4.7,
        reviewsCount: 267,
        description: 'Lightweight, packable warmth with recycled insulation. Heat retention even when wet.',
        inStock: true,
        image: '🧥',
    },
    {
        id: 'a2-cow-milk',
        title: 'A2 Cow Milk Fresh (500ml)',
        brand: 'MilkBasket',
        category: 'Groceries',
        price: 35,
        originalPrice: 45,
        rating: 4.3,
        reviewsCount: 1890,
        description: 'Farm-fresh A2 cow milk with no preservatives. Delivered fresh to your doorstep daily.',
        inStock: true,
        image: '🥛',
    },
    {
        id: 'lakme-foundation',
        title: 'Lakme 9 to 5 Primer + Matte Foundation',
        brand: 'Lakme',
        category: 'Beauty',
        price: 575,
        originalPrice: 750,
        rating: 4.2,
        reviewsCount: 3420,
        description: 'Long-lasting matte finish with built-in primer. SPF 20 protection. Available in 12 shades.',
        inStock: true,
        image: '💄',
        badge: '23% OFF',
    },
    {
        id: 'maybelline-mascara',
        title: 'Maybelline Lash Sensational Mascara',
        brand: 'Maybelline',
        category: 'Beauty',
        price: 449,
        originalPrice: 599,
        rating: 4.4,
        reviewsCount: 5670,
        description: 'Fanning brush with 10 layers of bristles to capture every lash. Waterproof formula.',
        inStock: true,
        image: '👁️',
    },
    {
        id: 'yonex-racket',
        title: 'Yonex Nanoflare 700 Badminton Racket',
        brand: 'Yonex',
        category: 'Sports',
        price: 8990,
        originalPrice: 11990,
        rating: 4.6,
        reviewsCount: 421,
        description: 'Graphite frame with Sonic Flare System. Head light balance for rapid swing speed.',
        inStock: true,
        image: '🏸',
        badge: '25% OFF',
    },
    {
        id: 'nivia-football',
        title: 'Nivia Storm Football Size 5',
        brand: 'Nivia',
        category: 'Sports',
        price: 699,
        originalPrice: 999,
        rating: 4.3,
        reviewsCount: 1567,
        description: 'Machine stitched PVC football with nylon winding. Suitable for turf and hard ground.',
        inStock: true,
        image: '⚽',
    },
    {
        id: 'atomic-habits',
        title: 'Atomic Habits by James Clear',
        brand: 'Penguin',
        category: 'Books',
        price: 399,
        originalPrice: 799,
        rating: 4.8,
        reviewsCount: 12450,
        description: 'An easy and proven way to build good habits and break bad ones. #1 New York Times bestseller.',
        inStock: true,
        image: '📖',
        badge: 'Bestseller',
    },
    {
        id: 'rich-dad-poor-dad',
        title: 'Rich Dad Poor Dad by Robert Kiyosaki',
        brand: 'Plata Publishing',
        category: 'Books',
        price: 299,
        originalPrice: 599,
        rating: 4.7,
        reviewsCount: 8900,
        description: 'What the rich teach their kids about money that the poor and middle class do not!',
        inStock: true,
        image: '📚',
    },
    {
        id: 'lego-city-set',
        title: 'LEGO City Police Station Building Set',
        brand: 'LEGO',
        category: 'Toys',
        price: 4999,
        originalPrice: 6999,
        rating: 4.7,
        reviewsCount: 678,
        description: '668 pieces. Includes 5 minifigures, police helicopter, and dog figure. Ages 6+.',
        inStock: true,
        image: '🧱',
        badge: '29% OFF',
    },
    {
        id: 'hot-wheels-track',
        title: 'Hot Wheels Ultimate Garage Track Set',
        brand: 'Hot Wheels',
        category: 'Toys',
        price: 3499,
        originalPrice: 4999,
        rating: 4.5,
        reviewsCount: 945,
        description: 'Multi-level garage with track, car wash, and gas station. Stores 36+ cars. Ages 5-9.',
        inStock: true,
        image: '🏎️',
    },
];

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter(p => p.category === category);
}

export function getProductsByBrand(brand: string): Product[] {
    return products.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
}

export function getFeaturedProducts(): Product[] {
    return products.slice(0, 8);
}

export function getTrendingProducts(): Product[] {
    return [...products].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 4);
}

export function getRecentlyViewed(): Product[] {
    return [products[1], products[5], products[8], products[3]];
}
