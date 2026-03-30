'use client'

interface StepConclusaoProps {
  data: any
  onUpdate: (updates: any) => void
}

export function StepConclusao({ data, onUpdate }: StepConclusaoProps) {
  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>Conclusão e Documentação</h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '500', color: '#e0e0e0' }}>Tipo de Conclusão</label>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', cursor: 'pointer', color: '#e0e0e0' }}>
            <input
              type="radio"
              name="tipoConclusao"
              value="A"
              checked={data.tipoConclusao === 'A'}
              onChange={(e) => onUpdate({ tipoConclusao: e.target.value })}
              style={{ marginRight: '0.5rem', cursor: 'pointer' }}
            />
            <span>
              <strong>Tipo A - Pré-adequação</strong>
              <p style={{ fontSize: '12px', color: '#aaa', margin: '0.25rem 0 0 0' }}>Para máquinas que ainda não estão em conformidade</p>
            </span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#e0e0e0' }}>
            <input
              type="radio"
              name="tipoConclusao"
              value="B"
              checked={data.tipoConclusao === 'B'}
              onChange={(e) => onUpdate({ tipoConclusao: e.target.value })}
              style={{ marginRight: '0.5rem', cursor: 'pointer' }}
            />
            <span>
              <strong>Tipo B - Aprovado</strong>
              <p style={{ fontSize: '12px', color: '#aaa', margin: '0.25rem 0 0 0' }}>Para máquinas em conformidade com a NR-12</p>
            </span>
          </label>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>
          Número da ART (Anotação de Responsabilidade Técnica)
        </label>
        <input
          type="text"
          value={data.numeroArt}
          onChange={(e) => onUpdate({ numeroArt: e.target.value })}
          placeholder="Ex: 1234567/89"
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

      <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#1a2f4f', borderRadius: '4px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 1rem 0', color: '#fff' }}>Resumo do Laudo</h3>
        <p style={{ margin: '0.5rem 0', fontSize: '13px', color: '#e0e0e0' }}>
          <strong>Empresa:</strong> {data.nomeEmpresa}
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '13px', color: '#e0e0e0' }}>
          <strong>Máquina:</strong> {data.nomeMaquina} ({data.modelo})
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '13px', color: '#e0e0e0' }}>
          <strong>Dispositivos de Segurança:</strong> {data.dispositivosSeguranca.length} itens
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '13px', color: '#e0e0e0' }}>
          <strong>Perigos Analisados:</strong> {data.perigos.length} riscos
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '13px', color: '#e0e0e0' }}>
          <strong>Conclusão:</strong> Tipo {data.tipoConclusao === 'A' ? 'A (Pré-adequação)' : 'B (Aprovado)'}
        </p>
      </div>

      <p style={{ fontSize: '12px', color: '#888', textAlign: 'center' }}>
        ✓ Laudo pronto para ser gerado em PDF. Clique em "Gerar PDF" para finalizar.
      </p>
    </div>
  )
}
