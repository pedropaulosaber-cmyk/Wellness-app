import Link from "next/link";
import { PRECO_LABEL } from "@/lib/constants";

// Landing pública do Vivá.
export default function LandingPage() {
  return (
    <main className="flex min-h-dvh flex-col px-5 pb-10 pt-12">
      <header className="flex flex-col items-center gap-2 text-center">
        <span className="text-sm font-semibold uppercase tracking-wide text-viva-400">
          Vivá
        </span>
        <h1 className="text-3xl font-extrabold leading-tight text-viva-900">
          Todos os seus treinos e a sua alimentação. Num só app.
        </h1>
        <p className="text-sm text-viva-600">
          Academia, pilates, corrida, bike, funcional, natação e nutrição —
          unificados e feitos para o celular.
        </p>
      </header>

      <section className="mt-8 flex flex-col gap-3">
        {[
          ["🏋️", "Treinos de todas as modalidades, com player e progressão de carga"],
          ["🥗", "Plano nutricional e cardápio brasileiro que batem suas metas"],
          ["📈", "Evolução, sequência e conquistas para manter o ritmo"],
        ].map(([emoji, texto]) => (
          <div key={texto} className="cartao flex items-start gap-3">
            <span className="text-2xl">{emoji}</span>
            <p className="text-sm text-viva-700">{texto}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl bg-viva p-5 text-center text-white">
        <p className="text-sm opacity-90">Acesso vitalício — pagamento único</p>
        <p className="my-1 text-3xl font-extrabold">{PRECO_LABEL}</p>
        <p className="text-sm opacity-90">
          Sem mensalidade. Todos os concorrentes são assinatura; o Vivá é seu para
          sempre.
        </p>
      </section>

      <div className="mt-8 flex flex-col gap-3">
        <Link href="/cadastro" className="btn-primario w-full">
          Criar minha conta
        </Link>
        <Link href="/login" className="btn-secundario w-full">
          Já tenho conta
        </Link>
      </div>
    </main>
  );
}
