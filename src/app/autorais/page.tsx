import Link from "next/link";
import { AUTORAIS } from "@/lib/site-data";

export const metadata = { title: "Peças Autorais — Gaspar Lopes" };

export default function AutoraisPage() {
  return (
    <main style={{ minHeight: "100dvh", background: "#0A0A0A", padding: "112px clamp(20px,5vw,64px) clamp(72px,11vw,120px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Link
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 300, fontSize: 13, letterSpacing: ".06em", color: "rgba(245,240,235,.65)", textDecoration: "none" }}
        >
          ← Voltar ao menu
        </Link>
        <header style={{ textAlign: "center", maxWidth: 720, margin: "20px auto clamp(40px,6vw,64px)" }}>
          <div style={{ fontWeight: 300, fontSize: 11, letterSpacing: ".3em", textTransform: "uppercase", color: "#C9A86A", marginBottom: 16 }}>Atelier</div>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.12, color: "#F5F0EB" }}>
            Peças Autorais
          </h1>
          <p style={{ fontWeight: 300, fontSize: 16, lineHeight: 1.8, color: "rgba(245,240,235,.65)", marginTop: 18 }}>
            Criações exclusivas do ateliê, feitas à mão como obras de alfaiataria. Estas peças{" "}
            <strong style={{ color: "#F5F0EB", fontWeight: 400 }}>não estão à venda</strong> — são
            expostas para inspirar e mostrar o ápice do nosso ofício.
          </p>
        </header>

        <div className="gl-grid-3" style={{ gap: "clamp(20px,3vw,40px)" }}>
          {AUTORAIS.map((a) => (
            <Link
              key={a.slug}
              href={`/autorais/${a.slug}`}
              style={{ display: "flex", flexDirection: "column", textDecoration: "none" }}
            >
              <div style={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden", background: "#0a121d" }}>
                <div className="gl-ph" style={{ position: "absolute", inset: 0 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 45%,rgba(10,10,10,.85) 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "22px 20px" }}>
                  <div style={{ fontWeight: 300, fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "#C9A86A" }}>Peça {a.ano}</div>
                  <div style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: 22, color: "#F5F0EB", marginTop: 6 }}>{a.nome}</div>
                </div>
              </div>
              <p style={{ fontWeight: 300, fontSize: 14, lineHeight: 1.6, color: "rgba(245,240,235,.6)", marginTop: 14 }}>{a.resumo}</p>
              <span className="gl-link" style={{ fontWeight: 300, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "#F5F0EB", marginTop: 12, alignSelf: "flex-start" }}>
                Ver detalhes →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
