'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      router.push('/dashboard')
    } catch (err) {
      setError('Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-tech flex items-center justify-center px-4 relative">
      {/* Glowing dots */}
      <div className="glow-dot" style={{ top: '20%', left: '15%' }} />
      <div className="glow-dot" style={{ top: '30%', right: '20%' }} />
      <div className="glow-dot" style={{ top: '70%', left: '25%' }} />
      <div className="glow-dot" style={{ top: '80%', right: '15%' }} />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 animate-pulse-glow" style={{ background: 'linear-gradient(135deg, #4a9b9e, #3a7d80)' }}>
            <span className="text-white font-bold text-2xl">E</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Bem-vindo de volta</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Acesse sua conta EletriSeg</p>
        </div>

        {/* Card */}
        <div className="opacity-0 animate-fade-in-up glass-card p-8" style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Email
              </label>
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

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 btn-glow text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/recuperar-senha"
              className="text-sm transition-colors duration-300"
              style={{ color: '#4a9b9e' }}
            >
              Esqueci minha senha
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="opacity-0 animate-fade-in-up text-center mt-6 text-sm" style={{ color: 'rgba(255,255,255,0.4)', animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          Não tem conta?{' '}
          <Link href="/cadastro" className="font-medium transition-colors duration-300" style={{ color: '#4a9b9e' }}>
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}
