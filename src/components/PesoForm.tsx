"use client";

import { useState, useTransition } from "react";
import { registrarPeso } from "@/app/(interno)/evolucao/actions";

export default function PesoForm() {
  const [peso, setPeso] = useState("");
  const [cintura, setCintura] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [pendente, startTransition] = useTransition();

  function enviar() {
    setMsg(null);
    startTransition(async () => {
      const r = await registrarPeso(Number(peso), cintura ? Number(cintura) : undefined);
      if (r.ok) {
        setPeso("");
        setCintura("");
        setMsg("✓ Peso registrado e plano recalculado.");
      } else {
        setMsg(r.error ?? "Erro ao registrar.");
      }
    });
  }

  return (
    <section className="cartao">
      <h3 className="mb-2 text-sm font-semibold text-viva-700">Registrar peso</h3>
      <div className="flex gap-2">
        <input
          type="number"
          inputMode="decimal"
          step="0.1"
          placeholder="Peso (kg)"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          className="toque w-full rounded-xl border border-viva-200 px-3 py-2 text-base"
        />
        <input
          type="number"
          inputMode="decimal"
          step="0.1"
          placeholder="Cintura (cm)"
          value={cintura}
          onChange={(e) => setCintura(e.target.value)}
          className="toque w-full rounded-xl border border-viva-200 px-3 py-2 text-base"
        />
      </div>
      <button
        onClick={enviar}
        disabled={pendente || !peso}
        className="btn-primario mt-3 w-full"
      >
        {pendente ? "Salvando…" : "Salvar"}
      </button>
      {msg && <p className="mt-2 text-sm text-viva">{msg}</p>}
    </section>
  );
}
