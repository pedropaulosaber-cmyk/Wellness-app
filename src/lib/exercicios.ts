/**
 * Catálogo de exercícios do Vivá, por modalidade.
 * `instrucoes` é uma dica curta de execução (segurança vem antes de carga).
 */
export type Modalidade =
  | "Musculação"
  | "Corrida"
  | "Bike"
  | "Natação"
  | "Funcional"
  | "Pilates";

export type TipoExercicio = "forca" | "cardio" | "mobilidade";

export interface Exercicio {
  id: string;
  nome: string;
  modalidade: Modalidade;
  tipo: TipoExercicio;
  grupo?: string; // grupo muscular (para musculação)
  instrucoes: string;
  /** palavras de lesão que contraindicam (ex.: "joelho", "ombro", "lombar") */
  evitarSe?: string[];
}

export const EXERCICIOS: Exercicio[] = [
  // Peito
  { id: "supino_reto", nome: "Supino reto", modalidade: "Musculação", tipo: "forca", grupo: "Peito", instrucoes: "Barra na linha do mamilo; cotovelos ~45°.", evitarSe: ["ombro"] },
  { id: "supino_incl", nome: "Supino inclinado com halteres", modalidade: "Musculação", tipo: "forca", grupo: "Peito", instrucoes: "Banco a 30–45°; desça controlado." },
  { id: "crucifixo", nome: "Crucifixo", modalidade: "Musculação", tipo: "forca", grupo: "Peito", instrucoes: "Leve flexão de cotovelo fixa; abra o peito." },
  // Costas
  { id: "puxada", nome: "Puxada frente", modalidade: "Musculação", tipo: "forca", grupo: "Costas", instrucoes: "Puxe à clavícula; escápulas para baixo." },
  { id: "remada_curv", nome: "Remada curvada", modalidade: "Musculação", tipo: "forca", grupo: "Costas", instrucoes: "Coluna neutra; puxe ao umbigo.", evitarSe: ["lombar"] },
  { id: "remada_baixa", nome: "Remada baixa", modalidade: "Musculação", tipo: "forca", grupo: "Costas", instrucoes: "Tronco estável; cotovelos rentes." },
  // Pernas
  { id: "agachamento", nome: "Agachamento livre", modalidade: "Musculação", tipo: "forca", grupo: "Pernas", instrucoes: "Joelhos na direção dos pés; desça até paralelo.", evitarSe: ["joelho", "lombar"] },
  { id: "leg_press", nome: "Leg press", modalidade: "Musculação", tipo: "forca", grupo: "Pernas", instrucoes: "Não trave o joelho no topo." },
  { id: "extensora", nome: "Cadeira extensora", modalidade: "Musculação", tipo: "forca", grupo: "Pernas", instrucoes: "Movimento controlado; segure no topo.", evitarSe: ["joelho"] },
  { id: "stiff", nome: "Stiff", modalidade: "Musculação", tipo: "forca", grupo: "Pernas", instrucoes: "Quadril para trás; sinta o posterior.", evitarSe: ["lombar"] },
  { id: "panturrilha", nome: "Panturrilha em pé", modalidade: "Musculação", tipo: "forca", grupo: "Pernas", instrucoes: "Amplitude total; pausa no topo." },
  // Ombro / braços
  { id: "desenvolvimento", nome: "Desenvolvimento", modalidade: "Musculação", tipo: "forca", grupo: "Ombro", instrucoes: "Não hiperestenda a lombar.", evitarSe: ["ombro"] },
  { id: "elevacao_lat", nome: "Elevação lateral", modalidade: "Musculação", tipo: "forca", grupo: "Ombro", instrucoes: "Suba até a linha do ombro." },
  { id: "rosca_direta", nome: "Rosca direta", modalidade: "Musculação", tipo: "forca", grupo: "Bíceps", instrucoes: "Cotovelos fixos ao lado do corpo." },
  { id: "triceps_pulley", nome: "Tríceps na polia", modalidade: "Musculação", tipo: "forca", grupo: "Tríceps", instrucoes: "Cotovelos fixos; estenda até o fim." },
  // Core / peso corporal
  { id: "prancha", nome: "Prancha", modalidade: "Funcional", tipo: "forca", grupo: "Core", instrucoes: "Corpo alinhado; abdômen contraído." },
  { id: "flexao", nome: "Flexão de braço", modalidade: "Funcional", tipo: "forca", grupo: "Peito", instrucoes: "Corpo reto; desça o peito ao chão." },
  { id: "burpee", nome: "Burpee", modalidade: "Funcional", tipo: "cardio", instrucoes: "Agache, prancha, salte.", evitarSe: ["joelho", "ombro"] },
  { id: "mountain", nome: "Mountain climber", modalidade: "Funcional", tipo: "cardio", instrucoes: "Quadril baixo; ritmo constante." },
  // Cardio
  { id: "corrida_cont", nome: "Corrida contínua", modalidade: "Corrida", tipo: "cardio", instrucoes: "Ritmo confortável (consegue conversar).", evitarSe: ["joelho"] },
  { id: "corrida_int", nome: "Corrida intervalada", modalidade: "Corrida", tipo: "cardio", instrucoes: "Alterna tiros fortes e trote.", evitarSe: ["joelho"] },
  { id: "bike_cont", nome: "Bike contínua", modalidade: "Bike", tipo: "cardio", instrucoes: "Cadência 80–90 rpm." },
  { id: "bike_int", nome: "Bike intervalada", modalidade: "Bike", tipo: "cardio", instrucoes: "Sprints de 30s com recuperação." },
  { id: "natacao", nome: "Natação", modalidade: "Natação", tipo: "cardio", instrucoes: "Foque na respiração e técnica." },
  // Pilates
  { id: "pilates_solo", nome: "Pilates solo (mat)", modalidade: "Pilates", tipo: "mobilidade", instrucoes: "Respiração e controle do centro." },
];

export const EXERCICIO_POR_ID = new Map(EXERCICIOS.map((e) => [e.id, e]));

/** Verifica se um exercício é contraindicado pelas lesões relatadas. */
export function contraindicado(ex: Exercicio, lesoes?: string | null): boolean {
  if (!ex.evitarSe || !lesoes) return false;
  const txt = lesoes.toLowerCase();
  return ex.evitarSe.some((k) => txt.includes(k));
}
