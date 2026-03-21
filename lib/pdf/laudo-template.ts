export function generateLaudoHTML(data: {
  empresaNome: string;
  empresaCNPJ: string;
  empresaEndereco: string;
  empresaDataAbertura: string;
  empresaCNAE: string;
  maquinaNome: string;
  maquinaModelo: string;
  maquinaSerial: string;
  maquinaFabricante: string;
  maquinaAno: string;
  maquinaSetor: string;
  maquinaDescricao: string;
  fotoPlacar?: string;
  fotoVisaoGeral?: string;
  dispositivosSeguranca: Array<{ descricao: string; foto?: string }>;
  perigos: Array<{
    cicloVida: string;
    numeroPerigo: string;
    tarefa: string;
    descricaoPerigo: string;
    loAntes: number;
    feAntes: number;
    dphAntes: number;
    npAntes: number;
    hrnAntes: number;
    medidasEngenharia: string;
    loDepois: number;
    feDepois: number;
    dphDepois: number;
    npDepois: number;
    hrnDepois: number;
  }>;
  tipoConlusao: 'A' | 'B';
  artNumero?: string;
}) {
  const mesAno = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' });

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laudo Técnico NR-12 - ${data.maquinaNome}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      color: #000;
      line-height: 1.5;
      font-size: 11pt;
      background: white;
    }

    /* CABEÇALHO */
    .page-header {
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      padding: 8px 0;
      margin-bottom: 15px;
      font-size: 10pt;
      text-align: center;
    }

    .page-header .titulo {
      font-weight: bold;
      margin-bottom: 3px;
    }

    .page-header .maquina {
      font-size: 9pt;
    }

    /* RODAPÉ */
    .page-footer {
      border-top: 1px solid #000;
      padding-top: 8px;
      margin-top: 30px;
      font-size: 9pt;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .footer-left {
      flex: 1;
      line-height: 1.4;
    }

    .footer-right {
      flex: 1;
      text-align: right;
    }

    .logo-footer {
      font-size: 16pt;
      font-weight: bold;
      margin-bottom: 2px;
    }

    .logo-eletri {
      color: #505050;
    }

    .logo-seg {
      color: #4a9b9e;
    }

    .logo-text {
      font-size: 8pt;
      letter-spacing: 2px;
      color: #000;
      margin-bottom: 3px;
    }

    .page-number {
      font-size: 9pt;
      font-weight: bold;
    }

    /* CONTEÚDO */
    .content {
      margin-bottom: 20px;
      min-height: 850px;
    }

    .cover {
      text-align: center;
      padding: 80px 20px;
      page-break-after: always;
    }

    .cover h1 {
      font-size: 16pt;
      font-weight: bold;
      margin: 20px 0;
    }

    .cover h2 {
      font-size: 13pt;
      margin: 40px 0;
      font-weight: normal;
    }

    .cover .nr12 {
      font-size: 28pt;
      font-weight: bold;
      margin: 60px 0;
    }

    .cover .empresa {
      font-size: 12pt;
      font-weight: bold;
      margin: 80px 0 20px 0;
    }

    .cover-info {
      margin-top: 60px;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      padding: 15px 0;
      font-size: 10pt;
    }

    .cover-info-row {
      display: flex;
      justify-content: space-between;
      margin: 5px 0;
      text-align: left;
    }

    .cover-info-row strong {
      font-weight: bold;
      margin-right: 20px;
      min-width: 150px;
    }

    h2 {
      font-size: 12pt;
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 10px;
      border-bottom: 1px solid #000;
      padding-bottom: 5px;
    }

    h3 {
      font-size: 11pt;
      font-weight: bold;
      margin-top: 15px;
      margin-bottom: 8px;
    }

    p {
      text-align: justify;
      margin-bottom: 10px;
      line-height: 1.6;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-size: 10pt;
    }

    th {
      background-color: #e8e8e8;
      border: 1px solid #000;
      padding: 6px;
      text-align: left;
      font-weight: bold;
      font-size: 9pt;
    }

    td {
      border: 1px solid #ccc;
      padding: 6px;
      text-align: left;
    }

    .info-table tr {
      border: none;
    }

    .info-table td {
      border: none;
      padding: 3px 0;
      text-align: left;
    }

    .info-table strong {
      font-weight: bold;
      min-width: 150px;
      display: inline-block;
    }

    .image-container {
      text-align: center;
      margin: 15px 0;
      page-break-inside: avoid;
    }

    .image-container img {
      max-width: 100%;
      max-height: 250px;
      border: 1px solid #999;
    }

    .image-caption {
      font-size: 9pt;
      margin-top: 5px;
      font-style: italic;
    }

    ul {
      margin-left: 20px;
      margin-bottom: 10px;
    }

    ul li {
      margin-bottom: 5px;
      text-align: justify;
    }

    .toc {
      margin: 20px 0;
      padding: 15px;
    }

    .toc ul {
      list-style: none;
      margin: 0;
    }

    .toc li {
      margin: 3px 0;
      font-size: 10pt;
    }

    .toc li.level1 {
      font-weight: bold;
      margin-left: 0;
    }

    .toc li.level2 {
      margin-left: 20px;
    }

    .page-break {
      page-break-after: always;
      margin-bottom: 20px;
    }

    .signature {
      text-align: center;
      margin-top: 60px;
      page-break-inside: avoid;
    }

    .signature-line {
      margin: 60px 0 10px 0;
      border-top: 1px solid #000;
      width: 200px;
      margin-left: auto;
      margin-right: auto;
    }

    .hrn-box {
      background-color: #f5f5f5;
      border: 1px solid #999;
      padding: 10px;
      margin: 10px 0;
      page-break-inside: avoid;
    }

    .hrn-value {
      font-weight: bold;
      font-size: 14pt;
      color: #4a9b9e;
      text-align: center;
      margin: 5px 0;
    }
  </style>
</head>
<body>

<!-- CAPA -->
<div class="cover">
  <div class="page-header">
    <div class="titulo">LAUDO TÉCNICO NR12 – YAWEI BRASIL COMERCIO DE MÁQUINAS LTDA</div>
    <div class="maquina">Máquina ${data.maquinaNome}</div>
  </div>

  <h1>Laudo de apreciação de riscos e conformidades</h1>
  <p style="font-size: 12pt;">${data.maquinaNome}</p>

  <div class="nr12">NR-12</div>

  <div class="empresa">${data.empresaNome}</div>

  <div class="cover-info">
    <div class="cover-info-row">
      <strong>00</strong>
      <span>${mesAno}</span>
      <span>Emissão Inicial e Entrega</span>
      <span>Bruno C.</span>
    </div>
    <div class="cover-info-row">
      <strong>Rev.</strong>
      <span>Data</span>
      <span>Descrição</span>
      <span>Responsável</span>
    </div>
  </div>

  <div style="margin-top: 80px;">
    <div class="logo-footer">
      <span class="logo-eletri">Eletri</span><span class="logo-seg">Seg</span>
    </div>
    <div class="logo-text">E N G E N H A R I A</div>
  </div>
</div>

<div class="page-break"></div>

<!-- SUMÁRIO -->
<div class="page-header">
  <div class="titulo">LAUDO TÉCNICO NR12 – YAWEI BRASIL COMERCIO DE MÁQUINAS LTDA</div>
  <div class="maquina">Máquina ${data.maquinaNome}</div>
</div>

<h2>Sumário</h2>
<div class="toc">
  <ul>
    <li class="level1">1 INTRODUÇÃO ................................................................................................................... 3</li>
    <li class="level1">2 OBJETIVO ...................................................................................................................... 3</li>
    <li class="level1">3 NORMAS E DOCUMENTOS APLICÁVEIS .......................................................................... 3</li>
    <li class="level1">4 METODOLOGIA ............................................................................................................. 4</li>
    <li class="level1">5 APRECIAÇÃO DE RISCOS E CONFORMIDADES ................................................................ 7</li>
    <li class="level2">5.1 Equipamento: ${data.maquinaNome} .................................................................... 8</li>
    <li class="level2">5.1.1 Sistemas de segurança atuais .....................................................................................11</li>
    <li class="level2">5.1.2 Análise de Riscos ..................................................................................................15</li>
    <li class="level1">6 DEFINIÇÃO DE CATEGORIA REQUERIDA ........................................................................20</li>
    <li class="level1">7 MANUTENÇÃO, INSPEÇÃO, PREPARAÇÃO, AJUSTE, REPARO E LIMPEZA .....................20</li>
    <li class="level1">8 ARRANJOS FÍSICOS E SINALIZAÇÃO .............................................................................20</li>
    <li class="level1">9 MANUAL DE OPERAÇÃO ................................................................................................20</li>
    <li class="level1">10 PROCEDIMENTOS DE TRABALHO E SEGURANÇA .........................................................20</li>
    <li class="level1">11 TREINAMENTO E CAPACITAÇÃO ...................................................................................20</li>
    <li class="level1">12 CONCLUSÃO ................................................................................................................21</li>
    <li class="level1">13 RESPONSÁVEL TÉCNICO ..............................................................................................21</li>
    <li class="level1">14 ANEXOS ......................................................................................................................21</li>
  </ul>
</div>

<div class="page-footer">
  <div class="footer-left">
    <strong>Engenharia Elétrica</strong><br>
    <strong>Eng. de Segurança do Trabalho</strong><br>
    <strong>EletriSeg Engenharia LTDA</strong><br>
    <strong>CREA-SC: 128.716-3</strong>
  </div>
  <div class="footer-right">
    <div class="logo-footer">
      <span class="logo-eletri">Eletri</span><span class="logo-seg">Seg</span>
    </div>
    <div class="logo-text">E N G E N H A R I A</div>
    <div class="page-number">2</div>
  </div>
</div>

<div class="page-break"></div>

<!-- INTRODUÇÃO -->
<div class="page-header">
  <div class="titulo">LAUDO TÉCNICO NR12 – YAWEI BRASIL COMERCIO DE MÁQUINAS LTDA</div>
  <div class="maquina">Máquina ${data.maquinaNome}</div>
</div>

<h2>1 INTRODUÇÃO</h2>
<p>
A Norma Regulamentadora NR-12 da Portaria 3.214, de 8 de junho de 1978 do Ministério do Trabalho e Emprego e suas revisões,
estabelecem requisitos mínimos para a Segurança em Máquinas e equipamentos. Esta visa à prevenção de acidentes e doenças do
trabalho desde a fase de projeto, construção, venda até a sua utilização ou operação, definindo referências técnicas, princípios
fundamentais e medidas de proteção que devem ser observados para garantir a saúde e a integridade física dos trabalhadores.
</p>

<h2>2 OBJETIVO</h2>
<p>
Documentar com Laudo Técnico as condições de segurança, análise e avaliação dos riscos em referência aos requisitos legais aplicáveis
na Norma Regulamentadora NR-12, confirmando sua devida adequação ao proposto em norma.
</p>

<h2>3 NORMAS E DOCUMENTOS APLICÁVEIS</h2>
<ul>
  <li><strong>ABNT NBR ISO 12100:2013</strong> – Segurança de máquinas – Princípios gerais de projeto - Apreciação e redução de riscos.</li>
  <li><strong>ABNT ISO/TR 14121-2:2018</strong> – Segurança de máquinas - Apreciação e riscos Parte 2: Guia prático e exemplos de métodos.</li>
  <li><strong>ABNT NBR 14153:2013</strong> – Segurança de Máquinas Partes de sistemas de comando relacionados à segurança – Princípios gerais para o projeto.</li>
  <li><strong>NR-12</strong> - Segurança no Trabalho em Máquinas e Equipamentos.</li>
</ul>

<div class="page-footer">
  <div class="footer-left">
    <strong>Engenharia Elétrica</strong><br>
    <strong>Eng. de Segurança do Trabalho</strong><br>
    <strong>EletriSeg Engenharia LTDA</strong><br>
    <strong>CREA-SC: 128.716-3</strong>
  </div>
  <div class="footer-right">
    <div class="logo-footer">
      <span class="logo-eletri">Eletri</span><span class="logo-seg">Seg</span>
    </div>
    <div class="logo-text">E N G E N H A R I A</div>
    <div class="page-number">3</div>
  </div>
</div>

<div class="page-break"></div>

<!-- DADOS DA EMPRESA -->
<div class="page-header">
  <div class="titulo">LAUDO TÉCNICO NR12 – YAWEI BRASIL COMERCIO DE MÁQUINAS LTDA</div>
  <div class="maquina">Máquina ${data.maquinaNome}</div>
</div>

<h2>5 APRECIAÇÃO DE RISCOS E CONFORMIDADES</h2>
<h3>Identificação da Empresa</h3>

<table class="info-table">
  <tr>
    <td><strong>Empresa:</strong></td>
    <td>${data.empresaNome}</td>
  </tr>
  <tr>
    <td><strong>CNPJ:</strong></td>
    <td>${data.empresaCNPJ}</td>
  </tr>
  <tr>
    <td><strong>Endereço:</strong></td>
    <td>${data.empresaEndereco}</td>
  </tr>
  <tr>
    <td><strong>Data de Abertura:</strong></td>
    <td>${data.empresaDataAbertura}</td>
  </tr>
  <tr>
    <td><strong>CNAE:</strong></td>
    <td>${data.empresaCNAE}</td>
  </tr>
  <tr>
    <td><strong>Data do Laudo:</strong></td>
    <td>${mesAno}</td>
  </tr>
</table>

${data.fotoPlacar ? `
<h3>Fotografia da Placa da Máquina</h3>
<div class="image-container">
  <img src="${data.fotoPlacar}" alt="Foto da Placa">
  <div class="image-caption">Fotografia da Placa da Máquina</div>
</div>
` : ''}

<h2>5.1 Equipamento: ${data.maquinaNome}</h2>

${data.fotoVisaoGeral ? `
<div class="image-container">
  <img src="${data.fotoVisaoGeral}" alt="Visão Geral">
  <div class="image-caption">Figura 01: ${data.maquinaNome} – Visão Geral</div>
</div>
` : ''}

<table class="info-table">
  <tr>
    <td><strong>Identificação (TAG/Série):</strong></td>
    <td>${data.maquinaSerial}</td>
  </tr>
  <tr>
    <td><strong>Setor:</strong></td>
    <td>${data.maquinaSetor}</td>
  </tr>
  <tr>
    <td><strong>Função:</strong></td>
    <td>${data.maquinaDescricao}</td>
  </tr>
  <tr>
    <td><strong>Fabricante:</strong></td>
    <td>${data.maquinaFabricante}</td>
  </tr>
  <tr>
    <td><strong>Modelo:</strong></td>
    <td>${data.maquinaModelo}</td>
  </tr>
  <tr>
    <td><strong>Ano de Fabricação:</strong></td>
    <td>${data.maquinaAno}</td>
  </tr>
</table>

<div class="page-footer">
  <div class="footer-left">
    <strong>Engenharia Elétrica</strong><br>
    <strong>Eng. de Segurança do Trabalho</strong><br>
    <strong>EletriSeg Engenharia LTDA</strong><br>
    <strong>CREA-SC: 128.716-3</strong>
  </div>
  <div class="footer-right">
    <div class="logo-footer">
      <span class="logo-eletri">Eletri</span><span class="logo-seg">Seg</span>
    </div>
    <div class="logo-text">E N G E N H A R I A</div>
    <div class="page-number">8</div>
  </div>
</div>

<div class="page-break"></div>

<!-- DISPOSITIVOS DE SEGURANÇA -->
${data.dispositivosSeguranca.length > 0 ? `
<div class="page-header">
  <div class="titulo">LAUDO TÉCNICO NR12 – YAWEI BRASIL COMERCIO DE MÁQUINAS LTDA</div>
  <div class="maquina">Máquina ${data.maquinaNome}</div>
</div>

<h3>5.1.1 Sistemas de Segurança Atuais</h3>

<table>
  <thead>
    <tr>
      <th style="width: 10%;">Ordem</th>
      <th style="width: 50%;">Descrição do Dispositivo</th>
      <th style="width: 40%;">Foto</th>
    </tr>
  </thead>
  <tbody>
    ${data.dispositivosSeguranca.map((disp, idx) => `
    <tr>
      <td style="text-align: center;">${idx + 1}</td>
      <td>${disp.descricao}</td>
      <td style="text-align: center;">
        ${disp.foto ? `<img src="${disp.foto}" style="max-width: 80px; max-height: 80px;">` : 'N/A'}
      </td>
    </tr>
    `).join('')}
  </tbody>
</table>

<div class="page-footer">
  <div class="footer-left">
    <strong>Engenharia Elétrica</strong><br>
    <strong>Eng. de Segurança do Trabalho</strong><br>
    <strong>EletriSeg Engenharia LTDA</strong><br>
    <strong>CREA-SC: 128.716-3</strong>
  </div>
  <div class="footer-right">
    <div class="logo-footer">
      <span class="logo-eletri">Eletri</span><span class="logo-seg">Seg</span>
    </div>
    <div class="logo-text">E N G E N H A R I A</div>
    <div class="page-number">11</div>
  </div>
</div>

<div class="page-break"></div>
` : ''}

<!-- ANÁLISE DE RISCOS -->
<div class="page-header">
  <div class="titulo">LAUDO TÉCNICO NR12 – YAWEI BRASIL COMERCIO DE MÁQUINAS LTDA</div>
  <div class="maquina">Máquina ${data.maquinaNome}</div>
</div>

<h3>5.1.2 Análise de Riscos (HRN)</h3>

${data.perigos.map((perigo) => `
<div style="margin: 20px 0; page-break-inside: avoid;">
  <h3>Perigo ${perigo.numeroPerigo}: ${perigo.descricaoPerigo}</h3>

  <table class="info-table">
    <tr>
      <td><strong>Ciclo de Vida:</strong></td>
      <td>${perigo.cicloVida}</td>
    </tr>
    <tr>
      <td><strong>Tarefa:</strong></td>
      <td>${perigo.tarefa}</td>
    </tr>
  </table>

  <table style="width: 100%;">
    <thead>
      <tr>
        <th style="width: 20%;">Parâmetro</th>
        <th style="width: 15%;">Antes</th>
        <th style="width: 15%;">Depois</th>
        <th style="width: 50%;">Medidas de Engenharia</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>LO (Likelihood)</strong></td>
        <td style="text-align: center;">${perigo.loAntes}</td>
        <td style="text-align: center;">${perigo.loDepois}</td>
        <td rowspan="4">${perigo.medidasEngenharia}</td>
      </tr>
      <tr>
        <td><strong>FE (Frequência)</strong></td>
        <td style="text-align: center;">${perigo.feAntes}</td>
        <td style="text-align: center;">${perigo.feDepois}</td>
      </tr>
      <tr>
        <td><strong>DPH (Duração)</strong></td>
        <td style="text-align: center;">${perigo.dphAntes}</td>
        <td style="text-align: center;">${perigo.dphDepois}</td>
      </tr>
      <tr>
        <td><strong>NP (Nº Pessoas)</strong></td>
        <td style="text-align: center;">${perigo.npAntes}</td>
        <td style="text-align: center;">${perigo.npDepois}</td>
      </tr>
    </tbody>
  </table>

  <div class="hrn-box">
    <table style="width: 100%; border: none;">
      <tr>
        <td style="border: none; text-align: center;">
          <div style="font-size: 9pt; color: #666;">HRN Antes</div>
          <div class="hrn-value">${perigo.hrnAntes}</div>
        </td>
        <td style="border: none; text-align: center;">
          <div style="font-size: 9pt; color: #666;">HRN Depois</div>
          <div class="hrn-value">${perigo.hrnDepois}</div>
        </td>
        <td style="border: none; text-align: center;">
          <div style="font-size: 9pt; color: #666;">Melhoria</div>
          <div class="hrn-value" style="color: #27ae60;">${perigo.hrnAntes > 0 ? ((1 - perigo.hrnDepois / perigo.hrnAntes) * 100).toFixed(0) : 0}%</div>
        </td>
      </tr>
    </table>
  </div>
</div>
`).join('')}

<div class="page-footer">
  <div class="footer-left">
    <strong>Engenharia Elétrica</strong><br>
    <strong>Eng. de Segurança do Trabalho</strong><br>
    <strong>EletriSeg Engenharia LTDA</strong><br>
    <strong>CREA-SC: 128.716-3</strong>
  </div>
  <div class="footer-right">
    <div class="logo-footer">
      <span class="logo-eletri">Eletri</span><span class="logo-seg">Seg</span>
    </div>
    <div class="logo-text">E N G E N H A R I A</div>
    <div class="page-number">15</div>
  </div>
</div>

<div class="page-break"></div>

<!-- CONCLUSÃO -->
<div class="page-header">
  <div class="titulo">LAUDO TÉCNICO NR12 – YAWEI BRASIL COMERCIO DE MÁQUINAS LTDA</div>
  <div class="maquina">Máquina ${data.maquinaNome}</div>
</div>

<h2>12 CONCLUSÃO</h2>
<p>
Com base na análise de riscos realizada conforme metodologia HRN (Hazard Rating Number) e em conformidade com a NR-12,
a máquina ${data.maquinaNome} apresenta as condições de segurança adequadas após implementação das medidas de engenharia recomendadas.
</p>

<p>
<strong>Tipo de Conclusão:</strong> ${data.tipoConlusao === 'A' ? 'Pré-adequação' : 'Adequado'}
${data.artNumero ? `<br><strong>Número ART:</strong> ${data.artNumero}` : ''}
</p>

<h2>13 RESPONSÁVEL TÉCNICO</h2>
<div class="signature">
  <div class="signature-line"></div>
  <p style="margin-top: 5px;"><strong>Eng. de Segurança do Trabalho</strong><br>CREA-SC: 128.716-3</p>
</div>

<h2>14 ANEXOS</h2>
<ul>
  <li>1 – ART do Laudo</li>
  <li>2 – Manual da máquina em português</li>
</ul>

<div class="page-footer">
  <div class="footer-left">
    <strong>Engenharia Elétrica</strong><br>
    <strong>Eng. de Segurança do Trabalho</strong><br>
    <strong>EletriSeg Engenharia LTDA</strong><br>
    <strong>CREA-SC: 128.716-3</strong>
  </div>
  <div class="footer-right">
    <div class="logo-footer">
      <span class="logo-eletri">Eletri</span><span class="logo-seg">Seg</span>
    </div>
    <div class="logo-text">E N G E N H A R I A</div>
    <div class="page-number">21</div>
  </div>
</div>

</body>
</html>
`;
}
