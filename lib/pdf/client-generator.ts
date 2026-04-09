'use client'

import { gerarLaudoHTML } from './templates/laudo-html'
import type { CertificadoData } from './templates/certificado-html'
import type { LaudoData } from './generator'

export async function gerarCertificadoCliente(lista: CertificadoData[]): Promise<void> {
  const { gerarCertificadoHTML } = await import('./templates/certificado-html')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const html2pdf = (await import('html2pdf.js')).default as any

  for (const participante of lista) {
    const htmlStr = gerarCertificadoHTML(participante)

    // Parsear o HTML para extrair estilos e o elemento do certificado
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlStr, 'text/html')

    // Injetar os estilos temporariamente no documento atual
    const addedStyles: HTMLStyleElement[] = []
    doc.querySelectorAll('style').forEach(s => {
      const style = document.createElement('style')
      style.textContent = s.textContent
      document.head.appendChild(style)
      addedStyles.push(style)
    })

    const certEl = doc.querySelector('.certificado') as HTMLElement | null
    if (!certEl) {
      addedStyles.forEach(s => document.head.removeChild(s))
      continue
    }

    // Container escondido no DOM atual para html2canvas conseguir renderizar
    const container = document.createElement('div')
    container.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:297mm;height:210mm;overflow:hidden;'
    container.appendChild(certEl)
    document.body.appendChild(container)

    const nomeArquivo = `certificado-${participante.nome.replace(/\s+/g, '-').toLowerCase()}.pdf`

    await html2pdf()
      .set({
        margin: 0,
        filename: nomeArquivo,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      })
      .from(certEl)
      .save()

    document.body.removeChild(container)
    addedStyles.forEach(s => document.head.removeChild(s))

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
