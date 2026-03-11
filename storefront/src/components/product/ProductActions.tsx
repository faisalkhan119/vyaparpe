'use client';
import styles from './ProductActions.module.css';

export default function ProductActions() {
    return (
        <div className={styles.actionsWrapper}>

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
