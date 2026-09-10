import type { StationStatus, AlertSeverity } from "@/types/database";

const stationMap: Record<StationStatus, { label: string; dot: string; text: string }> = {
  online: { label: "Online", dot: "bg-agro-500", text: "text-agro-700" },
  atencao: { label: "Atenção", dot: "bg-amber-500", text: "text-amber-700" },
  offline: { label: "Offline", dot: "bg-red-500", text: "text-red-700" },
};

export function StationStatusPill({ status }: { status: StationStatus }) {
  const s = stationMap[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${s.text}`}>
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

const severityMap: Record<AlertSeverity, { bg: string; text: string; ring: string }> = {
  info: { bg: "bg-sky-50", text: "text-sky-700", ring: "ring-sky-200" },
  atencao: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200" },
  critico: { bg: "bg-red-50", text: "text-red-700", ring: "ring-red-200" },
};

export function SeverityBadge({ severity }: { severity: AlertSeverity }) {
  const s = severityMap[severity];
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${s.bg} ${s.text} ${s.ring}`}>
      {severity === "critico" ? "Crítico" : severity === "atencao" ? "Atenção" : "Info"}
    </span>
  );
}
