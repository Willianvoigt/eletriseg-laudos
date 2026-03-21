import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function fillPDFTemplate(data: {
  empresaNome: string;
  empresaCNPJ: string;
  maquinaNome: string;
  mesAno: string;
}) {
  try {
    // Carregar o PDF template
    const templatePath = path.join(process.cwd(), 'public/templates/laudo-template.pdf');
    const templateBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);

    // Pegar a primeira página (capa)
    const firstPage = pdfDoc.getPage(0);
    const { width, height } = firstPage.getSize();

    // Adicionar dados à primeira página
    firstPage.drawText(`${data.empresaNome}`, {
      x: width / 2 - 100,
      y: height - 180,
      size: 12,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(`${data.mesAno}`, {
      x: 60,
      y: height - 320,
      size: 10,
      color: rgb(0, 0, 0),
    });

    // Salvar PDF modificado em memória
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('Erro ao preencher PDF:', error);
    throw error;
  }
}
