"use client";

import { useCallback, useEffect, useState } from "react";
import LineChart from "@/components/LineChart";
import BarChart from "@/components/BarChart";
import PesoForm from "@/components/PesoForm";
import { getHoje, ultimosDias } from "@/lib/datas";
import { calcularStreak, calcularConquistas, type Conquista } from "@/lib/conquistas";
import { diasAtivos, getPesos, getSessoes, getTotais } from "@/lib/local";

export default function EvolucaoPage() {
  const [pontosPeso, setPontosPeso] = useState<{ rotulo: string; valor: number }[]>([]);
  const [barras, setBarras] = useState<{ rotulo: string; valor: number }[]>([]);
  const [streak, setStreak] = useState(0);
  const [totais, setTotais] = useState({ refeicoes: 0, sessoes: 0, pesos: 0 });
  const [conquistas, setConquistas] = useState<Conquista[]>([]);
  const [pronto, setPronto] = useState(false);

  const recarregar = useCallback(() => {
    const pesos = getPesos();
    setPontosPeso(pesos.map((p) => ({ rotulo: p.dia.slice(5), valor: p.pesoKg })));

    const sessoes = getSessoes();
    const dias14 = ultimosDias(14);
    const cont = new Map<string, number>();
    sessoes.forEach((s) => cont.set(s.dia, (cont.get(s.dia) ?? 0) + 1));
    setBarras(dias14.map((d) => ({ rotulo: d.slice(8), valor: cont.get(d) ?? 0 })));

    const t = getTotais();
    setTotais(t);
    const s = calcularStreak(diasAtivos(), getHoje());
    setStreak(s);
    setConquistas(
      calcularConquistas({
        totalTreinos: t.sessoes,
        totalRefeicoes: t.refeicoes,
        registrosPeso: t.pesos,
        streak: s,
      })
    );
  }, []);

  useEffect(() => {
    recarregar();
    setPronto(true);
  }, [recarregar]);

  if (!pronto) return null;

  return (
    <main className="flex flex-col gap-4 px-4 pb-6 pt-6">
      <h1 className="text-2xl font-bold text-viva-900">Evolução</h1>

      <section className="cartao flex items-center justify-between">
        <div>
          <p className="text-sm text-viva-500">Sequência atual</p>
          <p className="text-3xl font-extrabold text-viva">
            🔥 {streak} {streak === 1 ? "dia" : "dias"}
          </p>
        </div>
        <div className="text-right text-sm text-viva-500">
          <p>{totais.sessoes} treinos</p>
          <p>{totais.refeicoes} refeições</p>
        </div>
      </section>

      <section className="cartao">
        <h2 className="mb-1 text-sm font-semibold text-viva-700">Peso</h2>
        <LineChart pontos={pontosPeso} unidade="kg" />
      </section>
      <PesoForm onSalvar={recarregar} />

      <section className="cartao">
        <h2 className="mb-2 text-sm font-semibold text-viva-700">Treinos (últimos 14 dias)</h2>
        <BarChart barras={barras} />
      </section>

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
