"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Início", icon: HomeIcon },
  { href: "/sensores", label: "Dados", icon: ChartIcon },
  { href: "/mapa", label: "Mapa", icon: MapIcon },
  { href: "/configuracoes", label: "Mais", icon: MenuDotsIcon, isMenu: true },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const moreLinks = [
    { href: "/gestao", label: "Painel de Gestão & IA", icon: "📊" },
    { href: "/irrigacao", label: "Controle de Irrigação", icon: "💧" },
    { href: "/historico", label: "Histórico de Atividades", icon: "📋" },
    { href: "/notificacoes", label: "Notificações & Alertas", icon: "🔔" },
    { href: "/configuracoes", label: "Configurações do Sistema", icon: "⚙️" },
  ];

  return (
    <>
      {/* Modal / Menu rápido "Mais" */}
      {showMoreMenu && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs flex items-end justify-center animate-fade-in"
          onClick={() => setShowMoreMenu(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-t-3xl p-5 shadow-2xl border-t border-neutral-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto w-12 h-1.5 rounded-full bg-neutral-200 mb-4" />
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="font-bold text-neutral-800 text-base">Menu Rápido</h3>
              <button
                type="button"
                onClick={() => setShowMoreMenu(false)}
                className="text-neutral-400 hover:text-neutral-600 text-sm font-medium"
              >
                Fechar
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-2">
              {moreLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setShowMoreMenu(false)}
                  className={`flex flex-col items-start gap-1 p-3.5 rounded-2xl border transition-all ${
                    pathname === item.href
                      ? "bg-agro-50 border-agro-300 text-agro-900"
                      : "bg-neutral-50/70 border-neutral-100 text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs font-semibold">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Barra de Navegação Inferior */}
      <nav className="safe-bottom sticky bottom-0 z-20 border-t border-neutral-100 bg-white/95 backdrop-blur shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
        <ul className="flex items-center justify-around px-3 py-1.5">
          {navItems.map(({ href, label, icon: Icon, isMenu }) => {
            const isMoreActive =
              Boolean(isMenu &&
              (pathname === "/gestao" ||
                pathname === "/configuracoes" ||
                pathname === "/irrigacao" ||
                pathname === "/historico" ||
                pathname === "/notificacoes"));
            const active = Boolean(pathname === href || isMoreActive);

            if (isMenu) {
              return (
                <li key={href} className="flex-1">
                  <button
                    type="button"
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className={`w-full flex flex-col items-center gap-1 py-1 text-[11px] font-medium transition-colors ${
                      active ? "text-agro-700 font-semibold" : "text-neutral-400 hover:text-neutral-600"
                    }`}
                  >
                    <Icon active={active} />
                    <span>{label}</span>
                  </button>
                </li>
              );
            }

            return (
              <li key={href} className="flex-1">
                <Link
                  href={href}
                  className={`flex flex-col items-center gap-1 py-1 text-[11px] font-medium transition-colors ${
                    active ? "text-agro-700 font-semibold" : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  <Icon active={active} />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={active ? "2" : "1.8"}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" fill="white" />
    </svg>
  );
}

function ChartIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? "2.2" : "1.8"}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function MapIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill={active ? "rgba(31,92,38,0.12)" : "none"}
      stroke="currentColor"
      strokeWidth={active ? "2" : "1.8"}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" fill={active ? "currentColor" : "none"} />
    </svg>
  );
}

function MenuDotsIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? "2.2" : "1.8"}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}
