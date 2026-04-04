import { LOGO_BASE64 } from './logo-base64'

export interface CertificadoData {
  numero: string
  nome: string
  cpf: string
  empresa: string
  cnpj: string
  data: string
  cargaHoraria: string
  livro: string
  folha: string
}

export function gerarCertificadoHTML(data: CertificadoData): string {
  const logoImg = LOGO_BASE64
    ? `<img src="data:image/png;base64,${LOGO_BASE64}" alt="EletriSeg" style="height:70px;" />`
    : `<span style="font-size:28px;font-weight:bold;color:#4a9b9e;">Eletri<span style="color:#505050;">Seg</span></span>`

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Certificado N° ${data.numero} - ${data.nome}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    @page {
      size: A4 landscape;
      margin: 0;
    }

    body {
      font-family: Arial, sans-serif;
      background: #fff;
      width: 297mm;
      height: 210mm;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .certificado {
      width: 277mm;
      height: 190mm;
      border: 4px solid #4a9b9e;
      border-radius: 8px;
      padding: 14mm 16mm;
      display: flex;
      flex-direction: column;
      position: relative;
      background: #fff;
    }

    .borda-interna {
      position: absolute;
      inset: 5px;
      border: 1.5px solid #4a9b9e;
      border-radius: 5px;
      pointer-events: none;
    }

    /* TOPO */
    .topo {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 6mm;
      border-bottom: 2px solid #4a9b9e;
      padding-bottom: 5mm;
    }

    .topo-logo { display: flex; align-items: center; }

    .topo-titulo {
      text-align: center;
      flex: 1;
    }

    .titulo-certificado {
      font-size: 26pt;
      font-weight: bold;
      letter-spacing: 6px;
      color: #1a1a1a;
      text-transform: uppercase;
    }

    .numero-certificado {
      font-size: 11pt;
      color: #555;
      margin-top: 2px;
      letter-spacing: 2px;
    }

    .topo-nr12 {
      text-align: right;
      font-size: 28pt;
      font-weight: bold;
      color: #4a9b9e;
      line-height: 1;
    }

    .topo-nr12 span {
      display: block;
      font-size: 9pt;
      font-weight: normal;
      color: #777;
      letter-spacing: 1px;
    }

    /* CORPO */
    .corpo {
      display: flex;
      gap: 8mm;
      flex: 1;
    }

    .coluna-principal {
      flex: 1.6;
      display: flex;
      flex-direction: column;
      gap: 4mm;
    }

    .texto-principal {
      font-size: 10.5pt;
      color: #222;
      line-height: 1.65;
      text-align: justify;
    }

    .texto-principal strong {
      color: #1a1a1a;
    }

    .data-local {
      font-size: 10pt;
      color: #444;
      margin-top: 2mm;
    }

    .assinaturas {
      display: flex;
      gap: 10mm;
      margin-top: 4mm;
    }

    .assinatura {
      flex: 1;
    }

    .linha-assinatura {
      border-bottom: 1.5px solid #333;
      margin-bottom: 3px;
      width: 100%;
    }

    .assinatura-nome {
      font-size: 9.5pt;
      font-weight: bold;
      color: #1a1a1a;
    }

    .assinatura-detalhe {
      font-size: 8.5pt;
      color: #555;
    }

    /* COLUNA LATERAL — CONTEÚDO PROGRAMÁTICO */
    .coluna-lateral {
      flex: 1;
      border-left: 2px solid #4a9b9e;
      padding-left: 6mm;
      display: flex;
      flex-direction: column;
    }

    .lateral-titulo {
      font-size: 8pt;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #4a9b9e;
      margin-bottom: 3mm;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 2mm;
    }

    .lateral-item {
      font-size: 7.5pt;
      color: #444;
      line-height: 1.5;
      padding: 1px 0;
    }

    .lateral-item::before {
      content: "▸ ";
      color: #4a9b9e;
    }

    /* RODAPÉ */
    .rodape {
      border-top: 1.5px solid #e0e0e0;
      padding-top: 3mm;
      margin-top: 3mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .rodape-texto {
      font-size: 8pt;
      color: #888;
    }

    .rodape-livro {
      font-size: 8.5pt;
      color: #555;
      font-weight: bold;
    }

    @media print {
      body { margin: 0; }
      .certificado { page-break-after: always; }
    }
  </style>
</head>
<body>
  <div class="certificado">
    <div class="borda-interna"></div>

    <!-- TOPO -->
    <div class="topo">
      <div class="topo-logo">${logoImg}</div>
      <div class="topo-titulo">
        <div class="titulo-certificado">Certificado</div>
        <div class="numero-certificado">N° ${data.numero}</div>
      </div>
      <div class="topo-nr12">
        NR-12
        <span>Máquinas e<br>Equipamentos</span>
      </div>
    </div>

    <!-- CORPO -->
    <div class="corpo">

      <!-- COLUNA PRINCIPAL -->
      <div class="coluna-principal">
        <p class="texto-principal">
          Certificamos que <strong>${data.nome}</strong> concluiu com aproveitamento satisfatório
          o <strong>"Treinamento teórico e prático de NR-12, Máquinas e Equipamentos"</strong>
          com carga horária de <strong>${data.cargaHoraria} horas</strong> em conformidade com a referida norma,
          realizado no dia <strong>${data.data}</strong> para a empresa
          <strong>${data.empresa}</strong> com CNPJ n° <strong>${data.cnpj}</strong>.
        </p>

        <p class="data-local">Joinville, ${data.data}.</p>

        <div class="assinaturas">
          <div class="assinatura">
            <div class="linha-assinatura"></div>
            <div class="assinatura-nome">${data.nome}</div>
            <div class="assinatura-detalhe">CPF n° ${data.cpf}</div>
          </div>
          <div class="assinatura">
            <div class="linha-assinatura"></div>
            <div class="assinatura-nome">Bruno Cardoso</div>
            <div class="assinatura-detalhe">Engenheiro Eletricista</div>
            <div class="assinatura-detalhe">Eng. de Segurança do Trabalho</div>
            <div class="assinatura-detalhe">CREA-SC 108.955-2</div>
          </div>
        </div>
      </div>

      <!-- COLUNA LATERAL — CONTEÚDO PROGRAMÁTICO -->
      <div class="coluna-lateral">
        <div class="lateral-titulo">Conteúdo Programático</div>
        <div class="lateral-item">NR-12: Teoria e prática de máquinas e equipamentos</div>
        <div class="lateral-item">ABNT NB 033 – Cuidados com ferramentas abrasivas</div>
        <div class="lateral-item">ABNT NBR 13543 – Movimentações de carga, laços de cabos</div>
        <div class="lateral-item">ABNT NBR 13758 – Distâncias seguras à zona de perigo</div>
        <div class="lateral-item">ABNT NBR 13929 – Segurança de intertravamentos</div>
        <div class="lateral-item">ABNT NBR NM 272 – Proteções fixas e móveis</div>
        <div class="lateral-item">NR-35 – Trabalho em altura</div>
        <div class="lateral-item">NR-6 – Equipamentos de proteção individual</div>
        <div class="lateral-item">NR-10 – Segurança em eletricidade</div>
        <div class="lateral-item">NR-12 – Máquinas e equipamentos</div>
        <div class="lateral-item">NR-18 – Construção civil</div>
        <div class="lateral-item">Análise de risco e condições impeditivas</div>
        <div class="lateral-item">Equipamentos de proteção coletiva</div>
        <div class="lateral-item">Acidentes típicos com máquinas e equipamentos</div>
        <div class="lateral-item">Práticas nos equipamentos manuais e checklist</div>
        <div class="lateral-item">Condutas em situações de emergência e primeiros socorros</div>
      </div>
    </div>

    <!-- RODAPÉ -->
    <div class="rodape">
      <div class="rodape-texto">EletriSeg Engenharia LTDA — Joinville, SC</div>
      <div class="rodape-livro">Livro: ${data.livro.padStart(2, '0')} &nbsp;|&nbsp; Folha: ${data.folha}</div>
    </div>
  </div>
</body>
</html>`
}
