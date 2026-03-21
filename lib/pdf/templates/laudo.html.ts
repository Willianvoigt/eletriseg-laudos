export function gerarLaudoHTML(laudo: any): string {
  const dataEmissao = new Date(laudo.createdAt).toLocaleDateString('pt-BR')

  // Função para calcular HRN
  const calcularHRN = (lo: number, fe: number, dph: number, np: number) => lo * fe * dph * np

  // Gerar linhas da tabela de riscos
  const linhasRiscos = laudo.perigos.map((perigo: any, idx: number) => {
    const hrnAntes = calcularHRN(perigo.loAntes, perigo.feAntes, perigo.dphAntes, perigo.npAntes)
    const hrnDepois = calcularHRN(perigo.loDepois, perigo.feDepois, perigo.dphDepois, perigo.npDepois)
    const melhoria = ((1 - hrnDepois / hrnAntes) * 100).toFixed(1)
    return `
      <tr>
        <td>${idx + 1}</td>
        <td>${perigo.numeroPerigo}</td>
        <td>${perigo.descricaoPerigo}</td>
        <td>${perigo.loAntes}</td>
        <td>${perigo.feAntes}</td>
        <td>${perigo.dphAntes}</td>
        <td>${perigo.npAntes}</td>
        <td style="font-weight: bold;">${hrnAntes.toFixed(2)}</td>
        <td>${perigo.medidasEngenharia}</td>
        <td>${perigo.loDepois}</td>
        <td>${perigo.feDepois}</td>
        <td>${perigo.dphDepois}</td>
        <td>${perigo.npDepois}</td>
        <td style="font-weight: bold; color: #28a745;">${hrnDepois.toFixed(2)}</td>
        <td style="color: #0066cc;">${melhoria}%</td>
      </tr>
    `
  }).join('')

  // Gerar linhas dos dispositivos de segurança
  const linhasDispositivosSecurity = laudo.dispositivosSeguranca.map((dispositivo: any) => `
    <tr>
      <td>${dispositivo.ordem}</td>
      <td>${dispositivo.descricao}</td>
      <td>
        ${dispositivo.foto ? `<img src="${dispositivo.foto}" style="max-width: 80px; max-height: 60px;" />` : '-'}
      </td>
    </tr>
  `).join('')

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.4;
      color: #333;
    }

    @page {
      size: A4;
      margin: 20mm 15mm;
    }

    .page {
      page-break-after: always;
      padding-bottom: 20mm;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    header {
      border-bottom: 2px solid #0066cc;
      padding-bottom: 10px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .header-left h1 {
      font-size: 10pt;
      font-weight: bold;
      margin-bottom: 5px;
      color: #0066cc;
    }

    .header-left p {
      font-size: 9pt;
      margin: 2px 0;
    }

    .header-right {
      text-align: right;
      font-size: 9pt;
    }

    h1 {
      font-size: 14pt;
      font-weight: bold;
      margin-bottom: 15px;
      text-align: center;
      color: #0066cc;
    }

    h2 {
      font-size: 12pt;
      font-weight: bold;
      margin-top: 15px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
      color: #0066cc;
    }

    h3 {
      font-size: 11pt;
      font-weight: bold;
      margin-top: 10px;
      margin-bottom: 8px;
      color: #333;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-size: 10pt;
    }

    table.titulo-laudo {
      margin-bottom: 15px;
    }

    table.titulo-laudo td {
      padding: 5px;
      border-bottom: 1px solid #ddd;
    }

    table.titulo-laudo .label {
      font-weight: bold;
      width: 150px;
    }

    table.dados {
      border: 1px solid #ddd;
    }

    table.dados th {
      background-color: #f0f7ff;
      padding: 8px;
      border: 1px solid #ddd;
      font-weight: bold;
      text-align: left;
      font-size: 10pt;
    }

    table.dados td {
      padding: 8px;
      border: 1px solid #ddd;
    }

    table.dados tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    .sumario {
      background-color: #f9f9f9;
      padding: 10px;
      border-left: 3px solid #0066cc;
      margin: 10px 0;
    }

    .sumario ol {
      margin-left: 20px;
      font-size: 10pt;
    }

    .sumario li {
      margin-bottom: 3px;
    }

    .introducao {
      text-align: justify;
      margin: 10px 0;
      line-height: 1.5;
    }

    .foto {
      text-align: center;
      margin: 10px 0;
    }

    .foto img {
      max-width: 300px;
      max-height: 250px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .foto-legenda {
      font-size: 9pt;
      color: #666;
      margin-top: 5px;
    }

    .caixa-info {
      background-color: #f0f7ff;
      border-left: 3px solid #0066cc;
      padding: 10px;
      margin: 10px 0;
      font-size: 10pt;
    }

    .caixa-atencao {
      background-color: #fff3cd;
      border-left: 3px solid #ff9800;
      padding: 10px;
      margin: 10px 0;
      font-size: 10pt;
    }

    ul {
      margin-left: 20px;
      margin-top: 5px;
    }

    li {
      margin-bottom: 3px;
    }

    .assinatura {
      margin-top: 20px;
      border-top: 1px solid #ddd;
      padding-top: 10px;
    }

    .assinatura-linha {
      display: inline-block;
      width: 200px;
      text-align: center;
      margin-right: 50px;
      font-size: 9pt;
    }

    footer {
      border-top: 1px solid #ddd;
      padding-top: 10px;
      margin-top: 20px;
      text-align: center;
      font-size: 9pt;
      color: #666;
    }
  </style>
</head>
<body>
  <!-- CAPA -->
  <div class="page">
    <header>
      <div class="header-left">
        <h1>LAUDO TÉCNICO NR-12</h1>
        <p><strong>EletriSeg Engenharia LTDA</strong></p>
      </div>
      <div class="header-right">
        <p><strong>CREA-SC: 128.716-3</strong></p>
      </div>
    </header>

    <h1 style="margin-top: 80px; margin-bottom: 30px;">LAUDO TÉCNICO NR-12</h1>

    <table class="titulo-laudo" style="margin-bottom: 40px;">
      <tr>
        <td class="label"><strong>Empresa Responsável:</strong></td>
        <td>EletriSeg Engenharia LTDA</td>
      </tr>
      <tr>
        <td class="label"><strong>Equipamento:</strong></td>
        <td>${laudo.nomeMaquina} (${laudo.modelo})</td>
      </tr>
      <tr>
        <td class="label"><strong>Cliente:</strong></td>
        <td>${laudo.nomeEmpresa}</td>
      </tr>
      <tr>
        <td class="label"><strong>Data de Emissão:</strong></td>
        <td>${dataEmissao}</td>
      </tr>
      <tr>
        <td class="label"><strong>Revisão:</strong></td>
        <td>${laudo.numeroRevisao || '00'}</td>
      </tr>
      <tr>
        <td class="label"><strong>Responsável Técnico:</strong></td>
        <td>Bruno C.</td>
      </tr>
    </table>

    <div style="margin-top: 80px; text-align: center; font-size: 12pt; color: #0066cc; font-weight: bold;">
      Laudo de Apreciação de Riscos e Conformidades NR-12
    </div>
  </div>

  <!-- SUMÁRIO -->
  <div class="page">
    <h2>Sumário</h2>
    <div class="sumario">
      <ol>
        <li>INTRODUÇÃO</li>
        <li>OBJETIVO</li>
        <li>NORMAS E DOCUMENTOS APLICÁVEIS</li>
        <li>METODOLOGIA</li>
        <li>APRECIAÇÃO DE RISCOS E CONFORMIDADES</li>
        <li>DEFINIÇÃO DE CATEGORIA REQUERIDA</li>
        <li>MANUTENÇÃO, INSPEÇÃO, PREPARAÇÃO, AJUSTE, REPARO E LIMPEZA</li>
        <li>ARRANJOS FÍSICOS E SINALIZAÇÃO</li>
        <li>MANUAL DE OPERAÇÃO</li>
        <li>PROCEDIMENTOS DE TRABALHO E SEGURANÇA</li>
        <li>TREINAMENTO E CAPACITAÇÃO</li>
        <li>CONCLUSÃO</li>
        <li>RESPONSÁVEL TÉCNICO</li>
        <li>ANEXOS</li>
      </ol>
    </div>
  </div>

  <!-- INTRODUÇÃO -->
  <div class="page">
    <h2>1. INTRODUÇÃO</h2>
    <div class="introducao">
      <p>A Norma Regulamentadora NR-12, da Portaria 3.214, de 8 de junho de 1978 do Ministério do Trabalho e Emprego e suas revisões, estabelecem requisitos mínimos para a Segurança em Máquinas e equipamentos. Esta visa à prevenção de acidentes e doenças do trabalho desde a fase de projeto, construção, venda até a sua utilização ou operação, definindo referências técnicas, princípios fundamentais e medidas de proteção que devem ser observados para garantir a saúde e a integridade física dos trabalhadores.</p>
      <br />
      <p>As disposições contidas na presente Norma Regulamentadora se referem indistintamente a máquinas e equipamentos novos e usados. São consideradas medidas de proteção, a serem adotadas nessa ordem de prioridade:</p>
      <br />
      <ul>
        <li><strong>a)</strong> Medidas de proteção coletivas</li>
        <li><strong>b)</strong> Medidas administrativas ou de organização do trabalho</li>
        <li><strong>c)</strong> Medidas de proteção individuais</li>
      </ul>
      <br />
      <p>Este laudo reflete em última análise as condições de segurança do equipamento, em referência ao estabelecido nas normas.</p>
    </div>
  </div>

  <!-- OBJETIVO -->
  <div class="page">
    <h2>2. OBJETIVO</h2>
    <p style="text-align: justify;">Documentar com Laudo Técnico as condições de segurança, análise e avaliação dos riscos em referência aos requisitos legais aplicáveis na Norma Regulamentadora NR-12, confirmando sua devida adequação ao proposto em norma.</p>
  </div>

  <!-- NORMAS APLICÁVEIS -->
  <div class="page">
    <h2>3. NORMAS E DOCUMENTOS APLICÁVEIS</h2>
    <ul>
      <li>ABNT NBR ISO 12100:2013 - Segurança de máquinas - Princípios gerais de projeto - Apreciação e redução de riscos</li>
      <li>ABNT ISO/TR 14121-2:2018 - Segurança de máquinas - Apreciação e riscos Parte 2: Guia prático e exemplos de métodos</li>
      <li>ABNT NBR 14153:2013 - Segurança de Máquinas Partes de sistemas de comando relacionados à segurança - Princípios gerais para o projeto</li>
      <li>ABNT NBR ISO 13849-1:2019 - Partes de sistemas de comando relacionados à segurança Parte 1: Princípios gerais para o projeto</li>
      <li>ABNT NBR ISO 13849-2:2019 - Partes de sistemas de comando relacionados à segurança Parte 2: Validação</li>
      <li>NR-12 - Segurança no Trabalho em Máquinas e Equipamentos</li>
    </ul>
  </div>

  <!-- METODOLOGIA -->
  <div class="page">
    <h2>4. METODOLOGIA</h2>
    <p style="text-align: justify;">A metodologia para a realização do laudo consiste em três etapas fundamentais:</p>

    <h3>Avaliação no Posto de Trabalho</h3>
    <p style="text-align: justify;">A equipe acompanhará no local de trabalho a rotina das equipes de operação e manutenção junto à máquina. Esta etapa tem como objetivo realizar a análise de risco. Neste momento serão realizadas entrevistas com os operadores e mantenedores para aprofundar as informações com relação à exposição em suas atividades.</p>

    <h3>Análise dos Itens da Norma</h3>
    <p style="text-align: justify;">Com a avaliação in loco realizada, a equipe passará à montagem do relatório e os apontamentos dos itens não conformes em acordo com as Normas e documentos aplicáveis, oferecendo recomendações para atendimento dos requisitos aplicáveis na organização.</p>

    <h3>Estimativa de Riscos - Metodologia HRN</h3>
    <p style="text-align: justify;">A fórmula aplicada para encontrar o nível de risco é:</p>
    <div style="text-align: center; font-weight: bold; margin: 15px 0; font-size: 12pt;">
      HRN = LO × FE × DPH × NP
    </div>
    <p style="margin-top: 10px;"><strong>Onde:</strong></p>
    <ul>
      <li><strong>LO (Likelihood - Probabilidade):</strong> Escala de 0 a 10</li>
      <li><strong>FE (Frequência de Exposição):</strong> Escala de 0 a 10</li>
      <li><strong>DPH (Duração/Período do Hazard):</strong> Escala de 0 a 10</li>
      <li><strong>NP (Número de Pessoas):</strong> Escala de 0 a 10</li>
    </ul>
  </div>

  <!-- APRECIAÇÃO DE RISCOS -->
  <div class="page">
    <h2>5. APRECIAÇÃO DE RISCOS E CONFORMIDADES</h2>

    <h3>5.1 Identificação da Empresa Cliente</h3>
    <table class="dados">
      <tr>
        <td><strong>Empresa:</strong></td>
        <td>${laudo.nomeEmpresa}</td>
      </tr>
      <tr>
        <td><strong>CNPJ:</strong></td>
        <td>${laudo.cnpj}</td>
      </tr>
      <tr>
        <td><strong>Endereço:</strong></td>
        <td>${laudo.endereco}</td>
      </tr>
      <tr>
        <td><strong>Data de Abertura:</strong></td>
        <td>${laudo.dataAbertura}</td>
      </tr>
      <tr>
        <td><strong>Atividade Econômica:</strong></td>
        <td>${laudo.atividadeEconomica}</td>
      </tr>
    </table>

    ${laudo.fotoPlacaMaquina ? `
    <h3 style="margin-top: 20px;">Fotografia da Placa de Identificação</h3>
    <div class="foto">
      <img src="${laudo.fotoPlacaMaquina}" alt="Placa da Máquina" />
      <div class="foto-legenda">Placa de identificação do equipamento</div>
    </div>
    ` : ''}
  </div>

  <!-- DESCRIÇÃO DO EQUIPAMENTO -->
  <div class="page">
    <h2>5.2 Equipamento: ${laudo.nomeMaquina}</h2>

    ${laudo.fotoVisaoGeral ? `
    <div class="foto">
      <img src="${laudo.fotoVisaoGeral}" alt="Visão Geral da Máquina" />
      <div class="foto-legenda">Visão geral do equipamento - ${laudo.nomeMaquina}</div>
    </div>
    ` : ''}

    <h3>Identificação</h3>
    <table class="dados">
      <tr>
        <td><strong>Modelo:</strong></td>
        <td>${laudo.modelo}</td>
      </tr>
      <tr>
        <td><strong>Número de Série:</strong></td>
        <td>${laudo.numeroSerie}</td>
      </tr>
      <tr>
        <td><strong>Setor:</strong></td>
        <td>${laudo.setor}</td>
      </tr>
      <tr>
        <td><strong>Fabricante:</strong></td>
        <td>${laudo.fabricante}</td>
      </tr>
      <tr>
        <td><strong>Ano de Fabricação:</strong></td>
        <td>${laudo.anoFabricacao}</td>
      </tr>
      <tr>
        <td><strong>Potência:</strong></td>
        <td>${laudo.potenciaValor} ${laudo.potenciaUnidade}</td>
      </tr>
    </table>

    <h3 style="margin-top: 15px;">Descrição Geral</h3>
    <p style="text-align: justify;">${laudo.descricaoFuncao}</p>
  </div>

  <!-- LIMITES DA MÁQUINA -->
  <div class="page">
    <h2>5.3 Limites da Máquina</h2>

    <h3>Uso Pretendido</h3>
    <p style="text-align: justify;">O equipamento é destinado ao uso industrial, conforme requisitos técnicos e de segurança da NR-12.</p>

    <h3 style="margin-top: 15px;">Tipo de Uso</h3>
    <p>${laudo.tipoUso?.length > 0 ? laudo.tipoUso.join(', ') : 'Não especificado'}</p>

    <h3>Restrições</h3>
    <ul>
      <li>Restrição Motora: ${laudo.restricaoMotora ? 'Sim' : 'Não'}</li>
      <li>Restrição de Sexo: ${laudo.restricaoSexo ? 'Sim' : 'Não'}</li>
    </ul>

    <h3 style="margin-top: 15px;">Treinamentos Necessários</h3>
    <p>${laudo.treinamentos?.length > 0 ? laudo.treinamentos.join(', ') : 'Não especificado'}</p>
  </div>

  <!-- DISPOSITIVOS DE SEGURANÇA -->
  ${laudo.dispositivosSeguranca?.length > 0 ? `
  <div class="page">
    <h2>5.4 Dispositivos de Segurança</h2>
    <table class="dados">
      <thead>
        <tr>
          <th>Ordem</th>
          <th>Descrição</th>
          <th>Foto</th>
        </tr>
      </thead>
      <tbody>
        ${linhasDispositivosSecurity}
      </tbody>
    </table>
  </div>
  ` : ''}

  <!-- ANÁLISE DE RISCOS -->
  ${laudo.perigos?.length > 0 ? `
  <div class="page">
    <h2>5.5 Análise de Riscos - Metodologia HRN</h2>
    <p style="font-size: 9pt; margin-bottom: 10px;"><strong>Legenda:</strong> LO = Probabilidade | FE = Frequência | DPH = Duração | NP = Nº Pessoas | HRN = Resultado</p>

    <table class="dados" style="font-size: 9pt;">
      <thead>
        <tr>
          <th>Nº</th>
          <th>ID</th>
          <th>Descrição do Perigo</th>
          <th colspan="4" style="text-align: center;">HRN ANTES</th>
          <th>Medidas</th>
          <th colspan="4" style="text-align: center;">HRN DEPOIS</th>
          <th>Melhoria</th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th>LO</th>
          <th>FE</th>
          <th>DPH</th>
          <th>NP</th>
          <th>HRN</th>
          <th></th>
          <th>LO</th>
          <th>FE</th>
          <th>DPH</th>
          <th>NP</th>
          <th>HRN</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${linhasRiscos}
      </tbody>
    </table>
  </div>
  ` : ''}

  <!-- CONCLUSÃO -->
  <div class="page">
    <h2>12. CONCLUSÃO</h2>

    <div class="caixa-info">
      <p><strong>Tipo de Conclusão:</strong> ${laudo.tipoConclusao === 'A' ? 'Tipo A - Pré-adequação' : 'Tipo B - Aprovado'}</p>
    </div>

    ${laudo.numeroArt ? `
    <p style="margin-top: 15px;"><strong>Número da ART:</strong> ${laudo.numeroArt}</p>
    ` : ''}

    <p style="margin-top: 15px; text-align: justify;">
      Com base na análise técnica realizada conforme metodologia HRN e requisitos da NR-12, o equipamento ${laudo.tipoConclusao === 'A' ? 'apresenta não conformidades que devem ser corrigidas antes de sua operação industrial' : 'apresenta-se em conformidade com os requisitos de segurança da Norma Regulamentadora NR-12'}.
    </p>
  </div>

  <!-- RESPONSÁVEL TÉCNICO -->
  <div class="page">
    <h2>13. RESPONSÁVEL TÉCNICO</h2>

    <div class="assinatura">
      <div class="assinatura-linha">
        <p style="border-top: 1px solid #333; margin-top: 40px;">Bruno C.</p>
        <p style="font-size: 9pt;">Engenheiro de Segurança do Trabalho</p>
        <p style="font-size: 9pt;">CREA-SC: 128.716-3</p>
      </div>
    </div>

    <footer>
      <p style="margin-top: 30px;"><strong>EletriSeg Engenharia LTDA</strong></p>
      <p>CREA-SC: 128.716-3 | Engenharia Elétrica e de Segurança do Trabalho</p>
      <p>Laudo Técnico NR-12 | ${new Date().getFullYear()}</p>
    </footer>
  </div>
</body>
</html>
  `
}
