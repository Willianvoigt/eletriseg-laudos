'use client'

interface StepEmpresaProps {
  data: any
  onUpdate: (updates: any) => void
}

export function StepEmpresa({ data, onUpdate }: StepEmpresaProps) {
  const formatCNPJ = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 2) return cleaned
    if (cleaned.length <= 5) return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`
    if (cleaned.length <= 8) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`
    if (cleaned.length <= 12) {
      return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`
    }
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12, 14)}`
  }

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>Dados da Empresa</h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>
          Nome da Empresa *
        </label>
        <input
          type="text"
          value={data.nomeEmpresa}
          onChange={(e) => onUpdate({ nomeEmpresa: e.target.value })}
          placeholder="Ex: ABC Indústria Ltda"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #555',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box',
            backgroundColor: '#2a2a2a',
            color: '#e0e0e0',
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>
          CNPJ *
        </label>
        <input
          type="text"
          value={data.cnpj}
          onChange={(e) => onUpdate({ cnpj: formatCNPJ(e.target.value) })}
          placeholder="00.000.000/0000-00"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #555',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box',
            backgroundColor: '#2a2a2a',
            color: '#e0e0e0',
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>
          Endereço *
        </label>
        <input
          type="text"
          value={data.endereco}
          onChange={(e) => onUpdate({ endereco: e.target.value })}
          placeholder="Rua, número, bairro, cidade"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #555',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box',
            backgroundColor: '#2a2a2a',
            color: '#e0e0e0',
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>
          Data de Abertura *
        </label>
        <input
          type="date"
          value={data.dataAbertura}
          onChange={(e) => onUpdate({ dataAbertura: e.target.value })}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #555',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box',
            backgroundColor: '#2a2a2a',
            color: '#e0e0e0',
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>
          Atividade Econômica (CNAE) *
        </label>
        <input
          type="text"
          value={data.atividadeEconomica}
          onChange={(e) => onUpdate({ atividadeEconomica: e.target.value })}
          placeholder="Ex: Fabricação de máquinas e equipamentos"
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #555',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box',
            backgroundColor: '#2a2a2a',
            color: '#e0e0e0',
          }}
        />
      </div>
    </div>
  )
}
