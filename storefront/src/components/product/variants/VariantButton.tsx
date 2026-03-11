'use client';
import { VariantGroup } from '../ProductVariants';
import styles from '../ProductActions.module.css';

interface Props {
    group: VariantGroup;
    activeOptionId: string | null;
    onChange: (groupId: string, optionId: string | null) => void;
}

export function VariantButton({ group, activeOptionId, onChange }: Props) {
    const activeOption = group.options.find(o => o.id === activeOptionId) || group.options[0];

    return (
        <div className={styles.actionGroup}>
            <h4 className={styles.groupLabel}>{group.name}: <span>{activeOption?.label}</span></h4>
            <div className={styles.variantOptions}>
                {group.options.map(option => (
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
