import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware (Edge Runtime) — deve ser TOTALMENTE autossuficiente.
 * Nada de imports via alias "@/..." nem de libs Node/Supabase: o bundler de
 * edge da Vercel falha ("unsupported modules") quando o middleware referencia
 * outros módulos do projeto. Por isso a lista de rotas é inline aqui.
 *
 * Faz apenas o gate leve: se a rota exige login e não há cookie de sessão do
 * Supabase, redireciona para /login. A validação REAL da sessão e o gate de
 * pagamento acontecem no servidor (requireUsuario/requireAcesso, runtime Node).
 */

// Mantida em sincronia com ROTAS_AUTENTICADAS de src/lib/constants.ts
const ROTAS_AUTENTICADAS = [
  "/inicio",
  "/nutricao",
  "/treinos",
  "/evolucao",
  "/perfil",
  "/integracoes",
  "/anamnese",
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const exigeLogin = ROTAS_AUTENTICADAS.some((p) => path.startsWith(p));
  if (!exigeLogin) return NextResponse.next();

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
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|sw.js|offline|api).*)",
  ],
};
