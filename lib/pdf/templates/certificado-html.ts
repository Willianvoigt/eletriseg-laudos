import { LOGO_BASE64 } from './logo-base64'

export interface CertificadoData {
  numero: string
  nome: string
  cpf: string
  empresa: string
  cnpj: string
  data: string
}

function gerarPaginaCertificado(data: CertificadoData, logoImg: string, ultimo: boolean): string {
  return `
  <div class="certificado" style="${ultimo ? '' : 'page-break-after: always;'}">

    <!-- Fundo decorativo -->
    <div class="bg-pattern"></div>
    <div class="bg-overlay"></div>

    <!-- Ornamentos de canto -->
    <div class="corner corner-tl"></div>
    <div class="corner corner-tr"></div>
    <div class="corner corner-bl"></div>
    <div class="corner corner-br"></div>

    <!-- Borda interna -->
    <div class="inner-border"></div>

    <!-- Faixa lateral esquerda -->
    <div class="side-band">
      <div class="side-band-text">NR-12 • MÁQUINAS E EQUIPAMENTOS • ELETRISEG ENGENHARIA</div>
    </div>

    <!-- Conteúdo principal -->
    <div class="content-wrap">

      <!-- Cabeçalho -->
      <div class="header">
        <div class="header-logo">${logoImg}</div>
        <div class="header-center">
          <div class="cert-label">CERTIFICADO DE CONCLUSÃO</div>
          <div class="cert-nr">N° <strong>${data.numero}</strong></div>
        </div>
        <div class="header-nr12">
          <span class="nr12-badge">NR-12</span>
          <span class="nr12-sub">Máquinas e<br>Equipamentos</span>
        </div>
      </div>

      <!-- Divisor decorativo -->
      <div class="divider">
        <span class="divider-diamond">◆</span>
      </div>

      <!-- Corpo -->
      <div class="body">
        <div class="body-main">

          <p class="intro-text">Certificamos que</p>
          <p class="nome-destaque">${data.nome}</p>

          <p class="texto-corpo">
            concluiu com aproveitamento satisfatório o
            <strong>"Treinamento Teórico e Prático de NR-12 — Máquinas e Equipamentos"</strong>,
            com carga horária de <strong>8 horas</strong>, em conformidade com a referida norma,
            realizado no dia <strong>${data.data}</strong> para a empresa
            <strong>${data.empresa}</strong>, CNPJ n° <strong>${data.cnpj}</strong>.
          </p>

          <p class="local-data">Joinville, ${data.data}.</p>

          <div class="assinaturas">
            <div class="assinatura">
              <div class="linha-ass"></div>
              <div class="ass-nome">${data.nome}</div>
              <div class="ass-detalhe">CPF n° ${data.cpf}</div>
              <div class="ass-detalhe">Participante</div>
            </div>
            <div class="assinatura-selo">
              <div class="selo-circulo">
                <div class="selo-inner">
                  <div class="selo-top">EletriSeg</div>
                  <div class="selo-nr">NR-12</div>
                  <div class="selo-bottom">Engenharia</div>
                </div>
              </div>
            </div>
            <div class="assinatura">
              <div class="linha-ass"></div>
              <div class="ass-nome">Bruno Cardoso</div>
              <div class="ass-detalhe">Engenheiro Eletricista</div>
              <div class="ass-detalhe">Eng. de Segurança do Trabalho</div>
              <div class="ass-detalhe">CREA-SC 108.955-2</div>
            </div>
          </div>
        </div>

        <div class="body-lateral">
          <div class="lat-header">Conteúdo<br>Programático</div>
          <ul class="lat-lista">
            <li>NR-12: Teoria e prática de máquinas e equipamentos</li>
            <li>ABNT NB 033 – Ferramentas abrasivas</li>
            <li>ABNT NBR 13543 – Movimentações de carga</li>
            <li>ABNT NBR 13758 – Distâncias seguras</li>
            <li>ABNT NBR 13929 – Intertravamentos</li>
            <li>ABNT NBR NM 272 – Proteções fixas e móveis</li>
            <li>NR-35 – Trabalho em altura</li>
            <li>NR-6 – EPIs</li>
            <li>NR-10 – Segurança em eletricidade</li>
            <li>NR-12 – Máquinas e equipamentos</li>
            <li>NR-18 – Construção civil</li>
            <li>Análise de risco e condições impeditivas</li>
            <li>Equipamentos de proteção coletiva</li>
            <li>Acidentes típicos com máquinas</li>
            <li>Práticas nos equipamentos e checklist</li>
            <li>Condutas em emergências e primeiros socorros</li>
          </ul>
        </div>
      </div>

      <!-- Rodapé -->
      <div class="rodape">
        <div class="rodape-esq">EletriSeg Engenharia LTDA — Joinville, SC</div>
        <div class="rodape-linha"></div>
        <div class="rodape-dir">Livro: 03 &nbsp;|&nbsp; N° ${data.numero}</div>
      </div>

    </div>
  </div>`
}

export function gerarCertificadosHTML(lista: CertificadoData[]): string {
  const logoImg = LOGO_BASE64
    ? `<img src="data:image/png;base64,${LOGO_BASE64}" alt="EletriSeg" style="height:56px;" />`
    : `<span style="font-size:24px;font-weight:900;color:#fff;letter-spacing:1px;">Eletri<span style="color:#a8dfe1;">Seg</span></span>`

  const paginas = lista.map((d, i) => gerarPaginaCertificado(d, logoImg, i === lista.length - 1)).join('\n')

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Certificados NR-12 — EletriSeg</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    @page { size: A4 landscape; margin: 0; }

    body {
      font-family: 'Arial', sans-serif;
      background: #e8e8e8;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* ── Container principal ── */
    .certificado {
      width: 297mm;
      height: 210mm;
      position: relative;
      overflow: hidden;
      background: #fff;
    }

    /* ── Fundo geométrico ── */
    .bg-pattern {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(135deg, #0d3b3e 0%, #0f4a4e 40%, #0a2e31 100%);
    }

    .bg-overlay {
      position: absolute;
      inset: 0;
      background-image:
        radial-gradient(ellipse at 15% 50%, rgba(74,155,158,0.25) 0%, transparent 55%),
        radial-gradient(ellipse at 85% 20%, rgba(74,155,158,0.18) 0%, transparent 45%),
        repeating-linear-gradient(
          45deg,
          transparent,
          transparent 30px,
          rgba(255,255,255,0.015) 30px,
          rgba(255,255,255,0.015) 31px
        );
    }

    /* ── Ornamentos de canto ── */
    .corner {
      position: absolute;
      width: 28mm;
      height: 28mm;
      z-index: 2;
    }

    .corner::before,
    .corner::after {
      content: '';
      position: absolute;
      background: #4a9b9e;
    }

    .corner-tl { top: 6mm; left: 6mm; }
    .corner-tr { top: 6mm; right: 6mm; transform: rotate(90deg); }
    .corner-bl { bottom: 6mm; left: 6mm; transform: rotate(-90deg); }
    .corner-br { bottom: 6mm; right: 6mm; transform: rotate(180deg); }

    .corner::before {
      top: 0; left: 0;
      width: 100%; height: 2.5px;
    }
    .corner::after {
      top: 0; left: 0;
      width: 2.5px; height: 100%;
    }

    /* Ponto de canto */
    .corner-tl::before { box-shadow: inset 0 0 0 0 transparent; }
    .corner-tl { /* dot */ }
    .corner-tl::before {
      box-shadow: 0 0 0 4px rgba(74,155,158,0.3);
      border-radius: 0 0 3px 0;
    }

    /* ── Borda interna ── */
    .inner-border {
      position: absolute;
      inset: 8mm;
      border: 1px solid rgba(74,155,158,0.35);
      border-radius: 2px;
      z-index: 2;
      pointer-events: none;
    }

    /* ── Faixa lateral ── */
    .side-band {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 7mm;
      background: linear-gradient(180deg, #4a9b9e 0%, #2d7a7d 100%);
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .side-band-text {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      font-size: 5.5pt;
      font-weight: bold;
      letter-spacing: 2px;
      color: rgba(255,255,255,0.7);
      text-transform: uppercase;
      white-space: nowrap;
    }

    /* ── Wrapper do conteúdo ── */
    .content-wrap {
      position: absolute;
      top: 0; bottom: 0;
      left: 7mm; right: 0;
      display: flex;
      flex-direction: column;
      padding: 9mm 10mm 7mm 10mm;
      z-index: 4;
    }

    /* ── Cabeçalho ── */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 5mm;
      border-bottom: 1.5px solid rgba(74,155,158,0.5);
      flex-shrink: 0;
    }

    .header-logo {
      display: flex;
      align-items: center;
      min-width: 70px;
    }

    .header-center {
      text-align: center;
      flex: 1;
    }

    .cert-label {
      font-size: 7.5pt;
      letter-spacing: 5px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.55);
      margin-bottom: 2px;
    }

    .cert-nr {
      font-size: 24pt;
      font-weight: 300;
      color: #fff;
      letter-spacing: 4px;
      text-transform: uppercase;
      line-height: 1;
    }

    .cert-nr strong { font-weight: 700; color: #a8dfe1; }

    .header-nr12 {
      text-align: right;
      min-width: 70px;
    }

    .nr12-badge {
      display: block;
      font-size: 22pt;
      font-weight: 900;
      color: #4a9b9e;
      line-height: 1;
    }

    .nr12-sub {
      display: block;
      font-size: 7pt;
      color: rgba(255,255,255,0.45);
      letter-spacing: 1px;
      line-height: 1.4;
    }

    /* ── Divisor ── */
    .divider {
      text-align: center;
      color: rgba(74,155,158,0.6);
      font-size: 8pt;
      margin: 3mm 0;
      flex-shrink: 0;
      letter-spacing: 8px;
    }

    .divider-diamond { color: #4a9b9e; }

    /* ── Corpo ── */
    .body {
      display: flex;
      gap: 8mm;
      flex: 1;
      min-height: 0;
    }

    .body-main {
      flex: 1.65;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .intro-text {
      font-size: 8.5pt;
      color: rgba(255,255,255,0.5);
      text-transform: uppercase;
      letter-spacing: 3px;
      margin-bottom: 1.5mm;
    }

    .nome-destaque {
      font-size: 16pt;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 1px;
      border-bottom: 1px solid rgba(74,155,158,0.4);
      padding-bottom: 2mm;
      margin-bottom: 3mm;
      text-transform: uppercase;
    }

    .texto-corpo {
      font-size: 9pt;
      line-height: 1.65;
      color: rgba(255,255,255,0.72);
      text-align: justify;
      flex: 1;
    }

    .texto-corpo strong { color: rgba(255,255,255,0.95); }

    .local-data {
      font-size: 8.5pt;
      color: rgba(255,255,255,0.45);
      margin-top: 3mm;
      font-style: italic;
    }

    /* ── Assinaturas ── */
    .assinaturas {
      display: flex;
      align-items: flex-end;
      gap: 6mm;
      margin-top: 4mm;
    }

    .assinatura { flex: 1; }

    .linha-ass {
      border-bottom: 1px solid rgba(74,155,158,0.6);
      margin-bottom: 2.5px;
    }

    .ass-nome {
      font-size: 8.5pt;
      font-weight: bold;
      color: rgba(255,255,255,0.9);
    }

    .ass-detalhe {
      font-size: 7.5pt;
      color: rgba(255,255,255,0.45);
    }

    /* ── Selo central ── */
    .assinatura-selo {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }

    .selo-circulo {
      width: 22mm;
      height: 22mm;
      border-radius: 50%;
      border: 2px solid rgba(74,155,158,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle, rgba(74,155,158,0.12) 0%, transparent 70%);
      box-shadow: 0 0 0 4px rgba(74,155,158,0.1), inset 0 0 0 3px rgba(74,155,158,0.08);
    }

    .selo-inner {
      text-align: center;
      line-height: 1.3;
    }

    .selo-top {
      font-size: 7pt;
      font-weight: 700;
      color: #4a9b9e;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }

    .selo-nr {
      font-size: 11pt;
      font-weight: 900;
      color: #fff;
    }

    .selo-bottom {
      font-size: 6.5pt;
      color: rgba(255,255,255,0.5);
      letter-spacing: 1px;
    }

    /* ── Coluna lateral ── */
    .body-lateral {
      flex: 1;
      border-left: 1.5px solid rgba(74,155,158,0.3);
      padding-left: 6mm;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .lat-header {
      font-size: 8pt;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #4a9b9e;
      margin-bottom: 2.5mm;
      border-bottom: 1px solid rgba(74,155,158,0.25);
      padding-bottom: 2mm;
      line-height: 1.3;
    }

    .lat-lista {
      list-style: none;
      flex: 1;
      overflow: hidden;
    }

    .lat-lista li {
      font-size: 7pt;
      color: rgba(255,255,255,0.5);
      line-height: 1.55;
      padding: 0.8px 0;
    }

    .lat-lista li::before {
      content: '▸ ';
      color: #4a9b9e;
      font-size: 6.5pt;
    }

    /* ── Rodapé ── */
    .rodape {
      display: flex;
      align-items: center;
      gap: 4mm;
      padding-top: 3mm;
      margin-top: 3mm;
      border-top: 1px solid rgba(74,155,158,0.25);
      flex-shrink: 0;
    }

    .rodape-esq {
      font-size: 7pt;
      color: rgba(255,255,255,0.3);
    }

    .rodape-linha {
      flex: 1;
      height: 1px;
      background: rgba(74,155,158,0.15);
    }

    .rodape-dir {
      font-size: 7.5pt;
      font-weight: bold;
      color: rgba(74,155,158,0.7);
      font-family: monospace;
    }

    @media print {
      body { background: transparent; }
      .certificado { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
${paginas}
</body>
</html>`
}

export function gerarCertificadoHTML(data: CertificadoData): string {
  return gerarCertificadosHTML([data])
}
