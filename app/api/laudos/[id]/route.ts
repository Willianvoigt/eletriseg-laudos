import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = getServiceClient()

    const { data: laudo, error } = await db
      .from('Laudo')
      .select('*')
      .eq('id', id)
      .eq('userId', user.id)
      .single()

    if (error || !laudo) {
      return NextResponse.json({ error: 'Laudo não encontrado' }, { status: 404 })
    }

    const [{ data: dispositivos }, { data: perigos }] = await Promise.all([
      db.from('DispositivoSeguranca').select('*').eq('laudoId', id).order('ordem'),
      db.from('Perigo').select('*').eq('laudoId', id).order('ordem'),
    ])

    return NextResponse.json({
      ...laudo,
      dispositivosSeguranca: dispositivos || [],
      perigos: perigos || [],
    })
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao buscar laudo', details: String(err) }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = getServiceClient()

    const { data: laudo } = await db
      .from('Laudo')
      .select('id')
      .eq('id', id)
      .eq('userId', user.id)
      .single()

    if (!laudo) {
      return NextResponse.json({ error: 'Laudo não encontrado' }, { status: 404 })
    }

    await Promise.all([
      db.from('DispositivoSeguranca').delete().eq('laudoId', id),
      db.from('Perigo').delete().eq('laudoId', id),
    ])

    await db.from('Laudo').delete().eq('id', id)

    return NextResponse.json({ status: 'ok' })
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao excluir laudo', details: String(err) }, { status: 500 })
  }
}
