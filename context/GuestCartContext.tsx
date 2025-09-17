'use client';

import {createContext, useContext, useState, useEffect, ReactNode} from "react";
import {ProductCartItem, ProductType} from "@/types";

interface GuestCartContextType {
    items: ProductCartItem[];
    addItem: (product: ProductType, quantity?: number) => void;
    updateItem: (productId: string, quantity: number) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
}

const GuestCartContext = createContext<GuestCartContextType | undefined>(undefined);

export function GuestCartProvider({children}: { children: ReactNode }) {
    const [items, setItems] = useState<ProductCartItem[]>([]);

    // Get items
    useEffect(() => {
        const stored = localStorage.getItem("guestCart");
        if (stored) setItems(JSON.parse(stored));
    }, []);

    // Set items
    useEffect(() => {
        localStorage.setItem("guestCart", JSON.stringify(items));
    }, [items]);

    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === "guestCart" && e.newValue) {
                setItems(JSON.parse(e.newValue));
            }
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const addItem = (product: ProductType, quantity = 1) => {
        setItems(prev => {
            const existing = prev.find(i => i.product._id === product._id);
            if (existing) {
                return prev.map(i =>
                    i.product._id === product._id ? {...i, quantity: i.quantity + quantity} : i
                );
            }
            return [...prev, {product, quantity}];
        });
    };

    const updateItem = (productId: string, quantity: number) => {
        setItems(prev => prev.map(i => (i.product._id === productId ? {...i, quantity} : i)));
    };

    const removeItem = (productId: string) => {
        setItems(prev => prev.filter(i => i.product._id !== productId));
    };

    const clearCart = () => setItems([]);

    return (
        <GuestCartContext.Provider value={{items, addItem, updateItem, removeItem, clearCart}}>
            {children}
        </GuestCartContext.Provider>
    );
}

export function useGuestCart() {
    const context = useContext(GuestCartContext);
    if (!context) throw new Error("useGuestCart must be used within GuestCartProvider");
    return context;
}
