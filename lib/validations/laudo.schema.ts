import { z } from 'zod'

export const laudoSchema = z.object({
  // Capa
  numeroRevisao: z.string().default('00'),
  dataLaudoCapa: z.string(), // DD/MM/YYYY
  dataLaudoTexto: z.string(), // "fevereiro de 2026"

  // Empresa
  nomeEmpresa: z.string().min(1, 'Nome da empresa obrigatório'),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido'),
  endereco: z.string().min(1, 'Endereço obrigatório'),
  dataAbertura: z.string(), // DD/MM/YYYY
  atividadeEconomica: z.string().min(1, 'Atividade econômica obrigatória'),

  // Equipamento
  nomeMaquina: z.string().min(1, 'Nome da máquina obrigatório'),
  modelo: z.string().min(1, 'Modelo obrigatório'),
  numeroSerie: z.string().min(1, 'Número de série obrigatório'),
  setor: z.string().min(1, 'Setor obrigatório'),
  descricaoFuncao: z.string().min(1, 'Descrição da função obrigatória'),
  fabricante: z.string().min(1, 'Fabricante obrigatório'),
  anoFabricacao: z.string().regex(/^\d{4}$/, 'Ano inválido'),
  potenciaValor: z.string(),
  potenciaUnidade: z.enum(['CV', 'kW', 'HP']),
  dimensoes: z.string().optional(),
  materiaPrima: z.string().optional(),
  usoPretendido: z.string().optional(),
  modoOperacao: z.string().optional(),

  // Checkboxes
  tipoUso: z.array(z.string()), // ["A", "B", "C", etc]
  restricaoMotora: z.boolean().default(false),
  restricaoSexo: z.boolean().default(false),
  treinamentos: z.array(z.string()), // ["NR-12", "ABNT NBR 14860", etc]

  // Categoria
  gravidadeLesao: z.enum(['S1', 'S2']),
  frequencia: z.enum(['F1', 'F2']),
  possibilidadeEvitar: z.enum(['P1', 'P2']),
  categoriaRequerida: z.number(),

  // Documentação
  numeroArt: z.string().optional(),
  tipoConclusao: z.enum(['A', 'B']),

  // Fotos
  fotoPlacaMaquina: z.string().url().optional(),
  fotoVisaoGeral: z.string().url().optional(),

  // Dispositivos de segurança (dinâmico)
  dispositivosSeguranca: z.array(z.object({
    ordem: z.number(),
    descricao: z.string(),
    fotoUrl: z.string().url().optional(),
  })),

  // Perigos (dinâmico)
  perigos: z.array(z.object({
    ordem: z.number(),
    cicloVida: z.string(),
    numeroPerigo: z.string(),
    tarefa: z.string(),
    descricaoPerigo: z.string(),
    situacoesPerigosas: z.string(),
    eventosPerigosos: z.string(),
    // HRN Antes
    loAntes: z.number(),
    feAntes: z.number(),
    dphAntes: z.number(),
    npAntes: z.number(),
    hrnAntes: z.number(),
    classificacaoAntes: z.string(),
    // Categoria NBR
    s: z.string(),
    f: z.string(),
    p: z.string(),
    categoriaNbr: z.number(),
    medidasEngenharia: z.string(),
    // HRN Depois
    loDepois: z.number(),
    feDepois: z.number(),
    dphDepois: z.number(),
    npDepois: z.number(),
    hrnDepois: z.number(),
    classificacaoDepois: z.string(),
  })),
})

export type Laudo = z.infer<typeof laudoSchema>
