"use client";

import { useEffect, useState } from "react";

// Evento beforeinstallprompt (tipagem mínima — não está no lib.dom padrão)
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * Registra o service worker e oferece o botão "Instalar no celular".
 * Montar uma vez no layout do app.
 */
export default function PwaProvider() {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [instalado, setInstalado] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // registro falhou (ex.: ambiente sem HTTPS) — app segue funcionando online
      });
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalado(true);
      setPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!prompt || instalado) return null;

  return (
    <button
      onClick={async () => {
        await prompt.prompt();
        const { outcome } = await prompt.userChoice;
        if (outcome === "accepted") setInstalado(true);
        setPrompt(null);
      }}
      className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-[27rem] rounded-xl bg-viva px-4 py-3 text-center text-sm font-semibold text-white shadow-lg"
    >
      📲 Instalar o Vivá no seu celular
    </button>
  );
}
