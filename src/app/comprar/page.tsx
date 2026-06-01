import { redirect } from "next/navigation";
import { requireUsuario } from "@/lib/auth";
import { ehSimulado } from "@/lib/pagamento";
import BotaoComprar from "@/components/BotaoComprar";
import { PRECO_LABEL, PRODUTO_DESCRICAO } from "@/lib/constants";

export const dynamic = "force-dynamic";

const BENEFICIOS = [
  "Todos os treinos: academia, pilates, corrida, bike, funcional, natação e mais",
  "Plano nutricional personalizado e ilimitado, com cardápio brasileiro",
  "Player de treino, progressão de carga e histórico completo",
  "Evolução, sequência (streak) e conquistas",
  "Todas as atualizações futuras incluídas",
];

export default async function ComprarPage() {
  const usuario = await requireUsuario();
  if (usuario.acessoVitalicio) redirect("/inicio");

  return (
    <main className="flex min-h-dvh flex-col gap-6 px-5 py-8">
      <header className="text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-viva-400">
          Acesso vitalício
        </span>
        <h1 className="mt-1 text-2xl font-bold text-viva-900">
          Pague uma vez. É seu para sempre.
        </h1>
        <p className="mt-2 text-sm text-viva-600">{PRODUTO_DESCRICAO}</p>
      </header>

      <section className="cartao text-center">
        <p className="text-sm text-viva-500">Pagamento único</p>
        <p className="my-1 text-4xl font-extrabold text-viva">{PRECO_LABEL}</p>
        <p className="text-sm text-viva-500">sem mensalidade, sem renovação</p>
      </section>

      <ul className="flex flex-col gap-2">
        {BENEFICIOS.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-viva-700">
            <span className="mt-0.5 text-viva">✓</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <BotaoComprar />

      {ehSimulado() && (
        <p className="text-center text-xs text-viva-400">
          Modo demonstração: o pagamento é simulado (nenhum valor é cobrado).
        </p>
      )}

      <form action="/auth/sair" method="post" className="text-center">
        <button className="text-xs text-viva-400 underline">Sair da conta</button>
      </form>
    </main>
  );
}
