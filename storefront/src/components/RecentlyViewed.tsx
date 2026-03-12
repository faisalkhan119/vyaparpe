'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './RecentlyViewed.module.css';
import { getProductById, Product, getTrendingProducts } from '@/data/products';

const STORAGE_KEY = 'vyaparpe_recently_viewed';
const MAX_ITEMS = 8;

export function trackProductView(productId: string) {
    if (typeof window === 'undefined') return;
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as string[];
        const filtered = stored.filter(id => id !== productId);
        filtered.unshift(productId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered.slice(0, MAX_ITEMS)));
    } catch {
        // ignore storage errors
    }
}

export default function RecentlyViewed({ category = '' }: { category?: string }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isFallback, setIsFallback] = useState(false);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as string[];
            let items = stored
                .map(id => getProductById(id))
                .filter((p): p is Product => !!p);
                
            if (category) {
                items = items.filter(p => p.category.toLowerCase() === category.toLowerCase());
            }

            if (items.length === 0 && category) {
                // Fallback to trending
                const trending = getTrendingProducts();
                items = trending.filter(p => p.category.toLowerCase() === category.toLowerCase()).slice(0, 8);
                setIsFallback(true);
            } else {
                setIsFallback(false);
            }

            setProducts(items);
        } catch {
            // ignore
        }
    }, [category]);

    if (products.length === 0) return null;

    return (
        <section className={styles.recentSection}>
            <div className={styles.sectionHeader}>
                <h2>{isFallback ? `🔥 Popular in ${category}` : '👁️ Recently Viewed'}</h2>
            </div>
            <div className={styles.scrollContainer}>
                {products.map(product => (
                    <Link key={product.id} href={`/product/${product.id}`} className={styles.card}>
                        <div className={styles.cardImage}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={product.image} alt={product.title} />
                        </div>
                        <div className={styles.cardInfo}>
                            <span className={styles.cardBrand}>{product.brand}</span>
                            <div className={styles.cardTitle}>{product.title}</div>
                            <div className={styles.cardPrice}>₹{product.price.toLocaleString()}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
