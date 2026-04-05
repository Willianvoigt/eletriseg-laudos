import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const db = getServiceClient()

    const { error } = await db.from('Empresa').update({
      nomeEmpresa: body.nomeEmpresa,
      cnpj: body.cnpj,
      endereco: body.endereco || '',
      dataAbertura: body.dataAbertura || null,
      atividadeEconomica: body.atividadeEconomica || null,
      updatedAt: new Date().toISOString(),
    }).eq('id', id).eq('userId', user.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ status: 'ok' })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const db = getServiceClient()
    await db.from('Empresa').delete().eq('id', id).eq('userId', user.id)
    return NextResponse.json({ status: 'ok' })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
