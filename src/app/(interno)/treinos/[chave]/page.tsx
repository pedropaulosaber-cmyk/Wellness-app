"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { gerarPlanoSemanal, type SessaoPlanejada } from "@/lib/treino";
import { getPerfil, ultimaCarga } from "@/lib/local";
import PlayerForca from "@/components/PlayerForca";
import CardioForm from "@/components/CardioForm";

export default function SessaoPage() {
  const params = useParams<{ chave: string }>();
  const [sessao, setSessao] = useState<SessaoPlanejada | null>(null);
  const [cargas, setCargas] = useState<Record<string, number>>({});
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const p = getPerfil();
    if (p) {
      const plano = gerarPlanoSemanal({
        modalidades: p.modalidades,
        objetivo: p.objetivo,
        experienciaTreino: p.experienciaTreino,
        lesoes: p.lesoes,
      });
      const s = plano.find((x) => x.chave === params.chave) ?? null;
      setSessao(s);
      if (s && s.tipo === "forca") {
        const m: Record<string, number> = {};
        s.itens.forEach((it) => {
          const c = ultimaCarga(it.exercicioId);
          if (c != null) m[it.exercicioId] = c;
        });
        setCargas(m);
      }
    }
    setPronto(true);
  }, [params.chave]);

  if (!pronto) return null;

  if (!sessao) {
    return (
      <main className="flex min-h-dvh flex-col items-start gap-4 px-4 pt-6">
        <h1 className="text-xl font-bold text-viva-900">Treino não encontrado</h1>
        <Link href="/treinos" className="btn-secundario">
          Voltar aos treinos
        </Link>
      </main>
    );
  }

  return sessao.tipo === "forca" ? (
    <PlayerForca sessao={sessao} ultimaCarga={cargas} />
  ) : (
    <CardioForm sessao={sessao} />
  );
}
