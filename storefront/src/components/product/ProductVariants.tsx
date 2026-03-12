'use client';
import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import styles from './ProductActions.module.css';
import { SkuMatrixItem } from '@/data/products';

import { VariantButton } from './variants/VariantButton';
import { VariantImage } from './variants/VariantImage';
import { VariantCheckbox } from './variants/VariantCheckbox';
import { VariantSubscription } from './variants/VariantSubscription';
import { VariantMultiselect } from './variants/VariantMultiselect';
import { VariantDate } from './variants/VariantDate';
import { VariantColorPicker } from './variants/VariantColorPicker';
import { VariantText } from './variants/VariantText';
import { VariantFile } from './variants/VariantFile';
import { VariantSelect } from './variants/VariantSelect';

export interface VariantOption {
    id: string;
    label: string;
    thumb?: string;
    priceModifier?: number; 
}

export interface VariantDependency {
    groupId: string;
    optionId: string;
}

export interface VariantGroup {
    id: string; 
    name: string; 
    type: 'image' | 'button' | 'checkbox' | 'text' | 'subscription' | 'file' | 'date' | 'select' | 'colorpicker' | 'multiselect';
    options: VariantOption[];
    maxAllowed?: number; 
    dependsOn?: VariantDependency[]; 
}

export interface LegacyVariant {
    id: string;
    name: string;
    thumb: string;
}

export default function ProductVariants({ 
    variantGroups = [],
    legacyVariants = [],
    skuMatrix
}: { 
    variantGroups?: VariantGroup[],
    legacyVariants?: LegacyVariant[],
    skuMatrix?: SkuMatrixItem[]
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Matrix Logic Helper
    const getDisabledOptions = (group: VariantGroup): string[] => {
        if (!skuMatrix || skuMatrix.length === 0) return [];

        const disabledIds: string[] = [];
        const currentSelections: Record<string, string> = {};
        variantGroups.forEach(g => {
            if (g.id !== group.id) {
                const sel = searchParams.get(g.id);
                if (sel) currentSelections[g.id] = sel;
            }
        });

        // For each option in this group, check if there is AT LEAST ONE sku in the matrix
        // that has this option AND satisfies all currently selected options in other groups.
        group.options.forEach(opt => {
            const hasValidCombo = skuMatrix.some(sku => {
                if (!sku.inStock || sku.stock === 0) return false;
                if (sku.attributes[group.id] !== opt.id) return false;
                
                // Check if all OTHER active selections match this SKU
                return Object.entries(currentSelections).every(([key, value]) => {
                    return sku.attributes[key] === value;
                });
            });

            if (!hasValidCombo) {
                disabledIds.push(opt.id);
            }
        });

        return disabledIds;
    };
    
    const [quantity, setQuantity] = useState(1);

    const handleQtyChange = (type: 'inc' | 'dec') => {
        if (type === 'inc' && quantity < 5) setQuantity(prev => prev + 1);
        if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
    };

    // For modern VariantGroups
    const handleGroupVariantChange = (groupId: string, optionString: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (optionString === null || optionString === '') {
            params.delete(groupId);
        } else {
            params.set(groupId, optionString);
        }
        // Update URL, triggering a server re-render of page.tsx
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // For legacy variants
    const currentLegacyVariant = searchParams.get('variant') || (legacyVariants.length > 0 ? legacyVariants[0].id : '');
    const handleLegacyVariantChange = (variantId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('variant', variantId);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // UI render helper - The "Factory"
    const renderVariantGroup = (group: VariantGroup) => {
        // Enforce dependencies logic before rendering anything
        if (group.dependsOn && group.dependsOn.length > 0) {
            const isMet = group.dependsOn.some(dep => searchParams.get(dep.groupId) === dep.optionId);
            if (!isMet) return null; 
        }

        const activeOptionId = searchParams.get(group.id) || (group.type !== 'checkbox' && group.type !== 'text' && group.type !== 'file' && group.type !== 'date' && group.type !== 'colorpicker' && group.type !== 'multiselect' ? group.options[0]?.id : null);

        switch (group.type) {
            case 'text':
                return <VariantText key={group.id} group={group} rawText={searchParams.get(group.id) || ''} onChange={handleGroupVariantChange} />;
            case 'checkbox':
                return <VariantCheckbox key={group.id} group={group} activeOptionId={activeOptionId} onChange={handleGroupVariantChange} />;
            case 'subscription':
                return <VariantSubscription key={group.id} group={group} activeOptionId={activeOptionId} onChange={handleGroupVariantChange} />;
            case 'file':
                return <VariantFile key={group.id} group={group} fileStatus={searchParams.get(group.id)} onChange={handleGroupVariantChange} />;
            case 'date':
                return <VariantDate key={group.id} group={group} rawDateStr={searchParams.get(group.id) || ''} onChange={handleGroupVariantChange} />;
            case 'select':
                return <VariantSelect key={group.id} group={group} activeOptionId={activeOptionId} onChange={handleGroupVariantChange} />;
            case 'colorpicker':
                return <VariantColorPicker key={group.id} group={group} hexColor={searchParams.get(group.id) || '#000000'} onChange={handleGroupVariantChange} />;
            case 'multiselect':
                return <VariantMultiselect key={group.id} group={group} rawSelections={searchParams.get(group.id) || ''} onChange={handleGroupVariantChange} />;
            case 'image':
                return <VariantImage key={group.id} group={group} activeOptionId={activeOptionId} onChange={handleGroupVariantChange} />;
            case 'button':
            default:
                const disabledIds = getDisabledOptions(group);
                return <VariantButton key={group.id} group={group} activeOptionId={activeOptionId} onChange={handleGroupVariantChange} disabledOptionIds={disabledIds} />;
        }
    };

    return (
        <div className={styles.variantsWrapper}>
            {variantGroups.map((group) => renderVariantGroup(group))}

            {variantGroups.length === 0 && legacyVariants.length > 0 && (
                <div className={styles.actionGroup}>
                    <h4 className={styles.groupLabel}>Variant: <span>{legacyVariants.find(v => v.id === currentLegacyVariant)?.name || legacyVariants[0].name}</span></h4>
                    <div className={styles.variantOptions}>
                        {legacyVariants.map(variant => (
                            <button
                                key={variant.id}
                                className={`${styles.variantBtn} ${currentLegacyVariant === variant.id ? styles.active : ''}`}
                                onClick={() => handleLegacyVariantChange(variant.id)}
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
