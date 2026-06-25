"use client";

import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const { cart, open, count, subtotal, checkingOut, inc, dec, remove, toggle, checkout } = useCart();
  const hasItems = count > 0;

  return (
    <>
      {open && (
        <div
          onClick={toggle}
          className="gl-fade"
          style={{ position: "fixed", inset: 0, zIndex: 90, background: "rgba(10,10,10,.6)", backdropFilter: "blur(2px)" }}
        />
      )}

      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          width: "min(420px,90vw)",
          background: "#0D1B2A",
          borderLeft: "1px solid rgba(201,168,106,.25)",
          transform: `translateX(${open ? "0" : "100%"})`,
          transition: "transform .45s cubic-bezier(.4,0,.1,1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "26px 28px",
            borderBottom: "1px solid rgba(245,240,235,.1)",
          }}
        >
          <div style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: 22, color: "#F5F0EB" }}>
            Sua Sacola
          </div>
          <button onClick={toggle} aria-label="Fechar" style={{ background: "none", border: "none", cursor: "pointer", color: "#F5F0EB", fontSize: 20, lineHeight: 1 }}>
            ✕
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "8px 28px" }}>
          {hasItems ? (
            cart.map((item) => (
              <div
                key={item.id}
                style={{ display: "flex", gap: 16, padding: "22px 0", borderBottom: "1px solid rgba(245,240,235,.08)" }}
              >
                <div className="gl-ph" style={{ width: 64, height: 84, flex: "0 0 auto" }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: 16, color: "#F5F0EB" }}>
                    {item.name}
                  </div>
                  <div style={{ fontWeight: 300, fontSize: 12, color: "rgba(245,240,235,.5)", marginTop: 3 }}>{item.price}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: "auto" }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(245,240,235,.25)" }}>
                      <button onClick={() => dec(item.id)} style={{ background: "none", border: "none", color: "#F5F0EB", cursor: "pointer", width: 28, height: 28, fontSize: 14 }}>
                        −
                      </button>
                      <span style={{ fontSize: 12, width: 22, textAlign: "center", color: "#F5F0EB" }}>{item.qty}</span>
                      <button onClick={() => inc(item.id)} style={{ background: "none", border: "none", color: "#F5F0EB", cursor: "pointer", width: 28, height: 28, fontSize: 14 }}>
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => remove(item.id)}
                      className="gl-link"
                      style={{
                        background: "none",
                        border: "none",
                        color: "rgba(245,240,235,.45)",
                        cursor: "pointer",
                        fontSize: 11,
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                        paddingBottom: 2,
                      }}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "80px 0", color: "rgba(245,240,235,.4)" }}>
              <div style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontSize: 20, marginBottom: 10 }}>
                Sua sacola está vazia
              </div>
              <div style={{ fontWeight: 300, fontSize: 13 }}>Adicione peças da coleção para começar.</div>
            </div>
          )}
        </div>

        {hasItems && (
          <div style={{ padding: "24px 28px", borderTop: "1px solid rgba(245,240,235,.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 300, fontSize: 13, color: "rgba(245,240,235,.6)", marginBottom: 8 }}>
              <span>Subtotal</span>
              <span>{subtotal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 400, fontSize: 17, color: "#F5F0EB", marginBottom: 22 }}>
              <span style={{ fontFamily: "var(--font-playfair), serif" }}>Total</span>
              <span style={{ color: "#C9A86A" }}>{subtotal}</span>
            </div>
            <button
              onClick={checkout}
              className="gl-btn-gold"
              style={{
                width: "100%",
                padding: 17,
                background: "#C9A86A",
                border: "none",
                color: "#0D1B2A",
                cursor: "pointer",
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: ".2em",
                textTransform: "uppercase",
              }}
            >
              {checkingOut ? "Pedido Confirmado ✓" : "Finalizar Compra"}
            </button>
            <div style={{ textAlign: "center", fontWeight: 300, fontSize: 11, color: "rgba(245,240,235,.4)", marginTop: 14 }}>
              Frete calculado no checkout · Entrega nacional
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
