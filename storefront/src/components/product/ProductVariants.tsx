'use client';
import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import styles from './ProductActions.module.css';

export interface Variant {
    id: string;
    name: string;
    thumb: string;
}

export default function ProductVariants({ variants = [] }: { variants?: Variant[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    // Read variant from URL or default to the first variant if available
    const currentVariant = searchParams.get('variant') || (variants.length > 0 ? variants[0].id : 'default');
    const [quantity, setQuantity] = useState(1);

    const handleQtyChange = (type: 'inc' | 'dec') => {
        if (type === 'inc' && quantity < 5) setQuantity(prev => prev + 1);
        if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
    };

    const handleVariantChange = (colorId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('variant', colorId);
        // Update URL, triggering a server re-render of page.tsx without losing scroll position
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className={styles.variantsWrapper}>
            {variants.length > 0 && (
                <div className={styles.actionGroup}>
                    <h4 className={styles.groupLabel}>Variant: <span>{variants.find(v => v.id === currentVariant)?.name || variants[0].name}</span></h4>
                <div className={styles.variantOptions}>
                    {variants.map(variant => (
                        <button
                            key={variant.id}
                            className={`${styles.variantBtn} ${currentVariant === variant.id ? styles.active : ''}`}
                            onClick={() => handleVariantChange(variant.id)}
                            aria-label={`Select ${variant.name}`}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={variant.thumb} alt={variant.name} />
                        </button>
                    ))}
                </div>
                </div>
            )}

            <div className={styles.actionGroup}>
                <h4 className={styles.groupLabel}>Quantity</h4>
                <div className={styles.qtySelector}>
                    <button onClick={() => handleQtyChange('dec')} disabled={quantity <= 1}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQtyChange('inc')} disabled={quantity >= 5}>+</button>
                </div>
            </div>
        </div>
    );
}
