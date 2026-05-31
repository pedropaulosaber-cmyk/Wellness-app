import { NextResponse } from "next/server";
import { getProvider } from "@/lib/pagamento";
import { prisma } from "@/lib/prisma";

// Webhook do gateway: ao confirmar o pagamento, libera o acesso vitalício.
// Não exige login (é chamado pelo gateway) — a segurança vem da validação
// da assinatura/segredo dentro de validarWebhook.
export async function POST(req: Request) {
  const corpo = await req.text();
  const resultado = await getProvider().validarWebhook(req, corpo);
  if (!resultado) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await prisma.usuario.update({
    where: { id: resultado.usuarioId },
    data: { acessoVitalicio: true, compraEm: new Date() },
  });

  return NextResponse.json({ ok: true });
}
