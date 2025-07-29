'use client';

import { useTranslations } from 'next-intl';

export default function DistanceSalesContractPage() {
  const t = useTranslations('DistanceContract');

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6 text-gray-800">
      <h1 className="text-3xl font-bold">{t('title')}</h1>

      <section>
        <h2 className="font-semibold">{t('section1Title')}</h2>
        <p>{t('section1Content')}</p>
      </section>

      <section>
        <h2 className="font-semibold">{t('section2Title')}</h2>
        <p>{t('section2Content')}</p>
      </section>

      <section>
        <h2 className="font-semibold">{t('section3Title')}</h2>
        <p>{t('section3Content')}</p>
      </section>

      <section>
        <h2 className="font-semibold">{t('section4Title')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t('section4Content1')}</li>
          <li>{t('section4Content2')}</li>
          <li>{t('section4Content3')}</li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold">{t('section5Title')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t('section5Content1')}</li>
          <li>{t('section5Content2')}</li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold">{t('section6Title')}</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>{t('section6Content1')}</li>
          <li>{t('section6Content2')}</li>
        </ul>
      </section>

      <section>
        <h2 className="font-semibold">{t('section7Title')}</h2>
        <p>{t('section7Content')}</p>
      </section>

      <section>
        <h2 className="font-semibold">{t('section8Title')}</h2>
        <p>{t('section8Content')}</p>
      </section>

      <section className="whitespace-pre-line border-t pt-6 text-sm text-gray-600">
        {t('footer')}
      </section>
    </div>
  );
}
