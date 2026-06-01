"use server";

import { revalidatePath } from "next/cache";
import { requireAcesso } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getHoje } from "@/lib/datas";
import { gerarPlanoNutricional, planoParaExibicao } from "@/lib/nutrition";

/**
 * Registra um novo peso e RECALCULA o plano nutricional (o plano se adapta
 * quando o usuário muda de peso, conforme o requisito do produto).
 */
export async function registrarPeso(pesoKg: number, cinturaCm?: number) {
  const usuario = await requireAcesso();
  if (!Number.isFinite(pesoKg) || pesoKg <= 0 || pesoKg > 500) {
    return { ok: false, error: "Peso inválido" };
  }

  await prisma.registroPeso.create({
    data: {
      usuarioId: usuario.id,
      dia: getHoje(),
      pesoKg,
      cinturaCm: cinturaCm && cinturaCm > 0 ? cinturaCm : null,
    },
  });

  // Recalcula o plano com o novo peso, se já houver perfil.
  const perfil = await prisma.perfil.findUnique({ where: { usuarioId: usuario.id } });
  if (perfil) {
    const exib = planoParaExibicao(
      gerarPlanoNutricional({
        sexo: perfil.sexo,
        idade: perfil.idade,
        pesoKg,
        alturaCm: perfil.alturaCm,
        nivelAtividade: perfil.nivelAtividade,
        objetivo: perfil.objetivo,
      })
    );
    await prisma.perfil.update({
      where: { usuarioId: usuario.id },
      data: {
        pesoKg,
        caloriasAlvo: exib.caloriasAlvo,
        proteinaG: exib.macros.proteinaG,
        carboidratoG: exib.macros.carboidratoG,
        gorduraG: exib.macros.gorduraG,
        aguaMl: exib.aguaMl,
      },
    });
  }

  revalidatePath("/evolucao");
  revalidatePath("/inicio");
  revalidatePath("/nutricao");
  return { ok: true };
}
