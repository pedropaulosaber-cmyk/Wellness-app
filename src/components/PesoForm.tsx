"use client";

import { useState } from "react";
import { addPeso } from "@/lib/local";

export default function PesoForm({ onSalvar }: { onSalvar?: () => void }) {
  const [peso, setPeso] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  function enviar() {
    setMsg(null);
    const n = Number(peso);
    if (!Number.isFinite(n) || n <= 0 || n > 500) {
      setMsg("Peso inválido.");
      return;
    }
    addPeso(n);
    setPeso("");
    setMsg("✓ Peso registrado.");
    onSalvar?.();
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
          className="campo"
        />
        <button onClick={enviar} disabled={!peso} className="btn-primario shrink-0 px-5">
          Salvar
        </button>
      </div>
      {msg && <p className="mt-2 text-sm text-viva">{msg}</p>}
    </section>
  );
}
