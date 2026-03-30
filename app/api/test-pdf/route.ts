import { NextResponse } from 'next/server'
import { gerarLaudoHTML } from '@/lib/pdf/templates/laudo-html'
import type { LaudoData } from '@/lib/pdf/generator'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.empresaNome || !body.maquinaNome) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
    }

    const laudoData: LaudoData = {
      empresaNome: body.empresaNome || '',
      empresaCNPJ: body.empresaCNPJ || '',
      empresaEndereco: body.empresaEndereco || '',
      empresaDataAbertura: body.empresaDataAbertura || '',
      empresaCNAE: body.empresaCNAE || '',
      maquinaNome: body.maquinaNome || '',
      maquinaModelo: body.maquinaModelo || '',
      maquinaSerial: body.maquinaSerial || '',
      maquinaFabricante: body.maquinaFabricante || '',
      maquinaAno: body.maquinaAno || '',
      maquinaSetor: body.maquinaSetor || '',
      maquinaDescricao: body.maquinaDescricao || '',
      fotoPlacar: body.fotoPlacar,
      fotoVisaoGeral: body.fotoVisaoGeral,
      dispositivosSeguranca: body.dispositivosSeguranca || [],
      perigos: body.perigos || [],
      tipoConlusao: body.tipoConlusao || 'B',
      artNumero: body.artNumero,
    }

    // Retornar HTML para preview (PDF é gerado no client agora)
    const html = gerarLaudoHTML(laudoData)

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    })
  } catch (err) {
    console.error('Erro ao gerar preview:', err)
    return NextResponse.json({ error: 'Erro ao gerar preview', details: String(err) }, { status: 500 })
  }
}
