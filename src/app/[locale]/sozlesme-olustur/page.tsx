'use client';
import { useEffect, useState, useRef } from 'react';
import { useTranslations } from "next-intl";
import { useRouter } from 'next/navigation'; // ✅ yönlendirme için
import ChatPage from '@/app/[locale]/chat/page';

interface Field {
  label: string;
  name: string;
  type?: string;
}

export default function SozlesmeOlusturPage() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [formFields, setFormFields] = useState<Record<string, Field[]>>({});
  const [form, setForm] = useState<Record<string, string | number>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("SozlesmeOlusturPage");
  const router = useRouter(); // ✅ yönlendirme için

  useEffect(() => {
    const fetchFields = async () => {
      const res = await fetch('/form-fields.json');
      const data = await res.json();
      setFormFields(data);
    };
    fetchFields();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    setForm({});
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full bg-[#fdf2f8]">
      <section className="relative flex flex-col justify-center items-center py-20 px-6 max-w-7xl mx-auto gap-12 min-h-[70vh] text-center">
        <div className="w-full max-w-5xl mx-auto mt-10 p-10 bg-white rounded-2xl shadow-2xl border border-gray-200 z-10">
          <h1 className="text-4xl font-extrabold text-center text-[#fb7185] tracking-tight mb-10">
            {t('title')}
          </h1>

          {!showForm && (
            <button
              className="w-full rounded-md bg-[#fb7185] hover:bg-[#f43f5e] transition-colors duration-200 px-6 py-4 text-base font-bold text-white tracking-wide shadow-md mb-10"
              onClick={() => setShowPopup(true)}
            >
              {t('button-name')}
            </button>
          )}

          {showPopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div ref={popupRef} className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 max-w-md w-full flex flex-col items-center animate-fadeIn">
                <h2 className="text-2xl font-bold text-[#fb7185] mb-6">{t('popup.title')}</h2>
                <div className="flex flex-col gap-4 w-full">
                  
                  {/* ✅ Chatbot butonu yönlendirmeli */}
                  <button
                    className="w-full rounded-md bg-[#fbbf24] hover:bg-[#f59e42] transition-colors duration-200 px-6 py-3 text-base font-bold text-white tracking-wide shadow-md"
                    onClick={() => {
                      setShowPopup(false);
                      router.push('/chat');
                    }}
                  >
                    🤖 {t('popup.chatbot-button')}
                  </button>

                  <button
                    className="w-full rounded-md bg-[#fb7185] hover:bg-[#f43f5e] transition-colors duration-200 px-6 py-3 text-base font-bold text-white tracking-wide shadow-md"
                    onClick={() => { setShowPopup(false); setShowForm(true); }}
                  >
                    📝 {t('popup.form-button')}
                  </button>

                  <button
                    className="w-full rounded-md bg-[#38bdf8] hover:bg-[#0ea5e9] transition-colors duration-200 px-6 py-3 text-base font-bold text-white tracking-wide shadow-md"
                    onClick={() => { setShowPopup(false); alert(t('popup.speech-alert')); }}
                  >
                    🎤 {t('popup.speech-button')}
                  </button>
                </div>
                <button
                  className="mt-6 text-gray-500 hover:text-[#fb7185] text-sm underline"
                  onClick={() => setShowPopup(false)}
                >
                  {t('popup.close')}
                </button>
              </div>
              <style jsx>{`
                .animate-fadeIn {
                  animation: fadeIn 0.2s ease;
                }
                @keyframes fadeIn {
                  from { opacity: 0; transform: scale(0.95); }
                  to { opacity: 1; transform: scale(1); }
                }
              `}</style>
            </div>
          )}

          {showForm && (
            <>
              <label className="block mb-4 text-gray-700 font-semibold text-sm uppercase tracking-wide text-left">
                {t('form.contract-type-label')}
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-10 focus:outline-none focus:ring-2 focus:ring-[#fb7185] text-black bg-white"
                value={selectedType}
                onChange={handleChange}
              >
                <option value="">{t('form.select-contract-type')}</option>
                {Object.keys(formFields).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {selectedType && (
                <form
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(t('form.success-message'));
                  }}
                >
                  {formFields[selectedType]?.map((field) => (
                    <div key={field.name} className="text-left">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type || 'text'}
                        name={field.name}
                        value={form[field.name] || ''}
                        onChange={handleInput}
                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fb7185] shadow-sm"
                      />
                    </div>
                  ))}

                  <div className="col-span-full text-left">
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      {t('form.additional-details')}
                    </label>
                    <textarea
                      name="details"
                      rows={5}
                      className="w-full text-black border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fb7185] shadow-sm"
                      placeholder={t('form.details-placeholder')}
                      value={form.details || ''}
                      onChange={handleInput}
                    />
                  </div>

                  <div className="col-span-full flex gap-4">
                    <button
                      type="submit"
                      className="mt-4 w-full rounded-md bg-[#fb7185] hover:bg-[#f43f5e] transition-colors duration-200 px-6 py-4 text-base font-bold text-white tracking-wide shadow-md"
                    >
                      {t('form.create-button')}
                    </button>
                    <button
                      type="button"
                      className="mt-4 w-full rounded-md bg-gray-200 hover:bg-gray-300 transition-colors duration-200 px-6 py-4 text-base font-bold text-gray-700 tracking-wide shadow-md"
                      onClick={() => setShowForm(false)}
                    >
                      {t('form.back-button')}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
