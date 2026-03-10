'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/link';
import styles from './Compare.module.css';
import { products } from '@/data/products';

export default function ComparePage() {
    // Select two tech products for comparison demo
    const compareList = products.filter(p => ['sony-wh1000xm5', 'macbook-air-m3'].includes(p.id));

    // Hardcoded specs for demo since our product data is basic
    const specsMap: Record<string, any> = {
        'sony-wh1000xm5': {
            brand: 'Sony',
            type: 'Over-Ear Headphones',
            wireless: 'Yes',
            anc: 'Industry Leading ANC',
            battery: '30 Hours',
            waterResistance: 'No',
            weight: '250g'
        },
        'macbook-air-m3': {
            brand: 'Apple',
            type: 'Laptop',
            wireless: 'Wi-Fi 6E, Bluetooth 5.3',
            anc: 'N/A',
            battery: 'Up to 18 Hours',
            waterResistance: 'No',
            weight: '1.24 kg'
        }
    };

    const getSpec = (productId: string, key: string) => specsMap[productId]?.[key] || '—';

    return (
        <main className={styles.container}>
            <div className="container">
                <div className={styles.header}>
                    <h1 className={styles.title}>Compare Products</h1>
                    <p className={styles.subtitle}>Find the perfect product by comparing specifications sideways.</p>
                </div>

                <div className={styles.compareWrapper}>
                    <div className={styles.compareTable}>

                        {/* Header Row: Products */}
                        <div className={styles.row}>
                            <div className={`${styles.cell} ${styles.featureCell}`}>
                                <h3>Overview</h3>
                            </div>
                            {compareList.map(product => (
                                <div key={`head-${product.id}`} className={`${styles.cell} ${styles.productCell}`}>
                                    <button className={styles.removeBtn}>✕</button>
                                    <div className={styles.productImageMock}>{product.image}</div>
                                    <Link href={`/product/${product.id}`} className={styles.productName}>
                                        {product.title}
                                    </Link>
                                    <div className={styles.productPrice}>₹{product.price.toLocaleString()}</div>
                                    <button className={`btn btn-primary ${styles.addToCartBtn}`}>Add to Cart</button>
                                </div>
                            ))}
                            <div className={`${styles.cell} ${styles.productCell} ${styles.addMoreCell}`}>
                                <div className={styles.addMoreCircle}>+</div>
                                <span>Add Product</span>
                            </div>
                        </div>

                        {/* Specs Rows */}
                        <div className={styles.sectionTitleRow}>General Info</div>

                        <div className={styles.row}>
                            <div className={`${styles.cell} ${styles.featureCell}`}>Brand</div>
                            {compareList.map(p => <div key={`brand-${p.id}`} className={styles.valueCell}>{getSpec(p.id, 'brand')}</div>)}
                            <div className={styles.emptyCell}></div>
                        </div>

                        <div className={styles.row}>
                            <div className={`${styles.cell} ${styles.featureCell}`}>Product Type</div>
                            {compareList.map(p => <div key={`type-${p.id}`} className={styles.valueCell}>{getSpec(p.id, 'type')}</div>)}
                            <div className={styles.emptyCell}></div>
                        </div>

                        <div className={styles.sectionTitleRow}>Technical Specs</div>

                        <div className={styles.row}>
                            <div className={`${styles.cell} ${styles.featureCell}`}>Battery Life</div>
                            {compareList.map(p => <div key={`bat-${p.id}`} className={styles.valueCell}>{getSpec(p.id, 'battery')}</div>)}
                            <div className={styles.emptyCell}></div>
                        </div>

                        <div className={styles.row}>
                            <div className={`${styles.cell} ${styles.featureCell}`}>Noise Cancellation</div>
                            {compareList.map(p => <div key={`anc-${p.id}`} className={styles.valueCell}>{getSpec(p.id, 'anc')}</div>)}
                            <div className={styles.emptyCell}></div>
                        </div>

                        <div className={styles.row}>
                            <div className={`${styles.cell} ${styles.featureCell}`}>Water Resistance</div>
                            {compareList.map(p => <div key={`ip-${p.id}`} className={styles.valueCell}>{getSpec(p.id, 'waterResistance')}</div>)}
                            <div className={styles.emptyCell}></div>
                        </div>

                        <div className={styles.row}>
                            <div className={`${styles.cell} ${styles.featureCell}`}>Weight</div>
                            {compareList.map(p => <div key={`w-${p.id}`} className={styles.valueCell}>{getSpec(p.id, 'weight')}</div>)}
                            <div className={styles.emptyCell}></div>
                        </div>

                        <div className={styles.row}>
                            <div className={`${styles.cell} ${styles.featureCell}`}>Rating</div>
                            {compareList.map(p => <div key={`rat-${p.id}`} className={styles.valueCell}>⭐⭐⭐⭐ {p.rating}</div>)}
                            <div className={styles.emptyCell}></div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
