import { NextResponse } from "next/server";
import { getUsuario } from "@/lib/auth";
import { ehSimulado } from "@/lib/pagamento";
import { prisma } from "@/lib/prisma";

// Confirma o pagamento no modo SIMULADO (apenas quando não há gateway real).
// Em produção (PAGAMENTO_PROVIDER definido) esta rota é desativada.
export async function POST() {
  if (!ehSimulado()) {
    return NextResponse.json(
      { ok: false, error: "Indisponível em produção" },
      { status: 403 }
    );
  }
  const usuario = await getUsuario();
  if (!usuario) {
    return NextResponse.json({ ok: false, error: "Não autenticado" }, { status: 401 });
  }

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { acessoVitalicio: true, compraEm: new Date() },
  });

  return NextResponse.json({ ok: true });
}
