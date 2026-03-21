'use client'

interface StepConclusaoProps {
  data: any
  onUpdate: (updates: any) => void
}

export function StepConclusao({ data, onUpdate }: StepConclusaoProps) {
  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '1.5rem' }}>Conclusão e Documentação</h2>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '500' }}>Tipo de Conclusão</label>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', cursor: 'pointer' }}>
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
              <p style={{ fontSize: '12px', color: '#666', margin: '0.25rem 0 0 0' }}>Para máquinas que ainda não estão em conformidade</p>
            </span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
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
              <p style={{ fontSize: '12px', color: '#666', margin: '0.25rem 0 0 0' }}>Para máquinas em conformidade com a NR-12</p>
            </span>
          </label>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
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
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f0f7ff', borderRadius: '4px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 1rem 0' }}>Resumo do Laudo</h3>
        <p style={{ margin: '0.5rem 0', fontSize: '13px' }}>
          <strong>Empresa:</strong> {data.nomeEmpresa}
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '13px' }}>
          <strong>Máquina:</strong> {data.nomeMaquina} ({data.modelo})
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '13px' }}>
          <strong>Dispositivos de Segurança:</strong> {data.dispositivosSeguranca.length} itens
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '13px' }}>
          <strong>Perigos Analisados:</strong> {data.perigos.length} riscos
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '13px' }}>
          <strong>Conclusão:</strong> Tipo {data.tipoConclusao === 'A' ? 'A (Pré-adequação)' : 'B (Aprovado)'}
        </p>
      </div>

      <p style={{ fontSize: '12px', color: '#999', textAlign: 'center' }}>
        ✓ Laudo pronto para ser gerado em PDF. Clique em "Gerar PDF" para finalizar.
      </p>
    </div>
  )
}
