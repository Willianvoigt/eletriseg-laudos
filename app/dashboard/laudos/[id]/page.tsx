'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface Dispositivo {
  id: string
  ordem: number
  descricao: string
  fotoUrl: string | null
}

interface Perigo {
  id: string
  ordem: number
  cicloVida: string
  numeroPerigo: string
  tarefa: string
  descricaoPerigo: string
  loAntes: number
  feAntes: number
  dphAntes: number
  npAntes: number
  hrnAntes: number
  classificacaoAntes: string
  medidasEngenharia: string
  loDepois: number
  feDepois: number
  dphDepois: number
  npDepois: number
  hrnDepois: number
  classificacaoDepois: string
}

interface LaudoDetalhe {
  id: string
  createdAt: string
  status: string
  tipoLaudo: string | null
  nomeEmpresa: string
  cnpj: string
  endereco: string
  dataAbertura: string | null
  atividadeEconomica: string | null
  nomeMaquina: string
  modelo: string | null
  numeroSerie: string | null
  setor: string | null
  descricaoFuncao: string | null
  fabricante: string | null
  anoFabricacao: string | null
  potenciaValor: string | null
  potenciaUnidade: string | null
  usoPretendido: string | null
  modoOperacao: string | null
  gravidadeLesao: string | null
  frequencia: string | null
  possibilidadeEvitar: string | null
  numeroArt: string | null
  tipoConclusao: string | null
  fotoPlacaMaquina: string | null
  fotoVisaoGeral: string | null
  pdfUrl: string | null
  dispositivosSeguranca: Dispositivo[]
  perigos: Perigo[]
}

const STATUS_STYLES: Record<string, { label: string; classes: string }> = {
  CONCLUIDO: { label: 'Concluído', classes: 'badge-success' },
  RASCUNHO: { label: 'Rascunho', classes: 'badge-warning' },
  ARQUIVADO: { label: 'Arquivado', classes: 'badge-neutral' },
}

const HRN_COLOR: Record<string, string> = {
  'Aceitável': '#22c55e',
  'Muito Baixo': '#86efac',
  'Baixo': '#a3e635',
  'Significante': '#facc15',
  'Alto': '#f97316',
  'Muito Alto': '#ef4444',
  'Extremo': '#991b1b',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="dark-card p-6 mb-4">
      <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: '#4a9b9e' }}>{title}</h2>
      {children}
    </div>
  )
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div>
      <div className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</div>
      <div className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{value}</div>
    </div>
  )
}

export default function LaudoDetalhePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [laudo, setLaudo] = useState<LaudoDetalhe | null>(null)
  const [loading, setLoading] = useState(true)
  const [gerandoPDF, setGerandoPDF] = useState(false)
  const [excluindo, setExcluindo] = useState(false)
  const [confirmarExclusao, setConfirmarExclusao] = useState(false)
  const [modalEmail, setModalEmail] = useState(false)
  const [emailDestino, setEmailDestino] = useState('')
  const [mensagemEmail, setMensagemEmail] = useState('')
  const [enviandoEmail, setEnviandoEmail] = useState(false)

  useEffect(() => {
    fetch(`/api/laudos/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject('Não encontrado'))
      .then(setLaudo)
      .catch(() => router.push('/dashboard'))
      .finally(() => setLoading(false))
  }, [id, router])

  const gerarPDF = async () => {
    if (!laudo) return
    setGerandoPDF(true)
    const { gerarPDFCliente } = await import('@/lib/pdf/client-generator')
    await gerarPDFCliente({
      tipoLaudo: laudo.tipoLaudo || undefined,
      empresaNome: laudo.nomeEmpresa,
      empresaCNPJ: laudo.cnpj,
      empresaEndereco: laudo.endereco,
      empresaDataAbertura: laudo.dataAbertura || '',
      empresaCNAE: laudo.atividadeEconomica || '',
      maquinaNome: laudo.nomeMaquina,
      maquinaModelo: laudo.modelo || '',
      maquinaSerial: laudo.numeroSerie || '',
      maquinaFabricante: laudo.fabricante || '',
      maquinaAno: laudo.anoFabricacao || '',
      maquinaSetor: laudo.setor || '',
      maquinaDescricao: laudo.descricaoFuncao || '',
      usoPretendido: laudo.usoPretendido || undefined,
      modoOperacao: laudo.modoOperacao || undefined,
      fotoPlacar: laudo.fotoPlacaMaquina || undefined,
      fotoVisaoGeral: laudo.fotoVisaoGeral || undefined,
      dispositivosSeguranca: laudo.dispositivosSeguranca.map(d => ({ descricao: d.descricao, foto: d.fotoUrl || undefined })),
      perigos: laudo.perigos.map(p => ({
        cicloVida: p.cicloVida,
        numeroPerigo: p.numeroPerigo,
        tarefa: p.tarefa,
        descricaoPerigo: p.descricaoPerigo,
        loAntes: p.loAntes, feAntes: p.feAntes, dphAntes: p.dphAntes, npAntes: p.npAntes, hrnAntes: p.hrnAntes,
        loDepois: p.loDepois, feDepois: p.feDepois, dphDepois: p.dphDepois, npDepois: p.npDepois, hrnDepois: p.hrnDepois,
        medidasEngenharia: p.medidasEngenharia,
      })),
      tipoConlusao: (laudo.tipoConclusao as 'A' | 'B') || 'B',
      artNumero: laudo.numeroArt || undefined,
    })
    setGerandoPDF(false)
  }

  const duplicar = () => {
    router.push(`/dashboard/laudos/novo?edit=${id}&duplicar=1`)
  }

  const enviarEmail = async () => {
    if (!emailDestino) return
    setEnviandoEmail(true)
    const res = await fetch(`/api/laudos/${id}/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailDestino, mensagem: mensagemEmail }),
    })
    setEnviandoEmail(false)
    if (res.ok) {
      alert('E-mail enviado com sucesso!')
      setModalEmail(false)
      setEmailDestino('')
      setMensagemEmail('')
    } else {
      const err = await res.json()
      alert(`Erro: ${err.error}`)
    }
  }

  const excluir = async () => {
    setExcluindo(true)
    const res = await fetch(`/api/laudos/${id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/dashboard')
    } else {
      setExcluindo(false)
      setConfirmarExclusao(false)
    }
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

  if (!laudo) return null

  const statusInfo = STATUS_STYLES[laudo.status] || STATUS_STYLES.CONCLUIDO

  return (
    <div className="min-h-screen">

      {/* Header */}
      <header className="sticky top-0 z-50" style={{ background: 'linear-gradient(135deg, #0a1a1f, #0d2b30)', borderBottom: '1px solid rgba(74,155,158,0.15)' }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => router.push('/dashboard')}
              className="text-sm transition-colors shrink-0"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseOver={e => e.currentTarget.style.color = '#4a9b9e'}
              onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              ← Voltar
            </button>
            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />
            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-white truncate">
                {laudo.nomeMaquina}{laudo.modelo ? ` ${laudo.modelo}` : ''}
              </h1>
              <p className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{laudo.nomeEmpresa}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <button onClick={gerarPDF} disabled={gerandoPDF} className="px-4 py-2 btn-glow text-sm disabled:opacity-50">
              {gerandoPDF ? 'Gerando...' : 'Gerar PDF'}
            </button>
            <button onClick={() => setModalEmail(true)} className="px-4 py-2 text-sm rounded-lg transition-colors"
              style={{ border: '1px solid rgba(74,155,158,0.3)', color: '#4a9b9e' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(74,155,158,0.1)' }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent' }}>
              Enviar por E-mail
            </button>
            <button onClick={() => router.push(`/dashboard/laudos/novo?edit=${id}`)} className="px-4 py-2 text-sm rounded-lg transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent' }}>
              Editar
            </button>
            <button onClick={duplicar} className="px-4 py-2 text-sm rounded-lg transition-colors"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}
              onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              onMouseOut={e => { e.currentTarget.style.background = 'transparent' }}>
              Duplicar
            </button>
            <button onClick={() => setConfirmarExclusao(true)} className="px-4 py-2 text-sm rounded-lg transition-colors"
              style={{ color: 'rgba(255,100,100,0.7)', border: '1px solid rgba(255,100,100,0.2)' }}
              onMouseOver={e => { e.currentTarget.style.color = '#ff6b7a'; e.currentTarget.style.background = 'rgba(220,53,69,0.1)' }}
              onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,100,100,0.7)'; e.currentTarget.style.background = 'transparent' }}>
              Excluir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* Status bar */}
        <div className="flex items-center gap-3 mb-6">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusInfo.classes}`}>{statusInfo.label}</span>
          {laudo.tipoConclusao && (
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${laudo.tipoConclusao === 'A' ? 'badge-success' : 'badge-warning'}`}>
              Tipo {laudo.tipoConclusao}
            </span>
          )}
          {laudo.tipoLaudo && (
            <span className="text-xs px-2.5 py-1 rounded-full font-medium badge-neutral">{laudo.tipoLaudo}</span>
          )}
          <span className="text-xs ml-auto" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {new Date(laudo.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Empresa */}
        <Section title="Empresa">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Field label="Razão Social" value={laudo.nomeEmpresa} />
            <Field label="CNPJ" value={laudo.cnpj} />
            <Field label="Endereço" value={laudo.endereco} />
            <Field label="Data de Abertura" value={laudo.dataAbertura || undefined} />
            <Field label="CNAE / Atividade Econômica" value={laudo.atividadeEconomica || undefined} />
          </div>
        </Section>

        {/* Máquina */}
        <Section title="Máquina / Equipamento">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Field label="Nome" value={laudo.nomeMaquina} />
            <Field label="Modelo" value={laudo.modelo || undefined} />
            <Field label="Número de Série" value={laudo.numeroSerie || undefined} />
            <Field label="Fabricante" value={laudo.fabricante || undefined} />
            <Field label="Ano de Fabricação" value={laudo.anoFabricacao || undefined} />
            <Field label="Setor" value={laudo.setor || undefined} />
            <Field label="Descrição / Função" value={laudo.descricaoFuncao || undefined} />
            {laudo.potenciaValor && <Field label="Potência" value={`${laudo.potenciaValor} ${laudo.potenciaUnidade || ''}`} />}
          </div>
          {(laudo.usoPretendido || laudo.modoOperacao) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <Field label="Uso Pretendido" value={laudo.usoPretendido || undefined} />
              <Field label="Modo de Operação" value={laudo.modoOperacao || undefined} />
            </div>
          )}
        </Section>

        {/* Fotos */}
        {(laudo.fotoPlacaMaquina || laudo.fotoVisaoGeral) && (
          <Section title="Fotos">
            <div className="grid grid-cols-2 gap-4">
              {laudo.fotoPlacaMaquina && (
                <div>
                  <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Placa da Máquina</p>
                  <img src={laudo.fotoPlacaMaquina} alt="Placa" className="rounded-lg w-full object-cover" style={{ maxHeight: '200px', border: '1px solid rgba(255,255,255,0.08)' }} />
                </div>
              )}
              {laudo.fotoVisaoGeral && (
                <div>
                  <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Visão Geral</p>
                  <img src={laudo.fotoVisaoGeral} alt="Visão Geral" className="rounded-lg w-full object-cover" style={{ maxHeight: '200px', border: '1px solid rgba(255,255,255,0.08)' }} />
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Dispositivos de Segurança */}
        {laudo.dispositivosSeguranca.length > 0 && (
          <Section title={`Dispositivos de Segurança (${laudo.dispositivosSeguranca.length})`}>
            <div className="space-y-2">
              {laudo.dispositivosSeguranca.map((d, i) => (
                <div key={d.id} className="flex items-start gap-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="text-xs font-mono shrink-0 mt-0.5" style={{ color: '#4a9b9e' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{d.descricao}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Perigos / HRN */}
        {laudo.perigos.length > 0 && (
          <Section title={`Análise de Riscos — HRN (${laudo.perigos.length} perigos)`}>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(74,155,158,0.2)' }}>
                    {['N°', 'Ciclo de Vida', 'Tarefa', 'Perigo', 'HRN Antes', 'Class. Antes', 'HRN Depois', 'Class. Depois'].map(h => (
                      <th key={h} className="text-left py-2 px-2 font-medium" style={{ color: '#4a9b9e' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {laudo.perigos.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                      onMouseOver={e => e.currentTarget.style.background = 'rgba(74,155,158,0.04)'}
                      onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td className="py-2 px-2 font-mono" style={{ color: '#4a9b9e' }}>{p.numeroPerigo}</td>
                      <td className="py-2 px-2" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.cicloVida}</td>
                      <td className="py-2 px-2" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '150px' }}>{p.tarefa}</td>
                      <td className="py-2 px-2" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '180px' }}>{p.descricaoPerigo}</td>
                      <td className="py-2 px-2 font-mono font-bold" style={{ color: HRN_COLOR[p.classificacaoAntes] || '#fff' }}>{p.hrnAntes}</td>
                      <td className="py-2 px-2">
                        <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: HRN_COLOR[p.classificacaoAntes] ? HRN_COLOR[p.classificacaoAntes] + '22' : 'transparent', color: HRN_COLOR[p.classificacaoAntes] || '#fff' }}>
                          {p.classificacaoAntes}
                        </span>
                      </td>
                      <td className="py-2 px-2 font-mono font-bold" style={{ color: HRN_COLOR[p.classificacaoDepois] || '#fff' }}>{p.hrnDepois}</td>
                      <td className="py-2 px-2">
                        <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: HRN_COLOR[p.classificacaoDepois] ? HRN_COLOR[p.classificacaoDepois] + '22' : 'transparent', color: HRN_COLOR[p.classificacaoDepois] || '#fff' }}>
                          {p.classificacaoDepois}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* Conclusão */}
        <Section title="Conclusão">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Field label="Tipo de Conclusão" value={laudo.tipoConclusao ? `Tipo ${laudo.tipoConclusao}` : undefined} />
            <Field label="N° ART" value={laudo.numeroArt || undefined} />
            <Field label="Gravidade da Lesão" value={laudo.gravidadeLesao || undefined} />
            <Field label="Frequência" value={laudo.frequencia || undefined} />
            <Field label="Possibilidade de Evitar" value={laudo.possibilidadeEvitar || undefined} />
          </div>
        </Section>

      </main>

      {/* Modal de e-mail */}
      {modalEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="dark-card p-6 w-full max-w-md">
            <h3 className="font-semibold text-white mb-1">Enviar Laudo por E-mail</h3>
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Serão enviados os dados do laudo de <strong className="text-white">{laudo?.nomeMaquina}</strong>
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>E-mail do destinatário *</label>
                <input
                  type="email"
                  value={emailDestino}
                  onChange={e => setEmailDestino(e.target.value)}
                  placeholder="cliente@empresa.com.br"
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' }}
                />
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Mensagem (opcional)</label>
                <textarea
                  value={mensagemEmail}
                  onChange={e => setMensagemEmail(e.target.value)}
                  placeholder="Prezado cliente, segue o laudo técnico NR-12..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' }}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setModalEmail(false)} disabled={enviandoEmail}
                className="flex-1 py-2.5 text-sm rounded-lg"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                Cancelar
              </button>
              <button onClick={enviarEmail} disabled={enviandoEmail || !emailDestino}
                className="flex-1 py-2.5 text-sm btn-glow disabled:opacity-50">
                {enviandoEmail ? 'Enviando...' : 'Enviar E-mail'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {confirmarExclusao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="dark-card p-8 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-2">Excluir laudo?</h3>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Esta ação não pode ser desfeita. O laudo de <strong className="text-white">{laudo.nomeMaquina}</strong> da empresa <strong className="text-white">{laudo.nomeEmpresa}</strong> será excluído permanentemente.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmarExclusao(false)}
                disabled={excluindo}
                className="flex-1 px-4 py-2.5 text-sm rounded-lg transition-colors"
                style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}
              >
                Cancelar
              </button>
              <button
                onClick={excluir}
                disabled={excluindo}
                className="flex-1 px-4 py-2.5 text-sm rounded-lg font-medium transition-colors disabled:opacity-50"
                style={{ background: 'rgba(220,53,69,0.2)', color: '#ff6b7a', border: '1px solid rgba(220,53,69,0.3)' }}
              >
                {excluindo ? 'Excluindo...' : 'Sim, excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
