'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './RecentlyViewed.module.css';
import { getProductById, Product } from '@/data/products';

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

export default function RecentlyViewed() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as string[];
            const items = stored
                .map(id => getProductById(id))
                .filter((p): p is Product => !!p);
            setProducts(items);
        } catch {
            // ignore
        }
    }, []);

    if (products.length === 0) return null;

    return (
        <section className={styles.recentSection}>
            <div className={styles.sectionHeader}>
                <h2>👁️ Recently Viewed</h2>
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
