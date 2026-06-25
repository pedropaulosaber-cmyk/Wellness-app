"use client";

import { PRODUTOS } from "@/lib/site-data";
import { useCart } from "./CartProvider";

export default function Destaques() {
  const { add } = useCart();

  return (
    <section id="destaques" style={{ background: "#0D1B2A", padding: "clamp(72px,11vw,130px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: "clamp(40px,6vw,64px)",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 300,
                fontSize: 11,
                letterSpacing: ".3em",
                textTransform: "uppercase",
                color: "#C9A86A",
                marginBottom: 18,
              }}
            >
              Destaques da Coleção
            </div>
            <h2
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 500,
                fontSize: "clamp(28px,3.4vw,46px)",
                lineHeight: 1.15,
              }}
            >
              Peças que merecem destaque.
            </h2>
          </div>
          <a
            href="#colecoes"
            className="gl-link"
            style={{
              fontWeight: 300,
              fontSize: 12,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "#F5F0EB",
              textDecoration: "none",
              paddingBottom: 4,
            }}
          >
            Ver tudo →
          </a>
        </div>

        <div className="gl-grid-3" style={{ gap: "clamp(18px,2.4vw,34px)" }}>
          {PRODUTOS.map((p) => (
            <div key={p.id} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden", background: "#0a121d" }}>
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
                  }}
                >
                  {p.name}
                </div>
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
              </div>
              <div style={{ paddingTop: 22, display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: 21, color: "#F5F0EB" }}>
                  {p.name}
                </div>
                <div style={{ fontWeight: 300, fontSize: 12, letterSpacing: ".05em", color: "rgba(245,240,235,.55)", marginTop: 6 }}>
                  {p.desc}
                </div>
                <div style={{ fontWeight: 400, fontSize: 17, letterSpacing: ".04em", color: "#C9A86A", marginTop: 16 }}>
                  {p.price}
                </div>
                <button
                  onClick={() => add(p)}
                  className="gl-btn-outline"
                  style={{
                    marginTop: 18,
                    width: "100%",
                    padding: 14,
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
          ))}
        </div>
      </div>
    </section>
  );
}
