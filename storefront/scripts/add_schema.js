const fs = require('fs');

let content = fs.readFileSync('src/data/products.ts', 'utf8');

const digitalConfigStr = `export interface DigitalConfig {
    fileSize: string;
    fileType: string;
    downloadUrl: string;
}`;

const extraInterfaces = `export interface DigitalConfig {
    fileSize: string;
    fileType: string;
    downloadUrl: string;
}

export interface SkuMatrixItem {
    id: string;
    attributes: Record<string, string>;
    price: number;
    stock: number;
    inStock: boolean;
}

export interface SubscriptionConfig {
    billingCycle: 'monthly' | 'quarterly' | 'yearly';
    features: string[];
    trialDays?: number;
}`;

content = content.replace(digitalConfigStr, extraInterfaces);

const productInterfacesRegex = /type\?: 'physical' \| 'service' \| 'digital';\s*serviceConfig\?: ServiceConfig;\s*digitalConfig\?: DigitalConfig;\s*variantGroups\?: import\('@\/components\/product\/ProductVariants'\)\.VariantGroup\[\];/;

const newProductInterfaces = `type?: 'physical' | 'service' | 'digital' | 'subscription';
    serviceConfig?: ServiceConfig;
    digitalConfig?: DigitalConfig;
    subscriptionConfig?: SubscriptionConfig;
    skuMatrix?: SkuMatrixItem[];
    variantGroups?: import('@/components/product/ProductVariants').VariantGroup[];`;

content = content.replace(productInterfacesRegex, newProductInterfaces);

// Add two new products at the end
const newProducts = `    },
    {
        id: 'tech-pro-phone',
        title: 'TechPro X1 Flagship Smartphone',
        brand: 'TechPro',
        category: 'Electronics',
        price: 59999, // Base price, overriden by Matrix
        originalPrice: 69999,
        rating: 4.8,
        reviewsCount: 320,
        description: 'Experience ultra-fast performance with the new TechPro X1. Features a 120Hz OLED display, 108MP camera, and all-day battery.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
        highlights: [
            '120Hz OLED Display',
            '108MP Main Camera',
            '5000mAh Battery with 65W Fast Charging'
        ],
        variantGroups: [
            {
                id: 'ram', name: 'RAM Options', type: 'button',
                options: [
                    { id: '6gb', label: '6GB RAM' },
                    { id: '8gb', label: '8GB RAM' }
                ]
            },
            {
                id: 'storage', name: 'Storage Capacity', type: 'button',
                options: [
                    { id: '128gb', label: '128GB' },
                    { id: '256gb', label: '256GB' }
                ]
            }
        ],
        skuMatrix: [
            { id: 'sku-p1', attributes: { ram: '6gb', storage: '128gb' }, price: 59999, stock: 50, inStock: true },
            { id: 'sku-p2', attributes: { ram: '8gb', storage: '128gb' }, price: 64999, stock: 30, inStock: true },
            { id: 'sku-p3', attributes: { ram: '8gb', storage: '256gb' }, price: 69999, stock: 15, inStock: true }
        ]
    },
    {
        id: 'stream-plus-sub',
        title: 'StreamPlus Ultimate Entertainment Subscription',
        brand: 'StreamPlus',
        category: 'Digital',
        type: 'subscription',
        price: 999,
        originalPrice: 1499,
        rating: 4.9,
        reviewsCount: 5400,
        description: 'Watch thousands of movies, TV shows, and live sports on up to 4 devices simultaneously in stunning 4K HDR.',
        inStock: true,
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800',
        subscriptionConfig: {
            billingCycle: 'monthly',
            trialDays: 14,
            features: [
                'Unlimited Ad-Free Streaming',
                '4K HDR Video Quality',
                'Watch on 4 Screens at once',
                'Download and watch offline'
            ]
        }
    }
];`;

content = content.replace(/    \}\n\];/, newProducts);

fs.writeFileSync('src/data/products.ts', content);
console.log('Schema Mod success!');
