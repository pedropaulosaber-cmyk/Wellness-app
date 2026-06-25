import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/components/site/CartProvider";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CartDrawer from "@/components/site/CartDrawer";
import TrackPageView from "@/components/site/TrackPageView";

export const metadata: Metadata = {
  title: "Gaspar Lopes Alfaiataria — Elegância que define quem você é",
  description:
    "Alfaiataria clássica brasileira. Camisas e camisetas sob medida, peças autorais e entrega para todo o Brasil.",
  applicationName: "Gaspar Lopes Alfaiataria",
};

export const viewport: Viewport = {
  themeColor: "#0D1B2A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <TrackPageView />
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
