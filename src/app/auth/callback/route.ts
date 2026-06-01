import { NextResponse } from "next/server";
import { criarSupabaseServer } from "@/lib/supabase/server";

// Troca o code do link de confirmação de e-mail por uma sessão.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const proximo = searchParams.get("proximo") ?? "/anamnese";

  if (code) {
    const supabase = criarSupabaseServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${proximo}`);
  }

  return NextResponse.redirect(`${origin}/login`);
}
