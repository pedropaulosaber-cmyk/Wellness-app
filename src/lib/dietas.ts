/**
 * Dietas prontas do Vivá — modelos educativos baseados em fontes confiáveis:
 *  - Guia Alimentar para a População Brasileira (Ministério da Saúde, 2ª ed.)
 *  - Tabela Brasileira de Composição de Alimentos (TACO/Unicamp) p/ os valores
 *  - Recomendações da OMS para açúcar, sódio e atividade física
 *
 * São SUGESTÕES gerais, não prescrição. Para um plano individual, consulte
 * um nutricionista.
 */

export interface RefeicaoModelo {
  nome: string;
  itens: string[];
}

export interface Dieta {
  id: string;
  titulo: string;
  resumo: string;
  indicada: string;
  principios: string[];
  diaExemplo: RefeicaoModelo[];
  fonte: string;
}

export const DIETAS: Dieta[] = [
  {
    id: "equilibrada",
    titulo: "Alimentação equilibrada (base Guia Alimentar)",
    resumo:
      "Comida de verdade, baseada em alimentos in natura e minimamente processados. Serve para a maioria das pessoas.",
    indicada: "Manutenção da saúde, emagrecimento leve, hábito sustentável",
    principios: [
      "Faça dos alimentos in natura a base da alimentação",
      "Use óleos, sais e açúcar em pequenas quantidades",
      "Limite alimentos ultraprocessados",
      "Coma com regularidade e atenção, em ambientes apropriados",
    ],
    diaExemplo: [
      { nome: "Café da manhã", itens: ["Tapioca ou pão integral", "Ovos mexidos", "Fruta", "Café sem açúcar"] },
      { nome: "Almoço", itens: ["Arroz e feijão", "Frango ou peixe grelhado", "Salada colorida à vontade", "Legumes refogados"] },
      { nome: "Lanche", itens: ["Iogurte natural", "Fruta", "Castanhas"] },
      { nome: "Jantar", itens: ["Sopa de legumes ou omelete", "Salada", "Fruta"] },
    ],
    fonte: "Guia Alimentar para a População Brasileira — Ministério da Saúde",
  },
  {
    id: "low-carb",
    titulo: "Baixo carboidrato (low carb)",
    resumo:
      "Reduz carboidratos refinados e prioriza proteínas, gorduras boas e vegetais. Pode ajudar no controle de apetite e perda de gordura.",
    indicada: "Emagrecimento, controle glicêmico (com acompanhamento)",
    principios: [
      "Priorize proteínas magras e ovos",
      "Gorduras boas: azeite, abacate, castanhas",
      "Vegetais de baixo amido à vontade",
      "Reduza pão, arroz branco, açúcar e ultraprocessados",
    ],
    diaExemplo: [
      { nome: "Café da manhã", itens: ["Ovos", "Abacate", "Café sem açúcar"] },
      { nome: "Almoço", itens: ["Carne ou frango", "Salada com azeite", "Brócolis e legumes"] },
      { nome: "Lanche", itens: ["Queijo ou iogurte natural", "Castanhas"] },
      { nome: "Jantar", itens: ["Peixe grelhado", "Legumes assados", "Salada"] },
    ],
    fonte: "Princípios de dietas low-carb; valores TACO/Unicamp. Acompanhamento recomendado.",
  },
  {
    id: "vegetariana",
    titulo: "Vegetariana balanceada",
    resumo:
      "Sem carnes, com proteína vegetal bem distribuída (leguminosas, ovos e laticínios opcionais) para cobrir as necessidades diárias.",
    indicada: "Quem não consome carne e quer manter proteína adequada",
    principios: [
      "Combine leguminosas + cereais (ex.: arroz com feijão)",
      "Inclua boas fontes de ferro e B12 (suplementar se vegano)",
      "Proteínas: feijão, lentilha, grão-de-bico, tofu, ovos",
      "Variedade de vegetais e frutas todos os dias",
    ],
    diaExemplo: [
      { nome: "Café da manhã", itens: ["Aveia com fruta", "Pasta de amendoim", "Iogurte (ou vegetal)"] },
      { nome: "Almoço", itens: ["Arroz integral e feijão", "Tofu ou grão-de-bico", "Salada e legumes"] },
      { nome: "Lanche", itens: ["Fruta", "Mix de castanhas"] },
      { nome: "Jantar", itens: ["Lentilha", "Legumes refogados", "Salada"] },
    ],
    fonte: "Guia Alimentar (MS) + diretrizes de dieta vegetariana; valores TACO.",
  },
  {
    id: "ganho-massa",
    titulo: "Ganho de massa (hipertrofia)",
    resumo:
      "Leve superávit calórico com proteína distribuída ao longo do dia para suporte ao treino de força.",
    indicada: "Quem treina força e quer ganhar músculo",
    principios: [
      "Proteína em todas as refeições (~1.6–2.2 g/kg/dia)",
      "Carboidratos para energia no treino",
      "Refeição com proteína + carbo após treinar",
      "Hidratação e sono adequados",
    ],
    diaExemplo: [
      { nome: "Café da manhã", itens: ["Ovos + aveia", "Fruta", "Pasta de amendoim"] },
      { nome: "Pré-treino", itens: ["Banana", "Tapioca ou pão integral"] },
      { nome: "Almoço", itens: ["Arroz, feijão", "Frango ou carne", "Legumes e salada"] },
      { nome: "Pós-treino / Lanche", itens: ["Whey ou iogurte", "Fruta", "Batata-doce"] },
      { nome: "Jantar", itens: ["Carne/peixe", "Arroz integral", "Legumes"] },
    ],
    fonte: "Recomendações de proteína para hipertrofia (ISSN); valores TACO.",
  },
];
