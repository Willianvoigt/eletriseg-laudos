# EletriSeg - Gerador Automático de Laudos NR-12

Sistema web para automação de laudos técnicos NR-12 da EletriSeg Engenharia.

## 🚀 Stack Tecnológico

- **Frontend:** Next.js 15 + React 18 + TypeScript
- **Estilos:** Tailwind CSS + shadcn/ui
- **Formulários:** React Hook Form + Zod
- **Banco de dados:** PostgreSQL via Supabase
- **ORM:** Prisma
- **Storage:** Supabase Storage
- **Geração de PDF:** Puppeteer + @sparticuz/chromium
- **Hospedagem:** Vercel

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Supabase (gratuita)
- Vercel (deploy - opcional)

## 🔧 Instalação Local

### 1. Clonar/Preparar projeto

```bash
cd eletriseg-laudos
npm install
```

### 2. Configurar Supabase

1. Criar projeto no [supabase.com](https://supabase.com)
2. Copiar URL e chaves do projeto
3. Criar arquivo `.env.local`:

```bash
cp .env.example .env.local
```

Preencher com suas credenciais Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
DATABASE_URL=postgresql://xxx:xxx@xxx.supabase.co:5432/postgres
```

### 3. Configurar banco de dados

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Executar em desenvolvimento

```bash
npm run dev
```

Acessar: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
eletriseg-laudos/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Grupo de rotas autenticadas
│   │   └── login/
│   ├── (dashboard)/              # Dashboard autenticado
│   │   ├── page.tsx
│   │   └── laudos/
│   │       ├── novo/
│   │       └── [id]/
│   └── api/                      # Rotas API
├── components/
│   ├── formulario/               # Componentes das 7 etapas
│   ├── ui/                       # Componentes reutilizáveis
│   └── dashboard/
├── lib/
│   ├── validations/laudo.schema.ts  # Schema Zod
│   ├── pdf/                      # Geração de PDF
│   │   ├── generator.ts
│   │   └── templates/
│   ├── prisma.ts                 # Cliente Prisma
│   └── supabase.ts               # Cliente Supabase
├── prisma/
│   └── schema.prisma             # Definição do banco
└── public/                       # Arquivos estáticos
```

## 🎯 Roadmap de Desenvolvimento

### Fase 1: Infraestrutura ✅
- [x] Setup Next.js + TypeScript
- [x] Configuração Supabase
- [x] Schema Prisma
- [x] Schema Zod de validação
- [ ] Tela de login
- [ ] Deploy inicial no Vercel

### Fase 2: Formulário (Em progresso)
- [ ] 7 etapas do formulário
- [ ] Componente FotoUpload
- [ ] HRNCalculator
- [ ] Rascunho automático
- [ ] API routes

### Fase 3: Dashboard
- [ ] Lista de laudos
- [ ] Busca e filtros
- [ ] Ações (editar, duplicar, arquivar)

### Fase 4: Geração de PDF
- [ ] Template HTML
- [ ] Puppeteer setup
- [ ] Teste com laudos reais

### Fase 5: Refinamento
- [ ] Testes mobile
- [ ] Autocomplete de dados
- [ ] Guia de uso

## 📝 Notas Importantes

### Fotos no Mobile
O componente `FotoUpload` usa `capture="environment"` para abrir a câmera do celular:
- Comprime imagens antes do upload (reduz tamanho em 90%)
- Upload direto para Supabase Storage (sem passar por API)
- Retorna URL pública permanente

### Cálculo HRN
A fórmula HRN é calculada automaticamente:
```
HRN = LO (Likelihood) × FE (Frequency) × DPH (Degree of Harm) × NP (Number of Persons)
```

Classificação de risco:
- 0-5: Muito Baixo
- 5-50: Baixo
- 50-1000: Médio
- 1000+: Alto (interromper imediatamente)

### Geração de PDF
O PDF é gerado on-demand (não armazenado) garantindo sempre estar atualizado com os dados mais recentes do laudo.

## 🚢 Deploy no Vercel

```bash
git push  # assumindo git remoto configurado
# Vercel faz deploy automático
```

Variáveis de ambiente configuradas automaticamente via Vercel dashboard.

## 📞 Suporte

Para dúvidas sobre o desenvolvimento: refer ao plano em `C:\Users\ASUS\.claude\plans\reflective-whistling-pond.md`

## 📄 Licença

Propriedade da EletriSeg Engenharia LTDA
