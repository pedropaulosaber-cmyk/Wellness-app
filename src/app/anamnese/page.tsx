import Link from "next/link";

// Placeholder da Fase 1. O fluxo completo de anamnese (com rotina, sono,
// lesões e experiência de treino) + persistência no banco vem na Fase 4.
export default function AnamnesePage() {
  return (
    <main className="flex min-h-dvh flex-col items-start gap-4 px-4 pt-6">
      <h1 className="text-2xl font-bold text-viva-900">Anamnese</h1>
      <p className="text-sm text-viva-600">
        Em breve: vamos te fazer algumas perguntas (objetivo, rotina, sono,
        lesões e experiência) para montar seu plano de treino e nutrição
        personalizado.
      </p>
      <Link href="/" className="btn-secundario">
        Voltar
      </Link>
    </main>
  );
}
