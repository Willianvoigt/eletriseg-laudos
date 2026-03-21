# 🚀 Setup Fase 1 — Infraestrutura

## Status
✅ **Fase 1 — 30% concluída**

Foram criados:
- ✅ Estrutura de pastas do projeto
- ✅ Configuração Next.js 15 + TypeScript
- ✅ Schema Prisma (modelos de dados)
- ✅ Schema Zod (validação de formulário)
- ✅ Arquivos de configuração (tsconfig, tailwind, postcss)
- ✅ Página inicial (home)
- ✅ Layout base

## 📋 Próximos Passos

### 1️⃣ Configurar Supabase (20 min)

**No site supabase.com:**
1. Criar novo projeto
2. Copiar `PROJECT_URL` e `ANON_KEY` de Settings > API
3. Copiar `SERVICE_ROLE_KEY` (service_role token)

**Localmente:**
```bash
cd ~/eletriseg-laudos
cp .env.example .env.local
```

Editar `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxx...
DATABASE_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
```

### 2️⃣ Executar Migrações Prisma (10 min)

```bash
cd ~/eletriseg-laudos
npx prisma migrate dev --name init
npx prisma generate
```

Isso vai:
- Criar as tabelas no PostgreSQL via Supabase
- Gerar tipos TypeScript para o cliente Prisma

### 3️⃣ Testar Localmente (5 min)

```bash
npm run dev
```

Acessar `http://localhost:3000` — você deve ver a página inicial.

### 4️⃣ Próxima Fase: Criar Clientes Supabase e Prisma

Após completar os 3 passos acima, criar:
- `lib/supabase.ts` — cliente Supabase para auth
- `lib/prisma.ts` — singleton Prisma para queries ao banco
- `app/(auth)/login/page.tsx` — tela de login com Supabase Auth

## 📌 Estrutura Criada

```
~/eletriseg-laudos/
├── app/
│   ├── layout.tsx          # Layout raiz
│   ├── globals.css         # CSS global
│   └── page.tsx            # Página inicial
├── lib/
│   └── validations/
│       └── laudo.schema.ts # 💪 Schema Zod (38 campos + arrays)
├── prisma/
│   └── schema.prisma       # 💪 Modelos do banco (User, Laudo, Perigo, etc.)
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── package.json
├── README.md
└── SETUP.md                # Este arquivo

```

## 🔑 Variáveis de Ambiente Necessárias

```env
# Supabase (obrigatório para dev)
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
DATABASE_URL

# Opcional
NEXT_PUBLIC_APP_URL (para links absolutos, padrão: http://localhost:3000)
```

## ⚙️ Arquivos Críticos Já Criados

| Arquivo | Função |
|---------|--------|
| `prisma/schema.prisma` | 💪 Define User, Laudo, Perigo, DispositivoSeguranca — **estrutura de dados completa** |
| `lib/validations/laudo.schema.ts` | 💪 Schema Zod com 38 campos — **validação compartilhada client+server** |
| `next.config.js` | Config Next.js (suporta imagens Supabase, Puppeteer) |
| `tailwind.config.ts` | Config Tailwind CSS |

## 🎯 Quando Começar Fase 2

Após:
1. ✅ Supabase configurado com credenciais
2. ✅ `npx prisma migrate dev` executado com sucesso
3. ✅ `npm run dev` rodar sem erros
4. ✅ `http://localhost:3000` carregando página inicial

## 💡 Dicas

- Se obter erro `Cannot find module 'next'`, execute `npm install` novamente
- Se obter erro de Prisma, cheque se `DATABASE_URL` está correto
- Se obter erro de Supabase, cheque se as chaves foram copiadas corretamente

## 📞 Continuação

Após completar os próximos passos, chamar por Fase 2: **Formulário Multi-Step**
