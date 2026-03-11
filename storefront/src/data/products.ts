// Shared mock product data for the Vyaparpe Demo Storefront
export interface ServiceAddon {
    id: string;
    name: string;
    price: number;
    icon: string;
}

export interface ServiceConfig {
    duration: string;
    availableSlots: string[];
    providers: { id: string; name: string; rating: number; jobsDone: number; image?: string }[];
    addons?: ServiceAddon[];
    inclusions?: string[];
    exclusions?: string[];
    convenienceFee?: number;
}

export interface DigitalConfig {
    fileSize: string;
    fileType: string;
    downloadUrl: string;
}

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
    stock?: number;
    image: string;
    images?: string[];
    video?: string;
    highlights?: string[];
    badge?: string;
    type?: 'physical' | 'service' | 'digital';
    serviceConfig?: ServiceConfig;
    digitalConfig?: DigitalConfig;
    variantGroups?: import('../components/product/ProductVariants').VariantGroup[];
}

export const products: Product[] = [
    {
        id: 'sony-wh1000xm5',
        title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
        brand: 'Sony',
        category: 'Electronics',
        price: 24990,
        originalPrice: 29990,
        rating: 4.8,
        reviewsCount: 1245,
        description: 'Industry-leading noise cancellation with two processors controlling eight microphones. Magnificent sound, engineered to perfection with the new Integrated Processor V1.',
        inStock: true,
        stock: 3,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        highlights: [
            'Industry-Leading Active Noise Cancellation',
            'Ultra-comfortable, lightweight design with soft fit leather',
            'Up to 30 hours of battery life with quick charging',
            'Multipoint connection allows paired styling with two Bluetooth devices',
            'Crystal clear hands-free calling with precise voice pickup'
        ],
        badge: 'Bestseller',
        variantGroups: [
            {
                id: 'color', name: 'Color', type: 'image',
                options: [
                    { id: 'black', label: 'Midnight Black', thumb: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800' },
                    { id: 'silver', label: 'Platinum Silver', thumb: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800' }
                ]
            }
        ]
    },
    {
        id: 'samsung-s24-ultra',
        title: 'Samsung Galaxy S24 Ultra 5G AI Smartphone (256GB, Titanium Black)',
        brand: 'Samsung',
        category: 'Electronics',
        price: 129999,
        originalPrice: 139999,
        rating: 4.7,
        reviewsCount: 892,
        description: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.',
        inStock: true,
        stock: 12,
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1649859398021-afbfa39e8cdf?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        highlights: [
            'Built-in Galaxy AI for Live Translate and Note Assist',
            'All-new tough Titanium exterior frame',
            '200MP Main Camera with ProVisual AI Engine',
            'Built-in S Pen writes across the flat display',
            'Snapdragon 8 Gen 3 for Galaxy processor'
        ],
        variantGroups: [
            {
                id: 'storage', name: 'Storage', type: 'button',
                options: [
                    { id: '256gb', label: '256GB' },
                    { id: '512gb', label: '512GB' },
                    { id: '1tb', label: '1TB' }
                ]
            },
            {
                id: 'color', name: 'Color', type: 'button',
                options: [
                    { id: 'titanium-black', label: 'Titanium Black' },
                    { id: 'titanium-gray', label: 'Titanium Gray' },
                    { id: 'titanium-violet', label: 'Titanium Violet' }
                ]
            }
        ]
    },
    {
        id: 'nike-air-max-90',
        title: 'Nike Air Max 90 Premium Running Shoes',
        brand: 'Nike',
        category: 'Fashion',
        price: 12995,
        originalPrice: 14995,
        rating: 4.5,
        reviewsCount: 567,
        description: 'Lace up and feel the legacy. Produced at the intersection of art, music and culture, this champion running shoe helped define the 90s.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1605340537586-ba6a7ffa4366?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        highlights: [
            'Originally designed for performance running',
            'Max Air unit in the heel adds unbelievable cushioning',
            'Low-profile design elegantly frames the ankle',
            'Rubber Waffle outsole adds heritage look and durability',
            'Stitched overlays add retro 90s styling'
        ],
        badge: 'New',
        variantGroups: [
            {
                id: 'size', name: 'US Size', type: 'button',
                options: [
                    { id: '7', label: '7' },
                    { id: '8', label: '8' },
                    { id: '9', label: '9' },
                    { id: '10', label: '10' },
                    { id: '11', label: '11' }
                ]
            },
            {
                id: 'color', name: 'Color', type: 'image',
                options: [
                    { id: 'red', label: 'University Red', thumb: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
                    { id: 'white', label: 'Triple White', thumb: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800' },
                    { id: 'black', label: 'Stealth Black', thumb: 'https://images.unsplash.com/photo-1605340537586-ba6a7ffa4366?auto=format&fit=crop&q=80&w=800' }
                ]
            }
        ]
    },
    {
        id: 'kindle-paperwhite',
        title: 'All-new Kindle Paperwhite (16 GB) – Now with a 6.8" display',
        brand: 'Amazon',
        category: 'Electronics',
        price: 13999,
        originalPrice: 15999,
        rating: 4.6,
        reviewsCount: 2103,
        description: 'Get lost in a book. Now with a 6.8” display and thinner borders, adjustable warm light, up to 10 weeks of battery life.',
        inStock: false,
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1592496001020-d31bd831410d?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        highlights: [
            'All-new 6.8” display with thinner borders',
            'Reads like real paper, even in bright sunlight',
            'Store thousands of titles within 16GB memory',
            'A single charge via USB-C lasts weeks, not hours',
            'Waterproof (IPX8) so you can read in the bath'
        ]
    },
    {
        id: 'organic-toor-dal',
        title: 'FarmFresh Organic Premium Unpolished Toor Dal (1kg Pack)',
        brand: 'FarmFresh',
        category: 'Groceries',
        price: 189,
        originalPrice: 249,
        rating: 4.4,
        reviewsCount: 324,
        description: 'Authentic taste with zero polish. Carefully sourced from certified organic farms across India to ensure maximum nutrient retention.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1585996843431-2f3b97b0aae9?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        highlights: [
            '100% Certified Organic and Unpolished',
            'Rich source of natural Protein and Dietary Fiber',
            'Zero artificial polishing using water, oil or leather',
            'Subject to stringent 5-step quality checks',
            'Vacuum sealed to maintain absolute freshness'
        ],
        badge: 'Organic',
        variantGroups: [
            {
                id: 'weight', name: 'Weight', type: 'button',
                options: [
                    { id: '500g', label: '500g' },
                    { id: '1kg', label: '1kg' },
                    { id: '2kg', label: '2kg' },
                    { id: '5kg', label: '5kg' }
                ]
            }
        ]
    },
    {
        id: 'boat-airdopes-141',
        title: 'boAt Airdopes 141 True Wireless Earbuds',
        brand: 'boAt',
        category: 'Electronics',
        price: 999,
        originalPrice: 2990,
        rating: 4.1,
        reviewsCount: 15672,
        description: 'Immerse yourself into your favorite audio for hours on end. Equipped with 8mm drivers, a crystal-clear mic, and ultra-low latency specifically tuned for gaming and entertainment.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        highlights: [
            'Massive 42H total playtime with the charging case',
            'ENx™ technology suppresses environmental noise during calls',
            'BEAST™ mode features 80ms low latency for gaming',
            'ASAP Charge: 5 mins charge = 75 mins playtime',
            'IPX4 water and sweat resistance'
        ],
        badge: '67% OFF',
    },
    {
        id: 'prestige-mixer',
        title: 'Prestige Iris 750 Watt Mixer Grinder with 3 Stainless Steel Jars',
        brand: 'Prestige',
        category: 'Home & Kitchen',
        price: 2499,
        originalPrice: 4999,
        rating: 4.3,
        reviewsCount: 890,
        description: 'Your perfect kitchen companion. The powerful 750W motor tackles the toughest ingredients with ease, while the versatile jars cover your grinding, mixing, and juicing needs.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1585515320110-39fb67858cfa?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1616421008682-1d5427b0b728?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        highlights: [
            'Heavy-duty 750 Watt pure copper motor',
            '3 Premium Stainless Steel Jars + 1 Juicer Jar',
            '4 Super-efficient multi-purpose stainless steel blades',
            'Overload protection switch cuts off power during overheating',
            '2 Years comprehensive manufacturer warranty'
        ],
        badge: '50% OFF',
    },
    {
        id: 'levis-511-jeans',
        title: "Levi's Men's 511 Slim Fit Stretchable Jeans",
        brand: "Levi's",
        category: 'Fashion',
        price: 1799,
        originalPrice: 3599,
        rating: 4.4,
        reviewsCount: 445,
        description: 'A modern slim with room to move. Added stretch for all-day comfort. The 511™ Slim Fit Jeans are a classic since right now.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800'
        ],
        highlights: [
            'Classic Slim Fit — Sits precisely below the natural waist',
            'Woven with advanced stretch technology for durability',
            'Slim through the hip and thigh with a narrow leg',
            'Iconic leather patch at back waist',
            'Pre-shrunk cotton blend maintains size after washing'
        ],
        badge: 'Sale',
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        variantGroups: [
            {
                id: 'size', name: 'Waist Size', type: 'button',
                options: [
                    { id: '30', label: '30' },
                    { id: '32', label: '32' },
                    { id: '34', label: '34' },
                    { id: '36', label: '36' },
                    { id: '38', label: '38' }
                ]
            },
            {
                id: 'length', name: 'Length', type: 'button',
                options: [
                    { id: '30l', label: '30L' },
                    { id: '32l', label: '32L' },
                    { id: '34l', label: '34L' }
                ]
            },
            {
                id: 'color', name: 'Color', type: 'image',
                options: [
                    { id: 'blue', label: 'Dark Wash', thumb: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=800' },
                    { id: 'black', label: 'True Black', thumb: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800' }
                ]
            }
        ]
    },
    {
        id: 'macbook-air-m3',
        title: 'Apple MacBook Air 15-inch with M3 chip (16GB RAM, 512GB SSD)',
        brand: 'Apple',
        category: 'Electronics',
        price: 149900,
        originalPrice: 159900,
        rating: 4.9,
        reviewsCount: 312,
        description: 'Supercharged by M3. The MacBook Air breezes through work and play — and the M3 chip brings even greater capabilities to the world’s most popular laptop.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        highlights: [
            '8-core CPU and 10-core GPU built on 3nm architecture',
            'Massive 15.3-inch Liquid Retina display with 500 nits brightness',
            'Incredible 18-hour battery life with MagSafe 3 charging',
            'Fanless, totally silent aluminum unibody design',
            '1080p FaceTime HD camera with studio-quality 3-mic array'
        ],
        variantGroups: [
            {
                id: 'warranty', name: 'Extended Warranty', type: 'checkbox',
                options: [
                    { id: 'applecare', label: 'Add 3 Years AppleCare+', priceModifier: 19900 }
                ]
            }
        ]
    },
    {
        id: 'dyson-v12',
        title: 'Dyson V12 Detect Slim Absolute Extra Vacuum Cleaner',
        brand: 'Dyson',
        category: 'Home & Kitchen',
        price: 42900,
        originalPrice: 52900,
        rating: 4.6,
        reviewsCount: 178,
        description: 'Dyson’s lightest intelligent cordless vacuum. A precisely-angled laser makes invisible dust visible on hard floors, so you don’t miss anything.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1582218084650-dd8ddcfeb29b?auto=format&fit=crop&q=80&w=800'
        ],
        highlights: [
            'Illuminated cleaner head reveals hidden dust',
            'Piezo sensor automatically sizes and counts dust particles',
            'Reacts automatically by increasing suction on heavily soiled floors',
            'LCD screen shows what’s been sucked up in real-time',
            'Up to 60 minutes of fade-free suction'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        variantGroups: [
            {
                id: 'attachments', name: 'Optional Attachments', type: 'multiselect', maxAllowed: 3,
                options: [
                    { id: 'pet-grooming', label: 'Pet Grooming Tool (+₹3500)' },
                    { id: 'mattress-tool', label: 'Mattress Tool (+₹2000)' },
                    { id: 'extension-hose', label: 'Extension Hose (+₹1500)' }
                ]
            }
        ]
    },
    {
        id: 'the-north-face-jacket',
        title: 'The North Face Men\'s Thermoball Eco Insulated Jacket',
        brand: 'The North Face',
        category: 'Fashion',
        price: 8999,
        originalPrice: 12999,
        rating: 4.7,
        reviewsCount: 267,
        description: 'Lightweight, packable warmth meets sustainable design. The ThermoBall™ Eco Jacket features a new quilting pattern and 100% post-consumer recycled insulation for outstanding warmth.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800'
        ],
        highlights: [
            '100% post-consumer recycled polyester insulation',
            'Stows conveniently in its own chest pocket',
            'ThermoBall™ technology retains warmth even when wet',
            'Concealed, secure-zip hand pockets',
            'Classic fit with internal elastic-bound cuffs'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        variantGroups: [
            {
                id: 'size', name: 'Size', type: 'button',
                options: [
                    { id: 's', label: 'S' },
                    { id: 'm', label: 'M' },
                    { id: 'l', label: 'L' },
                    { id: 'xl', label: 'XL' }
                ]
            },
            {
                id: 'color', name: 'Color', type: 'button',
                options: [
                    { id: 'black', label: 'TNF Black' },
                    { id: 'navy', label: 'Urban Navy' },
                    { id: 'olive', label: 'Burnt Olive' }
                ]
            }
        ]
    },
    {
        id: 'a2-cow-milk',
        title: 'Farm Fresh A2 Desi Cow Milk (500ml Glass Bottle)',
        brand: 'MilkBasket',
        category: 'Groceries',
        price: 35,
        originalPrice: 45,
        rating: 4.3,
        reviewsCount: 1890,
        description: '100% pure, natural, and unprocessed A2 milk collected from open-grazing indigenous Gir cows. Delivered fresh to your doorstep within hours of milking.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800'
        ],
        highlights: [
            'Sourced exclusively from free-range Gir cows',
            'Zero preservatives, hormones, or antibiotics',
            'Rich in essential A2 beta-casein protein',
            'Delivered in eco-friendly glass bottles to preserve taste',
            'Untouched by human hands from milking to packaging'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        variantGroups: [
            {
                id: 'subscription', name: 'Delivery Frequency', type: 'subscription',
                options: [
                    { id: 'daily', label: 'Deliver Daily (Every Morning)' },
                    { id: 'alternate', label: 'Deliver Alternate Days' },
                    { id: 'once', label: 'One-time Delivery Only' }
                ]
            }
        ]
    },
    {
        id: 'lakme-foundation',
        title: 'Lakme 9 to 5 Primer + Matte Perfect Cover Foundation (25ml)',
        brand: 'Lakme',
        category: 'Beauty',
        price: 575,
        originalPrice: 750,
        rating: 4.2,
        reviewsCount: 3420,
        description: 'Your secret to a flawless, camera-ready finish. This built-in primer foundation glides on smoothly, conceals fine lines, and delivers a natural matte finish that lasts up to 16 hours.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800'
        ],
        highlights: [
            '2-in-1 formula with built-in primer for seamless blending',
            'Provides medium to high buildable coverage',
            'SPF 20 protects skin from harmful UV rays',
            'Available in 16 shades tailored for Indian skin tones',
            'Sweat-proof and non-patchy formula'
        ],
        badge: '23% OFF',
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        variantGroups: [
            {
                id: 'shade', name: 'Select Shade', type: 'select',
                options: [
                    { id: 'ivory', label: 'W120 Warm Ivory' },
                    { id: 'natural', label: 'N210 Rose Natural' },
                    { id: 'honey', label: 'W320 Warm Honey' },
                    { id: 'caramel', label: 'C420 Cool Caramel' }
                ]
            }
        ]
    },
    {
        id: 'maybelline-mascara',
        title: 'Maybelline New York Lash Sensational Waterproof Mascara',
        brand: 'Maybelline',
        category: 'Beauty',
        price: 449,
        originalPrice: 599,
        rating: 4.4,
        reviewsCount: 5670,
        description: 'Discover the icon. Our exclusive fanning brush with ten layers of bristles captures lashes from root to tip for a full-fan effect. Ophthalmologist tested.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&q=80&w=800'
        ],
        highlights: [
            'Exclusive fanning brush with 10 layers of bristles',
            'Liquid ink formula builds elegantly without clumping',
            '100% Waterproof and smudge-proof all day',
            'Safe for contact lens wearers',
            'Easily removed with oil-based makeup remover'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        variantGroups: [
            {
                id: 'bundle', name: 'Value Packs', type: 'checkbox',
                options: [
                    { id: 'pack-of-2', label: 'Make it a Pack of 2 (Save 15%)', priceModifier: 315 } // Base 449. Pack of 2 should be ~764 (449+315)
                ]
            }
        ]
    },
    {
        id: 'yonex-racket',
        title: 'Yonex Nanoflare 700 Graphite Professional Badminton Racket',
        brand: 'Yonex',
        category: 'Sports',
        price: 8990,
        originalPrice: 11990,
        rating: 4.6,
        reviewsCount: 421,
        description: 'Engineered for speed. The NANOFLARE 700 is a head-light racket built with unique technology and construction that helps players not only play nimbly but also achieve increased shuttle acceleration.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1599391398131-cd12dcb8e84c?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        highlights: [
            'Sonic Flare System provides unmatched power and stability',
            'High-modulus graphite frame with Super HMG',
            'Aero Frame design decreases air resistance for faster swings',
            'Built-in T-Joint creates a durable and high-strength frame',
            'Made in Japan for tournament-grade quality'
        ],
        badge: '25% OFF',
    },
    {
        id: 'nivia-football',
        title: 'Nivia Storm Machine Stitched Size 5 Football',
        brand: 'Nivia',
        category: 'Sports',
        price: 699,
        originalPrice: 999,
        rating: 4.3,
        reviewsCount: 1567,
        description: 'Dominate the field with the Nivia Storm. Constructed with premium PVC and machine-stitched for shape retention, it delivers excellent flight and predictability.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1614632537190-23e4146777bd?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800'
        ],
        highlights: [
            'Official Size 5 dimensions for standard match play',
            '32-panel constructed with machine stitching',
            'High-quality PVC exterior suitable for hard ground and turf',
            'Rubber bladder ensures superior air retention',
            'High visibility graphics for tracking in all weather conditions'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        variantGroups: [
            {
                id: 'size', name: 'Ball Size', type: 'button',
                options: [
                    { id: '3', label: 'Size 3 (Under 8)' },
                    { id: '4', label: 'Size 4 (8-12 Yrs)' },
                    { id: '5', label: 'Size 5 (Official)' }
                ]
            }
        ]
    },
    {
        id: 'atomic-habits',
        title: 'Atomic Habits: Tiny Changes, Remarkable Results by James Clear',
        brand: 'Penguin',
        category: 'Books',
        price: 399,
        originalPrice: 799,
        rating: 4.8,
        reviewsCount: 12450,
        description: 'No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear reveals practical strategies to form good habits, break bad ones, and master tiny behaviors.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800'
        ],
        highlights: [
            'Over 15 Million Copies Sold Worldwide',
            '#1 New York Times Bestseller',
            'Learn the 4 Laws of Behavior Change',
            'Includes practical strategies and worksheets',
            'Paperback edition printed on premium acid-free paper'
        ],
        badge: 'Bestseller',
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        variantGroups: [
            {
                id: 'format', name: 'Book Format', type: 'button',
                options: [
                    { id: 'paperback', label: 'Paperback' },
                    { id: 'hardcover', label: 'Hardcover', priceModifier: 200 },
                    { id: 'audiobook', label: 'Audiobook (Digital)', priceModifier: -100 }
                ]
            }
        ]
    },
    {
        id: 'rich-dad-poor-dad',
        title: 'Rich Dad Poor Dad: What the Rich Teach Their Kids About Money',
        brand: 'Plata Publishing',
        category: 'Books',
        price: 299,
        originalPrice: 599,
        rating: 4.7,
        reviewsCount: 8900,
        description: 'The #1 Personal Finance book of all time. Robert Kiyosaki challenges the myth that you need to earn a high income to be rich and explains the difference between working for money and having your money work for you.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800'
        ],
        highlights: [
            '25th Anniversary Edition with updated economic outlooks',
            'Explodes the myth that your house is an asset',
            'Defines once and for all what an asset and a liability are',
            'Shows parents why they cant rely on the school system',
            'Translated into dozens of languages globally'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        variantGroups: [
            {
                id: 'format', name: 'Book Format', type: 'button',
                options: [
                    { id: 'paperback', label: 'Paperback' },
                    { id: 'hardcover', label: 'Hardcover', priceModifier: 250 },
                    { id: 'audiobook', label: 'Audiobook (CD)', priceModifier: 50 }
                ]
            }
        ]
    },
    {
        id: 'lego-city-set',
        title: 'LEGO City Police Station Building Kit (668 Pieces)',
        brand: 'LEGO',
        category: 'Toys',
        price: 4999,
        originalPrice: 6999,
        rating: 4.7,
        reviewsCount: 678,
        description: 'Action-packed fun awaits with this multi-level LEGO City Police Station. Featuring a jailbreak explosion function, a police helicopter, a pursuit car, and a custom police dog.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1560961911-ba7ef651a56c?auto=format&fit=crop&q=80&w=800'
        ],
        highlights: [
            'Includes 668 pieces for hours of creative building',
            'Comes with 5 minifigures including 3 LEGO City TV characters',
            'Features an explodiing jail cell wall and light-brick searchlight',
            'Includes a police helicopter and criminal getaway truck',
            'Perfect gift for children aged 6 and up'
        ],
        badge: '29% OFF',
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
    },
    {
        id: 'hot-wheels-track',
        title: 'Hot Wheels Ultimate Garage Tower Track Set',
        brand: 'Hot Wheels',
        category: 'Toys',
        price: 3499,
        originalPrice: 4999,
        rating: 4.5,
        reviewsCount: 945,
        description: 'Inspire hours of imaginative play with an enormous Hot Wheels garage — a vertical tower with parking (easy storage) for more than 35 cars! Features a looping track, a shark obstacle, and multiple action zones.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1610408540847-a89f9d7756f7?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        highlights: [
            'Enormous multi-level garage stores up to 35+ die-cast cars',
            'Features a mechanical two-car elevator',
            'Includes a thrilling downhill side-by-side racing track',
            'Connects seamlessly to other Hot Wheels track sets',
            'Action zones include a car wash and tuning shop'
        ],
        variantGroups: [
            {
                id: 'extras', name: 'Expansion Pack', type: 'checkbox',
                options: [
                    { id: '10-car-pack', label: 'Add 10-Car Multi-pack (+₹999)', priceModifier: 999 }
                ]
            }
        ]
    },
    {
        id: 'gold-diamond-ring',
        title: '18K White Gold Diamond Engagement Ring (1 Carat)',
        brand: 'Aura',
        category: 'Jewelry',
        price: 85000,
        originalPrice: 110000,
        rating: 4.9,
        reviewsCount: 42,
        description: 'A timeless symbol of love. This exquisite 18K white gold ring features a stunning 1-carat brilliant-cut lab-grown diamond, surrounded by a delicate pavé halo.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1599643478514-4a410f065f42?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        highlights: [
            '1 Carat Lab-Grown Diamond (VVS1 Clarity, E Color)',
            'Solid 18K White Gold Band',
            'Conflict-free and eco-friendly',
            'Includes lifetime warranty and certificate of authenticity',
            'Comes in a premium velvet presentation box'
        ],
        badge: 'New',
        variantGroups: [
            {
                id: 'ring-size', name: 'Ring Size (US)', type: 'button',
                options: [
                    { id: '5', label: '5' }, { id: '6', label: '6' }, { id: '7', label: '7' }, { id: '8', label: '8' }
                ]
            },
            {
                id: 'engraving', name: 'Personalize', type: 'text',
                options: [
                    { id: 'custom-text', label: 'Engraving Text (Max 15 chars)' }
                ]
            }
        ]
    },
    {
        id: 'cloud-storage-pro',
        title: 'CloudSync Pro Storage Plan (2TB)',
        brand: 'CloudSync',
        category: 'Digital',
        price: 999, // Monthly base price
        originalPrice: 1200,
        rating: 4.8,
        reviewsCount: 1250,
        description: 'Secure, fast, and reliable cloud storage for all your files, photos, and creative projects. Access from anywhere, share with anyone.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        highlights: [
            '2TB (2000GB) of encrypted storage',
            'Automatic multi-device syncing',
            'Zero-knowledge end-to-end encryption',
            'Advanced sharing controls and password-protected links',
            '24/7 Priority Customer Support'
        ],
        badge: 'Digital Subscription',
        variantGroups: [
            {
                id: 'plan', name: 'Billing Cycle', type: 'subscription',
                options: [
                    { id: 'monthly', label: 'Billed Monthly (₹999/mo)' },
                    { id: 'annually', label: 'Billed Annually (Save 20%)', priceModifier: 8999 } // 8999 - 999 = 8000 difference added to base price
                ]
            }
        ]
    },
    {
        id: 'custom-printed-mug',
        title: 'Personalized Photo Coffee Mug (320ml)',
        brand: 'GiftCrafters',
        category: 'Gifts',
        price: 299,
        originalPrice: 499,
        rating: 4.6,
        reviewsCount: 840,
        description: 'Start your day with a smile! Upload your favorite photo, logo, or artwork and we will print it in high-definition on this premium ceramic mug.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1577720580479-7d839d829c73?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1556811320-80eaad54117b?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        highlights: [
            'Microwave and dishwasher safe',
            'High-quality fade-proof printing',
            'Perfect for corporate gifts or personal memories',
            'Large 320ml capacity for heavy coffee drinkers',
            'Ergonomic C-handle for comfortable grip'
        ],
        badge: 'Custom',
        variantGroups: [
            {
                id: 'artwork', name: 'Upload Artwork', type: 'file',
                options: [
                    { id: 'custom-file', label: 'Upload Image (.jpg, .png)' }
                ]
            }
        ]
    },
    {
        id: 'fresh-birthday-cake',
        title: 'Premium Dutch Truffle Birthday Cake',
        brand: 'SweetBells Bakery',
        category: 'Food',
        price: 750,
        originalPrice: 850,
        rating: 4.9,
        reviewsCount: 320,
        description: 'Rich, dense, and deeply chocolatey. This Dutch Truffle cake is baked fresh to order for your special celebrations.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1558961363-a0c84db2e964?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        highlights: [
            'Freshly baked to order',
            '100% Eggless option available',
            'Serves 6-8 people (Half kg)',
            'Made with premium Dutch cocoa powder',
            'Layered with rich, glossy chocolate truffle ganache'
        ],
        badge: 'Bestseller',
        variantGroups: [
            {
                id: 'weight', name: 'Cake Weight', type: 'button',
                options: [
                    { id: '0.5kg', label: '0.5 Kg' },
                    { id: '1kg', label: '1 Kg', priceModifier: 600 },
                    { id: '2kg', label: '2 Kg', priceModifier: 1800 }
                ]
            },
            {
                id: 'delivery-date', name: 'Select Delivery Date', type: 'date',
                options: [
                    { id: 'date-picker', label: 'Deliver On' }
                ]
            },
            {
                id: 'eggless', name: 'Dietary Preference', type: 'checkbox',
                options: [
                    { id: 'is-eggless', label: 'Make it Eggless', priceModifier: 50 }
                ]
            }
        ]
    },
    {
        id: 'assorted-donut-box',
        title: 'Build-a-Box: Assorted Donuts (Pack of 6)',
        brand: 'Glaze & Co.',
        category: 'Food',
        price: 499,
        originalPrice: 600,
        rating: 4.7,
        reviewsCount: 512,
        description: 'Create your perfect dozen (well, half-dozen). Pick exactly 6 of your favorite donut flavors below to complete your box.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1514517521153-1be72277b32f?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        highlights: [
            'Handcrafted every morning',
            'Premium Belgian chocolate glazes',
            'Mix and match your favorites',
            'Delivered in a beautiful presentation box',
            'Vegetarian friendly and incredibly soft'
        ],
        badge: 'Must Try',
        variantGroups: [
            {
                id: 'flavors', name: 'Select 6 Flavors', type: 'multiselect', maxAllowed: 6,
                options: [
                    { id: 'classic-glazed', label: 'Classic Glazed' },
                    { id: 'boston-cream', label: 'Boston Cream' },
                    { id: 'choco-hazelnut', label: 'Chocolate Hazelnut' },
                    { id: 'strawberry-sprinkle', label: 'Strawberry Sprinkle' },
                    { id: 'blueberry-cheesecake', label: 'Blueberry Cheesecake' },
                    { id: 'cinnamon-sugar', label: 'Cinnamon Sugar' }
                ]
            },
            {
                id: 'packaging', name: 'Add Extras', type: 'checkbox',
                options: [
                    { id: 'gift-wrap', label: 'Add Festive Ribbon & Message (+₹50)', priceModifier: 50 }
                ]
            }
        ]
    },
    {
        id: 'car-floor-mats',
        title: 'Premium 7D Custom Fit Car Floor Mats',
        brand: 'AutoShield',
        category: 'Automotive',
        price: 3500,
        originalPrice: 4999,
        rating: 4.5,
        reviewsCount: 89,
        description: 'Edge-to-edge luxury protection for your car floor. Custom laser-cut to perfectly match your specific car model.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1626017255146-5dd9dbfe28be?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        highlights: [
            '100% Waterproof and Scratch Resistant',
            'Traps dirt and spills effectively',
            'Anti-skid bottom layer for safety',
            'Odourless material perfect for all weather',
            'Easy to wash and instantly dry'
        ],
        variantGroups: [
            {
                id: 'car-model', name: 'Select Your Car Model', type: 'select',
                options: [
                    { id: 'swift', label: 'Maruti Suzuki Swift (2018-ON)' },
                    { id: 'creta', label: 'Hyundai Creta (2020-ON)' },
                    { id: 'nexon', label: 'Tata Nexon (2020-ON)' },
                    { id: 'xuv700', label: 'Mahindra XUV700' },
                    { id: 'city', label: 'Honda City (5th Gen)' }
                ]
            },
            {
                id: 'carpet-color', name: 'Base Color', type: 'button',
                options: [
                    { id: 'black', label: 'Jet Black' },
                    { id: 'beige', label: 'Lux Beige' },
                    { id: 'coffee', label: 'Coffee Brown' }
                ]
            }
        ]
    },
    {
        id: 'custom-pro-pc',
        title: 'TitanForm Custom Gaming Desktop (RTX 4070)',
        brand: 'TitanForm PC',
        category: 'Electronics',
        price: 135000,
        originalPrice: 150000,
        rating: 4.9,
        reviewsCount: 45,
        description: 'Configure your ultimate battle station. Built with premium components and professional cable management.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=800'
        ],
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        highlights: [
            'Liquid Cooled CPU for thermal efficiency',
            'RGB Lighting fully customizable via app',
            '3 Years onsite premium warranty',
            'Professionally built with clean cable management',
            'Ready for 4K and VR gaming experiences'
        ],
        badge: 'Custom Build',
        variantGroups: [
            {
                id: 'storage', name: 'Storage (NVMe SSD)', type: 'button',
                options: [
                    { id: '1tb', label: '1TB Gen4 NVMe' },
                    { id: '2tb', label: '2TB Gen4 NVMe', priceModifier: 12000 },
                    { id: '4tb', label: '4TB Gen4 NVMe', priceModifier: 28000 }
                ]
            },
            {
                // Dependency Example: Elite Cooling only available if 2TB or 4TB is selected
                id: 'cooling', name: 'Cooling System Upgrade', type: 'select',
                dependsOn: [{ groupId: 'storage', optionId: '2tb' }, { groupId: 'storage', optionId: '4tb' }], // Meaning either 2tb OR 4tb selected
                options: [
                    { id: 'standard-aio', label: 'Standard 240mm AIO (Included)' },
                    { id: 'elite-aio', label: 'Elite 360mm LCD Display AIO (+₹15,000)', priceModifier: 15000 }
                ]
            },
            {
                id: 'case-color', name: 'Case Liquid Paint Color', type: 'colorpicker',
                options: [
                    { id: 'custom-hex', label: 'Custom Hex Code', priceModifier: 5000 } // Paint custom color costs extra
                ]
            }
        ]
    },
    // ── SERVICE PRODUCTS ──
    {
        id: 'ac-service-pro',
        title: 'Professional Split AC Deep Cleaning & Gas Refill Service',
        brand: 'UrbanClap Pro',
        category: 'Services',
        price: 1499,
        originalPrice: 2499,
        rating: 4.6,
        reviewsCount: 3420,
        description: 'Complete AC servicing including deep cleaning of indoor & outdoor unit, filter wash, gas pressure check with top-up, and anti-bacterial spray treatment. Certified technicians with genuine spare parts.',
        inStock: true,
        type: 'service',
        image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800'
        ],
        highlights: [
            'Deep cleaning of indoor & outdoor unit with foam jet',
            'Gas pressure check and top-up included',
            'Anti-bacterial spray treatment for fresh air',
            '30-day service warranty on all work',
            'Certified & background-verified technicians'
        ],
        badge: 'Top Rated',
        serviceConfig: {
            duration: '90 mins',
            availableSlots: ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM'],
            providers: [
                { id: 'tech-raj', name: 'Rajesh Kumar', rating: 4.8, jobsDone: 1240 },
                { id: 'tech-sunil', name: 'Sunil Verma', rating: 4.6, jobsDone: 870 },
                { id: 'tech-anil', name: 'Anil Sharma', rating: 4.9, jobsDone: 2100 }
            ],
            addons: [
                { id: 'gas-topup', name: 'Gas Top-Up (R32/R410a)', price: 349, icon: '🧊' },
                { id: 'stabilizer-check', name: 'Stabilizer Check & Repair', price: 199, icon: '🔌' },
                { id: 'extra-unit', name: 'Additional AC Unit Cleaning', price: 999, icon: '➕' },
                { id: 'drain-clean', name: 'Drain Line Deep Flush', price: 149, icon: '🚿' }
            ],
            inclusions: [
                'Foam jet deep cleaning of indoor & outdoor unit',
                'Filter removal, wash & dry',
                'Gas pressure check (top-up extra)',
                'Anti-bacterial spray treatment',
                'Final cooling performance test'
            ],
            exclusions: [
                'Spare parts replacement (charged extra)',
                'PCB board / compressor repair',
                'Outdoor unit scaffolding (above 2nd floor)'
            ],
            convenienceFee: 49
        }
    },
    {
        id: 'salon-at-home',
        title: 'Premium Bridal Makeup & Hair Styling — Salon At Home',
        brand: 'GlamSquad',
        category: 'Services',
        price: 5999,
        originalPrice: 8999,
        rating: 4.9,
        reviewsCount: 876,
        description: 'Get ready in the comfort of your home with our expert makeup artists. Includes HD/Airbrush bridal makeup, hair styling, draping assistance, and touch-up kit for the event.',
        inStock: true,
        type: 'service',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
        ],
        highlights: [
            'Professional HD/Airbrush bridal makeup',
            'Hair styling with accessories',
            'Complimentary touch-up kit for the event',
            'Pre-bridal trial session included',
            'Top-rated certified makeup artists'
        ],
        badge: 'Premium',
        serviceConfig: {
            duration: '3 hours',
            availableSlots: ['06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM'],
            providers: [
                { id: 'artist-priya', name: 'Priya Kapoor', rating: 4.9, jobsDone: 560 },
                { id: 'artist-neha', name: 'Neha Reddy', rating: 4.8, jobsDone: 380 }
            ],
            addons: [
                { id: 'pre-trial', name: 'Pre-wedding Trial Session', price: 1499, icon: '🪞' },
                { id: 'nail-art', name: 'Nail Art & Extensions', price: 799, icon: '💅' },
                { id: 'mehndi', name: 'Arabic Mehndi (Both Hands)', price: 999, icon: '🤲' },
                { id: 'touch-up-kit', name: 'Premium Touch-Up Kit', price: 599, icon: '💄' }
            ],
            inclusions: [
                'HD/Airbrush bridal base makeup',
                'Eye makeup with false lashes',
                'Hair styling (any style) with pins',
                'Draping assistance',
                'Complimentary bindi & accessories'
            ],
            exclusions: [
                'Hair extensions (charged extra)',
                'Bridesmaids / family makeup',
                'Jewellery & outfit not provided'
            ],
            convenienceFee: 99
        }
    },
    // ── DIGITAL PRODUCTS ──
    {
        id: 'lightroom-presets',
        title: 'Professional Lightroom Presets Pack — 50 Premium Filters',
        brand: 'PixelCraft Studio',
        category: 'Digital',
        price: 499,
        originalPrice: 1999,
        rating: 4.7,
        reviewsCount: 2156,
        description: 'Transform your photos with 50 hand-crafted Lightroom presets. Includes moody tones, vibrant colors, cinematic looks, and wedding-ready filters. Compatible with Lightroom Mobile & Desktop.',
        inStock: true,
        type: 'digital',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800'
        ],
        highlights: [
            '50 hand-crafted presets for every mood',
            'Works on Lightroom Mobile & Desktop',
            'One-click application with adjustable intensity',
            'Includes installation guide & video tutorial',
            'Free updates for life'
        ],
        badge: '75% OFF',
        digitalConfig: {
            fileSize: '45 MB',
            fileType: 'ZIP (XMP + DNG)',
            downloadUrl: '#'
        }
    },
    {
        id: 'business-plan-template',
        title: 'Startup Business Plan Template — Investor Ready (Excel + PPT)',
        brand: 'BizDocs Pro',
        category: 'Digital',
        price: 799,
        originalPrice: 2499,
        rating: 4.5,
        reviewsCount: 540,
        description: 'A comprehensive, investor-ready business plan template with financial projections, market analysis, pitch deck, and operational framework. Used by 500+ funded startups.',
        inStock: true,
        type: 'digital',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
        images: [
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
        ],
        highlights: [
            '5-year financial projection model (Excel)',
            '30-slide investor pitch deck (PPT)',
            'Market sizing & competitive analysis framework',
            'Editable in Google Sheets & Slides',
            'Includes SaaS, E-commerce & D2C variants'
        ],
        badge: 'Bestseller',
        digitalConfig: {
            fileSize: '12 MB',
            fileType: 'ZIP (XLSX + PPTX)',
            downloadUrl: '#'
        }
    }
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
