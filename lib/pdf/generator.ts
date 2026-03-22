import puppeteer from 'puppeteer-core'
import { gerarLaudoHTML } from './templates/laudo-html'

export interface LaudoData {
  // Tipo de laudo
  tipoLaudo?: string

  // Empresa
  empresaNome: string
  empresaCNPJ: string
  empresaEndereco: string
  empresaDataAbertura: string
  empresaCNAE: string

  // Máquina
  maquinaNome: string
  maquinaModelo: string
  maquinaSerial: string
  maquinaFabricante: string
  maquinaAno: string
  maquinaSetor: string
  maquinaDescricao: string

  // Limites da Máquina
  usoPretendido?: string
  modoOperacao?: string

  // Fotos (URLs)
  fotoPlacar?: string
  fotoVisaoGeral?: string

  // Dispositivos de segurança
  dispositivosSeguranca: Array<{
    descricao: string
    foto?: string
  }>

  // Riscos/Perigos
  perigos: Array<{
    cicloVida: string
    numeroPerigo: string
    tarefa: string
    descricaoPerigo: string
    loAntes: number
    feAntes: number
    dphAntes: number
    npAntes: number
    hrnAntes: number
    loDepois: number
    feDepois: number
    dphDepois: number
    npDepois: number
    hrnDepois: number
    medidasEngenharia: string
  }>

  // Conclusão
  tipoConlusao: 'A' | 'B'
  artNumero?: string
}

async function getBrowser() {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    // Serverless (Vercel)
    const chromium = (await import('@sparticuz/chromium')).default
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    })
  } else {
    // Local development
    return puppeteer.launch({
      headless: true,
      channel: 'chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    })
  }
}

export async function gerarPDF(data: LaudoData): Promise<Uint8Array> {
  let browser = null
  try {
    // Gerar HTML do laudo
    const html = gerarLaudoHTML(data)

    // Iniciar browser
    browser = await getBrowser()

    const page = await browser.newPage()

    // Definir tamanho da página
    await page.setViewport({ width: 1200, height: 1600 })

    // Carregar HTML
    await page.setContent(html, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    })

    // Gerar PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
      printBackground: true,
      scale: 1,
    })

    await browser.close()
    return new Uint8Array(pdfBuffer)
  } catch (err) {
    if (browser) {
      await browser.close()
    }
    console.error('Erro ao gerar PDF:', err)
    throw err
  }
}
