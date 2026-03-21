const PDFDocument = require('pdfkit');
const fs = require('fs');
const { PDFDocument: PDFLib } = require('pdf-lib');

async function analyzePDF() {
  try {
    const pdfPath = './public/templates/laudo-template.pdf';
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFLib.load(pdfBytes);

    const pageCount = pdfDoc.getPageCount();
    console.log(`\n📄 PDF ANALYSIS - Laser tubo.pdf`);
    console.log(`Total de páginas: ${pageCount}\n`);

    for (let i = 0; i < Math.min(pageCount, 5); i++) {
      const page = pdfDoc.getPage(i);
      const { width, height } = page.getSize();
      console.log(`\nPágina ${i + 1}:`);
      console.log(`  - Tamanho: ${width.toFixed(0)} x ${height.toFixed(0)}px`);
      console.log(`  - Conteúdo: [Página será analisada visualmente]`);
    }

    console.log(`\n✓ Análise concluída! Gerando screenshots...`);

  } catch (error) {
    console.error('Erro ao analisar PDF:', error.message);
  }
}

analyzePDF();
