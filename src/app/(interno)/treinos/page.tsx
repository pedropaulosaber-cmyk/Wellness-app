"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { gerarPlanoSemanal, type SessaoPlanejada } from "@/lib/treino";
import { getHoje } from "@/lib/datas";
import { getPerfil, getSessoes } from "@/lib/local";

export default function TreinosPage() {
  const [plano, setPlano] = useState<SessaoPlanejada[] | null>(null);
  const [lesoes, setLesoes] = useState<string | undefined>();
  const [feitos, setFeitos] = useState<Set<string>>(new Set());
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const p = getPerfil();
    if (p) {
      setPlano(
        gerarPlanoSemanal({
          modalidades: p.modalidades,
          objetivo: p.objetivo,
          experienciaTreino: p.experienciaTreino,
          lesoes: p.lesoes,
        })
      );
      setLesoes(p.lesoes ?? undefined);
      const hoje = getHoje();
      setFeitos(new Set(getSessoes().filter((s) => s.dia === hoje).map((s) => s.nome)));
    }
    setPronto(true);
  }, []);

  if (!pronto) return null;

  if (!plano) {
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

  return (
    <main className="flex flex-col gap-4 px-4 pb-6 pt-6">
      <h1 className="text-2xl font-bold text-viva-900">Seu plano de treino</h1>
      {lesoes && lesoes.toLowerCase() !== "nenhuma" && (
        <p className="rounded-xl bg-viva-50 px-3 py-2 text-xs text-viva-700">
          ⚠️ Exercícios adaptados às suas limitações: {lesoes}
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
              {feitos.has(s.titulo) ? "✓ hoje" : "Iniciar →"}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
