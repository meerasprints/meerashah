'use client';

import { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  const handleQuantityChange = (index, amount) => {
    const newQuantity = cartItems[index].quantity + amount;
    if (newQuantity >= 1) {
      updateQuantity(index, newQuantity);
    }
  };

  const validateInputs = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) newErrors.email = 'Please enter a valid email.';
    if (!phoneRegex.test(phone)) newErrors.phone = 'Phone must be 10 digits.';
    if (!address.trim()) newErrors.address = 'Address cannot be empty.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async () => {
    if (!validateInputs()) return;

    const itemsWithContact = cartItems.map(item => ({
      ...item,
      email,
      phone,
      address,
    }));

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: itemsWithContact }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to create checkout session.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Checkout error occurred.');
    }
  };

  const totalCost = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div key={index} className="border p-4 rounded shadow-sm bg-gray-50">
              <p><strong>Print Side:</strong> {item.side}</p>
              {item.color && <p><strong>Color Option:</strong> {item.color}</p>}
              <div className="flex items-center gap-2 mt-2">
                <strong>Quantity:</strong>
                <button onClick={() => handleQuantityChange(index, -1)} className="px-2 bg-gray-300 rounded">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(index, 1)} className="px-2 bg-gray-300 rounded">+</button>
              </div>
              <p className="mt-2"><strong>Item Total:</strong> ${item.total.toFixed(2)}</p>
              <button
                className="mt-2 text-red-600 text-sm underline"
                onClick={() => removeFromCart(index)}
              >
                Remove Item
              </button>
            </div>
          ))}

          <div className="flex flex-col gap-4 mt-6">
            <label>
              Email:
              <input
                type="email"
                className="border border-gray-300 px-2 py-1 rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </label>

            <label>
              Phone Number:
              <input
                type="tel"
                className="border border-gray-300 px-2 py-1 rounded w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </label>

            <label>
              Shipping Address:
              <textarea
                rows={3}
                className="border border-gray-300 px-2 py-1 rounded w-full"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </label>
          </div>

          <div className="text-right mt-4 text-lg font-semibold">
            Total: ${totalCost.toFixed(2)}
          </div>

          <button
            className="mt-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
