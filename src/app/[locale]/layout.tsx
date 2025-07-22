import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

const locales = ["en", "tr", "de", "fr", "es", "it", "pt", "ru"];

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!locales.includes(locale)) notFound();

  // Çeviri mesajlarını dinamik import et (locale'ye göre)
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        {/* NextIntlClientProvider tüm çocukları sarmalar */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
