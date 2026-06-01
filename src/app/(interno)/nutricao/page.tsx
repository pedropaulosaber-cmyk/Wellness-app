"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import CardapioCliente from "@/components/CardapioCliente";
import AguaControle from "@/components/AguaControle";
import { getPerfil, getRefeicoes, getAguaHoje, type PerfilLocal, type RefeicaoLog } from "@/lib/local";
import { DIETAS } from "@/lib/dietas";

export default function NutricaoPage() {
  const [perfil, setPerfil] = useState<PerfilLocal | null>(null);
  const [regs, setRegs] = useState<RefeicaoLog[]>([]);
  const [agua, setAgua] = useState(0);
  const [pronto, setPronto] = useState(false);

  const recarregar = useCallback(() => {
    setRegs(getRefeicoes());
    setAgua(getAguaHoje());
  }, []);

  useEffect(() => {
    setPerfil(getPerfil());
    recarregar();
    setPronto(true);
  }, [recarregar]);

  if (!pronto) return null;

  const tot = regs.reduce(
    (s, r) => ({
      kcal: s.kcal + r.kcal,
      proteina: s.proteina + r.proteina,
      carbo: s.carbo + r.carbo,
      gordura: s.gordura + r.gordura,
    }),
    { kcal: 0, proteina: 0, carbo: 0, gordura: 0 }
  );

  return (
    <main className="flex flex-col gap-4 px-4 pb-6 pt-6">
      <h1 className="text-2xl font-bold text-viva-900">Nutrição</h1>

      {!perfil ? (
        <div className="cartao flex flex-col items-start gap-3">
          <p className="text-sm text-viva-700">
            Responda a anamnese para gerar seu plano e seu cardápio.
          </p>
          <Link href="/anamnese" className="btn-primario">
            Responder anamnese
          </Link>
        </div>
      ) : (
        <>
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

          <AguaControle consumido={agua} meta={perfil.aguaMl} onAdd={recarregar} />

          <div>
            <h2 className="mb-2 text-sm font-semibold text-viva-700">
              Cardápio sugerido (alimentos brasileiros)
            </h2>
            <CardapioCliente
              caloriasAlvo={perfil.caloriasAlvo}
              restricoes={perfil.restricoes}
              onRegistrar={recarregar}
            />
          </div>

          {regs.length > 0 && (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-viva-700">Registrado hoje</h2>
              <ul className="cartao flex flex-col gap-1 text-sm text-viva-700">
                {regs.map((r) => (
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
        </>
      )}

      {/* Dietas prontas (fontes confiáveis) */}
      <section>
        <h2 className="mb-2 text-sm font-semibold text-viva-700">Dietas prontas</h2>
        <div className="flex flex-col gap-2">
          {DIETAS.map((d) => (
            <details key={d.id} className="cartao">
              <summary className="cursor-pointer list-none">
                <span className="font-semibold text-viva-900">{d.titulo}</span>
                <p className="mt-0.5 text-sm text-viva-600">{d.resumo}</p>
                <p className="mt-1 text-xs text-viva-400">Indicada para: {d.indicada}</p>
              </summary>
              <div className="mt-3 border-t border-viva-100 pt-3">
                <p className="mb-1 text-xs font-semibold uppercase text-viva-400">Princípios</p>
                <ul className="mb-3 list-disc pl-5 text-sm text-viva-700">
                  {d.principios.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="mb-1 text-xs font-semibold uppercase text-viva-400">Dia exemplo</p>
                <div className="space-y-1 text-sm text-viva-700">
                  {d.diaExemplo.map((r) => (
                    <p key={r.nome}>
                      <span className="font-medium">{r.nome}:</span> {r.itens.join(", ")}
                    </p>
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-viva-400">Fonte: {d.fonte}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <p className="text-[11px] text-viva-400">
        Conteúdo baseado no Guia Alimentar (Ministério da Saúde) e tabela TACO. Estimativas —
        não substituem orientação nutricional.
      </p>
    </main>
  );
}
