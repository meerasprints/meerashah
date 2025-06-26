'use client';

import Link from 'next/link';
import { FaInstagram, FaEnvelope, FaShoppingCart } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <div className="text-xl font-bold">Meera's Prints</div>

      <div className="flex gap-4 text-sm">
        <Link href="/">Home</Link>
        <Link href="/fast-fashion">Fast Fashion</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/search">Search</Link>
        <Link href="/cart" className="flex items-center gap-1">
          <FaShoppingCart />
          Cart
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <a href="https://www.instagram.com/meerasprints/" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="mailto:meeras.printsbr@gmail.com">
          <FaEnvelope />
        </a>
        <span className="text-sm">📞 (908) 531-1418</span>
      </div>
    </nav>
  );
}
