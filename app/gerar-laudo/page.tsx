'use client'

import { useState } from 'react'

export default function GerarLaudo() {
  const [template, setTemplate] = useState('laser-tubo')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Empresa
    empresaNome: '',
    empresaCNPJ: '',
    empresaEndereco: '',
    empresaDataAbertura: '',
    empresaCNAE: '',

    // Máquina
    maquinaNome: '',
    maquinaModelo: '',
    maquinaSerial: '',
    maquinaFabricante: '',
    maquinaAno: '',
    maquinaSetor: '',
    maquinaDescricao: '',

    // Fotos
    fotoPlacar: '',
    fotoVisaoGeral: '',

    // Dispositivos
    dispositivosSeguranca: [
      { descricao: '' },
      { descricao: '' },
    ],

    // Riscos
    perigos: [
      {
        cicloVida: '',
        numeroPerigo: '1',
        tarefa: '',
        descricaoPerigo: '',
        loAntes: 0.5,
        feAntes: 0.5,
        dphAntes: 0.5,
        npAntes: 1.0,
        hrnAntes: 0.125,
        loDepois: 0.1,
        feDepois: 0.2,
        dphDepois: 0.3,
        npDepois: 0.5,
        hrnDepois: 0.003,
        medidasEngenharia: '',
      },
    ],

    tipoConlusao: 'B',
    artNumero: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const handleDispositivoChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      dispositivosSeguranca: prev.dispositivosSeguranca.map((d, i) =>
        i === index ? { descricao: value } : d
      )
    }))
  }

  const handlePerigoChange = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      perigos: prev.perigos.map((p, i) =>
        i === index ? { ...p, [field]: value } : p
      )
    }))
  }

  const handleGerarPDF = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erro ao gerar PDF')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Laudo_${formData.maquinaNome.replace(/\s+/g, '_')}_${Date.now()}.pdf`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      alert(`Erro: ${error instanceof Error ? error.message : 'Desconhecido'}`)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2>1. Dados da Empresa</h2>
            <div className="form-group">
              <label>Nome da Empresa *</label>
              <input
                type="text"
                value={formData.empresaNome}
                onChange={(e) => handleInputChange(e, 'empresaNome')}
                placeholder="EletriSeg Engenharia LTDA"
              />
            </div>
            <div className="form-group">
              <label>CNPJ *</label>
              <input
                type="text"
                value={formData.empresaCNPJ}
                onChange={(e) => handleInputChange(e, 'empresaCNPJ')}
                placeholder="12.345.678/0001-99"
              />
            </div>
            <div className="form-group">
              <label>Endereço</label>
              <input
                type="text"
                value={formData.empresaEndereco}
                onChange={(e) => handleInputChange(e, 'empresaEndereco')}
                placeholder="Rua das Flores, 123 - São Paulo"
              />
            </div>
            <div className="form-group">
              <label>Data de Abertura</label>
              <input
                type="text"
                value={formData.empresaDataAbertura}
                onChange={(e) => handleInputChange(e, 'empresaDataAbertura')}
                placeholder="01/01/2020"
              />
            </div>
            <div className="form-group">
              <label>CNAE</label>
              <input
                type="text"
                value={formData.empresaCNAE}
                onChange={(e) => handleInputChange(e, 'empresaCNAE')}
                placeholder="7112900"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h2>2. Dados da Máquina</h2>
            <div className="form-group">
              <label>Nome da Máquina *</label>
              <input
                type="text"
                value={formData.maquinaNome}
                onChange={(e) => handleInputChange(e, 'maquinaNome')}
                placeholder="Centro de Dobra"
              />
            </div>
            <div className="form-group">
              <label>Modelo</label>
              <input
                type="text"
                value={formData.maquinaModelo}
                onChange={(e) => handleInputChange(e, 'maquinaModelo')}
                placeholder="CD-500"
              />
            </div>
            <div className="form-group">
              <label>Número de Série</label>
              <input
                type="text"
                value={formData.maquinaSerial}
                onChange={(e) => handleInputChange(e, 'maquinaSerial')}
                placeholder="SN123456"
              />
            </div>
            <div className="form-group">
              <label>Fabricante</label>
              <input
                type="text"
                value={formData.maquinaFabricante}
                onChange={(e) => handleInputChange(e, 'maquinaFabricante')}
                placeholder="Indústrias LTDA"
              />
            </div>
            <div className="form-group">
              <label>Ano</label>
              <input
                type="text"
                value={formData.maquinaAno}
                onChange={(e) => handleInputChange(e, 'maquinaAno')}
                placeholder="2020"
              />
            </div>
            <div className="form-group">
              <label>Setor</label>
              <input
                type="text"
                value={formData.maquinaSetor}
                onChange={(e) => handleInputChange(e, 'maquinaSetor')}
                placeholder="Produção"
              />
            </div>
            <div className="form-group">
              <label>Descrição</label>
              <textarea
                value={formData.maquinaDescricao}
                onChange={(e) => handleInputChange(e, 'maquinaDescricao')}
                placeholder="Descrição da máquina..."
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h2>3. Dispositivos de Segurança</h2>
            {formData.dispositivosSeguranca.map((disp, idx) => (
              <div key={idx} className="form-group">
                <label>Dispositivo {idx + 1}</label>
                <input
                  type="text"
                  value={disp.descricao}
                  onChange={(e) => handleDispositivoChange(idx, e.target.value)}
                  placeholder="Descreva o dispositivo..."
                />
              </div>
            ))}
          </div>
        )

      case 4:
        return (
          <div>
            <h2>4. Análise de Riscos (HRN)</h2>
            {formData.perigos.map((perigo, idx) => (
              <div key={idx} className="risk-section">
                <h3>Perigo {idx + 1}</h3>
                <div className="form-group">
                  <label>Descrição do Perigo</label>
                  <input
                    type="text"
                    value={perigo.descricaoPerigo}
                    onChange={(e) => handlePerigoChange(idx, 'descricaoPerigo', e.target.value)}
                    placeholder="Esmagamento de mãos..."
                  />
                </div>
                <div className="form-group">
                  <label>Ciclo de Vida</label>
                  <input
                    type="text"
                    value={perigo.cicloVida}
                    onChange={(e) => handlePerigoChange(idx, 'cicloVida', e.target.value)}
                    placeholder="Operação"
                  />
                </div>
                <div className="form-group">
                  <label>Tarefa</label>
                  <input
                    type="text"
                    value={perigo.tarefa}
                    onChange={(e) => handlePerigoChange(idx, 'tarefa', e.target.value)}
                    placeholder="Alimentação..."
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>LO Antes</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={perigo.loAntes}
                      onChange={(e) => handlePerigoChange(idx, 'loAntes', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label>FE Antes</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={perigo.feAntes}
                      onChange={(e) => handlePerigoChange(idx, 'feAntes', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label>DPH Antes</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={perigo.dphAntes}
                      onChange={(e) => handlePerigoChange(idx, 'dphAntes', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label>NP Antes</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={perigo.npAntes}
                      onChange={(e) => handlePerigoChange(idx, 'npAntes', parseFloat(e.target.value))}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ backgroundColor: '#ffe6e6', padding: '10px', borderRadius: '4px' }}>
                  <strong>HRN Antes: {(perigo.loAntes * perigo.feAntes * perigo.dphAntes * perigo.npAntes).toFixed(3)}</strong>
                </div>

                <div className="form-group">
                  <label>Medidas de Engenharia</label>
                  <textarea
                    value={perigo.medidasEngenharia}
                    onChange={(e) => handlePerigoChange(idx, 'medidasEngenharia', e.target.value)}
                    placeholder="Descrição das medidas implementadas..."
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>LO Depois</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={perigo.loDepois}
                      onChange={(e) => handlePerigoChange(idx, 'loDepois', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label>FE Depois</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={perigo.feDepois}
                      onChange={(e) => handlePerigoChange(idx, 'feDepois', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label>DPH Depois</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={perigo.dphDepois}
                      onChange={(e) => handlePerigoChange(idx, 'dphDepois', parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label>NP Depois</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={perigo.npDepois}
                      onChange={(e) => handlePerigoChange(idx, 'npDepois', parseFloat(e.target.value))}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ backgroundColor: '#e6ffe6', padding: '10px', borderRadius: '4px' }}>
                  <strong>HRN Depois: {(perigo.loDepois * perigo.feDepois * perigo.dphDepois * perigo.npDepois).toFixed(3)}</strong>
                </div>
              </div>
            ))}
          </div>
        )

      case 5:
        return (
          <div>
            <h2>5. Conclusão</h2>
            <div className="form-group">
              <label>Tipo de Conclusão</label>
              <select value={formData.tipoConlusao} onChange={(e) => handleInputChange(e, 'tipoConlusao')}>
                <option value="A">A - Pré-adequação</option>
                <option value="B">B - Adequação</option>
              </select>
            </div>
            <div className="form-group">
              <label>Número ART (opcional)</label>
              <input
                type="text"
                value={formData.artNumero}
                onChange={(e) => handleInputChange(e, 'artNumero')}
                placeholder="ART2026001234"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>📋 Gerador de Laudo NR-12</h1>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Selecione o Template:</label>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <option value="laser-tubo">Laser Tubo</option>
          <option value="centro-dobra">Centro de Dobra</option>
          <option value="corte-laser">Corte a Laser</option>
          <option value="dobradeira">Dobradeira</option>
        </select>
      </div>

      <div style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            style={{
              padding: '10px 15px',
              backgroundColor: step === s ? '#007bff' : '#f0f0f0',
              color: step === s ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: step === s ? 'bold' : 'normal',
            }}
          >
            Etapa {s}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        {renderStep()}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          style={{
            padding: '12px 24px',
            backgroundColor: step === 1 ? '#ccc' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: step === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          ← Anterior
        </button>

        <button
          onClick={handleGerarPDF}
          disabled={loading || !formData.empresaNome || !formData.maquinaNome}
          style={{
            padding: '12px 40px',
            backgroundColor: loading || !formData.empresaNome || !formData.maquinaNome ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading || !formData.empresaNome || !formData.maquinaNome ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {loading ? '⏳ Gerando...' : '📥 Gerar e Baixar PDF'}
        </button>

        <button
          onClick={() => setStep(Math.min(5, step + 1))}
          disabled={step === 5}
          style={{
            padding: '12px 24px',
            backgroundColor: step === 5 ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: step === 5 ? 'not-allowed' : 'pointer',
          }}
        >
          Próximo →
        </button>
      </div>

      <style jsx>{`
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
          font-size: 14px;
        }
        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          font-family: Arial, sans-serif;
        }
        .form-group textarea {
          min-height: 80px;
          resize: vertical;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 10px;
        }
        .risk-section {
          background: white;
          padding: 15px;
          border-left: 4px solid #007bff;
          margin-bottom: 20px;
          border-radius: 4px;
        }
        .risk-section h3 {
          margin-bottom: 15px;
          color: #007bff;
        }
      `}</style>
    </div>
  )
}
