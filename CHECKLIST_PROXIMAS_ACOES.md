# ✅ Checklist — Próximas Ações

## Fase 1a ✅ COMPLETA
- [x] Estrutura de pasta criada
- [x] Package.json com todas as dependências
- [x] Schema Prisma completo (4 modelos)
- [x] Schema Zod completo (38 campos)
- [x] Configuração Next.js
- [x] Tailwind CSS setup
- [x] Página inicial funcional
- [x] npm install executado
- [x] Documentação criada

## Fase 1b ⏳ PRÓXIMO (Para você fazer)

### 1. Supabase Setup (20 min)
- [ ] Acessar https://supabase.com
- [ ] Criar novo projeto
- [ ] Copiar `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Copiar `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Copiar `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Copiar `DATABASE_URL`
- [ ] Editar `~/eletriseg-laudos/.env.local` com as credenciais

### 2. Prisma Setup (10 min)
```bash
cd ~/eletriseg-laudos
npx prisma migrate dev --name init
npx prisma generate
```
- [ ] Migração executada
- [ ] Tipos Prisma gerados

### 3. Teste Local (5 min)
```bash
npm run dev
```
- [ ] App rodando em http://localhost:3000
- [ ] Página inicial carregando
- [ ] Nenhum erro no console

### 4. Criar Clientes (15 min)
- [ ] `lib/prisma.ts` — singleton Prisma
- [ ] `lib/supabase.ts` — cliente Supabase auth
- [ ] Middleware de autenticação

### 5. Tela de Login (Fase 1b Final)
- [ ] `app/(auth)/login/page.tsx`
- [ ] Integração Supabase Auth
- [ ] Redirect após login

## Fase 2 🔲 Formulário (5-7 dias)

### Layout & Estrutura
- [ ] `components/formulario/StepIndicator.tsx`
- [ ] `app/(dashboard)/laudos/novo/page.tsx` — container do formulário
- [ ] Navegação entre etapas

### 7 Etapas
- [ ] `StepEmpresa.tsx` — dados da empresa
- [ ] `StepMaquina.tsx` — dados do equipamento
- [ ] `StepFotos.tsx` — foto placa + visão geral
- [ ] `StepLimites.tsx` — checkboxes
- [ ] `StepSeguranca.tsx` — dispositivos + fotos
- [ ] `StepHRN.tsx` — análise de riscos (mais complexo)
- [ ] `StepConclusao.tsx` — finalizacao

### Componentes Críticos
- [ ] `components/ui/FotoUpload.tsx` — câmera celular + upload Supabase
- [ ] `components/ui/HRNCalculator.tsx` — cálculo em tempo real
- [ ] `lib/supabase.ts` — função getSignedUrl para upload

### API Routes
- [ ] `app/api/laudos/route.ts` — POST criar, GET listar
- [ ] `app/api/laudos/[id]/route.ts` — GET/PUT/DELETE
- [ ] `app/api/upload/route.ts` — gerar URL assinada Supabase

### Validação
- [ ] Validação client-side via Zod
- [ ] Validação server-side via Zod
- [ ] Mensagens de erro amigáveis

## Fase 3 🔲 Dashboard (2-3 dias)

### Lista de Laudos
- [ ] `app/(dashboard)/page.tsx` — dashboard principal
- [ ] `components/dashboard/LaudoTable.tsx` — tabela de laudos
- [ ] Busca por empresa/máquina
- [ ] Filtros (status, data, etc)
- [ ] Paginação

### Ações
- [ ] Botão "Editar" → redireciona para formulário
- [ ] Botão "Duplicar" → cria novo com dados pré-preenchidos
- [ ] Botão "Arquivar" → muda status
- [ ] Botão "Gerar PDF" → chama rota `/api/pdf/[id]`

## Fase 4 🔲 Geração de PDF (4-5 dias)

### Setup Puppeteer
- [ ] Instalar `@sparticuz/chromium` (já instalado)
- [ ] `lib/pdf/generator.ts` — função principal
- [ ] Testes com Puppeteer

### Template HTML
- [ ] `lib/pdf/templates/laudo.html.ts` — template completo
- [ ] `lib/pdf/templates/styles.ts` — CSS fiel ao layout
- [ ] Suportar todas as seções (capa, intro, metodologia, etc)

### Seções
- [ ] Capa
- [ ] Introdução (fixo)
- [ ] Objetivo (fixo)
- [ ] Normas (semi-fixo)
- [ ] Metodologia (fixo)
- [ ] Empresa + Equipamento (variável)
- [ ] Dispositivos de segurança (dinâmico)
- [ ] Análise HRN (dinâmico)
- [ ] Categoria
- [ ] Conclusão (A ou B)
- [ ] Responsável técnico (fixo)

### Fotos no PDF
- [ ] Inserir URLs Supabase Storage
- [ ] Puppeteer baixa automaticamente
- [ ] Dimensionamento correto

### API
- [ ] `app/api/pdf/[id]/route.ts` — GET para gerar PDF
- [ ] Download automático

## Fase 5 🔲 Refinamento (2-3 dias)

### Testes Mobile
- [ ] Abrir no iPhone real
- [ ] Abrir no Android real
- [ ] Testar upload de foto
- [ ] Testar em 3G/4G

### UX
- [ ] Autocomplete de fabricantes
- [ ] Autocomplete de modelos
- [ ] Dispositivos pré-carregados (lista padrão)
- [ ] Rascunho automático no localStorage
- [ ] Ícones e feedback visual

### Performance
- [ ] Otimizar imagens
- [ ] Lazy load onde necessário
- [ ] Cache de dados

### Documentação
- [ ] Guia de uso para Bruno (PDF)
- [ ] Vídeo curto (opcional)
- [ ] FAQ

## Deploy 🚀

### Vercel
- [ ] Conectar repositório Git
- [ ] Deploy automático
- [ ] Variáveis de ambiente configuradas
- [ ] SSL/HTTPS automático

### Domínio (Opcional)
- [ ] Comprar domínio (ex: laudos.eletriseg.com.br)
- [ ] Configurar DNS
- [ ] Email do domínio (opcional)

---

## 📊 Status Atual

**Fase 1a:** ✅ COMPLETA (30%)
**Fase 1b:** ⏳ PRÓXIMA
**Fases 2-5:** 🔲 Pendentes

**Total:** ~16-22 dias de desenvolvimento

---

## 💡 Dicas

1. **Comece pelo login** — sem isso, tudo que vem depois fica sem acesso
2. **Teste o upload de fotos no celular** — é crítico que funcione
3. **Compare o PDF com os laudos originais** — pixel-perfect é importante
4. **Use o localStorage para rascunho** — melhora a UX muito
5. **Teste com dados reais** — não use dados fake na Fase 4

---

**Checklist atualizado:** 17/03/2026
