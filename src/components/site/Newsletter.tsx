"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [inscrito, setInscrito] = useState(false);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    setInscrito(true);
    setEmail("");
    setTimeout(() => setInscrito(false), 2500);
  }

  return (
    <section
      id="contato"
      style={{ background: "#0D1B2A", padding: "clamp(72px,11vw,120px) clamp(20px,5vw,64px)", textAlign: "center" }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 500,
            fontSize: "clamp(26px,3.2vw,40px)",
            lineHeight: 1.2,
          }}
        >
          Receba lançamentos e novidades
          <br />
          Gaspar Lopes antes de todos.
        </h2>
        <p style={{ fontWeight: 300, fontSize: 14, color: "rgba(245,240,235,.6)", marginTop: 18, letterSpacing: ".03em" }}>
          Sem excessos. Apenas o essencial, direto ao seu e-mail.
        </p>
        <form
          onSubmit={enviar}
          style={{ display: "flex", marginTop: 38, border: "1px solid rgba(245,240,235,.3)" }}
        >
          <input
            type="email"
            required
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              padding: "17px 22px",
              color: "#F5F0EB",
              fontWeight: 300,
              fontSize: 14,
              letterSpacing: ".04em",
            }}
          />
          <button
            type="submit"
            className="gl-btn-gold"
            style={{
              background: "#C9A86A",
              border: "none",
              color: "#0D1B2A",
              cursor: "pointer",
              padding: "0 30px",
              fontWeight: 400,
              fontSize: 11,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {inscrito ? "Inscrito ✓" : "Quero Receber"}
          </button>
        </form>
      </div>
    </section>
  );
}
