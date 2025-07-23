"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function StepsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const t = useTranslations("Steps");

  const steps = [
    {
      title: t("steps.0.title"),
      description: t("steps.0.description"),
    },
    {
      title: t("steps.1.title"),
      description: t("steps.1.description"),
    },
    {
      title: t("steps.2.title"),
      description: t("steps.2.description"),
    },
    {
      title: t("steps.3.title"),
      description: t("steps.3.description"),
    },
  ];

  return (
    <section className="relative py-12 bg-[#fb7185] rounded-3xl w-full">
      <div className="absolute inset-0 w-full h-full bg-[#fb7185]/20 rounded-3xl -z-10" />
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        {t("title")}
      </h2>

      <div className="px-4">
        {/* Desktop */}
        <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-6 w-full px-4">
          {steps.map(({ title, description }, idx) => (
            <article
              key={idx}
              className="flex flex-col justify-between border-4 border-white bg-white p-6 shadow-[8px_8px_0_0_#be123c] transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-[12px_12px_0_0_#be123c] cursor-pointer rounded-lg"
            >
              <h3 className="flex items-center gap-4 mt-3 text-2xl font-black leading-6 text-[#fb7185] hover:text-[#be123c] transition-colors duration-300">
                <span className="bg-[#fb7185] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                  {idx + 1}
                </span>
                {title}
              </h3>
              <p className="text-md mt-4 leading-6 text-gray-800 border-l-4 border-[#fb7185] pl-4">
                {description}
              </p>
            </article>
          ))}
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden w-full px-2">
          {steps.map(({ title, description }, idx) => (
            <div key={idx} className="mb-4 border rounded-lg overflow-hidden border-white">
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full text-left p-4 bg-white text-[#fb7185] font-semibold focus:outline-none flex items-center hover:bg-gray-100 transition-colors duration-300"
              >
                <span className="bg-[#fb7185] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg mr-4">
                  {idx + 1}
                </span>
                {title}
                <span className="ml-auto text-2xl">{activeIndex === idx ? "−" : "+"}</span>
              </button>
              {activeIndex === idx && (
                <div className="p-4 bg-gray-50 text-gray-700 border-l-4 border-[#fb7185]">
                  {description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
