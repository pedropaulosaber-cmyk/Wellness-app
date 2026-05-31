---
name: api-contract
description: Padroniza o contrato entre frontend e backend no Wellness-app (tipos compartilhados, formato de resposta e de erro, status codes) para prevenir a classe de bug "mudei o backend e o front quebrou". Use ao criar ou alterar endpoint, edge function consumida pelo front, formato de resposta, ou tipos trocados entre camadas. Aciona com "contrato", "API", "endpoint", "resposta da função", "tipo compartilhado", "formato de erro", "status code", "front quebrou", "integração front back".
allowed-tools: Read, Write, Bash, Glob, Grep
---

# API Contract — Contrato front/back do Wellness-app

## Persona

Você trata a fronteira entre frontend e backend como um contrato versionado. Mudança de um lado sem o outro é a causa silenciosa de bug em produção. Tipos são a fonte de verdade, não comentário.

## Princípio central

Frontend e backend devem concordar sobre o formato dos dados via tipos compartilhados, não por convenção informal. Quando o contrato é explícito e tipado, mudar o backend sem atualizar o front vira erro de compilação — não bug em produção.

## Quando usar

- Criar/alterar edge function consumida pelo frontend
- Mudar formato de resposta ou de erro
- Definir tipos trocados entre camadas
- Diagnosticar "mudei o back e o front parou"

## Quando NÃO usar

- Lógica interna de uma camada só
- Cálculo puro (use wellness-calc)

## Procedimento

### Passo 1 — Tipos compartilhados como fonte de verdade

Defina os tipos da resposta num lugar único importado pelos dois lados (ex: `src/types/`). Supabase pode gerar tipos do schema:

```bash
supabase gen types typescript --linked > src/types/database.ts
```

Frontend e edge functions importam desses tipos. Mudou o schema → regenere → o que quebrou aparece no type-check.

### Passo 2 — Formato de resposta consistente

Toda resposta segue o mesmo envelope. Exemplo:

```ts
type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string } };
```

O front sempre sabe onde olhar para dado e para erro.

### Passo 3 — Erros padronizados

- Status code correto: 400 (input inválido), 401 (não autenticado), 403 (sem permissão), 404, 500.
- Mensagem de erro limpa para o usuário; detalhe técnico só no log (encaminhe à edge-function-guard).
- Nunca vaze stack trace na resposta.

### Passo 4 — Validação nas duas pontas

Backend valida o que recebe; frontend valida/estreita o que chega antes de usar. Não confie cegamente no outro lado.

### Passo 5 — Versionar mudança que quebra

Se mudar o contrato de forma incompatível, trate como breaking change: atualize os dois lados na mesma entrega e rode o type-check do projeto inteiro.

## Saída esperada

1. Tipos compartilhados definidos/atualizados
2. Envelope de resposta e tabela de erros consistentes
3. Validação nas duas pontas
4. Confirmação via type-check de que front e back concordam

## Exemplo (Wellness-app)

A edge function que gera o plano de treino personalizado muda o formato de retorno: a skill atualiza o tipo compartilhado, ajusta o envelope `{ ok, data }`, regenera os tipos do Supabase, e o type-check aponta exatamente os componentes do front (tela de treino, dashboard de progresso) que precisam acompanhar — nenhum bug silencioso em produção.
