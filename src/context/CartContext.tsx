import type { Product } from "../types/Product";
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type CartItem = Pick<Product, "id" | "image" | "name" | "price"> & {
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        const stored = localStorage.getItem('cart-items')
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
        localStorage.setItem('cart-items', JSON.stringify(items))
    }, [items])

    const addItem = (item: CartItem) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id)
            if (existing) {
                return prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                )
            } else {
                return [...prev, item ]
            }
        })
    }

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(i => i.id !== id))
    }

    return (
        <CartContext.Provider value={{ items, addItem, removeItem }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error("useCart must be used within a CartProvider")
    return ctx
}