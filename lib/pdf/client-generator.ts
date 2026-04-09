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

    const container = document.createElement('div')
    container.style.position = 'fixed'
    container.style.top = '-9999px'
    container.style.left = '-9999px'
    container.innerHTML = html
    document.body.appendChild(container)

    const element = container.querySelector('.certificado') || container

    const nomeArquivo = `certificado-${participante.nome.replace(/\s+/g, '-').toLowerCase()}.pdf`

    await html2pdf()
      .set({
        margin: 0,
        filename: nomeArquivo,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      })
      .from(element)
      .save()

    document.body.removeChild(container)

    // Pequeno delay entre downloads para não sobrecarregar o browser
    await new Promise(r => setTimeout(r, 400))
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
