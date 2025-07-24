'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import Image from 'next/image';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const t = useTranslations('Navbar');

  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (locale: string) => {
    router.replace(pathname, { locale });
    setLangOpen(false);
    setMenuOpen(false); // mobildeyse menüyü kapat
  };

  const locales = [
    { code: 'tr', label: 'Türkçe' },
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'pt', label: 'Português' },
    { code: 'ru', label: 'Русский' },
    { code: 'fr', label: 'Français' },
    { code: 'it', label: 'Italiano' },
    { code: 'es', label: 'Español' },
  ];

  return (
    <header className="w-full bg-[#fb7185]">
      <div className="w-full bg-[#fb7185] flex justify-center items-center py-4 px-2">
        <nav
          className="w-full max-w-6xl mx-auto flex justify-between items-center bg-gray-100 rounded-full px-6 py-2 shadow-md relative"
          style={{ marginTop: 16 }}
        >
          <div className="text-xl font-bold drop-shadow-[3px_5px_2px_#be123c]">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/images/sozlesme-ai-logo.png"
                alt="SozlesmeAI Logo"
                width={128}
                height={64}
                className="object-contain"
                priority={true}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 font-semibold text-gray-700">
            <li>
              <Link href="/sozlesme-olustur" className="hover:text-[#be123c]">
                {t('create')}
              </Link>
            </li>
            <li>
              <Link href="/sozlesme" className="hover:text-[#be123c]">
                {t('myContracts')}
              </Link>
            </li>
            <li>
              <Link href="#faq" className="hover:text-[#be123c] cursor-pointer">
                {t('faq')}
              </Link>
            </li>
            <li>
              <Link href="#popular-contracts" className="hover:text-[#be123c] cursor-pointer">
                {t('popular')}
              </Link>
            </li>
          </ul>

          {/* Desktop Language Dropdown */}
          <div className="hidden md:block relative ml-4">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="text-sm font-semibold hover:text-[#be123c] px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm"
              aria-haspopup="true"
              aria-expanded={langOpen}
            >
              🌐 Dil Seç
            </button>

            {langOpen && (
              <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-50">
                {locales.map(({ code, label }) => (
                  <li key={code}>
                    <button
                      onClick={() => changeLocale(code)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-[#fda4af]"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-gray-100 rounded-b-md shadow-md px-5 py-2 space-y-3 font-semibold text-gray-700">
          <li>
            <Link href="/sozlesme-olustur" onClick={() => setMenuOpen(false)}>
              {t('create')}
            </Link>
          </li>
          <li>
            <Link href="/sozlesme" onClick={() => setMenuOpen(false)}>
              {t('myContracts')}
            </Link>
          </li>
          <li>
            <Link href="#faq" onClick={() => setMenuOpen(false)} className="cursor-pointer">
              {t('faq')}
            </Link>
          </li>
          <li>
            <Link href="#popular-contracts" onClick={() => setMenuOpen(false)} className="cursor-pointer">
              {t('popular')}
            </Link>
          </li>

          {/* Mobile Language Selector */}
          <li>
            <div className="border-t border-gray-300 pt-2">
              <span className="block mb-1 font-semibold">🌐 Dil Seç</span>
              {locales.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => changeLocale(code)}
                  className="block w-full text-left px-3 py-1 rounded hover:bg-[#fda4af]"
                >
                  {label}
                </button>
              ))}
            </div>
          </li>
        </ul>
      )}
    </header>
  );
}
