"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { criarSupabaseBrowser } from "@/lib/supabase/client";
import Logo from "@/components/Logo";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const proximo = params.get("proximo") ?? "/inicio";

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      const supabase = criarSupabaseBrowser();
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
      if (error) throw error;
      router.push(proximo);
      router.refresh();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível entrar.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="fundo-suave flex min-h-dvh flex-col justify-center px-5">
      <div className="mb-8 flex flex-col items-center gap-3 text-center">
        <Logo tamanho={52} comNome={false} />
        <div>
          <h1 className="text-2xl font-extrabold text-viva-900">Bem-vindo de volta</h1>
          <p className="mt-1 text-sm text-viva-600">Entre para continuar no Vivá.</p>
        </div>
      </div>

      <form onSubmit={entrar} className="cartao flex flex-col gap-4 p-5">
        <div>
          <label className="rotulo">E-mail</label>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="voce@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="campo"
          />
        </div>
        <div>
          <label className="rotulo">Senha</label>
          <input
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="campo"
          />
        </div>
        {erro && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{erro}</p>
        )}
        <button type="submit" disabled={carregando} className="btn-primario w-full">
          {carregando ? "Entrando…" : "Entrar"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-viva-600">
        Não tem conta?{" "}
        <Link href="/cadastro" className="font-semibold text-viva">
          Criar conta
        </Link>
      </p>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
