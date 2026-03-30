'use client'

import { useState } from 'react'

interface StepFotosProps {
  data: any
  onUpdate: (updates: any) => void
}

export function StepFotos({ data, onUpdate }: StepFotosProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleFotoChange = async (file: File, field: 'fotoPlacaMaquina' | 'fotoVisaoGeral') => {
    if (!file) return

    setLoading(field)
    setErrors(prev => ({ ...prev, [field]: '' }))

    try {
      // Comprimir imagem
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
              setErrors(prev => ({ ...prev, [field]: 'Erro ao processar imagem' }))
              setLoading(null)
              return
            }

            // Upload para Supabase
            const formData = new FormData()
            formData.append('file', blob)

            try {
              const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
              })

              if (uploadRes.ok) {
                const { url } = await uploadRes.json()
                onUpdate({ [field]: url })
                setErrors(prev => ({ ...prev, [field]: '' }))
                console.log(`✓ Upload bem-sucedido: ${field}`)
              } else {
                const { error } = await uploadRes.json()
                setErrors(prev => ({ ...prev, [field]: error || 'Erro ao enviar foto' }))
                console.error('Upload error:', error)
              }
            } catch (fetchErr) {
              setErrors(prev => ({ ...prev, [field]: 'Erro na conexão' }))
              console.error('Fetch error:', fetchErr)
            }
            setLoading(null)
          },
          'image/jpeg',
          0.8
        )
      }
      img.onerror = () => {
        setErrors(prev => ({ ...prev, [field]: 'Erro ao carregar imagem' }))
        setLoading(null)
      }
      img.src = URL.createObjectURL(file)
    } catch (err) {
      console.error(err)
      setErrors(prev => ({ ...prev, [field]: 'Erro desconhecido' }))
      setLoading(null)
    }
  }

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '1.5rem', color: '#fff' }}>Fotos da Máquina</h2>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '500', color: '#e0e0e0' }}>
          📷 Foto da Placa de Identificação
        </label>
        <div
          style={{
            border: data.fotoPlacaMaquina ? '2px solid #28a745' : '2px dashed #0066cc',
            borderRadius: '8px',
            padding: '2rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            backgroundColor: data.fotoPlacaMaquina ? '#1a3a2a' : '#1a1a1a',
          }}
          onMouseEnter={(e) => !data.fotoPlacaMaquina && (e.currentTarget.style.backgroundColor = '#1a2f4f')}
          onMouseLeave={(e) => !data.fotoPlacaMaquina && (e.currentTarget.style.backgroundColor = '#1a1a1a')}
        >
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => e.target.files?.[0] && handleFotoChange(e.target.files[0], 'fotoPlacaMaquina')}
            style={{ display: 'none' }}
            id="foto-placa"
            disabled={loading === 'fotoPlacaMaquina'}
          />
          <label htmlFor="foto-placa" style={{ cursor: 'pointer', display: 'block' }}>
            {loading === 'fotoPlacaMaquina' ? (
              <p style={{ fontSize: '14px', color: '#0066cc' }}>⏳ Enviando foto...</p>
            ) : data.fotoPlacaMaquina ? (
              <div>
                <img
                  src={data.fotoPlacaMaquina}
                  alt="Placa"
                  style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '4px', marginBottom: '1rem' }}
                />
                <p style={{ color: '#28a745', margin: 0, fontWeight: 'bold' }}>✓ Foto enviada</p>
                <p style={{ fontSize: '12px', color: '#aaa', margin: '0.5rem 0 0 0' }}>Clique para mudar</p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '14px', color: '#0066cc' }}>📱 Abra a câmera do celular</p>
                <p style={{ fontSize: '12px', color: '#aaa' }}>ou clique para selecionar arquivo</p>
              </div>
            )}
          </label>
        </div>
        {errors.fotoPlacaMaquina && (
          <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '0.5rem' }}>❌ {errors.fotoPlacaMaquina}</p>
        )}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '500', color: '#e0e0e0' }}>
          📷 Foto de Visão Geral
        </label>
        <div
          style={{
            border: data.fotoVisaoGeral ? '2px solid #28a745' : '2px dashed #0066cc',
            borderRadius: '8px',
            padding: '2rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            backgroundColor: data.fotoVisaoGeral ? '#1a3a2a' : '#1a1a1a',
          }}
          onMouseEnter={(e) => !data.fotoVisaoGeral && (e.currentTarget.style.backgroundColor = '#1a2f4f')}
          onMouseLeave={(e) => !data.fotoVisaoGeral && (e.currentTarget.style.backgroundColor = '#1a1a1a')}
        >
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => e.target.files?.[0] && handleFotoChange(e.target.files[0], 'fotoVisaoGeral')}
            style={{ display: 'none' }}
            id="foto-visao"
            disabled={loading === 'fotoVisaoGeral'}
          />
          <label htmlFor="foto-visao" style={{ cursor: 'pointer', display: 'block' }}>
            {loading === 'fotoVisaoGeral' ? (
              <p style={{ fontSize: '14px', color: '#0066cc' }}>⏳ Enviando foto...</p>
            ) : data.fotoVisaoGeral ? (
              <div>
                <img
                  src={data.fotoVisaoGeral}
                  alt="Visão Geral"
                  style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '4px', marginBottom: '1rem' }}
                />
                <p style={{ color: '#28a745', margin: 0, fontWeight: 'bold' }}>✓ Foto enviada</p>
                <p style={{ fontSize: '12px', color: '#aaa', margin: '0.5rem 0 0 0' }}>Clique para mudar</p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '14px', color: '#0066cc' }}>📱 Abra a câmera do celular</p>
                <p style={{ fontSize: '12px', color: '#aaa' }}>ou clique para selecionar arquivo</p>
              </div>
            )}
          </label>
        </div>
        {errors.fotoVisaoGeral && (
          <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '0.5rem' }}>❌ {errors.fotoVisaoGeral}</p>
        )}
      </div>
    </div>
  )
}
