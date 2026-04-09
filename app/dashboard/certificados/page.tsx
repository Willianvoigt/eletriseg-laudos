'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { CertificadoData } from '@/lib/pdf/templates/certificado-html'

interface HistoricoItem {
  id: string
  empresa: string
  quantidade: number
  participantes: CertificadoData[]
  createdAt: string
}

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
    })
  }

  return results
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function CertificadosPage() {
  const [participantes, setParticipantes] = useState<CertificadoData[]>([])
  const [gerando, setGerando] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [historico, setHistorico] = useState<HistoricoItem[]>([])
  const [loadingHistorico, setLoadingHistorico] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/certificados')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setHistorico(data) })
      .finally(() => setLoadingHistorico(false))
  }, [])

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

  const gerarIndividual = async (p: CertificadoData) => {
    // Abrir janela ANTES de qualquer await (exigência do browser)
    const win = window.open('', '_blank')
    if (!win) { alert('Permita pop-ups para gerar os certificados'); return }
    const { gerarCertificadoCliente } = await import('@/lib/pdf/client-generator')
    await gerarCertificadoCliente([p], [win])
  }

  const gerarTodos = async () => {
    if (participantes.length === 0) return
    setGerando(true)

    // Pré-carregar o módulo sem abrir janelas ainda
    const { gerarCertificadoCliente } = await import('@/lib/pdf/client-generator')
    const { gerarCertificadoHTML } = await import('@/lib/pdf/templates/certificado-html')

    // Gerar cada certificado: abrir janela + preencher em sequência
    for (const p of participantes) {
      const win = window.open('', '_blank')
      if (!win) {
        alert('Permita pop-ups para gerar os certificados')
        setGerando(false)
        return
      }
      const html = gerarCertificadoHTML(p)
      await gerarCertificadoCliente([p], [win], html)
      await new Promise(r => setTimeout(r, 300))
    }

    // Salvar no histórico agrupado por empresa
    const porEmpresa = participantes.reduce((acc, p) => {
      const key = p.empresa || ''
      if (!acc[key]) acc[key] = []
      acc[key].push(p)
      return acc
    }, {} as Record<string, CertificadoData[]>)

    try {
      const novosItens: HistoricoItem[] = []
      for (const [empresa, lista] of Object.entries(porEmpresa)) {
        const res = await fetch('/api/certificados', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ empresa, quantidade: lista.length, participantes: lista }),
        })
        if (res.ok) {
          novosItens.push(await res.json())
        } else {
          const err = await res.json()
          console.error('Erro ao salvar histórico:', err)
        }
      }
      if (novosItens.length > 0) {
        setHistorico(prev => [...novosItens.reverse(), ...prev])
      }
    } catch (e) {
      console.error('Erro ao salvar histórico:', e)
    }

    setGerando(false)
  }

  const excluirHistorico = async (id: string) => {
    setDeletingId(id)
    try {
      await fetch('/api/certificados', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      setHistorico(prev => prev.filter(h => h.id !== id))
    } finally {
      setDeletingId(null)
    }
  }

  const baixarModeloCSV = () => {
    const conteudo = `numero,nome,cpf,empresa,cnpj,data
2026170,Jesus David Guzman Gamboa,710.651.852-27,GOLDSERVICE SERVIÇOS,31.640.318/0001-60,26/02/2026
2026171,Maria Silva Santos,123.456.789-00,EMPRESA TESTE LTDA,12.345.678/0001-99,26/02/2026`
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
              numero,nome,cpf,empresa,cnpj,data
            </div>
            <ul className="space-y-1 text-sm mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {[
                ['numero', 'Número do certificado (ex: 2026170)'],
                ['nome', 'Nome completo do participante'],
                ['cpf', 'CPF (ex: 710.651.852-27)'],
                ['empresa', 'Nome da empresa'],
                ['cnpj', 'CNPJ da empresa'],
                ['data', 'Data do treinamento (ex: 26/02/2026)'],
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
                  {gerando ? 'Abrindo para impressão...' : `Gerar ${participantes.length} Certificado${participantes.length !== 1 ? 's' : ''}`}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(74,155,158,0.2)' }}>
                    {['N°', 'Nome', 'CPF', 'Empresa', 'CNPJ', 'Data', ''].map(h => (
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
                      <td className="py-2 px-3 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.cnpj}</td>
                      <td className="py-2 px-3 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.data}</td>
                      <td className="py-2 px-3">
                        <button
                          onClick={() => gerarIndividual(p)}
                          className="text-xs px-3 py-1 rounded transition-colors"
                          style={{ color: '#4a9b9e', border: '1px solid rgba(74,155,158,0.4)' }}
                          onMouseOver={e => e.currentTarget.style.background = 'rgba(74,155,158,0.1)'}
                          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                        >
                          Imprimir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Estado vazio */}
        {participantes.length === 0 && (
          <div className="dark-card p-12 text-center mb-8">
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Importe um arquivo CSV para visualizar os participantes e gerar os certificados
            </p>
          </div>
        )}

        {/* Histórico */}
        <div>
          <h2 className="font-semibold text-white mb-4">Histórico de Certificados</h2>

          {loadingHistorico ? (
            <div className="dark-card p-8 text-center">
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Carregando histórico...</p>
            </div>
          ) : historico.length === 0 ? (
            <div className="dark-card p-8 text-center">
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Nenhum certificado gerado ainda</p>
            </div>
          ) : (
            <div className="dark-card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(74,155,158,0.2)' }}>
                    {['Empresa', 'Qtd.', 'Data de geração', ''].map(h => (
                      <th key={h} className="text-left py-3 px-4 text-xs font-medium" style={{ color: '#4a9b9e' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {historico.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                      onMouseOver={e => e.currentTarget.style.background = 'rgba(74,155,158,0.05)'}
                      onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td className="py-3 px-4 font-medium text-white">{item.empresa || '—'}</td>
                      <td className="py-3 px-4" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.quantidade}</td>
                      <td className="py-3 px-4 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{formatDate(item.createdAt)}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => excluirHistorico(item.id)}
                          disabled={deletingId === item.id}
                          className="text-xs px-3 py-1 rounded transition-colors disabled:opacity-50"
                          style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
                          onMouseOver={e => { if (deletingId !== item.id) e.currentTarget.style.color = '#ff6b7a' }}
                          onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                        >
                          {deletingId === item.id ? '...' : 'Excluir'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}
