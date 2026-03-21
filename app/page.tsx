import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-white mb-6">EletriSeg</h1>
        <p className="text-xl text-blue-100 mb-8">
          Gerador Automático de Laudos Técnicos NR-12
        </p>
        <p className="text-blue-50 mb-12 leading-relaxed">
          Sistema web para automatizar a criação de laudos de segurança em máquinas e equipamentos, conforme requisitos da Norma Regulamentadora NR-12.
        </p>

        <div className="flex gap-4 justify-center flex-col sm:flex-row">
          <Link
            href="/login"
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
