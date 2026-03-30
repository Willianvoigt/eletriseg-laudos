import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Classificação HRN
function classificarHRN(hrn: number): string {
  if (hrn <= 1) return 'Aceitável'
  if (hrn <= 5) return 'Muito Baixo'
  if (hrn <= 10) return 'Baixo'
  if (hrn <= 50) return 'Significante'
  if (hrn <= 100) return 'Alto'
  if (hrn <= 500) return 'Muito Alto'
  return 'Extremo'
}

// POST - Salvar laudo (PDF é gerado no cliente agora)
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
      return NextResponse.json({ error: 'Dados incompletos: empresa e máquina obrigatórias' }, { status: 400 })
    }

    const laudo = await prisma.laudo.create({
      data: {
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
        dispositivosSeguranca: {
          create: (body.dispositivosSeguranca || []).map((d: any, i: number) => ({
            ordem: i + 1,
            descricao: d.descricao || '',
            fotoUrl: d.foto || null,
          })),
        },
        perigos: {
          create: (body.perigos || []).map((p: any, i: number) => ({
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
          })),
        },
      },
    })

    return NextResponse.json({ id: laudo.id, status: 'ok' })
  } catch (err) {
    console.error('Erro ao gerar laudo:', err)
    return NextResponse.json({ error: 'Erro ao salvar laudo', details: String(err) }, { status: 500 })
  }
}

// GET - Listar laudos do usuário
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      console.warn('GET /api/laudos: Usuário não autenticado')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log(`GET /api/laudos: Buscando laudos para usuário ${user.id}`)

    const laudos = await prisma.laudo.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            dispositivosSeguranca: true,
            perigos: true,
          },
        },
      },
    })

    console.log(`GET /api/laudos: Encontrados ${laudos.length} laudos`)

    // Mapear para formato do frontend
    const resultado = laudos.map(laudo => ({
      id: laudo.id,
      createdAt: laudo.createdAt.toISOString(),
      status: laudo.status,
      tipoLaudo: laudo.tipoLaudo,
      nomeEmpresa: laudo.nomeEmpresa,
      nomeMaquina: laudo.nomeMaquina,
      modelo: laudo.modelo,
      tipoConclusao: laudo.tipoConclusao,
      pdfUrl: laudo.pdfUrl,
      _count: laudo._count,
    }))

    return NextResponse.json(resultado)
  } catch (err) {
    console.error('Erro ao listar laudos:', err)
    const errorMsg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({
      error: 'Erro ao listar laudos',
      details: errorMsg
    }, { status: 500 })
  }
}
