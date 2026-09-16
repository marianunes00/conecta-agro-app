import type { StationStatus, AlertSeverity } from "@/types/database";

const stationMap: Record<StationStatus, { label: string; dot: string; text: string }> = {
  online: { label: "Online", dot: "bg-emerald-500", text: "text-emerald-700" },
  atencao: { label: "Atenção", dot: "bg-amber-500", text: "text-amber-700" },
  offline: { label: "Offline", dot: "bg-red-500", text: "text-red-700" },
};

export function StationStatusPill({ status }: { status: StationStatus }) {
  const s = stationMap[status] ?? stationMap.offline;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${s.text}`}>
      <span className={`h-2 w-2 rounded-full ${s.dot} animate-pulse`} />
      {s.label}
    </span>
  );
}

export type ConditionLevel = "ideal" | "boa" | "baixa" | "alta" | "critica" | "normal";

const conditionMap: Record<ConditionLevel, { label: string; bg: string; text: string }> = {
  ideal: { label: "Ideal", bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  boa: { label: "Boa", bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  normal: { label: "Normal", bg: "bg-[#e8f5e9]", text: "text-[#2e7d32]" },
  baixa: { label: "Baixa", bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  alta: { label: "Alta", bg: "bg-[#fff3e0]", text: "text-[#e65100]" },
  critica: { label: "Crítica", bg: "bg-[#ffebee]", text: "text-[#c62828]" },
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
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${c.bg} ${c.text}`}>
      {customLabel ?? c.label}
    </span>
  );
}

const severityMap: Record<AlertSeverity, { bg: string; text: string; ring: string }> = {
  info: { bg: "bg-sky-50", text: "text-sky-700", ring: "ring-sky-200" },
  atencao: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200" },
  critico: { bg: "bg-red-50", text: "text-red-700", ring: "ring-red-200" },
};

export function SeverityBadge({ severity }: { severity: AlertSeverity }) {
  const s = severityMap[severity] ?? severityMap.info;
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${s.bg} ${s.text} ${s.ring}`}>
      {severity === "critico" ? "Crítico" : severity === "atencao" ? "Atenção" : "Info"}
    </span>
  );
}
