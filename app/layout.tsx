import type { Metadata } from "next"
import "./globals.css"
import { ParticleNetwork } from "@/components/ParticleNetwork"

export const metadata: Metadata = {
  title: "EletriSeg - Gerador de Laudos NR-12",
  description: "Automação de laudos técnicos NR-12",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-tech">
        <ParticleNetwork />
        <div style={{ position: 'relative', zIndex: 2 }}>
          {children}
        </div>
      </body>
    </html>
  )
}
