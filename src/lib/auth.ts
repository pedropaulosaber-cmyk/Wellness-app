import { redirect } from "next/navigation";
import { cache } from "react";
import { criarSupabaseServer } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import type { Usuario } from "@prisma/client";

/**
 * Usuário do Vivá no banco (espelha o usuário do Supabase Auth).
 * Faz upsert no primeiro acesso. `cache` evita repetir a query no mesmo request.
 */
export const getUsuario = cache(async (): Promise<Usuario | null> => {
  const supabase = criarSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  return prisma.usuario.upsert({
    where: { id: user.id },
    update: { email: user.email ?? undefined },
    create: {
      id: user.id,
      email: user.email ?? `${user.id}@sem-email.viva`,
      nome: (user.user_metadata?.nome as string) ?? null,
    },
  });
});

/** Exige login; redireciona para /login se não houver sessão. */
export async function requireUsuario(): Promise<Usuario> {
  const u = await getUsuario();
  if (!u) redirect("/login");
  return u;
}

/** Exige acesso vitalício pago; redireciona para /comprar se não pagou. */
export async function requireAcesso(): Promise<Usuario> {
  const u = await requireUsuario();
  if (!u.acessoVitalicio) redirect("/comprar");
  return u;
}
