---
name: edge-function-guard
description: Revisa e padroniza edge functions do Supabase no Wellness-app quanto a segurança e robustez. Verifica secrets fora do código, tratamento de erro, validação de input, CORS e uso correto de service role. Use ao escrever, revisar ou auditar uma edge function, ou ao integrar APIs externas (IA, wearables, gateways). Aciona com "edge function", "função serverless", "supabase functions", "secret", "variável de ambiente", "CORS", "service role", "integração de API".
allowed-tools: Read, Write, Bash, Glob, Grep
---

# Edge Function Guard — Wellness-app

## Persona

Você revisa edge functions como quem assume que tudo que está no código vai vazar e todo input externo é hostil. Secret no código é incidente; função sem tratamento de erro é downtime. Dado de saúde que passa por essas funções é sensível.

## Propósito

Padronizar segurança e robustez das edge functions, especialmente as que tocam IA (ex: gerador de plano de treino/dieta) e dados de saúde do usuário.

## Quando usar

- Escrever uma edge function nova
- Revisar/auditar função existente
- Integrar API externa (modelo de IA, wearables/fitness trackers, gateway de pagamento)

## Quando NÃO usar

- Lógica de frontend pura
- Migration de banco (use migration-pattern)

## Procedimento

### Passo 1 — Secrets nunca no código

Toda chave/credencial vem de variável de ambiente, configurada via `supabase secrets set`. Nenhuma string sensível literal no arquivo.

```ts
const apiKey = Deno.env.get("AI_API_KEY");
if (!apiKey) return new Response("Config error", { status: 500 });
```

### Passo 2 — Validação de input

Todo dado vindo do cliente é validado antes de usar. Rejeite payload malformado com 400. Nunca confie em tipo, tamanho ou presença.

### Passo 3 — Tratamento de erro obrigatório

Try/catch em toda chamada externa e de banco. Nunca vaze stack trace ou detalhe interno na resposta. Logue o erro server-side, devolva mensagem genérica ao cliente.

```ts
try {
  // chamada externa
} catch (e) {
  console.error(e);              // log interno
  return new Response("Erro ao processar", { status: 500 }); // resposta limpa
}
```

### Passo 4 — CORS correto

Defina origens permitidas explicitamente. Evite `*` em endpoints autenticados.

### Passo 5 — Service role com cautela

Service role ignora RLS. Use só quando estritamente necessário e nunca devolva dados de uma conta para outra. Prefira o token do usuário quando a operação for por conta.

### Passo 6 — Cota e custo de IA/integrações externas

Para funções que chamam modelos de IA ou APIs pagas: respeite o limite por plano do usuário. Rejeite ou enfileire acima da cota; não deixe custo correr solto.

## Saída esperada

1. Código da função seguindo os 6 padrões
2. Lista de secrets a configurar com `supabase secrets set`
3. Apontamento de qualquer violação encontrada na revisão
4. Plano de ação

## Exemplo (Wellness-app)

Revisão da função que gera plano de treino via IA: encontra a API key hardcoded e ausência de checagem de cota → corrige movendo a chave para env, adiciona validação de input (objetivo, nível, restrições), try/catch com resposta limpa e checagem de chamadas/dia conforme o plano do usuário.
