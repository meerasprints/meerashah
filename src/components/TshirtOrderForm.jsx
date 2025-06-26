'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function TshirtOrderForm() {
  const [form, setForm] = useState({
    side: 'Just Front',
    color: 'One Color',
    quantity: 1,
  });

  const [price, setPrice] = useState(11);
  const { addToCart } = useCart();

  useEffect(() => {
    const pricing = {
      'Just Front': {
        'One Color': 11,
        'Two Colors (Not Intertwined)': 12,
        'Multicolor': 13,
      },
      'Front and Back': {
        'One Color': 13,
        'Two Colors (Not Intertwined)': 13,
        'Multicolor': 15,
      },
      'Multicolor Front, One Color Back': 13.5,
      'Two Color Front, One Color Back': 12.5,
      'Multicolor Front, Two Color Back': 14,
    };

    let unit = 0;
    if (typeof pricing[form.side] === 'number') {
      unit = pricing[form.side];
    } else {
      unit = pricing[form.side]?.[form.color] || 0;
    }

    setPrice(unit * form.quantity);
  }, [form.side, form.color, form.quantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const safeValue = name === 'quantity' ? parseInt(value || 1, 10) : value;
    setForm((prev) => ({ ...prev, [name]: safeValue }));
  };

  const handleAddToCart = () => {
    const unit = price / form.quantity;

    if (!form.quantity || form.quantity < 1 || isNaN(unit)) {
      alert('Please enter a valid quantity.');
      return;
    }

    const item = {
      side: form.side,
      color: form.color,
      quantity: form.quantity,
      pricePerUnit: parseFloat(unit.toFixed(2)),
      total: parseFloat(price.toFixed(2)),
    };

    addToCart(item);
    alert('Added to cart!');
  };

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <label>
        Print Side:
        <select name="side" value={form.side} onChange={handleChange}>
          <option>Just Front</option>
          <option>Front and Back</option>
          <option>Multicolor Front, One Color Back</option>
          <option>Two Color Front, One Color Back</option>
          <option>Multicolor Front, Two Color Back</option>
        </select>
      </label>

      {(form.side === 'Just Front' || form.side === 'Front and Back') && (
        <label>
          Color Option:
          <select name="color" value={form.color} onChange={handleChange}>
            <option>One Color</option>
            <option>Two Colors (Not Intertwined)</option>
            <option>Multicolor</option>
          </select>
        </label>
      )}

      <label>
        Quantity:
        <input
          type="number"
          name="quantity"
          min="1"
          value={form.quantity}
          onChange={handleChange}
        />
      </label>

      <p className="text-lg font-semibold">Price: ${price.toFixed(2)}</p>

      <button
        onClick={handleAddToCart}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </div>
  );
}
