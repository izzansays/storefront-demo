import { ShoppingCart } from "lucide-react"
import { Link, useRoute } from "wouter"
import { useCart } from "../context/CartContext"

export default function Nav() {
    const { items } = useCart();
    const [match] = useRoute("/checkout");

    return (
        <nav className="bg-black text-white mb-8">
            <div className="py-4 flex justify-between items-center container max-w-7xl">
                <Link href="/">
                    <h1 className="text-2xl font-bold">Storefront</h1>
                </Link>
                <div className="flex items-center gap-8">
                <Link href="/about">About</Link>
                {!match && <Link href="/checkout" className="relative">
                    <ShoppingCart />
                    {items.length > 0 && <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-2 -end-3">{items.length}</div>}
                </Link>}
                </div>
            </div>
        </nav >
    )
}