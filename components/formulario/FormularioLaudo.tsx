'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { StepIndicator } from './StepIndicator'
import { StepEmpresa } from './StepEmpresa'
import { StepMaquina } from './StepMaquina'
import { StepFotos } from './StepFotos'
import { StepLimites } from './StepLimites'
import { StepSeguranca } from './StepSeguranca'
import { StepHRN } from './StepHRN'
import { StepConclusao } from './StepConclusao'
import { LAUDO_PRESETS } from '@/lib/presets/laudos-presets'

const STEP_NAMES = [
  'Empresa',
  'Máquina',
  'Fotos',
  'Limites',
  'Segurança',
  'Riscos (HRN)',
  'Conclusão',
]

const TIPO_LAUDO_MAP: Record<string, string> = {
  'laser-tubo': 'Laser Tubo',
  'centro-dobra': 'Centro de Dobra',
  'corte-laser': 'Corte a Laser',
  'dobradeira': 'Dobradeira',
}

interface FormData {
  // Tipo de laudo
  tipoLaudo: string
  // Empresa
  nomeEmpresa: string
  cnpj: string
  endereco: string
  dataAbertura: string
  atividadeEconomica: string
  // Máquina
  nomeMaquina: string
  modelo: string
  numeroSerie: string
  setor: string
  descricaoFuncao: string
  fabricante: string
  anoFabricacao: string
  potenciaValor: string
  potenciaUnidade: string
  usoPretendido: string
  modoOperacao: string
  // Fotos
  fotoPlacaMaquina: string
  fotoVisaoGeral: string
  // Limites
  tipoUso: string[]
  restricaoMotora: boolean
  restricaoSexo: boolean
  treinamentos: string[]
  // Segurança
  dispositivosSeguranca: Array<{ id: string; descricao: string; foto: string }>
  // HRN
  perigos: Array<any>
  // Conclusão
  tipoConclusao: string
  numeroArt: string
  gravidadeLesao: string
  frequencia: string
  possibilidadeEvitar: string
}

const INITIAL_DATA: FormData = {
  tipoLaudo: '',
  nomeEmpresa: '',
  cnpj: '',
  endereco: '',
  dataAbertura: '',
  atividadeEconomica: '',
  nomeMaquina: '',
  modelo: '',
  numeroSerie: '',
  setor: '',
  descricaoFuncao: '',
  fabricante: '',
  anoFabricacao: '',
  potenciaValor: '',
  potenciaUnidade: 'kW',
  usoPretendido: '',
  modoOperacao: '',
  fotoPlacaMaquina: '',
  fotoVisaoGeral: '',
  tipoUso: [],
  restricaoMotora: false,
  restricaoSexo: false,
  treinamentos: [],
  dispositivosSeguranca: [],
  perigos: [],
  tipoConclusao: 'B',
  numeroArt: '',
  gravidadeLesao: 'S1',
  frequencia: 'F1',
  possibilidadeEvitar: 'P1',
}

// Dados de teste removidos - agora os presets de cada tipo servem como dados iniciais

export function FormularioLaudo() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  // SEMPRE carregar preset do tipo selecionado (limpa dados antigos)
  useEffect(() => {
    const tipo = searchParams.get('tipo')

    if (tipo && TIPO_LAUDO_MAP[tipo]) {
      const preset = LAUDO_PRESETS[tipo]
      if (preset) {
        // Limpar qualquer rascunho antigo
        localStorage.removeItem('laudo-draft')
        setFormData({
          ...INITIAL_DATA,
          tipoLaudo: tipo,
          nomeMaquina: preset.nomeMaquina,
          descricaoFuncao: preset.descricaoFuncao,
          usoPretendido: preset.usoPretendido,
          modoOperacao: preset.modoOperacao,
          dispositivosSeguranca: preset.dispositivosPadrao.map((d, i) => ({
            id: Date.now().toString() + i,
            descricao: d.descricao,
            foto: '',
          })),
          perigos: (preset.perigosPadrao || []).map((p, i) => ({
            id: (Date.now() + 1000 + i).toString(),
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
        })
      }
    }
  }, [searchParams])

  // Salvar rascunho no localStorage
  useEffect(() => {
    localStorage.setItem('laudo-draft', JSON.stringify(formData))
  }, [formData])

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Empresa
        if (!formData.nomeEmpresa || !formData.cnpj || !formData.endereco) {
          alert('Preencha todos os campos obrigatórios da Empresa')
          return false
        }
        return true
      case 2: // Máquina
        if (!formData.nomeMaquina || !formData.modelo || !formData.numeroSerie) {
          alert('Preencha todos os campos obrigatórios da Máquina')
          return false
        }
        return true
      case 3: // Fotos
        if (!formData.fotoPlacaMaquina || !formData.fotoVisaoGeral) {
          alert('Envie ambas as fotos antes de continuar')
          return false
        }
        return true
      case 4: // Limites
        return true
      case 5: // Segurança
        if (formData.dispositivosSeguranca.length === 0) {
          alert('Adicione pelo menos um dispositivo de segurança')
          return false
        }
        return true
      case 6: // HRN
        if (formData.perigos.length === 0) {
          alert('Adicione pelo menos um perigo na análise HRN')
          return false
        }
        return true
      case 7: // Conclusão
        return true
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < STEP_NAMES.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setSaving(true)
    try {
      // Mapear dados do formulário para o formato do template
      const laudoData = {
        tipoLaudo: formData.tipoLaudo,
        empresaNome: formData.nomeEmpresa,
        empresaCNPJ: formData.cnpj,
        empresaEndereco: formData.endereco,
        empresaDataAbertura: formData.dataAbertura,
        empresaCNAE: formData.atividadeEconomica,
        maquinaNome: formData.nomeMaquina,
        maquinaModelo: formData.modelo,
        maquinaSerial: formData.numeroSerie,
        maquinaFabricante: formData.fabricante,
        maquinaAno: formData.anoFabricacao,
        maquinaSetor: formData.setor,
        maquinaDescricao: formData.descricaoFuncao,
        usoPretendido: formData.usoPretendido,
        modoOperacao: formData.modoOperacao,
        fotoPlacar: formData.fotoPlacaMaquina,
        fotoVisaoGeral: formData.fotoVisaoGeral,
        dispositivosSeguranca: formData.dispositivosSeguranca,
        perigos: formData.perigos,
        tipoConlusao: formData.tipoConclusao,
        artNumero: formData.numeroArt,
      }

      // Gerar e baixar PDF
      const res = await fetch('/api/laudos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(laudoData),
      })

      if (!res.ok) {
        alert('Erro ao gerar PDF')
        setSaving(false)
        return
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Laudo_NR12_${formData.nomeMaquina.replace(/\s+/g, '_')}_${Date.now()}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()

      // Limpar e redirecionar
      localStorage.removeItem('laudo-draft')
      setSaving(false)
      router.push(`/dashboard`)
    } catch (err) {
      console.error(err)
      alert('Erro ao gerar laudo')
      setSaving(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepEmpresa data={formData} onUpdate={updateFormData} />
      case 2:
        return <StepMaquina data={formData} onUpdate={updateFormData} />
      case 3:
        return <StepFotos data={formData} onUpdate={updateFormData} />
      case 4:
        return <StepLimites data={formData} onUpdate={updateFormData} />
      case 5:
        return <StepSeguranca data={formData} onUpdate={updateFormData} />
      case 6:
        return <StepHRN data={formData} onUpdate={updateFormData} />
      case 7:
        return <StepConclusao data={formData} onUpdate={updateFormData} />
      default:
        return null
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Novo Laudo NR-12</h1>
          {formData.tipoLaudo && TIPO_LAUDO_MAP[formData.tipoLaudo] && (
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                backgroundColor: '#4a9b9e',
                color: 'white',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '500',
              }}
            >
              {TIPO_LAUDO_MAP[formData.tipoLaudo]}
            </span>
          )}
        </div>
      </div>

      <StepIndicator currentStep={currentStep} totalSteps={STEP_NAMES.length} stepNames={STEP_NAMES} />

      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        {renderStep()}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: currentStep === 1 ? '#ccc' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          ← Anterior
        </button>

        {currentStep < STEP_NAMES.length ? (
          <button
            onClick={handleNext}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Próximo →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={saving}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: saving ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: saving ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            {saving ? 'Salvando...' : '✓ Gerar PDF'}
          </button>
        )}
      </div>

      <p style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '1rem' }}>
        Etapa {currentStep} de {STEP_NAMES.length}
      </p>
    </div>
  )
}
