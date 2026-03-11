'use client';
import { useState } from 'react';
import styles from './ProductTabs.module.css';

interface ProductData {
    title: string;
    description: string;
    rating: number;
    reviewsCount: number;
    category: string;
    brand: string;
}

export default function ProductTabs({ product }: { product: ProductData }) {
    const [activeTab, setActiveTab] = useState('description');

    return (
        <div className={styles.tabsContainer} id="reviews">
            <div className={styles.tabHeaders}>
                <button
                    className={`${styles.tabBtn} ${activeTab === 'description' ? styles.active : ''}`}
                    onClick={() => setActiveTab('description')}
                >
                    Description
                </button>
                <button
                    className={`${styles.tabBtn} ${activeTab === 'specs' ? styles.active : ''}`}
                    onClick={() => setActiveTab('specs')}
                >
                    Specifications
                </button>
                <button
                    className={`${styles.tabBtn} ${activeTab === 'reviews' ? styles.active : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Reviews (1,245)
                </button>
            </div>

            <div className={styles.tabContent}>
                {activeTab === 'description' && (
                    <div className={styles.contentPane + " animate-fade-in"}>
                        <h3>{product.title}</h3>
                        <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                            {product.description}
                        </p>
                    </div>
                )}

                {activeTab === 'specs' && (
                    <div className={styles.contentPane + " animate-fade-in"}>
                        <table className={styles.specsTable}>
                            <tbody>
                                <tr>
                                    <td>Brand</td>
                                    <td>{product.brand}</td>
                                </tr>
                                <tr>
                                    <td>Category</td>
                                    <td>{product.category}</td>
                                </tr>
                                <tr>
                                    <td>Condition</td>
                                    <td>Brand New, Sealed</td>
                                </tr>
                                <tr>
                                    <td>Warranty</td>
                                    <td>1 Year Standard Manufacturer Warranty</td>
                                </tr>
                                <tr>
                                    <td>Returns</td>
                                    <td>7 Days Replacement Policy</td>
                                </tr>
                                <tr>
                                    <td>Origin</td>
                                    <td>Imported / Made in India</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className={styles.contentPane + " animate-fade-in"}>
                        <div className={styles.reviewsSummary}>
                            <div className={styles.ratingBig}>{product.rating}</div>
                            <div className={styles.starsRow}>★★★★★</div>
                            <p>Based on {product.reviewsCount.toLocaleString()} reviews</p>
                            <button className="btn btn-outline" style={{ marginTop: '1rem' }}>Write a Review</button>
                        </div>

                        <div className={styles.reviewList}>
                            <div className={styles.reviewItem}>
                                <div className={styles.reviewHeader}>
                                    <div>
                                        <span className={styles.reviewerName}>Aryan K.</span> <span className={styles.verifiedBadge}>✓ Verified Buyer</span>
                                    </div>
                                    <span className={styles.reviewDate}>2 days ago</span>
                                </div>
                                <div className={styles.reviewStars}>★★★★★</div>
                                <h4 className={styles.reviewTitle}>Excellent Quality</h4>
                                <p className={styles.reviewText}>
                                    I bought this recently and the quality is exactly as described. Very satisfied with the purchase and the delivery was prompt as well.
                                </p>
                            </div>

                            <div className={styles.reviewItem}>
                                <div className={styles.reviewHeader}>
                                    <div>
                                        <span className={styles.reviewerName}>Priya M.</span> <span className={styles.verifiedBadge}>✓ Verified Buyer</span>
                                    </div>
                                    <span className={styles.reviewDate}>1 week ago</span>
                                </div>
                                <div className={styles.reviewStars}>★★★★☆</div>
                                <h4 className={styles.reviewTitle}>Good product, met expectations</h4>
                                <p className={styles.reviewText}>
                                    Overall a solid purchase. It does exactly what it&apos;s supposed to do. Giving 4 stars because the packaging was slightly dented, but the item inside was perfectly safe!
                                </p>
                            </div>
                        </div>

                        <button className="btn btn-outline" style={{ width: '100%', marginTop: '2rem' }}>Load More Reviews</button>
                    </div>
                )}
            </div>
        </div>
    );
}
