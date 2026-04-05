'use client'

import { useEffect, useState } from 'react'

interface StepEmpresaProps {
  data: any
  onUpdate: (updates: any) => void
}

interface EmpresaCadastrada {
  id: string
  nomeEmpresa: string
  cnpj: string
  endereco: string
  dataAbertura: string | null
  atividadeEconomica: string | null
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #555',
  borderRadius: '4px',
  fontSize: '14px',
  boxSizing: 'border-box' as const,
  backgroundColor: '#2a2a2a',
  color: '#e0e0e0',
}

export function StepEmpresa({ data, onUpdate }: StepEmpresaProps) {
  const [empresasCadastradas, setEmpresasCadastradas] = useState<EmpresaCadastrada[]>([])
  const [mostrarSeletor, setMostrarSeletor] = useState(false)

  useEffect(() => {
    fetch('/api/empresas')
      .then(r => r.ok ? r.json() : [])
      .then(setEmpresasCadastradas)
      .catch(() => {})
  }, [])

  const formatCNPJ = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 2) return cleaned
    if (cleaned.length <= 5) return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`
    if (cleaned.length <= 8) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`
    if (cleaned.length <= 12) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12, 14)}`
  }

  const selecionarEmpresa = (e: EmpresaCadastrada) => {
    onUpdate({
      nomeEmpresa: e.nomeEmpresa,
      cnpj: e.cnpj,
      endereco: e.endereco || '',
      dataAbertura: e.dataAbertura || '',
      atividadeEconomica: e.atividadeEconomica || '',
    })
    setMostrarSeletor(false)
  }

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>Dados da Empresa</h2>

      {/* Seletor de empresa cadastrada */}
      {empresasCadastradas.length > 0 && (
        <div style={{ marginBottom: '1.5rem', padding: '12px 16px', borderRadius: '8px', background: 'rgba(74,155,158,0.08)', border: '1px solid rgba(74,155,158,0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
              {empresasCadastradas.length} empresa{empresasCadastradas.length > 1 ? 's' : ''} cadastrada{empresasCadastradas.length > 1 ? 's' : ''}
            </span>
            <button
              type="button"
              onClick={() => setMostrarSeletor(v => !v)}
              style={{ fontSize: '13px', color: '#4a9b9e', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              {mostrarSeletor ? 'Fechar' : '⚡ Carregar empresa cadastrada'}
            </button>
          </div>
          {mostrarSeletor && (
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {empresasCadastradas.map(e => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => selecionarEmpresa(e)}
                  style={{
                    textAlign: 'left', padding: '10px 12px', borderRadius: '6px', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    color: '#e0e0e0', fontSize: '13px',
                  }}
                  onMouseOver={ev => ev.currentTarget.style.background = 'rgba(74,155,158,0.12)'}
                  onMouseOut={ev => ev.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                >
                  <div style={{ fontWeight: 600 }}>{e.nomeEmpresa}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{e.cnpj}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>Nome da Empresa *</label>
        <input type="text" value={data.nomeEmpresa} onChange={(e) => onUpdate({ nomeEmpresa: e.target.value })}
          placeholder="Ex: ABC Indústria Ltda" style={inputStyle} />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>CNPJ *</label>
        <input type="text" value={data.cnpj} onChange={(e) => onUpdate({ cnpj: formatCNPJ(e.target.value) })}
          placeholder="00.000.000/0000-00" style={inputStyle} />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>Endereço *</label>
        <input type="text" value={data.endereco} onChange={(e) => onUpdate({ endereco: e.target.value })}
          placeholder="Rua, número, bairro, cidade" style={inputStyle} />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>Data de Abertura *</label>
        <input type="date" value={data.dataAbertura} onChange={(e) => onUpdate({ dataAbertura: e.target.value })} style={inputStyle} />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>Atividade Econômica (CNAE) *</label>
        <input type="text" value={data.atividadeEconomica} onChange={(e) => onUpdate({ atividadeEconomica: e.target.value })}
          placeholder="Ex: Fabricação de máquinas e equipamentos" style={inputStyle} />
      </div>
    </div>
  )
}
