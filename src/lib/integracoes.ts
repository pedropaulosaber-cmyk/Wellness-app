import { prisma } from "@/lib/prisma";

/**
 * Integrações de saúde do Vivá.
 *
 * Um PWA não acessa HealthKit/Google Fit direto pelo navegador. O dado entra
 * por um ENDPOINT de importação (/api/integracoes/importar) que pode ser
 * chamado por:
 *   - Apple Health → Atalho/Automação do iOS que lê a saúde e faz POST
 *   - Android → job de Health Connect / wrapper nativo (Capacitor)
 *   - Google Fit → sincronização server-side via OAuth (futuro)
 *
 * A autenticação aceita a sessão (no app) ou um syncToken por usuário
 * (para automações externas).
 */

export type FonteAtividade =
  | "apple_health"
  | "google_fit"
  | "health_connect"
  | "manual";

export interface DadosAtividade {
  passos?: number;
  caloriasAtivas?: number;
  freqCardiacaMedia?: number;
}

export const FONTES: { id: FonteAtividade; nome: string; emoji: string }[] = [
  { id: "apple_health", nome: "Apple Saúde", emoji: "🍎" },
  { id: "health_connect", nome: "Health Connect (Android)", emoji: "🤖" },
  { id: "google_fit", nome: "Google Fit", emoji: "🟢" },
];

/** Insere/atualiza a atividade do dia para a fonte (idempotente). */
export async function upsertAtividade(
  usuarioId: string,
  dia: string,
  fonte: FonteAtividade,
  dados: DadosAtividade
) {
  return prisma.registroAtividadeExterna.upsert({
    where: { usuarioId_dia_fonte: { usuarioId, dia, fonte } },
    update: {
      passos: dados.passos,
      caloriasAtivas: dados.caloriasAtivas,
      freqCardiacaMedia: dados.freqCardiacaMedia,
    },
    create: {
      usuarioId,
      dia,
      fonte,
      passos: dados.passos,
      caloriasAtivas: dados.caloriasAtivas,
      freqCardiacaMedia: dados.freqCardiacaMedia,
    },
  });
}
