'use client';

import Link from 'next/link';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2>Meera’s Prints</h2>
      </div>
      <div className="nav-center">
        <Link href="/">Home</Link>
        <Link href="/fast-fashion">Fast Fashion</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/search">Search</Link>
      </div>
      <div className="nav-right">
        <a href="https://instagram.com/yourhandle" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="mailto:meeraprints@email.com">
          <FaEnvelope />
        </a>
        <span>📞 (123) 456-7890</span>
      </div>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: #f0f0f0;
        }
        .nav-center a {
          margin: 0 1rem;
        }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      `}</style>
    </nav>
  );
}
