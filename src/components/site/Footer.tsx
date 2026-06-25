import Link from "next/link";
import { COLUNAS_RODAPE, PAGAMENTOS } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0A0A0A",
        padding: "clamp(56px,8vw,90px) clamp(20px,5vw,64px) 40px",
        borderTop: "1px solid rgba(245,240,235,.08)",
      }}
    >
      <div className="gl-grid-footer" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div>
          <div style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 600, fontSize: 24, color: "#C9A86A", letterSpacing: ".03em" }}>
            Gaspar Lopes
          </div>
          <div style={{ fontWeight: 300, fontSize: 9, letterSpacing: ".42em", textTransform: "uppercase", color: "rgba(245,240,235,.6)", marginTop: 4 }}>
            Alfaiataria
          </div>
          <p style={{ fontWeight: 300, fontSize: 13, lineHeight: 1.8, color: "rgba(245,240,235,.5)", marginTop: 22, maxWidth: 280 }}>
            Alfaiataria clássica brasileira. Corte preciso, tecidos nobres e entrega para todo o
            Brasil.
          </p>
        </div>

        {COLUNAS_RODAPE.map((col) => (
          <div key={col.title}>
            <div style={{ fontWeight: 400, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#F5F0EB", marginBottom: 20 }}>
              {col.title}
            </div>
            {col.links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="gl-link"
                style={{ display: "block", fontWeight: 300, fontSize: 13, color: "rgba(245,240,235,.6)", textDecoration: "none", marginBottom: 13 }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        ))}

        <div>
          <div style={{ fontWeight: 400, fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#F5F0EB", marginBottom: 20 }}>
            Atendimento
          </div>
          <a
            href="#"
            style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 300, fontSize: 13, color: "rgba(245,240,235,.6)", textDecoration: "none", marginBottom: 14 }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.9.9-2.7-.2-.3A8 8 0 1 1 12 20z" />
            </svg>
            WhatsApp
          </a>
          <a
            href="#"
            style={{ display: "flex", alignItems: "center", gap: 9, fontWeight: 300, fontSize: 13, color: "rgba(245,240,235,.6)", textDecoration: "none", marginBottom: 24 }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            Instagram
          </a>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {PAGAMENTOS.map((pay) => (
              <div
                key={pay}
                style={{
                  fontWeight: 400,
                  fontSize: 9,
                  letterSpacing: ".04em",
                  color: "rgba(245,240,235,.7)",
                  border: "1px solid rgba(245,240,235,.2)",
                  padding: "6px 9px",
                  borderRadius: 2,
                }}
              >
                {pay}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "48px auto 0",
          paddingTop: 26,
          borderTop: "1px solid rgba(245,240,235,.08)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          fontWeight: 300,
          fontSize: 11,
          letterSpacing: ".04em",
          color: "rgba(245,240,235,.4)",
        }}
      >
        <div>© 2026 Gaspar Lopes Alfaiataria · CNPJ 00.000.000/0001-00</div>
        <div>Política de Privacidade · Trocas e Devoluções</div>
      </div>
    </footer>
  );
}
