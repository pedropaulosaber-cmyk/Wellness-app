import Link from "next/link";
import { requireAcesso } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function PerfilPage() {
  const usuario = await requireAcesso();

  return (
    <main className="flex flex-col gap-4 px-4 pb-6 pt-6">
      <h1 className="text-2xl font-bold text-viva-900">Perfil</h1>

      <section className="cartao">
        <p className="text-sm font-semibold text-viva-900">{usuario.nome ?? "—"}</p>
        <p className="text-sm text-viva-500">{usuario.email}</p>
      </section>

      <section className="cartao">
        <p className="text-sm font-semibold text-viva">✓ Acesso vitalício ativo</p>
        {usuario.compraEm && (
          <p className="text-xs text-viva-500">
            Desde {usuario.compraEm.toLocaleDateString("pt-BR")} · pagamento único, sem
            mensalidade
          </p>
        )}
      </section>

      <Link href="/anamnese" className="btn-secundario w-full">
        Refazer anamnese / atualizar dados
      </Link>

      <form action="/auth/sair" method="post">
        <button className="btn-secundario w-full">Sair da conta</button>
      </form>
    </main>
  );
}
