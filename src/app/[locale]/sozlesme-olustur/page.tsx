'use client';

import { ensureAnonymousUser } from "@/utils/parse/ensureAnonymousUser";
import { useEffect, useState, useRef } from 'react';
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from 'next/navigation';
import Parse from "@/utils/parse/Parse";



interface Field {
  label: string;
  name: string;
  type?: string;
}

interface ContractField {
  name: string;
  label: Record<string, string>;
  type?: string;
}

interface ContractTemplate {
  id: string;
  name: string;
  label: Record<string, string>;
  fields: ContractField[];
}

export default function SozlesmeOlusturPage() {
  const [selectedType, setSelectedType] = useState<string>('');
  const [formFields, setFormFields] = useState<Record<string, Field[]>>({});
  const [contractTemplates, setContractTemplates] = useState<ContractTemplate[]>([]);
  const [form, setForm] = useState<Record<string, string | number>>({});
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("SozlesmeOlusturPage");
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (!showForm) return;

    const fetchFields = async () => {
      setIsLoading(true);
      try {
        const query = new Parse.Query("ContractTemplate");
        const results = await query.find();

        const templates: ContractTemplate[] = results.map(template => {
          const id = template.id;
          if (!id) throw new Error("Template id is missing");

          const name = template.get("name");
          const label = template.get("label");
          const fields = template.get("fields");

          if (!Array.isArray(fields)) {
            throw new Error("Fields should be an array");
          }

          return {
            id,
            name,
            label,
            fields
          };
        });

        setContractTemplates(templates);

        const localizedFields: Record<string, Field[]> = {};

        templates.forEach(template => {
          localizedFields[template.name] = template.fields.map(field => ({
            name: field.name,
            label: field.label[locale] || field.label['en'] || field.name,
            type: field.type || 'text'
          }));
        });

        setFormFields(localizedFields);

      } catch (error) {
        console.error('Veri çekme hatası:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFields();
  }, [showForm, locale]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    setForm({});
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  // Buton clicklerinde anonim login kontrolü için yardımcı fonksiyon
  const handleAnonymousAndAction = async (action: () => void | Promise<void>) => {
    await ensureAnonymousUser();
    action();
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
                  <button
                    className="w-full rounded-md bg-[#fbbf24] hover:bg-[#f59e42] transition-colors duration-200 px-6 py-3 text-base font-bold text-white tracking-wide shadow-md"
                    onClick={async () => {
                      await ensureAnonymousUser();
                      setShowPopup(false);
                      router.push('/chat');
                    }}
                  >
                    🤖 {t('popup.chatbot-button')}
                  </button>

                  <button
                    className="w-full rounded-md bg-[#fb7185] hover:bg-[#f43f5e] transition-colors duration-200 px-6 py-3 text-base font-bold text-white tracking-wide shadow-md"
                    onClick={async () => {
                      await ensureAnonymousUser();
                      setShowPopup(false);
                      setShowForm(true);
                    }}
                  >
                    📝 {t('popup.form-button')}
                  </button>

                  <button
                    className="w-full rounded-md bg-[#38bdf8] hover:bg-[#0ea5e9] transition-colors duration-200 px-6 py-3 text-base font-bold text-white tracking-wide shadow-md"
                    onClick={async () => {
                      await ensureAnonymousUser();
                      setShowPopup(false);
                      alert(t('popup.speech-alert'));
                    }}
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
            </div>
          )}

          {showForm && (
            <>
              <label className="block mb-4 text-gray-700 font-semibold text-sm uppercase tracking-wide text-left">
                {t('form.contract-type-label')}
              </label>
              
              {isLoading ? (
                <div className="text-center py-4">Yükleniyor...</div>
              ) : (
                <>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-10 focus:outline-none focus:ring-2 focus:ring-[#fb7185] text-black bg-white"
                    value={selectedType}
                    onChange={handleChange}
                    disabled={isLoading}
                  >
                    <option value="">{t('form.select-contract-type')}</option>
                    {contractTemplates.map((template) => (
                      <option key={template.id} value={template.name}>
                        {template.label[locale] || template.label['en'] || template.name}
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
                            value={form[field.name]?.toString() || ''}
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
            </>
          )}
        </div>
      </section>
    </div>
  );
}
