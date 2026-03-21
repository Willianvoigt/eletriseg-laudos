'use client'

const TIPOS_USO = ['A', 'B', 'C', 'D']
const TREINAMENTOS = ['NR-12', 'ABNT NBR 14860', 'ABNT NBR 14853', 'Outro']

interface StepLimitesProps {
  data: any
  onUpdate: (updates: any) => void
}

export function StepLimites({ data, onUpdate }: StepLimitesProps) {
  const toggleTipoUso = (tipo: string) => {
    const newTipos = data.tipoUso.includes(tipo)
      ? data.tipoUso.filter((t: string) => t !== tipo)
      : [...data.tipoUso, tipo]
    onUpdate({ tipoUso: newTipos })
  }

  const toggleTreinamento = (treinamento: string) => {
    const newTreinamentos = data.treinamentos.includes(treinamento)
      ? data.treinamentos.filter((t: string) => t !== treinamento)
      : [...data.treinamentos, treinamento]
    onUpdate({ treinamentos: newTreinamentos })
  }

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '1.5rem' }}>Limites da Máquina</h2>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
          Uso Pretendido
        </label>
        <textarea
          value={data.usoPretendido || ''}
          onChange={(e) => onUpdate({ usoPretendido: e.target.value })}
          placeholder="Descreva o uso pretendido da máquina..."
          rows={3}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            resize: 'vertical',
          }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
          Modo de Operação
        </label>
        <textarea
          value={data.modoOperacao || ''}
          onChange={(e) => onUpdate({ modoOperacao: e.target.value })}
          placeholder="Descreva o modo de operação da máquina..."
          rows={5}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            resize: 'vertical',
          }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '1rem' }}>Tipo de Uso</h3>
        {TIPOS_USO.map((tipo) => (
          <label key={tipo} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={data.tipoUso.includes(tipo)}
              onChange={() => toggleTipoUso(tipo)}
              style={{ marginRight: '0.5rem', cursor: 'pointer' }}
            />
            <span>Tipo {tipo}</span>
          </label>
        ))}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '1rem' }}>Restrições</h3>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={data.restricaoMotora}
            onChange={(e) => onUpdate({ restricaoMotora: e.target.checked })}
            style={{ marginRight: '0.5rem', cursor: 'pointer' }}
          />
          <span>Restrição Motora</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={data.restricaoSexo}
            onChange={(e) => onUpdate({ restricaoSexo: e.target.checked })}
            style={{ marginRight: '0.5rem', cursor: 'pointer' }}
          />
          <span>Restrição de Sexo</span>
        </label>
      </div>

      <div>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '1rem' }}>Treinamentos Necessários</h3>
        {TREINAMENTOS.map((treinamento) => (
          <label key={treinamento} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.8rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={data.treinamentos.includes(treinamento)}
              onChange={() => toggleTreinamento(treinamento)}
              style={{ marginRight: '0.5rem', cursor: 'pointer' }}
            />
            <span>{treinamento}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
