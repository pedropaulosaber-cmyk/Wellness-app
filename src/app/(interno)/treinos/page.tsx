import Link from "next/link";
import { requireAcesso } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getHoje } from "@/lib/datas";
import { gerarPlanoSemanal } from "@/lib/treino";

export const dynamic = "force-dynamic";

export default async function TreinosPage() {
  const usuario = await requireAcesso();
  const perfil = await prisma.perfil.findUnique({ where: { usuarioId: usuario.id } });

  if (!perfil) {
    return (
      <main className="flex flex-col gap-4 px-4 pb-6 pt-6">
        <h1 className="text-2xl font-bold text-viva-900">Treinos</h1>
        <div className="cartao flex flex-col items-start gap-3">
          <p className="text-sm text-viva-700">
            Responda a anamnese para montar seu plano de treino adaptado às suas
            modalidades e lesões.
          </p>
          <Link href="/anamnese" className="btn-primario">
            Responder anamnese
          </Link>
        </div>
      </main>
    );
  }

  const plano = gerarPlanoSemanal({
    modalidades: perfil.modalidades,
    objetivo: perfil.objetivo,
    experienciaTreino: perfil.experienciaTreino,
    lesoes: perfil.lesoes,
  });

  const feitosHoje = await prisma.treinoSessao.findMany({
    where: { usuarioId: usuario.id, dia: getHoje() },
    select: { nome: true },
  });
  const nomesFeitos = new Set(feitosHoje.map((s) => s.nome));

  return (
    <main className="flex flex-col gap-4 px-4 pb-6 pt-6">
      <h1 className="text-2xl font-bold text-viva-900">Seu plano de treino</h1>
      {perfil.lesoes && perfil.lesoes.toLowerCase() !== "nenhuma" && (
        <p className="rounded-xl bg-viva-50 px-3 py-2 text-xs text-viva-700">
          ⚠️ Exercícios adaptados às suas limitações: {perfil.lesoes}
        </p>
      )}

      <div className="flex flex-col gap-3">
        {plano.map((s) => (
          <Link
            key={s.chave}
            href={`/treinos/${s.chave}`}
            className="cartao flex items-center justify-between"
          >
            <div>
              <p className="font-semibold text-viva-900">{s.titulo}</p>
              <p className="text-xs text-viva-400">
                {s.modalidade}
                {s.tipo === "forca"
                  ? ` · ${s.itens.length} exercícios`
                  : s.duracaoMin
                    ? ` · ${s.duracaoMin} min`
                    : ""}
              </p>
            </div>
            <span className="text-sm font-semibold text-viva">
              {nomesFeitos.has(s.titulo) ? "✓ hoje" : "Iniciar →"}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
