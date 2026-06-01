---
name: wellness-design-system
description: Aplica a identidade visual do Wellness-app a qualquer componente, página ou peça de UI. Garante cores, tipografia e estrutura de layout consistentes com a marca em todo frontend novo. Use ao criar ou estilizar componente React, página, dashboard, card, botão, ou peça visual do app. Aciona com "componente", "estilizar", "UI", "tela", "card", "botão", "cor da marca", "design", "frontend", "layout", "identidade visual".
allowed-tools: Read, Write, Bash, Glob, Grep
---

# Wellness Design System — Identidade visual do Wellness-app

## Persona

Você é um designer de produto que protege a consistência da marca. Cada pixel novo respeita a paleta e a estrutura aprovadas. Nada de cor improvisada ou componente que destoa. Em um app de bem-estar, a UI precisa transmitir calma, confiança e clareza.

## Propósito

Todo componente novo sai on-brand sem reexplicação. Centraliza tokens de cor, tipografia e o template estrutural aprovado.

> ⚠️ **Placeholder:** a paleta abaixo é um ponto de partida calmo/wellness. Substitua pelos tokens oficiais da marca do Wellness-app assim que existirem. Mantenha a *estrutura* da tabela; troque os valores.

## Quando usar

- Criar componente React/TypeScript novo
- Estilizar página, dashboard, card, modal, botão
- Produzir peça visual (institucional, social)
- Revisar UI fora do padrão

## Quando NÃO usar

- Lógica de negócio sem UI
- Configuração de backend

## Tokens da marca (fonte de verdade — placeholder, ajuste)

| Token                 | Hex     | Uso                                      |
|-----------------------|---------|------------------------------------------|
| Verde sálvia (primária)| #2E7D5B | títulos, logo, elementos principais     |
| Off-white suave (fundo)| #F7F9F4 | background de página                    |
| Card neutro           | #ECF3E9 | fundo de cards e blocos de conteúdo      |
| Coral/âmbar (destaque)| #E8A87C | acentos, CTAs, selo "MAIS ESCOLHIDO"     |
| Cinza texto           | #4A5247 | corpo de texto secundário                |

## Template estrutural aprovado

- Logo do Wellness-app no topo
- Subtítulo em cinza, com espaçamento de letra (tracking)
- Título grande na cor primária
- Card de conteúdo em tom neutro
- Tom geral: respiro/whitespace generoso, cantos arredondados, sensação de leveza

## Procedimento

1. Identifique o tipo de elemento (página, card, CTA, etc.)
2. Aplique os tokens corretos — nunca hex avulso fora da tabela
3. Siga a hierarquia tipográfica do template (subtítulo espaçado → título → conteúdo)
4. CTAs e destaques usam o tom de destaque; fundo de conteúdo usa card neutro; página usa off-white
5. Garanta contraste e acessibilidade (texto sobre fundo precisa passar WCAG AA; cuidado com o destaque coral em texto pequeno)
6. Exporte tokens como variáveis CSS/Tailwind reutilizáveis, não valores soltos

## Saída esperada

1. Componente/peça com os tokens aplicados
2. Variáveis de cor declaradas (CSS custom properties ou config Tailwind)
3. Apontamento de qualquer desvio da marca encontrado em revisão

## Exemplo (Wellness-app)

Criar um card de plano (Mensal/Semestral/Anual): fundo card neutro #ECF3E9, título do plano na cor primária, selo "MAIS ESCOLHIDO" em coral #E8A87C no Anual, página em off-white #F7F9F4, cantos arredondados e bastante respiro.
