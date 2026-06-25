import { notFound } from "next/navigation";
import Link from "next/link";
import { CAMISAS, camisaPorSlug } from "@/lib/site-data";
import AddAoCarrinho from "@/components/site/AddAoCarrinho";

export function generateStaticParams() {
  return CAMISAS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = camisaPorSlug(params.slug);
  return { title: p ? `${p.nome} — Gaspar Lopes` : "Gaspar Lopes" };
}

export default function ProdutoPage({ params }: { params: { slug: string } }) {
  const p = camisaPorSlug(params.slug);
  if (!p) notFound();

  return (
    <main style={{ minHeight: "100dvh", background: "#0A0A0A", padding: "112px clamp(20px,5vw,64px) clamp(72px,11vw,110px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Link href="/camisas" style={{ fontWeight: 300, fontSize: 13, letterSpacing: ".06em", color: "rgba(245,240,235,.6)", textDecoration: "none" }}>
          ← Voltar à loja
        </Link>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(28px,5vw,64px)",
            marginTop: 24,
            alignItems: "start",
          }}
        >
          {/* Imagem (placeholder — adicione p.img em site-data.ts) */}
          <div style={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden", background: "#0a121d" }}>
            <div className="gl-ph" style={{ position: "absolute", inset: 0 }} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                letterSpacing: ".18em",
                color: "rgba(245,240,235,.25)",
                textTransform: "uppercase",
                textAlign: "center",
                padding: 16,
              }}
            >
              {p.nome}
            </div>
          </div>

          {/* Detalhes */}
          <div>
            <div style={{ fontWeight: 300, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", color: "#C9A86A" }}>{p.tipo}</div>
            <h1 style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 500, fontSize: "clamp(26px,3.4vw,40px)", lineHeight: 1.15, color: "#F5F0EB", marginTop: 10 }}>
              {p.nome}
            </h1>
            <div style={{ fontWeight: 400, fontSize: 24, color: "#C9A86A", marginTop: 16 }}>{p.precoLabel}</div>
            <div style={{ width: 40, height: 1, background: "rgba(201,168,106,.5)", margin: "26px 0" }} />
            <p style={{ fontWeight: 300, fontSize: 16, lineHeight: 1.85, color: "rgba(245,240,235,.72)" }}>{p.descricao}</p>

            <AddAoCarrinho produto={p} />

            <ul style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 10, fontWeight: 300, fontSize: 13, color: "rgba(245,240,235,.6)", listStyle: "none" }}>
              <li>✓ Entrega rastreável para todo o Brasil</li>
              <li>✓ Troca em até 30 dias</li>
              <li>✓ Pagamento em Pix, cartão ou boleto</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
