"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations("FAQ");

  const faqItems = [
    {
      question: t("questions.0.question"),
      answer: t("questions.0.answer"),
    },
    {
      question: t("questions.1.question"),
      answer: t("questions.1.answer"),
    },
    {
      question: t("questions.2.question"),
      answer: t("questions.2.answer"),
    },
    {
      question: t("questions.3.question"),
      answer: t("questions.3.answer"),
    },
    {
      question: t("questions.4.question"),
      answer: t("questions.4.answer"),
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="max-w-5xl mx-auto my-20 px-4">
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        {t("title")}
      </h2>
      <div className="space-y-6">
        {faqItems.map((item, i) => (
          <div
            key={i}
            className="border rounded-lg p-6 cursor-pointer bg-white shadow-lg"
            onClick={() => toggle(i)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl text-black font-semibold">{item.question}</h3>
              <span className="text-[#be123c] font-bold text-2xl select-none">
                {openIndex === i ? "−" : "+"}
              </span>
            </div>
            {openIndex === i && (
              <p className="mt-4 text-gray-700 leading-relaxed">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}