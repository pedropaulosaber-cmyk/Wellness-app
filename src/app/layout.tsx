import type { Metadata, Viewport } from "next";
import "./globals.css";
import PwaProvider from "@/components/PwaProvider";

export const metadata: Metadata = {
  title: "Vivá — treino e nutrição num só lugar",
  description:
    "O Vivá unifica todos os seus treinos e a sua alimentação. Acesso vitalício, sem mensalidade.",
  applicationName: "Vivá",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Vivá",
  },
};

export const viewport: Viewport = {
  themeColor: "#1F6B4A",
  width: "device-width",
  initialScale: 1,
  // Mobile-first: não bloqueia zoom de acessibilidade, mas evita zoom acidental
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="mx-auto min-h-dvh max-w-md">
        {children}
        <PwaProvider />
      </body>
    </html>
  );
}
