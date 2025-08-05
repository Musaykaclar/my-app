'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Save, Download, Copy, FileText, Edit2 } from 'lucide-react';
import Parse from '@/utils/parse/Parse';
import SignaturePad from '@/components/SignaturePad';

export default function SozlesmeEditorPage() {
  const searchParams = useSearchParams();
  const content = searchParams.get('content');
  const threadId = searchParams.get('threadId');

  const [fullContent, setFullContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  

  useEffect(() => {
    if (content) {
      const decoded = decodeURIComponent(content);
      setFullContent(decoded);
    }
    setIsLoading(false);
  }, [content]);

  const saveAllChanges = async () => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      const response = await Parse.Cloud.run('saveEditedContract', {
        threadId,
        editedContent: fullContent,
        originalContent: content,
      });

      if (response.success) {
        setSaveMessage('✅ Değişiklikler başarıyla kaydedildi!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('❌ Kaydetme sırasında hata oluştu.');
      }
    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage('❌ Sunucu hatası oluştu.');
    } finally {
      setIsSaving(false);
    }
  };

  const downloadAsPdf = () => {
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
              ${fullContent
                .split('\n\n')
                .map(
                  section => `<div class="section">${section.replace(/\n/g, '<br>')}</div>`
                )
                .join('')}
            </div>
            <div class="no-print" style="text-align: center; margin-top: 30px;">
              <button onclick="window.print()" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px;">
                PDF Olarak İndir
              </button>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullContent).then(() => {
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
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Edit2 className="w-6 h-6 text-blue-600" />
              Sözleşme Editörü
            </h1>
            <p className="text-sm text-gray-600 mt-1">Tüm sözleşmeyi aşağıda düzenleyebilirsiniz</p>
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
          <div className="max-w-4xl mx-auto mt-2 px-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
              {saveMessage}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto p-6">
        <textarea
          value={fullContent}
          onChange={(e) => setFullContent(e.target.value)}
          className="w-full h-[600px] p-4 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{
            fontFamily: 'inherit',
            fontSize: '16px',
            lineHeight: '1.6',
          }}
        />
      </div>
        <SignaturePad/>
      </div>
     
   
  );
}
