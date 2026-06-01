"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { requireAcesso } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getHoje } from "@/lib/datas";
import { upsertAtividade } from "@/lib/integracoes";

/** Gera (ou regenera) o token de sincronização do usuário. */
export async function gerarSyncToken(): Promise<{ token: string }> {
  const usuario = await requireAcesso();
  const token = `viva_${randomUUID().replace(/-/g, "")}`;
  await prisma.usuario.update({ where: { id: usuario.id }, data: { syncToken: token } });
  revalidatePath("/integracoes");
  return { token };
}

/** Importa passos de demonstração para hoje (testar a tela sem wearable). */
export async function importarDemo() {
  const usuario = await requireAcesso();
  const passos = 6000 + Math.floor(Math.random() * 5000);
  await upsertAtividade(usuario.id, getHoje(), "manual", {
    passos,
    caloriasAtivas: Math.round(passos * 0.04),
    freqCardiacaMedia: 78,
  });
  revalidatePath("/integracoes");
  revalidatePath("/inicio");
  return { ok: true, passos };
}
