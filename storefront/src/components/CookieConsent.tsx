'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function CookieConsent() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent-vyaparpe');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent-vyaparpe', 'accepted');
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookie-consent-vyaparpe', 'rejected');
        setIsVisible(false);
    };

    if (pathname === '/socials' || pathname === '/pitchdeck' || pathname === '/systemdiagram') return null;
    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '1.5rem',
            right: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            zIndex: 9999,
        }}>
            <div style={{ flex: '1 1 500px' }}>
                <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>🍪</span> We value your privacy
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
                </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button 
                    className="btn btn-outline" 
                    onClick={handleReject}
                    style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                >
                    Reject Essential
                </button>
                <button 
                    className="btn btn-primary" 
                    onClick={handleAccept}
                    style={{ fontSize: '0.85rem', padding: '0.5rem 1.5rem' }}
                >
                    Accept All
                </button>
            </div>
        </div>
    );
}
