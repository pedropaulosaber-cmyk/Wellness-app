"use client";

import { useMemo, useState, useTransition } from "react";
import { gerarCardapio } from "@/lib/cardapio";
import { registrarRefeicao } from "@/app/(interno)/nutricao/actions";

export default function CardapioCliente({
  caloriasAlvo,
  restricoes,
}: {
  caloriasAlvo: number;
  restricoes: string[];
}) {
  const [variacoes, setVariacoes] = useState<Record<string, number>>({});
  const [registrada, setRegistrada] = useState<Record<string, boolean>>({});
  const [pendente, startTransition] = useTransition();

  const cardapio = useMemo(
    () => gerarCardapio(caloriasAlvo, restricoes, variacoes),
    [caloriasAlvo, restricoes, variacoes]
  );

  return (
    <div className="flex flex-col gap-3">
      {cardapio.map((r) => (
        <section key={r.chave} className="cartao">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-viva-900">{r.titulo}</h3>
              <p className="text-xs text-viva-400">
                {r.kcal} kcal · {r.proteina}P / {r.carbo}C / {r.gordura}G
              </p>
            </div>
            <button
              onClick={() =>
                setVariacoes((v) => ({ ...v, [r.chave]: (v[r.chave] ?? 0) + 1 }))
              }
              className="toque rounded-lg px-2 text-sm text-viva"
              aria-label={`Trocar ${r.titulo}`}
            >
              🔄 Trocar
            </button>
          </div>

          <ul className="flex flex-col gap-1 text-sm text-viva-700">
            {r.itens.map((it, i) => (
              <li key={i} className="flex justify-between">
                <span>{it.nome}</span>
                <span className="text-viva-400">
                  {it.gramas}g · {it.kcal}kcal
                </span>
              </li>
            ))}
          </ul>

          <button
            disabled={pendente || registrada[r.chave]}
            onClick={() =>
              startTransition(async () => {
                await registrarRefeicao(r.chave, r.itens);
                setRegistrada((s) => ({ ...s, [r.chave]: true }));
              })
            }
            className="btn-secundario mt-3 w-full"
          >
            {registrada[r.chave] ? "✓ Registrado" : "Registrar refeição"}
          </button>
        </section>
      ))}
    </div>
  );
}
