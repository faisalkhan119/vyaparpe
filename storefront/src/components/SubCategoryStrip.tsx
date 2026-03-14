'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './SubCategoryStrip.module.css';
import { getCategorySubCategories } from '@/data/platformData';

interface SubCategoryStripProps {
    platform?: string;
    category?: string;
}

const MAX_VISIBLE = 7;

export default function SubCategoryStrip({ platform = 'vyaparpe', category = '' }: SubCategoryStripProps) {
    const [showAll, setShowAll] = useState(false);

    if (!category) return null; // Don't show for "For You"

    const subCategories = getCategorySubCategories(platform, category);

    if (subCategories.length === 0) return null;

    const hasMore = subCategories.length > MAX_VISIBLE;
    const visibleItems = showAll ? subCategories : subCategories.slice(0, MAX_VISIBLE);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.scrollRow}>
                    {visibleItems.map((sc, idx) => (
                        <Link
                            key={idx}
                            href={`/products?category=${encodeURIComponent(category)}&sub=${encodeURIComponent(sc.slug)}`}
                            className={styles.chip}
                        >
                            <span className={styles.chipIcon}>{sc.icon}</span>
                            <span className={styles.chipLabel}>{sc.name}</span>
                        </Link>
                    ))}
                    {hasMore && !showAll && (
                        <button
                            className={`${styles.chip} ${styles.moreBtn}`}
                            onClick={(e) => { e.preventDefault(); setShowAll(true); }}
                        >
                            <span className={styles.chipIcon}>➕</span>
                            <span className={styles.chipLabel}>More</span>
                        </button>
                    )}
                    {showAll && (
                        <button
                            className={`${styles.chip} ${styles.lessBtn}`}
                            onClick={(e) => { e.preventDefault(); setShowAll(false); }}
                        >
                            <span className={styles.chipIcon}>➖</span>
                            <span className={styles.chipLabel}>Less</span>
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
