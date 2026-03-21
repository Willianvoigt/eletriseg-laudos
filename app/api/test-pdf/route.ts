import { NextResponse } from 'next/server'
import { gerarPDF, type LaudoData } from '@/lib/pdf/generator'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validar dados obrigatórios
    if (!body.empresaNome || !body.maquinaNome) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
    }

    // Preparar dados para o gerador
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

    // Gerar PDF
    const pdfBytes = await gerarPDF(laudoData)

    // Converter para Buffer
    const pdfBuffer = Buffer.from(pdfBytes)

    // Retornar PDF como arquivo para download
    return new NextResponse(pdfBuffer as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Laudo_NR12_${body.maquinaNome.replace(/\s+/g, '_')}_${Date.now()}.pdf"`,
      },
    })
  } catch (err) {
    console.error('Erro ao gerar laudo:', err)
    return NextResponse.json({ error: 'Erro ao gerar PDF', details: String(err) }, { status: 500 })
  }
}
