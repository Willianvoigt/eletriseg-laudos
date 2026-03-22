import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900">EletriSeg</span>
          </div>
          <Link
            href="/login"
            className="px-5 py-2 bg-brand-400 text-white text-sm font-medium rounded-lg hover:bg-brand-500 transition-colors"
          >
            Acessar Sistema
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-600 text-sm font-medium rounded-full mb-8">
            <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse"></span>
            Plataforma de Laudos NR-12
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Laudos técnicos NR-12
            <span className="block text-brand-400">com agilidade e precisão</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Automatize a geração de laudos de segurança em máquinas e equipamentos.
            Análise de riscos HRN, relatórios profissionais em PDF e gestão completa.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Link
              href="/login"
              className="px-8 py-3.5 bg-brand-400 text-white font-semibold rounded-xl hover:bg-brand-500 transition-all hover:shadow-lg hover:shadow-brand-400/25"
            >
              Entrar no Sistema
            </Link>
            <Link
              href="/cadastro"
              className="px-8 py-3.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Tudo que você precisa</h2>
          <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">
            Ferramenta completa para engenheiros e técnicos de segurança do trabalho.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📋',
                title: 'Laudos Automatizados',
                desc: 'Gere laudos NR-12 completos em minutos com templates pré-configurados para diferentes tipos de máquinas.',
              },
              {
                icon: '📊',
                title: 'Análise de Riscos HRN',
                desc: 'Metodologia HRN integrada com cálculos automáticos e classificação visual por cores.',
              },
              {
                icon: '📄',
                title: 'PDF Profissional',
                desc: 'Relatórios em PDF com layout profissional, logo, numeração automática e sumário.',
              },
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300">
                <span className="text-3xl mb-4 block">{f.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pronto para começar?</h2>
          <p className="text-gray-500 mb-8">
            Crie sua conta gratuitamente e gere seu primeiro laudo em minutos.
          </p>
          <Link
            href="/cadastro"
            className="inline-block px-8 py-3.5 bg-brand-400 text-white font-semibold rounded-xl hover:bg-brand-500 transition-all hover:shadow-lg hover:shadow-brand-400/25"
          >
            Começar Agora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-400 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="text-sm font-semibold text-gray-600">EletriSeg Engenharia LTDA</span>
          </div>
          <p className="text-sm text-gray-400">© 2026 Todos os direitos reservados</p>
        </div>
      </footer>
    </main>
  )
}
