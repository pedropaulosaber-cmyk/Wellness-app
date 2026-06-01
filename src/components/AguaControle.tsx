"use client";

import { useTransition } from "react";
import { registrarAgua } from "@/app/(interno)/nutricao/actions";

export default function AguaControle({ consumido, meta }: { consumido: number; meta: number }) {
  const [pendente, startTransition] = useTransition();
  const add = (ml: number) => startTransition(() => registrarAgua(ml));

  return (
    <section className="cartao">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-viva-700">Hidratação</h3>
        <span className="text-xs text-viva-400">
          {(consumido / 1000).toLocaleString("pt-BR")}L / {(meta / 1000).toLocaleString("pt-BR")}L
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-viva-100">
        <div
          className="h-full bg-viva-300"
          style={{ width: `${meta ? Math.min((consumido / meta) * 100, 100) : 0}%` }}
        />
      </div>
      <div className="mt-3 flex gap-2">
        {[200, 300, 500].map((ml) => (
          <button
            key={ml}
            disabled={pendente}
            onClick={() => add(ml)}
            className="btn-secundario flex-1"
          >
            +{ml}ml
          </button>
        ))}
      </div>
    </section>
  );
}
