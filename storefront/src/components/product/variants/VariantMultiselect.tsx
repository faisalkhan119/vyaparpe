'use client';
import { VariantGroup } from '../ProductVariants';
import styles from '../ProductActions.module.css';

interface Props {
    group: VariantGroup;
    rawSelections: string; // e.g., "choc:2,van:4"
    onChange: (groupId: string, optionId: string | null) => void;
}

export function VariantMultiselect({ group, rawSelections, onChange }: Props) {
    const selectionMap = rawSelections ? Object.fromEntries(rawSelections.split(',').map(s => {
        const [id, count] = s.split(':');
        return [id, parseInt(count, 10)];
    })) : {} as Record<string, number>;
    
    const totalSelected = Object.values(selectionMap).reduce((a, b) => a + Number(b), 0);
    
    const updateMsItem = (id: string, delta: number) => {
        const currentCount = Number(selectionMap[id]) || 0;
        const nextCount = currentCount + delta;
        if (nextCount < 0) return;
        
        // Enforce max validation
        if (delta > 0 && group.maxAllowed && totalSelected >= group.maxAllowed) return;

        const newMap = { ...selectionMap, [id]: nextCount };
        if (nextCount === 0) delete newMap[id];
        
        const resStr = Object.entries(newMap).map(([k, v]) => `${k}:${v}`).join(',');
        onChange(group.id, resStr || null);
    };

    return (
        <div className={styles.actionGroup}>
            <h4 className={styles.groupLabel}>
                {group.name} 
                {group.maxAllowed && (
                    <span style={{marginLeft: '8px', fontSize: '13px', color: totalSelected === group.maxAllowed ? 'var(--success)' : 'var(--primary)'}}>
                        ({totalSelected}/{group.maxAllowed})
                    </span>
                )}
            </h4>
            <div className={styles.multiSelectContainer}>
                {group.options.map(option => {
                    const count = Number(selectionMap[option.id]) || 0;
                    return (
                        <div key={option.id} className={styles.multiSelectItem}>
                            <label>{option.label}</label>
                            <div className={styles.multiSelectControls}>
                                <button onClick={() => updateMsItem(option.id, -1)} disabled={count === 0}>−</button>
                                <span className={styles.multiSelectCount}>{count}</span>
                                <button onClick={() => updateMsItem(option.id, 1)} disabled={!!(group.maxAllowed && totalSelected >= group.maxAllowed)}>+</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
