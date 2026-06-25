export default function Historia() {
  return (
    <section
      id="historia"
      style={{ background: "#0D1B2A", color: "#F5F0EB", padding: "clamp(72px,11vw,140px) clamp(20px,5vw,64px)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
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
              fontSize: "clamp(28px,3.6vw,50px)",
              lineHeight: 1.15,
            }}
          >
            Conheça o mais alto
            <br />
            padrão do sob-medida.
          </h2>
          <p
            style={{
              fontWeight: 300,
              fontSize: 16,
              lineHeight: 1.85,
              color: "rgba(245,240,235,.7)",
              marginTop: 28,
            }}
          >
            A Gaspar Lopes nasceu do respeito ao tecido, ao corte e ao homem que veste com
            consciência. Cada peça é pensada para durar gerações — costurada à mão, ajustada ao
            corpo e fiel à tradição da alfaiataria clássica.
          </p>
        </div>

        {/* Vídeo institucional — substitua por /assets/institucional.mp4 */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 9",
            background: "#0A0A0A",
            overflow: "hidden",
            marginTop: "clamp(40px,5vw,60px)",
            border: "1px solid rgba(245,240,235,.12)",
          }}
        >
          <div className="gl-ph" style={{ position: "absolute", inset: 0 }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              color: "rgba(245,240,235,.55)",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                border: "1px solid #C9A86A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#C9A86A">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase" }}>
              Vídeo institucional
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 34 }}>
          <div style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontSize: 19, color: "#F5F0EB" }}>
            Gaspar Lopes
          </div>
          <div style={{ fontWeight: 300, fontSize: 12, letterSpacing: ".1em", color: "#C9A86A", marginTop: 4 }}>
            Mestre Alfaiate · Fundador
          </div>
        </div>
      </div>
    </section>
  );
}
