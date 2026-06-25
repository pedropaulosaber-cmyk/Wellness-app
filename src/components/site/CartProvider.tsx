"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Produto } from "@/lib/site-data";

interface ItemCarrinho extends Produto {
  qty: number;
}

interface CartCtx {
  cart: ItemCarrinho[];
  open: boolean;
  count: number;
  subtotal: string;
  checkingOut: boolean;
  add: (p: Produto) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  toggle: () => void;
  checkout: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

function precoNum(p: string) {
  return Number(p.replace(/[^\d]/g, ""));
}
function fmt(n: number) {
  return "R$ " + n.toLocaleString("pt-BR");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ItemCarrinho[]>([]);
  const [open, setOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  const valor = useMemo<CartCtx>(() => {
    const count = cart.reduce((a, i) => a + i.qty, 0);
    const subtotalNum = cart.reduce((a, i) => a + precoNum(i.price) * i.qty, 0);
    return {
      cart,
      open,
      count,
      subtotal: fmt(subtotalNum),
      checkingOut,
      add: (p) =>
        setCart((c) => {
          const ex = c.find((i) => i.id === p.id);
          setOpen(true);
          return ex
            ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
            : [...c, { ...p, qty: 1 }];
        }),
      inc: (id) => setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))),
      dec: (id) =>
        setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))),
      remove: (id) => setCart((c) => c.filter((i) => i.id !== id)),
      toggle: () => setOpen((o) => !o),
      checkout: () => {
        setCheckingOut(true);
        setTimeout(() => {
          setCheckingOut(false);
          setCart([]);
          setOpen(false);
        }, 1600);
      },
    };
  }, [cart, open, checkingOut]);

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart precisa do CartProvider");
  return c;
}
