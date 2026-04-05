import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

function getServiceClient() {
  return createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { emailDestino, mensagem } = await request.json()
    if (!emailDestino) return NextResponse.json({ error: 'E-mail de destino obrigatório' }, { status: 400 })

    const db = getServiceClient()
    const { data: laudo } = await db
      .from('Laudo')
      .select('*')
      .eq('id', id)
      .eq('userId', user.id)
      .single()

    if (!laudo) return NextResponse.json({ error: 'Laudo não encontrado' }, { status: 404 })

    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) return NextResponse.json({ error: 'Serviço de e-mail não configurado' }, { status: 503 })

    const resend = new Resend(resendKey)

    const dataFormatada = new Date(laudo.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    })

    const { error } = await resend.emails.send({
      from: 'EletriSeg <laudos@eletriseg.com.br>',
      to: [emailDestino],
      subject: `Laudo Técnico NR-12 — ${laudo.nomeMaquina} | ${laudo.nomeEmpresa}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 32px; border-radius: 8px;">
          <div style="background: #0d3b3e; padding: 24px; border-radius: 8px; margin-bottom: 24px; text-align: center;">
            <h1 style="color: #4a9b9e; margin: 0; font-size: 24px;">EletriSeg Engenharia</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0; font-size: 13px;">Laudo Técnico NR-12</p>
          </div>

          ${mensagem ? `<p style="color: #333; font-size: 15px; margin-bottom: 24px;">${mensagem}</p>` : ''}

          <div style="background: #fff; padding: 24px; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 24px;">
            <h2 style="color: #0d3b3e; font-size: 16px; margin: 0 0 16px;">Dados do Laudo</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 8px 0; color: #888; width: 40%;">Empresa</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${laudo.nomeEmpresa}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 8px 0; color: #888;">CNPJ</td>
                <td style="padding: 8px 0; color: #333;">${laudo.cnpj}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 8px 0; color: #888;">Máquina</td>
                <td style="padding: 8px 0; color: #333; font-weight: 600;">${laudo.nomeMaquina}${laudo.modelo ? ` ${laudo.modelo}` : ''}</td>
              </tr>
              ${laudo.numeroSerie ? `<tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 8px 0; color: #888;">Número de Série</td><td style="padding: 8px 0; color: #333;">${laudo.numeroSerie}</td></tr>` : ''}
              ${laudo.fabricante ? `<tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 8px 0; color: #888;">Fabricante</td><td style="padding: 8px 0; color: #333;">${laudo.fabricante}</td></tr>` : ''}
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 8px 0; color: #888;">Conclusão</td>
                <td style="padding: 8px 0; color: #333;">Tipo ${laudo.tipoConclusao || 'B'}</td>
              </tr>
              ${laudo.numeroArt ? `<tr style="border-bottom: 1px solid #f0f0f0;"><td style="padding: 8px 0; color: #888;">N° ART</td><td style="padding: 8px 0; color: #333;">${laudo.numeroArt}</td></tr>` : ''}
              <tr>
                <td style="padding: 8px 0; color: #888;">Data do Laudo</td>
                <td style="padding: 8px 0; color: #333;">${dataFormatada}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; padding: 16px; background: #e8f5f5; border-radius: 8px; margin-bottom: 24px;">
            <p style="color: #0d3b3e; font-size: 13px; margin: 0;">
              O PDF completo do laudo será enviado em anexo separadamente.
            </p>
          </div>

          <div style="text-align: center; font-size: 12px; color: #999;">
            <p>EletriSeg Engenharia LTDA — Joinville, SC</p>
            <p>Engenheiro Responsável: Bruno Cardoso | CREA-SC 108.955-2</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Erro ao enviar e-mail:', error)
      return NextResponse.json({ error: 'Erro ao enviar e-mail', details: error.message }, { status: 500 })
    }

    return NextResponse.json({ status: 'ok' })
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao enviar e-mail', details: String(err) }, { status: 500 })
  }
}
