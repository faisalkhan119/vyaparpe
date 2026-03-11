'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface AddToCartButtonProps {
    productId: string;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
    variant?: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function AddToCartButton({
    productId,
    name,
    price,
    image,
    inStock,
    variant,
    className,
    style
}: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!inStock) {
            alert('You will be notified when this item is back in stock.');
            return;
        }

        addToCart({ productId, name, price, image, variant });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            className={`btn ${added ? 'btn-success' : (inStock ? 'btn-primary' : 'btn-outline')} ${className || ''}`}
            style={style}
            onClick={handleAddToCart}
            disabled={added}
        >
            {added ? '✓ Added to Cart!' : (inStock ? 'Add to Cart' : 'Notify Me')}
        </button>
    );
}
