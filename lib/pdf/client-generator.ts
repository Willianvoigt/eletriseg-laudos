'use client'

import { gerarLaudoHTML } from './templates/laudo-html'
import { gerarCertificadoHTML, type CertificadoData } from './templates/certificado-html'
import type { LaudoData } from './generator'

export async function gerarCertificadoCliente(data: CertificadoData): Promise<void> {
  const html = gerarCertificadoHTML(data)

  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    alert('Permita pop-ups para gerar o certificado')
    return
  }

  printWindow.document.write(html)
  printWindow.document.close()

  await new Promise<void>((resolve) => {
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print()
        resolve()
      }, 500)
    }
    setTimeout(() => {
      printWindow.print()
      resolve()
    }, 2000)
  })
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
