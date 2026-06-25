import Link from "next/link";

export default function Historia() {
  return (
    <section
      id="historia"
      style={{ background: "#0D1B2A", color: "#F5F0EB", padding: "clamp(72px,11vw,140px) clamp(20px,5vw,64px)" }}
    >
      <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            fontWeight: 400,
            fontSize: 11,
            letterSpacing: ".3em",
            textTransform: "uppercase",
            color: "#C9A86A",
            marginBottom: 22,
          }}
        >
          Nossa História
        </div>
        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 500,
            fontSize: "clamp(28px,3.6vw,48px)",
            lineHeight: 1.18,
          }}
        >
          Da máquina de costura à alfaiataria
          <br />
          que se tornou referência.
        </h2>
        <p style={{ fontWeight: 300, fontSize: 16, lineHeight: 1.85, color: "rgba(245,240,235,.72)", marginTop: 28 }}>
          Mais de 30 anos de experiência, 15 anos no mesmo endereço. Uma trajetória que começou
          entre máquinas e tecidos, passou pela venda de gravatas de porta em porta e se consolidou
          como referência em alfaiataria sob medida — sempre fiel à ética, à qualidade e ao cuidado
          em cada costura.
        </p>
        <Link
          href="/historia"
          className="gl-btn-outline"
          style={{
            display: "inline-block",
            marginTop: 36,
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
          Conheça nossa história
        </Link>
      </div>
    </section>
  );
}
