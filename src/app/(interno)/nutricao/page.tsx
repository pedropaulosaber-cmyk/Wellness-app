import Link from "next/link";
import { requireAcesso } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getHoje } from "@/lib/datas";
import CardapioCliente from "@/components/CardapioCliente";
import AguaControle from "@/components/AguaControle";

export const dynamic = "force-dynamic";

export default async function NutricaoPage() {
  const usuario = await requireAcesso();
  const perfil = await prisma.perfil.findUnique({ where: { usuarioId: usuario.id } });
  const dia = getHoje();

  if (!perfil?.caloriasAlvo) {
    return (
      <main className="flex flex-col gap-4 px-4 pb-6 pt-6">
        <h1 className="text-2xl font-bold text-viva-900">Nutrição</h1>
        <div className="cartao flex flex-col items-start gap-3">
          <p className="text-sm text-viva-700">
            Responda a anamnese para gerar seu plano e seu cardápio.
          </p>
          <Link href="/anamnese" className="btn-primario">
            Responder anamnese
          </Link>
        </div>
      </main>
    );
  }

  // Consumo de hoje (sempre escopado por usuarioId)
  const [registros, aguas] = await Promise.all([
    prisma.registroAlimentar.findMany({
      where: { usuarioId: usuario.id, dia },
      orderBy: { criadoEm: "asc" },
    }),
    prisma.registroAgua.findMany({ where: { usuarioId: usuario.id, dia } }),
  ]);

  const tot = registros.reduce(
    (s, r) => ({
      kcal: s.kcal + r.kcal,
      proteina: s.proteina + r.proteina,
      carbo: s.carbo + r.carbo,
      gordura: s.gordura + r.gordura,
    }),
    { kcal: 0, proteina: 0, carbo: 0, gordura: 0 }
  );
  const aguaTotal = aguas.reduce((s, a) => s + a.ml, 0);

  return (
    <main className="flex flex-col gap-4 px-4 pb-6 pt-6">
      <h1 className="text-2xl font-bold text-viva-900">Nutrição</h1>

      {/* Resumo do dia */}
      <section className="cartao">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-viva-400">Consumido hoje</p>
            <p className="text-2xl font-bold text-viva-900">
              {tot.kcal.toLocaleString("pt-BR")}{" "}
              <span className="text-sm font-normal text-viva-400">
                / {perfil.caloriasAlvo.toLocaleString("pt-BR")} kcal
              </span>
            </p>
          </div>
          <p className="text-xs text-viva-500">
            {tot.proteina}/{perfil.proteinaG}P · {tot.carbo}/{perfil.carboidratoG}C ·{" "}
            {tot.gordura}/{perfil.gorduraG}G
          </p>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-viva-100">
          <div
            className="h-full bg-viva"
            style={{ width: `${Math.min((tot.kcal / perfil.caloriasAlvo) * 100, 100)}%` }}
          />
        </div>
      </section>

      <AguaControle consumido={aguaTotal} meta={perfil.aguaMl ?? 0} />

      {/* Cardápio sugerido */}
      <div>
        <h2 className="mb-2 text-sm font-semibold text-viva-700">
          Cardápio sugerido (alimentos brasileiros)
        </h2>
        <CardapioCliente
          caloriasAlvo={perfil.caloriasAlvo}
          restricoes={perfil.restricoes}
        />
      </div>

      {/* Registros de hoje */}
      {registros.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-viva-700">Registrado hoje</h2>
          <ul className="cartao flex flex-col gap-1 text-sm text-viva-700">
            {registros.map((r) => (
              <li key={r.id} className="flex justify-between">
                <span>
                  {r.nome} <span className="text-viva-300">({r.refeicao})</span>
                </span>
                <span className="text-viva-400">{r.kcal} kcal</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-[11px] text-viva-400">
        Cardápio gerado a partir da TACO/TBCA. Estimativas — não substituem
        orientação nutricional.
      </p>
    </main>
  );
}
