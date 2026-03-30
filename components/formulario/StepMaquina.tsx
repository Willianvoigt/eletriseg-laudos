'use client'

interface StepMaquinaProps {
  data: any
  onUpdate: (updates: any) => void
}

export function StepMaquina({ data, onUpdate }: StepMaquinaProps) {
  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>Dados da Máquina</h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>
          Nome/Tipo da Máquina *
        </label>
        <input
          type="text"
          value={data.nomeMaquina}
          onChange={(e) => onUpdate({ nomeMaquina: e.target.value })}
          placeholder="Ex: Prensa Hidráulica"
          style={{ width: '100%', padding: '10px', border: '1px solid #555', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>Modelo *</label>
          <input
            type="text"
            value={data.modelo}
            onChange={(e) => onUpdate({ modelo: e.target.value })}
            placeholder="Ex: PHI-500"
            style={{ width: '100%', padding: '10px', border: '1px solid #555', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>Série *</label>
          <input
            type="text"
            value={data.numeroSerie}
            onChange={(e) => onUpdate({ numeroSerie: e.target.value })}
            placeholder="Ex: 12345ABC"
            style={{ width: '100%', padding: '10px', border: '1px solid #555', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>Setor *</label>
        <input
          type="text"
          value={data.setor}
          onChange={(e) => onUpdate({ setor: e.target.value })}
          placeholder="Ex: Produção"
          style={{ width: '100%', padding: '10px', border: '1px solid #555', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>Descrição da Função *</label>
        <textarea
          value={data.descricaoFuncao}
          onChange={(e) => onUpdate({ descricaoFuncao: e.target.value })}
          placeholder="Descreva o funcionamento da máquina"
          style={{ width: '100%', padding: '10px', border: '1px solid #555', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', minHeight: '100px', backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>Fabricante *</label>
          <input
            type="text"
            value={data.fabricante}
            onChange={(e) => onUpdate({ fabricante: e.target.value })}
            placeholder="Ex: PHI Industrial"
            style={{ width: '100%', padding: '10px', border: '1px solid #555', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>Ano de Fabricação *</label>
          <input
            type="text"
            value={data.anoFabricacao}
            onChange={(e) => onUpdate({ anoFabricacao: e.target.value.slice(0, 4) })}
            placeholder="2020"
            style={{ width: '100%', padding: '10px', border: '1px solid #555', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>Potência *</label>
          <input
            type="text"
            value={data.potenciaValor}
            onChange={(e) => onUpdate({ potenciaValor: e.target.value })}
            placeholder="Ex: 10"
            style={{ width: '100%', padding: '10px', border: '1px solid #555', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>Unidade</label>
          <select
            value={data.potenciaUnidade}
            onChange={(e) => onUpdate({ potenciaUnidade: e.target.value })}
            style={{ width: '100%', padding: '10px', border: '1px solid #555', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
          >
            <option>kW</option>
            <option>CV</option>
            <option>HP</option>
          </select>
        </div>
      </div>
    </div>
  )
}
