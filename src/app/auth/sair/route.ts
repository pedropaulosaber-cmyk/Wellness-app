import { NextResponse } from "next/server";
import { criarSupabaseServer } from "@/lib/supabase/server";

// Encerra a sessão e volta para a landing.
export async function POST(request: Request) {
  const supabase = criarSupabaseServer();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/", request.url), { status: 303 });
}
