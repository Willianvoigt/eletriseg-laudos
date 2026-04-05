'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const TIPO_LABELS: Record<string, string> = {
  'centro-dobra': 'Centro de Dobra',
  'dobradeira': 'Dobradeira',
  'corte-laser': 'Corte a Laser',
  'laser-tubo': 'Laser Tubo',
}

const STATUS_STYLES: Record<string, { label: string; classes: string }> = {
  CONCLUIDO: { label: 'Concluído', classes: 'badge-success' },
  RASCUNHO: { label: 'Rascunho', classes: 'badge-warning' },
  ARQUIVADO: { label: 'Arquivado', classes: 'badge-neutral' },
}

interface LaudoItem {
  id: string
  createdAt: string
  status: string
  tipoLaudo: string | null
  nomeEmpresa: string
  nomeMaquina: string
  modelo: string | null
  tipoConclusao: string | null
  pdfUrl: string | null
  _count: {
    dispositivosSeguranca: number
    perigos: number
  }
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap"
      style={{
        background: active ? 'rgba(74,155,158,0.2)' : 'rgba(255,255,255,0.05)',
        color: active ? '#4a9b9e' : 'rgba(255,255,255,0.4)',
        border: `1px solid ${active ? 'rgba(74,155,158,0.4)' : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      {label}
    </button>
  )
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [laudos, setLaudos] = useState<LaudoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingLaudos, setLoadingLaudos] = useState(true)

  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('TODOS')
  const [filtroTipo, setFiltroTipo] = useState('TODOS')
  const [filtroMes, setFiltroMes] = useState('')

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (err) {
        console.error('Erro ao buscar usuário:', err)
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, [supabase.auth])

  useEffect(() => {
    const fetchLaudos = async () => {
      try {
        const res = await fetch('/api/laudos')
        if (res.ok) {
          const data = await res.json()
          setLaudos(data)
        }
      } catch (err) {
        console.error('Erro ao buscar laudos:', err)
      } finally {
        setLoadingLaudos(false)
      }
    }
    fetchLaudos()
  }, [])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/login')
    } catch (err) {
      console.error('Erro ao fazer logout:', err)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  // Meses disponíveis para o filtro
  const mesesDisponiveis = useMemo(() => {
    const set = new Set<string>()
    laudos.forEach(l => {
      const d = new Date(l.createdAt)
      set.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
    })
    return Array.from(set).sort().reverse()
  }, [laudos])

  // Laudos filtrados
  const laudosFiltrados = useMemo(() => {
    return laudos.filter(l => {
      if (filtroStatus !== 'TODOS' && l.status !== filtroStatus) return false
      if (filtroTipo !== 'TODOS' && l.tipoLaudo !== filtroTipo) return false
      if (filtroMes) {
        const d = new Date(l.createdAt)
        const mes = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
        if (mes !== filtroMes) return false
      }
      if (busca.trim()) {
        const q = busca.toLowerCase()
        if (
          !l.nomeEmpresa.toLowerCase().includes(q) &&
          !l.nomeMaquina.toLowerCase().includes(q) &&
          !(l.modelo || '').toLowerCase().includes(q)
        ) return false
      }
      return true
    })
  }, [laudos, busca, filtroStatus, filtroTipo, filtroMes])

  const filtrosAtivos = busca || filtroStatus !== 'TODOS' || filtroTipo !== 'TODOS' || filtroMes

  const limparFiltros = () => {
    setBusca('')
    setFiltroStatus('TODOS')
    setFiltroTipo('TODOS')
    setFiltroMes('')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'rgba(74,155,158,0.5)', borderTopColor: 'transparent' }}></div>
          Carregando...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ background: 'linear-gradient(135deg, #0a1a1f, #0d2b30)', borderBottom: '1px solid rgba(74, 155, 158, 0.15)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4a9b9e, #3a7d80)' }}>
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-bold text-white">EletriSeg</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm hidden sm:block" style={{ color: 'rgba(255,255,255,0.5)' }}>{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm rounded-lg transition-colors"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#ff6b7a'; e.currentTarget.style.background = 'rgba(220,53,69,0.1)' }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'transparent' }}
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">

        {/* Título + Ações */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Meus Laudos</h1>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {filtrosAtivos
                ? `${laudosFiltrados.length} de ${laudos.length} ${laudos.length === 1 ? 'laudo' : 'laudos'}`
                : `${laudos.length} ${laudos.length === 1 ? 'laudo gerado' : 'laudos gerados'}`}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => router.push('/dashboard/empresas')} className="px-5 py-2.5 btn-outline-glow text-sm">
              Empresas
            </button>
            <button onClick={() => router.push('/dashboard/certificados')} className="px-5 py-2.5 btn-outline-glow text-sm">
              Certificados
            </button>
            <button onClick={() => router.push('/dashboard/laudos/selecionar')} className="px-5 py-2.5 btn-glow text-sm">
              + Novo Laudo
            </button>
          </div>
        </div>

        {/* Barra de busca e filtros */}
        {!loadingLaudos && laudos.length > 0 && (
          <div className="dark-card p-4 mb-5 space-y-3">

            {/* Busca */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'rgba(255,255,255,0.25)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por empresa ou máquina..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.85)',
                }}
              />
              {busca && (
                <button onClick={() => setBusca('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>✕</button>
              )}
            </div>

            {/* Filtros por pill */}
            <div className="flex flex-wrap gap-4">

              {/* Status */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Status:</span>
                {['TODOS', 'CONCLUIDO', 'RASCUNHO', 'ARQUIVADO'].map(s => (
                  <FilterPill
                    key={s}
                    label={s === 'TODOS' ? 'Todos' : STATUS_STYLES[s]?.label || s}
                    active={filtroStatus === s}
                    onClick={() => setFiltroStatus(s)}
                  />
                ))}
              </div>

              {/* Tipo */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Tipo:</span>
                <FilterPill label="Todos" active={filtroTipo === 'TODOS'} onClick={() => setFiltroTipo('TODOS')} />
                {Object.entries(TIPO_LABELS).map(([key, label]) => (
                  <FilterPill key={key} label={label} active={filtroTipo === key} onClick={() => setFiltroTipo(key)} />
                ))}
              </div>

              {/* Mês */}
              {mesesDisponiveis.length > 1 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Mês:</span>
                  <FilterPill label="Todos" active={filtroMes === ''} onClick={() => setFiltroMes('')} />
                  {mesesDisponiveis.map(m => {
                    const [ano, mes] = m.split('-')
                    const label = new Date(Number(ano), Number(mes) - 1).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
                    return <FilterPill key={m} label={label} active={filtroMes === m} onClick={() => setFiltroMes(m)} />
                  })}
                </div>
              )}
            </div>

            {/* Limpar filtros */}
            {filtrosAtivos && (
              <div className="flex justify-end pt-1">
                <button onClick={limparFiltros} className="text-xs transition-colors" style={{ color: 'rgba(74,155,158,0.7)' }}
                  onMouseOver={e => e.currentTarget.style.color = '#4a9b9e'}
                  onMouseOut={e => e.currentTarget.style.color = 'rgba(74,155,158,0.7)'}
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        )}

        {/* Lista */}
        {loadingLaudos ? (
          <div className="dark-card p-12 text-center">
            <div className="flex items-center justify-center gap-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'rgba(74,155,158,0.5)', borderTopColor: 'transparent' }}></div>
              Carregando laudos...
            </div>
          </div>
        ) : laudos.length === 0 ? (
          <div className="dark-card p-16 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(74,155,158,0.1)' }}>
              <svg className="w-8 h-8" style={{ color: 'rgba(74,155,158,0.5)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="font-medium mb-1" style={{ color: 'rgba(255,255,255,0.7)' }}>Nenhum laudo criado ainda</p>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>Clique em "+ Novo Laudo" para começar</p>
            <button onClick={() => router.push('/dashboard/laudos/selecionar')} className="px-6 py-2.5 btn-glow text-sm">
              Criar Primeiro Laudo
            </button>
          </div>
        ) : laudosFiltrados.length === 0 ? (
          <div className="dark-card p-12 text-center">
            <p className="font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Nenhum laudo encontrado</p>
            <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Tente ajustar os filtros ou a busca</p>
            <button onClick={limparFiltros} className="text-sm" style={{ color: '#4a9b9e' }}>Limpar filtros</button>
          </div>
        ) : (
          <div className="space-y-3">
            {laudosFiltrados.map(laudo => {
              const statusInfo = STATUS_STYLES[laudo.status] || STATUS_STYLES.CONCLUIDO
              const tipoLabel = laudo.tipoLaudo ? TIPO_LABELS[laudo.tipoLaudo] || laudo.tipoLaudo : '—'

              return (
                <div key={laudo.id} className="card-glow-border p-5 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                      <h3 className="font-semibold text-white truncate">
                        {laudo.nomeMaquina}{laudo.modelo ? ` ${laudo.modelo}` : ''}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusInfo.classes}`}>
                        {statusInfo.label}
                      </span>
                      {laudo.tipoConclusao && (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${laudo.tipoConclusao === 'A' ? 'badge-success' : 'badge-warning'}`}>
                          Tipo {laudo.tipoConclusao}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs flex-wrap" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      <span>{laudo.nomeEmpresa}</span>
                      <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(74,155,158,0.3)' }}></span>
                      <span>{tipoLabel}</span>
                      <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(74,155,158,0.3)' }}></span>
                      <span>{laudo._count.dispositivosSeguranca} disp. | {laudo._count.perigos} perigos</span>
                      <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(74,155,158,0.3)' }}></span>
                      <span>{formatDate(laudo.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {laudo.pdfUrl && (
                      <a href={laudo.pdfUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 btn-outline-glow text-sm whitespace-nowrap">
                        Baixar PDF
                      </a>
                    )}
                    <button onClick={() => router.push(`/dashboard/laudos/${laudo.id}`)} className="px-4 py-2 btn-glow text-sm whitespace-nowrap">
                      Ver
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
