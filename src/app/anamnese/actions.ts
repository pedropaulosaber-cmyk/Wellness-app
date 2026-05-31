"use server";

import { requireUsuario } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  gerarPlanoNutricional,
  planoParaExibicao,
  type NivelAtividade,
  type Objetivo,
  type Sexo,
} from "@/lib/nutrition";

export interface DadosAnamnese {
  sexo: Sexo;
  idade: number;
  pesoKg: number;
  alturaCm: number;
  nivelAtividade: NivelAtividade;
  objetivo: Objetivo;
  // Anamnese aprofundada
  rotinaTrabalho?: string;
  horasSono?: number;
  qualidadeSono?: number; // 1–5
  lesoes?: string;
  experienciaTreino?: string; // iniciante | intermediario | avancado
  modalidades: string[];
  restricoes: string[];
}

export type ResultadoAnamnese =
  | { ok: true; plano: ReturnType<typeof planoParaExibicao> }
  | { ok: false; error: string };

/**
 * Calcula o plano nutricional (motor: nutrition.ts) e PERSISTE o perfil no
 * banco. Recalcula sempre que o usuário refaz a anamnese (peso/objetivo/rotina).
 */
export async function salvarAnamnese(dados: DadosAnamnese): Promise<ResultadoAnamnese> {
  const usuario = await requireUsuario();

  let plano;
  try {
    plano = gerarPlanoNutricional({
      sexo: dados.sexo,
      idade: dados.idade,
      pesoKg: dados.pesoKg,
      alturaCm: dados.alturaCm,
      nivelAtividade: dados.nivelAtividade,
      objetivo: dados.objetivo,
    });
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Dados inválidos" };
  }

  const exib = planoParaExibicao(plano);

  await prisma.perfil.upsert({
    where: { usuarioId: usuario.id },
    update: {
      sexo: dados.sexo,
      idade: dados.idade,
      pesoKg: dados.pesoKg,
      alturaCm: dados.alturaCm,
      nivelAtividade: dados.nivelAtividade,
      objetivo: dados.objetivo,
      rotinaTrabalho: dados.rotinaTrabalho,
      horasSono: dados.horasSono,
      qualidadeSono: dados.qualidadeSono,
      lesoes: dados.lesoes,
      experienciaTreino: dados.experienciaTreino,
      modalidades: dados.modalidades,
      restricoes: dados.restricoes,
      caloriasAlvo: exib.caloriasAlvo,
      proteinaG: exib.macros.proteinaG,
      carboidratoG: exib.macros.carboidratoG,
      gorduraG: exib.macros.gorduraG,
      aguaMl: exib.aguaMl,
    },
    create: {
      usuarioId: usuario.id,
      sexo: dados.sexo,
      idade: dados.idade,
      pesoKg: dados.pesoKg,
      alturaCm: dados.alturaCm,
      nivelAtividade: dados.nivelAtividade,
      objetivo: dados.objetivo,
      rotinaTrabalho: dados.rotinaTrabalho,
      horasSono: dados.horasSono,
      qualidadeSono: dados.qualidadeSono,
      lesoes: dados.lesoes,
      experienciaTreino: dados.experienciaTreino,
      modalidades: dados.modalidades,
      restricoes: dados.restricoes,
      caloriasAlvo: exib.caloriasAlvo,
      proteinaG: exib.macros.proteinaG,
      carboidratoG: exib.macros.carboidratoG,
      gorduraG: exib.macros.gorduraG,
      aguaMl: exib.aguaMl,
    },
  });

  return { ok: true, plano: exib };
}
