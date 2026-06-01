/**
 * Conquistas (badges) e cálculo de streak do Vivá.
 * Engajamento importa porque, sendo pagamento único, o uso contínuo é o que
 * gera retenção e indicação boca a boca.
 */

export interface Conquista {
  id: string;
  emoji: string;
  titulo: string;
  descricao: string;
  conquistada: boolean;
}

export interface StatsEngajamento {
  totalTreinos: number;
  totalRefeicoes: number;
  registrosPeso: number;
  streak: number;
}

/**
 * Calcula a sequência (streak) de dias consecutivos com QUALQUER atividade,
 * terminando hoje ou ontem (não quebra se ainda não usou hoje).
 * @param diasComAtividade conjunto de dias YYYY-MM-DD com atividade
 * @param hoje dia atual YYYY-MM-DD
 */
export function calcularStreak(diasComAtividade: Set<string>, hoje: string): number {
  if (diasComAtividade.size === 0) return 0;

  const d = new Date(hoje + "T12:00:00");
  // Se não houve atividade hoje, começa a contar a partir de ontem.
  if (!diasComAtividade.has(hoje)) d.setDate(d.getDate() - 1);

  let streak = 0;
  while (true) {
    const chave = d.toISOString().slice(0, 10);
    if (diasComAtividade.has(chave)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else break;
  }
  return streak;
}

export function calcularConquistas(s: StatsEngajamento): Conquista[] {
  return [
    {
      id: "primeiro_treino",
      emoji: "🏁",
      titulo: "Primeiro passo",
      descricao: "Concluiu o primeiro treino",
      conquistada: s.totalTreinos >= 1,
    },
    {
      id: "dez_treinos",
      emoji: "💪",
      titulo: "Constância",
      descricao: "10 treinos concluídos",
      conquistada: s.totalTreinos >= 10,
    },
    {
      id: "cinquenta_treinos",
      emoji: "🔥",
      titulo: "Máquina",
      descricao: "50 treinos concluídos",
      conquistada: s.totalTreinos >= 50,
    },
    {
      id: "streak_7",
      emoji: "📆",
      titulo: "Uma semana",
      descricao: "7 dias seguidos ativo",
      conquistada: s.streak >= 7,
    },
    {
      id: "streak_30",
      emoji: "🏆",
      titulo: "Um mês imparável",
      descricao: "30 dias seguidos ativo",
      conquistada: s.streak >= 30,
    },
    {
      id: "nutri_primeira",
      emoji: "🥗",
      titulo: "De olho na dieta",
      descricao: "Registrou a primeira refeição",
      conquistada: s.totalRefeicoes >= 1,
    },
    {
      id: "peso_acompanha",
      emoji: "⚖️",
      titulo: "Acompanhando",
      descricao: "Registrou o peso ao menos 3 vezes",
      conquistada: s.registrosPeso >= 3,
    },
  ];
}
