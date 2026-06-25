import { CATEGORIAS } from "@/lib/site-data";

export default function Colecoes() {
  return (
    <section id="colecoes" style={{ background: "#0A0A0A", padding: "clamp(72px,11vw,130px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(44px,6vw,72px)" }}>
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
            Coleções
          </div>
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontWeight: 500,
              fontSize: "clamp(28px,3.6vw,48px)",
              lineHeight: 1.15,
            }}
          >
            Cada categoria, um ofício.
          </h2>
        </div>

        <div className="gl-grid-colecoes">
          {CATEGORIAS.map((cat) => (
            <a
              key={cat.name}
              href={cat.href}
              className="gl-cat"
              style={{
                position: "relative",
                display: "block",
                aspectRatio: "3 / 4.4",
                overflow: "hidden",
                textDecoration: "none",
                background: "#0d1119",
              }}
            >
              {/* Foto da categoria — substitua por cat.img em site-data.ts */}
              <div
                className="gl-cat-img gl-ph"
                style={{
                  position: "absolute",
                  inset: 0,
                  transition: "transform .7s cubic-bezier(.2,.7,.2,1)",
                  ...(cat.img
                    ? {
                        backgroundImage: `url(${cat.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: cat.pos ?? "center",
                        filter: "brightness(.82)",
                      }
                    : {}),
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg,transparent 35%,rgba(10,10,10,.82) 100%)",
                }}
              />
              <div
                className="gl-cat-border"
                style={{
                  position: "absolute",
                  inset: 12,
                  border: "1px solid rgba(245,240,235,.7)",
                  opacity: 0,
                  transition: "opacity .4s ease",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 18px", textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: 500,
                    fontSize: "clamp(16px,1.5vw,22px)",
                    color: "#F5F0EB",
                  }}
                >
                  {cat.name}
                </div>
                <div
                  style={{
                    fontWeight: 300,
                    fontSize: 9,
                    letterSpacing: ".22em",
                    textTransform: "uppercase",
                    color: "#C9A86A",
                    marginTop: 6,
                  }}
                >
                  Ver peças
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
