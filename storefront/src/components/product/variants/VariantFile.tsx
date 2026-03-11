'use client';
import { VariantGroup } from '../ProductVariants';
import styles from '../ProductActions.module.css';

interface Props {
    group: VariantGroup;
    fileStatus: string | null;
    onChange: (groupId: string, optionId: string | null) => void;
}

export function VariantFile({ group, fileStatus, onChange }: Props) {
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Simulated upload
            onChange(group.id, `uploaded_${file.name.replace(/\s+/g, '_')}`);
        }
    };

    return (
        <div className={styles.actionGroup}>
            <h4 className={styles.groupLabel}>
                {group.name} 
                {fileStatus && <span style={{color: 'var(--success)', fontSize: '13px', marginLeft: '0.5rem'}}>✓ Ready</span>}
            </h4>
            <input 
                type="file" 
                className={styles.fileInput} 
                onChange={handleFileUpload}
                accept="image/*,.pdf"
            />
            {fileStatus && <p className={styles.fileStatus} style={{fontSize: '12px', marginTop: '4px', color: 'var(--text-muted)'}}>{fileStatus}</p>}
        </div>
    );
}
