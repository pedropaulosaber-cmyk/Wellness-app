// Conteúdo do site Gaspar Lopes Alfaiataria.
// Edite aqui para mudar textos, preços e categorias sem mexer nos componentes.

export interface Produto {
  id: string;
  name: string;
  desc: string;
  price: string;
  tag: string;
}

export interface Categoria {
  name: string;
  href: string;
  /** caminho opcional da foto (ex.: "/assets/ternos.jpg"); sem foto usa placeholder */
  img?: string;
  pos?: string;
}

export interface Valor {
  title: string;
  text: string;
  icon: string; // SVG inline
}

export interface Depoimento {
  quote: string;
  name: string;
  city: string;
}

export interface ColunaRodape {
  title: string;
  links: string[];
}

export const CATEGORIAS: Categoria[] = [
  { name: "Ternos", href: "/catalogo?cat=Ternos" },
  { name: "Camisas", href: "/catalogo?cat=Camisas" },
  { name: "Calças", href: "/catalogo?cat=" + encodeURIComponent("Calças") },
  { name: "Paletós", href: "/catalogo?cat=" + encodeURIComponent("Paletós") },
  { name: "Sapatos", href: "/catalogo?cat=Sapatos" },
];

export const PRODUTOS: Produto[] = [
  { id: "p1", name: "Terno Essência Navy", desc: "Lã fria · corte slim", price: "R$ 2.490", tag: "Mais Vendido" },
  { id: "p2", name: "Paletó Mestre Grafite", desc: "Estruturado · 2 botões", price: "R$ 1.890", tag: "Novo" },
  { id: "p3", name: "Camisa Linha Fina", desc: "Algodão egípcio 120 fios", price: "R$ 590", tag: "Atemporal" },
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
  {
    quote: "O caimento é de outro nível. Vesti uma vez e entendi a diferença de uma alfaiataria de verdade.",
    name: "Ricardo Menezes",
    city: "São Paulo, SP",
  },
  {
    quote: "Atendimento impecável e um terno que parece feito só para mim. Virei cliente para sempre.",
    name: "André Tavares",
    city: "Belo Horizonte, MG",
  },
  {
    quote: "Sofisticação sem exageros. A Gaspar Lopes entende o homem que valoriza permanência.",
    name: "Felipe Andrade",
    city: "Curitiba, PR",
  },
];

export const COLUNAS_RODAPE: ColunaRodape[] = [
  { title: "Coleções", links: ["Ternos", "Camisas", "Calças", "Paletós", "Sapatos"] },
  { title: "Institucional", links: ["Nossa História", "Sob Medida", "Lojas", "Trabalhe Conosco"] },
];

export const PAGAMENTOS = ["VISA", "Mastercard", "Pix", "Boleto", "Amex"];

// Paleta da marca (referência)
export const CORES = {
  preto: "#0A0A0A",
  navy: "#0D1B2A",
  ouro: "#C9A86A",
  creme: "#F5F0EB",
  grafite: "#1c1c1c",
};
