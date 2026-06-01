---
name: skill-forge
description: Cria, audita e otimiza skills do Claude Code para o projeto Wellness-app. Use quando o usuário quiser criar uma nova skill, transformar um procedimento repetitivo em skill, escrever ou corrigir um SKILL.md, otimizar uma description que não está disparando, ou auditar uma skill existente. Aciona com gatilhos como "criar skill", "nova skill", "fazer uma skill de", "transformar isso em skill", "minha skill não ativa", "auditar skill", "otimizar skill", "SKILL.md".
allowed-tools: Read, Write, Bash, Glob, Grep
---

# Skill Forge — A skill central que cria skills

## Propósito

Padronizar a criação de skills do Wellness-app. Em vez de improvisar cada SKILL.md, esta skill aplica um procedimento fixo: entender a tarefa, validar o frontmatter, escrever a description com os gatilhos certos, montar a estrutura de arquivos e auditar o resultado contra a spec oficial da Anthropic.

Princípio guia: **uma skill faz UMA coisa bem.** Várias skills pequenas e focadas valem mais que uma monolítica.

## Quando usar

- Criar uma skill nova do zero
- Converter um procedimento manual repetitivo (deploy, RLS, migration, design) em skill
- Corrigir uma skill que não está sendo acionada automaticamente
- Auditar/refatorar uma skill existente
- Decidir entre skill, CLAUDE.md ou subagent

## Quando NÃO usar

- Para escrever código de feature do Wellness-app (use a skill da feature ou trabalho normal)
- Para gerar documentos finais (.docx, .pdf) — isso é outra categoria

---

## Procedimento de criação (siga em ordem)

### Passo 1 — Definir escopo (UMA responsabilidade)

Determine: qual é a ÚNICA tarefa que esta skill resolve? Se a resposta tiver "e" no meio ("audita RLS E aplica migration"), são duas skills. Separe.

### Passo 2 — Escolher local

- `.claude/skills/<nome>/SKILL.md` → regra do projeto Wellness-app (versionada no Git). **Padrão.**
- `~/.claude/skills/<nome>/SKILL.md` → hábito pessoal válido em qualquer repositório.

### Passo 3 — Validar o nome (regras rígidas da spec)

- Máximo 64 caracteres
- Apenas letras minúsculas, números e hífens
- Sem palavras reservadas, sem tags XML
- O nome da pasta = o nome do comando (`/nome`)

### Passo 4 — Escrever a description (campo mais crítico)

A description decide se a skill dispara. Use a fórmula:

**[O que faz] + [Quando usar] + [Palavras-gatilho reais]**

Regras:

- Máximo 1024 caracteres, em terceira pessoa
- Inclua os termos que o usuário REALMENTE digita ("deploy", "subir produção", "vazamento entre contas")
- Description vaga = skill que nunca ativa. Especifique.

Exemplo bom:

> "Audita o Row Level Security do Supabase no Wellness-app antes do deploy. Use ao criar tabela nova, revisar policies, ou investigar vazamento de dados de saúde entre contas. Aciona com 'RLS', 'policy', 'isolamento de conta', 'segurança Supabase'."

Exemplo ruim (não fazer):

> "Ajuda com segurança." (genérico, nunca dispara)

### Passo 5 — Estruturar (progressive disclosure)

Para skills simples, um único SKILL.md basta. Para skills com conteúdo pesado:

```
<nome>/
├── SKILL.md          # corpo < 500 linhas; instruções principais
├── scripts/          # scripts executáveis (não consomem contexto até rodar)
└── reference/        # docs de apoio carregados só quando necessário
```

Regra de ouro: o SKILL.md aponta para os arquivos de apoio, não embute tudo.

### Passo 6 — Escrever o corpo (instruções)

Estrutura recomendada:

1. `## Propósito` — uma frase
2. `## Quando usar` / `## Quando NÃO usar`
3. `## Procedimento` — passos numerados, acionáveis
4. `## Saída esperada` — o formato exato do resultado
5. Exemplos concretos do Wellness-app

Mantenha sob 500 linhas. Acima disso, divida em arquivos de `reference/`.

### Passo 7 — Auditar antes de entregar

Aplique o CHECKLIST DE AUDITORIA abaixo. Só entregue se passar em todos os itens.

---

## Frontmatter — campos disponíveis

Obrigatórios:

- `name` — nome/comando
- `description` — quando invocar

Opcionais (Claude Code):

- `allowed-tools` — limita ferramentas usadas sem prompt de permissão (ex: `Read, Bash`). Só vale no Claude Code CLI, não no SDK.
- `argument-hint` — dica de autocomplete (ex: `[caminho-do-arquivo]`)
- `disable-model-invocation: true` — impede ativação automática (só manual via `/`)
- `user-invocable: false` — esconde do menu `/` (vira conhecimento de fundo)
- `context: fork` — roda como subagente isolado, sem poluir a conversa principal
- `model` — só com `context: fork`; permite rodar modelo mais barato em tarefa rotineira

Princípio de segurança: dê o MÍNIMO de `allowed-tools`. Uma skill de auditoria precisa de Read, não de Write.

---

## Decisão: skill vs CLAUDE.md vs subagent

- **Skill** → procedimento específico, acionado por contexto, reutilizável
- **CLAUDE.md** → princípios gerais sempre ativos no projeto
- **Subagent** → tarefa que precisa de contexto isolado e próprio

---

## Saída esperada

Ao criar uma skill, entregue:

1. A árvore de diretórios (ou só o SKILL.md, se single-file)
2. O conteúdo integral do SKILL.md
3. Os comandos de terminal prontos (`mkdir`, heredoc)
4. O comando de verificação (`ls .claude/skills/*/SKILL.md`)
5. O comando de commit no Git

Ao auditar, entregue tabela: item do checklist | status | correção.

---

## CHECKLIST DE AUDITORIA

Use antes de considerar qualquer skill pronta. Se algum item falhar, corrija antes de entregar.

**Frontmatter**

- [ ] `name` tem ≤ 64 caracteres
- [ ] `name` usa apenas minúsculas, números e hífens
- [ ] `name` não tem palavra reservada nem tag XML
- [ ] `description` tem ≤ 1024 caracteres
- [ ] `description` segue a fórmula: o que faz + quando usar + gatilhos
- [ ] `description` inclui os termos reais que o usuário digita
- [ ] `description` está em terceira pessoa
- [ ] `allowed-tools` contém o MÍNIMO necessário

**Escopo**

- [ ] A skill faz UMA coisa só (sem "e" escondido no escopo)
- [ ] Existe seção "Quando NÃO usar"

**Corpo**

- [ ] SKILL.md tem menos de 500 linhas
- [ ] Procedimento em passos numerados e acionáveis
- [ ] Tem seção "Saída esperada" com formato explícito
- [ ] Tem pelo menos um exemplo concreto do Wellness-app

**Teste de disparo**

- [ ] Simulou: "essa description ativaria com a frase que eu uso de verdade?"
- [ ] Confirmou que não conflita/sobrepõe com outra skill existente

**Versionamento**

- [ ] Está em `.claude/skills/` (projeto)
- [ ] Foi commitada no Git

---

## TEMPLATE EM BRANCO

Copie e preencha os colchetes:

```markdown
---
name: [nome-em-minusculas-com-hifens]
description: [O que faz]. Use quando [situação]. Aciona com "[gatilho 1]", "[gatilho 2]", "[gatilho 3]".
allowed-tools: [Read, Write, Bash — só o mínimo necessário]
---

# [Nome legível da Skill]

## Propósito
[Uma frase: que problema repetitivo isso resolve.]

## Quando usar
- [Situação 1]

## Quando NÃO usar
- [Caso fora de escopo]

## Procedimento
1. [Passo acionável]

## Saída esperada
[Formato exato do resultado.]

## Exemplo (Wellness-app)
[Caso concreto do projeto.]
```

---

## GERADOR DE ESQUELETO (opcional)

Quando precisar criar várias skills, salve este script como `gerar_skill.sh`, rode `chmod +x gerar_skill.sh` e use `./gerar_skill.sh nome-da-skill`:

```bash
#!/usr/bin/env bash
set -euo pipefail
NOME="${1:-}"
[[ -z "$NOME" ]] && { echo "Uso: ./gerar_skill.sh <nome>"; exit 1; }
[[ ! "$NOME" =~ ^[a-z0-9-]{1,64}$ ]] && { echo "Nome inválido (minúsculas, números, hífens)"; exit 1; }
BASE=".claude/skills/$NOME"
[[ -d "$BASE" ]] && { echo "Skill '$NOME' já existe"; exit 1; }
mkdir -p "$BASE"
cat > "$BASE/SKILL.md" <<EOF
---
name: $NOME
description: [DESCREVA]. Use quando [SITUAÇÃO]. Aciona com "[GATILHO 1]", "[GATILHO 2]".
allowed-tools: Read, Write, Bash
---

# $NOME

## Propósito
[Uma frase.]

## Quando usar
- [Situação]

## Quando NÃO usar
- [Fora de escopo]

## Procedimento
1. [Passo]

## Saída esperada
[Formato do resultado.]

## Exemplo (Wellness-app)
[Caso concreto.]
EOF
echo "Criada em $BASE — preencha a description com gatilhos reais."
```
