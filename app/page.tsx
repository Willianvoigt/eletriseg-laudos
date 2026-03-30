import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen text-white bg-tech overflow-x-hidden">

      {/* Navbar */}
      <nav className="sticky top-0 w-full z-50 animate-fade-in" style={{ background: 'rgba(10, 26, 31, 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(74, 155, 158, 0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center animate-pulse-glow" style={{ background: 'linear-gradient(135deg, #4a9b9e, #3a7d80)' }}>
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-white">EletriSeg</span>
          </div>
          <Link
            href="/login"
            className="btn-glow px-5 py-2 text-sm"
          >
            Acessar Sistema
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8" style={{ background: 'rgba(74, 155, 158, 0.15)', border: '1px solid rgba(74, 155, 158, 0.3)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4a9b9e', boxShadow: '0 0 8px #4a9b9e' }}></span>
              <span className="text-sm font-medium" style={{ color: '#7fc0c2' }}>Plataforma de Laudos NR-12</span>
            </div>
          </div>

          <h1 className="opacity-0 animate-fade-in-up text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}>
            Laudos técnicos NR-12
            <span className="block" style={{ background: 'linear-gradient(135deg, #4a9b9e, #7fc0c2, #aed9da)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              com agilidade e precisão
            </span>
          </h1>

          <p className="opacity-0 animate-fade-in-up text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ animationDelay: '0.4s', animationFillMode: 'forwards', color: 'rgba(255,255,255,0.6)' }}>
            Automatize a geração de laudos de segurança em máquinas e equipamentos.
            Análise de riscos HRN, relatórios profissionais em PDF e gestão completa.
          </p>

          <div className="opacity-0 animate-fade-in-up flex gap-4 justify-center flex-col sm:flex-row" style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}>
            <Link
              href="/login"
              className="btn-glow px-8 py-3.5 text-base"
            >
              Entrar no Sistema
            </Link>
            <Link
              href="/cadastro"
              className="btn-outline-glow px-8 py-3.5"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="opacity-0 animate-fade-in-up text-3xl font-bold text-center mb-4" style={{ animationFillMode: 'forwards' }}>
            Tudo que você precisa
          </h2>
          <p className="opacity-0 animate-fade-in-up text-center mb-16 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)', animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Ferramenta completa para engenheiros e técnicos de segurança do trabalho.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'Laudos Automatizados',
                desc: 'Gere laudos NR-12 completos em minutos com templates pré-configurados para diferentes tipos de máquinas.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                ),
                title: 'Análise de Riscos HRN',
                desc: 'Metodologia HRN integrada com cálculos automáticos e classificação visual por cores.',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
                title: 'PDF Profissional',
                desc: 'Relatórios em PDF com layout profissional, logo, numeração automática e sumário.',
              },
            ].map((f, i) => (
              <div
                key={i}
                className="opacity-0 animate-fade-in-up glass-card p-8 transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${0.2 + i * 0.15}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{ background: 'rgba(74, 155, 158, 0.15)', color: '#4a9b9e' }}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="glass-card p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Pronto para começar?</h2>
            <p className="mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Crie sua conta gratuitamente e gere seu primeiro laudo em minutos.
            </p>
            <Link
              href="/cadastro"
              className="btn-glow inline-block px-8 py-3.5 text-base"
            >
              Começar Agora
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher EletriSeg?</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-brand-400 mb-3">Conformidade NR-12</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Nossos laudos seguem rigorosamente os requisitos da Norma Regulamentadora 12, garantindo conformidade legal e segurança dos equipamentos.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-400 mb-3">Análise HRN Integrada</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Sistema de cálculo de risco HRN (Hazard Rating Number) automático com classificação visual e recomendações de medidas de controle.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-400 mb-3">Templates Pré-configurados</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Modelos específicos para diferentes tipos de máquinas (Centro de Dobra, Dobradeira, Laser, etc.) que aceleram o processo.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-brand-400 mb-3">Relatórios Profissionais</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                  PDFs com design profissional, numeração automática, sumário, headers/footers consistentes e logomarca da sua empresa.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-400 mb-3">Gestão de Histórico</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Dashboard com histórico completo de laudos gerados, permitindo rastreabilidade e acompanhamento do estado de conformidade.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-brand-400 mb-3">Suporte Técnico</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Equipe de engenheiros especializados em NR-12 e segurança do trabalho para suporte e consultoria.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 border border-gray-700">
            <h3 className="text-2xl font-bold mb-4">Como Funciona</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { num: '1', title: 'Cadastrar', desc: 'Empresa e dados da máquina' },
                { num: '2', title: 'Analisar', desc: 'Dispositivos e riscos (HRN)' },
                { num: '3', title: 'Gerar', desc: 'Relatório profissional em PDF' },
                { num: '4', title: 'Arquivar', desc: 'Histórico e conformidade' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg" style={{ background: 'rgba(74, 155, 158, 0.2)', color: '#4a9b9e' }}>
                    {item.num}
                  </div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Machines Supported */}
      <section className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Máquinas Suportadas</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🔧', name: 'Centro de Dobra', desc: 'CNC Panel Bender com análise de esmagamento e dobra segura' },
              { icon: '⚙️', name: 'Dobradeira', desc: 'Dobradeira CNC com controle de risco HRN integrado' },
              { icon: '🔴', name: 'Corte a Laser', desc: 'Máquinas laser com análise de radiação e queimadura' },
            ].map((m, i) => (
              <div key={i} className="glass-card p-6 text-center hover:border-brand-400 transition-colors border border-gray-700">
                <div className="text-4xl mb-3">{m.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{m.name}</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{m.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center mt-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Mais tipos de máquinas sendo adicionados regularmente
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6" style={{ borderTop: '1px solid rgba(74, 155, 158, 0.1)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4a9b9e, #3a7d80)' }}>
                  <span className="text-white font-bold text-xs">E</span>
                </div>
                <span className="text-sm font-semibold">EletriSeg Engenharia</span>
              </div>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Automação de laudos técnicos NR-12</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Empresa</h4>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Engenharia Elétrica • Segurança do Trabalho • NR-12</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Contato</h4>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>suporte@eletriseg.com.br</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>© 2026 EletriSeg Engenharia LTDA. Todos os direitos reservados</p>
            <div className="flex gap-4 text-xs">
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }} className="hover:text-brand-400 transition-colors">Privacidade</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }} className="hover:text-brand-400 transition-colors">Termos</a>
              <a href="#" style={{ color: 'rgba(255,255,255,0.5)' }} className="hover:text-brand-400 transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
