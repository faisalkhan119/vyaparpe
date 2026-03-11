'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import styles from './SidebarFilter.module.css';

export default function SidebarFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const activeCategory = searchParams.get('category') || '';
    const activeBrand = searchParams.get('brand') || '';
    const activeMaxPrice = Number(searchParams.get('maxPrice') || '200000');
    const activeRating = Number(searchParams.get('rating') || '0');
    const activeSort = searchParams.get('sort') || '';
    const activeInStock = searchParams.get('inStock') === 'true';

    // Derive real categories and brands from product data
    const categoryMap = new Map<string, number>();
    const brandMap = new Map<string, number>();
    products.forEach(p => {
        categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
        brandMap.set(p.brand, (brandMap.get(p.brand) || 0) + 1);
    });
    const allCategories = Array.from(categoryMap.entries()).sort((a, b) => b[1] - a[1]);
    const allBrands = Array.from(brandMap.entries()).sort((a, b) => b[1] - a[1]);

    const updateParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/products?${params.toString()}`);
    };

    const clearAll = () => {
        router.push('/products');
    };

    const hasFilters = activeCategory || activeBrand || activeMaxPrice < 200000 || activeRating > 0 || activeInStock;

    return (
        <div className={styles.filterSidebar}>
            <div className={styles.filterHeader}>
                <h2>Filters</h2>
                {hasFilters && (
                    <button className={styles.clearBtn} onClick={clearAll}>Clear All</button>
                )}
            </div>

            {/* Active Filters */}
            {hasFilters && (
                <div className={styles.activeFilters}>
                    {activeCategory && (
                        <span className={styles.filterChip}>
                            {activeCategory}
                            <button onClick={() => updateParams('category', '')}>✕</button>
                        </span>
                    )}
                    {activeBrand && (
                        <span className={styles.filterChip}>
                            {activeBrand}
                            <button onClick={() => updateParams('brand', '')}>✕</button>
                        </span>
                    )}
                    {activeRating > 0 && (
                        <span className={styles.filterChip}>
                            {activeRating}★ & up
                            <button onClick={() => updateParams('rating', '')}>✕</button>
                        </span>
                    )}
                    {activeInStock && (
                        <span className={styles.filterChip}>
                            In Stock
                            <button onClick={() => updateParams('inStock', '')}>✕</button>
                        </span>
                    )}
                </div>
            )}

            {/* Categories */}
            <div className={styles.filterSection}>
                <h3>Categories</h3>
                <ul className={styles.filterList}>
                    {allCategories.map(([cat, count]) => (
                        <li key={cat}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="radio"
                                    name="category"
                                    checked={activeCategory.toLowerCase() === cat.toLowerCase()}
                                    onChange={() => updateParams('category', activeCategory.toLowerCase() === cat.toLowerCase() ? '' : cat)}
                                />
                                <span className={styles.checkboxText}>{cat}</span>
                                <span className={styles.itemCount}>({count})</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price Range */}
            <div className={styles.filterSection}>
                <h3>Price Range</h3>
                <div className={styles.priceSlider}>
                    <input
                        type="range"
                        min="0"
                        max="200000"
                        step="1000"
                        value={activeMaxPrice}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            updateParams('maxPrice', val < 200000 ? String(val) : '');
                        }}
                        className={styles.rangeInput}
                    />
                    <div className={styles.priceValues}>
                        <span>₹0</span>
                        <span>Up to ₹{activeMaxPrice.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Brands */}
            <div className={styles.filterSection}>
                <h3>Brands</h3>
                <ul className={styles.filterList}>
                    {allBrands.map(([brand, count]) => (
                        <li key={brand}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="radio"
                                    name="brand"
                                    checked={activeBrand.toLowerCase() === brand.toLowerCase()}
                                    onChange={() => updateParams('brand', activeBrand.toLowerCase() === brand.toLowerCase() ? '' : brand)}
                                />
                                <span className={styles.checkboxText}>{brand}</span>
                                <span className={styles.itemCount}>({count})</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Customer Ratings */}
            <div className={styles.filterSection}>
                <h3>Customer Ratings</h3>
                <ul className={styles.filterList}>
                    {[4, 3, 2].map(rating => (
                        <li key={rating}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={activeRating === rating}
                                    onChange={() => updateParams('rating', activeRating === rating ? '' : String(rating))}
                                />
                                <span className={styles.stars}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
                                <span className={styles.checkboxText}>& Up</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Availability */}
            <div className={styles.filterSection}>
                <h3>Availability</h3>
                <ul className={styles.filterList}>
                    <li>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={activeInStock}
                                onChange={(e) => updateParams('inStock', e.target.checked ? 'true' : '')}
                            />
                            <span className={styles.checkboxText}>In-stock only</span>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    );
}
