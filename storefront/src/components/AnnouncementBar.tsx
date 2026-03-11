'use client';

import { useState } from 'react';

export default function AnnouncementBar() {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    return (
        <div style={{
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)',
            color: 'white',
            textAlign: 'center',
            padding: '0.5rem 1rem',
            fontSize: '0.82rem',
            fontWeight: 500,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            zIndex: 1000,
        }}>
            <span>🎉</span>
            <span>Free shipping on orders above ₹50,000! Use code <strong>VYAPAR10</strong> for 10% off.</span>
            <button
                onClick={() => setDismissed(true)}
                style={{
                    position: 'absolute',
                    right: '0.75rem',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    padding: '0.2rem',
                    lineHeight: 1,
                }}
                aria-label="Dismiss"
            >
                ✕
            </button>
        </div>
    );
}
