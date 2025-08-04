'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Parse from '@/utils/parse/Parse';
import { useLocale } from 'next-intl';

type Contract = {
  id: string;
  threadId: string;
  editedAt: Date;
  version: number;
  originalContent: string;
  editedContent: string;
};

export default function ContractsList() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [versions, setVersions] = useState<Contract[]>([]);
  const [loading, setLoading] = useState({
    contracts: true,
    versions: false
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const router = useRouter();
  const locale = useLocale();

  // Kullanıcının sözleşmelerini getir
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const user = await Parse.User.currentAsync();
        if (!user) return router.push(`/${locale}/login`);

        const results = await Parse.Cloud.run('getUserContracts');
        setContracts(results);
      } catch (error) {
        console.error("Sözleşmeler yüklenemedi:", error);
      } finally {
        setLoading(prev => ({ ...prev, contracts: false }));
      }
    };
    fetchContracts();
  }, [locale, router]);

  // Versiyonları getir
  const fetchVersions = async (threadId: string) => {
    setLoading(prev => ({ ...prev, versions: true }));
    try {
      const results = await Parse.Cloud.run('getContractVersions', { threadId });
      setVersions(results);
      setSelectedThread(threadId);
    } catch (error) {
      console.error("Versiyonlar yüklenemedi:", error);
    } finally {
      setLoading(prev => ({ ...prev, versions: false }));
    }
  };

  // Görüntüle butonu tıklaması
  const handleView = (contract: Contract) => {
    const contentToShow = contract.editedContent ?? contract.originalContent ?? '';
    setModalContent(contentToShow);
    setShowModal(true);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Sözleşme Listesi */}
      {loading.contracts ? (
        <div className="text-center py-8">Yükleniyor...</div>
      ) : contracts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Henüz sözleşmeniz bulunmamaktadır
        </div>
      ) : (
        <div className="grid gap-4">
          {contracts.map(contract => (
            <div 
              key={contract.id}
              className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium truncate max-w-md">
                    {(contract.editedContent ?? contract.originalContent ?? '').substring(0, 60)}...
                  </h3>
                  <div className="flex gap-2 text-xs text-gray-500 mt-1">
                    <span>v{contract.version}</span>
                    <span>•</span>
                    <span>
                      {new Date(contract.editedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(contract)}
                    className="px-3 py-1 bg-gray-100 rounded text-sm"
                  >
                    Görüntüle
                  </button>
                  <button
                    onClick={() => router.push(`/${locale}/chat-sozlesme?threadId=${contract.threadId}`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    Düzenle
                  </button>
                </div>
              </div>

              {/* Versiyonlar */}
              {selectedThread === contract.threadId && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium text-sm mb-2">Düzenleme Geçmişi:</h4>
                  {loading.versions ? (
                    <div className="text-center py-2">Yükleniyor...</div>
                  ) : versions.length > 0 ? (
                    <div className="space-y-3">
                      {versions.map(version => (
                        <div key={version.id} className="text-sm p-2 bg-gray-50 rounded">
                          <div className="flex justify-between">
                            <span className="font-medium">v{version.version}</span>
                            <span className="text-gray-500 text-xs">
                              {new Date(version.editedAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-gray-600">
                            {version.editedContent.substring(0, 100)}...
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Geçmiş bulunamadı</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-3xl max-h-[80vh] overflow-y-auto p-6 rounded shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Sözleşme Önizleme</h2>
            <pre className="whitespace-pre-wrap text-gray-800">{modalContent}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
