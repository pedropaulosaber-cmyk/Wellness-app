import Link from "next/link";
import Logo from "@/components/Logo";
import { PRECO_LABEL } from "@/lib/constants";

const RECURSOS = [
  {
    emoji: "🏋️",
    titulo: "Todos os treinos",
    texto: "Academia, pilates, corrida, bike, funcional e natação — com player e progressão de carga.",
  },
  {
    emoji: "🥗",
    titulo: "Nutrição de verdade",
    texto: "Plano calórico personalizado e cardápio com alimentos brasileiros que batem suas metas.",
  },
  {
    emoji: "📈",
    titulo: "Evolução visível",
    texto: "Gráficos de peso e carga, sequência (streak) e conquistas para manter o ritmo.",
  },
];

export default function LandingPage() {
  return (
    <div className="fundo-suave min-h-dvh">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-5">
        <Logo tamanho={36} />
        <Link href="/login" className="text-sm font-semibold text-viva-700">
          Entrar
        </Link>
      </div>

      {/* Hero */}
      <header className="px-5 pt-10 text-center">
        <span className="inline-block rounded-full bg-viva-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-viva-700">
          Treino + Nutrição num só app
        </span>
        <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-viva-900">
          Sua vida saudável,{" "}
          <span className="texto-degrade">toda num lugar só.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-viva-600">
          Pare de pular entre cinco apps. O Vivá unifica todos os seus treinos e
          a sua alimentação — feito para o seu celular.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          <Link href="/cadastro" className="btn-primario w-full text-base">
            Começar agora
          </Link>
          <Link href="/login" className="btn-secundario w-full text-base">
            Já tenho conta
          </Link>
        </div>
        <p className="mt-3 text-xs text-viva-400">
          Pagamento único · sem mensalidade · acesso vitalício
        </p>
      </header>

      {/* Recursos */}
      <section className="mt-12 space-y-3 px-5">
        {RECURSOS.map((r) => (
          <div key={r.titulo} className="cartao flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-viva-50 text-2xl">
              {r.emoji}
            </div>
            <div>
              <h3 className="font-bold text-viva-900">{r.titulo}</h3>
              <p className="mt-0.5 text-sm leading-snug text-viva-600">{r.texto}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Pricing */}
      <section className="mt-12 px-5">
        <div className="hero-gradient relative overflow-hidden rounded-3xl p-7 text-center text-white shadow-lg">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-white/5" />
          <p className="relative text-sm font-medium uppercase tracking-wide text-viva-100">
            Acesso vitalício
          </p>
          <p className="relative mt-2 text-5xl font-extrabold">{PRECO_LABEL}</p>
          <p className="relative mt-1 text-sm text-viva-100">pagamento único</p>

          <ul className="relative mt-5 space-y-2 text-left text-sm">
            {[
              "Todos os treinos e modalidades",
              "Plano nutricional ilimitado",
              "Evolução, streak e conquistas",
              "Todas as atualizações futuras",
            ].map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>

          <Link
            href="/cadastro"
            className="relative mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 font-bold text-viva-700 transition active:scale-[0.98]"
          >
            Quero meu acesso
          </Link>
          <p className="relative mt-3 text-xs text-viva-100/80">
            Todos os concorrentes são assinatura. O Vivá é seu para sempre.
          </p>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="mt-12 px-5 pb-10 text-center">
        <div className="flex justify-center">
          <Logo tamanho={28} />
        </div>
        <p className="mt-3 text-xs text-viva-400">
          Vivá · bem-estar de verdade, sem complicação
        </p>
      </footer>
    </div>
  );
}
