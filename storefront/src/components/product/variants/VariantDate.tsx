'use client';
import { VariantGroup } from '../ProductVariants';
import styles from '../ProductActions.module.css';

interface Props {
    group: VariantGroup;
    rawDateStr: string; // format: "YYYY-MM-DD|HH:MM"
    onChange: (groupId: string, optionId: string | null) => void;
}

export function VariantDate({ group, rawDateStr, onChange }: Props) {
    const [datePart, timePart] = (rawDateStr || '').split('|');
    
    const handleDateChange = (d: string) => {
        const newStr = timePart ? `${d}|${timePart}` : d;
        onChange(group.id, newStr);
    };
    const handleTimeChange = (t: string) => {
        const updatedDate = datePart || new Date().toISOString().split('T')[0];
        onChange(group.id, `${updatedDate}|${t}`);
    };

    return (
        <div className={styles.actionGroup}>
            <h4 className={styles.groupLabel}>{group.name}</h4>
            <div className={styles.dateInputGroup}>
                <input 
                    type="date" 
                    className={styles.datePicker} 
                    value={datePart || ''}
                    onChange={(e) => handleDateChange(e.target.value)}
                />
                <input 
                    type="time" 
                    className={styles.timePicker} 
                    value={timePart || ''}
                    onChange={(e) => handleTimeChange(e.target.value)}
                />
            </div>
        </div>
    );
}
