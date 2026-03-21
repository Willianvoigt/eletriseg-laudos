const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const pdfParse = require('pdf-parse');

async function convertPDFToImage() {
  const downloadsDir = 'C:\\Users\\ASUS\\Downloads';
  const outputDir = './public/laudo-examples';

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const pdfs = [
    'Centro de dobra.pdf',
    'Corte a laser.pdf',
    'Dobradeira.pdf',
    'Laser tubo.pdf'
  ];

  for (const pdfFile of pdfs) {
    const pdfPath = path.join(downloadsDir, pdfFile);

    if (!fs.existsSync(pdfPath)) {
      console.log(`❌ ${pdfFile} não encontrado`);
      continue;
    }

    try {
      const pdfBuffer = fs.readFileSync(pdfPath);
      const data = await pdfParse(pdfBuffer);

      console.log(`✓ ${pdfFile}`);
      console.log(`  - ${data.numpages} páginas`);
      console.log(`  - Copiar para: ${outputDir}/${pdfFile.replace('.pdf', '.png')}`);
    } catch (err) {
      console.log(`⚠ Erro ao processar ${pdfFile}: ${err.message}`);
    }
  }

  console.log('\n💡 Para converter para imagens, use:');
  console.log('  1. Abra os PDFs no Windows Preview');
  console.log('  2. Salve a primeira página como PNG em:', outputDir);
  console.log('  3. Ou use um site: https://cloudconvert.com');
}

convertPDFToImage();
