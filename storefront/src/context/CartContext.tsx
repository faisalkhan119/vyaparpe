'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    variant?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
    totalItems: number;
    subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem('vyaparpe_cart');
            if (stored) {
                setCartItems(JSON.parse(stored));
            }
        } catch {
            // ignore
        }
    }, []);

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('vyaparpe_cart', JSON.stringify(cartItems));
        } catch {
            // ignore
        }
    }, [cartItems]);

    const addToCart = useCallback((item: Omit<CartItem, 'id' | 'quantity'>) => {
        setCartItems(prev => {
            const existing = prev.find(ci => ci.productId === item.productId && ci.variant === item.variant);
            if (existing) {
                return prev.map(ci =>
                    ci.productId === item.productId && ci.variant === item.variant
                        ? { ...ci, quantity: ci.quantity + 1 }
                        : ci
                );
            }
            return [...prev, { ...item, id: `${item.productId}-${Date.now()}`, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setCartItems(prev => prev.filter(ci => ci.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, delta: number) => {
        setCartItems(prev =>
            prev.map(ci =>
                ci.id === id
                    ? { ...ci, quantity: Math.max(1, ci.quantity + delta) }
                    : ci
            )
        );
    }, []);

    const clearCart = useCallback(() => setCartItems([]), []);

    const totalItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
    const subtotal = cartItems.reduce((sum, ci) => sum + ci.price * ci.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}
