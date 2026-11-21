import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";

export interface WatermarkOptions {
  text: string;
  opacity: number; // 0-1
  fontSize: number;
}

export function isPdfFile(file: File): boolean {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

export async function watermarkPdf(file: File, { text, opacity, fontSize }: WatermarkOptions): Promise<Blob> {
  const pdfDoc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const textWidth = font.widthOfTextAtSize(text, fontSize);

  for (const page of pdfDoc.getPages()) {
    const { width, height } = page.getSize();
    const stepX = textWidth + 80;
    const stepY = fontSize * 4;

    for (let y = -height; y < height * 2; y += stepY) {
      for (let x = -width; x < width * 2; x += stepX) {
        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity,
          rotate: degrees(45),
        });
      }
    }
  }

  const bytes = await pdfDoc.save();
  return new Blob([bytes], { type: "application/pdf" });
}

export async function watermarkImage(file: File, { text, opacity, fontSize }: WatermarkOptions): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No se pudo crear el contexto de canvas");

  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = "#808080";
  ctx.font = `bold ${fontSize}px sans-serif`;
  ctx.textBaseline = "middle";
  ctx.rotate((-30 * Math.PI) / 180);

  const textWidth = ctx.measureText(text).width;
  const stepX = textWidth + 80;
  const stepY = fontSize * 4;
  const diagonal = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);

  for (let y = -diagonal; y < diagonal; y += stepY) {
    for (let x = -diagonal; x < diagonal; x += stepX) {
      ctx.fillText(text, x, y);
    }
  }
  ctx.restore();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("No se pudo generar la imagen"))),
      file.type === "image/png" ? "image/png" : "image/jpeg",
      0.92
    );
  });
}
