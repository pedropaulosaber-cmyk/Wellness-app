"use client";

import { useState } from "react";
import Link from "next/link";
import { salvarAnamnese, type DadosAnamnese } from "@/app/anamnese/actions";

const OBJETIVOS: { v: DadosAnamnese["objetivo"]; t: string; d: string }[] = [
  { v: "emagrecer", t: "Emagrecer", d: "Perder gordura mantendo massa" },
  { v: "manter", t: "Manter", d: "Manter peso e saúde" },
  { v: "ganhar_massa", t: "Ganhar massa", d: "Hipertrofia e força" },
];

const NIVEIS: { v: DadosAnamnese["nivelAtividade"]; t: string }[] = [
  { v: "sedentario", t: "Sedentário (pouco ou nada)" },
  { v: "leve", t: "Leve (1–2x/semana)" },
  { v: "moderado", t: "Moderado (3–4x/semana)" },
  { v: "intenso", t: "Intenso (5–6x/semana)" },
  { v: "muito_intenso", t: "Muito intenso (atleta)" },
];

const EXPERIENCIAS = [
  { v: "iniciante", t: "Iniciante" },
  { v: "intermediario", t: "Intermediário" },
  { v: "avancado", t: "Avançado" },
];

const MODALIDADES = [
  "Musculação",
  "Pilates",
  "Corrida",
  "Bike",
  "Funcional",
  "Natação",
  "Outros",
];

const RESTRICOES = [
  "Nenhuma",
  "Vegetariano",
  "Vegano",
  "Sem lactose",
  "Sem glúten",
  "Diabético",
];

type Form = Partial<DadosAnamnese>;

function Chip({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`toque rounded-full border px-4 py-2 text-sm font-medium transition ${
        ativo
          ? "border-viva bg-viva text-white"
          : "border-viva-200 bg-white text-viva-700"
      }`}
    >
      {children}
    </button>
  );
}

export default function AnamneseForm({
  inicial,
  jaPago,
}: {
  inicial?: Form;
  jaPago: boolean;
}) {
  const [passo, setPasso] = useState(0);
  const [f, setF] = useState<Form>({
    modalidades: [],
    restricoes: [],
    ...inicial,
  });
  const [erro, setErro] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [plano, setPlano] = useState<Extract<
    Awaited<ReturnType<typeof salvarAnamnese>>,
    { ok: true }
  >["plano"] | null>(null);

  const set = (patch: Form) => setF((prev) => ({ ...prev, ...patch }));
  const toggle = (campo: "modalidades" | "restricoes", v: string) =>
    set({
      [campo]: (f[campo] ?? []).includes(v)
        ? (f[campo] ?? []).filter((x) => x !== v)
        : [...(f[campo] ?? []), v],
    });

  async function enviar() {
    setErro(null);
    // Validação final dos campos obrigatórios
    if (
      !f.sexo ||
      !f.objetivo ||
      !f.nivelAtividade ||
      !f.idade ||
      !f.pesoKg ||
      !f.alturaCm
    ) {
      setErro("Preencha objetivo, sexo, idade, peso, altura e nível de atividade.");
      return;
    }
    setSalvando(true);
    const r = await salvarAnamnese(f as DadosAnamnese);
    setSalvando(false);
    if (r.ok) setPlano(r.plano);
    else setErro(r.error);
  }

  // ── Tela de resultado ──────────────────────────────────────
  if (plano) {
    return (
      <main className="flex min-h-dvh flex-col gap-5 px-5 py-8">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-viva-900">Seu plano está pronto! 🎉</h1>
          <p className="mt-1 text-sm text-viva-600">
            Calculado pelo seu metabolismo, rotina e objetivo.
          </p>
        </header>

        <section className="cartao text-center">
          <p className="text-sm text-viva-500">Meta diária</p>
          <p className="my-1 text-4xl font-extrabold text-viva">
            {plano.caloriasAlvo.toLocaleString("pt-BR")}
            <span className="text-lg"> kcal</span>
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="font-bold text-viva-900">{plano.macros.proteinaG}g</p>
              <p className="text-viva-400">proteína</p>
            </div>
            <div>
              <p className="font-bold text-viva-900">{plano.macros.carboidratoG}g</p>
              <p className="text-viva-400">carbo</p>
            </div>
            <div>
              <p className="font-bold text-viva-900">{plano.macros.gorduraG}g</p>
              <p className="text-viva-400">gordura</p>
            </div>
          </div>
          <p className="mt-3 text-xs text-viva-500">
            Água: {plano.aguaL}L/dia · IMC {plano.imc.toLocaleString("pt-BR")} (
            {plano.classificacaoImc})
          </p>
        </section>

        <p className="text-center text-[11px] text-viva-400">
          Estimativas (Mifflin-St Jeor). Não substituem orientação médica/nutricional.
        </p>

        {jaPago ? (
          <Link href="/inicio" className="btn-primario w-full">
            Ir para meu painel
          </Link>
        ) : (
          <Link href="/comprar" className="btn-primario w-full">
            Desbloquear meu plano completo
          </Link>
        )}
      </main>
    );
  }

  // ── Passos do formulário ───────────────────────────────────
  const passos = [
    {
      titulo: "Qual seu objetivo?",
      conteudo: (
        <div className="flex flex-col gap-3">
          {OBJETIVOS.map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => set({ objetivo: o.v })}
              className={`cartao text-left ${
                f.objetivo === o.v ? "border-viva ring-2 ring-viva" : ""
              }`}
            >
              <p className="font-semibold text-viva-900">{o.t}</p>
              <p className="text-sm text-viva-500">{o.d}</p>
            </button>
          ))}
        </div>
      ),
      valido: !!f.objetivo,
    },
    {
      titulo: "Sobre você",
      conteudo: (
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Chip ativo={f.sexo === "feminino"} onClick={() => set({ sexo: "feminino" })}>
              Feminino
            </Chip>
            <Chip ativo={f.sexo === "masculino"} onClick={() => set({ sexo: "masculino" })}>
              Masculino
            </Chip>
          </div>
          <Campo
            rotulo="Idade (anos)"
            valor={f.idade}
            onChange={(n) => set({ idade: n })}
          />
          <Campo
            rotulo="Peso (kg)"
            valor={f.pesoKg}
            onChange={(n) => set({ pesoKg: n })}
            step="0.1"
          />
          <Campo
            rotulo="Altura (cm)"
            valor={f.alturaCm}
            onChange={(n) => set({ alturaCm: n })}
          />
        </div>
      ),
      valido: !!(f.sexo && f.idade && f.pesoKg && f.alturaCm),
    },
    {
      titulo: "Atividade e experiência",
      conteudo: (
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-viva-700">Nível de atividade</p>
            <div className="flex flex-col gap-2">
              {NIVEIS.map((n) => (
                <button
                  key={n.v}
                  type="button"
                  onClick={() => set({ nivelAtividade: n.v })}
                  className={`toque rounded-xl border px-4 py-2 text-left text-sm ${
                    f.nivelAtividade === n.v
                      ? "border-viva bg-viva-50 font-semibold text-viva"
                      : "border-viva-200 text-viva-700"
                  }`}
                >
                  {n.t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-viva-700">Experiência de treino</p>
            <div className="flex gap-2">
              {EXPERIENCIAS.map((e) => (
                <Chip
                  key={e.v}
                  ativo={f.experienciaTreino === e.v}
                  onClick={() => set({ experienciaTreino: e.v })}
                >
                  {e.t}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      ),
      valido: !!f.nivelAtividade,
    },
    {
      titulo: "Rotina e sono",
      conteudo: (
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-viva-700">
            Como é sua rotina de trabalho?
            <textarea
              value={f.rotinaTrabalho ?? ""}
              onChange={(e) => set({ rotinaTrabalho: e.target.value })}
              placeholder="Ex.: escritório 8h sentado / trabalho em pé / turnos"
              className="mt-1 w-full rounded-xl border border-viva-200 px-3 py-2 text-base"
              rows={2}
            />
          </label>
          <Campo
            rotulo="Horas de sono por noite"
            valor={f.horasSono}
            onChange={(n) => set({ horasSono: n })}
            step="0.5"
          />
          <div>
            <p className="mb-2 text-sm font-medium text-viva-700">Qualidade do sono</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((q) => (
                <Chip
                  key={q}
                  ativo={f.qualidadeSono === q}
                  onClick={() => set({ qualidadeSono: q })}
                >
                  {q}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      ),
      valido: true,
    },
    {
      titulo: "Lesões ou limitações",
      conteudo: (
        <label className="text-sm font-medium text-viva-700">
          Tem alguma lesão, dor ou limitação? (importante para adaptar os treinos)
          <textarea
            value={f.lesoes ?? ""}
            onChange={(e) => set({ lesoes: e.target.value })}
            placeholder="Ex.: dor no joelho direito, hérnia lombar, ombro operado… ou 'nenhuma'"
            className="mt-1 w-full rounded-xl border border-viva-200 px-3 py-2 text-base"
            rows={3}
          />
        </label>
      ),
      valido: true,
    },
    {
      titulo: "Quais modalidades você quer?",
      conteudo: (
        <div className="flex flex-wrap gap-2">
          {MODALIDADES.map((m) => (
            <Chip
              key={m}
              ativo={(f.modalidades ?? []).includes(m)}
              onClick={() => toggle("modalidades", m)}
            >
              {m}
            </Chip>
          ))}
        </div>
      ),
      valido: (f.modalidades ?? []).length > 0,
    },
    {
      titulo: "Restrições alimentares",
      conteudo: (
        <div className="flex flex-wrap gap-2">
          {RESTRICOES.map((r) => (
            <Chip
              key={r}
              ativo={(f.restricoes ?? []).includes(r)}
              onClick={() => toggle("restricoes", r)}
            >
              {r}
            </Chip>
          ))}
        </div>
      ),
      valido: true,
    },
  ];

  const atual = passos[passo];
  const ultimo = passo === passos.length - 1;

  return (
    <main className="flex min-h-dvh flex-col px-5 py-6">
      {/* Progresso */}
      <div className="mb-5 flex gap-1">
        {passos.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i <= passo ? "bg-viva" : "bg-viva-100"}`}
          />
        ))}
      </div>

      <h1 className="mb-4 text-xl font-bold text-viva-900">{atual.titulo}</h1>
      <div className="flex-1">{atual.conteudo}</div>

      {erro && <p className="mt-3 text-sm text-red-600">{erro}</p>}

      <div className="mt-6 flex gap-3">
        {passo > 0 && (
          <button
            type="button"
            onClick={() => setPasso((p) => p - 1)}
            className="btn-secundario flex-1"
          >
            Voltar
          </button>
        )}
        {!ultimo ? (
          <button
            type="button"
            disabled={!atual.valido}
            onClick={() => setPasso((p) => p + 1)}
            className="btn-primario flex-1"
          >
            Continuar
          </button>
        ) : (
          <button
            type="button"
            disabled={salvando}
            onClick={enviar}
            className="btn-primario flex-1"
          >
            {salvando ? "Calculando…" : "Ver meu plano"}
          </button>
        )}
      </div>
    </main>
  );
}

// Campo numérico reutilizável (mobile: teclado numérico)
function Campo({
  rotulo,
  valor,
  onChange,
  step = "1",
}: {
  rotulo: string;
  valor?: number;
  onChange: (n: number) => void;
  step?: string;
}) {
  return (
    <label className="text-sm font-medium text-viva-700">
      {rotulo}
      <input
        type="number"
        inputMode="decimal"
        step={step}
        value={valor ?? ""}
        onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
        className="mt-1 w-full rounded-xl border border-viva-200 px-3 py-2 text-base"
      />
    </label>
  );
}
