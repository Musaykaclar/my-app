// fonts.ts adında bir utility dosyası oluşturabilirsiniz
export const loadDejaVuSansFont = async () => {
    try {
      // Public klasöründen fontu fetch ile alıyoruz
      const response = await fetch('/fonts/DejaVuSans.ttf');
      const fontBlob = await response.blob();
      
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(fontBlob);
      });
    } catch (error) {
      console.error('Font yüklenemedi:', error);
      throw error;
    }
  };