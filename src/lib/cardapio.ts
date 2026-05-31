/**
 * Gerador de cardápio do Vivá.
 *
 * Distribui as calorias-alvo entre as refeições e escolhe alimentos brasileiros
 * (taco.ts) respeitando as restrições, escalando as porções para bater a meta
 * calórica de cada refeição. `variacao` permite "trocar" a refeição.
 */
import {
  ALIMENTO_POR_ID,
  alimentosPermitidos,
  type Alimento,
} from "@/lib/taco";

export interface ItemCardapio {
  alimentoId: string;
  nome: string;
  gramas: number;
  kcal: number;
  proteina: number;
  carbo: number;
  gordura: number;
}

export interface Refeicao {
  chave: string;
  titulo: string;
  alvoKcal: number;
  itens: ItemCardapio[];
  kcal: number;
  proteina: number;
  carbo: number;
  gordura: number;
}

// Distribuição calórica por refeição (soma = 1).
const REFEICOES = [
  { chave: "cafe", titulo: "Café da manhã", pct: 0.25, slots: ["carbo", "proteina_leve", "fruta"] },
  { chave: "almoco", titulo: "Almoço", pct: 0.3, slots: ["carbo", "proteina", "leguminosa", "vegetal"] },
  { chave: "lanche", titulo: "Lanche", pct: 0.1, slots: ["laticinio_fruta", "gordura"] },
  { chave: "pre_treino", titulo: "Pré-treino", pct: 0.1, slots: ["fruta_carbo", "proteina_leve"] },
  { chave: "jantar", titulo: "Jantar", pct: 0.25, slots: ["carbo", "proteina", "vegetal"] },
] as const;

// Candidatos por slot (ids de taco.ts) + porção base (g) de referência.
const SLOTS: Record<string, { ids: string[]; base: number }> = {
  carbo: { ids: ["arroz", "arroz_int", "batata_doce", "batata", "mandioca", "macarrao"], base: 120 },
  fruta_carbo: { ids: ["banana", "tapioca", "aveia"], base: 80 },
  proteina: { ids: ["frango", "patinho", "tilapia", "atum", "tofu"], base: 130 },
  proteina_leve: { ids: ["ovo", "iogurte", "cottage", "whey"], base: 60 },
  leguminosa: { ids: ["feijao", "lentilha", "grao_bico"], base: 80 },
  vegetal: { ids: ["brocolis", "cenoura", "tomate", "alface"], base: 80 },
  fruta: { ids: ["banana", "maca", "mamao", "morango"], base: 100 },
  laticinio_fruta: { ids: ["iogurte", "maca", "mamao"], base: 120 },
  gordura: { ids: ["castanha", "pasta_amend", "abacate"], base: 20 },
};

function itemDe(a: Alimento, gramas: number): ItemCardapio {
  const f = gramas / 100;
  return {
    alimentoId: a.id,
    nome: a.nome,
    gramas: Math.round(gramas),
    kcal: Math.round(a.kcal * f),
    proteina: Math.round(a.proteina * f),
    carbo: Math.round(a.carbo * f),
    gordura: Math.round(a.gordura * f),
  };
}

/** Escolhe o primeiro candidato permitido do slot, deslocado por `variacao`. */
function escolher(slot: string, permitidos: Set<string>, variacao: number): Alimento | null {
  const cfg = SLOTS[slot];
  if (!cfg) return null;
  const disp = cfg.ids.filter((id) => permitidos.has(id));
  if (!disp.length) return null;
  const id = disp[variacao % disp.length];
  return ALIMENTO_POR_ID.get(id) ?? null;
}

function gerarRefeicao(
  meta: (typeof REFEICOES)[number],
  caloriasAlvo: number,
  permitidos: Set<string>,
  variacao: number
): Refeicao {
  const alvoKcal = Math.round(caloriasAlvo * meta.pct);

  // 1) monta itens com porção base
  const base: { a: Alimento; base: number }[] = [];
  meta.slots.forEach((slot, i) => {
    const a = escolher(slot, permitidos, variacao + i);
    if (a) base.push({ a, base: SLOTS[slot].base });
  });

  // 2) escala as porções para bater a meta calórica
  const kcalBase = base.reduce((s, b) => s + (b.a.kcal * b.base) / 100, 0) || 1;
  const fator = alvoKcal / kcalBase;

  const itens = base.map((b) =>
    itemDe(b.a, Math.max(10, Math.min(b.base * fator, b.base * 2.5)))
  );

  const tot = itens.reduce(
    (s, it) => ({
      kcal: s.kcal + it.kcal,
      proteina: s.proteina + it.proteina,
      carbo: s.carbo + it.carbo,
      gordura: s.gordura + it.gordura,
    }),
    { kcal: 0, proteina: 0, carbo: 0, gordura: 0 }
  );

  return { chave: meta.chave, titulo: meta.titulo, alvoKcal, itens, ...tot };
}

/**
 * Gera o cardápio do dia.
 * @param variacoes mapa opcional refeicao→variacao (para "trocar" individualmente)
 */
export function gerarCardapio(
  caloriasAlvo: number,
  restricoes: string[],
  variacoes: Record<string, number> = {}
): Refeicao[] {
  const permitidos = new Set(alimentosPermitidos(restricoes).map((a) => a.id));
  return REFEICOES.map((m) =>
    gerarRefeicao(m, caloriasAlvo, permitidos, variacoes[m.chave] ?? 0)
  );
}
