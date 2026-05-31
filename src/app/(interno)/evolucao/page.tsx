import { requireAcesso } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getHoje, ultimosDias } from "@/lib/datas";
import { calcularStreak, calcularConquistas } from "@/lib/conquistas";
import LineChart from "@/components/LineChart";
import BarChart from "@/components/BarChart";
import PesoForm from "@/components/PesoForm";

export const dynamic = "force-dynamic";

export default async function EvolucaoPage() {
  const usuario = await requireAcesso();

  const [pesos, sessoes, refeicoes, aguas] = await Promise.all([
    prisma.registroPeso.findMany({
      where: { usuarioId: usuario.id },
      orderBy: { criadoEm: "asc" },
    }),
    prisma.treinoSessao.findMany({
      where: { usuarioId: usuario.id },
      select: { dia: true },
    }),
    prisma.registroAlimentar.findMany({
      where: { usuarioId: usuario.id },
      select: { dia: true },
    }),
    prisma.registroAgua.findMany({
      where: { usuarioId: usuario.id },
      select: { dia: true },
    }),
  ]);

  // Streak: qualquer atividade conta
  const diasAtivos = new Set<string>([
    ...sessoes.map((s) => s.dia),
    ...refeicoes.map((r) => r.dia),
    ...aguas.map((a) => a.dia),
    ...pesos.map((p) => p.dia),
  ]);
  const streak = calcularStreak(diasAtivos, getHoje());

  const conquistas = calcularConquistas({
    totalTreinos: sessoes.length,
    totalRefeicoes: refeicoes.length,
    registrosPeso: pesos.length,
    streak,
  });

  // Treinos por dia (últimos 14 dias)
  const dias14 = ultimosDias(14);
  const contagem = new Map<string, number>();
  sessoes.forEach((s) => contagem.set(s.dia, (contagem.get(s.dia) ?? 0) + 1));
  const barras = dias14.map((d) => ({ rotulo: d.slice(8), valor: contagem.get(d) ?? 0 }));

  // Pontos de peso
  const pontosPeso = pesos.map((p) => ({ rotulo: p.dia.slice(5), valor: p.pesoKg }));

  return (
    <main className="flex flex-col gap-4 px-4 pb-6 pt-6">
      <h1 className="text-2xl font-bold text-viva-900">Evolução</h1>

      {/* Streak */}
      <section className="cartao flex items-center justify-between">
        <div>
          <p className="text-sm text-viva-500">Sequência atual</p>
          <p className="text-3xl font-extrabold text-viva">
            🔥 {streak} {streak === 1 ? "dia" : "dias"}
          </p>
        </div>
        <div className="text-right text-sm text-viva-500">
          <p>{sessoes.length} treinos</p>
          <p>{refeicoes.length} refeições</p>
        </div>
      </section>

      {/* Peso */}
      <section className="cartao">
        <h2 className="mb-1 text-sm font-semibold text-viva-700">Peso</h2>
        <LineChart pontos={pontosPeso} unidade="kg" />
      </section>
      <PesoForm />

      {/* Treinos */}
      <section className="cartao">
        <h2 className="mb-2 text-sm font-semibold text-viva-700">
          Treinos (últimos 14 dias)
        </h2>
        <BarChart barras={barras} />
      </section>

      {/* Conquistas */}
      <section>
        <h2 className="mb-2 text-sm font-semibold text-viva-700">Conquistas</h2>
        <div className="grid grid-cols-2 gap-2">
          {conquistas.map((c) => (
            <div
              key={c.id}
              className={`cartao flex items-center gap-2 ${
                c.conquistada ? "" : "opacity-40 grayscale"
              }`}
            >
              <span className="text-2xl">{c.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-viva-900">{c.titulo}</p>
                <p className="text-[11px] text-viva-400">{c.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
