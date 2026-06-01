"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SessaoPlanejada } from "@/lib/treino";
import { sugerirCarga } from "@/lib/treino";
import { addSessao, type SerieLog } from "@/lib/local";

interface SerieEstado {
  reps: number;
  cargaKg: number | null;
  feito: boolean;
}

function repsIniciais(repsAlvo: string): number {
  const m = repsAlvo.match(/\d+/);
  return m ? Number(m[0]) : 10;
}

export default function PlayerForca({
  sessao,
  ultimaCarga,
}: {
  sessao: SessaoPlanejada;
  ultimaCarga: Record<string, number>;
}) {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [salvando, setSalvando] = useState(false);

  // Estado das séries por exercício
  const [series, setSeries] = useState<SerieEstado[][]>(() =>
    sessao.itens.map((it) => {
      const sug = sugerirCarga(ultimaCarga[it.exercicioId] ?? null).sugestao;
      return Array.from({ length: it.series }, () => ({
        reps: repsIniciais(it.repsAlvo),
        cargaKg: sug,
        feito: false,
      }));
    })
  );

  // Cronômetro de descanso
  const [descanso, setDescanso] = useState(0); // segundos restantes
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (descanso <= 0) {
      if (timer.current) clearInterval(timer.current);
      return;
    }
    timer.current = setInterval(() => setDescanso((d) => d - 1), 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [descanso > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  const item = sessao.itens[idx];
  const exSeries = series[idx];
  const total = sessao.itens.length;
  const concluidas = series.flat().filter((s) => s.feito).length;

  function atualizar(serieIdx: number, patch: Partial<SerieEstado>) {
    setSeries((prev) =>
      prev.map((ex, i) =>
        i === idx ? ex.map((s, j) => (j === serieIdx ? { ...s, ...patch } : s)) : ex
      )
    );
  }

  function marcarFeita(serieIdx: number) {
    atualizar(serieIdx, { feito: true });
    setDescanso(75); // inicia descanso
  }

  function finalizar() {
    setSalvando(true);
    const payload: SerieLog[] = [];
    sessao.itens.forEach((it, i) => {
      series[i].forEach((s, j) => {
        if (s.feito)
          payload.push({
            exercicioId: it.exercicioId,
            exercicioNome: it.nome,
            serie: j + 1,
            reps: s.reps,
            cargaKg: s.cargaKg,
          });
      });
    });
    addSessao({
      modalidade: sessao.modalidade,
      nome: sessao.titulo,
      tipo: "forca",
      series: payload,
    });
    router.push("/treinos");
  }

  return (
    <main className="flex min-h-dvh flex-col px-4 pb-6 pt-5">
      {/* Cabeçalho + progresso */}
      <div className="mb-3">
        <p className="text-xs text-viva-400">
          {sessao.titulo} · exercício {idx + 1}/{total}
        </p>
        <h1 className="text-xl font-bold text-viva-900">{item.nome}</h1>
        <p className="text-sm text-viva-500">{item.instrucoes}</p>
      </div>

      {/* Descanso */}
      {descanso > 0 && (
        <div className="mb-3 flex items-center justify-between rounded-xl bg-viva-50 px-4 py-3">
          <span className="text-sm font-semibold text-viva">
            Descanso: {descanso}s
          </span>
          <div className="flex gap-2">
            <button onClick={() => setDescanso((d) => d + 15)} className="text-sm text-viva">
              +15s
            </button>
            <button onClick={() => setDescanso(0)} className="text-sm text-viva-400">
              Pular
            </button>
          </div>
        </div>
      )}

      {/* Séries */}
      <div className="flex flex-col gap-2">
        {exSeries.map((s, j) => (
          <div
            key={j}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${
              s.feito ? "border-viva bg-viva-50" : "border-viva-200"
            }`}
          >
            <span className="w-12 text-sm font-semibold text-viva-700">Série {j + 1}</span>
            <label className="flex items-center gap-1 text-xs text-viva-400">
              kg
              <input
                type="number"
                inputMode="decimal"
                step="0.5"
                value={s.cargaKg ?? ""}
                onChange={(e) =>
                  atualizar(j, { cargaKg: e.target.value === "" ? null : Number(e.target.value) })
                }
                className="w-16 rounded-lg border border-viva-200 px-2 py-1 text-base text-viva-900"
              />
            </label>
            <label className="flex items-center gap-1 text-xs text-viva-400">
              reps
              <input
                type="number"
                inputMode="numeric"
                value={s.reps}
                onChange={(e) => atualizar(j, { reps: Number(e.target.value) })}
                className="w-14 rounded-lg border border-viva-200 px-2 py-1 text-base text-viva-900"
              />
            </label>
            <button
              onClick={() => marcarFeita(j)}
              disabled={s.feito}
              className={`toque ml-auto rounded-lg px-3 py-1 text-sm font-semibold ${
                s.feito ? "text-viva" : "bg-viva text-white"
              }`}
            >
              {s.feito ? "✓" : "OK"}
            </button>
          </div>
        ))}
      </div>

      <p className="mt-2 text-xs text-viva-400">
        Meta: {item.series} × {item.repsAlvo} reps.{" "}
        {sugerirCarga(ultimaCarga[item.exercicioId] ?? null).texto}
      </p>

      {/* Navegação */}
      <div className="mt-auto flex gap-3 pt-6">
        {idx > 0 && (
          <button onClick={() => setIdx((i) => i - 1)} className="btn-secundario flex-1">
            Anterior
          </button>
        )}
        {idx < total - 1 ? (
          <button onClick={() => setIdx((i) => i + 1)} className="btn-primario flex-1">
            Próximo
          </button>
        ) : (
          <button
            onClick={finalizar}
            disabled={salvando || concluidas === 0}
            className="btn-primario flex-1"
          >
            {salvando ? "Salvando…" : `Concluir treino (${concluidas} séries)`}
          </button>
        )}
      </div>
    </main>
  );
}
