'use client';
import { VariantGroup } from '../ProductVariants';
import styles from '../ProductActions.module.css';

interface Props {
    group: VariantGroup;
    activeOptionId: string | null;
    onChange: (groupId: string, optionId: string | null) => void;
}

export function VariantSubscription({ group, activeOptionId, onChange }: Props) {
    const activeOption = group.options.find(o => o.id === activeOptionId) || group.options[0];

    return (
        <div className={styles.actionGroup}>
            <h4 className={styles.groupLabel}>{group.name}: <span>{activeOption?.label}</span></h4>
            <div className={styles.subscriptionOptions}>
                {group.options.map(option => (
                    <button
                        key={option.id}
                        className={`${styles.subscriptionBtn} ${activeOptionId === option.id ? styles.active : ''}`}
                        onClick={() => onChange(group.id, option.id)}
                    >
                        <div className={styles.subBtnContent}>
                            <strong>{option.label}</strong>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
