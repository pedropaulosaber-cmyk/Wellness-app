/**
 * Tabela de alimentos brasileiros (valores por 100 g), baseada na TACO/TBCA.
 * Valores aproximados para fins de planejamento — não são laudo nutricional.
 */
export type GrupoAlimento =
  | "proteina"
  | "carbo"
  | "leguminosa"
  | "gordura"
  | "vegetal"
  | "fruta"
  | "laticinio";

export interface Alimento {
  id: string;
  nome: string;
  grupo: GrupoAlimento;
  /** por 100 g */
  kcal: number;
  proteina: number;
  carbo: number;
  gordura: number;
  /** tags de restrição que EXCLUEM este alimento */
  excluiSe?: string[]; // ex.: ["Vegano","Vegetariano","Sem lactose"]
}

export const ALIMENTOS: Alimento[] = [
  // Proteínas animais
  { id: "frango", nome: "Peito de frango grelhado", grupo: "proteina", kcal: 165, proteina: 31, carbo: 0, gordura: 3.6, excluiSe: ["Vegetariano", "Vegano"] },
  { id: "patinho", nome: "Patinho bovino grelhado", grupo: "proteina", kcal: 219, proteina: 35, carbo: 0, gordura: 7, excluiSe: ["Vegetariano", "Vegano"] },
  { id: "tilapia", nome: "Tilápia grelhada", grupo: "proteina", kcal: 128, proteina: 26, carbo: 0, gordura: 2.7, excluiSe: ["Vegetariano", "Vegano"] },
  { id: "atum", nome: "Atum em água", grupo: "proteina", kcal: 116, proteina: 26, carbo: 0, gordura: 1, excluiSe: ["Vegetariano", "Vegano"] },
  { id: "ovo", nome: "Ovo cozido", grupo: "proteina", kcal: 155, proteina: 13, carbo: 1.1, gordura: 11, excluiSe: ["Vegano"] },
  // Proteínas vegetais / leguminosas
  { id: "feijao", nome: "Feijão carioca cozido", grupo: "leguminosa", kcal: 76, proteina: 4.8, carbo: 13.6, gordura: 0.5 },
  { id: "lentilha", nome: "Lentilha cozida", grupo: "leguminosa", kcal: 116, proteina: 9, carbo: 20, gordura: 0.4 },
  { id: "grao_bico", nome: "Grão-de-bico cozido", grupo: "leguminosa", kcal: 164, proteina: 8.9, carbo: 27, gordura: 2.6 },
  { id: "tofu", nome: "Tofu", grupo: "proteina", kcal: 76, proteina: 8, carbo: 1.9, gordura: 4.8 },
  // Laticínios / suplemento
  { id: "iogurte", nome: "Iogurte natural integral", grupo: "laticinio", kcal: 61, proteina: 3.5, carbo: 4.7, gordura: 3.3, excluiSe: ["Vegano", "Sem lactose"] },
  { id: "cottage", nome: "Queijo cottage", grupo: "laticinio", kcal: 98, proteina: 11, carbo: 3.4, gordura: 4.3, excluiSe: ["Vegano", "Sem lactose"] },
  { id: "leite_desn", nome: "Leite desnatado", grupo: "laticinio", kcal: 35, proteina: 3.4, carbo: 4.9, gordura: 0.2, excluiSe: ["Vegano", "Sem lactose"] },
  { id: "whey", nome: "Whey protein", grupo: "proteina", kcal: 380, proteina: 80, carbo: 8, gordura: 6, excluiSe: ["Vegano"] },
  // Carboidratos
  { id: "arroz", nome: "Arroz branco cozido", grupo: "carbo", kcal: 128, proteina: 2.5, carbo: 28, gordura: 0.2 },
  { id: "arroz_int", nome: "Arroz integral cozido", grupo: "carbo", kcal: 124, proteina: 2.6, carbo: 25.8, gordura: 1 },
  { id: "batata_doce", nome: "Batata-doce cozida", grupo: "carbo", kcal: 86, proteina: 1.6, carbo: 20, gordura: 0.1 },
  { id: "batata", nome: "Batata inglesa cozida", grupo: "carbo", kcal: 87, proteina: 1.9, carbo: 20, gordura: 0.1 },
  { id: "mandioca", nome: "Mandioca cozida", grupo: "carbo", kcal: 125, proteina: 0.6, carbo: 30, gordura: 0.3 },
  { id: "macarrao", nome: "Macarrão cozido", grupo: "carbo", kcal: 158, proteina: 5.8, carbo: 30, gordura: 0.9, excluiSe: ["Sem glúten"] },
  { id: "pao_int", nome: "Pão integral", grupo: "carbo", kcal: 253, proteina: 9, carbo: 43, gordura: 4, excluiSe: ["Sem glúten"] },
  { id: "aveia", nome: "Aveia em flocos", grupo: "carbo", kcal: 394, proteina: 14, carbo: 67, gordura: 8 },
  { id: "tapioca", nome: "Tapioca", grupo: "carbo", kcal: 240, proteina: 0, carbo: 53, gordura: 0 },
  // Gorduras
  { id: "azeite", nome: "Azeite de oliva", grupo: "gordura", kcal: 884, proteina: 0, carbo: 0, gordura: 100 },
  { id: "pasta_amend", nome: "Pasta de amendoim", grupo: "gordura", kcal: 588, proteina: 25, carbo: 20, gordura: 50 },
  { id: "castanha", nome: "Castanha-do-pará", grupo: "gordura", kcal: 643, proteina: 14, carbo: 15, gordura: 63 },
  { id: "abacate", nome: "Abacate", grupo: "gordura", kcal: 96, proteina: 1.2, carbo: 6, gordura: 8.4 },
  // Vegetais
  { id: "brocolis", nome: "Brócolis cozido", grupo: "vegetal", kcal: 25, proteina: 2.1, carbo: 4, gordura: 0.4 },
  { id: "cenoura", nome: "Cenoura cozida", grupo: "vegetal", kcal: 30, proteina: 0.8, carbo: 6.7, gordura: 0.2 },
  { id: "tomate", nome: "Tomate", grupo: "vegetal", kcal: 15, proteina: 1.1, carbo: 3, gordura: 0.2 },
  { id: "alface", nome: "Alface", grupo: "vegetal", kcal: 11, proteina: 1.3, carbo: 1.7, gordura: 0.2 },
  // Frutas
  { id: "banana", nome: "Banana", grupo: "fruta", kcal: 92, proteina: 1.4, carbo: 23, gordura: 0.1 },
  { id: "maca", nome: "Maçã", grupo: "fruta", kcal: 56, proteina: 0.3, carbo: 15, gordura: 0.4 },
  { id: "mamao", nome: "Mamão", grupo: "fruta", kcal: 40, proteina: 0.5, carbo: 10, gordura: 0.1 },
  { id: "morango", nome: "Morango", grupo: "fruta", kcal: 30, proteina: 0.9, carbo: 6.8, gordura: 0.3 },
];

export const ALIMENTO_POR_ID = new Map(ALIMENTOS.map((a) => [a.id, a]));

/** Filtra alimentos conforme as restrições do usuário. */
export function alimentosPermitidos(restricoes: string[]): Alimento[] {
  if (!restricoes.length || restricoes.includes("Nenhuma")) return ALIMENTOS;
  return ALIMENTOS.filter(
    (a) => !a.excluiSe?.some((r) => restricoes.includes(r))
  );
}
