import { LaudoData } from '../generator'
import { LOGO_BASE64 } from './logo-base64'

const logoBase64 = LOGO_BASE64

export function gerarLaudoHTML(data: LaudoData): string {
  const hoje = new Date()
  const dataFormatada = hoje.toLocaleDateString('pt-BR')

  const logoImg = logoBase64
    ? `<img src="data:image/png;base64,${logoBase64}" alt="EletriSeg" />`
    : `<span class="logo-text"><span class="logo-eletri">Eletri</span><span class="logo-seg">Seg</span></span>`

  // Helper para classificar HRN
  const classificarHRN = (hrn: number): { cor: string; classe: string; corTexto: string } => {
    if (hrn <= 5) return { cor: '#90EE90', classe: 'Aceitável', corTexto: '#000' }
    if (hrn <= 50) return { cor: '#FFEB3B', classe: 'Muito Significante', corTexto: '#000' }
    if (hrn <= 500) return { cor: '#FF9800', classe: 'Alto', corTexto: '#fff' }
    if (hrn <= 1000) return { cor: '#FF6B6B', classe: 'Muito Alto', corTexto: '#fff' }
    return { cor: '#B71C1C', classe: 'Extremo', corTexto: '#fff' }
  }

  // Helper para gerar header padrão (todas as páginas internas)
  const nomeMaq = data.maquinaNome || 'N/A'
  const maquinaHeader = data.maquinaModelo && !nomeMaq.includes(data.maquinaModelo)
    ? `${nomeMaq} ${data.maquinaModelo}`
    : nomeMaq

  // Calcular numeração dinâmica de páginas
  const nDisp = data.dispositivosSeguranca ? data.dispositivosSeguranca.length : 0
  const nPerigos = data.perigos ? data.perigos.length : 0
  const paginasDisp = nDisp > 0 ? Math.ceil(nDisp / 2) : 0
  const paginasResumoHRN = nPerigos > 0 ? Math.ceil(nPerigos / 8) : 0
  const temLimites = (data.usoPretendido || data.modoOperacao) ? 1 : 0
  const temFotos = (data.fotoPlacar || data.fotoVisaoGeral) ? 1 : 0

  // Páginas fixas: Capa(1) Sumário(2) Intro(3) Metod1(4) Metod2(5) Identificação(6)
  const pgIntro = 3
  const pgMetodologia = 4
  const pgIdentificacao = 6
  const pgLimites = pgIdentificacao + 1
  const pgFotos = pgIdentificacao + temLimites + 1
  const pgDispInicio = pgIdentificacao + temLimites + temFotos + 1
  const pgResumoHRN = nDisp > 0 ? pgDispInicio + paginasDisp : pgDispInicio
  const pgAnaliseInicio = nPerigos > 0 ? pgResumoHRN + paginasResumoHRN : pgResumoHRN
  const pgAnaliseTotal = nPerigos
  const pgCategoria = pgAnaliseInicio + pgAnaliseTotal
  const pgManual = pgCategoria + 1
  const pgConclusao = pgManual + 1

  const gerarHeader = (): string => {
    return `
      <div class="header">
        <div class="header-left">LAUDO TÉCNICO NR12 – ${data.empresaNome || 'EMPRESA'}</div>
        <div class="header-right">Máquina ${maquinaHeader}</div>
      </div>
      <div class="header-line"></div>
    `
  }

  // Helper para gerar footer padrão
  const gerarFooter = (pagina: number | string = ''): string => {
    return `
      <div class="footer">
        <div class="footer-line"></div>
        <div class="footer-content">
          <div class="footer-left">
            <div>Engenharia Elétrica</div>
            <div>Eng. de Segurança do Trabalho</div>
          </div>
          <div class="footer-center">
            <strong>EletriSeg Engenharia LTDA</strong><br>
            CREA-SC: 128.716-3
          </div>
          <div class="footer-right">
            <div class="footer-logo">${logoImg}</div>
            <div>${pagina}</div>
          </div>
        </div>
      </div>
    `
  }

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laudo Técnico NR-12 – ${data.empresaNome}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    table, img {
      max-width: 100%;
    }

    @page {
      size: A4;
      margin: 12mm 15mm 18mm 15mm;
    }

    body {
      font-family: 'Arial', sans-serif;
      font-size: 10px;
      line-height: 1.5;
      color: #000;
      background: white;
    }

    /* ===== PÁGINA ===== */
    .page {
      page-break-after: always;
      width: 100%;
      min-height: 260mm;
      position: relative;
      padding: 0;
      overflow: hidden;
    }
    .page:last-child {
      page-break-after: avoid;
    }

    /* ===== HEADER (páginas internas) ===== */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 9px;
      padding: 5px 0;
    }
    .header-left {
      font-weight: bold;
      text-transform: uppercase;
    }
    .header-right {
      font-weight: bold;
    }
    .header-line {
      border-bottom: 2px solid #000;
      margin-bottom: 15px;
    }

    /* ===== FOOTER ===== */
    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      font-size: 8px;
    }
    .footer-line {
      border-top: 2px solid #000;
      margin-bottom: 8px;
    }
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .footer-left {
      flex: 1;
    }
    .footer-center {
      flex: 1;
      text-align: center;
    }
    .footer-right {
      flex: 1;
      text-align: right;
      font-weight: bold;
    }
    .footer-logo {
      margin-bottom: 4px;
    }
    .footer-logo img {
      width: 150px;
      height: auto;
    }
    .footer-logo .logo-text {
      font-size: 14px;
    }

    /* ===== CAPA ===== */
    .capa {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 20px 0;
      min-height: 260mm;
      justify-content: space-between;
    }
    .capa-top {
      width: 100%;
    }
    .capa-header-line {
      border-bottom: 2px solid #000;
      padding-bottom: 10px;
      margin-bottom: 20px;
      font-size: 9px;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
    }
    .capa-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px 40px;
    }
    .capa-logo {
      margin-bottom: 30px;
    }
    .capa-logo img {
      width: 180px;
      height: auto;
    }
    .capa-titulo-laudo {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 30px;
      line-height: 1.6;
    }
    .capa-nr12 {
      font-size: 100px;
      font-weight: bold;
      letter-spacing: 15px;
      color: #000;
      margin: 20px 0;
    }
    .capa-empresa {
      font-size: 14px;
      font-weight: bold;
      margin: 30px 0 10px;
      text-transform: uppercase;
    }
    .capa-revisoes {
      border: 1px solid #000;
      width: 100%;
      max-width: 420px;
      margin: 30px auto 0;
      font-size: 8px;
    }
    .capa-revisoes table {
      width: 100%;
      border-collapse: collapse;
    }
    .capa-revisoes th,
    .capa-revisoes td {
      border: 1px solid #000;
      padding: 4px 6px;
      text-align: center;
    }
    .capa-revisoes th {
      font-weight: bold;
      background: #f0f0f0;
    }

    /* ===== CONTEÚDO ===== */
    .content {
      padding-bottom: 25mm;
      overflow: hidden;
      max-width: 100%;
    }

    /* ===== SUMÁRIO ===== */
    .sumario-titulo {
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      margin: 30px 0 25px;
    }
    .sumario-item {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 10px;
      margin: 6px 0;
      line-height: 1.6;
    }
    .sumario-item-text {
      flex: 1;
    }
    .sumario-item-dots {
      flex: 1;
      border-bottom: 1px dotted #999;
      margin: 0 5px;
      min-width: 30px;
    }
    .sumario-item-page {
      min-width: 20px;
      text-align: right;
    }
    .sumario-sub {
      padding-left: 20px;
    }

    /* ===== SEÇÕES ===== */
    .secao {
      margin-bottom: 20px;
    }
    .secao-titulo {
      font-size: 12px;
      font-weight: bold;
      margin: 20px 0 12px;
    }
    .secao-subtitulo {
      font-size: 11px;
      font-weight: bold;
      margin: 15px 0 10px;
    }
    .secao-texto {
      font-size: 10px;
      text-align: justify;
      margin-bottom: 10px;
      line-height: 1.6;
    }
    .secao-lista {
      margin: 10px 0 10px 30px;
      font-size: 10px;
      line-height: 1.8;
    }

    /* ===== CAMPOS (label: valor) ===== */
    .campo {
      display: grid;
      grid-template-columns: 160px 1fr;
      gap: 10px;
      margin: 8px 0;
      font-size: 10px;
    }
    .campo-label {
      font-weight: bold;
    }
    .campo-valor {
      border-bottom: 1px solid #000;
      padding-bottom: 2px;
    }

    /* ===== TABELAS ===== */
    .tabela {
      width: 98%;
      border-collapse: collapse;
      margin: 8px auto;
      font-size: 7.5px;
    }
    .tabela th {
      background: #1e3a8a;
      color: white;
      border: 1px solid #000;
      padding: 4px 3px;
      font-weight: bold;
      text-align: center;
    }
    .tabela td {
      border: 1px solid #000;
      padding: 3px 3px;
      text-align: center;
    }
    .tabela tbody tr:nth-child(even) {
      background: #f5f5f5;
    }

    /* ===== TABELAS HRN REFERÊNCIA ===== */
    .tabela-hrn-ref {
      width: 98%;
      border-collapse: collapse;
      margin: 6px auto;
      font-size: 7.5px;
      page-break-inside: avoid;
    }
    .tabela-hrn-ref th,
    .tabela-hrn-ref td {
      border: 1px solid #000;
      padding: 3px 5px;
    }
    .tabela-hrn-ref th {
      background: #e0e0e0;
      font-weight: bold;
    }

    /* ===== DISPOSITIVOS / ITENS COM FOTO ===== */
    .dispositivo-item {
      display: grid;
      grid-template-columns: 160px 1fr;
      gap: 10px;
      margin: 10px 0;
      page-break-inside: avoid;
      border: 1px solid #ddd;
      padding: 8px;
      max-width: 100%;
      overflow: hidden;
    }
    .dispositivo-foto {
      text-align: center;
    }
    .dispositivo-foto img {
      max-width: 150px;
      max-height: 120px;
      border: 1px solid #999;
      object-fit: cover;
    }
    .dispositivo-foto .foto-legenda {
      font-size: 8px;
      font-weight: bold;
      margin-top: 5px;
      text-align: center;
    }
    .dispositivo-descricao {
      font-size: 10px;
      text-align: justify;
      line-height: 1.6;
    }

    /* ===== FOTOS GRID ===== */
    .foto-grid {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin: 15px 0;
    }
    .foto-container {
      text-align: center;
      page-break-inside: avoid;
    }
    .foto-container img {
      max-width: 100%;
      max-height: 280px;
      border: 1px solid #999;
      object-fit: contain;
    }
    .foto-legenda {
      font-size: 9px;
      font-weight: bold;
      margin-top: 5px;
    }

    /* ===== HRN ANÁLISE DETALHADA ===== */
    .hrn-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin: 8px 0;
      page-break-inside: avoid;
      max-width: 100%;
      overflow: hidden;
    }
    .hrn-box {
      border: 1px solid #999;
      padding: 8px;
      font-size: 7.5px;
      page-break-inside: avoid;
      overflow: hidden;
      min-width: 0;
    }
    .hrn-box-titulo {
      font-weight: bold;
      font-size: 8px;
      margin-bottom: 6px;
      padding: 4px;
      text-align: center;
    }
    .hrn-antes .hrn-box-titulo {
      background: #fff3e0;
      border-left: 3px solid #ff9800;
    }
    .hrn-depois .hrn-box-titulo {
      background: #e8f5e9;
      border-left: 3px solid #4caf50;
    }
    .hrn-parametros {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 4px;
      margin: 4px 0;
    }
    .hrn-param {
      text-align: center;
      padding: 3px 2px;
      border: 1px solid #ddd;
      background: #fafafa;
    }
    .hrn-param-label {
      font-size: 6.5px;
      font-weight: bold;
      color: #666;
    }
    .hrn-param-valor {
      font-size: 9px;
      font-weight: bold;
    }
    .hrn-resultado {
      text-align: center;
      font-weight: bold;
      margin-top: 4px;
      padding: 4px;
      font-size: 8px;
    }

    /* ===== MEDIDAS DE ENGENHARIA ===== */
    .medidas-box {
      background: #f5f5f5;
      border-left: 3px solid #1e3a8a;
      padding: 10px;
      margin: 10px 0;
      font-size: 10px;
      line-height: 1.5;
      page-break-inside: avoid;
    }

    /* ===== CONCLUSÃO ===== */
    .conclusao-box {
      border: 2px solid #000;
      padding: 20px;
      margin: 20px 0;
      font-size: 10px;
      page-break-inside: avoid;
    }

    /* ===== ASSINATURA ===== */
    .assinatura-bloco {
      text-align: center;
      margin: 50px auto 0;
      max-width: 300px;
    }
    .assinatura-linha {
      border-bottom: 1px solid #000;
      margin-bottom: 8px;
      padding-bottom: 5px;
    }
    .assinatura-nome {
      font-weight: bold;
      font-size: 11px;
    }
    .assinatura-cargo {
      font-size: 9px;
    }

    /* ===== CATEGORIA NBR ===== */
    .categoria-box {
      background: #f9f9f9;
      border: 1px solid #999;
      padding: 15px;
      margin: 15px 0;
      font-size: 10px;
      page-break-inside: avoid;
    }

    /* ===== LOGO FALLBACK ===== */
    .logo-text {
      font-size: 24px;
      font-weight: bold;
    }
    .logo-eletri { color: #505050; }
    .logo-seg { color: #4a9b9e; }

    @media print {
      body, html { margin: 0; padding: 0; }
      .page { page-break-after: always; margin: 0; padding: 0; }
    }
  </style>
</head>
<body>

<!-- ===== PÁGINA 1: CAPA ===== -->
<div class="page">
  <div class="capa">
    <div class="capa-top">
      <div class="capa-header-line">
        LAUDO TÉCNICO NR12 – ${data.empresaNome || 'EMPRESA'}<br>
        Máquina ${maquinaHeader}
      </div>
    </div>

    <div class="capa-body">
      <div class="capa-logo">${logoImg}</div>

      <div class="capa-titulo-laudo">
        Laudo de apreciação de riscos e<br>
        conformidades ${maquinaHeader}
      </div>

      <div class="capa-nr12">NR-12</div>

      <div class="capa-empresa">${data.empresaNome || 'EMPRESA'}</div>

      <div class="capa-revisoes">
        <table>
          <thead>
            <tr>
              <th>Rev.</th>
              <th>Data</th>
              <th>Descrição</th>
              <th>Responsável</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>00</td>
              <td>${dataFormatada}</td>
              <td>Emissão Inicial e Entrega</td>
              <td>Bruno C.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- ===== PÁGINA 2: SUMÁRIO ===== -->
<div class="page">
  ${gerarHeader()}
  <div class="content">
    <div class="sumario-titulo">Sumário</div>

    <div class="sumario-item"><span class="sumario-item-text">1 INTRODUÇÃO</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgIntro}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">2 OBJETIVO</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgIntro}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">3 NORMAS E DOCUMENTOS APLICÁVEIS</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgIntro}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">4 METODOLOGIA</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgMetodologia}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">5 APRECIAÇÃO DE RISCOS E CONFORMIDADES</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgIdentificacao}</span></div>
    <div class="sumario-item sumario-sub"><span class="sumario-item-text">5.1 Equipamento: ${data.maquinaNome || 'N/A'}</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgIdentificacao}</span></div>
    <div class="sumario-item sumario-sub"><span class="sumario-item-text">5.1.1 Sistemas de segurança atuais</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgDispInicio}</span></div>
    ${nPerigos > 0 ? `<div class="sumario-item sumario-sub"><span class="sumario-item-text">5.2 Resumo da Análise de Riscos (HRN)</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgResumoHRN}</span></div>` : ''}
    <div class="sumario-item"><span class="sumario-item-text">6 DEFINIÇÃO DE CATEGORIA REQUERIDA</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgCategoria}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">7 MANUTENÇÃO, INSPEÇÃO, PREPARAÇÃO, AJUSTE, REPARO E LIMPEZA</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgCategoria}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">8 ARRANJOS FÍSICOS E SINALIZAÇÃO</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgCategoria}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">9 MANUAL DE OPERAÇÃO</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgManual}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">10 PROCEDIMENTOS DE TRABALHO E SEGURANÇA</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgManual}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">11 TREINAMENTO E CAPACITAÇÃO</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgManual}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">12 CONCLUSÃO</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgConclusao}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">13 RESPONSÁVEL TÉCNICO</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgConclusao}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">14 ANEXOS</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgConclusao}</span></div>
  </div>
  ${gerarFooter(2)}
</div>

<!-- ===== PÁGINA 3: INTRODUÇÃO + OBJETIVO + NORMAS ===== -->
<div class="page">
  ${gerarHeader()}
  <div class="content">
    <div class="secao">
      <div class="secao-titulo">1 INTRODUÇÃO</div>
      <p class="secao-texto">
        A Norma Regulamentadora NR-12 – da Portaria 3.214, de 8 de junho de 1978 do Ministério do Trabalho e Emprego e suas revisões, estabelecem requisitos mínimos para a Segurança em Máquinas e equipamentos. Esta visa à prevenção de acidentes e doenças do trabalho desde a fase de projeto, construção, venda até a sua utilização ou operação, definindo referências técnicas, princípios fundamentais e medidas de proteção que devem ser observados para garantir a saúde e a integridade física dos trabalhadores.
      </p>
      <p class="secao-texto">
        As disposições contidas na presente Norma Regulamentadora se referem indistintamente a máquinas e equipamentos novos e usados, exceto aqueles itens em que houver menção específica quanto à sua aplicabilidade. São consideradas medidas de proteção, a serem adotadas nessa ordem de prioridade:
      </p>
      <ol class="secao-lista" type="a">
        <li>Medidas de proteção coletivas;</li>
        <li>Medidas administrativas ou de organização do trabalho; e</li>
        <li>Medidas de proteção individuais.</li>
      </ol>
      <p class="secao-texto">
        Este laudo reflete em última análise as condições de segurança do equipamento, em referência ao estabelecido nas normas.
      </p>
    </div>

    <div class="secao">
      <div class="secao-titulo">2 OBJETIVO</div>
      <p class="secao-texto">
        Documentar com Laudo Técnico as condições de segurança, análise e avaliação dos riscos em referência aos requisitos legais aplicáveis na Norma Regulamentadora NR-12, confirmando sua devida adequação ao proposto em norma.
      </p>
    </div>

    <div class="secao">
      <div class="secao-titulo">3 NORMAS E DOCUMENTOS APLICÁVEIS</div>
      <ul class="secao-lista">
        <li><strong>ABNT NBR ISO 12100:2013</strong> – Segurança de máquinas – Princípios gerais de projeto - Apreciação e redução de riscos.</li>
        <li><strong>ABNT ISO/TR 14121-2:2018</strong> – Segurança de máquinas - Apreciação e riscos – Parte 2: Guia prático e exemplos de métodos.</li>
        <li><strong>ABNT NBR 14153:2013</strong> – Segurança de Máquinas – Partes de sistemas de comando relacionados à segurança – Princípios gerais para o projeto.</li>
        <li><strong>ABNT NBR ISO 13849-1:2019</strong> – Partes de sistemas de comando relacionados à segurança – Parte 1: Princípios gerais para o projeto.</li>
        <li><strong>ABNT NBR ISO 13849-2:2019</strong> – Partes de sistemas de comando relacionados à segurança – Parte 2: Validação.</li>
        <li><strong>NR-12</strong> – Segurança no Trabalho em Máquinas e Equipamentos.</li>
      </ul>
    </div>
  </div>
  ${gerarFooter(3)}
</div>

<!-- ===== PÁGINA 4: METODOLOGIA ===== -->
<div class="page">
  ${gerarHeader()}
  <div class="content">
    <div class="secao">
      <div class="secao-titulo">4 METODOLOGIA</div>
      <p class="secao-texto">
        A metodologia para a realização do laudo consiste em três etapas:
      </p>
      <p class="secao-texto">
        <strong>Avaliação no posto de trabalho:</strong> onde a equipe acompanhará no local de trabalho a rotina das equipes de operação e manutenção junto a máquina. Esta etapa tem como objetivo realizar a análise de risco. Neste momento serão realizadas entrevistas com os operadores e mantenedores para poder aprofundar as informações com relação à exposição em suas atividades.
      </p>
      <p class="secao-texto">
        <strong>Análise dos itens da norma:</strong> Com a avaliação in loco realizada, a equipe passará a montagem do relatório e os apontamentos dos itens não conformes em acordo com as Normas e documentos aplicáveis, oferecendo ato contínuo as recomendações para atendimento dos requisitos aplicáveis.
      </p>
      <p class="secao-texto">
        <strong>Recomendações Técnicas:</strong> As medidas e recomendações de que fazem parte este relatório constitui-se de sugestões às quais são de responsabilidade e decisão da empresa aplicá-las ou não em sua unidade de negócio.
      </p>
      <p class="secao-texto">
        Estimativa dos riscos pela metodologia HRN (Hazard Rating Number). A fórmula aplicada para encontrar o nível de risco é: <strong>HRN = LO x FE x DPH x NP</strong>
      </p>

      <table class="tabela-hrn-ref">
        <thead><tr><th colspan="2">Tabela – Probabilidade de Ocorrência (LO)</th></tr></thead>
        <tbody>
          <tr><td>Quase impossível</td><td>0,033</td></tr>
          <tr><td>Altamente improvável</td><td>1</td></tr>
          <tr><td>Improvável</td><td>1,5</td></tr>
          <tr><td>Possível</td><td>2</td></tr>
          <tr><td>Alguma chance</td><td>5</td></tr>
          <tr><td>Provável</td><td>8</td></tr>
          <tr><td>Muito provável</td><td>10</td></tr>
          <tr><td>Certo</td><td>15</td></tr>
        </tbody>
      </table>

      <table class="tabela-hrn-ref">
        <thead><tr><th colspan="2">Tabela – Frequência de Exposição (FE)</th></tr></thead>
        <tbody>
          <tr><td>Anualmente</td><td>0,5</td></tr>
          <tr><td>Mensalmente</td><td>1</td></tr>
          <tr><td>Semanalmente</td><td>1,5</td></tr>
          <tr><td>Diariamente</td><td>2,5</td></tr>
          <tr><td>Em termos de hora</td><td>4</td></tr>
          <tr><td>Constantemente</td><td>5</td></tr>
        </tbody>
      </table>

    </div>
  </div>
  ${gerarFooter(4)}
</div>

<!-- ===== PÁGINA 5: METODOLOGIA (cont.) ===== -->
<div class="page">
  ${gerarHeader()}
  <div class="content">
    <div class="secao">
      <table class="tabela-hrn-ref">
        <thead><tr><th colspan="2">Tabela – Grau Possível de Lesão (DPH)</th></tr></thead>
        <tbody>
          <tr><td>Arranhão / Contusão</td><td>0,1</td></tr>
          <tr><td>Dilaceração / Efeito leve na saúde</td><td>0,5</td></tr>
          <tr><td>Fratura / Enfermidade leve</td><td>2</td></tr>
          <tr><td>Fratura / Enfermidade grave</td><td>4</td></tr>
          <tr><td>Perda de 1 membro / olho / audição</td><td>6</td></tr>
          <tr><td>Perda de 2 membros / olhos</td><td>10</td></tr>
          <tr><td>Fatalidade</td><td>15</td></tr>
        </tbody>
      </table>

      <table class="tabela-hrn-ref">
        <thead><tr><th colspan="2">Tabela – Número de Pessoas Expostas (NP)</th></tr></thead>
        <tbody>
          <tr><td>1 - 2 Pessoas</td><td>1</td></tr>
          <tr><td>3 - 7 Pessoas</td><td>2</td></tr>
          <tr><td>8 - 15 Pessoas</td><td>4</td></tr>
          <tr><td>16 - 50 Pessoas</td><td>8</td></tr>
          <tr><td>Mais de 50 Pessoas</td><td>12</td></tr>
        </tbody>
      </table>

      <table class="tabela-hrn-ref">
        <thead><tr><th colspan="2">Tabela – Classificação HRN</th></tr></thead>
        <tbody>
          <tr><td style="background: #90EE90;">0 – 5</td><td style="background: #90EE90;">Aceitável</td></tr>
          <tr><td style="background: #FFEB3B;">5 – 50</td><td style="background: #FFEB3B;">Muito Significante</td></tr>
          <tr><td style="background: #FF9800; color: white;">50 – 500</td><td style="background: #FF9800; color: white;">Alto</td></tr>
          <tr><td style="background: #FF6B6B; color: white;">500 – 1000</td><td style="background: #FF6B6B; color: white;">Muito Alto</td></tr>
          <tr><td style="background: #B71C1C; color: white;">Maior que 1000</td><td style="background: #B71C1C; color: white;">Extremo</td></tr>
        </tbody>
      </table>

      <p class="secao-texto" style="margin-top: 15px;">
        O quadro anterior deve ser utilizado para priorizar a tomada de ações:
      </p>
      <ul class="secao-lista">
        <li>Para a faixa de 0 a 5, buscar a melhoria sem um prazo definido;</li>
        <li>Para o resultado de 5 a 50, dentro de 4 meses deve-se atuar na redução dos riscos;</li>
        <li>Para a faixa de 50 a 1000, em no máximo uma semana;</li>
        <li>Para a faixa maior que 1000 se deve interromper as atividades imediatamente.</li>
      </ul>
    </div>
  </div>
  ${gerarFooter(5)}
</div>

<!-- ===== PÁGINA 5: APRECIAÇÃO DE RISCOS – IDENTIFICAÇÃO ===== -->
<div class="page">
  ${gerarHeader()}
  <div class="content">
    <div class="secao">
      <div class="secao-titulo">5 APRECIAÇÃO DE RISCOS E CONFORMIDADES</div>
      <div class="secao-subtitulo">5.1 Equipamento: ${data.maquinaNome || 'N/A'}</div>

      <div class="campo"><div class="campo-label">Empresa:</div><div class="campo-valor">${data.empresaNome || ''}</div></div>
      <div class="campo"><div class="campo-label">CNPJ:</div><div class="campo-valor">${data.empresaCNPJ || ''}</div></div>
      <div class="campo"><div class="campo-label">Endereço:</div><div class="campo-valor">${data.empresaEndereco || ''}</div></div>
      <div class="campo"><div class="campo-label">Data Abertura:</div><div class="campo-valor">${data.empresaDataAbertura || ''}</div></div>
      <div class="campo"><div class="campo-label">CNAE:</div><div class="campo-valor">${data.empresaCNAE || ''}</div></div>

      <div style="margin-top: 20px;"></div>

      <div class="campo"><div class="campo-label">Máquina:</div><div class="campo-valor">${data.maquinaNome || ''}</div></div>
      <div class="campo"><div class="campo-label">Modelo:</div><div class="campo-valor">${data.maquinaModelo || ''}</div></div>
      <div class="campo"><div class="campo-label">Número de Série:</div><div class="campo-valor">${data.maquinaSerial || ''}</div></div>
      <div class="campo"><div class="campo-label">Fabricante:</div><div class="campo-valor">${data.maquinaFabricante || ''}</div></div>
      <div class="campo"><div class="campo-label">Ano de Fabricação:</div><div class="campo-valor">${data.maquinaAno || ''}</div></div>
      <div class="campo"><div class="campo-label">Setor:</div><div class="campo-valor">${data.maquinaSetor || ''}</div></div>
      <div style="margin-top: 12px;">
        <div class="campo-label" style="margin-bottom: 4px;">Descrição Geral / Função:</div>
        <div style="font-size: 9px; line-height: 1.5; text-align: justify; white-space: pre-line;">${data.maquinaDescricao || ''}</div>
      </div>
    </div>
  </div>
  ${gerarFooter(pgIdentificacao)}
</div>

${data.usoPretendido || data.modoOperacao ? `
<!-- ===== PÁGINA: LIMITES DA MÁQUINA ===== -->
<div class="page">
  ${gerarHeader()}
  <div class="content">
    <div class="secao">
      <div class="secao-subtitulo">Limites da Máquina</div>
      <table class="tabela-info" style="width:98%; border-collapse: collapse; font-size: 7.5px; margin-top: 6px;">
        <tbody>
          ${data.usoPretendido ? `
          <tr>
            <td style="padding: 4px 6px; border: 1px solid #ccc; width: 120px; font-weight: bold; vertical-align: top; background: #f4f4f4;">USO PRETENDIDO</td>
            <td style="padding: 4px 6px; border: 1px solid #ccc; line-height: 1.4; white-space: pre-line;">${data.usoPretendido}</td>
          </tr>` : ''}
          ${data.modoOperacao ? `
          <tr>
            <td style="padding: 4px 6px; border: 1px solid #ccc; width: 120px; font-weight: bold; vertical-align: top; background: #f4f4f4;">MODO DE OPERAÇÃO</td>
            <td style="padding: 4px 6px; border: 1px solid #ccc; line-height: 1.4; white-space: pre-line;">${data.modoOperacao}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 4px 6px; border: 1px solid #ccc; font-weight: bold; background: #f4f4f4;">USO DO EQUIPAMENTO</td>
            <td style="padding: 4px 6px; border: 1px solid #ccc;">
              <strong>X</strong> INDUSTRIAL &nbsp;&nbsp; - NÃO INDUSTRIAL &nbsp;&nbsp; - DOMÉSTICO
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  ${gerarFooter(pgLimites)}
</div>` : ''}

${data.fotoPlacar || data.fotoVisaoGeral ? `
<!-- ===== PÁGINA: FOTOGRAFIAS ===== -->
<div class="page">
  ${gerarHeader()}
  <div class="content">
    <div class="secao">
      <div class="secao-subtitulo">5.1 Equipamento: ${maquinaHeader} – Fotografias</div>

      ${data.fotoPlacar ? `
      <div style="margin-bottom: 20px;">
        <div style="font-size: 10px; font-weight: bold; margin-bottom: 8px;">Fotografia da Placa da Máquina</div>
        <div style="text-align: center;">
          <img src="${data.fotoPlacar}" alt="Placa de Identificação" style="max-width: 100%; max-height: 280px; border: 1px solid #999; object-fit: contain;">
        </div>
      </div>` : ''}

      ${data.fotoVisaoGeral ? `
      <div>
        <div style="font-size: 10px; font-weight: bold; margin-bottom: 8px;">Figura 01: ${maquinaHeader} – Visão Geral</div>
        <div style="text-align: center;">
          <img src="${data.fotoVisaoGeral}" alt="Visão Geral" style="max-width: 100%; max-height: 280px; border: 1px solid #999; object-fit: contain;">
        </div>
      </div>` : ''}
    </div>
  </div>
  ${gerarFooter(pgFotos)}
</div>` : ''}

<!-- ===== SISTEMAS DE SEGURANÇA (DISPOSITIVOS) ===== -->
${data.dispositivosSeguranca && data.dispositivosSeguranca.length > 0 ? (() => {
  const DISPOSITIVOS_POR_PAGINA = 2
  const paginas: string[] = []
  for (let i = 0; i < data.dispositivosSeguranca.length; i += DISPOSITIVOS_POR_PAGINA) {
    const grupo = data.dispositivosSeguranca.slice(i, i + DISPOSITIVOS_POR_PAGINA)
    const isPrimeira = i === 0
    const pgNum = pgDispInicio + Math.floor(i / DISPOSITIVOS_POR_PAGINA)
    paginas.push(`
<div class="page">
  ${gerarHeader()}
  <div class="content">
    <div class="secao">
      ${isPrimeira ? '<div class="secao-subtitulo">5.1.1 Sistemas de segurança atuais</div>' : '<div class="secao-subtitulo">5.1.1 Sistemas de segurança atuais (continuação)</div>'}

      ${grupo.map((disp, idx) => `
        <div class="dispositivo-item">
          <div class="dispositivo-foto">
            ${disp.foto
              ? `<img src="${disp.foto}" alt="Dispositivo ${i + idx + 1}"><div class="foto-legenda">ILUSTRAÇÃO</div>`
              : '<div style="width:150px;height:100px;border:1px dashed #999;display:flex;align-items:center;justify-content:center;color:#999;font-size:8px;">Sem foto</div>'}
          </div>
          <div class="dispositivo-descricao">
            <strong>DESCRIÇÃO</strong><br><br>
            ${disp.descricao}
          </div>
        </div>
      `).join('')}
    </div>
  </div>
  ${gerarFooter(pgNum)}
</div>`)
  }
  return paginas.join('')
})() : ''}

<!-- ===== RESUMO HRN ===== -->
${data.perigos && data.perigos.length > 0 ? (() => {
  const PERIGOS_POR_PAGINA_RESUMO = 8
  const paginasResumo: string[] = []
  for (let i = 0; i < data.perigos.length; i += PERIGOS_POR_PAGINA_RESUMO) {
    const grupo = data.perigos.slice(i, i + PERIGOS_POR_PAGINA_RESUMO)
    const isPrimeira = i === 0
    const pgNumResumo = pgResumoHRN + Math.floor(i / PERIGOS_POR_PAGINA_RESUMO)
    paginasResumo.push(`
<div class="page">
  ${gerarHeader()}
  <div class="content">
    <div class="secao">
      ${isPrimeira ? '<div class="secao-titulo">Resumo da Análise de Riscos (HRN)</div>' : '<div class="secao-titulo">Resumo da Análise de Riscos (HRN) – continuação</div>'}

      <table class="tabela">
        <thead>
          <tr>
            <th style="width:6%;">Nº</th>
            <th style="width:12%;">Ciclo</th>
            <th style="width:15%;">Tarefa</th>
            <th style="width:25%;">Descrição do Perigo</th>
            <th style="width:10%;">HRN Antes</th>
            <th style="width:10%;">HRN Depois</th>
            <th style="width:10%;">Melhoria</th>
          </tr>
        </thead>
        <tbody>
          ${grupo.map((p) => {
            const ha = classificarHRN(p.hrnAntes)
            const hd = classificarHRN(p.hrnDepois)
            const m = p.hrnAntes > 0 ? ((p.hrnAntes - p.hrnDepois) / p.hrnAntes * 100).toFixed(0) : '0'
            return `
            <tr>
              <td style="font-weight:bold;">${p.numeroPerigo}</td>
              <td style="text-align:left;">${p.cicloVida}</td>
              <td style="text-align:left;">${p.tarefa}</td>
              <td style="text-align:left;">${p.descricaoPerigo}</td>
              <td style="background:${ha.cor};color:${ha.corTexto};font-weight:bold;">${p.hrnAntes.toFixed(2)}</td>
              <td style="background:${hd.cor};color:${hd.corTexto};font-weight:bold;">${p.hrnDepois.toFixed(2)}</td>
              <td style="font-weight:bold;">${m}%</td>
            </tr>`
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>
  ${gerarFooter(pgNumResumo)}
</div>`)
  }
  return paginasResumo.join('')
})() : ''}


<!-- ===== ANÁLISE DETALHADA POR PERIGO ===== -->
${data.perigos && data.perigos.length > 0 ? data.perigos.map((perigo, idxPerigo) => {
  const ha = classificarHRN(perigo.hrnAntes)
  const hd = classificarHRN(perigo.hrnDepois)
  const m = perigo.hrnAntes > 0 ? ((perigo.hrnAntes - perigo.hrnDepois) / perigo.hrnAntes * 100).toFixed(0) : '0'
  const pgNumDetalhe = pgAnaliseInicio + idxPerigo
  return `
<div class="page">
  ${gerarHeader()}
  <div class="content">
    <div class="secao">
      <div class="secao-subtitulo">Perigo ${perigo.numeroPerigo} – ${perigo.descricaoPerigo}</div>
      <p class="secao-texto">
        <strong>Ciclo de Vida:</strong> ${perigo.cicloVida} &nbsp;|&nbsp;
        <strong>Tarefa:</strong> ${perigo.tarefa}
      </p>

      <div class="hrn-grid">
        <div class="hrn-box hrn-antes">
          <div class="hrn-box-titulo">CENÁRIO ANTES (sem medidas)</div>
          <div class="hrn-parametros">
            <div class="hrn-param"><div class="hrn-param-label">LO</div><div class="hrn-param-valor">${perigo.loAntes.toFixed(2)}</div></div>
            <div class="hrn-param"><div class="hrn-param-label">FE</div><div class="hrn-param-valor">${perigo.feAntes.toFixed(2)}</div></div>
            <div class="hrn-param"><div class="hrn-param-label">DPH</div><div class="hrn-param-valor">${perigo.dphAntes.toFixed(2)}</div></div>
            <div class="hrn-param"><div class="hrn-param-label">NP</div><div class="hrn-param-valor">${perigo.npAntes.toFixed(2)}</div></div>
            <div class="hrn-param" style="border:2px solid #ff9800;"><div class="hrn-param-label">HRN</div><div class="hrn-param-valor">${perigo.hrnAntes.toFixed(2)}</div></div>
          </div>
          <div class="hrn-resultado" style="background:${ha.cor};color:${ha.corTexto};">${ha.classe}</div>
        </div>
        <div class="hrn-box hrn-depois">
          <div class="hrn-box-titulo">CENÁRIO DEPOIS (com medidas)</div>
          <div class="hrn-parametros">
            <div class="hrn-param"><div class="hrn-param-label">LO</div><div class="hrn-param-valor">${perigo.loDepois.toFixed(2)}</div></div>
            <div class="hrn-param"><div class="hrn-param-label">FE</div><div class="hrn-param-valor">${perigo.feDepois.toFixed(2)}</div></div>
            <div class="hrn-param"><div class="hrn-param-label">DPH</div><div class="hrn-param-valor">${perigo.dphDepois.toFixed(2)}</div></div>
            <div class="hrn-param"><div class="hrn-param-label">NP</div><div class="hrn-param-valor">${perigo.npDepois.toFixed(2)}</div></div>
            <div class="hrn-param" style="border:2px solid #4caf50;"><div class="hrn-param-label">HRN</div><div class="hrn-param-valor">${perigo.hrnDepois.toFixed(2)}</div></div>
          </div>
          <div class="hrn-resultado" style="background:${hd.cor};color:${hd.corTexto};">${hd.classe} (Redução: ${m}%)</div>
        </div>
      </div>

      <div style="margin-top:15px;">
        <strong>Medidas de Engenharia Implementadas:</strong>
        <div class="medidas-box">${perigo.medidasEngenharia || 'Não especificado'}</div>
      </div>
    </div>
  </div>
  ${gerarFooter(pgNumDetalhe)}
</div>`
}).join('') : ''}

<!-- ===== DEFINIÇÃO DE CATEGORIA REQUERIDA ===== -->
<div class="page">
  ${gerarHeader()}
  <div class="content">
    <div class="secao">
      <div class="secao-titulo">6 DEFINIÇÃO DE CATEGORIA REQUERIDA</div>
      <p class="secao-texto">Conforme os riscos existentes (pior caso):</p>
      <div class="categoria-box">
        <p><strong>Gravidade da lesão:</strong> S2 – Lesão Grave, irreversível ou morte.</p>
        <p><strong>Frequência e/ou duração da exposição ao perigo:</strong> F2 – Frequente até contínuo.</p>
        <p><strong>Possibilidade de se evitar o perigo:</strong> P1 – Sob determinadas condições.</p>
        <p style="margin-top: 15px; font-weight: bold; font-size: 11px;">CONCLUSÃO: CATEGORIA DE PROTEÇÃO REQUERIDA – 3.</p>
      </div>
    </div>

    <div class="secao">
      <div class="secao-titulo">7 MANUTENÇÃO, INSPEÇÃO, PREPARAÇÃO, AJUSTE, REPARO E LIMPEZA</div>
      <p class="secao-texto">
        A empresa deverá ter as suas máquinas e equipamentos submetidos à atividade de manutenção preventiva e corretiva, na forma e periodicidade determinada pelo fabricante, conforme as normas técnicas oficiais nacionais vigentes.
      </p>
      <p class="secao-texto">
        As intervenções são executadas por profissionais capacitados, qualificados ou legalmente habilitados, formalmente autorizados pelo empregador e com as máquinas e equipamentos parados com adoção dos procedimentos contidos em norma.
      </p>
    </div>

    <div class="secao">
      <div class="secao-titulo">8 ARRANJOS FÍSICOS E SINALIZAÇÃO</div>
      <p class="secao-texto">
        A empresa deverá garantir a organização geral das áreas deixando os Equipamentos de Proteção Coletiva (EPC's), Extintores e Painéis Elétricos, desobstruídos e com livre acesso. Identificar as máquinas referente aos seus riscos, através de adesivos, bem como os painéis elétricos e demais locais que representem algum risco.
      </p>
    </div>
  </div>
  ${gerarFooter(pgCategoria)}
</div>

<!-- ===== MANUAL + PROCEDIMENTOS + TREINAMENTO ===== -->
<div class="page">
  ${gerarHeader()}
  <div class="content">
    <div class="secao">
      <div class="secao-titulo">9 MANUAL DE OPERAÇÃO</div>
      <p class="secao-texto">
        As máquinas e equipamentos devem possuir manual de instruções fornecido pelo fabricante ou importador, com informações relativas à segurança em todas as fases de utilização. Quando inexistente ou extraviado, o manual deve ser solicitado ao fornecedor ou ser elaborada pela empresa uma ficha de informação contendo:
      </p>
      <ol class="secao-lista" type="a">
        <li>tipo, modelo e capacidade;</li>
        <li>descrição da utilização prevista para a máquina ou equipamento;</li>
        <li>indicação das medidas de segurança existentes;</li>
        <li>instruções para utilização segura da máquina ou equipamento;</li>
        <li>periodicidade e instruções quanto às inspeções e manutenção;</li>
        <li>procedimentos a serem adotados em emergências, quando aplicável.</li>
      </ol>
    </div>

    <div class="secao">
      <div class="secao-titulo">10 PROCEDIMENTOS DE TRABALHO E SEGURANÇA</div>
      <p class="secao-texto">
        A empresa possui instrução de trabalho para o Processo de Operação da máquina/equipamento e deverá estar anexo a este laudo. Esta instrução de trabalho identifica os procedimentos de segurança, operação e demais, necessários para operação correta e segura do equipamento.
      </p>
    </div>

    <div class="secao">
      <div class="secao-titulo">11 TREINAMENTO E CAPACITAÇÃO</div>
      <p class="secao-texto">
        A operação, manutenção, inspeção e demais intervenções em máquinas e equipamentos devem ser realizadas por trabalhadores habilitados ou qualificados ou capacitados, e autorizados para este fim.
      </p>
      <p class="secao-texto">
        Todos os trabalhadores envolvidos na operação, manutenção, inspeção e demais intervenções em máquinas e equipamentos conforme determina a Norma Regulamentadora deverão passar por treinamento e capacitação incluindo a reciclagem do trabalhador sempre que ocorrerem modificações significativas nas instalações e na operação de máquinas.
      </p>
    </div>
  </div>
  ${gerarFooter(pgManual)}
</div>

<!-- ===== CONCLUSÃO + RESPONSÁVEL TÉCNICO + ANEXOS ===== -->
<div class="page">
  ${gerarHeader()}
  <div class="content">
    <div class="secao">
      <div class="secao-titulo">12 CONCLUSÃO</div>
      <div class="conclusao-box">
        ${data.tipoConlusao === 'A'
          ? `<p class="secao-texto">Para a elaboração e emissão do Laudo de NR-12, faz-se necessária a prévia adequação da máquina aos requisitos de segurança estabelecidos na norma. As adequações devem contemplar a implementação, correção ou complementação dos sistemas de proteção atuais.</p>
             <p class="secao-texto">Somente após a conclusão e validação dessas adequações, garantindo que a máquina atenda integralmente aos dispositivos aplicáveis da NR-12 e às normas técnicas correlatas, será possível realizar a avaliação final e emitir o respectivo laudo.</p>`
          : `<p class="secao-texto">A máquina <strong>${data.maquinaNome || 'N/A'}</strong> atende aos requisitos técnicos de segurança da NR-12, conforme análise realizada neste laudo. O equipamento encontra-se em conformidade com as normas técnicas aplicáveis.</p>`
        }
        <p class="secao-texto" style="margin-top:10px;"><strong>Tipo de Conclusão:</strong> ${data.tipoConlusao === 'A' ? 'A – PRÉ-ADEQUAÇÃO' : 'B – ADEQUADO'}</p>
        <p class="secao-texto"><strong>Data de Emissão:</strong> ${dataFormatada}</p>
      </div>
    </div>

    <div class="secao">
      <div class="secao-titulo">13 RESPONSÁVEL TÉCNICO</div>
      <p class="secao-texto">Garante as informações supracitadas neste laudo e assina abaixo:</p>
      <div class="assinatura-bloco">
        <div class="assinatura-linha"></div>
        <div class="assinatura-nome">Bruno Cardoso</div>
        <div class="assinatura-cargo">Engenheiro Eletricista</div>
        <div class="assinatura-cargo">Eng. De Segurança do Trabalho</div>
        <div class="assinatura-cargo" style="margin-top:5px;">CREA/SC 108.955-2</div>
      </div>
    </div>

    <div class="secao" style="margin-top:30px;">
      <div class="secao-titulo">14 ANEXOS</div>
      <ol class="secao-lista">
        ${data.artNumero ? `<li>ART do Laudo nº ${data.artNumero}</li>` : '<li>ART do Laudo</li>'}
        <li>Manual da máquina em português</li>
      </ol>
    </div>
  </div>
  ${gerarFooter(pgConclusao)}
</div>

</body>
</html>
`
}
