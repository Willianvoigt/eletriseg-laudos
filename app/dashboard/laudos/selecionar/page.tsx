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
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ background: 'linear-gradient(135deg, #0a1a1f, #0d2b30)', borderBottom: '1px solid rgba(74, 155, 158, 0.15)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4a9b9e, #3a7d80)' }}>
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-bold text-white">EletriSeg</span>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 text-sm rounded-lg transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
            onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'transparent' }}
          >
            ← Voltar
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
          <h1 className="text-2xl font-bold text-white mb-2">Selecionar Tipo de Laudo</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Escolha o tipo de máquina para gerar o laudo NR-12</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {TIPOS_LAUDO.map((tipo, i) => (
            <button
              key={tipo.id}
              onClick={() => router.push(`/dashboard/laudos/novo?tipo=${tipo.id}`)}
              className="opacity-0 animate-fade-in-up card-glow-border p-6 text-left transition-all duration-300 group"
              style={{ animationDelay: `${0.1 + i * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110" style={{ background: 'rgba(74, 155, 158, 0.1)', color: '#4a9b9e' }}>
                {tipo.icon}
              </div>
              <h3 className="font-semibold text-white mb-1.5">{tipo.nome}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{tipo.descricao}</p>
              <div className="mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#4a9b9e' }}>
                Criar laudo →
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
