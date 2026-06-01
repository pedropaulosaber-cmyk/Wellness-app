---
name: migration-pattern
description: Padroniza a criação e aplicação de migrations no Supabase para o Wellness-app. Define nomenclatura, ordem, rollback, e a regra de incluir RLS e índices na mesma migration que cria a tabela. Use ao criar tabela ou coluna nova, alterar schema, escrever migration, ou investigar migration aplicada errada. Aciona com "migration", "migração", "alterar schema", "nova tabela", "nova coluna", "alter table", "supabase db push", "rollback de migration".
allowed-tools: Read, Write, Bash, Glob, Grep
---

# Migration Pattern — Wellness-app

## Persona

Você trata o schema do banco como código versionado. Toda mudança de estrutura é uma migration nomeada, reversível e testada. Migration aplicada na mão ou fora de ordem é dívida que vira incidente.

## Propósito

Eliminar migration aplicada errada, fora de ordem ou sem RLS. Toda alteração de schema segue o mesmo molde.

## Quando usar

- Criar tabela ou coluna nova
- Alterar tipo, constraint ou índice
- Escrever qualquer migration nova
- Diagnosticar divergência entre schema local e produção

## Quando NÃO usar

- Consulta de dados (não altera schema)
- Seed de dados de teste descartável

## Procedimento

### Passo 1 — Nomenclatura

Use timestamp + descrição em snake_case: `20260531143000_create_workouts_table.sql`. Ordem cronológica = ordem de aplicação. Nunca edite uma migration já aplicada em produção; crie uma nova.

### Passo 2 — Toda tabela nova inclui RLS + índice na mesma migration

Nunca separe a criação da tabela da habilitação de RLS. Tabela sem RLS no Supabase é pública para qualquer autenticado — e aqui isso significa vazar dado de saúde.

```sql
create table public.workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  tipo text not null,
  duracao_min int,
  created_at timestamptz default now()
);

alter table public.workouts enable row level security;
create index idx_workouts_user_id on public.workouts using btree (user_id);
-- + as policies CRUD (delegue para a skill supabase-rls-guard)
```

### Passo 3 — Reversibilidade

Documente o rollback de cada migration (o `down`). Para destrutivas (drop column), confirme backup antes.

### Passo 4 — Aplicação

Local primeiro, depois produção. Verifique a fila:

```bash
supabase migration list      # o que está aplicado x pendente
supabase db push             # aplica pendentes
```

### Passo 5 — Verificação pós-aplicação

Confirme que local e produção têm a mesma lista de migrations. Divergência = pare e reconcilie antes de seguir.

## Saída esperada

1. Arquivo de migration completo, nomeado corretamente
2. Bloco de rollback
3. Comandos de aplicação e verificação
4. Aviso se a tabela criada precisa de policies (encaminhar à supabase-rls-guard)

## Exemplo (Wellness-app)

Adicionar tabela de registros de humor: a skill gera a migration com timestamp, cria a tabela com user_id, habilita RLS, indexa user_id, documenta o rollback e lembra de criar as policies antes do deploy.
