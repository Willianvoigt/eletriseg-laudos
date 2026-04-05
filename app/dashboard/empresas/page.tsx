'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Empresa {
  id: string
  nomeEmpresa: string
  cnpj: string
  endereco: string
  dataAbertura: string | null
  atividadeEconomica: string | null
  createdAt: string
}

const EMPTY: Omit<Empresa, 'id' | 'createdAt'> = {
  nomeEmpresa: '', cnpj: '', endereco: '', dataAbertura: null, atividadeEconomica: null
}

function formatCNPJ(v: string) {
  const c = v.replace(/\D/g, '')
  if (c.length <= 2) return c
  if (c.length <= 5) return `${c.slice(0, 2)}.${c.slice(2)}`
  if (c.length <= 8) return `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5)}`
  if (c.length <= 12) return `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5, 8)}/${c.slice(8)}`
  return `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5, 8)}/${c.slice(8, 12)}-${c.slice(12, 14)}`
}

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<null | 'novo' | Empresa>(null)
  const [form, setForm] = useState(EMPTY)
  const [salvando, setSalvando] = useState(false)
  const [excluindo, setExcluindo] = useState<string | null>(null)
  const router = useRouter()

  const fetchEmpresas = async () => {
    const res = await fetch('/api/empresas')
    if (res.ok) setEmpresas(await res.json())
    setLoading(false)
  }

  useEffect(() => { fetchEmpresas() }, [])

  const abrirNovo = () => { setForm(EMPTY); setModal('novo') }
  const abrirEditar = (e: Empresa) => {
    setForm({ nomeEmpresa: e.nomeEmpresa, cnpj: e.cnpj, endereco: e.endereco, dataAbertura: e.dataAbertura, atividadeEconomica: e.atividadeEconomica })
    setModal(e)
  }

  const salvar = async () => {
    if (!form.nomeEmpresa || !form.cnpj) { alert('Nome e CNPJ obrigatórios'); return }
    setSalvando(true)
    const isEdit = modal !== 'novo'
    const url = isEdit ? `/api/empresas/${(modal as Empresa).id}` : '/api/empresas'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) { await fetchEmpresas(); setModal(null) }
    setSalvando(false)
  }

  const excluir = async (id: string) => {
    setExcluindo(id)
    await fetch(`/api/empresas/${id}`, { method: 'DELETE' })
    setEmpresas(prev => prev.filter(e => e.id !== id))
    setExcluindo(null)
  }

  const inputStyle = {
    width: '100%', padding: '9px 12px', borderRadius: '8px', fontSize: '14px',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.85)', outline: 'none', boxSizing: 'border-box' as const,
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50" style={{ background: 'linear-gradient(135deg, #0a1a1f, #0d2b30)', borderBottom: '1px solid rgba(74,155,158,0.15)' }}>
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/dashboard')} className="text-sm transition-colors"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseOver={e => e.currentTarget.style.color = '#4a9b9e'}
              onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
              ← Voltar
            </button>
            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />
            <h1 className="text-sm font-semibold text-white">Cadastro de Empresas</h1>
          </div>
          <button onClick={abrirNovo} className="px-4 py-2 btn-glow text-sm">+ Nova Empresa</button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Empresas cadastradas são carregadas automaticamente ao criar um novo laudo.
        </p>

        {loading ? (
          <div className="dark-card p-12 text-center">
            <div className="flex items-center justify-center gap-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'rgba(74,155,158,0.5)', borderTopColor: 'transparent' }}></div>
              Carregando...
            </div>
          </div>
        ) : empresas.length === 0 ? (
          <div className="dark-card p-16 text-center">
            <p className="font-medium mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>Nenhuma empresa cadastrada</p>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>Cadastre empresas para agilizar o preenchimento dos laudos</p>
            <button onClick={abrirNovo} className="px-6 py-2.5 btn-glow text-sm">Cadastrar Primeira Empresa</button>
          </div>
        ) : (
          <div className="space-y-3">
            {empresas.map(e => (
              <div key={e.id} className="card-glow-border p-5 flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white truncate">{e.nomeEmpresa}</p>
                  <div className="flex gap-3 text-xs mt-1 flex-wrap" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    <span>{e.cnpj}</span>
                    {e.endereco && <><span>•</span><span className="truncate">{e.endereco}</span></>}
                    {e.atividadeEconomica && <><span>•</span><span className="truncate">{e.atividadeEconomica}</span></>}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => abrirEditar(e)} className="px-3 py-1.5 text-xs rounded-lg transition-colors"
                    style={{ border: '1px solid rgba(74,155,158,0.3)', color: '#4a9b9e' }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(74,155,158,0.1)'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                    Editar
                  </button>
                  <button onClick={() => excluir(e.id)} disabled={excluindo === e.id}
                    className="px-3 py-1.5 text-xs rounded-lg transition-colors disabled:opacity-40"
                    style={{ border: '1px solid rgba(255,100,100,0.2)', color: 'rgba(255,100,100,0.6)' }}
                    onMouseOver={ev => ev.currentTarget.style.background = 'rgba(220,53,69,0.1)'}
                    onMouseOut={ev => ev.currentTarget.style.background = 'transparent'}>
                    {excluindo === e.id ? '...' : 'Excluir'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="dark-card p-6 w-full max-w-md">
            <h2 className="font-semibold text-white mb-5">{modal === 'novo' ? 'Nova Empresa' : 'Editar Empresa'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Nome da Empresa *</label>
                <input style={inputStyle} value={form.nomeEmpresa} onChange={e => setForm(f => ({ ...f, nomeEmpresa: e.target.value }))} placeholder="ABC Indústria Ltda" />
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>CNPJ *</label>
                <input style={inputStyle} value={form.cnpj} onChange={e => setForm(f => ({ ...f, cnpj: formatCNPJ(e.target.value) }))} placeholder="00.000.000/0000-00" />
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Endereço</label>
                <input style={inputStyle} value={form.endereco || ''} onChange={e => setForm(f => ({ ...f, endereco: e.target.value }))} placeholder="Rua, número, bairro, cidade" />
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Data de Abertura</label>
                <input type="date" style={inputStyle} value={form.dataAbertura || ''} onChange={e => setForm(f => ({ ...f, dataAbertura: e.target.value || null }))} />
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Atividade Econômica (CNAE)</label>
                <input style={inputStyle} value={form.atividadeEconomica || ''} onChange={e => setForm(f => ({ ...f, atividadeEconomica: e.target.value || null }))} placeholder="Ex: Fabricação de máquinas" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 text-sm rounded-lg transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                Cancelar
              </button>
              <button onClick={salvar} disabled={salvando} className="flex-1 py-2.5 text-sm btn-glow disabled:opacity-50">
                {salvando ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
