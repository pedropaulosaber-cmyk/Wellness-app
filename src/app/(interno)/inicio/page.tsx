import Link from "next/link";
import { requireAcesso } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getHoje } from "@/lib/datas";
import ProgressRing from "@/components/ProgressRing";

export const dynamic = "force-dynamic";

export default async function InicioPage() {
  const usuario = await requireAcesso();
  const perfil = await prisma.perfil.findUnique({ where: { usuarioId: usuario.id } });

  const temPlano = perfil?.caloriasAlvo != null;
  const dia = getHoje();

  // Consumo real de hoje (escopado por usuarioId)
  const [registros, aguas] = temPlano
    ? await Promise.all([
        prisma.registroAlimentar.findMany({ where: { usuarioId: usuario.id, dia } }),
        prisma.registroAgua.findMany({ where: { usuarioId: usuario.id, dia } }),
      ])
    : [[], []];
  const kcalHoje = registros.reduce((s, r) => s + r.kcal, 0);
  const protHoje = registros.reduce((s, r) => s + r.proteina, 0);
  const aguaHoje = aguas.reduce((s, a) => s + a.ml, 0);

  return (
    <main className="flex flex-col gap-5 px-4 pb-6 pt-6">
      <header>
        <span className="text-sm font-semibold uppercase tracking-wide text-viva-400">
          Olá{usuario.nome ? `, ${usuario.nome.split(" ")[0]}` : ""}
        </span>
        <h1 className="text-2xl font-bold text-viva-900">Seu dia no Vivá</h1>
      </header>

      {!temPlano ? (
        <section className="cartao flex flex-col items-start gap-3">
          <p className="text-sm text-viva-700">
            Para liberar seu plano personalizado, responda a anamnese (objetivo,
            rotina, sono, lesões e experiência de treino).
          </p>
          <Link href="/anamnese" className="btn-primario">
            Responder anamnese
          </Link>
        </section>
      ) : (
        <>
          {/* Consumo do dia (logging real chega na Fase 7 — começa zerado) */}
          <section className="cartao">
            <h2 className="mb-3 text-sm font-semibold text-viva-700">Metas de hoje</h2>
            <div className="grid grid-cols-3 gap-2">
              <ProgressRing
                valor={kcalHoje}
                meta={perfil!.caloriasAlvo!}
                rotulo={kcalHoje.toLocaleString("pt-BR")}
                legenda="kcal"
              />
              <ProgressRing
                valor={protHoje}
                meta={perfil!.proteinaG ?? 0}
                rotulo={`${protHoje}g`}
                legenda="proteína"
                cor="#4F9E78"
              />
              <ProgressRing
                valor={aguaHoje}
                meta={perfil!.aguaMl ?? 0}
                rotulo={`${(aguaHoje / 1000).toLocaleString("pt-BR")}L`}
                legenda="água"
                cor="#7CC29E"
              />
            </div>
            <p className="mt-3 text-center text-xs text-viva-400">
              Meta: {perfil!.caloriasAlvo!.toLocaleString("pt-BR")} kcal ·{" "}
              {perfil!.proteinaG}P / {perfil!.carboidratoG}C / {perfil!.gorduraG}G
            </p>
          </section>

          <div className="grid grid-cols-2 gap-3">
            <Link href="/nutricao" className="cartao text-center">
              <span className="text-2xl">🥗</span>
              <p className="mt-1 text-sm font-semibold text-viva-700">Registrar refeição</p>
            </Link>
            <Link href="/treinos" className="cartao text-center">
              <span className="text-2xl">🏋️</span>
              <p className="mt-1 text-sm font-semibold text-viva-700">Treinar agora</p>
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
