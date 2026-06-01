"use client";

import { useState } from "react";
import Link from "next/link";
import { ARTIGOS, CATEGORIAS } from "@/lib/blog";

export default function BlogPage() {
  const [cat, setCat] = useState("Todos");
  const lista = cat === "Todos" ? ARTIGOS : ARTIGOS.filter((a) => a.categoria === cat);

  return (
    <main className="flex flex-col gap-4 px-4 pb-6 pt-6">
      <header>
        <span className="text-sm font-semibold uppercase tracking-wide text-viva-400">
          Vivá Blog
        </span>
        <h1 className="text-2xl font-bold text-viva-900">Dicas de treino, nutrição e bem-estar</h1>
      </header>

      {/* Filtro de categorias */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIAS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`toque rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              cat === c ? "border-viva bg-viva text-white" : "border-viva-200 bg-white text-viva-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Lista de artigos */}
      <div className="flex flex-col gap-3">
        {lista.map((a) => (
          <Link key={a.slug} href={`/blog/${a.slug}`} className="cartao flex gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-viva-50 text-3xl">
              {a.emoji}
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-viva-400">
                {a.categoria} · {a.leituraMin} min
              </span>
              <h2 className="font-bold leading-snug text-viva-900">{a.titulo}</h2>
              <p className="mt-0.5 line-clamp-2 text-sm text-viva-600">{a.resumo}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
