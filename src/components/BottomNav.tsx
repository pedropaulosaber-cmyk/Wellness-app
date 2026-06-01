"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITENS = [
  { href: "/inicio", rotulo: "Início", icone: "🏠" },
  { href: "/treinos", rotulo: "Treinos", icone: "🏋️" },
  { href: "/nutricao", rotulo: "Nutrição", icone: "🥗" },
  { href: "/evolucao", rotulo: "Evolução", icone: "📈" },
  { href: "/perfil", rotulo: "Perfil", icone: "👤" },
];

// Barra de navegação inferior (padrão de app mobile).
export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-viva-100 bg-white">
      <ul className="flex">
        {ITENS.map((item) => {
          const ativo = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`toque flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${
                  ativo ? "text-viva" : "text-viva-400"
                }`}
              >
                <span className="text-xl leading-none">{item.icone}</span>
                {item.rotulo}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
