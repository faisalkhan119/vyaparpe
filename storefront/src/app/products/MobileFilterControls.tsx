'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname, useSearchParams } from 'next/navigation';

export function MobileFilterBtn() {
    return (
        <button 
            className="btn btn-outline mobileFilterBtn" 
            onClick={() => document.body.classList.add('show-mobile-filters')}
            style={{ padding: '0.4rem 0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            Filter
        </button>
    );
}

export function MobileFilterHeader({ onClear, hasFilters }: { onClear: () => void, hasFilters: boolean }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const closeMenu = () => {
        document.body.classList.remove('show-mobile-filters');
    };

    return (
        <div className="mobileFilterHeaderWrapper">
            {mounted && createPortal(
                <div className="mobileFilterBackdrop" onClick={closeMenu}></div>,
                document.body
            )}
            <div className="mobileFilterHeader">
               <div className="mobileFilterHeaderLeft">
                   <button 
                       className="mobileFilterBackBtn"
                       onClick={() => document.body.classList.remove('show-mobile-filters')}
                   >
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                   </button>
                   <h2 className="mobileFilterTitle">Filters</h2>
               </div>
               {hasFilters && (
                   <button 
                       className="mobileFilterClearBtn"
                       onClick={onClear} 
                   >
                       Clear Filters
                   </button>
               )}
            </div>
        </div>
    );
}

export function MobileFilterFooter({ resultCount, onApply, hasFilters }: { resultCount: number, onApply: () => void, hasFilters: boolean }) {
    return (
        <div className="mobileFilterFooter">
           <div className="mobileFilterFooterInner" style={{ justifyContent: hasFilters ? 'space-between' : 'flex-end' }}>
               {hasFilters && (
                   <div className="mobileFilterCountContainer">
                       <span className="mobileFilterCountDisplay">{resultCount}</span>
                       <span className="mobileFilterCountDesc">products found</span>
                   </div>
               )}
               <button 
                   className="btn mobileFilterApplyBtn" 
                   style={{ width: hasFilters ? 'auto' : '100%' }}
                   onClick={() => {
                       onApply();
                       document.body.classList.remove('show-mobile-filters');
                   }}
               >
                   Apply
               </button>
           </div>
        </div>
    );
}
