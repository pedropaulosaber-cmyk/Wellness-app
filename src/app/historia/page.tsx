import Link from "next/link";
import { HISTORIA } from "@/lib/site-data";

export const metadata = { title: "Nossa História — Gaspar Lopes Alfaiataria" };

export default function HistoriaPage() {
  return (
    <main style={{ minHeight: "100dvh", background: "#0D1B2A", color: "#F5F0EB", padding: "112px clamp(20px,5vw,64px) clamp(72px,11vw,120px)" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        {/* Voltar ao menu */}
        <Link
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 300, fontSize: 13, letterSpacing: ".06em", color: "rgba(245,240,235,.65)", textDecoration: "none" }}
        >
          ← Voltar ao menu
        </Link>

        <header style={{ textAlign: "center", marginTop: 24 }}>
          <div style={{ fontWeight: 300, fontSize: 11, letterSpacing: ".3em", textTransform: "uppercase", color: "#C9A86A", marginBottom: 20 }}>
            Nossa História
          </div>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.18 }}>
            {HISTORIA.titulo}
          </h1>
          <div style={{ width: 48, height: 1, background: "#C9A86A", margin: "30px auto 0" }} />
        </header>

        <article style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 22 }}>
          {HISTORIA.paragrafos.map((p, i) => (
            <p
              key={i}
              style={{
                fontWeight: 300,
                fontSize: "clamp(15px,1.5vw,17px)",
                lineHeight: 1.9,
                color: "rgba(245,240,235,.82)",
                textAlign: "justify",
              }}
            >
              {p}
            </p>
          ))}
        </article>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <div style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontSize: 20 }}>Gaspar Lopes</div>
          <div style={{ fontWeight: 300, fontSize: 12, letterSpacing: ".1em", color: "#C9A86A", marginTop: 4 }}>
            Mestre Alfaiate · Fundador
          </div>
        </div>

        {/* Vídeo institucional abaixo do texto */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 9",
            background: "#0A0A0A",
            overflow: "hidden",
            marginTop: "clamp(40px,6vw,64px)",
            border: "1px solid rgba(245,240,235,.12)",
          }}
        >
          <video
            src="/assets/institucional.mp4"
            controls
            playsInline
            preload="metadata"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", background: "#0a0a0a" }}
          />
        </div>
        <p style={{ textAlign: "center", fontWeight: 300, fontSize: 12, color: "rgba(245,240,235,.45)", marginTop: 14 }}>
          Vídeo institucional · Gaspar Lopes Alfaiataria
        </p>

        <div style={{ textAlign: "center", marginTop: 44 }}>
          <Link
            href="/camisas"
            className="gl-btn-gold"
            style={{ display: "inline-block", padding: "15px 40px", background: "#C9A86A", color: "#0D1B2A", textDecoration: "none", fontWeight: 500, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase" }}
          >
            Conheça nossas peças
          </Link>
        </div>
      </div>
    </main>
  );
}
