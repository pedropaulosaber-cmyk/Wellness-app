"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PRECO_LABEL } from "@/lib/constants";

// Checkout SIMULADO (dev/preview): confirma o pagamento sem gateway real.
export default function SimularPage() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function confirmar() {
    setCarregando(true);
    setErro(null);
    try {
      const res = await fetch("/api/pagamento/simular", { method: "POST" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? "Falha ao confirmar");
      router.push("/inicio");
      router.refresh();
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro inesperado");
      setCarregando(false);
    }
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 px-6 text-center">
      <div className="cartao w-full">
        <h1 className="text-xl font-bold text-viva-900">Checkout (demonstração)</h1>
        <p className="mt-2 text-sm text-viva-600">
          Em produção, aqui abriria o gateway (PIX/cartão) para {PRECO_LABEL}. Por
          enquanto, confirme para liberar o acesso vitalício e testar o app.
        </p>
        <button onClick={confirmar} disabled={carregando} className="btn-primario mt-4 w-full">
          {carregando ? "Confirmando…" : `Confirmar pagamento de ${PRECO_LABEL}`}
        </button>
        {erro && <p className="mt-2 text-sm text-red-600">{erro}</p>}
      </div>
    </main>
  );
}
