# Vivá

App de bem-estar **tudo-em-um**: todos os seus treinos (academia, pilates, corrida, bike, funcional, natação) **e** a sua alimentação, num só lugar. Mobile-first, em português.

> **Modelo de negócio:** pagamento **único de R$ 449,90 = acesso VITALÍCIO**. Não é assinatura, não tem mensalidade. Diferencial frente a todos os concorrentes brasileiros, que são por assinatura.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Supabase** (Auth + Postgres) com **Prisma** como ORM
- PWA instalável (manifest + service worker) — _Fase 2_
- Tema **branco e verde wellness** (`#1F6B4A`)

## Como rodar localmente

```bash
# 1. Instale as dependências
npm install

# 2. Configure o ambiente
cp .env.example .env
#   preencha NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY e DATABASE_URL

# 3. (quando houver banco) gere o client e suba o schema
npm run prisma:generate
npm run prisma:push

# 4. Rode em desenvolvimento
npm run dev          # http://localhost:3000

# Build de produção
npm run build && npm start
```

## Estrutura

```
src/
  app/
    layout.tsx          # shell mobile-first, pt-BR, tema verde
    page.tsx            # home com anéis de progresso (calorias/proteína/água)
    anamnese/           # fluxo de anamnese (placeholder → Fase 4)
  components/
    ProgressRing.tsx    # anel de progresso (SVG puro)
  lib/
    nutrition.ts        # MOTOR NUTRICIONAL — fonte única (Mifflin-St Jeor → TDEE → macros)
    prisma.ts           # singleton do Prisma
    supabase/           # clients browser/server
prisma/
  schema.prisma         # Usuario (acesso vitalício), Perfil (anamnese)
.claude/skills/         # skills do Claude Code para este projeto
```

## Motor nutricional

`src/lib/nutrition.ts` é a **fonte única de verdade** para qualquer cálculo de
saúde do app. Baseado em Mifflin-St Jeor (BMR) → fator de atividade (TDEE) →
ajuste por objetivo → macros. Sempre importe destas funções; nunca duplique
fórmulas. Os valores são estimativas, **não prescrição médica/nutricional**.

## Roteiro de desenvolvimento

- [x] **Fase 1 — Fundação**: scaffold Next.js + Tailwind + Prisma + Supabase, motor nutricional, home com anéis. ✅ `npm run build` passa.
- [ ] **Fase 2 — PWA**: manifest, ícones, service worker, "Adicionar à tela inicial".
- [ ] **Fase 3 — Auth + paywall** vitalício de R$ 449,90.
- [ ] **Fase 4 — Anamnese** aprofundada + persistência.
- [ ] **Fase 5 — Plano nutricional + cardápio (TACO)** + registro de refeições.
- [ ] **Fase 6 — Treinos por modalidade + player + progressão de carga.**
- [ ] **Fase 7 — Evolução, streak, conquistas.**
- [ ] **Fase 8 — Integrações** (Apple Health / Google Fit).
- [ ] **Fase 9 — Auditoria final mobile + PWA.**

## Deploy (Vercel) — _instruções completas na Fase 9_

Resumo: conectar o repositório na Vercel, definir as variáveis de ambiente do
`.env.example`, e fazer deploy. As instruções de **instalação no celular** (PWA)
serão documentadas após a Fase 2.
