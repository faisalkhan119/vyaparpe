'use client';
import { useState, use, useRef } from 'react';
import Link from 'next/link';
import styles from './OrderDetail.module.css';
import ReviewModal from '@/components/ReviewModal';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [isReturning, setIsReturning] = useState(false);
    const [isReturned, setIsReturned] = useState(false);
    const [returnMedia, setReturnMedia] = useState<File | null>(null);
    const [mediaError, setMediaError] = useState('');

    const [showReviewModal, setShowReviewModal] = useState(false);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);
    const [isCanceled, setIsCanceled] = useState(false);

    const [isDownloading, setIsDownloading] = useState(false);
    const invoiceRef = useRef<HTMLDivElement>(null);
    const resolvedParams = use(params);
    const orderId = resolvedParams.id;

    // Simulate database fetch based on ID
    const mockOrdersDb: Record<string, any> = {
        'ORD-84A29B': {
            id: 'ORD-84A29B',
            date: 'March 10, 2026',
            status: 'Processing',
            paymentMethod: 'UPI',
            trackingNumber: 'AWB1234567890',
            courier: 'Delhivery',
            timeline: [
                { step: 'Order Placed', date: 'Mar 10, 12:30 PM', done: true },
                { step: 'Payment Confirmed', date: 'Mar 10, 12:31 PM', done: true },
                { step: 'Packed & Ready', date: '—', done: false },
                { step: 'Shipped', date: '—', done: false },
                { step: 'Out for Delivery', date: '—', done: false },
                { step: 'Delivered', date: '—', done: false },
            ],
            deliveredDate: null, // Not delivered yet
            items: [
                { name: 'Sony WH-1000XM5 Headphones', qty: 1, price: 29990, image: '🎧' },
                { name: 'Premium Leather Headphone Stand', qty: 1, price: 2998, image: '📸' },
            ],
            subtotal: 32988, shipping: 0, tax: 0, total: 32988,
            address: '123 Park Street, Apt 4B\nChembur East, Mumbai 400071'
        },
        'ORD-99Z11A': {
            id: 'ORD-99Z11A',
            date: 'March 08, 2026',
            status: 'Shipped',
            paymentMethod: 'Credit Card',
            trackingNumber: 'BLR998877665',
            courier: 'Bluedart',
            timeline: [
                { step: 'Order Placed', date: 'Mar 08, 09:00 AM', done: true },
                { step: 'Payment Confirmed', date: 'Mar 08, 09:05 AM', done: true },
                { step: 'Packed & Ready', date: 'Mar 09, 10:00 AM', done: true },
                { step: 'Shipped', date: 'Mar 10, 08:30 AM', done: true },
                { step: 'Out for Delivery', date: '—', done: false },
                { step: 'Delivered', date: '—', done: false },
            ],
            deliveredDate: null,
            items: [
                { name: 'Nike Air Max 270', qty: 1, price: 4500, image: '👟' },
            ],
            subtotal: 4500, shipping: 0, tax: 0, total: 4500,
            address: '56A StartUp Street, Kormangala\nBengaluru 560034'
        },
        'ORD-12X99D': {
            id: 'ORD-12X99D',
            date: 'March 05, 2026',
            status: 'Delivered',
            paymentMethod: 'Net Banking',
            trackingNumber: 'XDSG11223344',
            courier: 'EcomExpress',
            timeline: [
                { step: 'Order Placed', date: 'Mar 05, 10:15 AM', done: true },
                { step: 'Payment Confirmed', date: 'Mar 05, 10:20 AM', done: true },
                { step: 'Packed & Ready', date: 'Mar 06, 09:00 AM', done: true },
                { step: 'Shipped', date: 'Mar 06, 06:30 PM', done: true },
                { step: 'Out for Delivery', date: 'Mar 08, 08:30 AM', done: true },
                { step: 'Delivered', date: 'Mar 08, 02:45 PM', done: true },
            ],
            deliveredDate: '2026-03-08T14:45:00', // Within 7 days
            items: [{ name: 'Apple MacBook Pro M3', qty: 1, price: 169900, image: '💻' }],
            subtotal: 169900, shipping: 0, tax: 0, total: 169900,
            address: '77 Residency Road, Sector 3\nSalt Lake City, Kolkata 700091'
        },
        'ORD-77F12C': {
            id: 'ORD-77F12C',
            date: 'February 14, 2026',
            status: 'Delivered',
            paymentMethod: 'Credit Card',
            trackingNumber: 'BLD987654321',
            courier: 'BlueDart',
            timeline: [
                { step: 'Order Placed', date: 'Feb 14, 09:00 AM', done: true },
                { step: 'Payment Confirmed', date: 'Feb 14, 09:05 AM', done: true },
                { step: 'Packed & Ready', date: 'Feb 14, 02:30 PM', done: true },
                { step: 'Shipped', date: 'Feb 15, 11:00 AM', done: true },
                { step: 'Out for Delivery', date: 'Feb 16, 09:45 AM', done: true },
                { step: 'Delivered', date: 'Feb 16, 04:20 PM', done: true },
            ],
            deliveredDate: '2026-02-16T16:20:00', // Past 7 days
            items: [{ name: 'Samsung Galaxy S24 Ultra', qty: 1, price: 125000, image: '📱' }],
            subtotal: 125000, shipping: 0, tax: 0, total: 125000,
            address: '45 Tech Hub, Ring Road\nIndiranagar, Bengaluru 560038'
        },
        'ORD-55K22L': {
            id: 'ORD-55K22L',
            date: 'March 01, 2026',
            status: 'Canceled',
            paymentMethod: 'UPI',
            trackingNumber: 'N/A',
            courier: 'N/A',
            timeline: [
                { step: 'Order Placed', date: 'Mar 01, 11:00 AM', done: true },
                { step: 'Payment Confirmed', date: 'Mar 01, 11:05 AM', done: true },
                { step: 'Canceled', date: 'Mar 01, 01:00 PM', done: true },
            ],
            deliveredDate: null,
            items: [{ name: 'Polo Ralph Lauren T-Shirt', qty: 1, price: 2999, image: '👕' }],
            subtotal: 2999, shipping: 0, tax: 0, total: 2999,
            address: 'H-10, Green Park Extension\nNew Delhi 110016'
        },
        'ORD-33R44M': {
            id: 'ORD-33R44M',
            date: 'February 20, 2026',
            status: 'Returned',
            paymentMethod: 'Net Banking',
            trackingNumber: 'RET123456',
            courier: 'Delhivery Return',
            timeline: [
                { step: 'Order Placed', date: 'Feb 20, 10:00 AM', done: true },
                { step: 'Delivered', date: 'Feb 24, 02:00 PM', done: true },
                { step: 'Return Requested', date: 'Feb 26, 09:00 AM', done: true },
                { step: 'Picked Up', date: 'Feb 28, 04:00 PM', done: true },
                { step: 'Refund Initiated', date: 'Mar 02, 10:00 AM', done: true },
            ],
            deliveredDate: '2026-02-24T14:00:00',
            items: [{ name: 'Titan Edge Watch', qty: 1, price: 8999, image: '⌚' }],
            subtotal: 8999, shipping: 0, tax: 0, total: 8999,
            address: 'A-21, Jubilee Hills\nHyderabad 500033'
        }
    };

    const order = mockOrdersDb[orderId] || mockOrdersDb['ORD-84A29B'];

    // 7-Day Return Policy Logic
    let isReturnEligible = false;
    if (order.status === 'Delivered' && order.deliveredDate) {
        const deliveredAt = new Date(order.deliveredDate).getTime();
        const now = new Date().getTime();
        const diffInDays = (now - deliveredAt) / (1000 * 3600 * 24);
        isReturnEligible = diffInDays <= 7;
    }

    // Cancel Order Eligibility Logic
    const shippedStep = order.timeline.find((t: any) => t.step === 'Shipped');
    const isAlreadyCanceledOrReturned = order.status === 'Canceled' || order.status === 'Returned';
    const isCancelEligible = shippedStep && !shippedStep.done && order.status !== 'Delivered' && !isAlreadyCanceledOrReturned && !isCanceled;

    const handleDownloadInvoice = async () => {
        if (!invoiceRef.current) return;
        setIsDownloading(true);
        try {
            // Import dynamically to avoid Next.js SSR document not defined errors
            const html2pdf = (await import('html2pdf.js')).default;
            const opt = {
                margin: 0.5,
                filename: `vyaparpe${order.id}.pdf`,
                image: { type: 'jpeg' as const, quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' as const }
            };
            await html2pdf().set(opt).from(invoiceRef.current).save();
        } catch (error) {
            console.error("Failed to generate PDF:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    const handleSubmitReturn = () => {
        setIsReturning(true);
        setTimeout(() => {
            setIsReturning(false);
            setShowReturnModal(false);
            setIsReturned(true);
            setReturnMedia(null);
        }, 1500);
    };

    const handleCancelOrder = () => {
        setIsCanceling(true);
        setTimeout(() => {
            setIsCanceling(false);
            setShowCancelModal(false);
            setIsCanceled(true);
        }, 1500);
    };

    if (!order) return <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>Loading order details...</div>;
    return (
        <div>
            <div className={styles.breadcrumb}>
                <Link href="/account/orders">← My Orders</Link>
                <span> / {order.id}</span>
            </div>

            <div className={styles.header}>
                <div>
                    <h2>Order {order.id}</h2>
                    <p className={styles.meta}>Placed on {order.date} · {order.paymentMethod}</p>
                </div>
                <span className={`${styles.statusBadge} ${
                    order.status === 'Delivered' ? styles.statusDelivered :
                    order.status === 'Processing' ? styles.statusProcessing :
                    order.status === 'Shipped' ? styles.statusShipped :
                    order.status === 'Canceled' ? styles.statusCanceled :
                    order.status === 'Returned' ? styles.statusReturned : ''
                }`}>{order.status}</span>
            </div>

            {/* Timeline */}
            <div className={`glass-panel ${styles.timelineSection}`}>
                <h3>Order Timeline</h3>
                <div className={styles.timeline}>
                    {order.timeline.map((step: any, i: number) => (
                        <div key={i} className={`${styles.timelineStep} ${step.done ? styles.done : ''}`}>
                            <div className={styles.stepDot}></div>
                            {i < order.timeline.length - 1 && <div className={styles.stepLine}></div>}
                            <div className={styles.stepInfo}>
                                <div className={styles.stepName}>{step.step}</div>
                                <div className={styles.stepDate}>{step.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.trackingInfo}>
                    <span>Tracking: <strong>{order.trackingNumber}</strong></span>
                    <span>Courier: <strong>{order.courier}</strong></span>
                </div>
            </div>

            {/* Items */}
            <div className={`glass-panel ${styles.itemsSection}`}>
                <h3>Items in this Order</h3>
                {order.items.map((item: any, i: number) => (
                    <div key={i} className={styles.itemRow}>
                        <div className={styles.itemThumb}>{item.image}</div>
                        <div className={styles.itemDetails}>
                            <div className={styles.itemName}>{item.name}</div>
                            <div className={styles.itemMeta}>Qty: {item.qty} × ₹{item.price.toLocaleString('en-IN')}</div>
                        </div>
                        <div className={styles.itemTotal}>₹{(item.qty * item.price).toLocaleString('en-IN')}</div>
                    </div>
                ))}
            </div>

            {/* Summary + Actions */}
            <div className={styles.bottomGrid}>
                <div className={`glass-panel ${styles.summaryCard}`}>
                    <h3>Order Summary</h3>
                    <div className={styles.summaryRow}><span>Subtotal</span><span>₹{order.subtotal.toLocaleString('en-IN')}</span></div>
                    <div className={styles.summaryRow}><span>Shipping</span><span>{order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}</span></div>
                    <div className={styles.summaryRow}><span>GST (18%)</span><span>₹{order.tax.toLocaleString('en-IN')}</span></div>
                    <div className={`${styles.summaryRow} ${styles.totalRow}`}><span>Total</span><span>₹{order.total.toLocaleString('en-IN')}</span></div>
                </div>

                <div className={`glass-panel ${styles.actionsCard}`}>
                    <h3>Actions</h3>
                    <button className="btn btn-outline" style={{ width: '100%', marginBottom: '0.75rem' }} onClick={handleDownloadInvoice} disabled={isDownloading}>
                        {isDownloading ? '⏳ Generating PDF...' : '📄 Download Invoice'}
                    </button>
                    <button className="btn btn-outline" style={{ width: '100%', marginBottom: '0.75rem' }} onClick={() => setShowReviewModal(true)}>
                        ✍️ Write a Review
                    </button>
                    {(isCancelEligible || isCanceled) && (
                        <button
                            className="btn btn-outline"
                            style={{ 
                                width: '100%', 
                                marginBottom: '0.75rem',
                                color: isCanceled ? 'var(--text-muted)' : 'var(--danger)', 
                                borderColor: isCanceled ? 'var(--border-color)' : 'var(--danger)' 
                            }}
                            onClick={() => !isCanceled && setShowCancelModal(true)}
                            disabled={isCanceled}
                        >
                            {isCanceled ? '🚫 Order Canceled' : '❌ Cancel Order'}
                        </button>
                    )}
                    {order.status === 'Delivered' && isReturnEligible && (
                        <button
                            className="btn btn-outline"
                            style={{ width: '100%', color: isReturned ? 'var(--text-muted)' : 'var(--danger)', borderColor: isReturned ? 'var(--border-color)' : 'var(--danger)' }}
                            onClick={() => !isReturned && setShowReturnModal(true)}
                            disabled={isReturned}
                        >
                            {isReturned ? '✓ Return Requested' : '↩️ Request Return'}
                        </button>
                    )}
                    {order.status === 'Delivered' && !isReturnEligible && (
                        <div style={{ padding: '0.75rem', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 500 }}>
                            🚫 7-Day Return Window Closed
                        </div>
                    )}
                </div>

                <div className={`glass-panel ${styles.addressCard}`}>
                    <h3>Delivery Address</h3>
                    <p style={{ color: 'var(--text-muted)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{order.address}</p>
                </div>
            </div>

            {/* Cancel Order Modal */}
            {showCancelModal && (
                <div className={styles.modalOverlay} onClick={() => setShowCancelModal(false)}>
                    <div className={`glass-panel ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
                        <h3>Cancel Order</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Are you sure you want to cancel this order? This action cannot be undone.</p>
                        <select style={{ width: '100%', background: 'var(--bg-body)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
                            <option>Order Created by Mistake</option>
                            <option>Found Better Price Elsewhere</option>
                            <option>Item Delayed Too Long</option>
                            <option>Changed My Mind</option>
                        </select>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary" style={{ background: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={handleCancelOrder} disabled={isCanceling}>
                                {isCanceling ? 'Canceling...' : 'Confirm Cancellation'}
                            </button>
                            <button className="btn btn-outline" onClick={() => setShowCancelModal(false)} disabled={isCanceling}>Keep Order</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Return Modal */}
            {showReturnModal && (
                <div className={styles.modalOverlay} onClick={() => setShowReturnModal(false)}>
                    <div className={`glass-panel ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
                        <h3>Request a Return</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Please select the item and reason for your return.</p>
                        <select style={{ width: '100%', background: 'var(--bg-body)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>
                            <option>Sony WH-1000XM5 Headphones</option>
                            <option>USB-C Cable (1.5m)</option>
                        </select>
                        <select style={{ width: '100%', background: 'var(--bg-body)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' }}>
                            <option>Defective / Not Working</option>
                            <option>Wrong Item Received</option>
                            <option>Item Damaged in Transit</option>
                            <option>Changed My Mind</option>
                        </select>
                        <textarea rows={3} placeholder="Additional notes (optional)..." style={{ width: '100%', background: 'var(--bg-body)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.5rem', resize: 'vertical' }}></textarea>

                        <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px dashed var(--border-color)', borderRadius: '8px', background: 'var(--bg-card)' }}>
                            <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Proof of Issue <span style={{ color: '#ef4444' }}>*</span></p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Please provide a live photo or a video clearly showing the defect/issue.</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <label className="btn btn-outline" style={{ cursor: 'pointer', flex: 1, textAlign: 'center', padding: '0.5rem', fontSize: '0.9rem' }}>
                                    📷 Take Photo
                                    <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={(e) => {
                                        if (e.target.files?.[0]) { setReturnMedia(e.target.files[0]); setMediaError(''); }
                                    }} />
                                </label>
                                <label className="btn btn-outline" style={{ cursor: 'pointer', flex: 1, textAlign: 'center', padding: '0.5rem', fontSize: '0.9rem' }}>
                                    🎥 Upload Video
                                    <input type="file" accept="video/*" style={{ display: 'none' }} onChange={(e) => {
                                        if (e.target.files?.[0]) { setReturnMedia(e.target.files[0]); setMediaError(''); }
                                    }} />
                                </label>
                            </div>
                            {returnMedia && <p style={{ fontSize: '0.85rem', color: '#10b981', marginTop: '0.75rem', fontWeight: 500 }}>✓ Attached: {returnMedia.name}</p>}
                            {mediaError && <p style={{ fontSize: '0.85rem', color: '#ef4444', marginTop: '0.75rem', fontWeight: 500 }}>⚠️ {mediaError}</p>}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary" onClick={() => {
                                if (!returnMedia) {
                                    setMediaError('A photo or video proof is strictly required to process this return.');
                                    return;
                                }
                                handleSubmitReturn();
                            }} disabled={isReturning}>
                                {isReturning ? 'Processing...' : 'Submit Request'}
                            </button>
                            <button className="btn btn-outline" onClick={() => setShowReturnModal(false)} disabled={isReturning}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <ReviewModal
                isOpen={showReviewModal}
                onClose={() => setShowReviewModal(false)}
                items={order.items}
            />

            {/* Hidden Invoice Template for html2pdf rendering (must be painted in DOM) */}
            <div style={{ position: 'absolute', top: '-10000px', left: '-10000px', overflow: 'hidden' }}>
                <div ref={invoiceRef} style={{ width: '800px', padding: '40px', background: 'white', color: '#000', fontFamily: 'Arial, sans-serif' }}>
                    {/* Header: Logo and Invoice Title */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '30px' }}>
                        <div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/vyapaarpe_logo.jpg" alt="VyaparPe" style={{ height: '50px', marginBottom: '10px' }} />
                            <div style={{ fontSize: '12px', color: '#333' }}>
                                <strong>VyaparPe Retail Ltd.</strong><br />
                                12A, Cyber Park, Electronic City<br />
                                Bengaluru, Karnataka 560100<br />
                                GSTIN: 29ABCDE1234F1Z5
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h2 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '24px' }}>Tax Invoice</h2>
                            <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}><strong>Order ID:</strong> {order.id}</p>
                            <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}><strong>Invoice Date:</strong> {order.date}</p>
                            <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}><strong>Payment:</strong> {order.paymentMethod}</p>
                        </div>
                    </div>

                    {/* Addresses */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '14px' }}>
                        <div style={{ width: '48%' }}>
                            <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Billing Address :</h4>
                            <p style={{ margin: 0, lineHeight: '1.6', whiteSpace: 'pre-line' }}>{order.address}</p>
                        </div>
                        <div style={{ width: '48%' }}>
                            <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>Shipping Address :</h4>
                            <p style={{ margin: 0, lineHeight: '1.6', whiteSpace: 'pre-line' }}>{order.address}</p>
                        </div>
                    </div>

                    {/* Items Table */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ background: '#f5f5f5' }}>
                                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd', width: '5%' }}>#</th>
                                <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd', width: '45%' }}>Product Description</th>
                                <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd', width: '10%' }}>Qty</th>
                                <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd', width: '15%' }}>Gross Amount</th>
                                <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd', width: '10%' }}>Tax</th>
                                <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd', width: '15%' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item: any, i: number) => {
                                const gross = (item.price * item.qty) * (1 - 0.18); // Simulate base price minus 18% GST for display
                                const tax = (item.price * item.qty) - gross;
                                return (
                                    <tr key={i}>
                                        <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{i + 1}</td>
                                        <td style={{ padding: '10px', border: '1px solid #ddd' }}><strong>{item.name}</strong><br /><span style={{ fontSize: '11px', color: '#666' }}>HSN: 85183000</span></td>
                                        <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{item.qty}</td>
                                        <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>₹{gross.toFixed(2)}</td>
                                        <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>₹{tax.toFixed(2)}</td>
                                        <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #ddd' }}>₹{(item.qty * item.price).toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Totals Section */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
                        <div style={{ width: '350px' }}>
                            <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                                <tbody>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Total Base Amount:</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>₹{(order.total * 0.82).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>IGST (18%):</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>₹{(order.total * 0.18).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>Shipping Charges:</td>
                                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>{order.shipping === 0 ? '₹0.00' : `₹${order.shipping.toFixed(2)}`}</td>
                                    </tr>
                                    <tr style={{ background: '#f5f5f5', fontWeight: 'bold' }}>
                                        <td style={{ padding: '12px 8px', border: '1px solid #ddd', fontSize: '16px' }}>Grand Total:</td>
                                        <td style={{ padding: '12px 8px', border: '1px solid #ddd', textAlign: 'right', fontSize: '16px' }}>₹{order.total.toLocaleString('en-IN')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer Warning / Signature */}
                    <div style={{ borderTop: '1px solid #ddd', paddingTop: '20px', fontSize: '12px', color: '#555', textAlign: 'center' }}>
                        <p style={{ margin: '0 0 5px 0' }}>This is a computer-generated invoice. No signature is required.</p>
                        <p style={{ margin: 0 }}>Returns policy and terms & conditions available at vyaparpe.com/returns</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
