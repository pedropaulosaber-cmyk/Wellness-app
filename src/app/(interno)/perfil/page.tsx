"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPerfil, resetTudo, type PerfilLocal } from "@/lib/local";

const OBJETIVO_LABEL: Record<string, string> = {
  emagrecer: "Emagrecer",
  manter: "Manter",
  ganhar_massa: "Ganhar massa",
};

export default function PerfilPage() {
  const [perfil, setPerfil] = useState<PerfilLocal | null>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    setPerfil(getPerfil());
    setPronto(true);
  }, []);

  if (!pronto) return null;

  function limpar() {
    if (window.confirm("Apagar todos os seus dados locais do Vivá? Isto não pode ser desfeito.")) {
      resetTudo();
      window.location.href = "/inicio";
    }
  }

  return (
    <main className="flex flex-col gap-4 px-4 pb-6 pt-6">
      <h1 className="text-2xl font-bold text-viva-900">Perfil</h1>

      {perfil ? (
        <>
          <section className="cartao">
            <p className="text-sm font-semibold text-viva-900">
              Objetivo: {OBJETIVO_LABEL[perfil.objetivo] ?? perfil.objetivo}
            </p>
            <p className="mt-1 text-sm text-viva-500">
              {perfil.idade} anos · {perfil.pesoKg} kg · {perfil.alturaCm} cm
            </p>
            {perfil.modalidades.length > 0 && (
              <p className="mt-1 text-sm text-viva-500">
                Treinos: {perfil.modalidades.join(", ")}
              </p>
            )}
          </section>

          <section className="cartao">
            <p className="text-sm font-semibold text-viva-700">Seu plano diário</p>
            <p className="mt-1 text-sm text-viva-500">
              {perfil.caloriasAlvo.toLocaleString("pt-BR")} kcal · {perfil.proteinaG}P /{" "}
              {perfil.carboidratoG}C / {perfil.gorduraG}G ·{" "}
              {(perfil.aguaMl / 1000).toLocaleString("pt-BR")}L água
            </p>
          </section>
        </>
      ) : (
        <div className="cartao flex flex-col items-start gap-3">
          <p className="text-sm text-viva-700">Você ainda não montou seu plano.</p>
          <Link href="/anamnese" className="btn-primario">
            Montar meu plano
          </Link>
        </div>
      )}

      <Link href="/anamnese" className="btn-secundario w-full">
        Refazer anamnese / atualizar dados
      </Link>

      <section className="cartao">
        <p className="text-sm font-semibold text-viva-700">Login (opcional)</p>
        <p className="mt-1 text-xs text-viva-500">
          Hoje seus dados ficam salvos neste aparelho. Em breve você poderá criar conta
          para sincronizar entre dispositivos.
        </p>
        <Link href="/login" className="btn-secundario mt-3 inline-flex w-full">
          Fazer login
        </Link>
      </section>

      <button onClick={limpar} className="toque text-sm text-red-500 underline">
        Apagar meus dados deste aparelho
      </button>
    </main>
  );
}
