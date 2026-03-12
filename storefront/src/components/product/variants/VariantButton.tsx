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

    return (
        <div className={styles.actionGroup}>
            <h4 className={styles.groupLabel}>{group.name}: <span>{activeOption?.label}</span></h4>
            <div className={styles.variantOptions}>
                {group.options.map(option => {
                    const isDisabled = disabledOptionIds?.includes(option.id);
                    return (
                        <button
                            key={option.id}
                            className={`${styles.variantBtnText} ${activeOptionId === option.id ? styles.active : ''} ${isDisabled ? styles.disabled : ''}`}
                            onClick={() => !isDisabled && onChange(group.id, option.id)}
                            title={option.label}
                            aria-label={`Select ${option.label}`}
                            disabled={isDisabled}
                        >
                            {option.label} {option.priceModifier && !isDisabled ? `(+₹${option.priceModifier})` : ''}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
