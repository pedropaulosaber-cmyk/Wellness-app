import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vivá — treino e nutrição num só lugar",
  description:
    "O Vivá unifica todos os seus treinos e a sua alimentação. Acesso vitalício, sem mensalidade.",
  applicationName: "Vivá",
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
      <body className="mx-auto min-h-dvh max-w-md">{children}</body>
    </html>
  );
}
