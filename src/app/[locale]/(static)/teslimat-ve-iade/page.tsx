'use client';

import { useTranslations } from 'next-intl';

export default function DeliveryAndReturn() {
  const t = useTranslations('DeliveryAndReturn');

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6 text-gray-800">
      <h1 className="text-3xl font-bold">{t('dar-title')}</h1>

      <ul className="list-decimal pl-6 space-y-4 text-lg leading-relaxed">
        <li>{t('item1')}</li>
        <li>{t('item2')}</li>
        <li>{t('item3')}</li>
        <li>{t('item4')}</li>
        <li>{t('item5')}</li>
      </ul>
    </div>
  );
}
