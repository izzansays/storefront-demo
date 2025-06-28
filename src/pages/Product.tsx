import { useEffect, useState } from "react";
import { Link, Redirect, useParams } from "wouter";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";

export default function Product() {
    const { id } = useParams();
    if (!id) return <Redirect to={"/"} />

    const [data, setData] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchProduct() {
            setLoading(true)
            setError(null)
            try {
                const res = await fetch(`/product/${id}`)
                if (!res.ok) throw new Error('Failed to fetch products')
                const json = await res.json()
                setData(json)
            } catch (err: any) {
                setError(err.message || 'Unknown error')
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [])

    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!data) return null;

    return (
        <>
            <Link href="/">Back to All Products</Link>
            <img src={data.image} />
            <h1>{data.name}</h1>
            <p>{data.price}</p>
            <p>{data.description}</p>
            <p>Details</p>
            <table>
                <tbody>
                    <tr>
                        <td>Dimensions</td>
                        <td>{data.length} x {data.width} x {data.height}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>{data.weight}</td>
                    </tr>
                    <tr>
                        <td>Colour</td>
                        <td>{data.colour}</td>
                    </tr>
                </tbody>
            </table>
            <p>Quantity</p>
            <div>
                <button onClick={() => setQuantity((quantity) => quantity !== 1 ? quantity - 1 : 1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((quantity) => quantity += 1)}>+</button>
            </div>
            <button onClick={() => addItem({
                id: data.id,
                image: data.image,
                name: data.name,
                price: data.price,
                quantity: quantity
            })}>Add to cart</button>
        </>
    )
}