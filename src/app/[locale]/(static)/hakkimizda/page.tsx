'use client';
import {useTranslations} from 'next-intl';


export default function About() {
  const t = useTranslations('About');

  return (
    <section style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('about-title')}</h1>
      <p className="mt-6 whitespace-pre-line text-xl leading-8 text-gray-700">{t('about-description')}</p>
    </section>
  );
}