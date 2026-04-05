'use client'

interface StepMaquinaProps {
  data: any
  onUpdate: (updates: any) => void
}

const inp = { width: '100%', padding: '10px', border: '1px solid #555', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' as const, backgroundColor: '#2a2a2a', color: '#e0e0e0' }
const lbl = { display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0', fontSize: '14px' }
const field = { marginBottom: '1.25rem' }

export function StepMaquina({ data, onUpdate }: StepMaquinaProps) {
  return (
    <div>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '1.25rem', color: '#fff' }}>Dados da Máquina</h2>

      <div style={field}>
        <label style={lbl}>Nome/Tipo da Máquina *</label>
        <input type="text" value={data.nomeMaquina} onChange={e => onUpdate({ nomeMaquina: e.target.value })} placeholder="Ex: Prensa Hidráulica" style={inp} />
      </div>

      {/* Modelo + Série — coluna única em mobile */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <label style={lbl}>Modelo *</label>
          <input type="text" value={data.modelo} onChange={e => onUpdate({ modelo: e.target.value })} placeholder="Ex: PHI-500" style={inp} />
        </div>
        <div>
          <label style={lbl}>Série *</label>
          <input type="text" value={data.numeroSerie} onChange={e => onUpdate({ numeroSerie: e.target.value })} placeholder="Ex: 12345ABC" style={inp} />
        </div>
      </div>

      <div style={field}>
        <label style={lbl}>Setor *</label>
        <input type="text" value={data.setor} onChange={e => onUpdate({ setor: e.target.value })} placeholder="Ex: Produção" style={inp} />
      </div>

      <div style={field}>
        <label style={lbl}>Descrição da Função *</label>
        <textarea value={data.descricaoFuncao} onChange={e => onUpdate({ descricaoFuncao: e.target.value })} placeholder="Descreva o funcionamento da máquina" style={{ ...inp, minHeight: '90px' }} />
      </div>

      {/* Fabricante + Ano */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
        <div>
          <label style={lbl}>Fabricante *</label>
          <input type="text" value={data.fabricante} onChange={e => onUpdate({ fabricante: e.target.value })} placeholder="Ex: PHI Industrial" style={inp} />
        </div>
        <div>
          <label style={lbl}>Ano de Fabricação *</label>
          <input type="text" value={data.anoFabricacao} onChange={e => onUpdate({ anoFabricacao: e.target.value.slice(0, 4) })} placeholder="2020" style={inp} />
        </div>
      </div>

      {/* Potência + Unidade */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '1rem' }}>
        <div>
          <label style={lbl}>Potência *</label>
          <input type="text" value={data.potenciaValor} onChange={e => onUpdate({ potenciaValor: e.target.value })} placeholder="Ex: 10" style={inp} />
        </div>
        <div>
          <label style={lbl}>Unidade</label>
          <select value={data.potenciaUnidade} onChange={e => onUpdate({ potenciaUnidade: e.target.value })} style={inp}>
            <option>kW</option>
            <option>CV</option>
            <option>HP</option>
          </select>
        </div>
      </div>
    </div>
  )
}
