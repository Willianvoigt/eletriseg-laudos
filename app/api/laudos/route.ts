import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { gerarPDF, type LaudoData } from '@/lib/pdf/generator'
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

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Mapear dados do formulário antigo para o novo gerador
    const empresaNome = body.empresaNome || body.nomeEmpresa || ''
    const maquinaNome = body.maquinaNome || body.nomeMaquina || ''

    if (!empresaNome || !maquinaNome) {
      return NextResponse.json({ error: 'Dados incompletos: empresa e máquina obrigatórias' }, { status: 400 })
    }

    // Preparar dados para o gerador
    const laudoData: LaudoData = {
      tipoLaudo: body.tipoLaudo || '',
      empresaNome,
      empresaCNPJ: body.empresaCNPJ || body.cnpj || '',
      empresaEndereco: body.empresaEndereco || body.endereco || '',
      empresaDataAbertura: body.empresaDataAbertura || body.dataAbertura || '',
      empresaCNAE: body.empresaCNAE || body.atividadeEconomica || '',
      maquinaNome,
      maquinaModelo: body.maquinaModelo || body.modelo || '',
      maquinaSerial: body.maquinaSerial || body.numeroSerie || '',
      maquinaFabricante: body.maquinaFabricante || body.fabricante || '',
      maquinaAno: body.maquinaAno || body.anoFabricacao || '',
      maquinaSetor: body.maquinaSetor || body.setor || '',
      maquinaDescricao: body.maquinaDescricao || body.descricaoFuncao || '',
      usoPretendido: body.usoPretendido || '',
      modoOperacao: body.modoOperacao || '',
      fotoPlacar: body.fotoPlacar || body.fotoPlacaMaquina,
      fotoVisaoGeral: body.fotoVisaoGeral,
      dispositivosSeguranca: (body.dispositivosSeguranca || []).map((d: any) => ({
        descricao: d.descricao || '',
        foto: d.foto,
      })),
      perigos: (body.perigos || []).map((p: any) => ({
        cicloVida: p.cicloVida || '',
        numeroPerigo: p.numeroPerigo || '',
        tarefa: p.tarefa || '',
        descricaoPerigo: p.descricaoPerigo || '',
        loAntes: parseFloat(p.loAntes) || 0,
        feAntes: parseFloat(p.feAntes) || 0,
        dphAntes: parseFloat(p.dphAntes) || 0,
        npAntes: parseFloat(p.npAntes) || 0,
        hrnAntes: parseFloat(p.hrnAntes) || 0,
        loDepois: parseFloat(p.loDepois) || 0,
        feDepois: parseFloat(p.feDepois) || 0,
        dphDepois: parseFloat(p.dphDepois) || 0,
        npDepois: parseFloat(p.npDepois) || 0,
        hrnDepois: parseFloat(p.hrnDepois) || 0,
        medidasEngenharia: p.medidasEngenharia || '',
      })),
      tipoConlusao: (body.tipoConlusao || body.tipoConclusao || 'B') as 'A' | 'B',
      artNumero: body.artNumero || body.numeroArt,
    }

    // Gerar PDF
    const pdfBytes = await gerarPDF(laudoData)
    const pdfBuffer = Buffer.from(pdfBytes)

    // Upload PDF para Supabase Storage
    const timestamp = Date.now()
    const pdfFileName = `${user.id}/${timestamp}-${maquinaNome.replace(/\s+/g, '_')}.pdf`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('laudos-fotos')
      .upload(pdfFileName, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: false,
      })

    let pdfUrl: string | null = null
    if (!uploadError && uploadData) {
      const { data: urlData } = supabase.storage
        .from('laudos-fotos')
        .getPublicUrl(uploadData.path)
      pdfUrl = urlData.publicUrl
    }

    // Salvar laudo no banco de dados
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
        pdfUrl,
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

    // Retornar PDF como arquivo para download
    return new NextResponse(pdfBuffer as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Laudo_NR12_${maquinaNome.replace(/\s+/g, '_')}_${timestamp}.pdf"`,
        'X-Laudo-Id': laudo.id,
      },
    })
  } catch (err) {
    console.error('Erro ao gerar laudo:', err)
    return NextResponse.json({ error: 'Erro ao gerar PDF', details: String(err) }, { status: 500 })
  }
}

// GET - Listar laudos do usuário
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const laudos = await prisma.laudo.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        createdAt: true,
        status: true,
        tipoLaudo: true,
        nomeEmpresa: true,
        nomeMaquina: true,
        modelo: true,
        tipoConclusao: true,
        pdfUrl: true,
        _count: {
          select: {
            dispositivosSeguranca: true,
            perigos: true,
          },
        },
      },
    })

    return NextResponse.json(laudos)
  } catch (err) {
    console.error('Erro ao listar laudos:', err)
    return NextResponse.json({ error: 'Erro ao listar laudos' }, { status: 500 })
  }
}
