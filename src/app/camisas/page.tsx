"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CAMISAS, TIPOS_CAMISA, type Produto } from "@/lib/site-data";
import { useCart } from "@/components/site/CartProvider";

function ProdutoCard({ p }: { p: Produto }) {
  const { add } = useCart();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link
        href={`/camisas/${p.slug}`}
        style={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden", background: "#0a121d", display: "block" }}
      >
        <div className="gl-ph" style={{ position: "absolute", inset: 0 }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            letterSpacing: ".18em",
            color: "rgba(245,240,235,.22)",
            textTransform: "uppercase",
            textAlign: "center",
            padding: 12,
          }}
        >
          {p.nome}
        </div>
        {p.tag && (
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              fontWeight: 300,
              fontSize: 9,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "#0D1B2A",
              background: "#C9A86A",
              padding: "5px 10px",
            }}
          >
            {p.tag}
          </div>
        )}
      </Link>
      <div style={{ paddingTop: 18, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ fontWeight: 300, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "#C9A86A" }}>{p.tipo}</div>
        <Link
          href={`/camisas/${p.slug}`}
          style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: 19, color: "#F5F0EB", textDecoration: "none", marginTop: 6 }}
        >
          {p.nome}
        </Link>
        <div style={{ fontWeight: 400, fontSize: 16, letterSpacing: ".04em", color: "#C9A86A", marginTop: 12 }}>{p.precoLabel}</div>
        <button
          onClick={() => add(p)}
          className="gl-btn-outline"
          style={{
            marginTop: 16,
            width: "100%",
            padding: 13,
            background: "transparent",
            border: "1px solid rgba(245,240,235,.4)",
            color: "#F5F0EB",
            cursor: "pointer",
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: ".18em",
            textTransform: "uppercase",
          }}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}

function Catalogo() {
  const params = useSearchParams();
  const catInicial = params.get("cat") ?? "Todos";
  const [filtro, setFiltro] = useState(TIPOS_CAMISA.includes(catInicial) ? catInicial : "Todos");

  const lista = filtro === "Todos" ? CAMISAS : CAMISAS.filter((c) => c.tipo === filtro);

  return (
    <main style={{ minHeight: "100dvh", background: "#0A0A0A", padding: "112px clamp(20px,5vw,64px) clamp(72px,11vw,120px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,56px)" }}>
          <div style={{ fontWeight: 300, fontSize: 11, letterSpacing: ".3em", textTransform: "uppercase", color: "#C9A86A", marginBottom: 16 }}>Loja</div>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.12, color: "#F5F0EB" }}>
            Camisas &amp; Camisetas
          </h1>
          <p style={{ fontWeight: 300, fontSize: 15, color: "rgba(245,240,235,.6)", marginTop: 14 }}>
            Tecidos nobres, corte preciso. Entrega para todo o Brasil.
          </p>
        </header>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: "clamp(32px,5vw,48px)" }}>
          {TIPOS_CAMISA.map((t) => (
            <button
              key={t}
              onClick={() => setFiltro(t)}
              className="toque"
              style={{
                borderRadius: 999,
                border: `1px solid ${filtro === t ? "#C9A86A" : "rgba(245,240,235,.25)"}`,
                background: filtro === t ? "#C9A86A" : "transparent",
                color: filtro === t ? "#0D1B2A" : "#F5F0EB",
                padding: "9px 20px",
                fontWeight: 400,
                fontSize: 12,
                letterSpacing: ".06em",
                cursor: "pointer",
                transition: "all .25s ease",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="gl-grid-3" style={{ gap: "clamp(18px,2.4vw,32px)" }}>
          {lista.map((p) => (
            <ProdutoCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function CamisasPage() {
  return (
    <Suspense>
      <Catalogo />
    </Suspense>
  );
}
