'use client';
import { VariantGroup } from '../ProductVariants';
import styles from '../ProductActions.module.css';

interface Props {
    group: VariantGroup;
    rawText: string;
    onChange: (groupId: string, optionId: string | null) => void;
}

export function VariantText({ group, rawText, onChange }: Props) {
    const handleTextBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        onChange(group.id, e.target.value.trim());
    };

    return (
        <div className={styles.actionGroup}>
            <h4 className={styles.groupLabel}>{group.name}</h4>
            <input 
                type="text" 
                className={styles.textVariantInput} 
                placeholder={group.options[0]?.label || 'Enter custom text...'}
                defaultValue={rawText}
                onBlur={handleTextBlur}
                maxLength={50}
            />
        </div>
    );
}
