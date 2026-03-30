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
      if (error) { setError(error.message); return }
      setEnviado(true)
    } catch {
      setError('Erro ao enviar email de recuperação')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-tech flex items-center justify-center px-4 relative">
      <div className="glow-dot" style={{ top: '25%', left: '10%' }} />
      <div className="glow-dot" style={{ top: '65%', right: '15%' }} />

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 animate-pulse-glow" style={{ background: 'linear-gradient(135deg, #4a9b9e, #3a7d80)' }}>
            <span className="text-white font-bold text-2xl">E</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Recuperar Senha</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Enviaremos um link para seu email</p>
        </div>

        <div className="opacity-0 animate-fade-in-up glass-card p-8" style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}>
          {enviado ? (
            <div>
              <div className="p-4 text-sm rounded-lg mb-6 leading-relaxed" style={{ background: 'rgba(40, 167, 69, 0.15)', border: '1px solid rgba(40, 167, 69, 0.3)', color: '#6bff8a' }}>
                Email enviado com sucesso! Verifique sua caixa de entrada e spam.
              </div>
              <Link href="/login" className="block w-full py-2.5 btn-glow text-center text-sm">
                Voltar ao Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full px-4 py-2.5 rounded-lg text-sm text-white placeholder-gray-500 transition-all duration-300 focus:outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(74, 155, 158, 0.2)' }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(74, 155, 158, 0.5)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(74, 155, 158, 0.2)'}
                />
              </div>

              {error && (
                <div className="p-3 text-sm rounded-lg" style={{ background: 'rgba(220, 53, 69, 0.15)', border: '1px solid rgba(220, 53, 69, 0.3)', color: '#ff6b7a' }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full py-2.5 btn-glow text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
              </button>
            </form>
          )}
        </div>

        <p className="opacity-0 animate-fade-in-up text-center mt-6 text-sm" style={{ color: 'rgba(255,255,255,0.4)', animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <Link href="/login" className="font-medium" style={{ color: '#4a9b9e' }}>Voltar ao Login</Link>
        </p>
      </div>
    </div>
  )
}
