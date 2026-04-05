import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const db = getServiceClient()
    const { data, error } = await db
      .from('Empresa')
      .select('*')
      .eq('userId', user.id)
      .order('nomeEmpresa', { ascending: true })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data || [])
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    if (!body.nomeEmpresa || !body.cnpj) {
      return NextResponse.json({ error: 'Nome e CNPJ obrigatórios' }, { status: 400 })
    }

    const db = getServiceClient()
    const { data, error } = await db.from('Empresa').insert({
      id: crypto.randomUUID(),
      userId: user.id,
      nomeEmpresa: body.nomeEmpresa,
      cnpj: body.cnpj,
      endereco: body.endereco || '',
      dataAbertura: body.dataAbertura || null,
      atividadeEconomica: body.atividadeEconomica || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }).select().single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
