'use client';
import { VariantGroup } from '../ProductVariants';
import styles from '../ProductActions.module.css';

interface Props {
    group: VariantGroup;
    activeOptionId: string | null;
    onChange: (groupId: string, optionId: string | null) => void;
}

export function VariantCheckbox({ group, activeOptionId, onChange }: Props) {
    const option = group.options[0];
    const isChecked = activeOptionId === option.id;

    return (
        <div className={styles.actionGroup}>
            <h4 className={styles.groupLabel}>{group.name}</h4>
            <label className={`${styles.checkboxLabel} ${isChecked ? styles.active : ''}`}>
                <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={(e) => onChange(group.id, e.target.checked ? option.id : null)} 
                />
                <span className={styles.checkboxText}>
                    {option.label}
                    {option.priceModifier && <span className={styles.modifierPrice}> (+₹{option.priceModifier.toLocaleString()})</span>}
                </span>
            </label>
        </div>
    );
}
