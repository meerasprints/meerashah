'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import TshirtOrderForm from '../../components/TshirtOrderForm';

const stripePromise = loadStripe('pk_test_...'); // Your real key

export default function Shop() {
  const [orderData, setOrderData] = useState({
    quantity: 1,
    side: 'front',
    color: 'one',
  });

  async function handleCheckout() {
    const stripe = await stripePromise;
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Order a Custom T-Shirt</h1>
      <TshirtOrderForm onUpdate={setOrderData} />
    </div>
  );
}
