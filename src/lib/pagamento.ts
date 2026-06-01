import { PRECO_CENTAVOS, PRODUTO_NOME } from "@/lib/constants";

/**
 * Camada de pagamento do Vivá — cobrança ÚNICA (acesso vitalício).
 *
 * Abstrai o gateway. Em produção, defina:
 *   PAGAMENTO_PROVIDER = "asaas" | "pagarme" | "stripe"
 *   PAGAMENTO_API_KEY  = chave do gateway
 *   PAGAMENTO_WEBHOOK_SECRET = segredo para validar o webhook
 *
 * Sem PAGAMENTO_PROVIDER, usa o provider "simulado" (apenas dev/preview):
 * permite testar todo o fluxo de paywall sem um gateway real.
 */

export interface Cobranca {
  cobrancaId: string;
  checkoutUrl: string;
}

export interface PagamentoProvider {
  nome: string;
  /** Cria a cobrança única e devolve a URL de checkout. */
  criarCobranca(input: {
    usuarioId: string;
    email: string;
  }): Promise<Cobranca>;
  /** Valida a assinatura do webhook e devolve o usuarioId pago, ou null. */
  validarWebhook(req: Request, corpo: string): Promise<{ usuarioId: string } | null>;
}

// ── Provider simulado (dev/preview) ──────────────────────────
const simulado: PagamentoProvider = {
  nome: "simulado",
  async criarCobranca({ usuarioId }) {
    // O checkout "simulado" é uma página interna que confirma o pagamento.
    return {
      cobrancaId: `sim_${usuarioId}`,
      checkoutUrl: `/comprar/simular?cobranca=sim_${usuarioId}`,
    };
  },
  async validarWebhook() {
    return null; // o simulado confirma via /api/pagamento/simular
  },
};

// ── Provider Asaas (produção — PIX/cartão, gateway brasileiro) ─
// Esqueleto pronto para ativar com a chave real. Mantém os secrets fora do
// código (lidos de env) — ver skill edge-function-guard.
const asaas: PagamentoProvider = {
  nome: "asaas",
  async criarCobranca({ usuarioId, email }) {
    const apiKey = process.env.PAGAMENTO_API_KEY;
    if (!apiKey) throw new Error("PAGAMENTO_API_KEY ausente");
    const base = process.env.ASAAS_BASE_URL ?? "https://api.asaas.com/v3";

    // 1) cliente + 2) cobrança única. Referência externa = usuarioId (usada no webhook).
    const res = await fetch(`${base}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json", access_token: apiKey },
      body: JSON.stringify({
        billingType: "UNDEFINED", // deixa o cliente escolher PIX/cartão/boleto
        value: PRECO_CENTAVOS / 100,
        dueDate: new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10),
        description: PRODUTO_NOME,
        externalReference: usuarioId,
        customer: email, // em produção: criar/buscar customer e usar o id
      }),
    });
    if (!res.ok) throw new Error(`Asaas: falha ao criar cobrança (${res.status})`);
    const data = (await res.json()) as { id: string; invoiceUrl: string };
    return { cobrancaId: data.id, checkoutUrl: data.invoiceUrl };
  },
  async validarWebhook(req, corpo) {
    // Asaas envia o token no header `asaas-access-token`.
    const segredo = process.env.PAGAMENTO_WEBHOOK_SECRET;
    if (segredo && req.headers.get("asaas-access-token") !== segredo) return null;
    const evento = JSON.parse(corpo) as {
      event: string;
      payment?: { externalReference?: string };
    };
    if (
      (evento.event === "PAYMENT_CONFIRMED" || evento.event === "PAYMENT_RECEIVED") &&
      evento.payment?.externalReference
    ) {
      return { usuarioId: evento.payment.externalReference };
    }
    return null;
  },
};

const PROVIDERS: Record<string, PagamentoProvider> = { simulado, asaas };

export function getProvider(): PagamentoProvider {
  const nome = process.env.PAGAMENTO_PROVIDER ?? "simulado";
  return PROVIDERS[nome] ?? simulado;
}

export function ehSimulado(): boolean {
  return (process.env.PAGAMENTO_PROVIDER ?? "simulado") === "simulado";
}
