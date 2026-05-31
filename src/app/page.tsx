import Link from "next/link";
import ProgressRing from "@/components/ProgressRing";
import {
  gerarPlanoNutricional,
  planoParaExibicao,
  type DadosCorporais,
} from "@/lib/nutrition";

// Dados de exemplo só para demonstrar a home na Fase 1.
// A partir da Fase 4, vêm da anamnese persistida do usuário.
const EXEMPLO: DadosCorporais = {
  sexo: "feminino",
  idade: 30,
  pesoKg: 65,
  alturaCm: 165,
  nivelAtividade: "moderado",
  objetivo: "emagrecer",
};

// Consumo "de hoje" fictício para os anéis (Fase 7 alimenta com dados reais).
const CONSUMO_HOJE = { kcal: 1180, proteinaG: 78, aguaMl: 1400 };

export default function Home() {
  const plano = planoParaExibicao(gerarPlanoNutricional(EXEMPLO));

  return (
    <main className="flex flex-col gap-5 px-4 pb-24 pt-6">
      {/* Cabeçalho */}
      <header className="flex flex-col gap-1">
        <span className="text-sm font-semibold uppercase tracking-wide text-viva-400">
          Vivá
        </span>
        <h1 className="text-2xl font-bold text-viva-900">
          Treino e nutrição, num só lugar.
        </h1>
        <p className="text-sm text-viva-600">
          Acesso vitalício — pagou uma vez, é seu para sempre. Sem mensalidade.
        </p>
      </header>

      {/* Anéis de progresso do dia */}
      <section className="cartao">
        <h2 className="mb-3 text-sm font-semibold text-viva-700">Seu dia</h2>
        <div className="grid grid-cols-3 gap-2">
          <ProgressRing
            valor={CONSUMO_HOJE.kcal}
            meta={plano.caloriasAlvo}
            rotulo={CONSUMO_HOJE.kcal.toLocaleString("pt-BR")}
            legenda="kcal"
          />
          <ProgressRing
            valor={CONSUMO_HOJE.proteinaG}
            meta={plano.macros.proteinaG}
            rotulo={`${CONSUMO_HOJE.proteinaG}g`}
            legenda="proteína"
            cor="#4F9E78"
          />
          <ProgressRing
            valor={CONSUMO_HOJE.aguaMl}
            meta={plano.aguaMl}
            rotulo={`${(CONSUMO_HOJE.aguaMl / 1000).toLocaleString("pt-BR")}L`}
            legenda="água"
            cor="#7CC29E"
          />
        </div>
        <p className="mt-3 text-center text-xs text-viva-400">
          Meta do dia: {plano.caloriasAlvo.toLocaleString("pt-BR")} kcal ·{" "}
          {plano.macros.proteinaG}P / {plano.macros.carboidratoG}C /{" "}
          {plano.macros.gorduraG}G · {plano.aguaL}L de água
        </p>
      </section>

      {/* Resumo do plano (prova de que o motor nutricional funciona) */}
      <section className="cartao">
        <h2 className="mb-2 text-sm font-semibold text-viva-700">
          Plano calculado (exemplo)
        </h2>
        <dl className="grid grid-cols-2 gap-y-2 text-sm">
          <dt className="text-viva-500">Metabolismo basal</dt>
          <dd className="text-right font-medium">{plano.bmr} kcal</dd>
          <dt className="text-viva-500">Gasto total (TDEE)</dt>
          <dd className="text-right font-medium">{plano.tdee} kcal</dd>
          <dt className="text-viva-500">IMC</dt>
          <dd className="text-right font-medium">
            {plano.imc.toLocaleString("pt-BR")} · {plano.classificacaoImc}
          </dd>
        </dl>
        <p className="mt-3 text-[11px] leading-snug text-viva-400">
          Estimativas (Mifflin-St Jeor). Não substituem orientação médica ou
          nutricional.
        </p>
      </section>

      {/* CTA principal */}
      <Link href="/anamnese" className="btn-primario w-full">
        Montar meu plano
      </Link>
    </main>
  );
}
