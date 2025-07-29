'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Communication() {
  const t = useTranslations('Communication');

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6 text-gray-800">
      <h1 className="text-3xl font-bold">{t('communication-title')}</h1>

      <p className="text-lg leading-relaxed whitespace-pre-line">
        {t('communication-description')}
        {'\n'}
        <strong>{t('eposta')}</strong>
        <Link
          href="mailto:info@demarkelabs.com"
          className="text-blue-600 hover:underline ml-1"
        >
          info@demarkelabs.com
        </Link>
      </p>
    </div>
  );
}
