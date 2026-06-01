"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProgressRing from "@/components/ProgressRing";
import Logo from "@/components/Logo";
import { getPerfil, getRefeicoes, getAguaHoje, type PerfilLocal } from "@/lib/local";

export default function InicioPage() {
  const [perfil, setPerfil] = useState<PerfilLocal | null>(null);
  const [kcal, setKcal] = useState(0);
  const [prot, setProt] = useState(0);
  const [agua, setAgua] = useState(0);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const p = getPerfil();
    setPerfil(p);
    const regs = getRefeicoes();
    setKcal(regs.reduce((s, r) => s + r.kcal, 0));
    setProt(regs.reduce((s, r) => s + r.proteina, 0));
    setAgua(getAguaHoje());
    setPronto(true);
  }, []);

  if (!pronto) return null;

  return (
    <main className="flex flex-col gap-5 px-4 pb-6 pt-6">
      <header className="flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-viva-400">
            {perfil ? "Bem-vindo de volta" : "Olá!"}
          </span>
          <h1 className="text-2xl font-bold text-viva-900">Seu dia no Vivá</h1>
        </div>
        <Link href="/perfil" aria-label="Perfil">
          <Logo tamanho={36} comNome={false} />
        </Link>
      </header>

      {!perfil ? (
        <section className="cartao flex flex-col items-start gap-3">
          <p className="text-sm text-viva-700">
            Responda a anamnese rápida (objetivo, rotina, sono, lesões) e o Vivá
            monta seu plano de treino e nutrição personalizado.
          </p>
          <Link href="/anamnese" className="btn-primario">
            Montar meu plano
          </Link>
        </section>
      ) : (
        <>
          <section className="cartao">
            <h2 className="mb-3 text-sm font-semibold text-viva-700">Metas de hoje</h2>
            <div className="grid grid-cols-3 gap-2">
              <ProgressRing
                valor={kcal}
                meta={perfil.caloriasAlvo}
                rotulo={kcal.toLocaleString("pt-BR")}
                legenda="kcal"
              />
              <ProgressRing
                valor={prot}
                meta={perfil.proteinaG}
                rotulo={`${prot}g`}
                legenda="proteína"
                cor="#4F9E78"
              />
              <ProgressRing
                valor={agua}
                meta={perfil.aguaMl}
                rotulo={`${(agua / 1000).toLocaleString("pt-BR")}L`}
                legenda="água"
                cor="#7CC29E"
              />
            </div>
            <p className="mt-3 text-center text-xs text-viva-400">
              Meta: {perfil.caloriasAlvo.toLocaleString("pt-BR")} kcal · {perfil.proteinaG}P /{" "}
              {perfil.carboidratoG}C / {perfil.gorduraG}G
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
            <Link href="/evolucao" className="cartao text-center">
              <span className="text-2xl">📈</span>
              <p className="mt-1 text-sm font-semibold text-viva-700">Minha evolução</p>
            </Link>
            <Link href="/blog" className="cartao text-center">
              <span className="text-2xl">📰</span>
              <p className="mt-1 text-sm font-semibold text-viva-700">Dicas no blog</p>
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
