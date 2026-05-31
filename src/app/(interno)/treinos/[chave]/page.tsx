import { notFound } from "next/navigation";
import { requireAcesso } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { gerarPlanoSemanal } from "@/lib/treino";
import { ultimaCargaPorExercicio } from "@/app/(interno)/treinos/actions";
import PlayerForca from "@/components/PlayerForca";
import CardioForm from "@/components/CardioForm";

export const dynamic = "force-dynamic";

export default async function SessaoPage({ params }: { params: { chave: string } }) {
  const usuario = await requireAcesso();
  const perfil = await prisma.perfil.findUnique({ where: { usuarioId: usuario.id } });
  if (!perfil) notFound();

  const plano = gerarPlanoSemanal({
    modalidades: perfil.modalidades,
    objetivo: perfil.objetivo,
    experienciaTreino: perfil.experienciaTreino,
    lesoes: perfil.lesoes,
  });
  const sessao = plano.find((s) => s.chave === params.chave);
  if (!sessao) notFound();

  if (sessao.tipo === "forca") {
    const cargas = await ultimaCargaPorExercicio(sessao.itens.map((i) => i.exercicioId));
    return <PlayerForca sessao={sessao} ultimaCarga={cargas} />;
  }

  return <CardioForm sessao={sessao} />;
}
