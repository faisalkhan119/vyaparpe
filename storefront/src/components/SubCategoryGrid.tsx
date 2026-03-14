'use client';

import Link from 'next/link';
import styles from './SubCategoryGrid.module.css';
import { getPlatformSubCategories } from '@/data/platformData';

interface SubCategoryGridProps {
    platform?: string;
    category?: string;
}

export default function SubCategoryGrid({ platform = 'vyaparpe', category = '' }: SubCategoryGridProps) {
    const subCategories = getPlatformSubCategories(platform);
    
    if (subCategories.length === 0) return null;

    // Filter by active category if one is selected
    const filtered = category 
        ? subCategories.filter(sc => sc.slug.toLowerCase() === category.toLowerCase())
        : subCategories;

    // Show all if no filter matches or no category selected
    const displayItems = filtered.length > 0 ? filtered : subCategories;

    return (
        <section className={styles.container}>
            <div className={styles.scrollRow}>
                {displayItems.map((sc, idx) => (
                    <Link
                        key={idx}
                        href={`/products?category=${encodeURIComponent(sc.slug)}`}
                        className={styles.item}
                    >
                        <div className={styles.iconCircle}>
                            <span className={styles.icon}>{sc.icon}</span>
                        </div>
                        <span className={styles.label}>{sc.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
