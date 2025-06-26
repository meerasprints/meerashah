'use client';

import Link from 'next/link';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

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
      </div>

      <div className="flex items-center gap-4">
        <a href="https://instagram.com/yourhandle" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="mailto:meeraprints@email.com">
          <FaEnvelope />
        </a>
        <span className="text-sm">📞 (123) 456-7890</span>
      </div>
    </nav>
  );
}
