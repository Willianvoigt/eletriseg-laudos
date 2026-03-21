'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const TIPO_LABELS: Record<string, string> = {
  'centro-dobra': 'Centro de Dobra',
  'dobradeira': 'Dobradeira',
  'corte-laser': 'Corte a Laser',
  'laser-tubo': 'Laser Tubo',
}

const STATUS_LABELS: Record<string, { label: string; cor: string; bg: string }> = {
  CONCLUIDO: { label: 'Concluído', cor: '#155724', bg: '#d4edda' },
  RASCUNHO: { label: 'Rascunho', cor: '#856404', bg: '#fff3cd' },
  ARQUIVADO: { label: 'Arquivado', cor: '#383d41', bg: '#e2e3e5' },
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

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [laudos, setLaudos] = useState<LaudoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingLaudos, setLoadingLaudos] = useState(true)
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
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{ backgroundColor: 'white', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#4a9b9e' }}>EletriSeg</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Header da seção */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '4px' }}>Meus Laudos</h2>
            <p style={{ fontSize: '14px', color: '#888' }}>
              {laudos.length} {laudos.length === 1 ? 'laudo gerado' : 'laudos gerados'}
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard/laudos/selecionar')}
            style={{
              padding: '10px 24px',
              backgroundColor: '#4a9b9e',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            + Novo Laudo
          </button>
        </div>

        {/* Lista de laudos */}
        {loadingLaudos ? (
          <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '8px', textAlign: 'center', color: '#888' }}>
            Carregando laudos...
          </div>
        ) : laudos.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            padding: '3rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📋</div>
            <p style={{ color: '#666', marginBottom: '8px', fontSize: '16px' }}>Nenhum laudo criado ainda.</p>
            <p style={{ color: '#999', fontSize: '13px' }}>Clique em "+ Novo Laudo" para começar.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {laudos.map(laudo => {
              const statusInfo = STATUS_LABELS[laudo.status] || STATUS_LABELS.CONCLUIDO
              const tipoLabel = laudo.tipoLaudo ? TIPO_LABELS[laudo.tipoLaudo] || laudo.tipoLaudo : '—'

              return (
                <div
                  key={laudo.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontWeight: '600', fontSize: '16px' }}>
                        {laudo.nomeMaquina}{laudo.modelo ? ` ${laudo.modelo}` : ''}
                      </span>
                      <span style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        backgroundColor: statusInfo.bg,
                        color: statusInfo.cor,
                        fontWeight: '500',
                      }}>
                        {statusInfo.label}
                      </span>
                      {laudo.tipoConclusao && (
                        <span style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          backgroundColor: laudo.tipoConclusao === 'A' ? '#d4edda' : '#fff3cd',
                          color: laudo.tipoConclusao === 'A' ? '#155724' : '#856404',
                          fontWeight: '500',
                        }}>
                          Tipo {laudo.tipoConclusao}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '13px', color: '#666', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <span>{laudo.nomeEmpresa}</span>
                      <span>|</span>
                      <span>{tipoLabel}</span>
                      <span>|</span>
                      <span>{laudo._count.dispositivosSeguranca} dispositivos</span>
                      <span>|</span>
                      <span>{laudo._count.perigos} perigos</span>
                      <span>|</span>
                      <span>{formatDate(laudo.createdAt)}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {laudo.pdfUrl && (
                      <a
                        href={laudo.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#4a9b9e',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '500',
                          textDecoration: 'none',
                          display: 'inline-block',
                        }}
                      >
                        Baixar PDF
                      </a>
                    )}
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
