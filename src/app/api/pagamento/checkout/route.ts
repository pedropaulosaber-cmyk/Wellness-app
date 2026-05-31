import { NextResponse } from "next/server";
import { getUsuario } from "@/lib/auth";
import { getProvider } from "@/lib/pagamento";

// Cria a cobrança única e devolve a URL de checkout do gateway.
export async function POST() {
  const usuario = await getUsuario();
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "Não autenticado" }, { status: 401 });
  }
  if (usuario.acessoVitalicio) {
    return NextResponse.json({ ok: true, jaPago: true, checkoutUrl: "/inicio" });
  }

  try {
    const cobranca = await getProvider().criarCobranca({
      usuarioId: usuario.id,
      email: usuario.email,
    });
    return NextResponse.json({ ok: true, ...cobranca });
  } catch (e) {
    console.error("checkout:", e);
    return NextResponse.json(
      { ok: false, error: "Não foi possível iniciar o pagamento" },
      { status: 500 }
    );
  }
}
