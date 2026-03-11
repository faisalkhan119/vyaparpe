'use client';
import { VariantGroup } from '../ProductVariants';
import styles from '../ProductActions.module.css';

interface Props {
    group: VariantGroup;
    hexColor: string;
    onChange: (groupId: string, optionId: string | null) => void;
}

export function VariantColorPicker({ group, hexColor, onChange }: Props) {
    const handleColorBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(group.id, e.target.value);
    };

    return (
        <div className={styles.actionGroup}>
            <h4 className={styles.groupLabel}>{group.name}</h4>
            <div className={styles.colorPickerWrapper}>
                <input 
                    type="color" 
                    className={styles.colorPickerInput} 
                    value={hexColor}
                    onChange={handleColorBlur}
                />
                <span className={styles.colorValue}>
                    {hexColor}
                    {group.options[0]?.priceModifier ? ` (+₹${group.options[0].priceModifier})` : ''}
                </span>
            </div>
        </div>
    );
}
