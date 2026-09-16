import {
  getPrimaryProperty,
  getStations,
  getLatestReading,
  getIrrigationEvents,
} from "@/lib/data";
import ManagementDashboard from "@/components/ManagementDashboard";
import CreatePropertyForm from "@/components/CreatePropertyForm";
import Link from "next/link";

export const metadata = {
  title: "Painel de Gestão & IA Agronômica | Conecta Agro",
  description: "Indicadores em tempo real, detecção de anomalias, histórico e IA de irrigação",
};

export default async function GestaoPage() {
  const property = await getPrimaryProperty();

  if (!property) {
    return (
      <div className="min-h-screen bg-neutral-50 px-5 py-8 pb-24">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-6 shadow-card border border-neutral-100 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-agro-50 text-agro-700 flex items-center justify-center text-2xl mb-4">
              🌱
            </div>
            <h1 className="text-xl font-bold text-neutral-900">
              Painel de Gestão & Inteligência Artificial
            </h1>
            <p className="text-xs text-neutral-500 mt-2 mb-6">
              Para visualizar os indicadores analíticos, estimativa hídrica por IA e detecção de anomalias, cadastre sua primeira propriedade.
            </p>
            <CreatePropertyForm />
          </div>
        </div>
      </div>
    );
  }

  const rawStations = await getStations(property.id);
  const stations = (rawStations.length > 0 ? rawStations : [
    {
      id: "estacao-demo-1",
      code: "EST-01 (Pivô Central)",
      status: "online" as const,
      battery_pct: 92,
      latitude: -8.0745,
      longitude: -39.1192,
    },
    {
      id: "estacao-demo-2",
      code: "EST-02 (Setor Sul)",
      status: "atencao" as const,
      battery_pct: 42,
      latitude: -8.0772,
      longitude: -39.1235,
    },
  ]).map((s) => ({
    id: s.id,
    code: s.code,
    status: (s.status as "online" | "atencao" | "offline") || "online",
    battery_pct: s.battery_pct,
    latitude: s.latitude,
    longitude: s.longitude,
  }));

  const mainStation = stations[0];
  const realReading = mainStation ? await getLatestReading(mainStation.id) : null;
  const latestReading = realReading ?? {
    soil_moisture_pct: 38,
    air_temperature_c: 31.5,
    air_humidity_pct: 48,
    atmospheric_pressure_hpa: 1012,
    battery_pct: 88,
    water_flow_l: 45,
  };

  const realEvents = await getIrrigationEvents(property.id, 14);
  const recentEvents = (realEvents.length > 0 ? realEvents : [
    {
      id: "demo-evt-1",
      started_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      duration_minutes: 45,
      water_used_l: 1850,
      mode: "automatico" as const,
    },
    {
      id: "demo-evt-2",
      started_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      duration_minutes: 50,
      water_used_l: 2100,
      mode: "manual" as const,
    },
    {
      id: "demo-evt-3",
      started_at: new Date(Date.now() - 3 * 86400000).toISOString(),
      duration_minutes: 35,
      water_used_l: 1500,
      mode: "automatico" as const,
    },
    {
      id: "demo-evt-4",
      started_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      duration_minutes: 60,
      water_used_l: 2600,
      mode: "manual" as const,
    },
    {
      id: "demo-evt-5",
      started_at: new Date(Date.now() - 5 * 86400000).toISOString(),
      duration_minutes: 40,
      water_used_l: 1720,
      mode: "automatico" as const,
    },
  ]).map((evt) => ({
    id: evt.id,
    started_at: evt.started_at,
    duration_minutes: evt.duration_minutes,
    water_used_l: evt.water_used_l,
    mode: (evt.mode as "manual" | "automatico") || "automatico",
  }));

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Top Header Navigation */}
      <header className="bg-agro-800 text-white px-5 pt-6 pb-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
            <div>
              <h1 className="text-base font-bold text-white leading-tight">
                Painel de Gestão & IA
              </h1>
              <p className="text-[11px] text-emerald-200">
                {property.name} {property.city ? `• ${property.city}` : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              IA Ativa
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-4">
        <ManagementDashboard
          property={{
            id: property.id,
            name: property.name,
            city: property.city,
            state: property.state,
            area_hectares: property.area_hectares,
            main_crop: property.main_crop,
          }}
          stations={stations}
          recentEvents={recentEvents}
          latestReading={latestReading}
        />
      </main>
    </div>
  );
}
