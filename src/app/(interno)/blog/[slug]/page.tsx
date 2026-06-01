import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTIGOS, artigoPorSlug } from "@/lib/blog";

export function generateStaticParams() {
  return ARTIGOS.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = artigoPorSlug(params.slug);
  return { title: a ? `${a.titulo} — Vivá Blog` : "Vivá Blog" };
}

export default function ArtigoPage({ params }: { params: { slug: string } }) {
  const a = artigoPorSlug(params.slug);
  if (!a) notFound();

  return (
    <main className="px-4 pb-8 pt-6">
      <Link href="/blog" className="text-sm font-semibold text-viva-500">
        ← Blog
      </Link>

      <header className="mt-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-viva-400">
          {a.categoria} · {a.leituraMin} min de leitura
        </span>
        <h1 className="mt-1 text-3xl font-extrabold leading-tight text-viva-900">{a.titulo}</h1>
      </header>

      <div className="mt-4 flex h-40 items-center justify-center rounded-2xl bg-viva-50 text-6xl">
        {a.emoji}
      </div>

      <article className="mt-6 flex flex-col gap-5">
        {a.secoes.map((s, i) => (
          <section key={i}>
            {s.subtitulo && (
              <h2 className="mb-1 text-lg font-bold text-viva-900">{s.subtitulo}</h2>
            )}
            {s.paragrafos.map((p, j) => (
              <p key={j} className="mb-2 text-[15px] leading-relaxed text-viva-700">
                {p}
              </p>
            ))}
            {s.lista && (
              <ul className="mt-1 list-disc space-y-1 pl-5 text-[15px] text-viva-700">
                {s.lista.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      <p className="mt-8 text-[11px] text-viva-400">
        Conteúdo informativo geral do Vivá — não substitui orientação profissional.
      </p>

      <Link href="/anamnese" className="btn-primario mt-6 w-full">
        Montar meu plano no Vivá
      </Link>
    </main>
  );
}
