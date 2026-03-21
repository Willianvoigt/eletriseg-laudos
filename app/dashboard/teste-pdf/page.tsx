'use client'

import { useState } from 'react'
import { LAUDO_PRESETS } from '@/lib/presets/laudos-presets'

const TIPOS = [
  { id: 'centro-dobra', nome: 'Centro de Dobra' },
  { id: 'dobradeira', nome: 'Dobradeira' },
  { id: 'corte-laser', nome: 'Corte a Laser' },
  { id: 'laser-tubo', nome: 'Laser Tubo' },
]

const EMPRESA_TESTE = {
  empresaNome: 'MONTENEGRO INDUSTRIA E COMERCIO LTDA',
  empresaCNPJ: '49.510.155/0001-67',
  empresaEndereco: 'AV DEPUTADO LUIS EDUARDO MAGALHAES, SN, LIMOEIRO, FEIRA DE SANTANA SC – 44.097-324',
  empresaDataAbertura: '07/02/2023',
  empresaCNAE: '31.02-1-00 - Fabricação de móveis com predominância de metal',
  maquinaModelo: 'FBA-2030',
  maquinaSerial: 'FBA203022408140',
  maquinaFabricante: 'Yawei Machine-Tool Co., LTD',
  maquinaAno: '2024',
  maquinaSetor: 'Corte e Dobra',
}

export default function TestePDF() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleGerarPDF = async (tipoId: string) => {
    setLoading(tipoId)
    try {
      const preset = LAUDO_PRESETS[tipoId]
      if (!preset) throw new Error('Preset não encontrado')

      const data = {
        tipoLaudo: tipoId,
        ...EMPRESA_TESTE,
        maquinaNome: preset.nomeMaquina,
        maquinaDescricao: preset.descricaoFuncao,
        usoPretendido: preset.usoPretendido,
        modoOperacao: preset.modoOperacao,
        dispositivosSeguranca: preset.dispositivosPadrao.map(d => ({
          descricao: d.descricao,
        })),
        perigos: preset.perigosPadrao.map(p => ({
          cicloVida: p.cicloVida,
          numeroPerigo: p.numeroPerigo,
          tarefa: p.tarefa,
          descricaoPerigo: p.descricaoPerigo,
          loAntes: p.loAntes,
          feAntes: p.feAntes,
          dphAntes: p.dphAntes,
          npAntes: p.npAntes,
          hrnAntes: p.hrnAntes,
          loDepois: p.loDepois,
          feDepois: p.feDepois,
          dphDepois: p.dphDepois,
          npDepois: p.npDepois,
          hrnDepois: p.hrnDepois,
          medidasEngenharia: p.medidasEngenharia,
        })),
        tipoConlusao: preset.perigosPadrao.length > 0 ? 'B' : 'A',
        artNumero: 'ART-10272514-6',
      }

      const response = await fetch('/api/laudos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Erro ao gerar PDF')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Laudo_${tipoId}_${Date.now()}.pdf`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao gerar PDF')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '8px' }}>Teste - Gerador de PDF</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>Gere PDFs de teste para cada tipo de laudo com dados dos presets</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {TIPOS.map(tipo => {
          const preset = LAUDO_PRESETS[tipo.id]
          const nDisp = preset?.dispositivosPadrao?.length || 0
          const nPerigos = preset?.perigosPadrao?.length || 0
          return (
            <div
              key={tipo.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
              }}
            >
              <div>
                <strong>{tipo.nome}</strong>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                  {nDisp} dispositivos | {nPerigos} perigos | Conclusão {nPerigos > 0 ? 'B' : 'A'}
                </div>
              </div>
              <button
                onClick={() => handleGerarPDF(tipo.id)}
                disabled={loading !== null}
                style={{
                  padding: '8px 20px',
                  fontSize: '14px',
                  cursor: loading !== null ? 'not-allowed' : 'pointer',
                  backgroundColor: loading === tipo.id ? '#ccc' : '#4a9b9e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '500',
                }}
              >
                {loading === tipo.id ? 'Gerando...' : 'Gerar PDF'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
