/**
 * Gerador de plano semanal de treino do Vivá.
 * Adapta o split às modalidades escolhidas, ao objetivo, à experiência e às
 * lesões relatadas na anamnese (contraindicações são respeitadas).
 */
import {
  EXERCICIOS,
  EXERCICIO_POR_ID,
  contraindicado,
  type Exercicio,
  type Modalidade,
} from "@/lib/exercicios";
import type { Objetivo } from "@/lib/nutrition";

export interface ItemForca {
  exercicioId: string;
  nome: string;
  grupo?: string;
  series: number;
  repsAlvo: string; // ex.: "8–12"
  instrucoes: string;
}

export interface SessaoPlanejada {
  chave: string;
  titulo: string;
  modalidade: Modalidade;
  tipo: "forca" | "cardio" | "mobilidade";
  itens: ItemForca[]; // para força
  descricao?: string; // para cardio/mobilidade
  duracaoMin?: number;
}

// Séries/reps conforme objetivo
function prescricao(objetivo: Objetivo): { series: number; reps: string } {
  switch (objetivo) {
    case "ganhar_massa":
      return { series: 4, reps: "8–12" };
    case "emagrecer":
      return { series: 3, reps: "12–15" };
    default:
      return { series: 3, reps: "10–12" };
  }
}

function itensDoGrupo(
  grupos: string[],
  objetivo: Objetivo,
  lesoes: string | null | undefined,
  porGrupo = 2
): ItemForca[] {
  const { series, reps } = prescricao(objetivo);
  const itens: ItemForca[] = [];
  for (const g of grupos) {
    const candidatos = EXERCICIOS.filter(
      (e) => e.modalidade === "Musculação" && e.grupo === g && !contraindicado(e, lesoes)
    );
    candidatos.slice(0, porGrupo).forEach((e) =>
      itens.push({
        exercicioId: e.id,
        nome: e.nome,
        grupo: e.grupo,
        series,
        repsAlvo: reps,
        instrucoes: e.instrucoes,
      })
    );
  }
  return itens;
}

function splitMusculacao(
  experiencia: string | null | undefined,
  objetivo: Objetivo,
  lesoes: string | null | undefined
): SessaoPlanejada[] {
  const base = (chave: string, titulo: string, grupos: string[]): SessaoPlanejada => ({
    chave,
    titulo,
    modalidade: "Musculação",
    tipo: "forca",
    itens: itensDoGrupo(grupos, objetivo, lesoes),
  });

  if (experiencia === "avancado") {
    return [
      base("push", "Treino A — Empurrar", ["Peito", "Ombro", "Tríceps"]),
      base("pull", "Treino B — Puxar", ["Costas", "Bíceps"]),
      base("legs", "Treino C — Pernas", ["Pernas"]),
    ];
  }
  if (experiencia === "intermediario") {
    return [
      base("upper", "Treino A — Superior", ["Peito", "Costas", "Ombro"]),
      base("lower", "Treino B — Inferior", ["Pernas"]),
      base("bracos", "Treino C — Braços e core", ["Bíceps", "Tríceps"]),
    ];
  }
  // iniciante → full body 2x
  return [
    base("full_a", "Full body A", ["Peito", "Costas", "Pernas"]),
    base("full_b", "Full body B", ["Ombro", "Pernas", "Costas"]),
  ];
}

function sessaoCardio(modalidade: Modalidade, lesoes: string | null | undefined): SessaoPlanejada[] {
  const disp = EXERCICIOS.filter(
    (e) => e.modalidade === modalidade && !contraindicado(e, lesoes)
  );
  return disp.map((e: Exercicio) => ({
    chave: e.id,
    titulo: e.nome,
    modalidade,
    tipo: e.tipo,
    itens: [],
    descricao: e.instrucoes,
    duracaoMin: e.tipo === "cardio" ? 30 : 40,
  }));
}

/** Monta o plano semanal a partir das modalidades escolhidas. */
export function gerarPlanoSemanal(input: {
  modalidades: string[];
  objetivo: Objetivo;
  experienciaTreino?: string | null;
  lesoes?: string | null;
}): SessaoPlanejada[] {
  const { modalidades, objetivo, experienciaTreino, lesoes } = input;
  const sessoes: SessaoPlanejada[] = [];

  if (modalidades.includes("Musculação")) {
    sessoes.push(...splitMusculacao(experienciaTreino, objetivo, lesoes));
  }
  (["Corrida", "Bike", "Natação", "Funcional", "Pilates"] as Modalidade[]).forEach((m) => {
    if (modalidades.includes(m)) sessoes.push(...sessaoCardio(m, lesoes));
  });

  // fallback: se nada escolhido, oferece full body
  if (!sessoes.length) sessoes.push(...splitMusculacao("iniciante", objetivo, lesoes));
  return sessoes;
}

/** Sugestão de progressão de carga (overload progressivo simples). */
export function sugerirCarga(ultimaCargaKg: number | null): {
  sugestao: number | null;
  texto: string;
} {
  if (ultimaCargaKg == null) return { sugestao: null, texto: "Defina uma carga confortável." };
  // +2.5 kg para membros inferiores tende a ser viável; manter simples: +2.5
  const sugestao = Math.round((ultimaCargaKg + 2.5) * 2) / 2;
  return {
    sugestao,
    texto: `Última: ${ultimaCargaKg} kg. Tente ${sugestao} kg se completou todas as reps.`,
  };
}

export function exercicioNome(id: string): string {
  return EXERCICIO_POR_ID.get(id)?.nome ?? id;
}
