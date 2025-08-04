'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState,useRef } from 'react';
import { Save, Download, Copy, FileText, Edit2 } from 'lucide-react';
import Parse from "@/utils/parse/Parse";
// Editör için section interface'i
interface EditableSection {
  id: string;
  content: string;
  isEditing: boolean;
  originalContent: string;
}

export default function SozlesmeEditorPage() {
  const searchParams = useSearchParams();
  const content = searchParams.get('content');
  const threadId = searchParams.get('threadId');
  
  const [sections, setSections] = useState<EditableSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [sendMessage, setSendMessage] = useState('');
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);

  // Sayfa yüklendiğinde içeriği bölümlere ayır
  useEffect(() => {
    if (content) {
      const decodedContent = decodeURIComponent(content);
      const contentSections = parseContentToSections(decodedContent);
      setSections(contentSections);
    }
    setIsLoading(false);
  }, [content]);
  const handleSendEmail = async () => {
    try {
      const fullText = sections.map(section => section.content).join('\n\n');
  
      const response = await Parse.Cloud.run('sendContractByEmail', {
        threadId,
        content: fullText,
        signature: signatureDataUrl,
        email,
      });
  
      if (response.success) {
        setSendMessage('📨 E-posta başarıyla gönderildi.');
      } else {
        setSendMessage('❌ Gönderim sırasında hata oluştu.');
      }
    } catch (err) {
      console.error(err);
      setSendMessage('❌ Sunucu hatası: E-posta gönderilemedi.');
    }
  };

  // İçeriği düzenlenebilir bölümlere ayır
  const parseContentToSections = (text: string): EditableSection[] => {
    // Paragrafları ayır (boş satırları dikkate al)
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);
    
    return paragraphs.map((paragraph, index) => ({
      id: `section-${index}`,
      content: paragraph.trim(),
      isEditing: false,
      originalContent: paragraph.trim()
    }));
  };

  // Bölümü düzenleme moduna al
  const startEditing = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, isEditing: true }
        : { ...section, isEditing: false } // Diğer bölümlerin düzenlemesini kapat
    ));
  };

  // Düzenlemeyi kaydet
  const saveEdit = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, isEditing: false, originalContent: section.content }
        : section
    ));
  };

  // Düzenlemeyi iptal et
  const cancelEdit = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, isEditing: false, content: section.originalContent }
        : section
    ));
  };

  // Bölüm içeriğini güncelle
  const updateSectionContent = (sectionId: string, newContent: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, content: newContent }
        : section
    ));
  };

  // Tüm değişiklikleri kaydet
  const saveAllChanges = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      const finalContent = sections.map(section => section.content).join('\n\n');
      
      // Parse cloud function çağrısı (backend'de yeni bir function oluşturmanız gerekebilir)
      const response = await Parse.Cloud.run('saveEditedContract', {
        threadId: threadId,
        editedContent: finalContent,
        originalContent: content
      });

      if (response.success) {
        setSaveMessage('✅ Değişiklikler başarıyla kaydedildi!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('❌ Kaydetme sırasında hata oluştu.');
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage('❌ Kaydetme sırasında hata oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  // PDF olarak indir
  const downloadAsPdf = () => {
    const finalContent = sections.map(section => section.content).join('\n\n');
    
    // Basit bir PDF oluşturma (daha gelişmiş bir PDF kütüphanesi kullanabilirsiniz)
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Sözleşme</title>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
              .header { text-align: center; margin-bottom: 30px; }
              .section { margin-bottom: 20px; }
              @media print { .no-print { display: none; } }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>SÖZLEŞME</h1>
              <p>Oluşturulma Tarihi: ${new Date().toLocaleDateString('tr-TR')}</p>
            </div>
            <div class="content">
              ${finalContent.split('\n\n').map(section => 
                `<div class="section">${section.replace(/\n/g, '<br>')}</div>`
              ).join('')}
            </div>
            <div class="no-print" style="margin-top: 30px; text-align: center;">
              <button onclick="window.print()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                PDF Olarak İndir
              </button>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  // Panoya kopyala
  const copyToClipboard = () => {
    const finalContent = sections.map(section => section.content).join('\n\n');
    navigator.clipboard.writeText(finalContent).then(() => {
      setSaveMessage('📋 İçerik panoya kopyalandı!');
      setTimeout(() => setSaveMessage(''), 2000);
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Editör yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <FileText className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">İçerik Bulunamadı</h1>
          <p>Düzenlenecek sözleşme içeriği bulunamadı.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Edit2 className="w-6 h-6 text-blue-600" />
                Sözleşme Editörü
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Düzenlemek istediğiniz bölüme tıklayın
              </p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                <Copy className="w-4 h-4" />
                Kopyala
              </button>
              
              <button
                onClick={downloadAsPdf}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                <Download className="w-4 h-4" />
                PDF İndir
              </button>
              
              <button
                onClick={saveAllChanges}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Kaydet
                  </>
                )}
              </button>
            </div>
          </div>
          
          {saveMessage && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
              {saveMessage}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border min-h-96">
          <div className="p-8">
            {sections.map((section, index) => (
              <div key={section.id} className="mb-6 group">
                {section.isEditing ? (
                  <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSectionContent(section.id, e.target.value)}
                      className="w-full h-32 p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                        lineHeight: '1.6',
                        minHeight: '100px'
                      }}
                      autoFocus
                    />
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => saveEdit(section.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                      >
                        Kaydet
                      </button>
                      <button
                        onClick={() => cancelEdit(section.id)}
                        className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                      >
                        İptal
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => startEditing(section.id)}
                    className="p-4 rounded-lg cursor-pointer hover:bg-gray-50 border-2 border-transparent hover:border-gray-200 transition-all group-hover:shadow-sm"
                    style={{ lineHeight: '1.6' }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 whitespace-pre-wrap text-gray-800">
                        {section.content}
                      </div>
                      <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit2 className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* İmza ve E-Posta Gönderme Alanı */}
<div className="max-w-4xl mx-auto p-6 mt-6 bg-white rounded shadow border">
  <h2 className="text-xl font-semibold mb-4">İmza ve Gönderim</h2>

  {/* İmza Alanı */}
  {signatureDataUrl ? (
    <div className="mb-4">
      <p className="text-sm text-gray-600 mb-2">İmzanız:</p>
      <img src={signatureDataUrl} alt="İmza" className="h-24 border" />
      <button
        onClick={() => setSignatureDataUrl(null)}
        className="mt-2 text-sm text-red-600 underline"
      >
        İmzayı Sil
      </button>
    </div>
  ) : (
    <div className="mb-4">
      <p className="text-sm text-gray-600 mb-2">İmzanızı aşağıya çizin:</p>
      <canvas
        ref={signatureCanvasRef}
        width={500}
        height={150}
        className="border border-gray-300 bg-white"
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => {
            const canvas = signatureCanvasRef.current;
            if (canvas) {
              const ctx = canvas.getContext('2d');
              ctx?.clearRect(0, 0, canvas.width, canvas.height);
            }
          }}
          className="px-3 py-1 bg-gray-600 text-white rounded text-sm"
        >
          Temizle
        </button>
        <button
          onClick={() => {
            const canvas = signatureCanvasRef.current;
            if (canvas) {
              const dataUrl = canvas.toDataURL('image/png');
              setSignatureDataUrl(dataUrl);
            }
          }}
          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
        >
          Kaydet
        </button>
      </div>
    </div>
  )}

  {/* E-Posta Gönderme Alanı */}
  <div className="mt-6">
    <input
      type="email"
      placeholder="Alıcı e-posta adresi"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="border px-3 py-2 rounded w-full max-w-md"
    />
    <button
      onClick={handleSendEmail}
      disabled={!email}
      className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
    >
      E-Posta Gönder
    </button>
    {sendMessage && <p className="mt-2 text-sm">{sendMessage}</p>}
  </div>
</div>

    </div>
  );
}