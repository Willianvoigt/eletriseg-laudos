import { PDFDocument, rgb } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';

export async function generateLaudoCompletoFromTemplate(data: {
  empresaNome: string;
  empresaCNPJ: string;
  empresaEndereco: string;
  empresaDataAbertura: string;
  empresaCNAE: string;
  maquinaNome: string;
  maquinaModelo: string;
  maquinaSerial: string;
  maquinaFabricante: string;
  maquinaAno: string;
  maquinaSetor: string;
  maquinaDescricao: string;
  fotoPlacar?: string;
  fotoVisaoGeral?: string;
  dispositivosSeguranca: Array<{ descricao: string; foto?: string }>;
  perigos: Array<{
    cicloVida: string;
    numeroPerigo: string;
    tarefa: string;
    descricaoPerigo: string;
    loAntes: number;
    feAntes: number;
    dphAntes: number;
    npAntes: number;
    hrnAntes: number;
    medidasEngenharia: string;
    loDepois: number;
    feDepois: number;
    dphDepois: number;
    npDepois: number;
    hrnDepois: number;
  }>;
  tipoConlusao: 'A' | 'B';
  artNumero?: string;
}) {
  try {
    // Carregar o PDF template original
    const templatePath = path.join(process.cwd(), 'public/templates/laudo-template.pdf');
    const templateBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);

    const mesAno = new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
    });

    // Preencher a primeira página (capa)
    const capaPage = pdfDoc.getPage(0);
    const { width, height } = capaPage.getSize();

    // Título principal
    capaPage.drawText('LAUDO TÉCNICO NR12 – YAWEI BRASIL COMERCIO DE MÁQUINAS LTDA', {
      x: 50,
      y: height - 60,
      size: 10,
      color: rgb(0, 0, 0),
    });

    capaPage.drawText(`Máquina ${data.maquinaNome}`, {
      x: 50,
      y: height - 75,
      size: 9,
      color: rgb(0, 0, 0),
    });

    // Subtítulo
    capaPage.drawText('Laudo de apreciação de riscos e conformidades', {
      x: width / 2 - 120,
      y: height - 250,
      size: 12,
      color: rgb(0, 0, 0),
    });

    capaPage.drawText(data.maquinaNome, {
      x: width / 2 - 80,
      y: height - 280,
      size: 11,
      color: rgb(0, 0, 0),
    });

    // NR-12 em destaque
    capaPage.drawText('NR-12', {
      x: width / 2 - 30,
      y: height - 360,
      size: 24,
      color: rgb(0, 0, 0),
    });

    // Nome da empresa
    capaPage.drawText(data.empresaNome, {
      x: width / 2 - 100,
      y: height - 480,
      size: 12,
      color: rgb(0, 0, 0),
    });

    // Quadro de informações (capa)
    const quadroY = height - 580;
    capaPage.drawRectangle({
      x: 50,
      y: quadroY - 50,
      width: width - 100,
      height: 60,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    capaPage.drawText('00', {
      x: 70,
      y: quadroY - 15,
      size: 9,
      color: rgb(0, 0, 0),
    });

    capaPage.drawText(mesAno, {
      x: 150,
      y: quadroY - 15,
      size: 9,
      color: rgb(0, 0, 0),
    });

    capaPage.drawText('Emissão Inicial e Entrega', {
      x: 280,
      y: quadroY - 15,
      size: 9,
      color: rgb(0, 0, 0),
    });

    capaPage.drawText('Bruno C.', {
      x: 500,
      y: quadroY - 15,
      size: 9,
      color: rgb(0, 0, 0),
    });

    // Segunda linha do quadro
    capaPage.drawText('Rev.', {
      x: 70,
      y: quadroY - 35,
      size: 9,
      color: rgb(0, 0, 0),
    });

    capaPage.drawText('Data', {
      x: 150,
      y: quadroY - 35,
      size: 9,
      color: rgb(0, 0, 0),
    });

    capaPage.drawText('Descrição', {
      x: 280,
      y: quadroY - 35,
      size: 9,
      color: rgb(0, 0, 0),
    });

    capaPage.drawText('Responsável', {
      x: 500,
      y: quadroY - 35,
      size: 9,
      color: rgb(0, 0, 0),
    });

    // Logo (simplificado em texto)
    capaPage.drawText('EletriSeg', {
      x: width / 2 - 50,
      y: 80,
      size: 16,
      color: rgb(80, 80, 80),
    });

    capaPage.drawText('ENGENHARIA', {
      x: width / 2 - 40,
      y: 50,
      size: 8,
      color: rgb(0, 0, 0),
    });

    // Converter para bytes
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    console.error('Erro ao gerar laudo completo:', error);
    throw error;
  }
}
