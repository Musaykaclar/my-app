'use client'
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#fb7185]">
      <div className="w-full bg-[#fb7185] flex justify-center items-center py-4 px-2">
        <nav className="w-full max-w-6xl mx-auto flex justify-between items-center bg-gray-100 rounded-full px-6 py-2 shadow-md relative" style={{ marginTop: 16 }}>
          <div className="text-xl font-bold drop-shadow-[3px_5px_2px_#be123c]">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <img src="/images/sozlesme-ai-logo.png" alt="SozlesmeAI Logo" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 font-semibold text-gray-700">
            <li><Link href="/sozlesme-olustur" className="hover:text-[#be123c]">Sözleşme Oluştur</Link></li>
            <li><Link href="/sozlesme" className="hover:text-[#be123c]">Sözleşmelerim</Link></li>
            <li><a href="#faq" className="hover:text-[#be123c] cursor-pointer">Sıkça Sorulan Sorular</a></li>
            <li><a href="#popular-contracts" className="hover:text-[#be123c] cursor-pointer">Popüler Sözleşmeler</a></li>
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-gray-100 rounded-b-md shadow-md px-5 py-2 space-y-3 font-semibold text-gray-700">
          <li><Link href="/sozlesme-olustur" onClick={() => setMenuOpen(false)}>Sözleşme Oluştur</Link></li>
          <li><Link href="/sozlesme" onClick={() => setMenuOpen(false)}>Sözleşmelerim</Link></li>
          <li><a href="#faq" onClick={() => setMenuOpen(false)} className="cursor-pointer">Sıkça Sorulan Sorular</a></li>
          <li><a href="#popular-contracts" onClick={() => setMenuOpen(false)} className="cursor-pointer">Popüler Sözleşmeler</a></li>
        </ul>
      )}
    </header>
  );
}
