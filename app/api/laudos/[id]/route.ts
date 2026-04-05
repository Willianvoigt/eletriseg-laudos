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

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const db = getServiceClient()
    const body = await request.json()

    const empresaNome = body.empresaNome || body.nomeEmpresa || ''
    const maquinaNome = body.maquinaNome || body.nomeMaquina || ''

    // Verifica ownership
    const { data: existing } = await db.from('Laudo').select('id').eq('id', id).eq('userId', user.id).single()
    if (!existing) return NextResponse.json({ error: 'Laudo não encontrado' }, { status: 404 })

    // Atualiza laudo
    const { error: laudoError } = await db.from('Laudo').update({
      updatedAt: new Date().toISOString(),
      tipoLaudo: body.tipoLaudo || null,
      nomeEmpresa: empresaNome,
      cnpj: body.empresaCNPJ || body.cnpj || '',
      endereco: body.empresaEndereco || body.endereco || '',
      dataAbertura: body.empresaDataAbertura || body.dataAbertura || null,
      atividadeEconomica: body.empresaCNAE || body.atividadeEconomica || null,
      nomeMaquina: maquinaNome,
      modelo: body.maquinaModelo || body.modelo || null,
      numeroSerie: body.maquinaSerial || body.numeroSerie || null,
      setor: body.maquinaSetor || body.setor || null,
      descricaoFuncao: body.maquinaDescricao || body.descricaoFuncao || null,
      fabricante: body.maquinaFabricante || body.fabricante || null,
      anoFabricacao: body.maquinaAno || body.anoFabricacao || null,
      potenciaValor: body.potenciaValor || null,
      potenciaUnidade: body.potenciaUnidade || null,
      usoPretendido: body.usoPretendido || null,
      modoOperacao: body.modoOperacao || null,
      gravidadeLesao: body.gravidadeLesao || null,
      frequencia: body.frequencia || null,
      possibilidadeEvitar: body.possibilidadeEvitar || null,
      numeroArt: body.artNumero || body.numeroArt || null,
      tipoConclusao: body.tipoConlusao || body.tipoConclusao || 'B',
      fotoPlacaMaquina: body.fotoPlacar || body.fotoPlacaMaquina || null,
      fotoVisaoGeral: body.fotoVisaoGeral || null,
    }).eq('id', id)

    if (laudoError) return NextResponse.json({ error: 'Erro ao atualizar', details: laudoError.message }, { status: 500 })

    // Remove relações antigas e re-insere
    await Promise.all([
      db.from('DispositivoSeguranca').delete().eq('laudoId', id),
      db.from('Perigo').delete().eq('laudoId', id),
    ])

    const dispositivos = (body.dispositivosSeguranca || []).map((d: any, i: number) => ({
      laudoId: id, ordem: i + 1, descricao: d.descricao || '', fotoUrl: d.foto || null,
    }))
    if (dispositivos.length > 0) await db.from('DispositivoSeguranca').insert(dispositivos)

    const classificarHRN = (hrn: number) => {
      if (hrn <= 1) return 'Aceitável'; if (hrn <= 5) return 'Muito Baixo'; if (hrn <= 10) return 'Baixo'
      if (hrn <= 50) return 'Significante'; if (hrn <= 100) return 'Alto'; if (hrn <= 500) return 'Muito Alto'
      return 'Extremo'
    }
    const perigos = (body.perigos || []).map((p: any, i: number) => ({
      laudoId: id, ordem: i + 1, cicloVida: p.cicloVida || '', numeroPerigo: p.numeroPerigo || '',
      tarefa: p.tarefa || '', descricaoPerigo: p.descricaoPerigo || '',
      loAntes: parseFloat(p.loAntes) || 0, feAntes: parseFloat(p.feAntes) || 0,
      dphAntes: parseFloat(p.dphAntes) || 0, npAntes: parseFloat(p.npAntes) || 0,
      hrnAntes: parseFloat(p.hrnAntes) || 0, classificacaoAntes: classificarHRN(parseFloat(p.hrnAntes) || 0),
      medidasEngenharia: p.medidasEngenharia || '',
      loDepois: parseFloat(p.loDepois) || 0, feDepois: parseFloat(p.feDepois) || 0,
      dphDepois: parseFloat(p.dphDepois) || 0, npDepois: parseFloat(p.npDepois) || 0,
      hrnDepois: parseFloat(p.hrnDepois) || 0, classificacaoDepois: classificarHRN(parseFloat(p.hrnDepois) || 0),
    }))
    if (perigos.length > 0) await db.from('Perigo').insert(perigos)

    return NextResponse.json({ id, status: 'ok' })
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao atualizar laudo', details: String(err) }, { status: 500 })
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
