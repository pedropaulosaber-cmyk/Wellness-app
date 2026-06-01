import { headers } from "next/headers";
import { requireAcesso } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getHoje } from "@/lib/datas";
import { FONTES } from "@/lib/integracoes";
import IntegracoesCliente from "@/components/IntegracoesCliente";

export const dynamic = "force-dynamic";

export default async function IntegracoesPage() {
  const usuario = await requireAcesso();
  const dia = getHoje();

  const atividades = await prisma.registroAtividadeExterna.findMany({
    where: { usuarioId: usuario.id, dia },
  });
  const passosHoje = atividades.reduce((s, a) => s + (a.passos ?? 0), 0);

  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "https";
  const origin = `${proto}://${host}`;

  return (
    <main className="flex flex-col gap-4 px-4 pb-6 pt-6">
      <h1 className="text-2xl font-bold text-viva-900">Apps e wearables</h1>

      {/* Resumo de hoje */}
      <section className="cartao text-center">
        <p className="text-xs text-viva-400">Passos hoje</p>
        <p className="text-3xl font-extrabold text-viva">
          {passosHoje.toLocaleString("pt-BR")}
        </p>
      </section>

      {/* Fontes suportadas */}
      <div className="grid grid-cols-3 gap-2">
        {FONTES.map((f) => {
          const ativo = atividades.some((a) => a.fonte === f.id);
          return (
            <div key={f.id} className="cartao flex flex-col items-center gap-1 text-center">
              <span className="text-2xl">{f.emoji}</span>
              <span className="text-[11px] font-medium text-viva-700">{f.nome}</span>
              <span className={`text-[10px] ${ativo ? "text-viva" : "text-viva-300"}`}>
                {ativo ? "conectado" : "—"}
              </span>
            </div>
          );
        })}
      </div>

      <IntegracoesCliente tokenInicial={usuario.syncToken} origin={origin} />
    </main>
  );
}
