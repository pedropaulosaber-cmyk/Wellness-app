"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Produto } from "@/lib/site-data";
import { track } from "@/lib/analytics";

export interface ItemCarrinho {
  id: string;
  slug: string;
  nome: string;
  precoCentavos: number;
  precoLabel: string;
  qty: number;
}

interface CartCtx {
  cart: ItemCarrinho[];
  open: boolean;
  count: number;
  subtotalCentavos: number;
  subtotal: string;
  add: (p: Produto) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  toggle: () => void;
  abrir: () => void;
  fechar: () => void;
  limpar: () => void;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "gl_cart";

function brl(centavos: number) {
  return "R$ " + (centavos / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ItemCarrinho[]>([]);
  const [open, setOpen] = useState(false);
  const carregado = useRef(false);

  // Carrega do localStorage uma vez
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setCart(JSON.parse(raw) as ItemCarrinho[]);
    } catch {
      /* ignore */
    }
    carregado.current = true;
  }, []);

  // Persiste a cada mudança (após o carregamento inicial)
  useEffect(() => {
    if (!carregado.current) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  const valor = useMemo<CartCtx>(() => {
    const count = cart.reduce((a, i) => a + i.qty, 0);
    const subtotalCentavos = cart.reduce((a, i) => a + i.precoCentavos * i.qty, 0);
    return {
      cart,
      open,
      count,
      subtotalCentavos,
      subtotal: brl(subtotalCentavos),
      add: (p) => {
        setCart((c) => {
          const ex = c.find((i) => i.id === p.id);
          return ex
            ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
            : [
                ...c,
                { id: p.id, slug: p.slug, nome: p.nome, precoCentavos: p.precoCentavos, precoLabel: p.precoLabel, qty: 1 },
              ];
        });
        setOpen(true);
        track("add_to_cart", { id: p.id, nome: p.nome, preco_centavos: p.precoCentavos });
      },
      inc: (id) => setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))),
      dec: (id) => setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))),
      remove: (id) => setCart((c) => c.filter((i) => i.id !== id)),
      toggle: () => setOpen((o) => !o),
      abrir: () => setOpen(true),
      fechar: () => setOpen(false),
      limpar: () => setCart([]),
    };
  }, [cart, open]);

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart precisa do CartProvider");
  return c;
}
