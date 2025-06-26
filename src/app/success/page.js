// pages/success.js
'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto mt-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg">Your order has been placed successfully. A confirmation email has been sent.</p>
      <button
        onClick={() => router.push('/')}
        className="mt-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
      >
        Return to Home
      </button>
    </div>
  );
}
