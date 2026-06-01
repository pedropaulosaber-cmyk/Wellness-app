"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SessaoPlanejada } from "@/lib/treino";
import { salvarSessao } from "@/app/(interno)/treinos/actions";

// Registro de sessão de cardio/mobilidade (corrida, bike, natação, pilates…).
export default function CardioForm({ sessao }: { sessao: SessaoPlanejada }) {
  const router = useRouter();
  const ehCardio = sessao.tipo === "cardio";
  const [duracao, setDuracao] = useState<number | "">(sessao.duracaoMin ?? "");
  const [distancia, setDistancia] = useState<number | "">("");
  const [salvando, setSalvando] = useState(false);

  // pace (min/km) calculado a partir de duração e distância
  const paceSeg =
    ehCardio && duracao && distancia && Number(distancia) > 0
      ? Math.round((Number(duracao) * 60) / Number(distancia))
      : null;
  const paceTexto = paceSeg
    ? `${Math.floor(paceSeg / 60)}:${String(paceSeg % 60).padStart(2, "0")} /km`
    : "—";

  async function salvar() {
    setSalvando(true);
    await salvarSessao({
      modalidade: sessao.modalidade,
      nome: sessao.titulo,
      tipo: sessao.tipo,
      duracaoMin: duracao === "" ? null : Number(duracao),
      distanciaKm: distancia === "" ? null : Number(distancia),
      paceSeg,
    });
    router.push("/treinos");
    router.refresh();
  }

  return (
    <main className="flex min-h-dvh flex-col px-4 pb-6 pt-5">
      <p className="text-xs text-viva-400">{sessao.modalidade}</p>
      <h1 className="text-xl font-bold text-viva-900">{sessao.titulo}</h1>
      {sessao.descricao && <p className="mt-1 text-sm text-viva-500">{sessao.descricao}</p>}

      <div className="mt-5 flex flex-col gap-3">
        <label className="text-sm font-medium text-viva-700">
          Duração (min)
          <input
            type="number"
            inputMode="numeric"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value === "" ? "" : Number(e.target.value))}
            className="mt-1 w-full rounded-xl border border-viva-200 px-3 py-2 text-base"
          />
        </label>

        {ehCardio && sessao.modalidade !== "Natação" && (
          <>
            <label className="text-sm font-medium text-viva-700">
              Distância (km)
              <input
                type="number"
                inputMode="decimal"
                step="0.1"
                value={distancia}
                onChange={(e) =>
                  setDistancia(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="mt-1 w-full rounded-xl border border-viva-200 px-3 py-2 text-base"
              />
            </label>
            <p className="text-sm text-viva-500">Pace: {paceTexto}</p>
          </>
        )}
      </div>

      <div className="mt-auto pt-6">
        <button onClick={salvar} disabled={salvando} className="btn-primario w-full">
          {salvando ? "Salvando…" : "Concluir treino"}
        </button>
      </div>
    </main>
  );
}
