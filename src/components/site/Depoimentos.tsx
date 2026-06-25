import { DEPOIMENTOS } from "@/lib/site-data";

export default function Depoimentos() {
  return (
    <section style={{ background: "#1c1c1c", padding: "clamp(72px,11vw,130px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: ".3em",
            textTransform: "uppercase",
            color: "#C9A86A",
            marginBottom: "clamp(44px,6vw,68px)",
          }}
        >
          Quem Veste, Recomenda
        </div>
        <div className="gl-grid-3" style={{ gap: "clamp(30px,4vw,54px)" }}>
          {DEPOIMENTOS.map((t) => (
            <div key={t.name} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: 40, color: "#C9A86A", lineHeight: 1, height: 30 }}>
                &ldquo;
              </div>
              <p
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 19,
                  lineHeight: 1.6,
                  color: "#F5F0EB",
                  marginTop: 14,
                }}
              >
                {t.quote}
              </p>
              <div style={{ marginTop: 26, fontWeight: 400, fontSize: 13, letterSpacing: ".06em", color: "#F5F0EB" }}>
                {t.name}
              </div>
              <div style={{ fontWeight: 300, fontSize: 12, letterSpacing: ".06em", color: "rgba(245,240,235,.5)", marginTop: 3 }}>
                {t.city}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
