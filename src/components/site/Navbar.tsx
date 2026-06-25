"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

const LINKS = [
  { href: "#historia", label: "Nossa História" },
  { href: "#colecoes", label: "Coleções" },
  { href: "#sobmedida", label: "Sob Medida" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const { count, toggle } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = scrolled ? "rgba(13,27,42,0.92)" : "rgba(13,27,42,0.2)";
  const navBorder = scrolled ? "rgba(245,240,235,0.1)" : "rgba(245,240,235,0)";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(20px,5vw,64px)",
        height: 80,
        background: navBg,
        backdropFilter: "blur(8px)",
        transition: "background .4s ease, border-color .4s ease",
        borderBottom: `1px solid ${navBorder}`,
      }}
    >
      {/* Links desktop */}
      <div
        className="gl-nav-desktop"
        style={{
          gap: 32,
          flex: 1,
          fontWeight: 300,
          fontSize: 13,
          letterSpacing: ".08em",
          textTransform: "uppercase",
        }}
      >
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="gl-link" style={{ color: "#F5F0EB", textDecoration: "none" }}>
            {l.label}
          </a>
        ))}
      </div>

      {/* Botão menu mobile */}
      <button
        className="gl-nav-toggle"
        onClick={() => setMenu((m) => !m)}
        aria-label="Menu"
        style={{
          flex: 1,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#F5F0EB",
          padding: 8,
          alignItems: "center",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          {menu ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {/* Logo central */}
      <a href="#topo" style={{ flex: "0 0 auto", textAlign: "center", textDecoration: "none" }}>
        <div
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 600,
            fontSize: 26,
            letterSpacing: ".04em",
            color: "#C9A86A",
            lineHeight: 1,
          }}
        >
          Gaspar Lopes
        </div>
        <div
          style={{
            fontWeight: 300,
            fontSize: 9,
            letterSpacing: ".42em",
            textTransform: "uppercase",
            color: "#F5F0EB",
            marginTop: 3,
          }}
        >
          Alfaiataria
        </div>
      </a>

      {/* Carrinho */}
      <div style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
        <button
          onClick={toggle}
          aria-label="Abrir sacola"
          style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "#F5F0EB", padding: 8 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M6 7h12l-1 13H7L6 7z" />
            <path d="M9 7V5a3 3 0 0 1 6 0v2" />
          </svg>
          {count > 0 && (
            <span
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                minWidth: 16,
                height: 16,
                padding: "0 3px",
                borderRadius: 8,
                background: "#C9A86A",
                color: "#0D1B2A",
                fontSize: 10,
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {count}
            </span>
          )}
        </button>
      </div>

      {/* Menu mobile (dropdown) */}
      <div
        className={`gl-nav-mobile${menu ? " open" : ""}`}
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          background: "rgba(13,27,42,0.98)",
          borderBottom: "1px solid rgba(245,240,235,0.1)",
          padding: "8px 0",
        }}
      >
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenu(false)}
            style={{
              display: "block",
              padding: "14px clamp(20px,5vw,64px)",
              color: "#F5F0EB",
              textDecoration: "none",
              fontWeight: 300,
              fontSize: 14,
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
