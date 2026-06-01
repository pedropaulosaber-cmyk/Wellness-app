"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Inicia o checkout: cria a cobrança e redireciona para a URL do gateway.
export default function BotaoComprar() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function comprar() {
    setCarregando(true);
    setErro(null);
    try {
      const res = await fetch("/api/pagamento/checkout", { method: "POST" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? "Falha ao iniciar o pagamento");
      const url: string = data.checkoutUrl;
      // URL interna (simulado) → navega no app; URL externa (gateway) → redireciona.
      if (url.startsWith("/")) router.push(url);
      else window.location.href = url;
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro inesperado");
      setCarregando(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button onClick={comprar} disabled={carregando} className="btn-primario w-full">
        {carregando ? "Abrindo pagamento…" : "Garantir acesso vitalício"}
      </button>
      {erro && <p className="text-center text-sm text-red-600">{erro}</p>}
    </div>
  );
}
