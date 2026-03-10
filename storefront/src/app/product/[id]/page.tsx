import Link from 'next/link';
import styles from './ProductPage.module.css';
import ImageGallery from '../../../components/product/ImageGallery';
import ProductActions from '../../../components/product/ProductActions';
import ProductTabs from '../../../components/product/ProductTabs';
import ProductQA from '../../../components/product/ProductQA';
import { getProductById, products } from '../../../data/products';

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const product = getProductById(resolvedParams.id);

    // fallback if product not found
    if (!product) {
        return (
            <main className={styles.pdpContainer}>
                <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
                    <h1>Product Not Found</h1>
                    <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>The product you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/products" className="btn btn-primary">Browse Products</Link>
                </div>
            </main>
        );
    }

    // get related products (same category, exclude current)
    const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <main className={styles.pdpContainer}>
            <div className="container">

                {/* Breadcrumbs */}
                <div className={styles.breadcrumbs}>
                    <Link href="/">Home</Link> / <Link href="/products">{product.category}</Link> / <span>{product.title}</span>
                </div>

                <div className={styles.mainGrid}>
                    {/* Left Column: Image Gallery */}
                    <div className={styles.galleryColumn}>
                        <ImageGallery />
                    </div>

                    {/* Right Column: Product Info & Actions */}
                    <div className={styles.infoColumn}>
                        <div className={styles.brandBadge}>{product.brand}</div>
                        <h1 className={styles.productTitle}>{product.title}</h1>

                        <div className={styles.metaRow}>
                            <div className={styles.rating}>
                                <span className={styles.stars}>{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                                <span className={styles.ratingText}>{product.rating} ({product.reviewsCount.toLocaleString()} reviews)</span>
                            </div>
                            <div className={styles.stockBadge}>
                                {product.inStock ? <span className="text-success">● In Stock</span> : <span className="text-danger">● Out of Stock</span>}
                            </div>
                        </div>

                        <div className={styles.priceContainer}>
                            <span className={styles.currentPrice}>₹{product.price.toLocaleString()}</span>
                            {product.originalPrice > product.price && (
                                <>
                                    <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</span>
                                    <span className={styles.discountBadge}>
                                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        <p className={styles.shortDescription}>{product.description}</p>

                        {/* Pincode checker */}
                        <div className={styles.pincodeCheck}>
                            <label>Check Delivery</label>
                            <div className={styles.pincodeRow}>
                                <input type="text" placeholder="Enter pincode e.g. 400001" className={styles.pincodeInput} />
                                <button className="btn btn-outline">Check</button>
                            </div>
                            <p className={styles.pincodeHint}>📍 Delivers to Mumbai in 2-3 days</p>
                        </div>

                        <hr className={styles.divider} />

                        <ProductActions />

                        <div className={styles.trustBadges}>
                            <div className={styles.trustBadge}><span className="icon">🚚</span> Free Delivery</div>
                            <div className={styles.trustBadge}><span className="icon">🔄</span> 7 Days Return</div>
                            <div className={styles.trustBadge}><span className="icon">🛡️</span> 1 Year Warranty</div>
                            <div className={styles.trustBadge}><span className="icon">💳</span> Secure Payment</div>
                        </div>
                    </div>
                </div>

                {/* Product Information Tabs (Specs, Reviews, etc) */}
                <ProductTabs />

                {/* Product Questions & Answers */}
                <ProductQA />

                {/* Frequently Bought Together */}
                <section className={styles.relatedSection}>
                    <h2>Frequently Bought Together</h2>
                    <div className={styles.bundleRow}>
                        <div className={styles.bundleItem}>
                            <span className={styles.bundleEmoji}>{product.image}</span>
                            <p>{product.title}</p>
                            <span>₹{product.price.toLocaleString()}</span>
                        </div>
                        <span className={styles.plusSign}>+</span>
                        {related.slice(0, 2).map(r => (
                            <div key={r.id}>
                                <Link href={`/product/${r.id}`} className={styles.bundleItem}>
                                    <span className={styles.bundleEmoji}>{r.image}</span>
                                    <p>{r.title}</p>
                                    <span>₹{r.price.toLocaleString()}</span>
                                </Link>
                                <span className={styles.plusSign}>+</span>
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                        Buy All 3 — ₹{(product.price + related.slice(0, 2).reduce((s, r) => s + r.price, 0)).toLocaleString()} (Save 10%)
                    </button>
                </section>

                {/* Related Products */}
                {related.length > 0 && (
                    <section className={styles.relatedSection}>
                        <h2>You May Also Like</h2>
                        <div className={styles.relatedGrid}>
                            {related.map((r) => (
                                <Link href={`/product/${r.id}`} key={r.id} className={`glass-panel ${styles.relatedCard}`}>
                                    <div className={styles.relatedImg}>{r.image}</div>
                                    <div className={styles.relatedInfo}>
                                        <div className={styles.relatedBrand}>{r.brand}</div>
                                        <h4>{r.title}</h4>
                                        <div className={styles.relatedPrice}>₹{r.price.toLocaleString()}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </main>
    );
}
