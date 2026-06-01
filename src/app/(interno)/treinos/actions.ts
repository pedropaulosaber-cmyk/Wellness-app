"use server";

import { revalidatePath } from "next/cache";
import { requireAcesso } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getHoje } from "@/lib/datas";

export interface SeriePayload {
  exercicioId: string;
  exercicioNome: string;
  serie: number;
  reps: number;
  cargaKg?: number | null;
}

export interface SessaoPayload {
  modalidade: string;
  nome: string;
  tipo: string;
  duracaoMin?: number | null;
  distanciaKm?: number | null;
  paceSeg?: number | null;
  series?: SeriePayload[];
}

// Salva uma sessão de treino concluída (força ou cardio).
export async function salvarSessao(payload: SessaoPayload) {
  const usuario = await requireAcesso();
  const dia = getHoje();

  const sessao = await prisma.treinoSessao.create({
    data: {
      usuarioId: usuario.id,
      dia,
      modalidade: payload.modalidade,
      nome: payload.nome,
      tipo: payload.tipo,
      duracaoMin: payload.duracaoMin ?? null,
      distanciaKm: payload.distanciaKm ?? null,
      paceSeg: payload.paceSeg ?? null,
      series: payload.series?.length
        ? {
            create: payload.series.map((s) => ({
              usuarioId: usuario.id,
              exercicioId: s.exercicioId,
              exercicioNome: s.exercicioNome,
              serie: s.serie,
              reps: s.reps,
              cargaKg: s.cargaKg ?? null,
            })),
          }
        : undefined,
    },
  });

  revalidatePath("/treinos");
  revalidatePath("/evolucao");
  revalidatePath("/inicio");
  return { ok: true, sessaoId: sessao.id };
}

/** Última carga registrada por exercício (para progressão), do próprio usuário. */
export async function ultimaCargaPorExercicio(
  exercicioIds: string[]
): Promise<Record<string, number>> {
  const usuario = await requireAcesso();
  const mapa: Record<string, number> = {};
  for (const id of exercicioIds) {
    const ultima = await prisma.serieRegistro.findFirst({
      where: { usuarioId: usuario.id, exercicioId: id, cargaKg: { not: null } },
      orderBy: { criadoEm: "desc" },
    });
    if (ultima?.cargaKg != null) mapa[id] = ultima.cargaKg;
  }
  return mapa;
}
