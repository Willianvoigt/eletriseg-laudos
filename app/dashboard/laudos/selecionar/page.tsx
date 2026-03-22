'use client'

import { useRouter } from 'next/navigation'

const TIPOS_LAUDO = [
  {
    id: 'centro-dobra',
    nome: 'Centro de Dobra',
    descricao: 'Laudo NR-12 para centros de dobra automatizados de chapas metálicas.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    ),
  },
  {
    id: 'dobradeira',
    nome: 'Dobradeira',
    descricao: 'Laudo NR-12 para dobradeiras hidráulicas e mecânicas de chapas.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21l3-3m0 0l3 3m-3-3V3m0 0L7 6m3-3l3 3" />
      </svg>
    ),
  },
  {
    id: 'corte-laser',
    nome: 'Corte a Laser',
    descricao: 'Laudo NR-12 para máquinas de corte a laser plano de chapas e placas.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'laser-tubo',
    nome: 'Laser Tubo',
    descricao: 'Laudo NR-12 para máquinas de corte a laser de tubos e perfis metálicos.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18m9-9H3" />
      </svg>
    ),
  },
]

export default function SelecionarTipoPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-bold text-gray-900">EletriSeg</span>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Voltar
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Selecionar Tipo de Laudo</h1>
          <p className="text-sm text-gray-500">Escolha o tipo de máquina para gerar o laudo NR-12</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {TIPOS_LAUDO.map((tipo) => (
            <button
              key={tipo.id}
              onClick={() => router.push(`/dashboard/laudos/novo?tipo=${tipo.id}`)}
              className="bg-white rounded-xl border border-gray-100 p-6 text-left hover:border-brand-300 hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-400 mb-4 group-hover:bg-brand-400 group-hover:text-white transition-colors">
                {tipo.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5">{tipo.nome}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{tipo.descricao}</p>
              <div className="mt-4 text-sm text-brand-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Criar laudo →
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
