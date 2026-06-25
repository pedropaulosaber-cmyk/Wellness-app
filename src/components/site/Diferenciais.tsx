import { VALORES } from "@/lib/site-data";

export default function Diferenciais() {
  return (
    <section
      id="sobmedida"
      style={{ background: "#0A0A0A", color: "#F5F0EB", padding: "clamp(72px,11vw,130px) clamp(20px,5vw,64px)" }}
    >
      <div className="gl-grid-3" style={{ maxWidth: 1180, margin: "0 auto", gap: "clamp(36px,5vw,72px)" }}>
        {VALORES.map((v) => (
          <div key={v.title} style={{ textAlign: "center" }}>
            <div
              style={{ display: "flex", justifyContent: "center", marginBottom: 26, color: "#C9A86A" }}
              dangerouslySetInnerHTML={{ __html: v.icon }}
            />
            <h3 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: 24, color: "#F5F0EB" }}>
              {v.title}
            </h3>
            <div style={{ width: 34, height: 1, background: "#C9A86A", margin: "18px auto" }} />
            <p
              style={{
                fontWeight: 300,
                fontSize: 15,
                lineHeight: 1.8,
                color: "rgba(245,240,235,.65)",
                maxWidth: 300,
                margin: "0 auto",
              }}
            >
              {v.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
