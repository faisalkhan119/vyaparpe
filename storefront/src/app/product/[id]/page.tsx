import Link from 'next/link';
import styles from './ProductPage.module.css';
import ImageGallery from '../../../components/product/ImageGallery';
import ProductActions from '../../../components/product/ProductActions';
import ProductVariants from '../../../components/product/ProductVariants';
import ProductTabs from '../../../components/product/ProductTabs';
import ProductQA from '../../../components/product/ProductQA';
import { getProductById, products } from '../../../data/products';

export default async function ProductDetailsPage({ 
    params,
    searchParams
}: { 
    params: Promise<{ id: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const variantId = (resolvedSearchParams.variant as string) || 'black';

    const baseProduct = getProductById(resolvedParams.id);

    // fallback if product not found
    if (!baseProduct) {
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

    // Extract dynamic variants from the product's images array if available
    const productVariants = (baseProduct.images || []).map((imgUrl, index) => ({
        id: `variant-${index}`,
        name: `Option ${index + 1}`,
        thumb: imgUrl
    }));
    
    // Default to the first variant if invalid one is in URL
    const activeVariant = productVariants.find(v => v.id === variantId) || productVariants[0];

    // MOCK: Adjust price and image based on variant
    const product = { ...baseProduct };
    let derivedPrice = product.price;
    let derivedOriginalPrice = product.originalPrice;
    let selectedOptions: Record<string, string | string[]> = {};
    let variantLabels: string[] = [];

    // Process Modern Variant Groups
    if (product.variantGroups) {
        product.variantGroups.forEach(group => {
            const rawParamUrl = resolvedSearchParams[group.id] as string;
            
            // 0. Enforce dependsOn visibility logic
            if (group.dependsOn && group.dependsOn.length > 0) {
                const isMet = group.dependsOn.some(dep => resolvedSearchParams[dep.groupId] === dep.optionId);
                if (!isMet) return; // Skip processing hidden variants
            }

            if (group.type === 'text') {
                if (rawParamUrl) {
                    selectedOptions.customText = rawParamUrl;
                    variantLabels.push(`${group.name}: ${rawParamUrl}`);
                }
            } else if (group.type === 'file') {
                if (rawParamUrl) {
                    selectedOptions.uploadedFileUrl = rawParamUrl;
                    variantLabels.push(`File: ${rawParamUrl}`);
                }
            } else if (group.type === 'date') {
                if (rawParamUrl) {
                    const [d, t] = rawParamUrl.split('|');
                    if (d) selectedOptions.selectedDate = d;
                    if (t) selectedOptions.selectedTime = t;
                    variantLabels.push(`${group.name}: ${d}${t ? ` @ ${t}` : ''}`);
                }
            } else if (group.type === 'colorpicker') {
                if (rawParamUrl) {
                    selectedOptions.customColorHex = rawParamUrl;
                    variantLabels.push(`Color: ${rawParamUrl}`);
                    const option = group.options[0];
                    if (option && option.priceModifier) {
                        // For custom colors, the first option might hold the premium fee
                        derivedPrice += option.priceModifier;
                        derivedOriginalPrice += option.priceModifier;
                    }
                }
            } else if (group.type === 'multiselect') {
                if (rawParamUrl) {
                    // rawParamUrl looks like "choc:2,van:4"
                    const items = rawParamUrl.split(',');
                    selectedOptions.multiselectItems = items;
                    // Try to generate human readable labels for the array
                    const niceLabels = items.map(combo => {
                        const [id, count] = combo.split(':');
                        const opt = group.options.find(o => o.id === id);
                        return opt ? `${count}x ${opt.label}` : `${count}x ${id}`;
                    });
                    variantLabels.push(`Flavors: ${niceLabels.join(', ')}`);
                }
            } else {
                // Find selected option
                const activeOption = group.options.find(o => o.id === rawParamUrl) || (group.type !== 'checkbox' ? group.options[0] : null);
                
                if (activeOption) {
                    if (activeOption.priceModifier) {
                        derivedPrice += activeOption.priceModifier;
                        derivedOriginalPrice += activeOption.priceModifier;
                    }
                    if (group.type === 'subscription') {
                        selectedOptions.subscriptionInterval = activeOption.id;
                    }
                    if (group.type === 'image' && activeOption.thumb) {
                        product.image = activeOption.thumb;
                    }
                    variantLabels.push(`${group.name}: ${activeOption.label}`);
                }
            }
        });
    } else if (activeVariant) {
        // Fallback for legacy variants
        product.image = activeVariant.thumb; 
        variantLabels.push(activeVariant.name);
    }
    
    product.price = derivedPrice;
    product.originalPrice = derivedOriginalPrice;

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
                        {/* We use a key based on variantId to force React to remake the ImageGallery and reset swiper state on variant change! */}
                        <ImageGallery key={variantId} product={product} variantImage={product.image} />
                    </div>

                    {/* Right Column: Product Info & Actions */}
                    <div className={styles.infoColumn}>
                        
                        <div className={styles.orderTitleGroup}>
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
                        </div>



                        <div className={styles.orderPriceGroup}>
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
                        </div>

                        <div className={styles.orderDeliveryGroup}>
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
                        </div>

                        <div className={styles.orderVariantsGroup}>
                            {/* NEW: Variants pulled out and placed logically near actions */}
                            <ProductVariants 
                                legacyVariants={productVariants} 
                                variantGroups={(product as any).variantGroups} 
                            />
                            <hr className={styles.divider} style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }} />
                        </div>

                        <div className={styles.orderActionsGroup}>
                            <ProductActions
                                productId={product.id}
                                name={product.title}
                                price={product.price}
                                image={product.image}
                                inStock={product.inStock}
                                variantLabels={variantLabels}
                                selectedOptions={selectedOptions}
                            />
                        </div>

                        <div className={styles.orderTrustGroup}>
                            <div className={styles.trustBadges}>
                                <div className={styles.trustBadge}><span className="icon">🚚</span> Free Delivery</div>
                                <div className={styles.trustBadge}><span className="icon">🔄</span> 7 Days Return</div>
                                <div className={styles.trustBadge}><span className="icon">🛡️</span> 1 Year Warranty</div>
                                <div className={styles.trustBadge}><span className="icon">💳</span> Secure Payment</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Information Tabs (Specs, Reviews, etc) */}
                <ProductTabs product={{
                    title: product.title,
                    description: product.description,
                    rating: product.rating,
                    reviewsCount: product.reviewsCount,
                    brand: product.brand,
                    category: product.category
                }} />

                {/* Product Questions & Answers */}
                <ProductQA productName={product.title} />

                {/* Frequently Bought Together */}
                <section className={styles.relatedSection}>
                    <h2>Frequently Bought Together</h2>
                    <div className={styles.bundleRow}>
                        {[product, ...related.slice(0, 2)].flatMap((item, index, arr) => {
                            const node = (
                                <Link key={item.id} href={`/product/${item.id}`} className={styles.bundleItem}>
                                    <div className={styles.bundleImage}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </div>
                                    <p>{item.title}</p>
                                    <span>₹{item.price.toLocaleString()}</span>
                                </Link>
                            );
                            if (index < arr.length - 1) {
                                return [node, <span key={`plus-${item.id}`} className={styles.plusSign}>+</span>];
                            }
                            return [node];
                        })}
                        <div className={styles.bundleTotal}>
                            <div className={styles.bundleTotalText}>Total Price:</div>
                            <div className={styles.bundleTotalPrice}>
                                ₹{(product.price + related.slice(0, 2).reduce((s, r) => s + r.price, 0)).toLocaleString()}
                            </div>
                            <button className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
                                Add All {1 + Math.min(2, related.length)} to Cart
                            </button>
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                {related.length > 0 && (
                    <section className={styles.relatedSection}>
                        <h2>You May Also Like</h2>
                        <div className={styles.relatedGrid}>
                            {related.map((r) => (
                                <Link href={`/product/${r.id}`} key={r.id} className={`glass-panel ${styles.relatedCard}`}>
                                    <div className={styles.relatedImg}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={r.image} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </div>
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
