"use client";

import FAQSection from '../components/FAQSections';
import PopularContracts from '../components/PopularContracts';
import StepsSections from '../components/StepsSections';

import "./globals.css";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen bg-[#fdf2f8] px-4">
        {/* Hero bölümü */}
        <section className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12 py-16 mx-auto">
          {/* Sol sütun: Metin ve buton */}
          <div className="flex-1 text-center">
                  <h1 className="relative inline-block text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4 leading-tight text-center">
          Pratik ve Hızlı{" "}
          <span className="relative text-[#fb7185] inline-block">
            Sözleşme
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute left-0 top-2/3 h-[0.58em] w-full fill-[#fda4af]/80"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
          </span>
          <br />
          Hemen Seç, Kolayca Doldur,
          <br />
          Anında İndir...
        </h1>

            <p className="text-gray-700 text-base md:text-lg mb-8 max-w-xl mx-auto">
              Sözleşmelerinizi otomatik olarak oluşturan yapay zeka destekli platformumuz,
              Türkiye Cumhuriyeti sınırlarında resmi sözleşmelerinizi kolayca hazırlamanızı sağlar.
            </p>
            <div className="text-center">
              <a
                href="/sozlesme-olustur"
                className="inline-block rounded-md bg-[#fb7185] hover:bg-[#f43f5e] transition-colors duration-200 px-8 py-4 text-lg font-bold text-white tracking-wide shadow-md"
              >
                Sözleşme Oluştur
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center relative w-full max-w-md">
  {/* Yeni efekt arka planlar */}
  <div className="absolute rotate-[135deg] z-10 rounded-[44px] w-[359.21px] h-[343.29px] top-[110px] -right-5 bg-gradient-to-br from-[#59d5ff] via-[#8dfce8] to-[#b1fcb4]" />
  <div className="absolute rotate-[135deg] z-10 rounded-[24px] w-[126.65px] h-[121.04px] top-[225px] -left-4 blur-[12px] bg-gradient-to-br from-[#59d5ff] via-[#8dfce8] to-[#b1fcb4]" />

  {/* DÜZENLENMİŞ efekt - site rengine uygun ve daha yukarı */}
  <div className="absolute top-[80px] right-2 w-36 h-36 bg-gradient-to-tr from-[#fb7185] to-[#fda4af] rounded-2xl blur-xl opacity-70 -z-10" />

  {/* İçerik kutusu */}
  <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md z-20">
    <h2 className="text-xl font-bold text-center mb-4 tracking-widest">SÖZLEŞME</h2>
    <div className="h-2 w-16 bg-[#fb7185] rounded-full mx-auto mb-4" />
    <div className="text-gray-400 text-sm mb-2">1. MADDE</div>
    <div className="h-3 bg-gray-100 rounded mb-2" />
    <div className="h-3 bg-gray-100 rounded mb-2 w-2/3" />
    <div className="text-gray-400 text-sm mb-2 mt-4">2. MADDE</div>
    <div className="h-3 bg-gray-100 rounded mb-2" />
    <div className="h-3 bg-gray-100 rounded mb-2 w-1/2" />
    <div className="mt-6 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="font-signature text-lg">Hasan Yılmaz</span>
        <span className="text-xs text-gray-500">11 Ağustos 2022</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-signature text-lg">Ayşe Demir</span>
        <span className="text-xs text-gray-500">11 Ağustos 2022</span>
      </div>
      <div className="mt-2 bg-yellow-100 border border-yellow-300 rounded px-3 py-2 flex items-center gap-2">
        <span className="text-gray-600 text-xs">By:</span>
        <span className="italic text-gray-700 text-xs">Click to sign...</span>
      </div>
    </div>
  </div>
</div>


        </section>

        {/* Alt alta bölümler */}
        <section className="max-w-6xl mx-auto px-6 space-y-16 pb-16">
          <StepsSections />
          <PopularContracts />
          <FAQSection />
          
          
        </section>
      </main>
    </>
  );
}
