'use client';
import { useState } from 'react';
import styles from '../AccountPages.module.css';

export default function DownloadsPage() {
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    const mockDownloads = [
        {
            id: 'dl-001',
            product: 'Professional Lightroom Presets Pack — 50 Premium Filters',
            orderId: 'ORD-DL-001',
            purchaseDate: 'March 10, 2026',
            fileSize: '45 MB',
            fileType: 'ZIP (XMP + DNG)',
            downloads: 2,
            maxDownloads: 5,
            image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=400'
        },
        {
            id: 'dl-002',
            product: 'Startup Business Plan Template — Investor Ready',
            orderId: 'ORD-DL-002',
            purchaseDate: 'February 28, 2026',
            fileSize: '12 MB',
            fileType: 'ZIP (XLSX + PPTX)',
            downloads: 1,
            maxDownloads: 5,
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400'
        }
    ];

    const handleDownload = (id: string) => {
        setDownloadingId(id);
        setTimeout(() => {
            setDownloadingId(null);
            alert('Download started! Check your downloads folder.');
        }, 1500);
    };

    return (
        <div>
            <div className={styles.pageHeader}>
                <h2>My Downloads</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {mockDownloads.map((item) => (
                    <div key={item.id} className="glass-panel" style={{ padding: '1.25rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                        <div style={{
                            width: 80, height: 80, borderRadius: '10px', overflow: 'hidden', flexShrink: 0,
                            border: '1px solid var(--border-color)'
                        }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.image} alt={item.product} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                                {item.product}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                Order: {item.orderId} · Purchased: {item.purchaseDate}
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                <span>📁 {item.fileType}</span>
                                <span>💾 {item.fileSize}</span>
                                <span>📥 {item.downloads}/{item.maxDownloads} downloads used</span>
                            </div>
                        </div>

                        <div style={{ flexShrink: 0 }}>
                            {item.downloads < item.maxDownloads ? (
                                <button
                                    className="btn btn-primary"
                                    style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
                                    onClick={() => handleDownload(item.id)}
                                    disabled={downloadingId === item.id}
                                >
                                    {downloadingId === item.id ? '⏳ Preparing...' : '⬇️ Download'}
                                </button>
                            ) : (
                                <div style={{
                                    padding: '0.5rem 1rem', borderRadius: '8px',
                                    background: 'rgba(239,68,68,0.1)', color: 'var(--danger)',
                                    fontSize: '0.85rem', fontWeight: 600
                                }}>
                                    Limit Reached
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem', marginTop: '1.5rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                    💡 Each digital product can be downloaded up to 5 times. Contact support if you need additional downloads.
                </p>
            </div>
        </div>
    );
}
