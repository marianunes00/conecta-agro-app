"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Início", icon: HomeIcon },
  { href: "/sensores", label: "Dados", icon: ChartIcon },
  { href: "/mapa", label: "Mapa", icon: MapIcon },
  { href: "/configuracoes", label: "Config", icon: GearIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="safe-bottom sticky bottom-0 z-20 border-t border-agro-100 bg-white/95 backdrop-blur">
      <ul className="flex items-stretch justify-between px-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${
                  active ? "text-agro-700" : "text-neutral-400"
                }`}
              >
                <Icon active={active} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#1f5c26" : "#a3a3a3"} strokeWidth="1.8">
      <path d="M4 11.5 12 4l8 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#1f5c26" : "#a3a3a3"} strokeWidth="1.8">
      <path d="M4 19V9M12 19V5M20 19v-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MapIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#1f5c26" : "#a3a3a3"} strokeWidth="1.8">
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 4v14M15 6v14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function GearIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#1f5c26" : "#a3a3a3"} strokeWidth="1.8">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.8 1.8 0 0 0 .36 2l.04.04a2 2 0 1 1-2.83 2.83l-.04-.04a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1 1.65V21a2 2 0 1 1-4 0v-.09a1.8 1.8 0 0 0-1-1.65 1.8 1.8 0 0 0-2 .36l-.04.04a2 2 0 1 1-2.83-2.83l.04-.04a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.65-1H3a2 2 0 1 1 0-4h.09a1.8 1.8 0 0 0 1.65-1 1.8 1.8 0 0 0-.36-2l-.04-.04a2 2 0 1 1 2.83-2.83l.04.04a1.8 1.8 0 0 0 2 .36H9a1.8 1.8 0 0 0 1-1.65V3a2 2 0 1 1 4 0v.09a1.8 1.8 0 0 0 1 1.65 1.8 1.8 0 0 0 2-.36l.04-.04a2 2 0 1 1 2.83 2.83l-.04.04a1.8 1.8 0 0 0-.36 2V9a1.8 1.8 0 0 0 1.65 1H21a2 2 0 1 1 0 4h-.09a1.8 1.8 0 0 0-1.65 1Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
