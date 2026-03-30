'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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

      // 1. Gerar PDF no cliente (browser)
      const { gerarPDFCliente } = await import('@/lib/pdf/client-generator')
      await gerarPDFCliente(laudoData as any)

      // 2. Salvar dados no banco (sem gerar PDF no servidor)
      await fetch('/api/laudos/salvar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(laudoData),
      })

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
    <div className="min-h-screen bg-tech">
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ background: 'linear-gradient(135deg, #0a1a1f, #0d2b30)', borderBottom: '1px solid rgba(74, 155, 158, 0.15)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-brand-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="text-lg font-bold text-white">EletriSeg</span>
            </Link>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            ← Voltar ao Dashboard
          </Link>
        </div>
      </header>

    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-bold text-white">Novo Laudo NR-12</h1>
        {formData.tipoLaudo && TIPO_LAUDO_MAP[formData.tipoLaudo] && (
          <span className="px-3 py-1 bg-brand-400 text-white text-xs font-medium rounded-full">
            {TIPO_LAUDO_MAP[formData.tipoLaudo]}
          </span>
        )}
      </div>

      <StepIndicator currentStep={currentStep} totalSteps={STEP_NAMES.length} stepNames={STEP_NAMES} />

      <div className="dark-card border border-gray-700 p-6 sm:p-8 mb-6">
        {renderStep()}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="flex-1 py-3 text-sm font-medium rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-gray-700 text-gray-300 hover:bg-gray-600"
        >
          ← Anterior
        </button>

        {currentStep < STEP_NAMES.length ? (
          <button
            onClick={handleNext}
            className="flex-1 py-3 text-sm font-medium rounded-xl bg-brand-400 text-white hover:bg-brand-500 transition-colors"
          >
            Próximo →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 py-3 text-sm font-medium rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Gerando PDF...' : 'Gerar PDF'}
          </button>
        )}
      </div>

      <p className="text-center text-xs text-gray-500 mt-4">
        Etapa {currentStep} de {STEP_NAMES.length}
      </p>
    </div>
    </div>
  )
}
