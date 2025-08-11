import { jsPDF } from 'jspdf';
import { loadDejaVuSansFont } from '@/utils/fonts';

export async function createContractPdf(content: string, filename = 'sozlesme.pdf') {
  try {
    const fontBase64 = await loadDejaVuSansFont();

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    pdf.addFileToVFS('DejaVuSans.ttf', fontBase64.split(',')[1]);
    pdf.addFont('DejaVuSans.ttf', 'DejaVuSans', 'normal');
    pdf.setFont('DejaVuSans');
    pdf.setFontSize(12);

    const margin = 20;
    const pageHeight = pdf.internal.pageSize.getHeight();
    const textWidth = pdf.internal.pageSize.getWidth() - 2 * margin;

    const lines = pdf.splitTextToSize(content, textWidth);
    let yPos = margin;
    const lineHeight = 8;

    for (const line of lines) {
      if (yPos > pageHeight - margin) {
        pdf.addPage();
        yPos = margin;
      }
      pdf.text(line, margin, yPos);
      yPos += lineHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error("PDF oluşturulurken hata:", error);

    // Fallback: TXT olarak indir
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.replace(/\.pdf$/, '.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
