import type { StationStatus, AlertSeverity } from "@/types/database";

const stationMap: Record<StationStatus, { label: string; dot: string; text: string }> = {
  online: { label: "Online", dot: "bg-[#496F3C]", text: "text-brand-institucional" },
  atencao: { label: "Atenção", dot: "bg-amber-500", text: "text-amber-800" },
  offline: { label: "Offline", dot: "bg-red-500", text: "text-red-700" },
};

export function StationStatusPill({ status }: { status: StationStatus }) {
  const s = stationMap[status] ?? stationMap.offline;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-heading font-bold ${s.text}`}>
      <span className={`h-2 w-2 rounded-full ${s.dot} animate-pulse`} />
      {s.label}
    </span>
  );
}

export type ConditionLevel = "ideal" | "boa" | "baixa" | "alta" | "critica" | "normal";

const conditionMap: Record<ConditionLevel, { label: string; bg: string; text: string }> = {
  ideal: { label: "Ideal", bg: "bg-brand-cinza/50", text: "text-brand-institucional" },
  boa: { label: "Boa", bg: "bg-brand-cinza/50", text: "text-brand-conecta" },
  normal: { label: "Normal", bg: "bg-brand-cinza/50", text: "text-brand-medio" },
  baixa: { label: "Baixa", bg: "bg-amber-50", text: "text-amber-800" },
  alta: { label: "Alta", bg: "bg-amber-50", text: "text-amber-800" },
  critica: { label: "Crítica", bg: "bg-red-50", text: "text-red-700" },
};

export function ConditionBadge({
  level,
  customLabel,
}: {
  level: ConditionLevel | string;
  customLabel?: string;
}) {
  const norm = (level.toLowerCase() as ConditionLevel);
  const c = conditionMap[norm] ?? conditionMap.ideal;
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-heading font-bold border border-brand-cinza/60 ${c.bg} ${c.text}`}>
      {customLabel ?? c.label}
    </span>
  );
}

const severityMap: Record<AlertSeverity, { bg: string; text: string; ring: string }> = {
  info: { bg: "bg-brand-cinza/40", text: "text-brand-institucional", ring: "ring-brand-salvia/40" },
  atencao: { bg: "bg-amber-50", text: "text-amber-800", ring: "ring-amber-200" },
  critico: { bg: "bg-red-50", text: "text-red-700", ring: "ring-red-200" },
};

export function SeverityBadge({ severity }: { severity: AlertSeverity }) {
  const s = severityMap[severity] ?? severityMap.info;
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-heading font-bold ring-1 ${s.bg} ${s.text} ${s.ring}`}>
      {severity === "critico" ? "Crítico" : severity === "atencao" ? "Atenção" : "Info"}
    </span>
  );
}

