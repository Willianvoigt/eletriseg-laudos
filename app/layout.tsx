import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "EletriSeg - Gerador de Laudos NR-12",
  description: "Automação de laudos técnicos NR-12",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}
