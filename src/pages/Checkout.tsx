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
            <h1>Checkout</h1>
            <p>Review your order.</p>
            {items.length === 0 ?
                <p>Your cart is empty</p>
                :
                <>
                    <p>Items</p>
                    {items.map((item) => (
                        <div key={item.id}>
                            <img src={item.image} style={{ width: 50, height: 50 }} />
                            <span>{item.name}</span>
                            <span>{item.quantity}</span>
                            <span>{item.price}</span>
                            <span onClick={() => removeItem(item.id)} >Remove</span>
                        </div>
                    ))}
                    <p>Shipping Method</p>
                    <div>
                        {shippingOptions.map(option => (
                            <label key={option.id}>
                                <input
                                    type="radio"
                                    name="shipping"
                                    value={option.id}
                                    checked={shipping === option.id}
                                    onChange={() => setShipping(option.id)}
                                />
                                {option.label} (${option.value})
                            </label>
                        ))}
                    </div>
                    <div>
                        <div>Total: ${total.toFixed(2)}</div>
                        <div>Shipping: ${shippingValue.toFixed(2)}</div>
                        <div><strong>Grand Total: ${grandTotal.toFixed(2)}</strong></div>
                    </div>
                </>
            }
        </>
    )
}