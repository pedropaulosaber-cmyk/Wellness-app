"use client";

import { useState, useTransition } from "react";
import { gerarSyncToken, importarDemo } from "@/app/(interno)/integracoes/actions";

export default function IntegracoesCliente({
  tokenInicial,
  origin,
}: {
  tokenInicial: string | null;
  origin: string;
}) {
  const [token, setToken] = useState(tokenInicial);
  const [msg, setMsg] = useState<string | null>(null);
  const [pendente, startTransition] = useTransition();

  const endpoint = token
    ? `${origin}/api/integracoes/importar?token=${token}`
    : null;

  return (
    <div className="flex flex-col gap-4">
      {/* Endpoint de sincronização */}
      <section className="cartao">
        <h3 className="text-sm font-semibold text-viva-700">Seu endpoint de sincronização</h3>
        <p className="mt-1 text-xs text-viva-500">
          Use no Atalho do Apple Saúde, no Health Connect ou em um wrapper nativo
          para enviar passos e batimentos automaticamente.
        </p>
        {endpoint ? (
          <div className="mt-2">
            <code className="block break-all rounded-lg bg-viva-50 p-2 text-[11px] text-viva-700">
              {endpoint}
            </code>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(endpoint);
                  setMsg("Endpoint copiado!");
                }}
                className="btn-secundario flex-1"
              >
                Copiar
              </button>
              <button
                onClick={() =>
                  startTransition(async () => {
                    const r = await gerarSyncToken();
                    setToken(r.token);
                    setMsg("Novo token gerado (o anterior parou de funcionar).");
                  })
                }
                disabled={pendente}
                className="btn-secundario flex-1"
              >
                Regenerar
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() =>
              startTransition(async () => {
                const r = await gerarSyncToken();
                setToken(r.token);
              })
            }
            disabled={pendente}
            className="btn-primario mt-3 w-full"
          >
            Gerar token de sincronização
          </button>
        )}
      </section>

      {/* Demonstração */}
      <section className="cartao">
        <h3 className="text-sm font-semibold text-viva-700">Testar agora</h3>
        <p className="mt-1 text-xs text-viva-500">
          Importa passos de demonstração para hoje (sem wearable), para você ver o
          fluxo funcionando.
        </p>
        <button
          onClick={() =>
            startTransition(async () => {
              const r = await importarDemo();
              setMsg(`Importados ${r.passos.toLocaleString("pt-BR")} passos (demo).`);
            })
          }
          disabled={pendente}
          className="btn-secundario mt-3 w-full"
        >
          Importar passos (demonstração)
        </button>
      </section>

      {msg && <p className="text-center text-sm text-viva">{msg}</p>}

      <p className="text-[11px] leading-snug text-viva-400">
        Como conectar o Apple Saúde: crie um Atalho (app Atalhos) que leia
        &quot;Passos&quot; e &quot;Frequência cardíaca&quot; e faça um POST para o
        endpoint acima com um corpo JSON. No Android, um job de Health Connect faz
        o mesmo. A sincronização nativa em tempo real exige o app empacotado
        (Capacitor) — a arquitetura já está pronta para isso.
      </p>
    </div>
  );
}
