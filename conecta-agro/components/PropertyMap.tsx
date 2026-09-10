"use client";

import type { StationStatus } from "@/types/database";

type Station = {
  id: string;
  code: string;
  status: StationStatus;
  latitude: number | null;
  longitude: number | null;
  battery_pct: number | null;
};

const dotColor: Record<StationStatus, string> = {
  online: "#3a9642",
  atencao: "#f59e0b",
  offline: "#ef4444",
};

export default function PropertyMap({ stations }: { stations: Station[] }) {
  const positioned = stations.filter((s) => s.latitude != null && s.longitude != null);

  if (positioned.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-2xl bg-agro-50 text-sm text-neutral-500">
        <span>Nenhuma estação com localização cadastrada ainda.</span>
        <span className="text-xs text-neutral-400">
          Adicione latitude/longitude em Configurações → Dispositivos.
        </span>
      </div>
    );
  }

  const lats = positioned.map((s) => s.latitude!) ;
  const lngs = positioned.map((s) => s.longitude!);
  const minLat = Math.min(...lats) - 0.001;
  const maxLat = Math.max(...lats) + 0.001;
  const minLng = Math.min(...lngs) - 0.001;
  const maxLng = Math.max(...lngs) + 0.001;

  return (
    <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-agro-100 via-agro-50 to-agro-200">
      {/* linhas sutis simulando talhões */}
      <svg className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none">
        {[...Array(6)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={`${(i + 1) * 14}%`} x2="100%" y2={`${(i + 1) * 14}%`} stroke="#1f5c26" strokeWidth="1" />
        ))}
        {[...Array(6)].map((_, i) => (
          <line key={`v${i}`} x1={`${(i + 1) * 14}%`} y1="0" x2={`${(i + 1) * 14}%`} y2="100%" stroke="#1f5c26" strokeWidth="1" />
        ))}
      </svg>

      {positioned.map((s) => {
        const left = ((s.longitude! - minLng) / (maxLng - minLng || 1)) * 84 + 8;
        const top = (1 - (s.latitude! - minLat) / (maxLat - minLat || 1)) * 78 + 8;
        return (
          <div
            key={s.id}
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <div className="flex flex-col items-center">
              <div className="whitespace-nowrap rounded-lg bg-white px-2 py-1 text-[10px] font-semibold shadow-card">
                {s.code}
              </div>
              <div
                className="mt-1 h-4 w-4 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: dotColor[s.status] }}
              />
            </div>
          </div>
        );
      })}

      {/* Legenda */}
      <div className="absolute bottom-3 left-3 rounded-xl bg-white/95 px-3 py-2 text-[11px] shadow-card">
        <p className="mb-1 font-semibold text-neutral-600">Estações</p>
        <LegendRow color={dotColor.online} label="Online" />
        <LegendRow color={dotColor.atencao} label="Atenção" />
        <LegendRow color={dotColor.offline} label="Offline" />
      </div>
    </div>
  );
}

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-neutral-500">{label}</span>
    </div>
  );
}
