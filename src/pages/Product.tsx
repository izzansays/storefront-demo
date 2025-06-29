import { useEffect, useState } from "react";
import { Link, Redirect, useParams } from "wouter";
import type { Product } from "../types/Product";
import { useCart } from "../context/CartContext";
import { ArrowLeft } from "lucide-react";

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
            <Link href="/" className="inline-block"><div className="flex items-center gap-2"><ArrowLeft className="inline" size={16} />Back to All Products</div></Link>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2">
                <div className="lg:w-[500px] aspect-[1/1] bg-gray-100 flex items-center justify-center overflow-hidden mb-12">
                    <img src={data.image} className="w-full" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold mb-4">{data.name}</h1>
                    <p className="text-2xl font-semibold mb-8">${data.price}</p>
                    <p className="text-gray-500 mb-8">{data.description}</p>
                    <p className="text-lg font-semibold mb-2">Details</p>
                    <table className="mb-8">
                        <tbody>
                            <tr>
                                <td className="text-gray-500 pr-8">Dimensions (L x W x H)</td>
                                <td>{data.length}cm x {data.width}cm x {data.height}cm</td>
                            </tr>
                            <tr>
                                <td className="text-gray-500 pr-8">Weight</td>
                                <td>{data.weight}</td>
                            </tr>
                            <tr>
                                <td className="text-gray-500 pr-8">Colour</td>
                                <td className="capitalize">{data.colour}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="text-lg font-semibold mb-2">Quantity</p>
                    <div className="flex mb-8 items-center">
                        <button className="bg-gray-200 hover:bg-gray-300 hover:cursor-pointer rounded-lg px-3 py-1" onClick={() => setQuantity((quantity) => quantity !== 1 ? quantity - 1 : 1)}>-</button>
                        <span className="w-24 text-center">{quantity}</span>
                        <button className="bg-gray-200 hover:bg-gray-300 hover:cursor-pointer rounded-lg px-3 py-1" onClick={() => setQuantity((quantity) => quantity += 1)}>+</button>
                    </div>
                    <button onClick={() => addItem({
                        id: data.id,
                        image: data.image,
                        name: data.name,
                        price: data.price,
                        quantity: quantity
                    })} className="text-white bg-blue-500 hover:bg-blue-600 hover:cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5">Add to Cart</button>
                </div>
            </div>
        </>
    )
}