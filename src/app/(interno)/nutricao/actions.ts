"use server";

import { revalidatePath } from "next/cache";
import { requireAcesso } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getHoje } from "@/lib/datas";
import type { ItemCardapio } from "@/lib/cardapio";

// Registra uma refeição inteira (todos os itens) no dia de hoje.
export async function registrarRefeicao(refeicao: string, itens: ItemCardapio[]) {
  const usuario = await requireAcesso();
  const dia = getHoje();

  await prisma.registroAlimentar.createMany({
    data: itens.map((it) => ({
      usuarioId: usuario.id,
      dia,
      refeicao,
      nome: it.nome,
      gramas: it.gramas,
      kcal: it.kcal,
      proteina: it.proteina,
      carbo: it.carbo,
      gordura: it.gordura,
    })),
  });

  revalidatePath("/nutricao");
  revalidatePath("/inicio");
}

// Remove um registro (sempre escopado ao usuário — isolamento na aplicação).
export async function removerRegistro(id: string) {
  const usuario = await requireAcesso();
  await prisma.registroAlimentar.deleteMany({ where: { id, usuarioId: usuario.id } });
  revalidatePath("/nutricao");
  revalidatePath("/inicio");
}

// Adiciona água (ml) ao dia de hoje.
export async function registrarAgua(ml: number) {
  const usuario = await requireAcesso();
  await prisma.registroAgua.create({
    data: { usuarioId: usuario.id, dia: getHoje(), ml },
  });
  revalidatePath("/nutricao");
  revalidatePath("/inicio");
}
