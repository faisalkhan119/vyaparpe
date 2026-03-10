'use client';
import { useState } from 'react';
import styles from './ImageGallery.module.css';

export default function ImageGallery() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Mock image placeholders
    const images = [
        { id: 1, type: 'Front' },
        { id: 2, type: 'Angle' },
        { id: 3, type: 'Case' },
        { id: 4, type: 'Wearing' },
    ];

    return (
        <div className={styles.galleryWrapper}>
            <div className={styles.thumbnails}>
                {images.map((img, idx) => (
                    <button
                        key={img.id}
                        className={`${styles.thumbnailBtn} ${activeIndex === idx ? styles.active : ''}`}
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`View image ${idx + 1}`}
                    >
                        <div className={styles.thumbPlaceholder}>
                            📸<br /><span style={{ fontSize: '0.6rem' }}>{img.type}</span>
                        </div>
                    </button>
                ))}
            </div>

            <div className={`glass-panel ${styles.mainImageContainer}`}>
                <div className={styles.mainImagePlaceholder}>
                    <div className="text-secondary opacity-50" style={{ fontSize: '4rem' }}>
                        📸
                    </div>
                    <p className="mt-4 text-muted">Product Image {images[activeIndex].id} ({images[activeIndex].type})</p>
                </div>
            </div>
        </div>
    );
}
