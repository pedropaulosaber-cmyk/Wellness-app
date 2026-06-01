/**
 * Conteúdo do Blog do Vivá. Artigos educativos de treino, nutrição e bem-estar.
 * Texto informativo geral — não substitui orientação profissional.
 */

export interface Secao {
  subtitulo?: string;
  paragrafos: string[];
  lista?: string[];
}

export interface Artigo {
  slug: string;
  titulo: string;
  categoria: string;
  emoji: string;
  resumo: string;
  leituraMin: number;
  secoes: Secao[];
}

export const ARTIGOS: Artigo[] = [
  {
    slug: "comece-a-treinar",
    titulo: "Como começar a treinar (sem se machucar e sem desistir)",
    categoria: "Treino",
    emoji: "🏋️",
    resumo:
      "Um guia direto para quem está saindo do zero: por onde começar, quanto treinar e como manter a constância.",
    leituraMin: 5,
    secoes: [
      {
        paragrafos: [
          "Começar é a parte mais difícil — e também a mais importante. A boa notícia: você não precisa de um plano perfeito, precisa de um plano que você consiga repetir.",
        ],
      },
      {
        subtitulo: "Comece com pouco, mas comece sempre",
        paragrafos: [
          "A recomendação da OMS é de pelo menos 150 minutos de atividade moderada por semana. Mas se hoje você faz zero, comece com 3 sessões de 20 a 30 minutos. Consistência vence intensidade no início.",
        ],
      },
      {
        subtitulo: "Técnica antes de carga",
        paragrafos: [
          "Aprenda o movimento com pouco peso. Dor articular não é normal; desconforto muscular é. Se tiver alguma lesão, adapte os exercícios — no Vivá, a anamnese já evita movimentos contraindicados para você.",
        ],
      },
      {
        subtitulo: "Progrida aos poucos",
        paragrafos: [
          "Aumente carga, repetições ou tempo de forma gradual (sobrecarga progressiva). Pequenos incrementos semanais geram grandes resultados em meses.",
        ],
        lista: [
          "Semana 1–2: aprender a técnica",
          "Semana 3–4: aumentar repetições",
          "Semana 5+: aumentar carga com segurança",
        ],
      },
    ],
  },
  {
    slug: "proteina-quanto-comer",
    titulo: "Quanta proteína você realmente precisa?",
    categoria: "Nutrição",
    emoji: "🥗",
    resumo:
      "Entenda de forma simples quanto de proteína consumir por dia conforme seu objetivo — sem exageros nem mitos.",
    leituraMin: 4,
    secoes: [
      {
        paragrafos: [
          "Proteína é o macronutriente mais saciante e essencial para manter e construir músculo. Mas você não precisa de quantidades absurdas.",
        ],
      },
      {
        subtitulo: "Faixas de referência",
        paragrafos: ["Uma referência prática, por quilo de peso corporal por dia:"],
        lista: [
          "Sedentário: ~0,8 g/kg",
          "Ativo / emagrecimento: 1,2 a 1,6 g/kg",
          "Hipertrofia: 1,6 a 2,2 g/kg",
        ],
      },
      {
        subtitulo: "Distribua ao longo do dia",
        paragrafos: [
          "Em vez de concentrar tudo numa refeição, divida a proteína entre café, almoço e jantar. Boas fontes brasileiras: ovos, frango, peixe, carne magra, feijão, lentilha, grão-de-bico, iogurte e tofu.",
        ],
      },
    ],
  },
  {
    slug: "pilates-beneficios",
    titulo: "Pilates: por que faz tão bem para a coluna e o core",
    categoria: "Bem-estar",
    emoji: "🧘",
    resumo:
      "O que é o método, para quem serve e como ele complementa qualquer rotina de treino.",
    leituraMin: 4,
    secoes: [
      {
        paragrafos: [
          "O Pilates trabalha força, mobilidade, respiração e controle do centro do corpo (o 'core'). É excelente como complemento a musculação e corrida — e ótimo para quem tem dores ou limitações.",
        ],
      },
      {
        subtitulo: "Principais benefícios",
        paragrafos: [],
        lista: [
          "Fortalece o core e estabiliza a coluna",
          "Melhora postura e consciência corporal",
          "Aumenta mobilidade e flexibilidade",
          "Baixo impacto — seguro para a maioria",
        ],
      },
      {
        subtitulo: "Como encaixar na rotina",
        paragrafos: [
          "Duas sessões por semana já trazem ganhos perceptíveis em poucas semanas. No Vivá, você pode registrar suas sessões de Pilates junto com os outros treinos.",
        ],
      },
    ],
  },
  {
    slug: "treino-funcional-em-casa",
    titulo: "Treino funcional em casa: 15 minutos que valem por uma hora",
    categoria: "Treino",
    emoji: "🤸",
    resumo:
      "Um circuito sem equipamento para fazer em qualquer lugar, com progressões para todos os níveis.",
    leituraMin: 3,
    secoes: [
      {
        paragrafos: [
          "Sem tempo ou sem academia? O treino funcional usa o peso do corpo e movimentos naturais para trabalhar força, equilíbrio e condicionamento.",
        ],
      },
      {
        subtitulo: "Circuito de 15 minutos",
        paragrafos: ["Faça 40s de cada, 20s de descanso, repita 3 vezes:"],
        lista: [
          "Agachamento livre",
          "Flexão de braço (joelhos se precisar)",
          "Prancha",
          "Afundo alternado",
          "Mountain climber",
        ],
      },
      {
        subtitulo: "Como progredir",
        paragrafos: [
          "Aumente o tempo de esforço, reduza o descanso ou adicione uma 4ª volta. Pequenos ajustes mantêm o estímulo crescente.",
        ],
      },
    ],
  },
  {
    slug: "sono-e-resultados",
    titulo: "O treino acontece no sono: por que dormir é metade do resultado",
    categoria: "Bem-estar",
    emoji: "😴",
    resumo:
      "Recuperação, hormônios e desempenho: como o sono afeta diretamente seus ganhos e seu emagrecimento.",
    leituraMin: 4,
    secoes: [
      {
        paragrafos: [
          "Você treina e se alimenta bem, mas dorme mal? Está deixando resultado na mesa. É durante o sono que o corpo se recupera e se adapta ao treino.",
        ],
      },
      {
        subtitulo: "O que a falta de sono causa",
        paragrafos: [],
        lista: [
          "Menos recuperação muscular",
          "Mais fome e vontade de ultraprocessados",
          "Queda de desempenho e foco",
        ],
      },
      {
        subtitulo: "Higiene do sono",
        paragrafos: [
          "Tente 7 a 9 horas por noite. Mantenha horários regulares, reduza telas à noite e evite cafeína no fim do dia. No Vivá, a anamnese considera seu sono ao montar seu plano.",
        ],
      },
    ],
  },
  {
    slug: "hidratacao-quanto-beber",
    titulo: "Quanta água beber por dia, de verdade",
    categoria: "Nutrição",
    emoji: "💧",
    resumo:
      "Esqueça a regra fixa dos '8 copos'. Entenda como estimar sua meta de hidratação.",
    leituraMin: 3,
    secoes: [
      {
        paragrafos: [
          "A necessidade de água varia com peso, clima e atividade física. Uma estimativa prática é cerca de 35 ml por quilo de peso por dia — ajustando para mais em dias quentes ou de treino intenso.",
        ],
      },
      {
        subtitulo: "Sinais de boa hidratação",
        paragrafos: [],
        lista: [
          "Urina clara ao longo do dia",
          "Pouca sensação de sede constante",
          "Bom desempenho nos treinos",
        ],
      },
      {
        paragrafos: [
          "No Vivá, sua meta diária de água é calculada pelo seu peso e você registra o consumo com um toque.",
        ],
      },
    ],
  },
];

export const CATEGORIAS = ["Todos", "Treino", "Nutrição", "Bem-estar"];

export function artigoPorSlug(slug: string): Artigo | undefined {
  return ARTIGOS.find((a) => a.slug === slug);
}
