"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { criarSupabaseBrowser } from "@/lib/supabase/client";
import Logo from "@/components/Logo";

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
    <main className="fundo-suave flex min-h-dvh flex-col justify-center px-5 py-10">
      <div className="mb-7 flex flex-col items-center gap-3 text-center">
        <Logo tamanho={52} comNome={false} />
        <div>
          <h1 className="text-2xl font-extrabold text-viva-900">Crie sua conta</h1>
          <p className="mt-1 text-sm text-viva-600">
            Comece sua jornada. Acesso vitalício, sem mensalidade.
          </p>
        </div>
      </div>

      <form onSubmit={cadastrar} className="cartao flex flex-col gap-4 p-5">
        <div>
          <label className="rotulo">Seu nome</label>
          <input
            type="text"
            autoComplete="name"
            required
            placeholder="Como podemos te chamar?"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="campo"
          />
        </div>
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
            autoComplete="new-password"
            required
            placeholder="Mínimo 6 caracteres"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="campo"
          />
        </div>
        {erro && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{erro}</p>
        )}
        {aviso && (
          <p className="rounded-lg bg-viva-50 px-3 py-2 text-sm text-viva-700">{aviso}</p>
        )}
        <button type="submit" disabled={carregando} className="btn-primario w-full">
          {carregando ? "Criando…" : "Criar conta"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-viva-600">
        Já tem conta?{" "}
        <Link href="/login" className="font-semibold text-viva">
          Entrar
        </Link>
      </p>
    </main>
  );
}
