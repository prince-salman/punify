// Client-side PDF page counter and file processor

export interface ProcessedUploadedFile {
  name: string;
  size: string;
  detectedPages: number;
  dataUrl?: string;
  isPdf: boolean;
}

export const processUploadedDocument = async (file: File): Promise<ProcessedUploadedFile> => {
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
  const sizeFormatted = file.size < 1024 * 1024 
    ? `${(file.size / 1024).toFixed(0)} KB` 
    : `${sizeMb} MB`;

  let detectedPages = 1;
  let dataUrl: string | undefined = undefined;

  // Read data URL if file size is reasonable (< 8MB)
  if (file.size <= 8 * 1024 * 1024) {
    try {
      dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } catch (e) {
      console.warn('Could not generate data URL', e);
    }
  }

  if (isPdf) {
    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const chunkSize = 65536;
      let fullText = '';
      const len = bytes.byteLength;

      // Scan up to first 2MB or full file if smaller
      const maxScan = Math.min(len, 2 * 1024 * 1024);
      for (let i = 0; i < maxScan; i += chunkSize) {
        const slice = bytes.subarray(i, Math.min(i + chunkSize, maxScan));
        fullText += new TextDecoder('latin1').decode(slice);
      }

      // Check /Type /Page excluding /Pages
      const pageMatches = fullText.match(/\/Type\s*\/Page[^s]/g);
      if (pageMatches && pageMatches.length > 0) {
        detectedPages = pageMatches.length;
      } else {
        const countMatch = fullText.match(/\/Count\s+(\d+)/);
        if (countMatch && countMatch[1]) {
          const parsed = parseInt(countMatch[1], 10);
          if (parsed > 0) detectedPages = parsed;
        }
      }
    } catch (err) {
      console.warn('Failed to parse PDF pages', err);
      detectedPages = 1;
    }
  }

  return {
    name: file.name,
    size: sizeFormatted,
    detectedPages: Math.max(1, detectedPages),
    dataUrl,
    isPdf
  };
};
