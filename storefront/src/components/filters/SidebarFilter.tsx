'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import styles from './SidebarFilter.module.css';
import { MobileFilterHeader, MobileFilterFooter } from '@/app/products/MobileFilterControls';

type FilterTab = 'Categories' | 'Price' | 'Brands' | 'Ratings' | 'Availability';

export default function SidebarFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // State for mobile Flipkart-style tabs
    const [activeTab, setActiveTab] = useState<FilterTab>('Categories');

    // Decoupled local state for the filter engine
    const [localState, setLocalState] = useState({
        category: searchParams.get('category') || '',
        brands: searchParams.get('brand') ? searchParams.get('brand')!.split(',').map(b => b.trim()) : [],
        maxPrice: Number(searchParams.get('maxPrice') || '200000'),
        rating: Number(searchParams.get('rating') || '0'),
        inStock: searchParams.get('inStock') === 'true'
    });

    // Keep local state in sync if URL changes externally
    useEffect(() => {
        setLocalState({
            category: searchParams.get('category') || '',
            brands: searchParams.get('brand') ? searchParams.get('brand')!.split(',').map(b => b.trim()) : [],
            maxPrice: Number(searchParams.get('maxPrice') || '200000'),
            rating: Number(searchParams.get('rating') || '0'),
            inStock: searchParams.get('inStock') === 'true'
        });
    }, [searchParams]);

    // Apply filters to URL
    const applyFilters = (stateToApply = localState) => {
        const params = new URLSearchParams(searchParams.toString());
        if (stateToApply.category) params.set('category', stateToApply.category);
        else params.delete('category');

        if (stateToApply.brands.length > 0) params.set('brand', stateToApply.brands.join(','));
        else params.delete('brand');

        if (stateToApply.maxPrice < 200000) params.set('maxPrice', String(stateToApply.maxPrice));
        else params.delete('maxPrice');

        if (stateToApply.rating > 0) params.set('rating', String(stateToApply.rating));
        else params.delete('rating');

        if (stateToApply.inStock) params.set('inStock', 'true');
        else params.delete('inStock');

        router.push(`/products?${params.toString()}`);
    };

    const updateLocalState = (key: keyof typeof localState, value: any) => {
        const newState = { ...localState, [key]: value };
        setLocalState(newState);
        
        // Auto-apply on desktop so it updates immediately
        if (typeof window !== 'undefined' && window.innerWidth > 768) {
            applyFilters(newState);
        }
    };

    const toggleBrand = (brand: string) => {
        const currentBrands = [...localState.brands];
        const index = currentBrands.findIndex(b => b.toLowerCase() === brand.toLowerCase());
        if (index > -1) currentBrands.splice(index, 1);
        else currentBrands.push(brand);
        updateLocalState('brands', currentBrands);
    };

    const clearAll = () => {
        const emptyState = { category: '', brands: [], maxPrice: 200000, rating: 0, inStock: false };
        setLocalState(emptyState);
        applyFilters(emptyState);
    };

    // --- FACETED SEARCH ENGINE ---
    // Compute facets dynamically based on OTHER active states
    const { categoryOptions, brandOptions, resultCount } = useMemo(() => {
        const catMap = new Map<string, number>();
        const brdMap = new Map<string, number>();
        let count = 0;

        products.forEach(p => {
            // Check matches for each facet criteria
            const matchCat = !localState.category || p.category.toLowerCase() === localState.category.toLowerCase();
            const matchBrd = localState.brands.length === 0 || localState.brands.some(b => b.toLowerCase() === p.brand.toLowerCase());
            const matchPrice = p.price <= localState.maxPrice;
            const matchRate = p.rating >= localState.rating;
            const matchStock = !localState.inStock || p.inStock;

            // Categories Options (Ignore active category filter, apply others)
            if (matchBrd && matchPrice && matchRate && matchStock) {
                catMap.set(p.category, (catMap.get(p.category) || 0) + 1);
            }

            // Brands Options (Ignore active brand filter, apply others)
            if (matchCat && matchPrice && matchRate && matchStock) {
                brdMap.set(p.brand, (brdMap.get(p.brand) || 0) + 1);
            }

            // Total active results
            if (matchCat && matchBrd && matchPrice && matchRate && matchStock) {
                count++;
            }
        });

        // Add 0 count for active filters if they got wiped out, so user can uncheck them
        if (localState.category && !catMap.has(localState.category)) catMap.set(localState.category, 0);
        localState.brands.forEach(b => {
             // Find original casing if exists
             const orig = products.find(p => p.brand.toLowerCase() === b.toLowerCase())?.brand || b;
             if (!brdMap.has(orig)) brdMap.set(orig, 0);
        });

        return {
            categoryOptions: Array.from(catMap.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
            brandOptions: Array.from(brdMap.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])),
            resultCount: count
        };
    }, [products, localState]);

    const hasFilters = localState.category !== '' || localState.brands.length > 0 || localState.maxPrice < 200000 || localState.rating > 0 || localState.inStock;

    return (
        <>
        <div className={`${styles.filterSidebar} desktop-filter-sidebar`}>
            <MobileFilterHeader onClear={clearAll} hasFilters={hasFilters} />
            <div className={`${styles.filterHeader} desktop-filter-header`}>
                <h2>Filters</h2>
                {hasFilters && (
                    <button className={styles.clearBtn} onClick={clearAll}>Clear All</button>
                )}
            </div>

            {/* Active Filters Summary (Visible on Desktop, hidden in Mobile Dual Pane) */}
            {hasFilters && (
                <div className={`${styles.activeFilters} desktop-only-filters`}>
                    {localState.category && (
                        <span className={styles.filterChip}>
                            {localState.category}
                            <button onClick={() => updateLocalState('category', '')}>✕</button>
                        </span>
                    )}
                    {localState.brands.map(brand => (
                         <span key={brand} className={styles.filterChip}>
                            {brand}
                            <button onClick={() => toggleBrand(brand)}>✕</button>
                        </span>
                    ))}
                    {localState.rating > 0 && (
                        <span className={styles.filterChip}>
                            {localState.rating}★ & up
                            <button onClick={() => updateLocalState('rating', 0)}>✕</button>
                        </span>
                    )}
                    {localState.inStock && (
                        <span className={styles.filterChip}>
                            In Stock
                            <button onClick={() => updateLocalState('inStock', false)}>✕</button>
                        </span>
                    )}
                </div>
            )}

            <div className={`${styles.filterLayout}`}>
                <div className={`${styles.filterTabsPanel}`}>
                    <button className={`${styles.filterTab} ${activeTab === 'Categories' ? styles.activeTab : ''}`} onClick={() => setActiveTab('Categories')}>
                        Categories {localState.category ? '•' : ''}
                    </button>
                    <button className={`${styles.filterTab} ${activeTab === 'Price' ? styles.activeTab : ''}`} onClick={() => setActiveTab('Price')}>
                        Price Range {localState.maxPrice < 200000 ? '•' : ''}
                    </button>
                    <button className={`${styles.filterTab} ${activeTab === 'Brands' ? styles.activeTab : ''}`} onClick={() => setActiveTab('Brands')}>
                        Brands {localState.brands.length > 0 ? `(${localState.brands.length})` : ''}
                    </button>
                    <button className={`${styles.filterTab} ${activeTab === 'Ratings' ? styles.activeTab : ''}`} onClick={() => setActiveTab('Ratings')}>
                        Ratings {localState.rating > 0 ? '•' : ''}
                    </button>
                    <button className={`${styles.filterTab} ${activeTab === 'Availability' ? styles.activeTab : ''}`} onClick={() => setActiveTab('Availability')}>
                        Availability {localState.inStock ? '•' : ''}
                    </button>
                </div>
                
                <div className={`${styles.filterContentPanel}`}>
                    {/* Categories */}
                    <div className={`${styles.filterSection} ${(activeTab === 'Categories') ? styles.sectionActive : styles.sectionHidden}`}>
                        <h3 className="desktop-only-heading">Categories</h3>
                        <ul className={styles.filterList}>
                            {categoryOptions.map(([cat, count]) => (
                                <li key={cat}>
                                    <label className={styles.checkboxLabel} style={{ opacity: count === 0 ? 0.5 : 1 }}>
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={localState.category.toLowerCase() === cat.toLowerCase()}
                                            onChange={() => updateLocalState('category', localState.category.toLowerCase() === cat.toLowerCase() ? '' : cat)}
                                        />
                                        <span className={styles.checkboxText}>{cat}</span>
                                        <span className={styles.itemCount}>({count})</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Price Range */}
                    <div className={`${styles.filterSection} ${(activeTab === 'Price') ? styles.sectionActive : styles.sectionHidden}`}>
                        <h3 className="desktop-only-heading">Price Range</h3>
                        <div className={styles.priceSlider}>
                            <input
                                type="range"
                                min="0"
                                max="200000"
                                step="1000"
                                value={localState.maxPrice}
                                onChange={(e) => updateLocalState('maxPrice', Number(e.target.value))}
                                className={styles.rangeInput}
                            />
                            <div className={styles.priceValues}>
                                <span>₹0</span>
                                <span>Up to ₹{localState.maxPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Brands */}
                    <div className={`${styles.filterSection} ${(activeTab === 'Brands') ? styles.sectionActive : styles.sectionHidden}`}>
                        <h3 className="desktop-only-heading">Brands</h3>
                        <ul className={styles.filterList}>
                            {brandOptions.map(([brand, count]) => (
                                <li key={brand}>
                                    <label className={styles.checkboxLabel} style={{ opacity: count === 0 ? 0.5 : 1 }}>
                                        <input
                                            type="checkbox"
                                            name="brand"
                                            checked={localState.brands.some(b => b.toLowerCase() === brand.toLowerCase())}
                                            onChange={() => toggleBrand(brand)}
                                        />
                                        <span className={styles.checkboxText}>{brand}</span>
                                        <span className={styles.itemCount}>({count})</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Ratings */}
                    <div className={`${styles.filterSection} ${(activeTab === 'Ratings') ? styles.sectionActive : styles.sectionHidden}`}>
                        <h3 className="desktop-only-heading">Customer Ratings</h3>
                        <ul className={styles.filterList}>
                            {[4, 3, 2].map(rating => (
                                <li key={rating}>
                                    <label className={styles.checkboxLabel}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={localState.rating === rating}
                                            onChange={() => updateLocalState('rating', localState.rating === rating ? 0 : rating)}
                                        />
                                        <span className={styles.stars}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
                                        <span className={styles.checkboxText}>& Up</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Availability */}
                    <div className={`${styles.filterSection} ${(activeTab === 'Availability') ? styles.sectionActive : styles.sectionHidden}`}>
                        <h3 className="desktop-only-heading">Availability</h3>
                        <ul className={styles.filterList}>
                            <li>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        checked={localState.inStock}
                                        onChange={(e) => updateLocalState('inStock', e.target.checked)}
                                    />
                                    <span className={styles.checkboxText}>In-stock only</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <MobileFilterFooter resultCount={resultCount} onApply={() => applyFilters(localState)} hasFilters={hasFilters} />
        </div>
        </>
    );
}
