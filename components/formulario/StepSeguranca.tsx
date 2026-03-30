'use client'

import { useState } from 'react'

interface StepSegurancaProps {
  data: any
  onUpdate: (updates: any) => void
}

export function StepSeguranca({ data, onUpdate }: StepSegurancaProps) {
  const [novoDispositivo, setNovoDispositivo] = useState('')
  const [loading, setLoading] = useState(false)

  const adicionarDispositivo = () => {
    if (!novoDispositivo.trim()) return
    const newDispositivos = [
      ...data.dispositivosSeguranca,
      {
        id: Date.now().toString(),
        ordem: data.dispositivosSeguranca.length + 1,
        descricao: novoDispositivo,
        foto: '',
      },
    ]
    onUpdate({ dispositivosSeguranca: newDispositivos })
    setNovoDispositivo('')
  }

  const removerDispositivo = (id: string) => {
    const newDispositivos = data.dispositivosSeguranca.filter((d: any) => d.id !== id)
    onUpdate({ dispositivosSeguranca: newDispositivos })
  }

  const handleFotoDispositivo = async (id: string, file: File) => {
    if (!file) return
    setLoading(true)
    try {
      const canvas = document.createElement('canvas')
      const img = new Image()
      img.onload = async () => {
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)

        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              console.error('Erro ao processar imagem do dispositivo')
              setLoading(false)
              return
            }
            const formData = new FormData()
            formData.append('file', blob)

            const uploadRes = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            })

            if (uploadRes.ok) {
              const { url } = await uploadRes.json()
              const newDispositivos = data.dispositivosSeguranca.map((d: any) =>
                d.id === id ? { ...d, foto: url } : d
              )
              onUpdate({ dispositivosSeguranca: newDispositivos })
            }
            setLoading(false)
          },
          'image/jpeg',
          0.8
        )
      }
      img.src = URL.createObjectURL(file)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>Dispositivos de Segurança</h2>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#e0e0e0' }}>
          Novo Dispositivo
        </label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={novoDispositivo}
            onChange={(e) => setNovoDispositivo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && adicionarDispositivo()}
            placeholder="Ex: Proteção de corrente"
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #555',
              borderRadius: '4px',
              fontSize: '14px',
              backgroundColor: '#2a2a2a',
              color: '#e0e0e0',
            }}
          />
          <button
            onClick={adicionarDispositivo}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            + Adicionar
          </button>
        </div>
      </div>

      <div>
        {data.dispositivosSeguranca.map((dispositivo: any, idx: number) => (
          <div key={dispositivo.id} style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#2a2a2a', borderRadius: '4px', border: '1px solid #555' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: '500', color: '#e0e0e0' }}>
                {idx + 1}. {dispositivo.descricao}
              </span>
              <button
                onClick={() => removerDispositivo(dispositivo.id)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Remover
              </button>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '12px', color: '#aaa' }}>
                📷 Foto do dispositivo
              </label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => e.target.files?.[0] && handleFotoDispositivo(dispositivo.id, e.target.files[0])}
                style={{ fontSize: '12px' }}
              />
              {dispositivo.foto && (
                <img
                  src={dispositivo.foto}
                  alt="Dispositivo"
                  style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '0.5rem', borderRadius: '4px' }}
                />
              )}
            </div>
          </div>
        ))}
        {data.dispositivosSeguranca.length === 0 && (
          <p style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>Nenhum dispositivo adicionado</p>
        )}
      </div>

      {loading && <p style={{ color: '#0066cc', textAlign: 'center' }}>Enviando foto...</p>}
    </div>
  )
}
