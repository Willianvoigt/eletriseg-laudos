'use client'

import { gerarLaudoHTML } from './templates/laudo-html'
import type { LaudoData } from './generator'

export async function gerarPDFCliente(data: LaudoData): Promise<void> {
  // Importar html2pdf dinamicamente (só funciona no browser)
  const html2pdf = (await import('html2pdf.js')).default

  // Gerar o HTML do laudo
  const html = gerarLaudoHTML(data)

  // Criar container temporário
  const container = document.createElement('div')
  container.innerHTML = html
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  container.style.top = '0'
  document.body.appendChild(container)

  const fileName = `Laudo_NR12_${(data.maquinaNome || 'Laudo').replace(/\s+/g, '_')}_${Date.now()}.pdf`

  try {
    const options = {
      margin: [10, 10, 10, 10],
      filename: fileName,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      },
      pagebreak: { mode: ['css', 'legacy'], before: '.page' },
    }

    await html2pdf()
      .set(options as any)
      .from(container)
      .save()
  } finally {
    document.body.removeChild(container)
  }
}
