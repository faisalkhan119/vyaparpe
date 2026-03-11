'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import styles from './ProductActions.module.css';

interface ProductActionsProps {
    productId: string;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
    variantLabels?: string[];
    selectedOptions?: Record<string, string | string[] | undefined>;
}

export default function ProductActions({ productId, name, price, image, inStock, variantLabels, selectedOptions }: ProductActionsProps) {
    const { addToCart } = useCart();
    const router = useRouter();
    const [cartAdded, setCartAdded] = useState(false);
    const [wishlistAdded, setWishlistAdded] = useState(false);

    const handleAddToCart = () => {
        if (!inStock) return;
        addToCart({ productId, name, price, image, variantLabels, selectedOptions });
        setCartAdded(true);
        setTimeout(() => setCartAdded(false), 2500);
    };

    const handleBuyNow = () => {
        if (!inStock) return;
        addToCart({ productId, name, price, image, variantLabels, selectedOptions });
        router.push('/checkout');
    };

    const handleWishlist = () => {
        setWishlistAdded(prev => !prev);
    };

    return (
        <div className={styles.actionsWrapper}>
            <div className={styles.buttonGroup}>
                <button
                    className={`btn ${cartAdded ? 'btn-success' : 'btn-primary'} ${styles.mainActionBtn}`}
                    onClick={handleAddToCart}
                    disabled={!inStock || cartAdded}
                >
                    <span className="icon">🛒</span>
                    {!inStock ? 'Out of Stock' : cartAdded ? '✓ Added!' : selectedOptions?.subscriptionInterval ? 'Subscribe Now' : 'Add to Cart'}
                </button>
                <button
                    className={`btn btn-outline ${styles.iconBtn}`}
                    aria-label="Add to Wishlist"
                    onClick={handleWishlist}
                    style={{ color: wishlistAdded ? 'red' : undefined }}
                >
                    <span className="icon">{wishlistAdded ? '❤️' : '🤍'}</span>
                </button>
            </div>

            <button
                className={`btn ${styles.buyNowBtn}`}
                onClick={handleBuyNow}
                disabled={!inStock}
            >
                {inStock ? (selectedOptions?.subscriptionInterval ? 'Subscribe & Checkout' : 'Buy it Now') : 'Out of Stock'}
            </button>
        </div>
    );
}
