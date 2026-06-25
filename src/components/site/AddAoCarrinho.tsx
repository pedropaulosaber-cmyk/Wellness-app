"use client";

import { useEffect, useState } from "react";
import type { Produto } from "@/lib/site-data";
import { useCart } from "./CartProvider";
import { track } from "@/lib/analytics";

export default function AddAoCarrinho({ produto }: { produto: Produto }) {
  const { add, abrir } = useCart();
  const [qty, setQty] = useState(1);
  const [feito, setFeito] = useState(false);

  useEffect(() => {
    track("view_item", { id: produto.id, nome: produto.nome, preco_centavos: produto.precoCentavos });
  }, [produto.id, produto.nome, produto.precoCentavos]);

  function adicionar() {
    for (let i = 0; i < qty; i++) add(produto);
    setFeito(true);
    abrir();
    setTimeout(() => setFeito(false), 1800);
  }

  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(245,240,235,.25)" }}>
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ background: "none", border: "none", color: "#F5F0EB", cursor: "pointer", width: 40, height: 44, fontSize: 16 }}>−</button>
          <span style={{ width: 36, textAlign: "center", color: "#F5F0EB", fontSize: 14 }}>{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} style={{ background: "none", border: "none", color: "#F5F0EB", cursor: "pointer", width: 40, height: 44, fontSize: 16 }}>+</button>
        </div>
        <button
          onClick={adicionar}
          className="gl-btn-gold"
          style={{
            flex: 1,
            padding: "15px 28px",
            background: "#C9A86A",
            border: "none",
            color: "#0D1B2A",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: ".2em",
            textTransform: "uppercase",
          }}
        >
          {feito ? "Adicionado ✓" : "Adicionar ao Carrinho"}
        </button>
      </div>
    </div>
  );
}
