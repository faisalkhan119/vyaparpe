'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { platforms } from '@/data/platformData';
import styles from './PlatformTabs.module.css';

export default function PlatformTabs() {
    const searchParams = useSearchParams();
    const activePlatform = searchParams.get('platform') || 'vyaparpe';

    return (
        <div className={styles.tabsBar}>
            <div className={styles.tabsScroll}>
                {platforms.map((p) => {
                    const isActive = activePlatform === p.id;
                    return (
                        <Link
                            key={p.id}
                            href={p.id === 'vyaparpe' ? '/' : `/?platform=${p.id}`}
                            className={`${styles.tab} ${isActive ? styles.active : ''}`}
                            style={isActive ? { background: `linear-gradient(135deg, ${p.color}, ${p.colorEnd})` } : {}}
                        >
                            <span className={styles.tabIcon}>{p.icon}</span>
                            <span className={styles.tabLabel}>{p.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
