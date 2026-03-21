// Presets de dados padrao para cada tipo de laudo
// Esses dados sao pre-preenchidos no formulario quando o tipo e selecionado

export interface LaudoPreset {
  nomeMaquina: string
  descricaoFuncao: string
  usoPretendido: string
  modoOperacao: string
  dispositivosPadrao: Array<{ descricao: string }>
  perigosPadrao: Array<{
    cicloVida: string
    numeroPerigo: string
    tarefa: string
    descricaoPerigo: string
    loAntes: number
    feAntes: number
    dphAntes: number
    npAntes: number
    hrnAntes: number
    loDepois: number
    feDepois: number
    dphDepois: number
    npDepois: number
    hrnDepois: number
    medidasEngenharia: string
  }>
}

export const LAUDO_PRESETS: Record<string, LaudoPreset> = {
  'centro-dobra': {
    nomeMaquina: 'CNC Panel Bender',
    descricaoFuncao:
      'A CNC Panel Bender FB A-2030 é uma máquina industrial destinada à dobra e conformação automatizada de chapas metálicas, utilizada na fabricação de painéis, caixas, gabinetes e componentes metálicos conformados, conforme requisitos dimensionais definidos em projeto.\n\n' +
      'A máquina opera por meio de sistemas eletromecânicos e servoacionados, controlados por Controle Numérico Computadorizado (CNC), responsáveis pela movimentação coordenada das ferramentas de dobra e dos dispositivos de posicionamento e fixação da chapa. O processo de conformação ocorre de forma programada, repetitiva e controlada, permitindo a execução de dobras sequenciais e multidirecionais, sem a necessidade de reposicionamento manual da peça durante o ciclo automático.\n\n' +
      'Os parâmetros operacionais, tais como sequência de dobras, ângulos, posições e dimensões finais, são definidos previamente pelo operador a partir de desenhos técnicos ou arquivos digitais, sendo executados automaticamente pelo sistema CNC, garantindo precisão, repetibilidade e padronização do processo produtivo.\n\n' +
      'O abastecimento das chapas é realizado de forma manual ou por sistemas auxiliares de automação, com posicionamento na área de trabalho da máquina. O operador atua a partir de estação de comando e supervisão, localizada na parte frontal do equipamento, onde realiza a programação, o acionamento e o acompanhamento do processo, permanecendo fora da zona de risco durante o ciclo automático, conforme requisitos de segurança da NR-12.\n\n' +
      'A máquina é destinada ao uso industrial contínuo e controlado, sendo amplamente aplicada nos setores metalúrgico, elétrico, eletrônico, moveleiro e automotivo, integrando linhas de produção que exigem eficiência operacional, qualidade dimensional e segurança no processo de dobra de chapas metálicas.',
    usoPretendido:
      'Realizar a dobra de chapas de aço de maneira automatizada através de processo com programação.',
    modoOperacao:
      'A CNC Panel Bender FBE-2520 opera de forma automatizada por sistema CNC, no qual o operador seleciona e programa o ciclo de dobra a partir da estação de comando, localizada fora da zona de risco. A chapa metálica é posicionada manualmente ou por sistema auxiliar de automação e, após o acionamento do ciclo, é fixada automaticamente pela máquina.\n\n' +
      'As dobras são executadas de forma sequencial e controlada, sem necessidade de intervenção manual durante o processo. O operador acompanha a operação pela interface CNC, podendo interromper o ciclo por meio dos dispositivos de comando ou parada de emergência, quando necessário.\n\n' +
      'Após a conclusão do ciclo, a máquina retorna à posição segura para liberação e retirada da peça. As atividades de ajuste, setup e manutenção são realizadas apenas com o equipamento em condição segura, conforme os requisitos da NR-12.',
    dispositivosPadrao: [
      {
        descricao:
          'De acordo com o item 12.56 da Norma Regulamentadora NR-12, a máquina deve possuir um ou mais dispositivos de parada de emergência, que possibilitem a interrupção imediata e segura de seu funcionamento em situações de risco. Acionamento de emergência no posto de operação fixo da parte frontal do equipamento - IHM. Botão de emergência está sendo monitorado por dispositivo de segurança – relé de segurança.',
      },
      {
        descricao:
          'De acordo com os requisitos da NR-12, especialmente nos itens 12.38 a 12.41, todas as proteções móveis de máquinas e equipamentos que permitam o acesso à zona de risco devem ser dotadas de dispositivos de intertravamento que garantam a interrupção automática dos movimentos perigosos quando houver abertura das proteções. A máquina está equipada com sensores de intertravamento instalados em todas as portas de acesso as áreas de risco da máquina e que são móveis. Os sensores utilizados apresentam instalação adequada e fixação segura, conforme previsto na norma ABNT NBR ISO 14119, garantindo que o acionamento ou o desligamento do circuito de segurança ocorra de forma confiável. O sistema de intertravamento é integrado ao circuito de comando da máquina, de modo que qualquer violação ou abertura não autorizada das proteções interrompe imediatamente o funcionamento. Além disso, o sistema de intertravamento atende aos critérios de categoria de segurança e nível de performance (PL "d" ou superior) estabelecidos pela norma ABNT NBR ISO 13849-1, conforme exigido pela NR-12, assegurando a confiabilidade do sistema de parada e a proteção dos operadores. Monitoramento da porta frontal através de sensor magnético monitorado por relé de segurança.',
      },
      {
        descricao:
          'De acordo com os requisitos da NR-12, especialmente nos itens 12.38 a 12.41, todas as proteções móveis de máquinas e equipamentos que permitam o acesso à zona de risco devem ser dotadas de dispositivos de intertravamento que garantam a interrupção automática dos movimentos perigosos quando houver abertura das proteções. A porta que foi destacada está sem o dispositivo de intertravamento, o mesmo deverá ser instalado ou então fazer com que esta porta de acesso se torne proteção fixa, colocando parafusos de fixação.',
      },
      {
        descricao:
          'De acordo com os itens 12.111 e 12.112 da Norma Regulamentadora NR-12, as máquinas devem dispor de sistemas de indicação e sinalização que permitam ao operador identificar claramente o estado de funcionamento do equipamento, contribuindo para a prevenção de acidentes e para a tomada de decisões seguras durante a operação. A máquina possui indicadores luminosos instalados em posição de fácil visualização, que informam o status operacional da máquina, tais como: equipamento ligado, em operação, parado, em alarme ou condição de falha. Esses dispositivos atendem ao requisito da norma, ao fornecerem sinalização clara, contínua e de rápida interpretação, alinhada com as condições de risco presentes no processo. Conforme o item 12.112, os sistemas de indicação são integrados ao CLP do equipamento, assegurando que os sinais luminosos correspondam fielmente às condições reais de operação, contribuindo para o monitoramento seguro e reduzindo a probabilidade de erro humano.',
      },
      {
        descricao:
          'De acordo com os itens 12.5, 12.6 e 12.14 da Norma Regulamentadora NR-12, todas as máquinas e equipamentos devem possuir sinalização de segurança visível e permanentemente afixada, alertando sobre riscos existentes, instruções de operação segura e orientações de emergência. A máquina possui adesivos de sinalização de segurança distribuídos em pontos estratégicos, indicando riscos específicos como: partes móveis, risco de queimadura, radiação laser, necessidade de uso de EPIs e restrições de acesso. Conforme o item 12.14, as sinalizações devem ser claras, de fácil compreensão e permanecer legíveis durante toda a vida útil da máquina. Os adesivos instalados atendem a essa exigência, sendo produzidos em material resistente ao desgaste e posicionados de forma a garantir sua visualização antes da exposição ao risco. Os pictogramas permitem que operadores e demais trabalhadores identifiquem rapidamente as situações perigosas e adotem condutas preventivas, contribuindo diretamente para a redução de acidentes.',
      },
      {
        descricao:
          'De acordo com o item 12.38 da Norma Regulamentadora NR-12, dispositivos de segurança utilizados para interromper movimentos perigosos devem ser capazes de atuar de forma automática e imediata quando houver violação da zona de detecção. As barreiras de luz são reconhecidas pela norma como dispositivos de segurança adequados para proteção de áreas de risco com acesso frequente. Conforme o item 12.39, esses dispositivos devem ser selecionados e instalados de acordo com o nível de performance requerido (PLr) e compatíveis com o risco da aplicação, integrados ao sistema de comando de forma que, quando interrompidos, promovam a parada segura do movimento perigoso. A máquina não conta com barreiras de luz instaladas nas áreas de acesso ao campo de dobra, cuja função é impedir a aproximação do operador durante o funcionamento. Sugerimos a instalação de barreiras de luz para evitar o acesso do operador a área de prensagem e dobra.',
      },
      {
        descricao:
          'De acordo com os requisitos estabelecidos na NR-12, especialmente nos itens 12.38 a 12.55, todas as partes móveis de máquinas que apresentem riscos de esmagamento, cisalhamento, impacto ou aprisionamento devem ser dotadas de proteções que impeçam o acesso às zonas de perigo durante a operação. A CNC Panel Bender possui proteções fixas e enclausuramentos perimetrais ao redor das áreas de movimentação dos sistemas de dobra, alimentação e acionamentos eletromecânicos, confeccionados em estruturas metálicas e painéis de proteção, rigidamente fixados à estrutura da máquina. Essas proteções não permitem remoção ou abertura sem o uso de ferramentas, impedindo o acesso às partes móveis e componentes internos durante o funcionamento automático do equipamento. Adicionalmente, o equipamento conta com dispositivos de proteção intertravados e/ou sistemas optoeletrônicos, quando aplicável, que interrompem o ciclo de operação em caso de acesso indevido à zona de risco, garantindo a segurança do operador e de terceiros durante o processo produtivo. As dimensões, posicionamento e aberturas das proteções atendem aos critérios de distância de segurança e limites máximos de abertura estabelecidos pelas normas ABNT NBR ISO 13857 e NR-12, assegurando que não haja possibilidade de contato acidental com partes perigosas da máquina durante sua operação normal.',
      },
      {
        descricao:
          'De acordo com a NR-12, especialmente nos itens 12.26, 12.27 e 12.28, todas as partes metálicas não energizadas de máquinas e equipamentos que possam se tornar condutoras em caso de falha de isolamento devem ser aterradas eletricamente, de modo a garantir a proteção contra choques elétricos e o correto escoamento de correntes de fuga. A máquina possui sistema de aterramento elétrico devidamente instalado, com conexão entre o barramento de proteção (PE) e a estrutura metálica do equipamento. O ponto de aterramento está identificado por símbolo padronizado e fixado de forma permanente, assegurando o contato elétrico eficiente e contínuo.',
      },
      {
        descricao:
          'De acordo com o disposto na Norma Regulamentadora NR-12, os sistemas de comando relacionados à segurança devem atender aos princípios de prevenção de falhas, redundância e monitoramento contínuo. Conforme o item 12.38, qualquer parte do sistema de comando utilizada para fins de segurança — como as barreiras de luz — deve seguir normas técnicas reconhecidas e manter desempenho seguro mesmo em condições de falha previsível. O item 12.39 estabelece que os sistemas de segurança devem ser projetados de maneira que falhas ou defeitos não resultem na perda da função de segurança. Para esse fim, o relé de segurança é implementado para realizar o monitoramento redundante e seguro das barreiras de luz, garantindo o bloqueio imediato da máquina ao detectar a interrupção do feixe ou qualquer anomalia nos canais. Ainda, o item 12.40 determina que o sistema impeça o rearme automático da máquina após a atuação de um dispositivo de segurança. Assim, o relé de segurança, dedicado exclusivamente às barreiras de luz, exige reset manual seguro após a obstrução do feixe, evitando religamento involuntário do equipamento. Dessa forma, o relé de segurança cumpre integralmente as funções previstas na NR-12 ao supervisionar exclusivamente as barreiras de luz, assegurando que qualquer violação da zona de risco resulte na interrupção segura e imediata das funções perigosas da máquina.',
      },
      {
        descricao:
          'De acordo com a NR-12, especialmente nos itens 12.24 a 12.31, os sistemas elétricos das máquinas devem ser projetados de forma a eliminar ou reduzir os riscos elétricos, utilizando-se, sempre que possível, tensões de segurança em circuitos de comando, sinalização e controle. A máquina possui uma fonte de alimentação de extra-baixa tensão (SELV/PELV) destinada à alimentação dos circuitos de comando, botoeiras, sensores e dispositivos de intertravamento. Essa fonte realiza a redução da tensão de alimentação principal (trifásica) para níveis de 24 Vcc, garantindo maior segurança ao operador e à integridade dos componentes elétricos.',
      },
      {
        descricao:
          'De acordo com o disposto no item 12.25 da Norma Regulamentadora NR-12, as máquinas e equipamentos devem possuir dispositivo de seccionamento de energia elétrica, com possibilidade de bloqueio (travamento), de forma a garantir que não haja reenergização acidental durante intervenções de manutenção, limpeza, ajuste ou inspeção. Chave seccionadora com dispositivo passível de trava no painel principal do equipamento.',
      },
      {
        descricao:
          'De acordo com o item 12.40 da NR-12, o sistema de segurança da máquina não pode permitir rearme automático, exigindo um reset manual seguro após a atuação de qualquer dispositivo de proteção. O botão de reset garante que o religamento só ocorra mediante ação consciente do operador, após verificação de que não há pessoas na zona de risco. Conforme os itens 12.38 e 12.39, o botão de reset deve fazer parte do sistema de comando seguro, supervisionado pelo CLP de segurança ou relé de segurança, evitando religamento em condições inseguras e assegurando que falhas previsíveis não comprometam a função de segurança. Reset manual, realizado diretamente no IHM e nas mesas de controle aonde o operador estará monitorando todo o processo.',
      },
    ],
    perigosPadrao: [],
  },

  dobradeira: {
    nomeMaquina: 'Dobradeira CNC',
    descricaoFuncao:
      'A dobradeira tem como função principal executar dobras precisas em chapas metálicas por meio da aplicação de força controlada entre um punção (superior) e uma matriz (inferior).\n\n' +
      'Durante o processo, a chapa é posicionada manualmente pelo operador sobre a matriz, e o sistema de comando realiza a movimentação do punção, aplicando pressão até que a chapa atinja o ângulo de dobra programado.\n\n' +
      'O equipamento permite ajustes de curso, pressão e posicionamento do batente traseiro, possibilitando a execução de dobras simples ou múltiplas em diferentes ângulos e dimensões, de acordo com o tipo de peça e o projeto especificado.\n\n' +
      'Por ser controlada por sistema CNC, a dobradeira garante alta precisão, repetibilidade e produtividade, sendo amplamente utilizada em processos de fabricação de componentes metálicos, estruturas, painéis e peças industriais que demandam conformação de chapas com qualidade e uniformidade.',
    usoPretendido:
      'Realizar a dobra de chapas metálicas de maneira automatizada através de ferramentas, utilizando ajustes manuais.',
    modoOperacao:
      'O equipamento realiza o processo de dobra de chapas metálicas com abastecimento manual e ciclo automático controlado eletronicamente. O operador realiza a alimentação do material pela parte frontal, posicionando a peça com o auxílio de batentes e gabaritos ajustáveis, garantindo precisão e repetibilidade durante o processo.\n\n' +
      'A movimentação do punção e da mesa é feita de forma automática e controlada pelo sistema CNC Yawei, que monitora os parâmetros de velocidade, curso e pressão de trabalho, assegurando a qualidade da dobra e a segurança operacional.\n\n' +
      'O equipamento é dotado de sensores e chaves de segurança que interrompem o ciclo em caso de qualquer irregularidade. O operador tem acesso aos acionamentos bimanual, painel de controle touchscreen e botões de emergência estrategicamente posicionados na parte frontal e lateral da máquina, permitindo a interrupção imediata do ciclo sempre que necessário.',
    dispositivosPadrao: [
      {
        descricao:
          'De acordo com o item 12.56 da Norma Regulamentadora NR-12, a máquina deve possuir um ou mais dispositivos de parada de emergência, que possibilitem a interrupção imediata e segura de seu funcionamento em situações de risco. Acionamento de emergência no pedestal de operação do equipamento.',
      },
      {
        descricao:
          'De acordo com os requisitos de segurança previstos na NR-12, os dispositivos de comando bimanuais ou por pedal devem ser projetados e instalados de forma a evitar acionamentos involuntários e garantir a segurança do operador durante o ciclo de trabalho. A máquina é equipada com pedal de acionamento elétrico, responsável por iniciar o ciclo de dobra da máquina. Esse pedal é do tipo momentâneo, ou seja, o ciclo somente ocorre enquanto o operador mantém o pedal pressionado, interrompendo imediatamente a operação ao ser liberado.',
      },
      {
        descricao:
          'De acordo com os requisitos da NR-12, especialmente nos itens que tratam dos sistemas de segurança e dispositivos de detecção de presença (itens 12.38, 12.39 e 12.40), as máquinas que apresentam risco de esmagamento, impacto ou corte devem possuir sistemas de proteção que impeçam a exposição do operador à zona de perigo durante o ciclo de trabalho. A máquina é equipada com um Sistema a laser com região de controle Fiessler Elektronik AKAS-LC II e AKAS-LC II F. Sistema de proteção da Fiessler Elektronik — possui categoria de segurança 4.',
      },
      {
        descricao:
          'De acordo com os requisitos estabelecidos na NR-12, especialmente nos itens 12.38 a 12.55, todas as partes móveis de máquinas que ofereçam risco de esmagamento, corte, impacto ou aprisionamento devem possuir proteções fixas ou móveis que impedem o acesso do operador ou de terceiros à zona de perigo. A máquina possui proteções fixas laterais confeccionadas em chapas metálicas perfuradas, rigidamente fixadas à estrutura da máquina, sem possibilidade de remoção ou abertura sem o uso de ferramentas. Essas proteções têm a função de impedir o acesso às partes móveis e componentes internos durante o funcionamento, como o conjunto hidráulico e mecanismos de movimentação do eixo do punção. As dimensões e o posicionamento das proteções estão de acordo com os parâmetros de distância de segurança e aberturas máximas permitidas definidos nas normas técnicas ABNT NBR ISO 13857 e NR-12, garantindo que não haja risco de contato acidental com partes perigosas da máquina.',
      },
      {
        descricao:
          'De acordo com o item 12.56 da Norma Regulamentadora NR-12, a máquina deve possuir um ou mais dispositivos de parada de emergência, que possibilitem a interrupção imediata e segura de seu funcionamento em situações de risco. Possui botoeiras de emergência na parte superior das proteções fixas direita e esquerda com monitoramento por sistema Fiessler Elektronik.',
      },
      {
        descricao:
          'De acordo com os requisitos estabelecidos na NR-12, especialmente nos itens 12.38 a 12.55, todas as partes móveis de máquinas que ofereçam risco de esmagamento, corte, impacto ou aprisionamento devem possuir proteções fixas ou móveis que impedem o acesso do operador ou de terceiros à zona de perigo. A máquina possui proteção fixa traseira confeccionadas em chapas metálicas perfuradas, rigidamente fixadas à estrutura da máquina, sem possibilidade de remoção ou abertura sem o uso de ferramentas. Essas proteções têm a função de impedir o acesso às partes móveis e componentes internos durante o funcionamento, como o conjunto hidráulico e mecanismos de movimentação do eixo do punção. As dimensões e o posicionamento das proteções estão de acordo com os parâmetros de distância de segurança e aberturas máximas permitidas definidos nas normas técnicas ABNT NBR ISO 13857 e NR-12, garantindo que não haja risco de contato acidental com partes perigosas da máquina.',
      },
      {
        descricao:
          'De acordo com os requisitos da NR-12, especialmente nos itens 12.38 a 12.41, todas as proteções móveis de máquinas e equipamentos que permitam o acesso à zona de risco devem ser dotadas de dispositivos de intertravamento que garantam a interrupção automática dos movimentos perigosos quando houver abertura das proteções. A máquina está equipada com sensores de intertravamento instalados nas portas laterais e nas tampas de acesso às áreas internas da máquina. Os sensores utilizados apresentam instalação adequada e fixação segura, conforme previsto na norma ABNT NBR ISO 14119, garantindo que o acionamento ou o desligamento do circuito de segurança ocorra de forma confiável. O sistema de intertravamento é integrado ao circuito de comando da máquina, de modo que qualquer violação ou abertura não autorizada das proteções interrompe imediatamente o funcionamento. Além disso, o sistema de intertravamento atende aos critérios de categoria de segurança e nível de performance (PL "d" ou superior) estabelecidos pela norma ABNT NBR ISO 13849-1, conforme exigido pela NR-12, assegurando a confiabilidade do sistema de parada e a proteção dos operadores. Está sendo monitorado pelo Sistema Fiessler Elektronik.',
      },
      {
        descricao:
          'De acordo com os requisitos da NR-12, especialmente nos itens 12.38 a 12.41, todas as proteções móveis de máquinas e equipamentos que permitam o acesso à zona de risco devem ser dotadas de dispositivos de intertravamento que garantam a interrupção automática dos movimentos perigosos quando houver abertura das proteções. A máquina está equipada com sensores de intertravamento instalados na porta traseira. O sensor utilizado apresenta instalação adequada e fixação segura, conforme previsto na norma ABNT NBR ISO 14119, garantindo que o acionamento ou o desligamento do circuito de segurança ocorra de forma confiável. O sistema de intertravamento é integrado ao circuito de comando da máquina, de modo que qualquer violação ou abertura não autorizada das proteções interrompe imediatamente o funcionamento. Além disso, o sistema de intertravamento atende aos critérios de categoria de segurança e nível de performance (PL "d" ou superior) estabelecidos pela norma ABNT NBR ISO 13849-1, conforme exigido pela NR-12, assegurando a confiabilidade do sistema de parada e a proteção dos operadores. Está sendo monitorado pelo Sistema Fiessler Elektronik.',
      },
      {
        descricao:
          'De acordo com os requisitos estabelecidos na NR-12, especialmente nos itens 12.113 a 12.118, todas as máquinas e equipamentos devem possuir sinalização de segurança visível e durável, indicando riscos existentes, comandos de emergência e demais informações necessárias para a operação segura. A máquina apresenta adesivos de identificação de risco afixados em pontos estratégicos, como nas áreas próximas às partes móveis, nas portas de acesso e na região do conjunto de dobra. Esses adesivos têm a finalidade de alertar operadores e demais trabalhadores sobre riscos de esmagamento, corte, choque elétrico e aprisionamento, conforme a natureza do perigo associado a cada zona da máquina.',
      },
      {
        descricao:
          'De acordo com o item 12.56 da Norma Regulamentadora NR-12, a máquina deve possuir um ou mais dispositivos de parada de emergência, que possibilitem a interrupção imediata e segura de seu funcionamento em situações de risco. Acionamento de emergência no IHM no posto de operação.',
      },
      {
        descricao:
          'De acordo com o disposto no item 12.25 da Norma Regulamentadora NR-12, as máquinas e equipamentos devem possuir dispositivo de seccionamento de energia elétrica, com possibilidade de bloqueio (travamento), de forma a garantir que não haja reenergização acidental durante intervenções de manutenção, limpeza, ajuste ou inspeção. Chave seccionadora com dispositivo passível de trava no painel principal do equipamento.',
      },
      {
        descricao:
          'De acordo com a NR-12, especialmente nos itens 12.26, 12.27 e 12.28, todas as partes metálicas não energizadas de máquinas e equipamentos que possam se tornar condutoras em caso de falha de isolamento devem ser aterradas eletricamente, de modo a garantir a proteção contra choques elétricos e o correto escoamento de correntes de fuga. A máquina possui sistema de aterramento elétrico devidamente instalado, com conexão entre o barramento de proteção (PE) e a estrutura metálica do equipamento. O ponto de aterramento está identificado por símbolo padronizado e fixado de forma permanente, assegurando o contato elétrico eficiente e contínuo.',
      },
      {
        descricao:
          'De acordo com a NR-12, especialmente nos itens 12.24 a 12.31, os sistemas elétricos das máquinas devem ser projetados de forma a eliminar ou reduzir os riscos elétricos, utilizando-se, sempre que possível, tensões de segurança em circuitos de comando, sinalização e controle. A máquina possui uma fonte de alimentação de extra-baixa tensão (SELV/PELV) destinada à alimentação dos circuitos de comando, botoeiras, sensores e dispositivos de intertravamento. Essa fonte realiza a redução da tensão de alimentação principal (trifásica) para níveis de 24 Vcc, garantindo maior segurança ao operador e à integridade dos componentes elétricos.',
      },
    ],
    perigosPadrao: [
      {
        cicloVida: 'Operação / produção',
        numeroPerigo: '01',
        tarefa: 'Alimentação e dobra da chapa.',
        descricaoPerigo: 'Esmagamento entre o punção e a matriz',
        loAntes: 5,
        feAntes: 5,
        dphAntes: 4,
        npAntes: 1,
        hrnAntes: 100,
        loDepois: 0.033,
        feDepois: 5,
        dphDepois: 4,
        npDepois: 1,
        hrnDepois: 0.66,
        medidasEngenharia:
          'Instalação de cortina de luz AKAS-LC II F com zona de proteção ajustável e parada de emergência redundante.',
      },
      {
        cicloVida: 'Ajuste e Setup',
        numeroPerigo: '02',
        tarefa: 'Ajustes no ferramental',
        descricaoPerigo: 'Aprisionamento das mãos entre ferramentas',
        loAntes: 5,
        feAntes: 5,
        dphAntes: 4,
        npAntes: 1,
        hrnAntes: 100,
        loDepois: 0.033,
        feDepois: 5,
        dphDepois: 4,
        npDepois: 1,
        hrnDepois: 0.66,
        medidasEngenharia:
          'Instalação de cortina de luz AKAS-LC II F com zona de proteção ajustável e parada de emergência redundante. Acionamento apenas quando pressionado o pedal.',
      },
      {
        cicloVida: 'Limpeza e Manutenção',
        numeroPerigo: '03',
        tarefa:
          'Ao executar troca de componentes ou manutenção elétrica na máquina.',
        descricaoPerigo:
          'Choque devido ao contato com partes vivas sob condições de falha',
        loAntes: 5,
        feAntes: 1.5,
        dphAntes: 15,
        npAntes: 1,
        hrnAntes: 112.5,
        loDepois: 0.033,
        feDepois: 1.5,
        dphDepois: 15,
        npDepois: 1,
        hrnDepois: 0.7425,
        medidasEngenharia:
          'Chave seccionadora com trava, painel elétrico devidamente identificado e aterrado. Possui identificação dos riscos e acesso somente a pessoal autorizado.',
      },
      {
        cicloVida: 'Operação / Manutenção',
        numeroPerigo: '04',
        tarefa: 'Acesso às laterais.',
        descricaoPerigo: 'Contato com partes móveis internas',
        loAntes: 5,
        feAntes: 4,
        dphAntes: 4,
        npAntes: 1,
        hrnAntes: 80,
        loDepois: 0.033,
        feDepois: 4,
        dphDepois: 4,
        npDepois: 1,
        hrnDepois: 0.528,
        medidasEngenharia:
          'Instalação de sensores de intertravamento nas portas laterais, impedindo operação com portas abertas',
      },
      {
        cicloVida: 'Operação / Ajuste',
        numeroPerigo: '05',
        tarefa: 'Acionamento dos comandos',
        descricaoPerigo: 'Choque elétrico por comando energizado',
        loAntes: 5,
        feAntes: 4,
        dphAntes: 15,
        npAntes: 1,
        hrnAntes: 300,
        loDepois: 0.033,
        feDepois: 4,
        dphDepois: 15,
        npDepois: 1,
        hrnDepois: 1.98,
        medidasEngenharia:
          'Utilização de fonte SELV 24Vcc para circuitos de comando e interface homem-máquina.',
      },
      {
        cicloVida: 'Operação / Manutenção',
        numeroPerigo: '06',
        tarefa: 'Acesso ao painel e área de risco',
        descricaoPerigo: 'Ausência ou falha de sinalização',
        loAntes: 5,
        feAntes: 2.5,
        dphAntes: 4,
        npAntes: 1,
        hrnAntes: 50,
        loDepois: 0.033,
        feDepois: 2.5,
        dphDepois: 4,
        npDepois: 1,
        hrnDepois: 0.33,
        medidasEngenharia:
          'A fixação de adesivos de segurança conforme NR-12 e NBR ISO 3864-2 em todas as zonas de risco e comandos.',
      },
      {
        cicloVida: 'Operação',
        numeroPerigo: '07',
        tarefa:
          'Durante a operação do equipamento há acesso a zona de risco pela parte traseira.',
        descricaoPerigo: 'Perigo de esmagamento',
        loAntes: 5,
        feAntes: 2.5,
        dphAntes: 10,
        npAntes: 1,
        hrnAntes: 125,
        loDepois: 0.033,
        feDepois: 2.5,
        dphDepois: 10,
        npDepois: 1,
        hrnDepois: 0.825,
        medidasEngenharia:
          'Há proteção fixa com monitoramento através do sensor magnético em toda parte traseira do equipamento, há identificação dos riscos ao acessar a área traseira do equipamento.',
      },
    ],
  },

  'corte-laser': {
    nomeMaquina: 'Corte a Laser',
    descricaoFuncao:
      'A máquina de corte a laser é um equipamento industrial destinado ao corte, perfuração e gravação de alta precisão em materiais metálicos e não metálicos, por meio de um feixe de luz laser concentrado. O processo consiste na emissão de um feixe de radiação coerente e monocromática, gerado por uma fonte específica, o qual é direcionado e focalizado por um sistema óptico para atingir um ponto de elevada densidade de energia.\n\n' +
      'A energia térmica resultante provoca a fusão, vaporização ou combustão controlada do material, possibilitando a execução de cortes e geometrias complexas com tolerâncias reduzidas. O deslocamento do feixe é controlado por sistemas CNC (Controle Numérico Computadorizado), conforme desenhos técnicos previamente programados. O processo pode ser assistido por gases (oxigênio, nitrogênio ou ar comprimido), que atuam na expulsão do material fundido, na proteção da superfície e na melhoria da qualidade do corte.\n\n' +
      'O equipamento é amplamente utilizado na indústria metalúrgica, automotiva, moveleira, eletrônica e na fabricação de protótipos, permitindo elevada produtividade, repetibilidade e acabamento superior.\n\n' +
      'O abastecimento de chapas é realizado em uma área de espera com auxílio de um sistema de automação, um robô cartesiano retira a chapa e encaminha para a mesa anterior ao corte a laser. O operador possui uma estação de trabalho próximo a movimentação de chapa e outra estação de trabalho e comando na parte frontal do equipamento, onde programa as linhas de corte e acompanha o processo.',
    usoPretendido:
      'Realizar o corte de chapas de aço de maneira automatizada através de processo de corte a laser com programação.',
    modoOperacao:
      'O equipamento trabalha com ciclo automático, o abastecimento de chapas é feito com auxílio de equipamento na parte traseira em uma mesa de abastecimento, está mesa movimenta a chapa para o local de corte a laser e após finalizar movimenta a chapa para a mesa, o operador apenas retira as peças e sucatas. Os ciclos de movimentação são monitorados pelo operador que possui acesso aos acionamentos e controla a sequência de movimentação do robô cartesiano responsável pelo abastecimento e retirada de chapas do local de corte a laser.',
    dispositivosPadrao: [
      {
        descricao:
          'De acordo com o item 12.56 da Norma Regulamentadora NR-12, a máquina deve possuir um ou mais dispositivos de parada de emergência, que possibilitem a interrupção imediata e segura de seu funcionamento em situações de risco. Acionamento de emergência no posto de operação fixo da parte lateral (Mesa da máquina), mesa de controle da máquina. Botão de emergência está sendo monitorado por dispositivo de segurança – CLP.',
      },
      {
        descricao:
          'De acordo com o item 12.56 da Norma Regulamentadora NR-12, a máquina deve possuir um ou mais dispositivos de parada de emergência, que possibilitem a interrupção imediata e segura de seu funcionamento em situações de risco. Acionamento de emergência no posto de operação fixo da parte frontal do equipamento. Botão de emergência está sendo monitorado por dispositivo de segurança – CLP.',
      },
      {
        descricao:
          'De acordo com os requisitos da NR-12, especialmente nos itens 12.38 a 12.41, todas as proteções móveis de máquinas e equipamentos que permitam o acesso à zona de risco devem ser dotadas de dispositivos de intertravamento que garantam a interrupção automática dos movimentos perigosos quando houver abertura das proteções. A máquina está equipada com sensores de intertravamento instalados na porta frontal de acesso às áreas internas da máquina. Os sensores utilizados apresentam instalação adequada e fixação segura, conforme previsto na norma ABNT NBR ISO 14119, garantindo que o acionamento ou o desligamento do circuito de segurança ocorra de forma confiável. O sistema de intertravamento é integrado ao circuito de comando da máquina, de modo que qualquer violação ou abertura não autorizada das proteções interrompe imediatamente o funcionamento. Além disso, o sistema de intertravamento atende aos critérios de categoria de segurança e nível de performance (PL "d" ou superior) estabelecidos pela norma ABNT NBR ISO 13849-1, conforme exigido pela NR-12, assegurando a confiabilidade do sistema de parada e a proteção dos operadores. Monitoramento da porta frontal através de sensor magnético monitorado por dispositivo de segurança – CLP de segurança.',
      },
      {
        descricao:
          'De acordo com os itens 12.111 e 12.112 da Norma Regulamentadora NR-12, as máquinas devem dispor de sistemas de indicação e sinalização que permitam ao operador identificar claramente o estado de funcionamento do equipamento, contribuindo para a prevenção de acidentes e para a tomada de decisões seguras durante a operação. A máquina possui indicadores luminosos instalados em posição de fácil visualização, que informam o status operacional da máquina, tais como: equipamento ligado, em operação, parado, em alarme ou condição de falha. Esses dispositivos atendem ao requisito da norma, ao fornecerem sinalização clara, contínua e de rápida interpretação, alinhada com as condições de risco presentes no processo. Conforme o item 12.112, os sistemas de indicação são integrados ao CLP do equipamento, assegurando que os sinais luminosos correspondam fielmente às condições reais de operação, contribuindo para o monitoramento seguro e reduzindo a probabilidade de erro humano.',
      },
      {
        descricao:
          'De acordo com os itens 12.5, 12.6 e 12.14 da Norma Regulamentadora NR-12, todas as máquinas e equipamentos devem possuir sinalização de segurança visível e permanentemente afixada, alertando sobre riscos existentes, instruções de operação segura e orientações de emergência. A máquina possui adesivos de sinalização de segurança distribuídos em pontos estratégicos, indicando riscos específicos como: partes móveis, risco de queimadura, radiação laser, necessidade de uso de EPIs e restrições de acesso. Conforme o item 12.14, as sinalizações devem ser claras, de fácil compreensão e permanecer legíveis durante toda a vida útil da máquina. Os adesivos instalados atendem a essa exigência, sendo produzidos em material resistente ao desgaste e posicionados de forma a garantir sua visualização antes da exposição ao risco. Os pictogramas permitem que operadores e demais trabalhadores identifiquem rapidamente as situações perigosas e adotem condutas preventivas, contribuindo diretamente para a redução de acidentes.',
      },
      {
        descricao:
          'De acordo com o item 12.38 da Norma Regulamentadora NR-12, dispositivos de segurança utilizados para interromper movimentos perigosos devem ser capazes de atuar de forma automática e imediata quando houver violação da zona de detecção. As barreiras de luz são reconhecidas pela norma como dispositivos de segurança adequados para proteção de áreas de risco com acesso frequente. Conforme o item 12.39, esses dispositivos devem ser selecionados e instalados de acordo com o nível de performance requerido (PLr) e compatíveis com o risco da aplicação, integrados ao sistema de comando de forma que, quando interrompidos, promovam a parada segura do movimento perigoso. A máquina conta com barreiras de luz instaladas nas áreas de acesso ao campo de corte, cuja função é impedir a aproximação do operador durante o funcionamento do laser. Quando qualquer feixe da barreira é interrompido, ocorre a parada imediata do processo, atendendo à exigência de ação automática prevista na NR-12. O sistema está sendo monitorado por relé de segurança, garantindo a confiabilidade na detecção, monitoramento contínuo e resposta segura em caso de falha, conforme previsto no item 12.40, que trata da necessidade de diagnóstico e supervisão dos dispositivos de segurança.',
      },
      {
        descricao:
          'De acordo com a NR-12, especialmente nos itens 12.26, 12.27 e 12.28, todas as partes metálicas não energizadas de máquinas e equipamentos que possam se tornar condutoras em caso de falha de isolamento devem ser aterradas eletricamente, de modo a garantir a proteção contra choques elétricos e o correto escoamento de correntes de fuga. A máquina possui sistema de aterramento elétrico devidamente instalado, com conexão entre o barramento de proteção (PE) e a estrutura metálica do equipamento. O ponto de aterramento está identificado por símbolo padronizado e fixado de forma permanente, assegurando o contato elétrico eficiente e contínuo.',
      },
      {
        descricao:
          'De acordo com o disposto na Norma Regulamentadora NR-12, os sistemas de comando relacionados à segurança devem atender aos princípios de prevenção de falhas, redundância e monitoramento contínuo. Conforme o item 12.38, qualquer parte do sistema de comando utilizada para fins de segurança — como as barreiras de luz — deve seguir normas técnicas reconhecidas e manter desempenho seguro mesmo em condições de falha previsível. O item 12.39 estabelece que os sistemas de segurança devem ser projetados de maneira que falhas ou defeitos não resultem na perda da função de segurança. Para esse fim, o relé de segurança é implementado para realizar o monitoramento redundante e seguro das barreiras de luz, garantindo o bloqueio imediato da máquina ao detectar a interrupção do feixe ou qualquer anomalia nos canais. Ainda, o item 12.40 determina que o sistema impeça o rearme automático da máquina após a atuação de um dispositivo de segurança. Assim, o relé de segurança, dedicado exclusivamente às barreiras de luz, exige reset manual seguro após a obstrução do feixe, evitando religamento involuntário do equipamento. Dessa forma, o relé de segurança cumpre integralmente as funções previstas na NR-12 ao supervisionar exclusivamente as barreiras de luz, assegurando que qualquer violação da zona de risco resulte na interrupção segura e imediata das funções perigosas da máquina.',
      },
      {
        descricao:
          'Conforme estabelecido pela Norma Regulamentadora NR-12, os sistemas de comando relacionados à segurança devem ser projetados de modo a garantir desempenho seguro, confiável e resistente a falhas. O item 12.38 determina que todas as partes do sistema de comando utilizadas para proteção — incluindo o Controlador Lógico Programável de Segurança (CLP-S) — devem seguir normas técnicas reconhecidas, assegurando redundância, autodiagnóstico e detecção de falhas. O item 12.39 dispõe que os sistemas de segurança devem ser estruturados de forma a impedir que falhas previsíveis resultem na perda da função de segurança. Assim, o CLP de segurança executa monitoramento contínuo dos dispositivos conectados (como chaves, proteções intertravadas, botões, sensores e demais módulos), verificando coerência entre canais, integridade dos circuitos e o estado seguro das entradas. Além disso, o item 12.40 exige que o sistema de comando impeça o rearme automático após a atuação de qualquer dispositivo de segurança. O CLP-S cumpre esse requisito ao exigir reset manual seguro, garantindo que o equipamento só retorne à operação após verificação e restabelecimento das condições seguras. Dessa forma, o CLP de segurança, responsável pelo monitoramento dos demais dispositivos de proteção da máquina, atua como elemento central de controle seguro, assegurando que qualquer anomalia detectada resulte na interrupção imediata e segura das funções perigosas, atendendo integralmente aos requisitos da NR-12.',
      },
      {
        descricao:
          'De acordo com a NR-12, especialmente nos itens 12.24 a 12.31, os sistemas elétricos das máquinas devem ser projetados de forma a eliminar ou reduzir os riscos elétricos, utilizando-se, sempre que possível, tensões de segurança em circuitos de comando, sinalização e controle. A máquina possui uma fonte de alimentação de extra-baixa tensão (SELV/PELV) destinada à alimentação dos circuitos de comando, botoeiras, sensores e dispositivos de intertravamento. Essa fonte realiza a redução da tensão de alimentação principal (trifásica) para níveis de 24 Vcc, garantindo maior segurança ao operador e à integridade dos componentes elétricos.',
      },
      {
        descricao:
          'De acordo com o disposto no item 12.25 da Norma Regulamentadora NR-12, as máquinas e equipamentos devem possuir dispositivo de seccionamento de energia elétrica, com possibilidade de bloqueio (travamento), de forma a garantir que não haja reenergização acidental durante intervenções de manutenção, limpeza, ajuste ou inspeção. Chave seccionadora com dispositivo passível de trava no painel principal do equipamento.',
      },
      {
        descricao:
          'De acordo com o item 12.40 da NR-12, o sistema de segurança da máquina não pode permitir rearme automático, exigindo um reset manual seguro após a atuação de qualquer dispositivo de proteção. O botão de reset garante que o religamento só ocorra mediante ação consciente do operador, após verificação de que não há pessoas na zona de risco. Conforme os itens 12.38 e 12.39, o botão de reset deve fazer parte do sistema de comando seguro, supervisionado pelo CLP de segurança ou relé de segurança, evitando religamento em condições inseguras e assegurando que falhas previsíveis não comprometam a função de segurança. Reset manual, realizado diretamente no IHM e nas mesas de controle aonde o operador estará monitorando todo o processo.',
      },
      {
        descricao:
          'De acordo com o item 12.40 da NR-12, o sistema de segurança da máquina não pode permitir rearme automático, exigindo um reset manual seguro após a atuação de qualquer dispositivo de proteção. O botão de reset garante que o religamento só ocorra mediante ação consciente do operador, após verificação de que não há pessoas na zona de risco. Conforme os itens 12.38 e 12.39, o botão de reset deve fazer parte do sistema de comando seguro, supervisionado pelo CLP de segurança ou relé de segurança, evitando religamento em condições inseguras e assegurando que falhas previsíveis não comprometam a função de segurança. Reset manual, realizado diretamente na mesa de controle da mesa da máquina o operador estará monitorando todo o processo.',
      },
    ],
    perigosPadrao: [
      {
        cicloVida: 'Transporte / Instalação',
        numeroPerigo: '01',
        tarefa: 'Movimentação da máquina.',
        descricaoPerigo: 'Perigo de esmagamento',
        loAntes: 2,
        feAntes: 4,
        dphAntes: 8,
        npAntes: 1,
        hrnAntes: 64,
        loDepois: 0.033,
        feDepois: 4,
        dphDepois: 8,
        npDepois: 1,
        hrnDepois: 1.056,
        medidasEngenharia:
          'Monitoramento da entrada através de barreira de luz e acionamento de reset para movimentação da mesa de abastecimento, além de acionamento de emergência em mais de um local acessível por terceiros. Uso de talhas, cintas e afastamento da área.',
      },
      {
        cicloVida: 'Instalação',
        numeroPerigo: '02',
        tarefa: 'Conexão elétrica.',
        descricaoPerigo: 'Alta e baixa tensão',
        loAntes: 5,
        feAntes: 1.5,
        dphAntes: 15,
        npAntes: 1,
        hrnAntes: 112.5,
        loDepois: 0.033,
        feDepois: 1.5,
        dphDepois: 15,
        npDepois: 1,
        hrnDepois: 0.7425,
        medidasEngenharia:
          'Chave seccionadora com trava, painel elétrico devidamente identificado e aterrado. Possui identificação dos riscos e acesso somente a pessoal autorizado.',
      },
      {
        cicloVida: 'Instalação',
        numeroPerigo: '03',
        tarefa: 'Conexão de gases.',
        descricaoPerigo: 'Alta pressão',
        loAntes: 5,
        feAntes: 1.5,
        dphAntes: 10,
        npAntes: 1,
        hrnAntes: 75,
        loDepois: 0.033,
        feDepois: 1.5,
        dphDepois: 10,
        npDepois: 1,
        hrnDepois: 0.495,
        medidasEngenharia:
          'Válvulas certificadas e teste de estanqueidade.',
      },
      {
        cicloVida: 'Operação',
        numeroPerigo: '04',
        tarefa: 'Alimentar Chapa.',
        descricaoPerigo: 'Peso elevado',
        loAntes: 2,
        feAntes: 4,
        dphAntes: 8,
        npAntes: 1,
        hrnAntes: 64,
        loDepois: 0.033,
        feDepois: 4,
        dphDepois: 8,
        npDepois: 1,
        hrnDepois: 1.056,
        medidasEngenharia:
          'Monitoramento da entrada através de barreira de luz e acionamento de reset para movimentação da mesa de abastecimento, mesa de apoio, roletes e EPI.',
      },
      {
        cicloVida: 'Operação',
        numeroPerigo: '05',
        tarefa: 'Corte de chapas.',
        descricaoPerigo: 'Radiação laser classe 4',
        loAntes: 2,
        feAntes: 4,
        dphAntes: 8,
        npAntes: 1,
        hrnAntes: 64,
        loDepois: 0.033,
        feDepois: 4,
        dphDepois: 8,
        npDepois: 1,
        hrnDepois: 1.056,
        medidasEngenharia:
          'Porta de acesso frontal possui sensor magnético monitorado pelo sistema de segurança da máquina evitando que a máquina funcione com a porta aberta, barreira de luz e óculos.',
      },
      {
        cicloVida: 'Operação',
        numeroPerigo: '06',
        tarefa: 'Movimento do cabeçote.',
        descricaoPerigo: 'Movimento rápido',
        loAntes: 2,
        feAntes: 4,
        dphAntes: 8,
        npAntes: 1,
        hrnAntes: 64,
        loDepois: 0.033,
        feDepois: 4,
        dphDepois: 8,
        npDepois: 1,
        hrnDepois: 1.056,
        medidasEngenharia:
          'Porta de acesso frontal possui sensor magnético monitorado pelo sistema de segurança da máquina evitando que a máquina funcione com a porta aberta, barreira de luz e emergência.',
      },
      {
        cicloVida: 'Operação',
        numeroPerigo: '07',
        tarefa: 'Fumaça metálica.',
        descricaoPerigo: 'Vapores tóxicos',
        loAntes: 2,
        feAntes: 4,
        dphAntes: 8,
        npAntes: 1,
        hrnAntes: 64,
        loDepois: 0.033,
        feDepois: 4,
        dphDepois: 8,
        npDepois: 1,
        hrnDepois: 1.056,
        medidasEngenharia:
          'Porta de acesso frontal possui sensor magnético monitorado pelo sistema de segurança da máquina evitando que a máquina funcione com a porta aberta, exaustor e filtros.',
      },
      {
        cicloVida: 'Operação',
        numeroPerigo: '08',
        tarefa: 'Projeção de fagulhas',
        descricaoPerigo: 'Partículas incandescentes',
        loAntes: 5,
        feAntes: 5,
        dphAntes: 2,
        npAntes: 1,
        hrnAntes: 50,
        loDepois: 0.033,
        feDepois: 5,
        dphDepois: 2,
        npDepois: 1,
        hrnDepois: 0.33,
        medidasEngenharia:
          'Enclausuramento, Proteções laterais e EPI.',
      },
      {
        cicloVida: 'Limpeza e Manutenção',
        numeroPerigo: '09',
        tarefa:
          'Ao executar troca de componentes ou manutenção mecânica na máquina.',
        descricaoPerigo: 'Perigo de enroscar em elementos rotativos',
        loAntes: 5,
        feAntes: 1.5,
        dphAntes: 4,
        npAntes: 1,
        hrnAntes: 30,
        loDepois: 0.033,
        feDepois: 1.5,
        dphDepois: 4,
        npDepois: 1,
        hrnDepois: 0.198,
        medidasEngenharia:
          'Chave seccionadora com trava para isolar a fonte de energia perigosa e realizar bloqueio.',
      },
      {
        cicloVida: 'Limpeza e Manutenção',
        numeroPerigo: '10',
        tarefa:
          'Ao executar troca de componentes ou manutenção elétrica na máquina.',
        descricaoPerigo:
          'Choque devido ao contato com partes vivas sob condições de falha',
        loAntes: 5,
        feAntes: 1.5,
        dphAntes: 15,
        npAntes: 1,
        hrnAntes: 112.5,
        loDepois: 0.033,
        feDepois: 1.5,
        dphDepois: 15,
        npDepois: 1,
        hrnDepois: 0.7425,
        medidasEngenharia:
          'Chave seccionadora com trava, painel elétrico devidamente identificado e aterrado. Possui identificação dos riscos e acesso somente a pessoal autorizado.',
      },
      {
        cicloVida: 'Limpeza',
        numeroPerigo: '11',
        tarefa: 'Remoção de resíduos',
        descricaoPerigo: 'Cortes',
        loAntes: 10,
        feAntes: 2.5,
        dphAntes: 1.0,
        npAntes: 1,
        hrnAntes: 25,
        loDepois: 1,
        feDepois: 2.5,
        dphDepois: 1.0,
        npDepois: 1,
        hrnDepois: 2.5,
        medidasEngenharia:
          'Utilização de EPIs para manipular e limpar a máquina.',
      },
      {
        cicloVida: 'Alimentação',
        numeroPerigo: '12',
        tarefa: 'Movimentar Chapas',
        descricaoPerigo: 'Esforço físico',
        loAntes: 8,
        feAntes: 4,
        dphAntes: 12,
        npAntes: 1,
        hrnAntes: 384,
        loDepois: 0.033,
        feDepois: 4,
        dphDepois: 12,
        npDepois: 1,
        hrnDepois: 1.584,
        medidasEngenharia:
          'Utilização de equipamentos para auxiliar a movimentação (talhas, carrinhos, ponte rolante, empilhadeira. NR 17.',
      },
      {
        cicloVida: 'Descarte',
        numeroPerigo: '13',
        tarefa: 'Desmontagem',
        descricaoPerigo: 'Quedas',
        loAntes: 8,
        feAntes: 4,
        dphAntes: 2,
        npAntes: 1,
        hrnAntes: 64,
        loDepois: 0.033,
        feDepois: 4,
        dphDepois: 2,
        npDepois: 1,
        hrnDepois: 0.264,
        medidasEngenharia:
          'Utilização de equipamentos para auxiliar a movimentação (talhas, carrinhos, ponte rolante, empilhadeira. Planejamento de Içamento',
      },
    ],
  },

  'laser-tubo': {
    nomeMaquina: 'Corte a Laser Tubo',
    descricaoFuncao:
      'A máquina de corte a laser para tubos é um equipamento automatizado desenvolvido para realizar cortes de alta precisão em tubos metálicos e perfis de diferentes seções (circulares, quadrados, retangulares, ovais e especiais). Utiliza tecnologia de laser de fibra óptica, que proporciona feixe de alta intensidade concentrado, permitindo cortes limpos, rápidos e com mínima zona afetada pelo calor.\n\n' +
      'O sistema é composto por fonte de laser de alta potência, cabeçote de corte com ajuste automático de foco, mesa de suporte rotativa (chuck) para fixação e movimentação do tubo, além de sistemas CNC (Comando Numérico Computadorizado) que controlam a trajetória do feixe e garantem repetibilidade do processo.\n\n' +
      'A máquina possibilita cortes retos, chanfrados e contornos complexos, além de executar marcações e gravações superficiais quando necessário. O processo substitui métodos convencionais como serras e puncionamento, oferecendo maior produtividade, precisão dimensional, redução de desperdícios e acabamento superior, dispensando em muitos casos operações secundárias.\n\n' +
      'É amplamente aplicada em indústrias metalúrgicas, automobilísticas, aeroespaciais, de construção civil, fabricação de móveis metálicos e estruturas tubulares, onde a demanda por peças tubulares cortadas com alta qualidade e geometrias complexas é elevada.\n\n' +
      'O Abastecimento do equipamento é feito em uma área de espera na parte traseira do equipamento, onde o abastecimento é realizado de forma manual ou por ponte-rolante, desta forma existem barreiras de segurança na parte traseira do equipamento e um comando IHM para o procedimento de abastecimento. Existe uma estação de trabalho com comandos na parte traseira da máquina "Abastecimento" e uma estação de trabalho com comando na parte frontal da máquina "Operacional", assim o equipamento segui os comandos do operador para o processo produtivo e de carga e descarga do equipamento, a máquina trabalha sobre comandos CNC que atende o programa para o processo de corte.',
    usoPretendido:
      'Executar corte de tubos de aço com sistema automatizado através de processo do corte a laser com programação CNC.',
    modoOperacao:
      'O equipamento trabalha com ciclo automático, o abastecimento de tubos é feito manualmente na parte traseira de abastecimento, depois de carregado as cintas movimenta o tubo para o local de corte, onde o tubo é preso automaticamente por placas com garras que abrem e fecha, conforme o processo produtivo, em quanto o cabeçote laser corta, as placas trabalham em movimentos rotativos com os tubos. Os ciclos de movimentação são monitorados pelo operador que possui acesso aos acionamentos e controla a sequência de trabalho ele é responsável pelo abastecimento, as peças cortadas e sucatas saem da máquina armazenando em uma bandeja.',
    dispositivosPadrao: [
      {
        descricao:
          'De acordo com o item 12.56 da Norma Regulamentadora NR-12, a máquina deve possuir um ou mais dispositivos de parada de emergência, que possibilitem a interrupção imediata e segura de seu funcionamento em situações de risco. Acionamento de emergência no pedestal de operação do equipamento.',
      },
      {
        descricao:
          'De acordo com o item 12.56 da Norma Regulamentadora NR-12, a máquina deve possuir um ou mais dispositivos de parada de emergência, que possibilitem a interrupção imediata e segura de seu funcionamento em situações de risco. Acionamento de emergência no pedestal de operação do equipamento.',
      },
      {
        descricao:
          'Monitoramento da porta frontal através de sensor magnético monitorado por dispositivo de segurança – Relé de segurança.',
      },
      {
        descricao: 'Indicadores luminosos no equipamento.',
      },
      {
        descricao:
          'De acordo com os requisitos estabelecidos na NR-12, especialmente nos itens 12.113 a 12.118, todas as máquinas e equipamentos devem possuir sinalização de segurança visível e durável, indicando riscos existentes, comandos de emergência e demais informações necessárias para a operação segura. A máquina apresenta adesivos de identificação de risco afixados em pontos estratégicos, como nas áreas próximas às partes móveis, nas portas de acesso e na região do conjunto de dobra. Esses adesivos têm a finalidade de alertar operadores e demais trabalhadores sobre riscos de esmagamento, corte, choque elétrico e aprisionamento, conforme a natureza do perigo associado a cada zona da máquina.',
      },
      {
        descricao:
          'Proteção por dispositivo de segurança: barreira de luz, na parte de comando da mesa da máquina. Barreira de luz monitorada por relé de segurança (barreira de luz WEG).',
      },
      {
        descricao: 'Proteção fixa nos fundos da máquina.',
      },
      {
        descricao:
          'Proteção por dispositivo de segurança: barreira de luz, na parte dos fundos da máquina onde existe movimentação. Barreira de luz monitorada por relé de segurança (barreira de luz WEG).',
      },
      {
        descricao:
          'Proteção fixa em todos os acessos laterais e frontais onde pode ter acesso a máquina. Em locais onde é necessário a entrada de pessoas, proteção é pela cortina de luz.',
      },
      {
        descricao:
          'De acordo com a NR-12, especialmente nos itens 12.26, 12.27 e 12.28, todas as partes metálicas não energizadas de máquinas e equipamentos que possam se tornar condutoras em caso de falha de isolamento devem ser aterradas eletricamente, de modo a garantir a proteção contra choques elétricos e o correto escoamento de correntes de fuga. A máquina possui sistema de aterramento elétrico devidamente instalado, com conexão entre o barramento de proteção (PE) e a estrutura metálica do equipamento. O ponto de aterramento está identificado por símbolo padronizado e fixado de forma permanente, assegurando o contato elétrico eficiente e contínuo.',
      },
      {
        descricao:
          'Relés de segurança realizando o monitoramento e controlando Botões de emergência e sensor magnético da porta frontal.',
      },
      {
        descricao:
          'De acordo com o disposto no item 12.25 da Norma Regulamentadora NR-12, as máquinas e equipamentos devem possuir dispositivo de seccionamento de energia elétrica, com possibilidade de bloqueio (travamento), de forma a garantir que não haja reenergização acidental durante intervenções de manutenção, limpeza, ajuste ou inspeção. Chave seccionadora com dispositivo passível de trava no painel principal do equipamento.',
      },
      {
        descricao:
          'Reset manual, realizado diretamente no IHM e nas mesas de controle aonde o operador estará monitorando todo o processo.',
      },
      {
        descricao:
          'De acordo com a NR-12, especialmente nos itens 12.24 a 12.31, os sistemas elétricos das máquinas devem ser projetados de forma a eliminar ou reduzir os riscos elétricos, utilizando-se, sempre que possível, tensões de segurança em circuitos de comando, sinalização e controle. A máquina possui uma fonte de alimentação de extra-baixa tensão (SELV/PELV) destinada à alimentação dos circuitos de comando, botoeiras, sensores e dispositivos de intertravamento. Essa fonte realiza a redução da tensão de alimentação principal (trifásica) para níveis de 24 Vcc, garantindo maior segurança ao operador e à integridade dos componentes elétricos.',
      },
    ],
    perigosPadrao: [
      {
        cicloVida: 'Operação',
        numeroPerigo: '01',
        tarefa:
          'Ao realizar o abastecimento das chapas na parte traseira do equipamento com auxílio de equipamento.',
        descricaoPerigo: 'Perigo de esmagamento',
        loAntes: 2,
        feAntes: 4,
        dphAntes: 8,
        npAntes: 1,
        hrnAntes: 64,
        loDepois: 0.033,
        feDepois: 4,
        dphDepois: 8,
        npDepois: 1,
        hrnDepois: 1.056,
        medidasEngenharia:
          'Monitoramento da entrada através de barreira de luz e acionamento de reset para movimentação da mesa de abastecimento, além de acionamento de emergência em mais de um local acessível por terceiros.',
      },
      {
        cicloVida: 'Operação',
        numeroPerigo: '02',
        tarefa:
          'Manutenções, ajustes e outros que se façam necessários na máquina.',
        descricaoPerigo: 'Perigos de cortes e escoriações',
        loAntes: 2,
        feAntes: 4,
        dphAntes: 8,
        npAntes: 1,
        hrnAntes: 64,
        loDepois: 0.033,
        feDepois: 4,
        dphDepois: 8,
        npDepois: 1,
        hrnDepois: 1.056,
        medidasEngenharia:
          'Porta de acesso frontal possui sensor magnético monitorado pelo sistema de segurança da máquina evitando que a máquina funcione com a porta aberta.',
      },
      {
        cicloVida: 'Limpeza e Manutenção',
        numeroPerigo: '03',
        tarefa:
          'Ao executar troca de componentes ou manutenção elétrica na máquina.',
        descricaoPerigo:
          'Choque devido ao contato com partes vivas sob condições de falha',
        loAntes: 5,
        feAntes: 1.5,
        dphAntes: 15,
        npAntes: 1,
        hrnAntes: 112.5,
        loDepois: 0.033,
        feDepois: 1.5,
        dphDepois: 15,
        npDepois: 1,
        hrnDepois: 0.7425,
        medidasEngenharia:
          'Chave seccionadora com trava, painel elétrico devidamente identificado e aterrado. Possui identificação dos riscos e acesso somente a pessoal autorizado.',
      },
      {
        cicloVida: 'Limpeza e Manutenção',
        numeroPerigo: '04',
        tarefa:
          'Ao executar troca de componentes ou manutenção mecânica na máquina.',
        descricaoPerigo: 'Perigo de enroscar em elementos rotativos',
        loAntes: 5,
        feAntes: 1.5,
        dphAntes: 4,
        npAntes: 1,
        hrnAntes: 30,
        loDepois: 0.033,
        feDepois: 1.5,
        dphDepois: 4,
        npDepois: 1,
        hrnDepois: 0.198,
        medidasEngenharia:
          'Chave seccionadora com trava para isolar a fonte de energia perigosa e realizar bloqueio.',
      },
    ],
  },
}
