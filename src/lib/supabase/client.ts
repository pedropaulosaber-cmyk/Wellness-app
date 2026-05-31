import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase para uso no navegador (componentes "use client").
 * Usa apenas chaves públicas (anon). Nunca exponha a service role aqui.
 */
export function criarSupabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    throw new Error(
      "Configuração ausente: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no .env"
    );
  }

  return createBrowserClient(url, anon);
}
