---
name: deployment-readiness
description: Roda a rubrica pontuada de prontidão para produção do Wellness-app antes de qualquer deploy. Verifica segurança Supabase/RLS, migrations aplicadas, edge functions, variáveis de ambiente, build do frontend, isolamento entre contas e conformidade LGPD (com atenção a dado de saúde sensível), atribuindo nota e bloqueando o deploy se não atingir o corte. Aciona com "deploy", "subir para produção", "lançar", "pré-lançamento", "está pronto para produção", "DEPLOYMENT_GRADE", "checklist de deploy".
allowed-tools: Read, Bash, Glob, Grep
---

# Deployment Readiness — Wellness-app

## Persona

Você é um engenheiro de release rigoroso. Trata deploy como evento de risco: nada sobe sem passar na rubrica. Prefere bloquear um lançamento a deixar vazar dado de saúde de usuário ou subir build quebrado.

## Propósito

Converter a rubrica de prontidão num gate automático. Antes de cada deploy, avaliar cada eixo, somar a nota e dar veredito: APTO ou BLOQUEADO.

## Quando usar

- Antes de qualquer deploy de produção
- Após refatoração grande, para verificar regressões
- Quando o usuário pergunta "está pronto para subir?"

## Quando NÃO usar

- Deploy de ambiente de teste/staging descartável
- Verificação de uma feature isolada ainda em desenvolvimento

## Procedimento

Avalie cada seção, atribua a nota e bloqueie se o total for < 90/100.

### 1. Segurança Supabase / RLS (peso 30)

- [ ] RLS habilitado em TODAS as tabelas com dado de usuário/saúde
- [ ] Nenhuma policy permite acesso cross-account
- [ ] UPDATE com USING e WITH CHECK
- [ ] service role key não exposta no frontend
- [ ] Teste de isolamento entre duas contas passou

### 2. Migrations (peso 20)

- [ ] Todas aplicadas em produção
- [ ] Nenhuma pendente em local
- [ ] Rollback documentado

### 3. Edge Functions (peso 15)

- [ ] Secrets em variáveis, não hardcoded
- [ ] Tratamento de erro em todas
- [ ] Validação de input

### 4. Frontend (peso 20)

- [ ] Build sem erros nem warnings críticos
- [ ] Variáveis de ambiente de produção corretas
- [ ] Bug de vazamento de estado entre contas verificado
- [ ] Sem chaves/segredos no bundle

### 5. LGPD (peso 15)

- [ ] Política de privacidade publicada
- [ ] Consentimento para tratar dado pessoal/de saúde implementado
- [ ] Caminho de exclusão de dados disponível
- [ ] Dado de saúde tratado como sensível (base legal específica)

## Saída esperada

Tabela: seção | nota | itens reprovados. Depois: nota total e veredito (APTO / BLOQUEADO) com a lista exata do que corrigir antes de subir.

## Exemplo (Wellness-app)

Pré-lançamento: a skill roda, encontra RLS ausente numa tabela nova de medições de saúde e migration pendente em local → veredito BLOQUEADO, com os 2 itens a corrigir e o comando de teste de isolamento a rodar antes de tentar de novo.
