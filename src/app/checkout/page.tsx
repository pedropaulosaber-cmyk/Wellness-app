"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/site/CartProvider";
import { registrarPedido } from "@/lib/analytics";

export default function CheckoutPage() {
  const { cart, subtotal, subtotalCentavos, count, inc, dec, remove, limpar } = useCart();
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", cep: "", endereco: "", cidade: "", estado: "" });
  const [erro, setErro] = useState<string | null>(null);
  const [numero, setNumero] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function confirmar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    if (!form.nome || !form.email || !form.endereco || !form.cidade) {
      setErro("Preencha nome, e-mail, endereço e cidade.");
      return;
    }
    setEnviando(true);
    const n = registrarPedido({
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      endereco: { cep: form.cep, endereco: form.endereco, cidade: form.cidade, estado: form.estado },
      itens: cart.map((i) => ({ id: i.id, nome: i.nome, qty: i.qty, precoCentavos: i.precoCentavos })),
      totalCentavos: subtotalCentavos,
    });
    setNumero(n);
    limpar();
    setEnviando(false);
  }

  const wrap = { minHeight: "100dvh", background: "#0A0A0A", padding: "112px clamp(20px,5vw,64px) clamp(72px,11vw,110px)" } as const;
  const campo = {
    width: "100%",
    background: "transparent",
    border: "1px solid rgba(245,240,235,.25)",
    color: "#F5F0EB",
    padding: "13px 16px",
    fontSize: 15,
    fontWeight: 300,
    outline: "none",
  } as const;
  const label = { display: "block", fontWeight: 300, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "rgba(245,240,235,.6)", marginBottom: 7 };

  // ── Confirmação ──
  if (numero) {
    return (
      <main style={wrap}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 44, color: "#C9A86A" }}>✓</div>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(26px,3.4vw,40px)", color: "#F5F0EB", marginTop: 12 }}>
            Pedido confirmado!
          </h1>
          <p style={{ fontWeight: 300, fontSize: 15, lineHeight: 1.8, color: "rgba(245,240,235,.7)", marginTop: 16 }}>
            Seu pedido <strong style={{ color: "#C9A86A" }}>{numero}</strong> foi registrado. Em
            instantes você receberá no e-mail as instruções de pagamento (Pix, cartão ou boleto) e o
            acompanhamento da entrega.
          </p>
          <Link
            href="/camisas"
            className="gl-btn-outline"
            style={{ display: "inline-block", marginTop: 30, padding: "14px 36px", border: "1px solid rgba(245,240,235,.55)", color: "#F5F0EB", textDecoration: "none", fontWeight: 300, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase" }}
          >
            Continuar comprando
          </Link>
        </div>
      </main>
    );
  }

  // ── Sacola vazia ──
  if (count === 0) {
    return (
      <main style={wrap}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: 30, color: "#F5F0EB" }}>Sua sacola está vazia</h1>
          <p style={{ fontWeight: 300, fontSize: 15, color: "rgba(245,240,235,.6)", marginTop: 14 }}>Escolha suas camisas e volte para finalizar.</p>
          <Link href="/camisas" className="gl-btn-gold" style={{ display: "inline-block", marginTop: 26, padding: "14px 36px", background: "#C9A86A", color: "#0D1B2A", textDecoration: "none", fontWeight: 500, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase" }}>
            Ir para a loja
          </Link>
        </div>
      </main>
    );
  }

  // ── Checkout ──
  return (
    <main style={wrap}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(28px,3.6vw,44px)", color: "#F5F0EB", marginBottom: 8 }}>
          Finalizar Compra
        </h1>
        <p style={{ fontWeight: 300, fontSize: 14, color: "rgba(245,240,235,.55)", marginBottom: 36 }}>Entrega para todo o Brasil.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(28px,4vw,56px)", alignItems: "start" }}>
          {/* Formulário */}
          <form onSubmit={confirmar} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={label}>Nome completo *</label>
              <input value={form.nome} onChange={set("nome")} style={campo} required />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={label}>E-mail *</label>
                <input type="email" value={form.email} onChange={set("email")} style={campo} required />
              </div>
              <div>
                <label style={label}>Telefone</label>
                <input value={form.telefone} onChange={set("telefone")} style={campo} inputMode="tel" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 14 }}>
              <div>
                <label style={label}>CEP</label>
                <input value={form.cep} onChange={set("cep")} style={campo} inputMode="numeric" />
              </div>
              <div>
                <label style={label}>Endereço *</label>
                <input value={form.endereco} onChange={set("endereco")} style={campo} required />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
              <div>
                <label style={label}>Cidade *</label>
                <input value={form.cidade} onChange={set("cidade")} style={campo} required />
              </div>
              <div>
                <label style={label}>Estado</label>
                <input value={form.estado} onChange={set("estado")} style={campo} />
              </div>
            </div>

            {erro && <p style={{ color: "#e88", fontSize: 14 }}>{erro}</p>}

            <button
              type="submit"
              disabled={enviando}
              className="gl-btn-gold"
              style={{ marginTop: 8, width: "100%", padding: 17, background: "#C9A86A", border: "none", color: "#0D1B2A", cursor: "pointer", fontWeight: 500, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase" }}
            >
              {enviando ? "Registrando…" : "Confirmar pedido"}
            </button>
            <p style={{ fontWeight: 300, fontSize: 11, color: "rgba(245,240,235,.4)", textAlign: "center" }}>
              As instruções de pagamento (Pix / cartão / boleto) são enviadas por e-mail após a
              confirmação.
            </p>
          </form>

          {/* Resumo */}
          <div style={{ border: "1px solid rgba(245,240,235,.12)", background: "rgba(13,27,42,.4)", padding: "24px 24px" }}>
            <div style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: 18, color: "#F5F0EB", marginBottom: 18 }}>Resumo do pedido</div>
            {cart.map((i) => (
              <div key={i.id} style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: "1px solid rgba(245,240,235,.08)" }}>
                <div className="gl-ph" style={{ width: 48, height: 60, flex: "0 0 auto" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 400, fontSize: 14, color: "#F5F0EB" }}>{i.nome}</div>
                  <div style={{ fontWeight: 300, fontSize: 12, color: "rgba(245,240,235,.5)", marginTop: 2 }}>{i.precoLabel}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(245,240,235,.25)" }}>
                      <button type="button" onClick={() => dec(i.id)} style={{ background: "none", border: "none", color: "#F5F0EB", cursor: "pointer", width: 26, height: 26 }}>−</button>
                      <span style={{ width: 22, textAlign: "center", color: "#F5F0EB", fontSize: 12 }}>{i.qty}</span>
                      <button type="button" onClick={() => inc(i.id)} style={{ background: "none", border: "none", color: "#F5F0EB", cursor: "pointer", width: 26, height: 26 }}>+</button>
                    </div>
                    <button type="button" onClick={() => remove(i.id)} style={{ background: "none", border: "none", color: "rgba(245,240,235,.4)", cursor: "pointer", fontSize: 11, textTransform: "uppercase", letterSpacing: ".06em" }}>
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, fontWeight: 300, fontSize: 13, color: "rgba(245,240,235,.6)" }}>
              <span>Subtotal</span>
              <span>{subtotal}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontWeight: 300, fontSize: 13, color: "rgba(245,240,235,.6)" }}>
              <span>Frete</span>
              <span>Grátis</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(245,240,235,.12)", fontWeight: 400, fontSize: 18, color: "#F5F0EB" }}>
              <span style={{ fontFamily: "var(--font-playfair), serif" }}>Total</span>
              <span style={{ color: "#C9A86A" }}>{subtotal}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
