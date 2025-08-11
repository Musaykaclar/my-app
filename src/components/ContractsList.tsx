'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Parse from '@/utils/parse/Parse';
import { useLocale } from 'next-intl';
import { createContractPdf } from '@/utils/pdf/createContractPdf';

type Contract = {
  id: string;
  threadId: string;
  editedAt: string;
  version: number;
  originalContent: string;
  editedContent: string;
};

type ParseContract = {
  toJSON: () => {
    objectId: string;
    threadId: string;
    editedAt: string;
    version: number;
    originalContent: string;
    editedContent: string;
    [key: string]: unknown; // For any additional properties we might not know about
  };
};

type ModalType = 'preview' | 'deleteConfirm' | 'message' | null;

export default function ContractsList() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState({ contracts: true });

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalContent, setModalContent] = useState('');
  const [deleteContractId, setDeleteContractId] = useState<string | null>(null);
  
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const user = await Parse.User.currentAsync();
        if (!user) return router.push(`/${locale}/login`);

        const results = await Parse.Cloud.run('getUserContracts');
        const jsonResults = results.map((obj: ParseContract) => {
          const data = obj.toJSON();
          return {
            ...data,
            id: data.objectId,
          };
        });
        setContracts(jsonResults);
      } catch (error) {
        console.error("Sözleşmeler yüklenemedi:", error);
      } finally {
        setLoading(prev => ({ ...prev, contracts: false }));
      }
    };
    fetchContracts();
  }, [locale, router]);

  // Görüntüleme modalı aç
  const handleView = (contract: Contract) => {
    const contentToShow =
      contract.editedContent?.trim() ||
      contract.originalContent?.trim() ||
      "İçerik bulunamadı.";

    setModalContent(contentToShow);
    setModalType('preview');
    setShowModal(true);
  };

  const handleDownload = async (contract: Contract) => {
    const content = contract.editedContent?.trim() || contract.originalContent?.trim() || 'İçerik bulunamadı.';
    const fileName = `sozlesme_${contract.id}.pdf`;
    await createContractPdf(content, fileName);
  };

  // Silme modalını aç
  const confirmDelete = (contractId: string) => {
    setDeleteContractId(contractId);
    setModalType('deleteConfirm');
    setModalContent("Bu sözleşmeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.");
    setShowModal(true);
  };

  // Silme işlemi
  const handleDelete = async () => {
    if (!deleteContractId) return;

    try {
      await Parse.Cloud.run("deleteEditedContract", { id: deleteContractId });
      setContracts(prev => prev.filter(c => c.id !== deleteContractId));
      setModalType('message');
      setModalContent("Sözleşme başarıyla silindi.");
      setDeleteContractId(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Sözleşme silme hatası:", error);
        setModalType('message');
        setModalContent("Sözleşme silinirken bir hata oluştu: " + error.message);
      } else {
        console.error("Sözleşme silme hatası:", error);
        setModalType('message');
        setModalContent("Sözleşme silinirken bilinmeyen bir hata oluştu.");
      }
    }
  };

  // Modal kapat
  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setModalContent('');
    setDeleteContractId(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center">SÖZLEŞMELERİNİZ</h1>
      </div>

      {loading.contracts ? (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-2 border-[#fb7185] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Yükleniyor...</p>
        </div>
      ) : contracts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>Henüz sözleşmeniz bulunmamaktadır</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {contracts.map((contract, index) => (
            <div
              key={contract.id ?? `${contract.threadId}_${index}`}
              className={`flex items-center justify-between p-4 ${
                index !== contracts.length - 1 ? 'border-b border-gray-100' : ''
              } hover:bg-gray-50 transition-colors`}
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 mb-1">
                  {(contract.editedContent ?? contract.originalContent ?? 'Başlıksız Sözleşme')
                    .split('\n')[0]
                    .substring(0, 60)}
                  {(contract.editedContent ?? contract.originalContent ?? '').length > 60 && '...'}
                </h3>
                <p className="text-sm text-gray-500">
                  {contract.editedAt && !isNaN(new Date(contract.editedAt).getTime())
                    ? new Date(contract.editedAt).toLocaleDateString('tr-TR')
                    : 'Tarih bilgisi yok'}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleView(contract)}
                  className="px-4 py-2 bg-[#fb7185] hover:bg-rose-500 text-white text-sm rounded transition-colors"
                >
                  Görüntüle
                </button>
                <button
                  onClick={() => handleDownload(contract)}
                  className="px-4 py-2 bg-[#fb7185] hover:bg-rose-500 text-white text-sm rounded transition-colors"
                >
                  İndir
                </button>
                <button
                  onClick={() => confirmDelete(contract.id)}
                  className="px-4 py-2 bg-[#fb7185] hover:bg-rose-500 text-white text-sm rounded transition-colors"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white max-w-4xl w-full max-h-[85vh] rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#fb7185] to-rose-400 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {/* Icon değiştirilebilir modal tipine göre */}
                    {modalType === 'preview' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    )}
                    {modalType === 'deleteConfirm' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01M5.071 19h13.858a2 2 0 001.914-2.586l-3.429-9.429A2 2 0 0014.5 6H9.5a2 2 0 00-1.914 1.985l-3.429 9.429A2 2 0 005.071 19z"
                      />
                    )}
                    {modalType === 'message' && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                      />
                    )}
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">
                  {modalType === 'preview' && 'Sözleşme Önizleme'}
                  {modalType === 'deleteConfirm' && 'Silme Onayı'}
                  {modalType === 'message' && 'Bilgi'}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors duration-200"
                aria-label="Kapat"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
              {modalType === 'preview' && (
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <pre className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed font-mono">
                    {modalContent}
                  </pre>
                </div>
              )}

              {(modalType === 'deleteConfirm' || modalType === 'message') && (
                <p className="text-gray-800 text-base">{modalContent}</p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
              {modalType === 'preview' && (
                <>
                  <button
                    onClick={closeModal}
                    className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors duration-200"
                  >
                    Kapat
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(modalContent);
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#fb7185] to-rose-400 hover:from-[#f43f5e] hover:to-[#fb7185] text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    Kopyala
                  </button>
                </>
              )}

              {modalType === 'deleteConfirm' && (
                <>
                  <button
                    onClick={closeModal}
                    className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors duration-200"
                  >
                    İptal
                  </button>
                  <button
                    onClick={() => {
                      handleDelete();
                    }}
                    className="px-6 py-2.5 bg-[#fb7185] hover:bg-rose-500 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Sil
                  </button>
                </>
              )}

              {modalType === 'message' && (
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-[#fb7185] hover:bg-rose-500 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Tamam
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}