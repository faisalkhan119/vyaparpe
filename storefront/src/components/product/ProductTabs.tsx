'use client';
import { useState } from 'react';
import styles from './ProductTabs.module.css';

export default function ProductTabs() {
    const [activeTab, setActiveTab] = useState('description');

    return (
        <div className={styles.tabsContainer}>
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
                        <h3>Industry-Leading Noise Cancellation</h3>
                        <p>
                            From airplane noise to people&apos;s voices, our WH-1000XM5 wireless headphones with multiple microphone noise cancelling keep out more high and mid frequency sounds than ever. And with Auto NC Optimizer, noise cancelling is automatically optimized based on your wearing conditions and environment.
                        </p>
                        <h3>Multi Noise Sensor technology</h3>
                        <p>
                            With four microphones on each earcup, this is our biggest ever step forward in noise cancelling. Ambient sound is captured even more accurately for a dramatic reduction in high frequency noise.
                        </p>
                    </div>
                )}

                {activeTab === 'specs' && (
                    <div className={styles.contentPane + " animate-fade-in"}>
                        <table className={styles.specsTable}>
                            <tbody>
                                <tr>
                                    <td>Headphone Type</td>
                                    <td>Closed, dynamic</td>
                                </tr>
                                <tr>
                                    <td>Driver Unit</td>
                                    <td>30mm</td>
                                </tr>
                                <tr>
                                    <td>Input(s)</td>
                                    <td>Stereo Mini Jack</td>
                                </tr>
                                <tr>
                                    <td>Bluetooth Version</td>
                                    <td>Version 5.2</td>
                                </tr>
                                <tr>
                                    <td>Battery Charging Time</td>
                                    <td>Approx. 3.5 hrs</td>
                                </tr>
                                <tr>
                                    <td>Battery Life (Continuous Music Playback)</td>
                                    <td>Max. 30 hrs (NC ON), Max. 40 hrs (NC OFF)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className={styles.contentPane + " animate-fade-in"}>
                        <div className={styles.reviewsSummary}>
                            <div className={styles.ratingBig}>4.8</div>
                            <div className={styles.starsRow}>★★★★★</div>
                            <p>Based on 1,245 reviews</p>
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
                                <h4 className={styles.reviewTitle}>Best ANC on the market</h4>
                                <p className={styles.reviewText}>
                                    The noise cancellation is just unreal. Upgraded from XM3s and the difference in comfort and mic quality for calls is massive. Highly recommended for remote work.
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
                                <h4 className={styles.reviewTitle}>Great sound, could be more compact</h4>
                                <p className={styles.reviewText}>
                                    Sound quality is amazing. The only downside is they don&apos;t fold down as small as the previous generation, making the carrying case a bit bulky for travel.
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
