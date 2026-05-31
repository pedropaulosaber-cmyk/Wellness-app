"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { criarSupabaseBrowser } from "@/lib/supabase/client";

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setAviso(null);
    if (senha.length < 6) {
      setErro("A senha precisa ter ao menos 6 caracteres.");
      return;
    }
    setCarregando(true);
    try {
      const supabase = criarSupabaseBrowser();
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: { nome },
          emailRedirectTo: `${window.location.origin}/auth/callback?proximo=/anamnese`,
        },
      });
      if (error) throw error;
      // Se a confirmação de e-mail estiver desativada, já vem sessão → vai pra anamnese.
      if (data.session) {
        router.push("/anamnese");
        router.refresh();
      } else {
        setAviso("Conta criada! Confirme seu e-mail para continuar.");
      }
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível cadastrar.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="flex min-h-dvh flex-col justify-center gap-6 px-5">
      <header className="text-center">
        <h1 className="text-2xl font-bold text-viva-900">Criar conta</h1>
        <p className="mt-1 text-sm text-viva-600">
          Comece sua jornada. Acesso vitalício, sem mensalidade.
        </p>
      </header>

      <form onSubmit={cadastrar} className="flex flex-col gap-3">
        <input
          type="text"
          autoComplete="name"
          required
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="toque rounded-xl border border-viva-200 px-4 py-3 text-base"
        />
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
          autoComplete="new-password"
          required
          placeholder="Senha (mín. 6 caracteres)"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="toque rounded-xl border border-viva-200 px-4 py-3 text-base"
        />
        {erro && <p className="text-sm text-red-600">{erro}</p>}
        {aviso && <p className="text-sm text-viva">{aviso}</p>}
        <button type="submit" disabled={carregando} className="btn-primario w-full">
          {carregando ? "Criando…" : "Criar conta"}
        </button>
      </form>

      <p className="text-center text-sm text-viva-600">
        Já tem conta?{" "}
        <Link href="/login" className="font-semibold text-viva">
          Entrar
        </Link>
      </p>
    </main>
  );
}
