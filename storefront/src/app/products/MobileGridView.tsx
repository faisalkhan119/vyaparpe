'use client';
import { useState, useEffect } from 'react';

export default function MobileGridView() {
    const [cols, setCols] = useState(2); // default to 2 columns on mobile
    
    useEffect(() => {
        const wrapper = document.getElementById('plp-wrapper');
        if (wrapper) {
            if (cols === 1) {
                wrapper.classList.remove('grid-2-cols');
                wrapper.classList.add('grid-1-col');
            } else {
                wrapper.classList.remove('grid-1-col');
                wrapper.classList.add('grid-2-cols');
            }
        }
    }, [cols]);

    return (
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-card)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)', height: '100%' }} className="mobileGridToggle">
            <button 
                onClick={() => setCols(1)} 
                style={{ padding: '0.3rem 0.5rem', border: 'none', background: cols === 1 ? 'var(--bg-dark)' : 'transparent', borderRadius: '6px', cursor: 'pointer', opacity: cols === 1 ? 1 : 0.5, color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}
                aria-label="1 Column View"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v4H4zm0 8h16v4H4z"/></svg>
            </button>
            <button 
                onClick={() => setCols(2)} 
                style={{ padding: '0.3rem 0.5rem', border: 'none', background: cols === 2 ? 'var(--bg-dark)' : 'transparent', borderRadius: '6px', cursor: 'pointer', opacity: cols === 2 ? 1 : 0.5, color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}
                aria-label="2 Columns View"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h7v4H4zm9 0h7v4h-7zm-9 8h7v4H4zm9 0h7v4h-7z"/></svg>
            </button>
        </div>
    );
}
