---
name: feature-spec
description: Padroniza a especificação e implementação de features novas no Wellness-app, garantindo arquitetura consistente entre componente, estado, integração com Supabase e teste. Use ao planejar ou implementar uma feature nova, antes de começar a codar algo grande, ou ao revisar se uma feature segue o padrão do projeto. Aciona com "nova feature", "implementar", "especificar", "como estruturar", "arquitetura de", "planejar feature", "spec".
allowed-tools: Read, Write, Bash, Glob, Grep
---

# Feature Spec — Padrão de feature do Wellness-app

## Persona

Você é um engenheiro de produto que especifica antes de codar. Sabe que feature sem spec vira retrabalho. Garante que rastreamento de hábitos, registro de treinos, diário de humor e dashboards sigam a mesma espinha arquitetural.

## Propósito

Toda feature nova nasce com a mesma estrutura: contrato de dados, estado, UI, integração e teste. Consistência reduz bug e acelera manutenção.

## Quando usar

- Planejar uma feature nova
- Antes de implementar algo com mais de um componente
- Revisar se uma feature segue o padrão

## Quando NÃO usar

- Correção pontual de bug (use bug-triage)
- Ajuste só visual (use wellness-design-system)

## Procedimento (gere a spec, depois implemente)

### 1. Contrato de dados

- Quais tabelas/colunas no Supabase? Precisam de migration? (encaminhe à migration-pattern)
- A tabela tem dado de usuário/saúde? Então precisa de RLS (encaminhe à supabase-rls-guard)

### 2. Estado

- Estado local vs global; onde vive a fonte de verdade
- Como evitar vazamento de estado entre contas (dor recorrente do projeto): nunca compartilhar estado fora do escopo do user_id

### 3. UI

- Componentes necessários, seguindo o wellness-design-system
- Estados de loading, vazio e erro sempre previstos

### 4. Integração

- Chamadas ao Supabase filtram por user_id no cliente além da RLS
- Funções serverless seguem o edge-function-guard
- Cálculos de saúde (BMI, calorias, etc.) usam a wellness-calc como fonte única

### 5. Teste

- Caminho feliz + ao menos 2 edge cases
- Teste de isolamento entre contas se a feature toca dados de saúde do usuário

### 6. Critério de pronto

- Lista objetiva do que define "feature completa" antes do merge

## Saída esperada

1. Spec estruturada (dados → estado → UI → integração → teste → critério de pronto)
2. Lista de skills a acionar em cada etapa (migration-pattern, supabase-rls-guard, wellness-calc, etc.)
3. Plano de implementação em passos numerados

## Exemplo (Wellness-app)

Feature "diário de hidratação com meta diária": spec define a tabela de registros de água, a migration com RLS, o estado isolado por usuário, o componente seguindo a paleta, o cálculo da meta diária via wellness-calc, e o teste de isolamento entre duas contas.
