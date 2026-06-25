// Conteúdo do site Gaspar Lopes Alfaiataria.
// Edite aqui para mudar textos, preços, produtos e peças.

export interface Produto {
  id: string;
  slug: string;
  nome: string;
  tipo: string; // "Camisa Social" | "Camiseta" | "Camisa"
  descricao: string;
  precoCentavos: number;
  precoLabel: string;
  tag?: string;
  destaque?: boolean;
  img?: string; // caminho opcional da foto
}

export interface PecaAutoral {
  slug: string;
  nome: string;
  resumo: string;
  descricao: string;
  materiais: string;
  ano: string;
  img?: string;
}

export interface Categoria {
  name: string;
  href: string;
  img?: string;
  pos?: string;
}

export interface Valor {
  title: string;
  text: string;
  icon: string;
}

export interface Depoimento {
  quote: string;
  name: string;
  city: string;
}

export interface ColunaRodape {
  title: string;
  links: { label: string; href: string }[];
}

function brl(centavos: number) {
  return "R$ " + (centavos / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

// ── Camisas & Camisetas (à venda) ────────────────────────────
const camisasBase: Omit<Produto, "precoLabel">[] = [
  { id: "c1", slug: "camisa-oxford-branca", nome: "Camisa Social Branca Oxford", tipo: "Camisa Social", descricao: "Algodão Oxford encorpado, corte slim e colarinho italiano. A camisa branca definitiva para o guarda-roupa.", precoCentavos: 29900, tag: "Mais Vendido", destaque: true },
  { id: "c2", slug: "camisa-azul-tradicional", nome: "Camisa Social Azul Tradicional", tipo: "Camisa Social", descricao: "Algodão fio 80, toque macio e caimento clássico. Versátil do escritório ao jantar.", precoCentavos: 27900 },
  { id: "c3", slug: "camisa-linho-off-white", nome: "Camisa de Linho Off-White", tipo: "Camisa", descricao: "100% linho europeu, leve e fresca. Respirável e elegante para os dias quentes.", precoCentavos: 34900, tag: "Novo", destaque: true },
  { id: "c4", slug: "camisa-manga-longa-grafite", nome: "Camisa Manga Longa Grafite", tipo: "Camisa Social", descricao: "Algodão egípcio com acabamento premium e botões de madrepérola. Sofisticação discreta.", precoCentavos: 31900 },
  { id: "c5", slug: "camiseta-pima-preta", nome: "Camiseta Pima Preta", tipo: "Camiseta", descricao: "Algodão Pima peruano, gola reforçada que não deforma. Conforto e durabilidade superiores.", precoCentavos: 18900, tag: "Atemporal", destaque: true },
  { id: "c6", slug: "camiseta-pima-branca", nome: "Camiseta Pima Branca", tipo: "Camiseta", descricao: "Algodão Pima, caimento impecável e toque sedoso. A base perfeita para qualquer look.", precoCentavos: 18900 },
  { id: "c7", slug: "camiseta-polo-marinho", nome: "Camiseta Polo Marinho", tipo: "Camiseta", descricao: "Piquê premium com punhos canelados e gola estruturada. Esporte fino atemporal.", precoCentavos: 22900 },
  { id: "c8", slug: "camisa-xadrez-vichy", nome: "Camisa Xadrez Vichy", tipo: "Camisa", descricao: "Algodão escovado com padrão vichy discreto. Casual elegante para o fim de semana.", precoCentavos: 28900 },
];

export const CAMISAS: Produto[] = camisasBase.map((c) => ({ ...c, precoLabel: brl(c.precoCentavos) }));

export const PRODUTOS_DESTAQUE: Produto[] = CAMISAS.filter((c) => c.destaque);

export function camisaPorSlug(slug: string): Produto | undefined {
  return CAMISAS.find((c) => c.slug === slug);
}

/** Tipos para filtro do catálogo. */
export const TIPOS_CAMISA = ["Todos", "Camisa Social", "Camisa", "Camiseta"];

// ── Peças Autorais (apenas exposição, não vendidas) ──────────
export const AUTORAIS: PecaAutoral[] = [
  {
    slug: "smoking-meia-noite",
    nome: "Smoking Meia-Noite",
    resumo: "Peça de gala em lã Super 150's com lapela acetinada.",
    descricao:
      "Um smoking azul meia-noite — mais profundo que o preto sob a luz artificial — confeccionado à mão ao longo de mais de 60 horas. A lapela em bico recebe seda pura, e o forro interno traz bordado exclusivo com as iniciais do ateliê. Uma peça de cerimônia pensada para durar décadas.",
    materiais: "Lã Super 150's · seda pura · forro em cupro",
    ano: "2025",
  },
  {
    slug: "terno-espinha-de-peixe",
    nome: "Terno Espinha de Peixe",
    resumo: "Alfaiataria estruturada em tweed espinha de peixe.",
    descricao:
      "Inspirado na tradição britânica e reinterpretado para o clima brasileiro, este terno em tweed leve de espinha de peixe tem ombro natural e cintura marcada. Cada padronagem é casada manualmente nas emendas — um detalhe que só o olhar treinado percebe, mas que define a excelência da peça.",
    materiais: "Tweed de lã leve · botões de chifre · entretela de crina",
    ano: "2024",
  },
  {
    slug: "casaca-cerimonia",
    nome: "Casaca de Cerimônia",
    resumo: "Casaca rabo de andorinha para grandes ocasiões.",
    descricao:
      "A peça mais formal do vestuário masculino, executada segundo o rigor clássico: corte rabo de andorinha, frente curta e caudas alinhadas ao joelho. Reservada a casamentos de etiqueta e cerimônias de gala, é construída inteiramente à mão.",
    materiais: "Lã barathea · seda nas lapelas · acabamento 100% manual",
    ano: "2025",
  },
  {
    slug: "colete-bordado",
    nome: "Colete Bordado à Mão",
    resumo: "Colete com bordado artesanal em fio de seda.",
    descricao:
      "Um colete que é, em si, uma obra. O bordado floral discreto é feito ponto a ponto em fio de seda, levando semanas para ser concluído. Pensado para compor trajes de gala ou para emoldurar uma peça de assinatura.",
    materiais: "Seda · fio de seda para bordado · forro em algodão egípcio",
    ano: "2024",
  },
  {
    slug: "sobretudo-la-caxemira",
    nome: "Sobretudo Lã e Caxemira",
    resumo: "Sobretudo longo em mescla nobre de lã e caxemira.",
    descricao:
      "Comprimento ao joelho, gola conversível e caimento impecável. A mescla de lã com caxemira garante leveza e calor sem volume. Uma peça de inverno que atravessa modas e gerações.",
    materiais: "70% lã · 30% caxemira · forro acetinado",
    ano: "2025",
  },
];

export function autoralPorSlug(slug: string): PecaAutoral | undefined {
  return AUTORAIS.find((a) => a.slug === slug);
}

// ── Coleções (landing) — todas levam ao catálogo de camisas ──
export const CATEGORIAS: Categoria[] = [
  { name: "Camisas Sociais", href: "/camisas?cat=" + encodeURIComponent("Camisa Social") },
  { name: "Camisetas", href: "/camisas?cat=Camiseta" },
  { name: "Linho", href: "/camisas" },
  { name: "Manga Longa", href: "/camisas?cat=" + encodeURIComponent("Camisa Social") },
  { name: "Peças Autorais", href: "/autorais" },
];

export const VALORES: Valor[] = [
  {
    title: "Tecidos Nobres",
    text: "Lãs frias, linhos e algodões egípcios selecionados fio a fio junto aos melhores fornecedores.",
    icon: '<svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1"><path d="M8 14h32M8 24h32M8 34h32" opacity=".4"/><rect x="8" y="8" width="32" height="32" rx="1"/></svg>',
  },
  {
    title: "Corte Clássico",
    text: "Modelagem precisa e acabamento à mão, ajustados ao corpo para uma silhueta impecável.",
    icon: '<svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1"><circle cx="16" cy="16" r="6"/><circle cx="16" cy="32" r="6"/><path d="M22 20l20 16M22 28L42 12"/></svg>',
  },
  {
    title: "Entrega Nacional",
    text: "Envio seguro e rastreável para todo o Brasil, com embalagem que preserva cada detalhe.",
    icon: '<svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 14h22v20H6zM28 20h9l5 6v8h-14z"/><circle cx="15" cy="36" r="3"/><circle cx="34" cy="36" r="3"/></svg>',
  },
];

export const DEPOIMENTOS: Depoimento[] = [
  { quote: "O caimento é de outro nível. Vesti uma vez e entendi a diferença de uma alfaiataria de verdade.", name: "Ricardo Menezes", city: "São Paulo, SP" },
  { quote: "Atendimento impecável e uma camisa que parece feita só para mim. Virei cliente para sempre.", name: "André Tavares", city: "Belo Horizonte, MG" },
  { quote: "Sofisticação sem exageros. A Gaspar Lopes entende o homem que valoriza permanência.", name: "Felipe Andrade", city: "Curitiba, PR" },
];

export const COLUNAS_RODAPE: ColunaRodape[] = [
  {
    title: "Loja",
    links: [
      { label: "Camisas Sociais", href: "/camisas?cat=" + encodeURIComponent("Camisa Social") },
      { label: "Camisetas", href: "/camisas?cat=Camiseta" },
      { label: "Todas as camisas", href: "/camisas" },
      { label: "Peças Autorais", href: "/autorais" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Nossa História", href: "/#historia" },
      { label: "Peças Autorais", href: "/autorais" },
      { label: "Contato", href: "/#contato" },
    ],
  },
];

export const PAGAMENTOS = ["VISA", "Mastercard", "Pix", "Boleto", "Amex"];

export const CORES = {
  preto: "#0A0A0A",
  navy: "#0D1B2A",
  ouro: "#C9A86A",
  creme: "#F5F0EB",
  grafite: "#1c1c1c",
};

// ── Nossa História (página dedicada /historia) ───────────────
export const HISTORIA = {
  titulo: "Da Máquina de Costura à Alfaiataria que se Tornou Referência",
  paragrafos: [
    "A trajetória da Gaspar Lopes começa dentro de um ambiente onde a costura era parte da rotina e da cultura familiar. Crescer entre máquinas, tecidos e processos artesanais despertou, desde cedo, a essência que hoje define a marca: respeito ao feito à mão, atenção ao detalhe e compromisso com a qualidade.",
    "Com formação na área e anos de aprimoramento, o passo natural foi transformar essa herança em negócio. A marca nasceu de forma simples, mas com visão clara. A primeira estrutura foi montada na sala de um apartamento, onde moldes, máquinas e muita vontade de construir algo sólido deram início ao que se tornaria uma referência em alfaiataria. Assim como muitas grandes empresas que começaram em uma garagem, acreditávamos que esforço e propósito eram suficientes para expandir.",
    "Antes de consolidar a marca, foram anos de contato direto com clientes, vendendo gravatas de porta em porta e entendendo na prática o que realmente importava para quem buscava elegância e personalidade. Esse período trouxe o maior aprendizado da nossa história: a importância de ouvir. Foi ouvindo que identificamos o desejo crescente por peças exclusivas e pela experiência do sob medida.",
    "Começamos com pronta entrega, mas evoluímos rapidamente para o trabalho 100% personalizado, acompanhando a demanda de um público que buscava roupas que comunicassem identidade, estilo e precisão. Assim nasceu o conceito que nos define até hoje: vestir pessoas com peças criadas para cada corpo, cada necessidade e cada momento.",
    "Hoje, com mais de 30 anos de experiência no mercado e 15 anos no mesmo endereço, a Gaspar Lopes se consolidou como referência em alfaiataria sob medida. Crescemos, aperfeiçoamos técnicas e fortalecemos nossa presença, mas mantivemos intactos os valores que moldaram nossa história: ética, qualidade, pontualidade e o cuidado em cada etapa do processo.",
    "Acreditamos que excelência não é diferencial, é obrigação. E é por isso que, ao longo dos anos, construímos uma marca que une tradição, técnica e autenticidade.",
    "A Gaspar Lopes continua evoluindo, ampliando horizontes e escrevendo diariamente sua própria história — costura por costura, escolha por escolha, sempre com o compromisso de entregar o melhor.",
  ],
};
