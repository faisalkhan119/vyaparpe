'use client';
import { VariantGroup } from '../ProductVariants';
import styles from '../ProductActions.module.css';

interface Props {
    group: VariantGroup;
    activeOptionId: string | null;
    onChange: (groupId: string, optionId: string | null) => void;
    disabledOptionIds?: string[];
}

export function VariantButton({ group, activeOptionId, onChange, disabledOptionIds }: Props) {
    const activeOption = group.options.find(o => o.id === activeOptionId) || group.options[0];

    const visibleOptions = group.options.filter(option => !disabledOptionIds?.includes(option.id));
    
    if (visibleOptions.length === 0) return null;

    return (
        <div className={styles.actionGroup}>
            <h4 className={styles.groupLabel}>{group.name}: <span>{activeOption?.label}</span></h4>
            <div className={styles.variantOptions}>
                {visibleOptions.map(option => (
                    <button
                        key={option.id}
                        className={`${styles.variantBtnText} ${activeOptionId === option.id ? styles.active : ''}`}
                        onClick={() => onChange(group.id, option.id)}
                        title={option.label}
                        aria-label={`Select ${option.label}`}
                    >
                        {option.label} {option.priceModifier ? `(+₹${option.priceModifier})` : ''}
                    </button>
                ))}
            </div>
        </div>
    );
}
