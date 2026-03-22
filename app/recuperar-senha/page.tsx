'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/redefinir-senha`,
      })

      if (error) {
        setError(error.message)
        return
      }

      setEnviado(true)
    } catch (err) {
      setError('Erro ao enviar email de recuperação')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '28px', fontWeight: 'bold', color: '#4a9b9e' }}>EletriSeg</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666', fontSize: '14px' }}>Recuperar Senha</p>

        {enviado ? (
          <div>
            <div style={{ padding: '16px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '14px', lineHeight: '1.5' }}>
              Email enviado com sucesso! Verifique sua caixa de entrada (e spam) para redefinir sua senha.
            </div>
            <Link
              href="/login"
              style={{
                display: 'block',
                textAlign: 'center',
                padding: '10px',
                backgroundColor: '#4a9b9e',
                color: 'white',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Voltar ao Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              Informe seu email cadastrado. Enviaremos um link para redefinir sua senha.
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '14px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              />
            </div>

            {error && (
              <div style={{ marginBottom: '1rem', padding: '10px', backgroundColor: '#fee', color: '#c33', borderRadius: '4px', fontSize: '14px' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: loading ? '#ccc' : '#4a9b9e',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '1rem',
              }}
            >
              {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
            </button>

            <Link
              href="/login"
              style={{ display: 'block', textAlign: 'center', fontSize: '13px', color: '#4a9b9e', textDecoration: 'none' }}
            >
              Voltar ao Login
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
