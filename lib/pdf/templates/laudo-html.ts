import { LaudoData } from '../generator'
import { LOGO_BASE64 } from './logo-base64'

const logoBase64 = LOGO_BASE64

export function gerarLaudoHTML(data: LaudoData): string {
  const hoje = new Date()
  const dataFormatada = hoje.toLocaleDateString('pt-BR')

  // Logo inline — grande para capa, pequeno para header
  const logoImgGrande = logoBase64
    ? `<img src="data:image/png;base64,${logoBase64}" alt="EletriSeg" style="width:220px;height:auto;" />`
    : `<span style="font-size:36px;font-weight:bold;"><span style="color:#505050;">Eletri</span><span style="color:#4a9b9e;">Seg</span></span>`

  const logoImgPequeno = logoBase64
    ? `<img src="data:image/png;base64,${logoBase64}" alt="EletriSeg" style="width:120px;height:auto;" />`
    : `<span style="font-size:14px;font-weight:bold;"><span style="color:#505050;">Eletri</span><span style="color:#4a9b9e;">Seg</span></span>`

  // Helper para classificar HRN
  const classificarHRN = (hrn: number): { cor: string; classe: string; corTexto: string } => {
    if (hrn <= 5) return { cor: '#d4edda', classe: 'Aceitavel', corTexto: '#155724' }
    if (hrn <= 50) return { cor: '#fff3cd', classe: 'Muito Significante', corTexto: '#856404' }
    if (hrn <= 500) return { cor: '#ffe0b2', classe: 'Alto', corTexto: '#e65100' }
    if (hrn <= 1000) return { cor: '#f8d7da', classe: 'Muito Alto', corTexto: '#721c24' }
    return { cor: '#c62828', classe: 'Extremo', corTexto: '#fff' }
  }

  // Dados da maquina
  const nomeMaq = data.maquinaNome || 'N/A'
  const maquinaHeader = data.maquinaModelo && !nomeMaq.includes(data.maquinaModelo)
    ? `${nomeMaq} ${data.maquinaModelo}`
    : nomeMaq

  // Calcular numeracao de paginas
  const nDisp = data.dispositivosSeguranca ? data.dispositivosSeguranca.length : 0
  const nPerigos = data.perigos ? data.perigos.length : 0
  const paginasDisp = nDisp > 0 ? Math.ceil(nDisp / 2) : 0
  const paginasResumoHRN = nPerigos > 0 ? Math.ceil(nPerigos / 8) : 0
  const temLimites = (data.usoPretendido || data.modoOperacao) ? 1 : 0
  const temFotos = (data.fotoPlacar || data.fotoVisaoGeral) ? 1 : 0

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

  // Header componente (paginas internas)
  const gerarHeader = (secao: string = ''): string => {
    return `
      <div class="header">
        <div class="header-logo">${logoImgPequeno}</div>
        <div class="header-center">
          <div class="header-title">${secao || `LAUDO TECNICO NR-12`}</div>
          <div class="header-subtitle">${maquinaHeader} - ${data.empresaNome || 'EMPRESA'}</div>
        </div>
        <div class="header-right">
          <div class="header-date">${dataFormatada}</div>
        </div>
      </div>
      <div class="header-line"></div>
    `
  }

  // Footer componente
  const gerarFooter = (pagina: number | string = ''): string => {
    return `
      <div class="footer">
        <div class="footer-line"></div>
        <div class="footer-content">
          <div class="footer-left">
            <div class="footer-eng">Engenharia Eletrica</div>
            <div class="footer-eng">Eng. de Seguranca do Trabalho</div>
          </div>
          <div class="footer-center">
            <strong>EletriSeg Engenharia LTDA</strong><br>
            CREA-SC: 128.716-3
          </div>
          <div class="footer-right">
            <div class="footer-page">${pagina}</div>
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
  <title>Laudo Tecnico NR-12 - ${data.empresaNome}</title>
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
      color: #1a1a1a;
      background: white;
    }

    /* ===== PAGINA ===== */
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

    /* ===== HEADER (paginas internas) ===== */
    .header {
      display: flex;
      align-items: center;
      padding: 8px 0;
      gap: 12px;
    }
    .header-logo {
      flex-shrink: 0;
    }
    .header-logo img {
      width: 120px;
      height: auto;
    }
    .header-center {
      flex: 1;
      text-align: center;
    }
    .header-title {
      font-size: 10px;
      font-weight: bold;
      text-transform: uppercase;
      color: #1a1a1a;
      letter-spacing: 0.5px;
    }
    .header-subtitle {
      font-size: 8px;
      color: #666;
      margin-top: 2px;
    }
    .header-right {
      flex-shrink: 0;
      text-align: right;
    }
    .header-date {
      font-size: 8px;
      color: #666;
    }
    .header-line {
      height: 2px;
      background: linear-gradient(90deg, #4a9b9e, #1e3a8a);
      margin-bottom: 15px;
      border-radius: 1px;
    }

    /* ===== FOOTER ===== */
    .footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      font-size: 7.5px;
    }
    .footer-line {
      height: 2px;
      background: linear-gradient(90deg, #4a9b9e, #1e3a8a);
      margin-bottom: 8px;
      border-radius: 1px;
    }
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      color: #666;
    }
    .footer-left {
      flex: 1;
    }
    .footer-eng {
      line-height: 1.4;
    }
    .footer-center {
      flex: 1;
      text-align: center;
      color: #333;
    }
    .footer-right {
      flex: 1;
      text-align: right;
    }
    .footer-page {
      font-size: 9px;
      font-weight: bold;
      color: #4a9b9e;
    }

    /* ===== CAPA ===== */
    .capa {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      min-height: 260mm;
      justify-content: space-between;
      padding: 0;
    }
    .capa-top-bar {
      width: 100%;
      height: 6px;
      background: linear-gradient(90deg, #4a9b9e, #1e3a8a);
    }
    .capa-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 30px 40px;
    }
    .capa-logo {
      margin-bottom: 40px;
    }
    .capa-titulo-principal {
      font-size: 16px;
      font-weight: bold;
      color: #1a1a1a;
      text-transform: uppercase;
      letter-spacing: 1px;
      line-height: 1.8;
      margin-bottom: 10px;
    }
    .capa-subtitulo {
      font-size: 11px;
      color: #666;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 35px;
    }
    .capa-nr12 {
      font-size: 90px;
      font-weight: bold;
      letter-spacing: 12px;
      background: linear-gradient(135deg, #4a9b9e, #1e3a8a);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 15px 0 35px;
    }
    .capa-info-box {
      border: 2px solid #4a9b9e;
      border-radius: 8px;
      padding: 18px 30px;
      margin: 8px 0;
      min-width: 320px;
    }
    .capa-info-label {
      font-size: 8px;
      color: #4a9b9e;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 4px;
    }
    .capa-info-value {
      font-size: 14px;
      font-weight: bold;
      color: #1a1a1a;
      text-transform: uppercase;
    }
    .capa-bottom {
      width: 100%;
      padding: 20px 0 10px;
    }
    .capa-revisoes {
      width: 100%;
      max-width: 480px;
      margin: 0 auto;
      font-size: 8px;
    }
    .capa-revisoes table {
      width: 100%;
      border-collapse: collapse;
    }
    .capa-revisoes th {
      background: #1e3a8a;
      color: white;
      border: 1px solid #1e3a8a;
      padding: 5px 8px;
      font-weight: 600;
      text-align: center;
      font-size: 7px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .capa-revisoes td {
      border: 1px solid #ddd;
      padding: 5px 8px;
      text-align: center;
      font-size: 8px;
    }
    .capa-bottom-bar {
      width: 100%;
      height: 6px;
      background: linear-gradient(90deg, #1e3a8a, #4a9b9e);
      margin-top: 15px;
    }

    /* ===== CONTEUDO ===== */
    .content {
      padding-bottom: 25mm;
      overflow: hidden;
      max-width: 100%;
    }

    /* ===== SUMARIO ===== */
    .sumario-titulo {
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      margin: 30px 0 25px;
      color: #1a1a1a;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .sumario-item {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 10px;
      margin: 7px 0;
      line-height: 1.6;
    }
    .sumario-item-text {
      flex: 0 0 auto;
      font-weight: 500;
    }
    .sumario-item-dots {
      flex: 1;
      border-bottom: 1px dotted #bbb;
      margin: 0 8px;
      min-width: 30px;
    }
    .sumario-item-page {
      min-width: 20px;
      text-align: right;
      color: #4a9b9e;
      font-weight: bold;
    }
    .sumario-sub {
      padding-left: 20px;
    }

    /* ===== SECOES ===== */
    .secao {
      margin-bottom: 18px;
    }
    .secao-titulo {
      font-size: 11px;
      font-weight: bold;
      margin: 20px 0 12px;
      padding: 8px 12px;
      background: #4a9b9e;
      color: white;
      border-left: 4px solid #1e3a8a;
      border-radius: 0 4px 4px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .secao-subtitulo {
      font-size: 10px;
      font-weight: bold;
      margin: 15px 0 10px;
      padding: 6px 10px;
      background: #f0f8f8;
      border-left: 3px solid #4a9b9e;
      color: #1a1a1a;
    }
    .secao-texto {
      font-size: 10px;
      text-align: justify;
      margin-bottom: 10px;
      line-height: 1.65;
      color: #333;
    }
    .secao-lista {
      margin: 10px 0 10px 30px;
      font-size: 10px;
      line-height: 1.8;
      color: #333;
    }

    /* ===== CAMPOS (label: valor) ===== */
    .campos-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      margin: 10px 0;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
    }
    .campo {
      display: flex;
      align-items: baseline;
      padding: 7px 10px;
      font-size: 9.5px;
      border-bottom: 1px solid #e8e8e8;
    }
    .campo-full {
      grid-column: 1 / -1;
    }
    .campo-label {
      font-weight: bold;
      color: #505050;
      min-width: 100px;
      font-size: 8.5px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .campo-valor {
      color: #1a1a1a;
      flex: 1;
    }

    /* ===== TABELAS ===== */
    .tabela {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-size: 7.5px;
      border-radius: 4px;
      overflow: hidden;
    }
    .tabela th {
      background: #1e3a8a;
      color: white;
      padding: 6px 4px;
      font-weight: 600;
      text-align: center;
      font-size: 7px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .tabela td {
      border: 1px solid #e0e0e0;
      padding: 5px 4px;
      text-align: center;
      font-size: 7.5px;
    }
    .tabela tbody tr:nth-child(even) {
      background: #f8fafb;
    }
    .tabela tbody tr:hover {
      background: #f0f8f8;
    }

    /* ===== TABELAS HRN REFERENCIA ===== */
    .tabela-hrn-ref {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0;
      font-size: 7.5px;
      page-break-inside: avoid;
    }
    .tabela-hrn-ref th {
      background: #f0f8f8;
      font-weight: bold;
      padding: 5px 8px;
      border: 1px solid #d0e0e0;
      color: #1e3a8a;
      font-size: 7.5px;
    }
    .tabela-hrn-ref td {
      border: 1px solid #e0e0e0;
      padding: 4px 8px;
    }
    .tabela-hrn-ref tbody tr:nth-child(even) {
      background: #fafafa;
    }

    /* ===== DISPOSITIVOS / ITENS COM FOTO ===== */
    .dispositivo-item {
      display: grid;
      grid-template-columns: 160px 1fr;
      gap: 12px;
      margin: 12px 0;
      page-break-inside: avoid;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 12px;
      background: #fafcfc;
    }
    .dispositivo-foto {
      text-align: center;
    }
    .dispositivo-foto img {
      max-width: 150px;
      max-height: 120px;
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      object-fit: cover;
    }
    .dispositivo-foto .foto-legenda {
      font-size: 7px;
      font-weight: bold;
      margin-top: 4px;
      text-align: center;
      color: #4a9b9e;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .dispositivo-descricao {
      font-size: 9.5px;
      text-align: justify;
      line-height: 1.6;
      color: #333;
    }
    .dispositivo-descricao strong {
      color: #1e3a8a;
      font-size: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
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
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      object-fit: contain;
    }
    .foto-legenda {
      font-size: 8px;
      font-weight: bold;
      margin-top: 6px;
      color: #4a9b9e;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* ===== HRN ANALISE DETALHADA ===== */
    .hrn-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin: 10px 0;
      page-break-inside: avoid;
    }
    .hrn-box {
      border: 1px solid #e0e0e0;
      border-radius: 6px;
      padding: 10px;
      font-size: 7.5px;
      page-break-inside: avoid;
      overflow: hidden;
      background: #fafcfc;
    }
    .hrn-box-titulo {
      font-weight: bold;
      font-size: 8px;
      margin-bottom: 8px;
      padding: 5px 8px;
      text-align: center;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .hrn-antes .hrn-box-titulo {
      background: #fff3e0;
      border-left: 3px solid #ff9800;
      color: #e65100;
    }
    .hrn-depois .hrn-box-titulo {
      background: #e8f5e9;
      border-left: 3px solid #4caf50;
      color: #2e7d32;
    }
    .hrn-parametros {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 4px;
      margin: 6px 0;
    }
    .hrn-param {
      text-align: center;
      padding: 4px 2px;
      border: 1px solid #e0e0e0;
      background: white;
      border-radius: 3px;
    }
    .hrn-param-label {
      font-size: 6.5px;
      font-weight: bold;
      color: #888;
      text-transform: uppercase;
    }
    .hrn-param-valor {
      font-size: 10px;
      font-weight: bold;
      color: #1a1a1a;
    }
    .hrn-resultado {
      text-align: center;
      font-weight: bold;
      margin-top: 6px;
      padding: 5px;
      font-size: 8px;
      border-radius: 4px;
    }

    /* ===== MEDIDAS DE ENGENHARIA ===== */
    .medidas-box {
      background: #f0f8f8;
      border-left: 3px solid #4a9b9e;
      padding: 10px 12px;
      margin: 10px 0;
      font-size: 9.5px;
      line-height: 1.6;
      page-break-inside: avoid;
      border-radius: 0 4px 4px 0;
      color: #333;
    }

    /* ===== CONCLUSAO ===== */
    .conclusao-box {
      border: 2px solid #4a9b9e;
      border-radius: 8px;
      padding: 20px;
      margin: 15px 0;
      font-size: 10px;
      page-break-inside: avoid;
      background: #fafcfc;
    }
    .conclusao-tipo {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 4px;
      font-weight: bold;
      font-size: 10px;
      margin-top: 8px;
    }
    .conclusao-tipo-a {
      background: #fff3cd;
      color: #856404;
      border: 1px solid #ffc107;
    }
    .conclusao-tipo-b {
      background: #d4edda;
      color: #155724;
      border: 1px solid #28a745;
    }

    /* ===== ASSINATURA ===== */
    .assinatura-bloco {
      text-align: center;
      margin: 50px auto 0;
      max-width: 300px;
    }
    .assinatura-linha {
      border-bottom: 2px solid #1a1a1a;
      margin-bottom: 8px;
      padding-bottom: 5px;
    }
    .assinatura-nome {
      font-weight: bold;
      font-size: 11px;
      color: #1a1a1a;
    }
    .assinatura-cargo {
      font-size: 9px;
      color: #555;
    }

    /* ===== CATEGORIA NBR ===== */
    .categoria-box {
      background: #f8fafb;
      border: 1px solid #e0e0e0;
      border-left: 4px solid #1e3a8a;
      border-radius: 0 6px 6px 0;
      padding: 15px;
      margin: 15px 0;
      font-size: 10px;
      page-break-inside: avoid;
    }
    .categoria-box p {
      margin-bottom: 4px;
      color: #333;
    }
    .categoria-conclusao {
      margin-top: 12px;
      padding: 8px 12px;
      background: #1e3a8a;
      color: white;
      font-weight: bold;
      font-size: 11px;
      border-radius: 4px;
      display: inline-block;
    }

    /* ===== PERIGO FOTO ===== */
    .perigo-foto {
      text-align: center;
      margin: 10px 0;
      page-break-inside: avoid;
    }
    .perigo-foto img {
      max-width: 75%;
      max-height: 160px;
      object-fit: contain;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }

    @media print {
      body, html { margin: 0; padding: 0; }
      .page { page-break-after: always; margin: 0; padding: 0; }
    }
  </style>
</head>
<body>

<!-- ===== PAGINA 1: CAPA ===== -->
<div class="page">
  <div class="capa">
    <div class="capa-top-bar"></div>

    <div class="capa-body">
      <div class="capa-logo">${logoImgGrande}</div>

      <div class="capa-titulo-principal">
        Laudo Tecnico de Apreciacao de Riscos<br>
        e Conformidades
      </div>

      <div class="capa-subtitulo">Norma Regulamentadora NR-12</div>

      <div class="capa-nr12">NR-12</div>

      <div class="capa-info-box">
        <div class="capa-info-label">Empresa</div>
        <div class="capa-info-value">${data.empresaNome || 'EMPRESA'}</div>
      </div>

      <div class="capa-info-box" style="border-color: #1e3a8a;">
        <div class="capa-info-label" style="color: #1e3a8a;">Equipamento</div>
        <div class="capa-info-value">${maquinaHeader}</div>
      </div>
    </div>

    <div class="capa-bottom">
      <div class="capa-revisoes">
        <table>
          <thead>
            <tr>
              <th>Rev.</th>
              <th>Data</th>
              <th>Descricao</th>
              <th>Responsavel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>00</td>
              <td>${dataFormatada}</td>
              <td>Emissao Inicial e Entrega</td>
              <td>Bruno C.</td>
            </tr>
          </tbody>
        </table>
      </div>
      ${data.artNumero ? `<div style="text-align:center;margin-top:10px;font-size:8px;color:#666;">ART N: ${data.artNumero}</div>` : ''}
      <div class="capa-bottom-bar"></div>
    </div>
  </div>
</div>

<!-- ===== PAGINA 2: SUMARIO ===== -->
<div class="page">
  ${gerarHeader('Sumario')}
  <div class="content">
    <div class="sumario-titulo">Sumario</div>

    <div class="sumario-item"><span class="sumario-item-text">1 INTRODUCAO</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgIntro}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">2 OBJETIVO</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgIntro}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">3 NORMAS E DOCUMENTOS APLICAVEIS</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgIntro}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">4 METODOLOGIA</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgMetodologia}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">5 APRECIACAO DE RISCOS E CONFORMIDADES</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgIdentificacao}</span></div>
    <div class="sumario-item sumario-sub"><span class="sumario-item-text">5.1 Equipamento: ${data.maquinaNome || 'N/A'}</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgIdentificacao}</span></div>
    <div class="sumario-item sumario-sub"><span class="sumario-item-text">5.1.1 Sistemas de seguranca atuais</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgDispInicio}</span></div>
    ${nPerigos > 0 ? `<div class="sumario-item sumario-sub"><span class="sumario-item-text">5.2 Resumo da Analise de Riscos (HRN)</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgResumoHRN}</span></div>` : ''}
    <div class="sumario-item"><span class="sumario-item-text">6 DEFINICAO DE CATEGORIA REQUERIDA</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgCategoria}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">7 MANUTENCAO, INSPECAO, PREPARACAO, AJUSTE, REPARO E LIMPEZA</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgCategoria}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">8 ARRANJOS FISICOS E SINALIZACAO</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgCategoria}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">9 MANUAL DE OPERACAO</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgManual}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">10 PROCEDIMENTOS DE TRABALHO E SEGURANCA</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgManual}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">11 TREINAMENTO E CAPACITACAO</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgManual}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">12 CONCLUSAO</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgConclusao}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">13 RESPONSAVEL TECNICO</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgConclusao}</span></div>
    <div class="sumario-item"><span class="sumario-item-text">14 ANEXOS</span><span class="sumario-item-dots"></span><span class="sumario-item-page">${pgConclusao}</span></div>
  </div>
  ${gerarFooter(2)}
</div>

<!-- ===== PAGINA 3: INTRODUCAO + OBJETIVO + NORMAS ===== -->
<div class="page">
  ${gerarHeader('Introducao')}
  <div class="content">
    <div class="secao">
      <div class="secao-titulo">1 Introducao</div>
      <p class="secao-texto">
        A Norma Regulamentadora NR-12 - da Portaria 3.214, de 8 de junho de 1978 do Ministerio do Trabalho e Emprego e suas revisoes, estabelecem requisitos minimos para a Seguranca em Maquinas e equipamentos. Esta visa a prevencao de acidentes e doencas do trabalho desde a fase de projeto, construcao, venda ate a sua utilizacao ou operacao, definindo referencias tecnicas, principios fundamentais e medidas de protecao que devem ser observados para garantir a saude e a integridade fisica dos trabalhadores.
      </p>
      <p class="secao-texto">
        As disposicoes contidas na presente Norma Regulamentadora se referem indistintamente a maquinas e equipamentos novos e usados, exceto aqueles itens em que houver mencao especifica quanto a sua aplicabilidade. Sao consideradas medidas de protecao, a serem adotadas nessa ordem de prioridade:
      </p>
      <ol class="secao-lista" type="a">
        <li>Medidas de protecao coletivas;</li>
        <li>Medidas administrativas ou de organizacao do trabalho; e</li>
        <li>Medidas de protecao individuais.</li>
      </ol>
      <p class="secao-texto">
        Este laudo reflete em ultima analise as condicoes de seguranca do equipamento, em referencia ao estabelecido nas normas.
      </p>
    </div>

    <div class="secao">
      <div class="secao-titulo">2 Objetivo</div>
      <p class="secao-texto">
        Documentar com Laudo Tecnico as condicoes de seguranca, analise e avaliacao dos riscos em referencia aos requisitos legais aplicaveis na Norma Regulamentadora NR-12, confirmando sua devida adequacao ao proposto em norma.
      </p>
    </div>

    <div class="secao">
      <div class="secao-titulo">3 Normas e Documentos Aplicaveis</div>
      <ul class="secao-lista">
        <li><strong>ABNT NBR ISO 12100:2013</strong> - Seguranca de maquinas - Principios gerais de projeto - Apreciacao e reducao de riscos.</li>
        <li><strong>ABNT ISO/TR 14121-2:2018</strong> - Seguranca de maquinas - Apreciacao e riscos - Parte 2: Guia pratico e exemplos de metodos.</li>
        <li><strong>ABNT NBR 14153:2013</strong> - Seguranca de Maquinas - Partes de sistemas de comando relacionados a seguranca - Principios gerais para o projeto.</li>
        <li><strong>ABNT NBR ISO 13849-1:2019</strong> - Partes de sistemas de comando relacionados a seguranca - Parte 1: Principios gerais para o projeto.</li>
        <li><strong>ABNT NBR ISO 13849-2:2019</strong> - Partes de sistemas de comando relacionados a seguranca - Parte 2: Validacao.</li>
        <li><strong>NR-12</strong> - Seguranca no Trabalho em Maquinas e Equipamentos.</li>
      </ul>
    </div>
  </div>
  ${gerarFooter(3)}
</div>

<!-- ===== PAGINA 4: METODOLOGIA ===== -->
<div class="page">
  ${gerarHeader('Metodologia')}
  <div class="content">
    <div class="secao">
      <div class="secao-titulo">4 Metodologia</div>
      <p class="secao-texto">
        A metodologia para a realizacao do laudo consiste em tres etapas:
      </p>
      <p class="secao-texto">
        <strong>Avaliacao no posto de trabalho:</strong> onde a equipe acompanhara no local de trabalho a rotina das equipes de operacao e manutencao junto a maquina. Esta etapa tem como objetivo realizar a analise de risco. Neste momento serao realizadas entrevistas com os operadores e mantenedores para poder aprofundar as informacoes com relacao a exposicao em suas atividades.
      </p>
      <p class="secao-texto">
        <strong>Analise dos itens da norma:</strong> Com a avaliacao in loco realizada, a equipe passara a montagem do relatorio e os apontamentos dos itens nao conformes em acordo com as Normas e documentos aplicaveis, oferecendo ato continuo as recomendacoes para atendimento dos requisitos aplicaveis.
      </p>
      <p class="secao-texto">
        <strong>Recomendacoes Tecnicas:</strong> As medidas e recomendacoes de que fazem parte este relatorio constitui-se de sugestoes as quais sao de responsabilidade e decisao da empresa aplica-las ou nao em sua unidade de negocio.
      </p>
      <p class="secao-texto">
        Estimativa dos riscos pela metodologia HRN (Hazard Rating Number). A formula aplicada para encontrar o nivel de risco e: <strong>HRN = LO x FE x DPH x NP</strong>
      </p>

      <table class="tabela-hrn-ref">
        <thead><tr><th colspan="2">Tabela - Probabilidade de Ocorrencia (LO)</th></tr></thead>
        <tbody>
          <tr><td>Quase impossivel</td><td>0,033</td></tr>
          <tr><td>Altamente improvavel</td><td>1</td></tr>
          <tr><td>Improvavel</td><td>1,5</td></tr>
          <tr><td>Possivel</td><td>2</td></tr>
          <tr><td>Alguma chance</td><td>5</td></tr>
          <tr><td>Provavel</td><td>8</td></tr>
          <tr><td>Muito provavel</td><td>10</td></tr>
          <tr><td>Certo</td><td>15</td></tr>
        </tbody>
      </table>

      <table class="tabela-hrn-ref">
        <thead><tr><th colspan="2">Tabela - Frequencia de Exposicao (FE)</th></tr></thead>
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

<!-- ===== PAGINA 5: METODOLOGIA (cont.) ===== -->
<div class="page">
  ${gerarHeader('Metodologia')}
  <div class="content">
    <div class="secao">
      <table class="tabela-hrn-ref">
        <thead><tr><th colspan="2">Tabela - Grau Possivel de Lesao (DPH)</th></tr></thead>
        <tbody>
          <tr><td>Arranhao / Contusao</td><td>0,1</td></tr>
          <tr><td>Dilaceracao / Efeito leve na saude</td><td>0,5</td></tr>
          <tr><td>Fratura / Enfermidade leve</td><td>2</td></tr>
          <tr><td>Fratura / Enfermidade grave</td><td>4</td></tr>
          <tr><td>Perda de 1 membro / olho / audicao</td><td>6</td></tr>
          <tr><td>Perda de 2 membros / olhos</td><td>10</td></tr>
          <tr><td>Fatalidade</td><td>15</td></tr>
        </tbody>
      </table>

      <table class="tabela-hrn-ref">
        <thead><tr><th colspan="2">Tabela - Numero de Pessoas Expostas (NP)</th></tr></thead>
        <tbody>
          <tr><td>1 - 2 Pessoas</td><td>1</td></tr>
          <tr><td>3 - 7 Pessoas</td><td>2</td></tr>
          <tr><td>8 - 15 Pessoas</td><td>4</td></tr>
          <tr><td>16 - 50 Pessoas</td><td>8</td></tr>
          <tr><td>Mais de 50 Pessoas</td><td>12</td></tr>
        </tbody>
      </table>

      <table class="tabela-hrn-ref">
        <thead><tr><th colspan="2">Tabela - Classificacao HRN</th></tr></thead>
        <tbody>
          <tr><td style="background: #d4edda; color: #155724;">0 - 5</td><td style="background: #d4edda; color: #155724;">Aceitavel</td></tr>
          <tr><td style="background: #fff3cd; color: #856404;">5 - 50</td><td style="background: #fff3cd; color: #856404;">Muito Significante</td></tr>
          <tr><td style="background: #ffe0b2; color: #e65100;">50 - 500</td><td style="background: #ffe0b2; color: #e65100;">Alto</td></tr>
          <tr><td style="background: #f8d7da; color: #721c24;">500 - 1000</td><td style="background: #f8d7da; color: #721c24;">Muito Alto</td></tr>
          <tr><td style="background: #c62828; color: white;">Maior que 1000</td><td style="background: #c62828; color: white;">Extremo</td></tr>
        </tbody>
      </table>

      <p class="secao-texto" style="margin-top: 15px;">
        O quadro anterior deve ser utilizado para priorizar a tomada de acoes:
      </p>
      <ul class="secao-lista">
        <li>Para a faixa de 0 a 5, buscar a melhoria sem um prazo definido;</li>
        <li>Para o resultado de 5 a 50, dentro de 4 meses deve-se atuar na reducao dos riscos;</li>
        <li>Para a faixa de 50 a 1000, em no maximo uma semana;</li>
        <li>Para a faixa maior que 1000 se deve interromper as atividades imediatamente.</li>
      </ul>
    </div>
  </div>
  ${gerarFooter(5)}
</div>

<!-- ===== PAGINA 6: APRECIACAO DE RISCOS - IDENTIFICACAO ===== -->
<div class="page">
  ${gerarHeader('Identificacao')}
  <div class="content">
    <div class="secao">
      <div class="secao-titulo">5 Apreciacao de Riscos e Conformidades</div>
      <div class="secao-subtitulo">5.1 Equipamento: ${data.maquinaNome || 'N/A'}</div>

      <div style="font-size:9px;font-weight:bold;color:#1e3a8a;text-transform:uppercase;letter-spacing:0.5px;margin:15px 0 6px;padding-left:2px;">Dados da Empresa</div>
      <div class="campos-grid">
        <div class="campo"><div class="campo-label">Empresa:</div><div class="campo-valor">${data.empresaNome || ''}</div></div>
        <div class="campo"><div class="campo-label">CNPJ:</div><div class="campo-valor">${data.empresaCNPJ || ''}</div></div>
        <div class="campo campo-full"><div class="campo-label">Endereco:</div><div class="campo-valor">${data.empresaEndereco || ''}</div></div>
        <div class="campo"><div class="campo-label">Data Abertura:</div><div class="campo-valor">${data.empresaDataAbertura || ''}</div></div>
        <div class="campo"><div class="campo-label">CNAE:</div><div class="campo-valor">${data.empresaCNAE || ''}</div></div>
      </div>

      <div style="font-size:9px;font-weight:bold;color:#1e3a8a;text-transform:uppercase;letter-spacing:0.5px;margin:20px 0 6px;padding-left:2px;">Dados da Maquina</div>
      <div class="campos-grid">
        <div class="campo"><div class="campo-label">Maquina:</div><div class="campo-valor">${data.maquinaNome || ''}</div></div>
        <div class="campo"><div class="campo-label">Modelo:</div><div class="campo-valor">${data.maquinaModelo || ''}</div></div>
        <div class="campo"><div class="campo-label">N. de Serie:</div><div class="campo-valor">${data.maquinaSerial || ''}</div></div>
        <div class="campo"><div class="campo-label">Fabricante:</div><div class="campo-valor">${data.maquinaFabricante || ''}</div></div>
        <div class="campo"><div class="campo-label">Ano Fabricacao:</div><div class="campo-valor">${data.maquinaAno || ''}</div></div>
        <div class="campo"><div class="campo-label">Setor:</div><div class="campo-valor">${data.maquinaSetor || ''}</div></div>
      </div>

      <div style="margin-top:12px;padding:10px;background:#f8fafb;border:1px solid #e0e0e0;border-radius:4px;">
        <div style="font-size:8.5px;font-weight:bold;color:#505050;text-transform:uppercase;letter-spacing:0.3px;margin-bottom:4px;">Descricao Geral / Funcao:</div>
        <div style="font-size:9.5px;line-height:1.6;text-align:justify;color:#333;white-space:pre-line;">${data.maquinaDescricao || ''}</div>
      </div>
    </div>
  </div>
  ${gerarFooter(pgIdentificacao)}
</div>

${data.usoPretendido || data.modoOperacao ? `
<!-- ===== PAGINA: LIMITES DA MAQUINA ===== -->
<div class="page">
  ${gerarHeader('Limites da Maquina')}
  <div class="content">
    <div class="secao">
      <div class="secao-subtitulo">Limites da Maquina</div>
      <table style="width:100%;border-collapse:collapse;font-size:9px;margin-top:8px;border-radius:4px;overflow:hidden;">
        <tbody>
          ${data.usoPretendido ? `
          <tr>
            <td style="padding:8px 10px;border:1px solid #e0e0e0;width:130px;font-weight:bold;vertical-align:top;background:#f0f8f8;color:#1e3a8a;font-size:8px;text-transform:uppercase;letter-spacing:0.3px;">Uso Pretendido</td>
            <td style="padding:8px 10px;border:1px solid #e0e0e0;line-height:1.5;white-space:pre-line;color:#333;">${data.usoPretendido}</td>
          </tr>` : ''}
          ${data.modoOperacao ? `
          <tr>
            <td style="padding:8px 10px;border:1px solid #e0e0e0;width:130px;font-weight:bold;vertical-align:top;background:#f0f8f8;color:#1e3a8a;font-size:8px;text-transform:uppercase;letter-spacing:0.3px;">Modo de Operacao</td>
            <td style="padding:8px 10px;border:1px solid #e0e0e0;line-height:1.5;white-space:pre-line;color:#333;">${data.modoOperacao}</td>
          </tr>` : ''}
          <tr>
            <td style="padding:8px 10px;border:1px solid #e0e0e0;font-weight:bold;background:#f0f8f8;color:#1e3a8a;font-size:8px;text-transform:uppercase;letter-spacing:0.3px;">Uso do Equipamento</td>
            <td style="padding:8px 10px;border:1px solid #e0e0e0;color:#333;">
              <strong style="color:#4a9b9e;">X</strong> INDUSTRIAL &nbsp;&nbsp; - NAO INDUSTRIAL &nbsp;&nbsp; - DOMESTICO
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  ${gerarFooter(pgLimites)}
</div>` : ''}

${data.fotoPlacar || data.fotoVisaoGeral ? `
<!-- ===== PAGINA: FOTOGRAFIAS ===== -->
<div class="page">
  ${gerarHeader('Fotografias')}
  <div class="content">
    <div class="secao">
      <div class="secao-subtitulo">5.1 Equipamento: ${maquinaHeader} - Fotografias</div>

      ${data.fotoPlacar ? `
      <div style="margin-bottom:20px;text-align:center;">
        <div style="font-size:9px;font-weight:bold;margin-bottom:8px;color:#1e3a8a;text-transform:uppercase;letter-spacing:0.5px;">Fotografia da Placa da Maquina</div>
        <img src="${data.fotoPlacar}" alt="Placa de Identificacao" style="max-width:100%;max-height:280px;border:1px solid #d0d0d0;border-radius:4px;object-fit:contain;">
      </div>` : ''}

      ${data.fotoVisaoGeral ? `
      <div style="text-align:center;">
        <div style="font-size:9px;font-weight:bold;margin-bottom:8px;color:#1e3a8a;text-transform:uppercase;letter-spacing:0.5px;">Figura 01: ${maquinaHeader} - Visao Geral</div>
        <img src="${data.fotoVisaoGeral}" alt="Visao Geral" style="max-width:100%;max-height:280px;border:1px solid #d0d0d0;border-radius:4px;object-fit:contain;">
      </div>` : ''}
    </div>
  </div>
  ${gerarFooter(pgFotos)}
</div>` : ''}

<!-- ===== SISTEMAS DE SEGURANCA (DISPOSITIVOS) ===== -->
${data.dispositivosSeguranca && data.dispositivosSeguranca.length > 0 ? (() => {
  const DISPOSITIVOS_POR_PAGINA = 2
  const paginas: string[] = []
  for (let i = 0; i < data.dispositivosSeguranca.length; i += DISPOSITIVOS_POR_PAGINA) {
    const grupo = data.dispositivosSeguranca.slice(i, i + DISPOSITIVOS_POR_PAGINA)
    const isPrimeira = i === 0
    const pgNum = pgDispInicio + Math.floor(i / DISPOSITIVOS_POR_PAGINA)
    paginas.push(`
<div class="page">
  ${gerarHeader('Dispositivos de Seguranca')}
  <div class="content">
    <div class="secao">
      ${isPrimeira ? '<div class="secao-subtitulo">5.1.1 Sistemas de seguranca atuais</div>' : '<div class="secao-subtitulo">5.1.1 Sistemas de seguranca atuais (continuacao)</div>'}

      ${grupo.map((disp, idx) => `
        <div class="dispositivo-item">
          <div class="dispositivo-foto">
            ${disp.foto
              ? `<img src="${disp.foto}" alt="Dispositivo ${i + idx + 1}"><div class="foto-legenda">Ilustracao</div>`
              : '<div style="width:150px;height:100px;border:1px dashed #d0d0d0;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#999;font-size:8px;background:#f8f8f8;">Sem foto</div>'}
          </div>
          <div class="dispositivo-descricao">
            <strong>Descricao</strong><br><br>
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
  ${gerarHeader('Resumo HRN')}
  <div class="content">
    <div class="secao">
      ${isPrimeira ? '<div class="secao-titulo">Resumo da Analise de Riscos (HRN)</div>' : '<div class="secao-titulo">Resumo da Analise de Riscos (HRN) - continuacao</div>'}

      <table class="tabela">
        <thead>
          <tr>
            <th style="width:6%;">N</th>
            <th style="width:12%;">Ciclo</th>
            <th style="width:15%;">Tarefa</th>
            <th style="width:25%;">Descricao do Perigo</th>
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
              <td style="font-weight:bold;color:#1e3a8a;">${p.numeroPerigo}</td>
              <td style="text-align:left;">${p.cicloVida}</td>
              <td style="text-align:left;">${p.tarefa}</td>
              <td style="text-align:left;font-size:7px;">${p.descricaoPerigo}</td>
              <td style="background:${ha.cor};color:${ha.corTexto};font-weight:bold;">${p.hrnAntes.toFixed(2)}</td>
              <td style="background:${hd.cor};color:${hd.corTexto};font-weight:bold;">${p.hrnDepois.toFixed(2)}</td>
              <td style="font-weight:bold;color:#4a9b9e;">${m}%</td>
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

<!-- ===== ANALISE DETALHADA POR PERIGO ===== -->
${data.perigos && data.perigos.length > 0 ? data.perigos.map((perigo, idxPerigo) => {
  const ha = classificarHRN(perigo.hrnAntes)
  const hd = classificarHRN(perigo.hrnDepois)
  const m = perigo.hrnAntes > 0 ? ((perigo.hrnAntes - perigo.hrnDepois) / perigo.hrnAntes * 100).toFixed(0) : '0'
  const pgNumDetalhe = pgAnaliseInicio + idxPerigo
  return `
<div class="page">
  ${gerarHeader(`Perigo ${perigo.numeroPerigo}`)}
  <div class="content">
    <div class="secao">
      <div class="secao-subtitulo">Perigo ${perigo.numeroPerigo} - ${perigo.descricaoPerigo}</div>
      <p class="secao-texto">
        <strong>Ciclo de Vida:</strong> ${perigo.cicloVida} &nbsp;|&nbsp;
        <strong>Tarefa:</strong> ${perigo.tarefa}
      </p>

      ${perigo.foto ? `
      <div class="perigo-foto">
        <img src="${perigo.foto}" alt="Foto do perigo ${perigo.numeroPerigo}" />
      </div>
      ` : ''}

      <div class="hrn-grid">
        <div class="hrn-box hrn-antes">
          <div class="hrn-box-titulo">Cenario Antes (sem medidas)</div>
          <div class="hrn-parametros">
            <div class="hrn-param"><div class="hrn-param-label">LO</div><div class="hrn-param-valor">${perigo.loAntes.toFixed(2)}</div></div>
            <div class="hrn-param"><div class="hrn-param-label">FE</div><div class="hrn-param-valor">${perigo.feAntes.toFixed(2)}</div></div>
            <div class="hrn-param"><div class="hrn-param-label">DPH</div><div class="hrn-param-valor">${perigo.dphAntes.toFixed(2)}</div></div>
            <div class="hrn-param"><div class="hrn-param-label">NP</div><div class="hrn-param-valor">${perigo.npAntes.toFixed(2)}</div></div>
            <div class="hrn-param" style="border:2px solid #ff9800;background:#fff8f0;"><div class="hrn-param-label">HRN</div><div class="hrn-param-valor">${perigo.hrnAntes.toFixed(2)}</div></div>
          </div>
          <div class="hrn-resultado" style="background:${ha.cor};color:${ha.corTexto};">${ha.classe}</div>
        </div>
        <div class="hrn-box hrn-depois">
          <div class="hrn-box-titulo">Cenario Depois (com medidas)</div>
          <div class="hrn-parametros">
            <div class="hrn-param"><div class="hrn-param-label">LO</div><div class="hrn-param-valor">${perigo.loDepois.toFixed(2)}</div></div>
            <div class="hrn-param"><div class="hrn-param-label">FE</div><div class="hrn-param-valor">${perigo.feDepois.toFixed(2)}</div></div>
            <div class="hrn-param"><div class="hrn-param-label">DPH</div><div class="hrn-param-valor">${perigo.dphDepois.toFixed(2)}</div></div>
            <div class="hrn-param"><div class="hrn-param-label">NP</div><div class="hrn-param-valor">${perigo.npDepois.toFixed(2)}</div></div>
            <div class="hrn-param" style="border:2px solid #4caf50;background:#f0fff0;"><div class="hrn-param-label">HRN</div><div class="hrn-param-valor">${perigo.hrnDepois.toFixed(2)}</div></div>
          </div>
          <div class="hrn-resultado" style="background:${hd.cor};color:${hd.corTexto};">${hd.classe} (Reducao: ${m}%)</div>
        </div>
      </div>

      <div style="margin-top:15px;">
        <div style="font-size:9px;font-weight:bold;color:#1e3a8a;text-transform:uppercase;letter-spacing:0.3px;margin-bottom:6px;">Medidas de Engenharia Implementadas:</div>
        <div class="medidas-box">${perigo.medidasEngenharia || 'Nao especificado'}</div>
      </div>
    </div>
  </div>
  ${gerarFooter(pgNumDetalhe)}
</div>`
}).join('') : ''}

<!-- ===== DEFINICAO DE CATEGORIA REQUERIDA ===== -->
<div class="page">
  ${gerarHeader('Categoria e Normas')}
  <div class="content">
    <div class="secao">
      <div class="secao-titulo">6 Definicao de Categoria Requerida</div>
      <p class="secao-texto">Conforme os riscos existentes (pior caso):</p>
      <div class="categoria-box">
        <p><strong>Gravidade da lesao:</strong> S2 - Lesao Grave, irreversivel ou morte.</p>
        <p><strong>Frequencia e/ou duracao da exposicao ao perigo:</strong> F2 - Frequente ate continuo.</p>
        <p><strong>Possibilidade de se evitar o perigo:</strong> P1 - Sob determinadas condicoes.</p>
        <div class="categoria-conclusao">CATEGORIA DE PROTECAO REQUERIDA - 3</div>
      </div>
    </div>

    <div class="secao">
      <div class="secao-titulo">7 Manutencao, Inspecao, Preparacao, Ajuste, Reparo e Limpeza</div>
      <p class="secao-texto">
        A empresa devera ter as suas maquinas e equipamentos submetidos a atividade de manutencao preventiva e corretiva, na forma e periodicidade determinada pelo fabricante, conforme as normas tecnicas oficiais nacionais vigentes.
      </p>
      <p class="secao-texto">
        As intervencoes sao executadas por profissionais capacitados, qualificados ou legalmente habilitados, formalmente autorizados pelo empregador e com as maquinas e equipamentos parados com adocao dos procedimentos contidos em norma.
      </p>
    </div>

    <div class="secao">
      <div class="secao-titulo">8 Arranjos Fisicos e Sinalizacao</div>
      <p class="secao-texto">
        A empresa devera garantir a organizacao geral das areas deixando os Equipamentos de Protecao Coletiva (EPC's), Extintores e Paineis Eletricos, desobstruidos e com livre acesso. Identificar as maquinas referente aos seus riscos, atraves de adesivos, bem como os paineis eletricos e demais locais que representem algum risco.
      </p>
    </div>
  </div>
  ${gerarFooter(pgCategoria)}
</div>

<!-- ===== MANUAL + PROCEDIMENTOS + TREINAMENTO ===== -->
<div class="page">
  ${gerarHeader('Procedimentos')}
  <div class="content">
    <div class="secao">
      <div class="secao-titulo">9 Manual de Operacao</div>
      <p class="secao-texto">
        As maquinas e equipamentos devem possuir manual de instrucoes fornecido pelo fabricante ou importador, com informacoes relativas a seguranca em todas as fases de utilizacao. Quando inexistente ou extraviado, o manual deve ser solicitado ao fornecedor ou ser elaborada pela empresa uma ficha de informacao contendo:
      </p>
      <ol class="secao-lista" type="a">
        <li>tipo, modelo e capacidade;</li>
        <li>descricao da utilizacao prevista para a maquina ou equipamento;</li>
        <li>indicacao das medidas de seguranca existentes;</li>
        <li>instrucoes para utilizacao segura da maquina ou equipamento;</li>
        <li>periodicidade e instrucoes quanto as inspecoes e manutencao;</li>
        <li>procedimentos a serem adotados em emergencias, quando aplicavel.</li>
      </ol>
    </div>

    <div class="secao">
      <div class="secao-titulo">10 Procedimentos de Trabalho e Seguranca</div>
      <p class="secao-texto">
        A empresa possui instrucao de trabalho para o Processo de Operacao da maquina/equipamento e devera estar anexo a este laudo. Esta instrucao de trabalho identifica os procedimentos de seguranca, operacao e demais, necessarios para operacao correta e segura do equipamento.
      </p>
    </div>

    <div class="secao">
      <div class="secao-titulo">11 Treinamento e Capacitacao</div>
      <p class="secao-texto">
        A operacao, manutencao, inspecao e demais intervencoes em maquinas e equipamentos devem ser realizadas por trabalhadores habilitados ou qualificados ou capacitados, e autorizados para este fim.
      </p>
      <p class="secao-texto">
        Todos os trabalhadores envolvidos na operacao, manutencao, inspecao e demais intervencoes em maquinas e equipamentos conforme determina a Norma Regulamentadora deverao passar por treinamento e capacitacao incluindo a reciclagem do trabalhador sempre que ocorrerem modificacoes significativas nas instalacoes e na operacao de maquinas.
      </p>
    </div>
  </div>
  ${gerarFooter(pgManual)}
</div>

<!-- ===== CONCLUSAO + RESPONSAVEL TECNICO + ANEXOS ===== -->
<div class="page">
  ${gerarHeader('Conclusao')}
  <div class="content">
    <div class="secao">
      <div class="secao-titulo">12 Conclusao</div>
      <div class="conclusao-box">
        ${data.tipoConlusao === 'A'
          ? `<p class="secao-texto">Para a elaboracao e emissao do Laudo de NR-12, faz-se necessaria a previa adequacao da maquina aos requisitos de seguranca estabelecidos na norma. As adequacoes devem contemplar a implementacao, correcao ou complementacao dos sistemas de protecao atuais.</p>
             <p class="secao-texto">Somente apos a conclusao e validacao dessas adequacoes, garantindo que a maquina atenda integralmente aos dispositivos aplicaveis da NR-12 e as normas tecnicas correlatas, sera possivel realizar a avaliacao final e emitir o respectivo laudo.</p>
             <div class="conclusao-tipo conclusao-tipo-a">TIPO A - PRE-ADEQUACAO</div>`
          : `<p class="secao-texto">A maquina <strong>${data.maquinaNome || 'N/A'}</strong> atende aos requisitos tecnicos de seguranca da NR-12, conforme analise realizada neste laudo. O equipamento encontra-se em conformidade com as normas tecnicas aplicaveis.</p>
             <div class="conclusao-tipo conclusao-tipo-b">TIPO B - ADEQUADO</div>`
        }
        <p class="secao-texto" style="margin-top:12px;"><strong>Data de Emissao:</strong> ${dataFormatada}</p>
      </div>
    </div>

    <div class="secao">
      <div class="secao-titulo">13 Responsavel Tecnico</div>
      <p class="secao-texto">Garante as informacoes supracitadas neste laudo e assina abaixo:</p>
      <div class="assinatura-bloco">
        <div class="assinatura-linha"></div>
        <div class="assinatura-nome">Bruno Cardoso</div>
        <div class="assinatura-cargo">Engenheiro Eletricista</div>
        <div class="assinatura-cargo">Eng. De Seguranca do Trabalho</div>
        <div class="assinatura-cargo" style="margin-top:5px;color:#4a9b9e;font-weight:bold;">CREA/SC 108.955-2</div>
      </div>
    </div>

    <div class="secao" style="margin-top:30px;">
      <div class="secao-titulo">14 Anexos</div>
      <ol class="secao-lista">
        ${data.artNumero ? `<li>ART do Laudo n ${data.artNumero}</li>` : '<li>ART do Laudo</li>'}
        <li>Manual da maquina em portugues</li>
      </ol>
    </div>
  </div>
  ${gerarFooter(pgConclusao)}
</div>

</body>
</html>
`
}
