"use client";

/**
 * Registro de eventos do site Gaspar Lopes.
 *
 * Camada garantida: localStorage (sempre funciona, sem backend).
 * Camada opcional: envia para uma tabela Supabase (gl_eventos / gl_pedidos)
 * via REST com a chave pública anon — ATIVA somente se as variáveis
 * NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY existirem.
 * Sem elas, os eventos ficam registrados localmente e nada falha.
 */

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const remotoAtivo = Boolean(URL && ANON);

const KEY_EVENTOS = "gl_eventos";
const KEY_PEDIDOS = "gl_pedidos";
const MAX = 300;

export interface Evento {
  tipo: string;
  path?: string;
  dados?: Record<string, unknown>;
  ts: string;
}

function lerLista<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(key) || "[]") as T[];
  } catch {
    return [];
  }
}
function salvarLista<T>(key: string, lista: T[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(lista.slice(-MAX)));
}

function nowIso() {
  try {
    return new Date().toISOString();
  } catch {
    return "";
  }
}

async function enviarRemoto(tabela: string, payload: Record<string, unknown>) {
  if (!remotoAtivo) return;
  try {
    await fetch(`${URL}/rest/v1/${tabela}`, {
      method: "POST",
      headers: {
        apikey: ANON,
        Authorization: `Bearer ${ANON}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // silencioso: o registro local já garante o evento
  }
}

/** Registra um evento (page_view, view_item, add_to_cart, begin_checkout, purchase, etc.). */
export function track(tipo: string, dados?: Record<string, unknown>) {
  const path = typeof window !== "undefined" ? window.location.pathname : undefined;
  const evt: Evento = { tipo, path, dados, ts: nowIso() };
  const lista = lerLista<Evento>(KEY_EVENTOS);
  lista.push(evt);
  salvarLista(KEY_EVENTOS, lista);
  void enviarRemoto("gl_eventos", {
    tipo,
    path,
    dados: dados ?? null,
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
  });
}

export interface PedidoInput {
  nome: string;
  email: string;
  telefone?: string;
  endereco?: Record<string, unknown>;
  itens: { id: string; nome: string; qty: number; precoCentavos: number }[];
  totalCentavos: number;
}

/** Registra um pedido e devolve o número gerado. */
export function registrarPedido(p: PedidoInput): string {
  const numero =
    "GL-" +
    nowIso().slice(0, 10).replace(/-/g, "") +
    "-" +
    Math.floor(1000 + Math.random() * 9000);

  const pedido = { numero, ...p, status: "novo", criado_em: nowIso() };
  const lista = lerLista<typeof pedido>(KEY_PEDIDOS);
  lista.push(pedido);
  salvarLista(KEY_PEDIDOS, lista);

  void enviarRemoto("gl_pedidos", {
    numero,
    nome: p.nome,
    email: p.email,
    telefone: p.telefone ?? null,
    endereco: p.endereco ?? null,
    itens: p.itens,
    total_centavos: p.totalCentavos,
  });

  track("purchase", { numero, total_centavos: p.totalCentavos, itens: p.itens.length });
  return numero;
}

/** Leitura local (para um eventual painel do dono). */
export function getEventos(): Evento[] {
  return lerLista<Evento>(KEY_EVENTOS);
}
