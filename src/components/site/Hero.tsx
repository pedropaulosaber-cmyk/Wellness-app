export default function Hero() {
  return (
    <header
      id="topo"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 640,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textAlign: "left",
        overflow: "hidden",
      }}
    >
      {/* Placeholder do hero (substitua por /assets/hero.jpg) */}
      <div
        className="gl-ph"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#0d1119",
          backgroundImage:
            "radial-gradient(120% 120% at 75% 30%, rgba(201,168,106,0.18) 0%, rgba(13,27,42,0) 55%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg,rgba(10,10,10,.9) 0%,rgba(10,10,10,.5) 45%,rgba(10,10,10,.1) 70%),linear-gradient(180deg,transparent 60%,rgba(10,10,10,.7) 100%)",
        }}
      />
      <div
        className="gl-fade"
        style={{ position: "relative", zIndex: 2, padding: "0 clamp(24px,7vw,110px)", maxWidth: 780 }}
      >
        <div
          style={{
            fontWeight: 300,
            fontSize: 12,
            letterSpacing: ".34em",
            textTransform: "uppercase",
            color: "#C9A86A",
            marginBottom: 28,
          }}
        >
          Alfaiataria Clássica Brasileira
        </div>
        <h1
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 500,
            fontSize: "clamp(38px,6vw,76px)",
            lineHeight: 1.08,
            letterSpacing: ".01em",
          }}
        >
          A elegância que define
          <br />
          quem você é.
        </h1>
        <p
          style={{
            fontWeight: 200,
            fontSize: "clamp(14px,1.4vw,17px)",
            letterSpacing: ".06em",
            color: "rgba(245,240,235,.78)",
            marginTop: 28,
          }}
        >
          Alfaiataria clássica. Corte preciso. Entrega em todo o Brasil.
        </p>
        <a
          href="#colecoes"
          className="gl-btn-outline"
          style={{
            display: "inline-block",
            marginTop: 44,
            padding: "16px 42px",
            border: "1px solid rgba(245,240,235,.55)",
            color: "#F5F0EB",
            textDecoration: "none",
            fontWeight: 300,
            fontSize: 12,
            letterSpacing: ".2em",
            textTransform: "uppercase",
          }}
        >
          Conheça a Coleção
        </a>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 34,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          color: "rgba(245,240,235,.4)",
        }}
      >
        <div style={{ fontSize: 9, letterSpacing: ".3em", textTransform: "uppercase" }}>Role</div>
        <div style={{ width: 1, height: 38, background: "linear-gradient(rgba(245,240,235,.5),transparent)" }} />
      </div>
    </header>
  );
}
