// Modelo de negócio do Vivá: pagamento ÚNICO = acesso vitalício.
export const PRECO_CENTAVOS = 44990;
export const PRECO_LABEL = "R$ 449,90";
export const PRODUTO_NOME = "Vivá — Acesso Vitalício";
export const PRODUTO_DESCRICAO =
  "Acesso completo e permanente a todos os treinos, plano nutricional ilimitado e todas as atualizações futuras. Pagamento único, sem mensalidade.";

// Rotas internas que exigem acesso pago.
export const ROTAS_INTERNAS = [
  "/inicio",
  "/nutricao",
  "/treinos",
  "/evolucao",
  "/perfil",
  "/integracoes",
];
// Rotas que exigem apenas login (ex.: anamnese antes do paywall).
// OBS: o middleware (edge) mantém uma cópia inline desta lista, pois não pode
// importar este módulo. Ao alterar aqui, atualize também o middleware.ts.
export const ROTAS_AUTENTICADAS = [...ROTAS_INTERNAS, "/anamnese"];
