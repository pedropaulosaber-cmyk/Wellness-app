---
name: bug-triage
description: Procedimento de diagnóstico sistemático de bugs no Wellness-app, com foco nas falhas recorrentes do projeto (vazamento de estado entre contas, deleção que afeta outra conta, timing de onboarding). Use ao investigar um bug, comportamento estranho, dado aparecendo em conta errada, ou algo que funciona às vezes. Aciona com "bug", "erro", "não funciona", "comportamento estranho", "dado errado", "vazamento de estado", "aparece em outra conta", "intermitente", "às vezes funciona".
allowed-tools: Read, Bash, Glob, Grep
---

# Bug Triage — Wellness-app

## Persona

Você depura por hipótese, não por tentativa. Isola variáveis, reproduz antes de corrigir, e ataca a causa raiz — não o sintoma. Conhece os padrões de falha deste projeto e checa eles primeiro.

## Propósito

Codificar o passo a passo de investigação para não recomeçar do zero a cada bug, especialmente os que já se repetiram.

## Quando usar

- Investigar qualquer bug ou comportamento inesperado
- Dado de saúde/treino aparecendo em conta errada
- Falha intermitente ("às vezes funciona")

## Quando NÃO usar

- Implementar feature nova (use feature-spec)
- Revisão preventiva de código (use code-audit)

## Procedimento

### Passo 1 — Reproduzir

Defina os passos exatos que disparam o bug. Bug não reproduzível = colete mais dados antes de mexer no código. Anote: qual conta, qual ação, o que esperava x o que aconteceu.

### Passo 2 — Checar os suspeitos conhecidos deste projeto primeiro

- **Dado/estado aparecendo em conta errada** → quase sempre RLS ausente/incorreta ou estado global compartilhado fora do escopo do user_id. Vá direto à supabase-rls-guard e verifique o isolamento. Dado de saúde é sensível — vazamento é incidente sério.
- **Deleção afeta outra conta** → policy de DELETE sem `auth.uid() = user_id`.
- **Timing de onboarding / corrida** → race condition; verifique ordem de efeitos e dependências assíncronas.

### Passo 3 — Isolar a camada

Frontend, edge function ou banco? Reduza o escopo: o dado errado vem da query (banco/RLS) ou da renderização (estado)? Teste a query direto no banco autenticado como o usuário afetado.

### Passo 4 — Hipótese única

Formule UMA hipótese por vez e teste. Não mude várias coisas juntas — você perde a relação causa-efeito.

### Passo 5 — Corrigir a causa raiz

Conserte a origem, não o sintoma. Se o dado vaza por RLS, a correção é a policy, não um filtro extra escondendo o problema.

### Passo 6 — Verificar e prevenir

Reproduza de novo: o bug sumiu. Depois pergunte: isso devia virar item de checklist em outra skill (deployment-readiness, feature-spec)? Se sim, registre.

## Saída esperada

1. Passos de reprodução
2. Camada isolada + causa raiz identificada
3. Correção na origem
4. Item de prevenção para evitar reincidência

## Exemplo (Wellness-app)

"O histórico de treinos some quando outro usuário loga": reprodução com 2 contas → isola no banco → query retorna registros de ambos → causa raiz: RLS de SELECT ausente na tabela workouts → correção via supabase-rls-guard → prevenção: adicionar verificação de isolamento ao deployment-readiness.
