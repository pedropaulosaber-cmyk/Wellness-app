// Página de fallback exibida pelo service worker quando está offline.
export const metadata = { title: "Offline — Vivá" };

export default function OfflinePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 px-6 text-center">
      <h1 className="text-2xl font-bold text-viva-900">Você está offline</h1>
      <p className="text-sm text-viva-600">
        Sem conexão no momento. Suas telas já visitadas continuam disponíveis;
        reconecte para sincronizar treinos e refeições.
      </p>
    </main>
  );
}
