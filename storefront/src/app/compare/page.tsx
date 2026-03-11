'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Compare.module.css';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ComparePage() {
    const { addToCart } = useCart();
    const [addedIds, setAddedIds] = useState<string[]>([]);
    const [compareIds, setCompareIds] = useState(['sony-wh1000xm5', 'macbook-air-m3']);

    const compareList = products.filter(p => compareIds.includes(p.id));

    const specsMap: Record<string, Record<string, string>> = {
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

    const handleRemove = (id: string) => {
        setCompareIds(prev => prev.filter(pid => pid !== id));
    };

    const handleAddToCart = (product: typeof products[0]) => {
        addToCart({ productId: product.id, name: product.title, price: product.price, image: product.image });
        setAddedIds(prev => [...prev, product.id]);
        setTimeout(() => setAddedIds(prev => prev.filter(id => id !== product.id)), 2000);
    };

    return (
        <main className={styles.container}>
            <div className="container">
                <div className={styles.header}>
                    <h1 className={styles.title}>Compare Products</h1>
                    <p className={styles.subtitle}>Find the perfect product by comparing specifications sideways.</p>
                </div>

                {compareList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                        <h2>No products to compare</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Add products from the product pages to compare them side-by-side.</p>
                        <Link href="/products" className="btn btn-primary">Browse Products</Link>
                    </div>
                ) : (
                    <div className={styles.compareWrapper}>
                        <div className={styles.compareTable}>
                            {/* Header Row: Products */}
                            <div className={styles.row}>
                                <div className={`${styles.cell} ${styles.featureCell}`}>
                                    <h3>Overview</h3>
                                </div>
                                {compareList.map(product => (
                                    <div key={`head-${product.id}`} className={`${styles.cell} ${styles.productCell}`}>
                                        <button className={styles.removeBtn} onClick={() => handleRemove(product.id)}>✕</button>
                                        <div className={styles.productImageMock} style={{ overflow: 'hidden', borderRadius: '8px' }}>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <Link href={`/product/${product.id}`} className={styles.productName}>
                                            {product.title}
                                        </Link>
                                        <div className={styles.productPrice}>₹{product.price.toLocaleString()}</div>
                                        <button
                                            className={`btn ${addedIds.includes(product.id) ? 'btn-success' : 'btn-primary'} ${styles.addToCartBtn}`}
                                            onClick={() => handleAddToCart(product)}
                                            disabled={addedIds.includes(product.id)}
                                        >
                                            {addedIds.includes(product.id) ? '✓ Added!' : 'Add to Cart'}
                                        </button>
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
                )}
            </div>
        </main>
    );
}
