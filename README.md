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

- [x] **Fase 1 — Fundação**: Next.js + Tailwind + Prisma + Supabase, motor nutricional, home.
- [x] **Fase 2 — PWA**: manifest, ícones, service worker, "Adicionar à tela inicial".
- [x] **Fase 3 — Auth + paywall** vitalício de R$ 449,90.
- [x] **Fase 4 — Anamnese** aprofundada + persistência.
- [x] **Fase 5 — Plano nutricional + cardápio (TACO)** + registro de refeições.
- [x] **Fase 6 — Treinos por modalidade + player + progressão de carga.**
- [x] **Fase 7 — Evolução, streak, conquistas.**
- [x] **Fase 8 — Integrações** (Apple Health / Google Fit via endpoint de sync).
- [x] **Fase 9 — Auditoria final mobile + PWA.**

## Configuração do Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Em **Settings → API**, copie `Project URL` e `anon key` para o `.env`.
3. Em **Settings → Database**, copie a connection string para `DATABASE_URL`/`DIRECT_URL`.
4. Aplique o schema: `npm run prisma:push`.
5. (Recomendado) Aplique as policies de isolamento: cole `prisma/rls.sql` no **SQL Editor**.
   > Observação: o app acessa o banco via Prisma (conexão privilegiada), então o
   > isolamento entre contas é garantido **na aplicação** (toda query filtra por
   > `usuarioId`). O `rls.sql` é defesa em profundidade.

## Pagamento (acesso vitalício)

- Sem `PAGAMENTO_PROVIDER`, roda em **modo simulado** (testa o paywall sem cobrar).
- Em produção, defina `PAGAMENTO_PROVIDER=asaas`, `PAGAMENTO_API_KEY` e
  `PAGAMENTO_WEBHOOK_SECRET`, e configure o webhook do gateway para
  `https://SEU-DOMINIO/api/pagamento/webhook`. Ao confirmar, o usuário recebe
  `acessoVitalicio = true`.

## Deploy (Vercel)

1. Importe o repositório na [Vercel](https://vercel.com).
2. Em **Settings → Environment Variables**, adicione todas as variáveis do `.env.example`.
3. Build Command: `npm run build` (já roda `prisma generate`). Deploy.
4. Configure o **Redirect URL** do Supabase Auth para `https://SEU-DOMINIO/auth/callback`.

## Como instalar no celular (PWA)

- **iPhone (Safari)**: toque em **Compartilhar** → **Adicionar à Tela de Início**.
- **Android (Chrome)**: o app oferece o botão **"Instalar o Vivá"**; ou menu **⋮ → Instalar app**.
- Após instalar, o Vivá abre em tela cheia (standalone) e funciona offline nas telas já visitadas.

## Conectar Apple Saúde / Google Fit

Em **Perfil → Apps e wearables**, gere o token e use o endpoint exibido num
**Atalho do iOS** (lê passos/FC e faz POST) ou num job do **Health Connect**
(Android). Sincronização nativa em tempo real exige empacotar como app
(Capacitor) — a arquitetura (`/api/integracoes/importar`) já está pronta.
