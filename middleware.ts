import { NextResponse, type NextRequest } from "next/server";
import { ROTAS_AUTENTICADAS } from "@/lib/constants";

/**
 * Middleware (Edge Runtime) — deve ser leve e SEM dependências Node/Supabase,
 * senão o bundler de edge da Vercel falha ("unsupported modules").
 *
 * Aqui fazemos apenas o gate leve: se a rota exige login e não há cookie de
 * sessão do Supabase, redireciona para /login. A validação REAL da sessão
 * (e o gate de pagamento) acontece no servidor em requireUsuario/requireAcesso
 * (runtime Node), onde o Supabase funciona normalmente.
 */
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const exigeLogin = ROTAS_AUTENTICADAS.some((p) => path.startsWith(p));
  if (!exigeLogin) return NextResponse.next();

  // O Supabase grava a sessão em cookies "sb-<ref>-auth-token(.N)".
  const temSessao = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.includes("auth-token"));

  if (!temSessao) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("proximo", path);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Ignora estáticos, ícones, manifest, SW, offline e rotas de API.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|sw.js|offline|api).*)",
  ],
};
