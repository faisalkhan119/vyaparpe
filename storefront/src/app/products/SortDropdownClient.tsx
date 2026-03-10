'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './ProductsLayout.module.css';

export default function SortDropdownClient({ currentSort }: { currentSort: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSort = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set('sort', value);
        } else {
            params.delete('sort');
        }
        router.push(`/products?${params.toString()}`);
    };

    return (
        <>
            <label>Sort by:</label>
            <select
                className={styles.sortSelect}
                value={currentSort}
                onChange={(e) => handleSort(e.target.value)}
            >
                <option value="">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="reviews">Popularity</option>
            </select>
        </>
    );
}
