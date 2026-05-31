import { requireUsuario } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AnamneseForm from "@/components/AnamneseForm";
import type { DadosAnamnese } from "@/app/anamnese/actions";

export const dynamic = "force-dynamic";

export default async function AnamnesePage() {
  const usuario = await requireUsuario();
  // Pré-preenche se o usuário já respondeu antes (refazer/atualizar).
  const perfil = await prisma.perfil.findUnique({ where: { usuarioId: usuario.id } });

  const inicial: Partial<DadosAnamnese> | undefined = perfil
    ? {
        sexo: perfil.sexo,
        idade: perfil.idade,
        pesoKg: perfil.pesoKg,
        alturaCm: perfil.alturaCm,
        nivelAtividade: perfil.nivelAtividade,
        objetivo: perfil.objetivo,
        rotinaTrabalho: perfil.rotinaTrabalho ?? undefined,
        horasSono: perfil.horasSono ?? undefined,
        qualidadeSono: perfil.qualidadeSono ?? undefined,
        lesoes: perfil.lesoes ?? undefined,
        experienciaTreino: perfil.experienciaTreino ?? undefined,
        modalidades: perfil.modalidades,
        restricoes: perfil.restricoes,
      }
    : undefined;

  return <AnamneseForm inicial={inicial} jaPago={usuario.acessoVitalicio} />;
}
