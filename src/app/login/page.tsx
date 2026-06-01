"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { criarSupabaseBrowser } from "@/lib/supabase/client";

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
    <main className="flex min-h-dvh flex-col justify-center gap-6 px-5">
      <header className="text-center">
        <h1 className="text-2xl font-bold text-viva-900">Entrar no Vivá</h1>
        <p className="mt-1 text-sm text-viva-600">Bem-vindo de volta.</p>
      </header>

      <form onSubmit={entrar} className="flex flex-col gap-3">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="toque rounded-xl border border-viva-200 px-4 py-3 text-base"
        />
        <input
          type="password"
          autoComplete="current-password"
          required
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="toque rounded-xl border border-viva-200 px-4 py-3 text-base"
        />
        {erro && <p className="text-sm text-red-600">{erro}</p>}
        <button type="submit" disabled={carregando} className="btn-primario w-full">
          {carregando ? "Entrando…" : "Entrar"}
        </button>
      </form>

      <p className="text-center text-sm text-viva-600">
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
