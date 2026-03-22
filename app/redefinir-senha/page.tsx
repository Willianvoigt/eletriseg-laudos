'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function RedefinirSenhaPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Supabase envia o token via hash na URL, o client JS lida automaticamente
  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // Usuário clicou no link de recuperação, está autenticado temporariamente
      }
    })
  }, [supabase.auth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      setSucesso(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
    } catch (err) {
      setError('Erro ao redefinir senha')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '28px', fontWeight: 'bold', color: '#4a9b9e' }}>EletriSeg</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666', fontSize: '14px' }}>Redefinir Senha</p>

        {sucesso ? (
          <div>
            <div style={{ padding: '16px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '6px', marginBottom: '1rem', fontSize: '14px', lineHeight: '1.5' }}>
              Senha redefinida com sucesso! Redirecionando para o dashboard...
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '14px' }}>
                Nova Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
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

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '14px' }}>
                Confirmar Nova Senha
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a senha"
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
              }}
            >
              {loading ? 'Redefinindo...' : 'Redefinir Senha'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
