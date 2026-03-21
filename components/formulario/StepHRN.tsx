'use client'

import { useState } from 'react'

interface StepHRNProps {
  data: any
  onUpdate: (updates: any) => void
}

export function StepHRN({ data, onUpdate }: StepHRNProps) {
  const [expandedPerigo, setExpandedPerigo] = useState<string | null>(null)

  const calcularHRN = (lo: number, fe: number, dph: number, np: number) => lo * fe * dph * np

  const adicionarPerigo = () => {
    const newPerigo = {
      id: Date.now().toString(),
      cicloVida: '',
      numeroPerigo: '',
      tarefa: '',
      descricaoPerigo: '',
      loAntes: 1,
      feAntes: 1,
      dphAntes: 1,
      npAntes: 1,
      hrnAntes: 1,
      medidasEngenharia: '',
      loDepois: 1,
      feDepois: 1,
      dphDepois: 1,
      npDepois: 1,
      hrnDepois: 1,
    }
    const newPerigos = [...data.perigos, newPerigo]
    onUpdate({ perigos: newPerigos })
    setExpandedPerigo(newPerigo.id)
  }

  const removerPerigo = (id: string) => {
    onUpdate({ perigos: data.perigos.filter((p: any) => p.id !== id) })
  }

  const atualizarPerigo = (id: string, updates: any) => {
    const newPerigos = data.perigos.map((p: any) => (p.id === id ? { ...p, ...updates } : p))
    onUpdate({ perigos: newPerigos })
  }

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '1.5rem' }}>Análise de Riscos (HRN)</h2>

      <button onClick={adicionarPerigo} style={{ marginBottom: '1.5rem', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
        + Adicionar Perigo
      </button>

      {data.perigos.map((perigo: any, idx: number) => {
        const hrnAntes = calcularHRN(perigo.loAntes, perigo.feAntes, perigo.dphAntes, perigo.npAntes)
        const hrnDepois = calcularHRN(perigo.loDepois, perigo.feDepois, perigo.dphDepois, perigo.npDepois)
        const isExpanded = expandedPerigo === perigo.id

        return (
          <div key={perigo.id} style={{ marginBottom: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
            <div onClick={() => setExpandedPerigo(isExpanded ? null : perigo.id)} style={{ padding: '1rem', backgroundColor: '#f9f9f9', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: '500' }}>Perigo {idx + 1}: {perigo.numeroPerigo}</span>
                <span style={{ marginLeft: '1rem', fontSize: '12px', color: '#666' }}>HRN: {hrnAntes.toFixed(2)} → {hrnDepois.toFixed(2)}</span>
              </div>
              <span>{isExpanded ? '▼' : '▶'}</span>
            </div>

            {isExpanded && (
              <div style={{ padding: '1.5rem', borderTop: '1px solid #ddd' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <input type="text" value={perigo.numeroPerigo} onChange={(e) => atualizarPerigo(perigo.id, { numeroPerigo: e.target.value })} placeholder="Número" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box', marginBottom: '0.5rem' }} />
                  <textarea value={perigo.descricaoPerigo} onChange={(e) => atualizarPerigo(perigo.id, { descricaoPerigo: e.target.value })} placeholder="Descrição do perigo" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box', minHeight: '60px', marginBottom: '1rem' }} />
                </div>

                <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f0f7ff', borderRadius: '4px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 1rem 0' }}>HRN Antes</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '11px', color: '#666', fontWeight: '500', display: 'block', marginBottom: '4px' }}>LO (Probabilidade)</label>
                      <input type="number" step="0.1" value={perigo.loAntes} onChange={(e) => atualizarPerigo(perigo.id, { loAntes: parseFloat(e.target.value) || 0 })} placeholder="0-10" style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', color: '#666', fontWeight: '500', display: 'block', marginBottom: '4px' }}>FE (Frequência)</label>
                      <input type="number" step="0.1" value={perigo.feAntes} onChange={(e) => atualizarPerigo(perigo.id, { feAntes: parseFloat(e.target.value) || 0 })} placeholder="0-10" style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', color: '#666', fontWeight: '500', display: 'block', marginBottom: '4px' }}>DPH (Duração/Período)</label>
                      <input type="number" step="0.1" value={perigo.dphAntes} onChange={(e) => atualizarPerigo(perigo.id, { dphAntes: parseFloat(e.target.value) || 0 })} placeholder="0-10" style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', color: '#666', fontWeight: '500', display: 'block', marginBottom: '4px' }}>NP (Nº de Pessoas)</label>
                      <input type="number" step="0.1" value={perigo.npAntes} onChange={(e) => atualizarPerigo(perigo.id, { npAntes: parseFloat(e.target.value) || 0 })} placeholder="0-10" style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }} />
                    </div>
                  </div>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '13px', fontWeight: 'bold', color: '#0066cc' }}>HRN: {hrnAntes.toFixed(2)}</p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '0.5rem' }}>Medidas de Engenharia</label>
                  <textarea value={perigo.medidasEngenharia} onChange={(e) => atualizarPerigo(perigo.id, { medidasEngenharia: e.target.value })} placeholder="Descreva as medidas de engenharia implementadas" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px', boxSizing: 'border-box', minHeight: '60px' }} />
                </div>

                <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f0fff4', borderRadius: '4px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 1rem 0' }}>HRN Depois</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '11px', color: '#666', fontWeight: '500', display: 'block', marginBottom: '4px' }}>LO (Probabilidade)</label>
                      <input type="number" step="0.1" value={perigo.loDepois} onChange={(e) => atualizarPerigo(perigo.id, { loDepois: parseFloat(e.target.value) || 0 })} placeholder="0-10" style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', color: '#666', fontWeight: '500', display: 'block', marginBottom: '4px' }}>FE (Frequência)</label>
                      <input type="number" step="0.1" value={perigo.feDepois} onChange={(e) => atualizarPerigo(perigo.id, { feDepois: parseFloat(e.target.value) || 0 })} placeholder="0-10" style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', color: '#666', fontWeight: '500', display: 'block', marginBottom: '4px' }}>DPH (Duração/Período)</label>
                      <input type="number" step="0.1" value={perigo.dphDepois} onChange={(e) => atualizarPerigo(perigo.id, { dphDepois: parseFloat(e.target.value) || 0 })} placeholder="0-10" style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '11px', color: '#666', fontWeight: '500', display: 'block', marginBottom: '4px' }}>NP (Nº de Pessoas)</label>
                      <input type="number" step="0.1" value={perigo.npDepois} onChange={(e) => atualizarPerigo(perigo.id, { npDepois: parseFloat(e.target.value) || 0 })} placeholder="0-10" style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }} />
                    </div>
                  </div>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '13px', fontWeight: 'bold', color: '#28a745' }}>HRN: {hrnDepois.toFixed(2)}</p>
                </div>

                <button onClick={() => removerPerigo(perigo.id)} style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Remover</button>
              </div>
            )}
          </div>
        )
      })}

      {data.perigos.length === 0 && <p style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>Sem perigos</p>}
    </div>
  )
}
