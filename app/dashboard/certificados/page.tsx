'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { CertificadoData } from '@/lib/pdf/templates/certificado-html'

function parseCSV(text: string): CertificadoData[] {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/['"]/g, ''))
  const results: CertificadoData[] = []

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map(c => c.trim().replace(/['"]/g, ''))
    if (cols.length < 2) continue

    const row: Record<string, string> = {}
    headers.forEach((h, idx) => { row[h] = cols[idx] || '' })

    results.push({
      numero: row['numero'] || row['nº'] || String(i),
      nome: row['nome'] || '',
      cpf: row['cpf'] || '',
      empresa: row['empresa'] || '',
      cnpj: row['cnpj'] || '',
      data: row['data'] || '',
      cargaHoraria: row['cargahoraria'] || row['carga_horaria'] || row['carga'] || '8',
      livro: row['livro'] || '03',
      folha: row['folha'] || String(i),
    })
  }

  return results
}

export default function CertificadosPage() {
  const [participantes, setParticipantes] = useState<CertificadoData[]>([])
  const [gerando, setGerando] = useState(false)
  const [progresso, setProgresso] = useState(0)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const processarArquivo = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      alert('Selecione um arquivo .csv')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const dados = parseCSV(text)
      if (dados.length === 0) {
        alert('Nenhum dado encontrado. Verifique o formato do CSV.')
        return
      }
      setParticipantes(dados)
    }
    reader.readAsText(file, 'UTF-8')
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processarArquivo(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processarArquivo(file)
  }

  const gerarTodos = async () => {
    if (participantes.length === 0) return
    setGerando(true)
    setProgresso(0)

    const { gerarCertificadoCliente } = await import('@/lib/pdf/client-generator')

    for (let i = 0; i < participantes.length; i++) {
      setProgresso(i + 1)
      await gerarCertificadoCliente(participantes[i])
      if (i < participantes.length - 1) {
        await new Promise(r => setTimeout(r, 1200))
      }
    }

    setGerando(false)
    setProgresso(0)
  }

  const baixarModeloCSV = () => {
    const conteudo = `numero,nome,cpf,empresa,cnpj,data,cargaHoraria,livro,folha
2026170,Jesus David Guzman Gamboa,710.651.852-27,GOLDSERVICE SERVIÇOS,31.640.318/0001-60,26/02/2026,8,03,46
2026171,Maria Silva Santos,123.456.789-00,EMPRESA TESTE LTDA,12.345.678/0001-99,26/02/2026,8,03,47`
    const blob = new Blob([conteudo], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'modelo-certificados.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen text-white">

      {/* Header */}
      <header className="sticky top-0 z-50" style={{ background: 'linear-gradient(135deg, #0a1a1f, #0d2b30)', borderBottom: '1px solid rgba(74,155,158,0.15)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm transition-colors flex items-center gap-1.5"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            onMouseOver={e => e.currentTarget.style.color = '#4a9b9e'}
            onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            ← Voltar
          </button>
          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />
          <h1 className="text-base font-semibold text-white">Gerador de Certificados NR-12</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* Instruções + Upload */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* Upload zone */}
          <div
            className="glass-card p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all"
            style={{ borderColor: dragging ? '#4a9b9e' : undefined, minHeight: '220px' }}
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />
            <svg className="w-12 h-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: dragging ? '#4a9b9e' : 'rgba(74,155,158,0.5)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="font-medium mb-1" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {dragging ? 'Solte o arquivo aqui' : 'Arraste o CSV ou clique para selecionar'}
            </p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Apenas arquivos .csv</p>
          </div>

          {/* Instruções */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-3 text-sm" style={{ color: '#4a9b9e' }}>FORMATO DO CSV</h3>
            <div className="text-xs font-mono p-3 rounded-lg mb-4 overflow-x-auto" style={{ background: 'rgba(0,0,0,0.3)', color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>
              numero,nome,cpf,empresa,cnpj,data,cargaHoraria,livro,folha
            </div>
            <ul className="space-y-1 text-sm mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {[
                ['numero', 'Número do certificado (ex: 2026170)'],
                ['nome', 'Nome completo do participante'],
                ['cpf', 'CPF (ex: 710.651.852-27)'],
                ['empresa', 'Nome da empresa'],
                ['cnpj', 'CNPJ da empresa'],
                ['data', 'Data do treinamento (ex: 26/02/2026)'],
                ['cargaHoraria', 'Horas do treinamento (padrão: 8)'],
                ['livro', 'Número do livro (padrão: 03)'],
                ['folha', 'Número da folha'],
              ].map(([campo, desc]) => (
                <li key={campo} className="flex gap-2">
                  <span className="font-mono shrink-0" style={{ color: '#4a9b9e' }}>{campo}</span>
                  <span>— {desc}</span>
                </li>
              ))}
            </ul>
            <button onClick={baixarModeloCSV} className="btn-outline-glow px-4 py-2 text-sm w-full">
              Baixar modelo CSV
            </button>
          </div>
        </div>

        {/* Preview */}
        {participantes.length > 0 && (
          <div className="dark-card p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-white">{participantes.length} participante{participantes.length !== 1 ? 's' : ''} encontrado{participantes.length !== 1 ? 's' : ''}</h2>
                <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Verifique os dados antes de gerar</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setParticipantes([]); if (fileRef.current) fileRef.current.value = '' }}
                  className="px-4 py-2 text-sm rounded-lg transition-colors"
                  style={{ color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onMouseOver={e => e.currentTarget.style.color = '#ff6b7a'}
                  onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                >
                  Limpar
                </button>
                <button
                  onClick={gerarTodos}
                  disabled={gerando}
                  className="btn-glow px-5 py-2 text-sm disabled:opacity-50"
                >
                  {gerando ? `Gerando ${progresso} de ${participantes.length}...` : `Gerar ${participantes.length} Certificado${participantes.length !== 1 ? 's' : ''}`}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(74,155,158,0.2)' }}>
                    {['N°', 'Nome', 'CPF', 'Empresa', 'Data', 'CH', 'Folha'].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-xs font-medium" style={{ color: '#4a9b9e' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {participantes.map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                      onMouseOver={e => e.currentTarget.style.background = 'rgba(74,155,158,0.05)'}
                      onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td className="py-2 px-3 font-mono text-xs" style={{ color: '#4a9b9e' }}>{p.numero}</td>
                      <td className="py-2 px-3 font-medium text-white">{p.nome}</td>
                      <td className="py-2 px-3 font-mono text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.cpf}</td>
                      <td className="py-2 px-3" style={{ color: 'rgba(255,255,255,0.7)' }}>{p.empresa}</td>
                      <td className="py-2 px-3 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.data}</td>
                      <td className="py-2 px-3 text-xs text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.cargaHoraria}h</td>
                      <td className="py-2 px-3 text-xs font-mono text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.folha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Estado vazio */}
        {participantes.length === 0 && (
          <div className="dark-card p-12 text-center">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Importe um arquivo CSV para visualizar os participantes e gerar os certificados
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
