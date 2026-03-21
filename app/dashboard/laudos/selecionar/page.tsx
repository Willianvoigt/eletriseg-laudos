'use client'

import { useRouter } from 'next/navigation'

const TIPOS_LAUDO = [
  {
    id: 'laser-tubo',
    nome: 'Laser Tubo',
    descricao: 'Laudo NR-12 para máquinas de corte a laser de tubos e perfis metálicos.',
  },
  {
    id: 'centro-dobra',
    nome: 'Centro de Dobra',
    descricao: 'Laudo NR-12 para centros de dobra automatizados de chapas metálicas.',
  },
  {
    id: 'corte-laser',
    nome: 'Corte a Laser',
    descricao: 'Laudo NR-12 para máquinas de corte a laser plano de chapas e placas.',
  },
  {
    id: 'dobradeira',
    nome: 'Dobradeira',
    descricao: 'Laudo NR-12 para dobradeiras hidráulicas e mecânicas de chapas.',
  },
]

export default function SelecionarTipoPage() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{ backgroundColor: 'white', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#505050' }}>EletriSeg</h1>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Voltar
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#505050', marginBottom: '0.5rem' }}>
            Selecionar Tipo de Laudo
          </h2>
          <p style={{ color: '#888', fontSize: '15px' }}>
            Escolha o tipo de máquina para gerar o laudo NR-12
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem',
          }}
        >
          {TIPOS_LAUDO.map((tipo) => (
            <div
              key={tipo.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #e8e8e8',
              }}
            >
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#505050', marginBottom: '0.5rem' }}>
                  {tipo.nome}
                </h3>
                <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                  {tipo.descricao}
                </p>
              </div>
              <button
                onClick={() => router.push(`/dashboard/laudos/novo?tipo=${tipo.id}`)}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  backgroundColor: '#4a9b9e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                Criar Laudo
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
