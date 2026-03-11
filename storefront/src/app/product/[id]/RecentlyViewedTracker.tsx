'use client';
import { useEffect } from 'react';
import { trackProductView } from '@/components/RecentlyViewed';

export default function RecentlyViewedTracker({ productId }: { productId: string }) {
    useEffect(() => {
        trackProductView(productId);
    }, [productId]);
    
    return null;
}
