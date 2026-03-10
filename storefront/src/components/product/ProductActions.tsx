'use client';
import { useState } from 'react';
import styles from './ProductActions.module.css';

export default function ProductActions() {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('black');

    const colors = [
        { id: 'black', name: 'Midnight Black', hex: '#1e293b' },
        { id: 'silver', name: 'Platinum Silver', hex: '#e2e8f0' },
    ];

    const handleQtyChange = (type: 'inc' | 'dec') => {
        if (type === 'inc' && quantity < 5) setQuantity(prev => prev + 1);
        if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
    };

    return (
        <div className={styles.actionsWrapper}>
            <div className={styles.actionGroup}>
                <h4 className={styles.groupLabel}>Color: <span>{colors.find(c => c.id === selectedColor)?.name}</span></h4>
                <div className={styles.colorOptions}>
                    {colors.map(color => (
                        <button
                            key={color.id}
                            className={`${styles.colorBtn} ${selectedColor === color.id ? styles.active : ''}`}
                            style={{ backgroundColor: color.hex }}
                            onClick={() => setSelectedColor(color.id)}
                            aria-label={`Select ${color.name}`}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.actionGroup}>
                <h4 className={styles.groupLabel}>Quantity</h4>
                <div className={styles.qtySelector}>
                    <button onClick={() => handleQtyChange('dec')} disabled={quantity <= 1}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQtyChange('inc')} disabled={quantity >= 5}>+</button>
                </div>
            </div>

            <div className={styles.buttonGroup}>
                <button className={`btn btn-primary ${styles.mainActionBtn}`}>
                    <span className="icon">🛒</span> Add to Cart
                </button>
                <button className={`btn btn-outline ${styles.iconBtn}`} aria-label="Add to Wishlist">
                    <span className="icon">❤️</span>
                </button>
            </div>

            <button className={`btn ${styles.buyNowBtn}`}>
                Buy it Now
            </button>
        </div>
    );
}
