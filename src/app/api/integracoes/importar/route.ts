import { NextResponse } from "next/server";
import { getUsuario } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getHoje } from "@/lib/datas";
import { upsertAtividade, type FonteAtividade } from "@/lib/integracoes";

const FONTES_VALIDAS: FonteAtividade[] = [
  "apple_health",
  "google_fit",
  "health_connect",
  "manual",
];

/**
 * Importa atividade de um app de saúde.
 * Auth: sessão do app OU ?token=<syncToken> (para Atalhos/Health Connect).
 *
 * Body JSON: { dia?, fonte?, passos?, caloriasAtivas?, freqCardiacaMedia? }
 */
export async function POST(req: Request) {
  // 1) Resolve o usuário (token externo ou sessão)
  const token = new URL(req.url).searchParams.get("token");
  let usuarioId: string | null = null;

  if (token) {
    const u = await prisma.usuario.findUnique({ where: { syncToken: token } });
    usuarioId = u?.id ?? null;
  } else {
    const u = await getUsuario();
    usuarioId = u?.id ?? null;
  }
  if (!usuarioId) {
    return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });
  }

  // 2) Valida o corpo
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const fonte = (body.fonte as FonteAtividade) ?? "manual";
  if (!FONTES_VALIDAS.includes(fonte)) {
    return NextResponse.json({ ok: false, error: "Fonte inválida" }, { status: 400 });
  }
  const dia = typeof body.dia === "string" ? body.dia : getHoje();

  const num = (v: unknown) =>
    typeof v === "number" && Number.isFinite(v) && v >= 0 ? Math.round(v) : undefined;

  await upsertAtividade(usuarioId, dia, fonte, {
    passos: num(body.passos),
    caloriasAtivas: num(body.caloriasAtivas),
    freqCardiacaMedia: num(body.freqCardiacaMedia),
  });

  return NextResponse.json({ ok: true });
}
