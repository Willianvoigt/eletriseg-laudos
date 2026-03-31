import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

function classificarHRN(hrn: number): string {
  if (hrn <= 1) return 'Aceitável'
  if (hrn <= 5) return 'Muito Baixo'
  if (hrn <= 10) return 'Baixo'
  if (hrn <= 50) return 'Significante'
  if (hrn <= 100) return 'Alto'
  if (hrn <= 500) return 'Muito Alto'
  return 'Extremo'
}

function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const empresaNome = body.empresaNome || body.nomeEmpresa || ''
    const maquinaNome = body.maquinaNome || body.nomeMaquina || ''

    if (!empresaNome || !maquinaNome) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
    }

    const db = getServiceClient()

    // 1. Inserir laudo
    const { data: laudo, error: laudoError } = await db
      .from('Laudo')
      .insert({
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user.id,
        status: 'CONCLUIDO',
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
        pdfUrl: null,
      })
      .select()
      .single()

    if (laudoError) {
      console.error('Erro ao inserir laudo:', laudoError)
      return NextResponse.json({ error: 'Erro ao salvar laudo', details: laudoError.message }, { status: 500 })
    }

    // 2. Inserir dispositivos de segurança
    const dispositivos = (body.dispositivosSeguranca || []).map((d: any, i: number) => ({
      laudoId: laudo.id,
      ordem: i + 1,
      descricao: d.descricao || '',
      fotoUrl: d.foto || null,
    }))

    if (dispositivos.length > 0) {
      const { error: dispError } = await db.from('DispositivoSeguranca').insert(dispositivos)
      if (dispError) console.error('Erro ao inserir dispositivos:', dispError)
    }

    // 3. Inserir perigos
    const perigos = (body.perigos || []).map((p: any, i: number) => ({
      laudoId: laudo.id,
      ordem: i + 1,
      cicloVida: p.cicloVida || '',
      numeroPerigo: p.numeroPerigo || '',
      tarefa: p.tarefa || '',
      descricaoPerigo: p.descricaoPerigo || '',
      loAntes: parseFloat(p.loAntes) || 0,
      feAntes: parseFloat(p.feAntes) || 0,
      dphAntes: parseFloat(p.dphAntes) || 0,
      npAntes: parseFloat(p.npAntes) || 0,
      hrnAntes: parseFloat(p.hrnAntes) || 0,
      classificacaoAntes: classificarHRN(parseFloat(p.hrnAntes) || 0),
      medidasEngenharia: p.medidasEngenharia || '',
      loDepois: parseFloat(p.loDepois) || 0,
      feDepois: parseFloat(p.feDepois) || 0,
      dphDepois: parseFloat(p.dphDepois) || 0,
      npDepois: parseFloat(p.npDepois) || 0,
      hrnDepois: parseFloat(p.hrnDepois) || 0,
      classificacaoDepois: classificarHRN(parseFloat(p.hrnDepois) || 0),
    }))

    if (perigos.length > 0) {
      const { error: perigoError } = await db.from('Perigo').insert(perigos)
      if (perigoError) console.error('Erro ao inserir perigos:', perigoError)
    }

    return NextResponse.json({ id: laudo.id, status: 'ok' })
  } catch (err) {
    console.error('Erro ao salvar laudo:', err)
    return NextResponse.json({ error: 'Erro ao salvar laudo', details: String(err) }, { status: 500 })
  }
}
