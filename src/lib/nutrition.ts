/**
 * Motor nutricional do Vivá — FONTE ÚNICA DE VERDADE.
 *
 * Toda conta de calorias/macros do app passa por aqui. Não duplique
 * fórmulas em outras telas: importe destas funções.
 *
 * Base científica:
 *  - BMR: equação de Mifflin-St Jeor (1990), recomendada pela ADA.
 *  - TDEE: BMR × fator de atividade.
 *  - IMC: OMS.
 *  - Hidratação: ~35 ml por kg de peso.
 *
 * ⚠️ AVISO: estes valores são ESTIMATIVAS para orientação geral, não
 * prescrição médica ou nutricional. Condições de saúde exigem um profissional.
 */

// ────────────────────────────────────────────────────────────
// Tipos
// ────────────────────────────────────────────────────────────

export type Sexo = "masculino" | "feminino";

/** Nível de atividade física → fator multiplicador do TDEE. */
export type NivelAtividade =
  | "sedentario"
  | "leve"
  | "moderado"
  | "intenso"
  | "muito_intenso";

/** Objetivo do usuário → ajuste calórico sobre o TDEE. */
export type Objetivo = "emagrecer" | "manter" | "ganhar_massa";

export interface DadosCorporais {
  sexo: Sexo;
  idade: number; // anos
  pesoKg: number; // kg
  alturaCm: number; // cm
  nivelAtividade: NivelAtividade;
  objetivo: Objetivo;
}

export interface DivisaoMacros {
  /** Frações que somam 1 (ex.: 0.3 / 0.4 / 0.3). */
  proteina: number;
  carboidrato: number;
  gordura: number;
}

export interface Macros {
  proteinaG: number;
  carboidratoG: number;
  gorduraG: number;
}

export interface PlanoNutricional {
  bmr: number; // kcal/dia (metabolismo basal)
  tdee: number; // kcal/dia (gasto total)
  caloriasAlvo: number; // kcal/dia ajustadas ao objetivo
  macros: Macros; // gramas/dia
  divisao: DivisaoMacros; // frações usadas
  aguaMl: number; // meta diária de água
  imc: number; // índice de massa corporal
  classificacaoImc: string; // faixa da OMS
}

// ────────────────────────────────────────────────────────────
// Constantes
// ────────────────────────────────────────────────────────────

export const FATOR_ATIVIDADE: Record<NivelAtividade, number> = {
  sedentario: 1.2,
  leve: 1.375,
  moderado: 1.55,
  intenso: 1.725,
  muito_intenso: 1.9,
};

/** Ajuste calórico por objetivo (déficit/superávit moderado e seguro). */
export const AJUSTE_OBJETIVO: Record<Objetivo, number> = {
  emagrecer: -0.2, // déficit de 20%
  manter: 0,
  ganhar_massa: 0.1, // superávit de 10%
};

/** Divisão de macros padrão por objetivo (frações que somam 1). */
export const DIVISAO_PADRAO: Record<Objetivo, DivisaoMacros> = {
  // Mais proteína no déficit para preservar massa magra
  emagrecer: { proteina: 0.35, carboidrato: 0.35, gordura: 0.3 },
  manter: { proteina: 0.3, carboidrato: 0.4, gordura: 0.3 },
  // Mais carboidrato no superávit para suporte ao treino
  ganhar_massa: { proteina: 0.3, carboidrato: 0.45, gordura: 0.25 },
};

const KCAL_POR_GRAMA = { proteina: 4, carboidrato: 4, gordura: 9 } as const;

// ────────────────────────────────────────────────────────────
// Validação
// ────────────────────────────────────────────────────────────

/** Lança erro se os dados corporais forem fisicamente impossíveis. */
function validarDados(d: DadosCorporais): void {
  if (d.idade <= 0 || d.idade > 120) {
    throw new Error("Idade inválida (esperado 1–120 anos).");
  }
  if (d.pesoKg <= 0 || d.pesoKg > 500) {
    throw new Error("Peso inválido (esperado 1–500 kg).");
  }
  // Proteção contra unidade trocada (altura em metros em vez de cm)
  if (d.alturaCm <= 50 || d.alturaCm > 260) {
    throw new Error(
      "Altura inválida (esperado 50–260 cm). Verifique se está em centímetros."
    );
  }
}

// ────────────────────────────────────────────────────────────
// Cálculos primitivos (funções puras, testáveis)
// ────────────────────────────────────────────────────────────

/** BMR por Mifflin-St Jeor (kcal/dia). */
export function calcularBmr(d: DadosCorporais): number {
  const base = 10 * d.pesoKg + 6.25 * d.alturaCm - 5 * d.idade;
  return d.sexo === "masculino" ? base + 5 : base - 161;
}

/** TDEE = BMR × fator de atividade (kcal/dia). */
export function calcularTdee(d: DadosCorporais): number {
  return calcularBmr(d) * FATOR_ATIVIDADE[d.nivelAtividade];
}

/** Calorias-alvo aplicando o ajuste do objetivo sobre o TDEE. */
export function calcularCaloriasAlvo(d: DadosCorporais): number {
  const tdee = calcularTdee(d);
  return tdee * (1 + AJUSTE_OBJETIVO[d.objetivo]);
}

/** Converte calorias + divisão em gramas de cada macro. */
export function calcularMacros(
  caloriasAlvo: number,
  divisao: DivisaoMacros
): Macros {
  return {
    proteinaG: (caloriasAlvo * divisao.proteina) / KCAL_POR_GRAMA.proteina,
    carboidratoG: (caloriasAlvo * divisao.carboidrato) / KCAL_POR_GRAMA.carboidrato,
    gorduraG: (caloriasAlvo * divisao.gordura) / KCAL_POR_GRAMA.gordura,
  };
}

/** Meta de hidratação (ml/dia) ≈ 35 ml por kg. */
export function calcularAguaMl(pesoKg: number): number {
  return 35 * pesoKg;
}

/** IMC = peso / altura². */
export function calcularImc(pesoKg: number, alturaCm: number): number {
  const m = alturaCm / 100;
  return pesoKg / (m * m);
}

/** Classificação do IMC pelas faixas da OMS. */
export function classificarImc(imc: number): string {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Sobrepeso";
  return "Obesidade";
}

// ────────────────────────────────────────────────────────────
// Orquestrador — gera o plano completo
// ────────────────────────────────────────────────────────────

/**
 * Monta o plano nutricional completo a partir dos dados corporais.
 * É a função que o app deve chamar (não as primitivas, em geral).
 *
 * @param divisaoCustom divisão de macros opcional (sobrescreve o padrão do objetivo)
 */
export function gerarPlanoNutricional(
  d: DadosCorporais,
  divisaoCustom?: DivisaoMacros
): PlanoNutricional {
  validarDados(d);

  const bmr = calcularBmr(d);
  const tdee = calcularTdee(d);
  const caloriasAlvo = calcularCaloriasAlvo(d);
  const divisao = divisaoCustom ?? DIVISAO_PADRAO[d.objetivo];

  const imc = calcularImc(d.pesoKg, d.alturaCm);

  return {
    bmr,
    tdee,
    caloriasAlvo,
    macros: calcularMacros(caloriasAlvo, divisao),
    divisao,
    aguaMl: calcularAguaMl(d.pesoKg),
    imc,
    classificacaoImc: classificarImc(imc),
  };
}

/** Arredonda um plano para exibição (nunca arredonde no meio do cálculo). */
export function planoParaExibicao(p: PlanoNutricional) {
  return {
    bmr: Math.round(p.bmr),
    tdee: Math.round(p.tdee),
    caloriasAlvo: Math.round(p.caloriasAlvo),
    macros: {
      proteinaG: Math.round(p.macros.proteinaG),
      carboidratoG: Math.round(p.macros.carboidratoG),
      gorduraG: Math.round(p.macros.gorduraG),
    },
    aguaMl: Math.round(p.aguaMl),
    aguaL: Math.round(p.aguaMl / 100) / 10, // 1 casa decimal
    imc: Math.round(p.imc * 10) / 10,
    classificacaoImc: p.classificacaoImc,
  };
}
