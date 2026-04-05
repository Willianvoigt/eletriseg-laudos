'use client'

import { useState } from 'react'

interface StepHRNProps {
  data: any
  onUpdate: (updates: any) => void
}

const inp = (extra?: object) => ({
  width: '100%', padding: '8px', border: '1px solid #555', borderRadius: '4px',
  fontSize: '13px', boxSizing: 'border-box' as const, backgroundColor: '#1a1a1a', color: '#e0e0e0',
  ...extra,
})

export function StepHRN({ data, onUpdate }: StepHRNProps) {
  const [expandedPerigo, setExpandedPerigo] = useState<string | null>(null)
  const [uploadingFoto, setUploadingFoto] = useState<string | null>(null)

  const handleFotoPerigo = async (perigoId: string, file: File) => {
    if (!file) return
    setUploadingFoto(perigoId)
    try {
      const canvas = document.createElement('canvas')
      const img = new Image()
      img.onload = async () => {
        const maxW = 1200
        const scale = img.width > maxW ? maxW / img.width : 1
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(async (blob) => {
          if (!blob) { setUploadingFoto(null); return }
          const formData = new FormData()
          formData.append('file', blob)
          try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData })
            if (res.ok) { const { url } = await res.json(); atualizarPerigo(perigoId, { foto: url }) }
          } catch { }
          setUploadingFoto(null)
        }, 'image/jpeg', 0.8)
      }
      img.onerror = () => setUploadingFoto(null)
      img.src = URL.createObjectURL(file)
    } catch { setUploadingFoto(null) }
  }

  const calcularHRN = (lo: number, fe: number, dph: number, np: number) => lo * fe * dph * np

  const adicionarPerigo = () => {
    const newPerigo = {
      id: Date.now().toString(), cicloVida: '', numeroPerigo: '', tarefa: '', descricaoPerigo: '',
      loAntes: 1, feAntes: 1, dphAntes: 1, npAntes: 1, hrnAntes: 1,
      medidasEngenharia: '', loDepois: 1, feDepois: 1, dphDepois: 1, npDepois: 1, hrnDepois: 1,
    }
    onUpdate({ perigos: [...data.perigos, newPerigo] })
    setExpandedPerigo(newPerigo.id)
  }

  const removerPerigo = (id: string) => onUpdate({ perigos: data.perigos.filter((p: any) => p.id !== id) })

  const atualizarPerigo = (id: string, updates: any) => {
    onUpdate({ perigos: data.perigos.map((p: any) => p.id === id ? { ...p, ...updates } : p) })
  }

  const HRNField = ({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) => (
    <div>
      <label style={{ fontSize: '11px', color: '#aaa', fontWeight: '500', display: 'block', marginBottom: '4px' }}>{label}</label>
      <input type="number" step="0.1" value={value} onChange={e => onChange(parseFloat(e.target.value) || 0)} style={inp()} />
    </div>
  )

  return (
    <div>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '1.25rem', color: '#fff' }}>Análise de Riscos (HRN)</h2>

      <button onClick={adicionarPerigo} style={{ marginBottom: '1.25rem', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', width: '100%' }}>
        + Adicionar Perigo
      </button>

      {data.perigos.map((perigo: any, idx: number) => {
        const hrnAntes = calcularHRN(perigo.loAntes, perigo.feAntes, perigo.dphAntes, perigo.npAntes)
        const hrnDepois = calcularHRN(perigo.loDepois, perigo.feDepois, perigo.dphDepois, perigo.npDepois)
        const isExpanded = expandedPerigo === perigo.id

        return (
          <div key={perigo.id} style={{ marginBottom: '1rem', border: '1px solid #555', borderRadius: '6px', overflow: 'hidden' }}>
            {/* Header do perigo */}
            <div onClick={() => setExpandedPerigo(isExpanded ? null : perigo.id)}
              style={{ padding: '12px 16px', backgroundColor: '#2a2a2a', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
              <div style={{ minWidth: 0 }}>
                <span style={{ fontWeight: '500', color: '#e0e0e0', fontSize: '14px' }}>
                  Perigo {idx + 1}{perigo.numeroPerigo ? `: ${perigo.numeroPerigo}` : ''}
                </span>
                <div style={{ fontSize: '11px', color: '#aaa', marginTop: '2px' }}>
                  HRN: {hrnAntes.toFixed(2)} → {hrnDepois.toFixed(2)}
                </div>
              </div>
              <span style={{ color: '#e0e0e0', flexShrink: 0 }}>{isExpanded ? '▼' : '▶'}</span>
            </div>

            {isExpanded && (
              <div style={{ padding: '1rem', borderTop: '1px solid #555' }}>

                {/* Identificação */}
                <div style={{ marginBottom: '1rem' }}>
                  <input type="text" value={perigo.numeroPerigo} onChange={e => atualizarPerigo(perigo.id, { numeroPerigo: e.target.value })}
                    placeholder="Número do perigo" style={{ ...inp(), marginBottom: '0.5rem' }} />
                  <input type="text" value={perigo.cicloVida || ''} onChange={e => atualizarPerigo(perigo.id, { cicloVida: e.target.value })}
                    placeholder="Ciclo de vida (ex: Operação)" style={{ ...inp(), marginBottom: '0.5rem' }} />
                  <input type="text" value={perigo.tarefa || ''} onChange={e => atualizarPerigo(perigo.id, { tarefa: e.target.value })}
                    placeholder="Tarefa" style={{ ...inp(), marginBottom: '0.5rem' }} />
                  <textarea value={perigo.descricaoPerigo} onChange={e => atualizarPerigo(perigo.id, { descricaoPerigo: e.target.value })}
                    placeholder="Descrição do perigo" style={{ ...inp(), minHeight: '60px', marginBottom: '0' }} />
                </div>

                {/* Foto */}
                <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#1a1a1a', borderRadius: '4px', border: '1px solid #444' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '0.5rem', color: '#e0e0e0' }}>Foto do Perigo</label>
                  {perigo.foto ? (
                    <div style={{ position: 'relative' }}>
                      <img src={perigo.foto} alt="Foto do perigo" style={{ width: '100%', maxHeight: '180px', objectFit: 'contain', borderRadius: '4px', border: '1px solid #555' }} />
                      <button onClick={() => atualizarPerigo(perigo.id, { foto: '' })}
                        style={{ position: 'absolute', top: '4px', right: '4px', padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>
                        Remover
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input type="file" accept="image/*"
                        onChange={e => { const f = e.target.files?.[0]; if (f) handleFotoPerigo(perigo.id, f) }}
                        disabled={uploadingFoto === perigo.id}
                        style={{ fontSize: '12px', color: '#e0e0e0', width: '100%' }} />
                      {uploadingFoto === perigo.id && <p style={{ fontSize: '11px', color: '#aaa', marginTop: '4px' }}>Enviando foto...</p>}
                    </div>
                  )}
                </div>

                {/* HRN Antes */}
                <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#1a2f4f', borderRadius: '4px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 0.75rem 0', color: '#fff' }}>HRN Antes das Medidas</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
                    <HRNField label="LO — Probabilidade" value={perigo.loAntes} onChange={v => atualizarPerigo(perigo.id, { loAntes: v })} />
                    <HRNField label="FE — Frequência" value={perigo.feAntes} onChange={v => atualizarPerigo(perigo.id, { feAntes: v })} />
                    <HRNField label="DPH — Duração/Período" value={perigo.dphAntes} onChange={v => atualizarPerigo(perigo.id, { dphAntes: v })} />
                    <HRNField label="NP — Nº de Pessoas" value={perigo.npAntes} onChange={v => atualizarPerigo(perigo.id, { npAntes: v })} />
                  </div>
                  <p style={{ margin: '0.75rem 0 0 0', fontSize: '14px', fontWeight: 'bold', color: '#4da6ff' }}>HRN: {hrnAntes.toFixed(2)}</p>
                </div>

                {/* Medidas */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '0.5rem', color: '#e0e0e0' }}>Medidas de Engenharia</label>
                  <textarea value={perigo.medidasEngenharia} onChange={e => atualizarPerigo(perigo.id, { medidasEngenharia: e.target.value })}
                    placeholder="Descreva as medidas implementadas" style={{ ...inp(), minHeight: '60px' }} />
                </div>

                {/* HRN Depois */}
                <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#1a3a2a', borderRadius: '4px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 0.75rem 0', color: '#fff' }}>HRN Depois das Medidas</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
                    <HRNField label="LO — Probabilidade" value={perigo.loDepois} onChange={v => atualizarPerigo(perigo.id, { loDepois: v })} />
                    <HRNField label="FE — Frequência" value={perigo.feDepois} onChange={v => atualizarPerigo(perigo.id, { feDepois: v })} />
                    <HRNField label="DPH — Duração/Período" value={perigo.dphDepois} onChange={v => atualizarPerigo(perigo.id, { dphDepois: v })} />
                    <HRNField label="NP — Nº de Pessoas" value={perigo.npDepois} onChange={v => atualizarPerigo(perigo.id, { npDepois: v })} />
                  </div>
                  <p style={{ margin: '0.75rem 0 0 0', fontSize: '14px', fontWeight: 'bold', color: '#28a745' }}>HRN: {hrnDepois.toFixed(2)}</p>
                </div>

                <button onClick={() => removerPerigo(perigo.id)}
                  style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', width: '100%' }}>
                  Remover Perigo
                </button>
              </div>
            )}
          </div>
        )
      })}

      {data.perigos.length === 0 && <p style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>Nenhum perigo adicionado</p>}
    </div>
  )
}
