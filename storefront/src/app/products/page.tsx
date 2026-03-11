import Link from 'next/link';
import { Suspense } from 'react';
import styles from './ProductsLayout.module.css';
import SidebarFilter from '@/components/filters/SidebarFilter';
import { products } from '@/data/products';

import SortDropdownClient from './SortDropdownClient';
import AddToCartButton from '@/components/product/AddToCartButton';

interface ProductsPageProps {
    searchParams: Promise<{ category?: string; brand?: string; maxPrice?: string; rating?: string; sort?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const params = await searchParams;
    const categoryFilter = params.category || '';
    const brandFilter = params.brand || '';
    const maxPrice = Number(params.maxPrice || '200000');
    const minRating = Number(params.rating || '0');
    const sort = params.sort || '';

    let filtered = products;
    let pageTitle = 'All Products';
    const breadcrumbParts: string[] = [];

    if (categoryFilter) {
        filtered = filtered.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
        pageTitle = categoryFilter;
        breadcrumbParts.push(categoryFilter);
    }

    if (brandFilter) {
        filtered = filtered.filter(p => p.brand.toLowerCase() === brandFilter.toLowerCase());
        pageTitle = breadcrumbParts.length > 0 ? `${brandFilter} in ${categoryFilter}` : `${brandFilter} Products`;
        breadcrumbParts.push(brandFilter);
    }

    if (maxPrice < 200000) {
        filtered = filtered.filter(p => p.price <= maxPrice);
    }

    if (minRating > 0) {
        filtered = filtered.filter(p => p.rating >= minRating);
    }

    // Sorting
    if (sort === 'price-asc') {
        filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
        filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sort === 'reviews') {
        filtered = [...filtered].sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return (
        <main className={styles.plpContainer}>
            <div className="container">

                <div className={styles.pageHeader}>
                    <div>
                        <div className={styles.breadcrumbs}>
                            <Link href="/">Home</Link> / <Link href="/products">Products</Link>
                            {breadcrumbParts.map((part, i) => (
                                <span key={i}> / <span>{part}</span></span>
                            ))}
                        </div>
                        <h1>{pageTitle}</h1>
                        <p className={styles.resultCount}>
                            {filtered.length === 0
                                ? 'No products found'
                                : `Showing ${filtered.length} product${filtered.length > 1 ? 's' : ''}`}
                        </p>
                    </div>

                    <div className={styles.sortControls}>
                        <SortDropdown currentSort={sort} />
                    </div>
                </div>

                <div className={styles.mainLayout}>
                    <aside className={styles.sidebar}>
                        <Suspense fallback={<div>Loading filters...</div>}>
                            <SidebarFilter />
                        </Suspense>
                    </aside>

                    <section className={styles.productGrid}>
                        {filtered.length > 0 ? (
                            filtered.map((product) => (
                                <div key={product.id} className={`glass-panel ${styles.productCard}`}>
                                    <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                        <div className={styles.productImagePlaceholder}>
                                            <div className={styles.productEmoji}>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            </div>
                                            {product.badge && <span className={styles.badgeSale}>{product.badge}</span>}
                                        </div>
                                        <div className={styles.productInfo}>
                                            <span className={styles.productBrand}>{product.brand}</span>
                                            <h3 className={styles.productTitle}>{product.title}</h3>
                                            <div className={styles.priceRow}>
                                                <span className={styles.currentPrice}>₹{product.price.toLocaleString()}</span>
                                                {product.originalPrice > product.price && (
                                                    <>
                                                        <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</span>
                                                        <span className={styles.discount}>{Math.round((1 - product.price / product.originalPrice) * 100)}% off</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className={styles.ratingRow}>
                                                <span className={styles.ratingBadge}>{product.rating} ★</span>
                                                <span className={styles.reviewCount}>({product.reviewsCount.toLocaleString()} reviews)</span>
                                            </div>
                                            {product.highlights && product.highlights.length > 0 && (
                                                <ul className={styles.cardHighlights}>
                                                    {product.highlights.slice(0, 3).map((highlight, idx) => (
                                                        <li key={idx}>{highlight}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </Link>
                                    <div style={{ padding: '0 1rem 1rem 1rem', marginTop: 'auto' }}>
                                        <AddToCartButton
                                            productId={product.id}
                                            name={product.title}
                                            price={product.price}
                                            image={product.image}
                                            inStock={product.inStock}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.emptyState}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                                <h3>No products found</h3>
                                <p>Try adjusting your filters or <Link href="/products" style={{ color: 'var(--primary)', fontWeight: 600 }}>view all products</Link></p>
                            </div>
                        )}
                    </section>
                </div>

            </div>
        </main>
    );
}

// Client component for sort dropdown
function SortDropdown({ currentSort }: { currentSort: string }) {
    return (
        <SortDropdownClient currentSort={currentSort} />
    );
}
