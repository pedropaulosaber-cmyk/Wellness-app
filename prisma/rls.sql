-- Row Level Security (defesa em profundidade) para o Vivá.
--
-- ATENÇÃO: o app acessa o banco via Prisma com uma conexão privilegiada
-- (DATABASE_URL = papel postgres), que IGNORA RLS. O isolamento real entre
-- contas é garantido na aplicação (toda query filtra por usuarioId).
--
-- Estas policies protegem o caso de alguém acessar via anon key do Supabase
-- (PostgREST). Aplique no SQL Editor do Supabase após `prisma db push`.
-- Ver skill supabase-rls-guard.

alter table usuarios               enable row level security;
alter table perfis                 enable row level security;
alter table registros_alimentares  enable row level security;
alter table registros_agua         enable row level security;

-- usuarios: cada um lê/edita só a própria linha
create policy usuarios_self on usuarios
  for all using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- perfis
create policy perfis_self on perfis
  for all using ((select auth.uid()) = "usuarioId") with check ((select auth.uid()) = "usuarioId");

-- registros alimentares
create policy registros_alimentares_self on registros_alimentares
  for all using ((select auth.uid()) = "usuarioId") with check ((select auth.uid()) = "usuarioId");

-- registros de água
create policy registros_agua_self on registros_agua
  for all using ((select auth.uid()) = "usuarioId") with check ((select auth.uid()) = "usuarioId");

-- Tabelas adicionadas nas Fases 6–7
alter table treino_sessoes enable row level security;
alter table serie_registros enable row level security;
alter table registros_peso  enable row level security;

create policy treino_sessoes_self on treino_sessoes
  for all using ((select auth.uid()) = "usuarioId") with check ((select auth.uid()) = "usuarioId");
create policy serie_registros_self on serie_registros
  for all using ((select auth.uid()) = "usuarioId") with check ((select auth.uid()) = "usuarioId");
create policy registros_peso_self on registros_peso
  for all using ((select auth.uid()) = "usuarioId") with check ((select auth.uid()) = "usuarioId");

-- Tabela de integrações (Fase 8)
alter table atividades_externas enable row level security;
create policy atividades_externas_self on atividades_externas
  for all using ((select auth.uid()) = "usuarioId") with check ((select auth.uid()) = "usuarioId");
