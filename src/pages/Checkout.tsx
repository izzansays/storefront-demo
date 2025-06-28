import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "wouter";

export default function Checkout() {
    const { items, removeItem } = useCart();
    const [shipping, setShipping] = useState(1)

    const shippingOptions = [
        {
            id: 1,
            label: "Basic",
            value: 5
        },
        {
            id: 2,
            label: "Express",
            value: 10
        },
        {
            id: 3,
            label: "Next Day",
            value: 20
        }
    ]

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shippingValue = shippingOptions.find(opt => opt.id === shipping)?.value || 0
    const grandTotal = total + shippingValue

    return (
        <>
            <Link href="/">Continue shopping</Link>
            <h1 className="mt-4 text-4xl font-bold mb-2">Checkout</h1>
            <p className="text-gray-500 mb-8">Review your order</p>
            {items.length === 0 ?
                <p>Your cart is empty.</p>
                :
                <>
                    <p className="text-xl font-bold">Items</p>
                    <div className="divide-y-1 max-w-[600px] mb-8">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 border-gray-300 py-2">
                                <img src={item.image} style={{ width: 50, height: 50 }} />
                                <div className="flex flex-1 items-center gap-8">
                                    <div className="flex flex-col flex-1 md:flex-row">
                                        <span className="font-semibold flex-1">{item.name}</span>
                                        <div className="flex flex-col flex-1 md:flex-row justify-between">
                                            <span><span className="md:hidden">Quantity: </span><span className="hidden md:inline">x</span>{item.quantity}</span>
                                            <span>${item.price * item.quantity}</span>
                                        </div>
                                    </div>
                                    <span onClick={() => removeItem(item.id)} >Remove</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xl font-semibold mb-2">Shipping Method</p>
                    <div className="flex flex-col gap-2 md:flex-row md:gap-4 mb-8">
                        {shippingOptions.map(option => (
                            <div className="flex items-center border border-gray-200 rounded-sm lg:w-[150px]">
                                <label key={option.id} className="flex gap-4 w-full p-4 text-sm font-medium text-gray-900 hover:cursor-pointer">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value={option.id}
                                        checked={shipping === option.id}
                                        onChange={() => setShipping(option.id)}
                                    />
                                    <div className="mr-4">
                                        <p>{option.label}</p>
                                        <p>${option.value.toFixed(2)}</p>
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="w-[300px] mb-8">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">Total</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">Shipping</p>
                            <p>${shippingValue.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">Grand Total</p>
                            <p>${grandTotal.toFixed(2)}</p>
                        </div>
                    </div>
                    <button className="text-white bg-blue-500 hover:bg-blue-600 hover:cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5">Submit order</button>
                </>
            }
        </>
    )
}