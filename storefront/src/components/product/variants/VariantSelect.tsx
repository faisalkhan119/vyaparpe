'use client';
import { VariantGroup } from '../ProductVariants';
import styles from '../ProductActions.module.css';

interface Props {
    group: VariantGroup;
    activeOptionId: string | null;
    onChange: (groupId: string, optionId: string | null) => void;
}

export function VariantSelect({ group, activeOptionId, onChange }: Props) {
    return (
        <div className={styles.actionGroup}>
            <h4 className={styles.groupLabel}>{group.name}</h4>
            <select 
                className={styles.selectDropdown}
                value={activeOptionId || ''}
                onChange={(e) => onChange(group.id, e.target.value)}
            >
                <option value="" disabled>Select {group.name}...</option>
                {group.options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.label} {option.priceModifier ? `(+₹${option.priceModifier})` : ''}
                    </option>
                ))}
            </select>
        </div>
    );
}
