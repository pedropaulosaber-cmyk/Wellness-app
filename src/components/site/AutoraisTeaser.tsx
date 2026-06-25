import Link from "next/link";

export default function AutoraisTeaser() {
  return (
    <section style={{ background: "#0A0A0A", padding: "clamp(20px,5vw,40px) clamp(20px,5vw,64px) clamp(72px,11vw,120px)" }}>
      <div
        className="hero-gradient"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          padding: "clamp(40px,7vw,80px) clamp(24px,5vw,64px)",
          textAlign: "center",
        }}
      >
        <div style={{ position: "absolute", top: -40, right: -30, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />
        <div style={{ fontWeight: 300, fontSize: 11, letterSpacing: ".34em", textTransform: "uppercase", color: "#C9A86A", marginBottom: 18 }}>
          Atelier
        </div>
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(28px,3.6vw,46px)", lineHeight: 1.15, color: "#F5F0EB" }}>
          Peças Autorais
        </h2>
        <p style={{ fontWeight: 300, fontSize: 16, lineHeight: 1.8, color: "rgba(245,240,235,.72)", maxWidth: 620, margin: "20px auto 0" }}>
          Criações exclusivas do ateliê, feitas à mão e expostas como obras de alfaiataria. Não
          estão à venda — são a expressão máxima do nosso ofício.
        </p>
        <Link
          href="/autorais"
          className="gl-btn-outline"
          style={{
            display: "inline-block",
            marginTop: 34,
            padding: "15px 40px",
            border: "1px solid rgba(245,240,235,.55)",
            color: "#F5F0EB",
            textDecoration: "none",
            fontWeight: 300,
            fontSize: 12,
            letterSpacing: ".2em",
            textTransform: "uppercase",
          }}
        >
          Ver a Coleção Autoral
        </Link>
      </div>
    </section>
  );
}
