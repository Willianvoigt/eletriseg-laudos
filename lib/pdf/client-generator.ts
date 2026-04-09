'use client'

import { gerarLaudoHTML } from './templates/laudo-html'
import type { CertificadoData } from './templates/certificado-html'
import type { LaudoData } from './generator'

export async function gerarCertificadoCliente(lista: CertificadoData[]): Promise<void> {
  const { gerarCertificadoHTML } = await import('./templates/certificado-html')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const html2pdf = (await import('html2pdf.js')).default as any

  for (const participante of lista) {
    const html = gerarCertificadoHTML(participante)

    // Usar iframe para carregar o HTML completo com estilos corretos
    const iframe = document.createElement('iframe')
    iframe.style.position = 'fixed'
    iframe.style.top = '-9999px'
    iframe.style.left = '-9999px'
    iframe.style.width = '297mm'
    iframe.style.height = '210mm'
    iframe.style.border = 'none'
    document.body.appendChild(iframe)

    const blob = new Blob([html], { type: 'text/html' })
    const blobUrl = URL.createObjectURL(blob)
    iframe.src = blobUrl

    await new Promise<void>(r => {
      iframe.onload = () => setTimeout(r, 500)
      setTimeout(r, 3000)
    })

    const element = iframe.contentDocument?.querySelector('.certificado') as HTMLElement | null

    if (element) {
      const nomeArquivo = `certificado-${participante.nome.replace(/\s+/g, '-').toLowerCase()}.pdf`

      await html2pdf()
        .set({
          margin: 0,
          filename: nomeArquivo,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            width: 1122,
            height: 794,
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
        })
        .from(element)
        .save()
    }

    document.body.removeChild(iframe)
    URL.revokeObjectURL(blobUrl)

    await new Promise(r => setTimeout(r, 500))
  }
}

export async function gerarPDFCliente(data: LaudoData): Promise<void> {
  // Gerar o HTML do laudo
  const html = gerarLaudoHTML(data)

  // Abrir nova janela com o HTML
  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Permita pop-ups para gerar o PDF')
    return
  }

  printWindow.document.write(html)
  printWindow.document.close()

  // Esperar imagens carregarem, depois abrir diálogo de impressão
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print()
    }, 500)
  }

  // Fallback se onload não disparar
  setTimeout(() => {
    printWindow.print()
  }, 2000)
}
