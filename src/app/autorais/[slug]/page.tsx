import { notFound } from "next/navigation";
import Link from "next/link";
import { AUTORAIS, autoralPorSlug } from "@/lib/site-data";

export function generateStaticParams() {
  return AUTORAIS.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = autoralPorSlug(params.slug);
  return { title: a ? `${a.nome} — Peças Autorais Gaspar Lopes` : "Gaspar Lopes" };
}

export default function AutoralPage({ params }: { params: { slug: string } }) {
  const a = autoralPorSlug(params.slug);
  if (!a) notFound();

  return (
    <main style={{ minHeight: "100dvh", background: "#0A0A0A", padding: "112px clamp(20px,5vw,64px) clamp(72px,11vw,110px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Link href="/autorais" style={{ fontWeight: 300, fontSize: 13, letterSpacing: ".06em", color: "rgba(245,240,235,.6)", textDecoration: "none" }}>
          ← Peças Autorais
        </Link>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(28px,5vw,64px)",
            marginTop: 24,
            alignItems: "start",
          }}
        >
          <div style={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden", background: "#0a121d" }}>
            <div className="gl-ph" style={{ position: "absolute", inset: 0 }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, letterSpacing: ".18em", color: "rgba(245,240,235,.25)", textTransform: "uppercase", textAlign: "center", padding: 16 }}>
              {a.nome}
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 300, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "#C9A86A" }}>
              Peça Autoral · {a.ano}
            </div>
            <h1 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(26px,3.4vw,42px)", lineHeight: 1.15, color: "#F5F0EB", marginTop: 10 }}>
              {a.nome}
            </h1>
            <div style={{ width: 40, height: 1, background: "rgba(201,168,106,.5)", margin: "24px 0" }} />
            <p style={{ fontWeight: 300, fontSize: 16, lineHeight: 1.9, color: "rgba(245,240,235,.75)" }}>{a.descricao}</p>

            <div style={{ marginTop: 28, padding: "18px 20px", border: "1px solid rgba(245,240,235,.12)", background: "rgba(13,27,42,.4)" }}>
              <div style={{ fontWeight: 400, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "#C9A86A", marginBottom: 8 }}>Materiais</div>
              <div style={{ fontWeight: 300, fontSize: 14, color: "rgba(245,240,235,.8)" }}>{a.materiais}</div>
            </div>

            <div style={{ marginTop: 28 }}>
              <p style={{ fontWeight: 300, fontSize: 14, color: "rgba(245,240,235,.6)", marginBottom: 14 }}>
                Peça exclusiva de exposição — não disponível para venda. Interessado em uma criação
                sob medida inspirada nesta peça?
              </p>
              <Link
                href="/#contato"
                className="gl-btn-outline"
                style={{
                  display: "inline-block",
                  padding: "14px 36px",
                  border: "1px solid rgba(245,240,235,.55)",
                  color: "#F5F0EB",
                  textDecoration: "none",
                  fontWeight: 300,
                  fontSize: 12,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                }}
              >
                Falar com o ateliê
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
