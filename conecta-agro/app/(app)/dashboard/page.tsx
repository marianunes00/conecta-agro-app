import Link from "next/link";
import {
  getProfile,
  getPrimaryProperty,
  getStations,
  getLatestReading,
  getIrrigationEvents,
  getLatestRecommendation,
} from "@/lib/data";
import CreatePropertyForm from "@/components/CreatePropertyForm";
import { StationStatusPill } from "@/components/StatusPill";

export default async function DashboardPage() {
  const profile = await getProfile();
  const property = await getPrimaryProperty();

  if (!property) {
    return (
      <div className="px-0">
        <TopBar name={profile?.full_name ?? ""} propertyName={null} />
        <CreatePropertyForm />
      </div>
    );
  }

  const stations = await getStations(property.id);
  const mainStation = stations[0];
  const latestReading = mainStation ? await getLatestReading(mainStation.id) : null;
  const recentEvents = await getIrrigationEvents(property.id, 1);
  const recommendation = await getLatestRecommendation(property.id);
  const lastIrrigation = recentEvents[0];

  return (
    <div>
      <TopBar name={profile?.full_name ?? ""} propertyName={property.name} />

      <div className="px-6">
        {/* Card de condições */}
        <div className="mt-4 rounded-2xl bg-agro-700 p-5 text-white shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">
                {latestReading?.air_temperature_c != null
                  ? `${latestReading.air_temperature_c.toFixed(0)}°C`
                  : "—"}
              </p>
              <p className="text-sm text-agro-100">
                {property.city ? `${property.city}${property.state ? " - " + property.state : ""}` : "Sua propriedade"}
              </p>
            </div>
            <SunIcon />
          </div>
        </div>

        {/* Resumo */}
        <h2 className="mt-5 text-sm font-semibold text-neutral-500">Resumo da irrigação</h2>
        <div className="mt-2 grid grid-cols-3 gap-3">
          <SummaryStat
            label="Solo"
            value={latestReading?.soil_moisture_pct != null ? `${latestReading.soil_moisture_pct.toFixed(0)}%` : "—"}
            icon={<DropIcon />}
          />
          <SummaryStat
            label="Bateria"
            value={mainStation?.battery_pct != null ? `${mainStation.battery_pct.toFixed(0)}%` : "—"}
            icon={<BatteryIcon />}
          />
          <SummaryStat
            label="Água (hoje)"
            value={lastIrrigation?.water_used_l != null ? `${lastIrrigation.water_used_l} L` : "0 mm"}
            icon={<DropIcon />}
          />
        </div>

        {/* Recomendação */}
        {recommendation && recommendation.should_irrigate && (
          <Link
            href="/irrigacao"
            className="mt-4 flex items-center gap-3 rounded-2xl bg-agro-50 p-4 ring-1 ring-agro-200"
          >
            <span className="rounded-full bg-agro-700 p-2 text-white">
              <DropIcon />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-agro-800">Irrigação recomendada</p>
              <p className="text-xs text-neutral-600">
                {recommendation.reasoning ?? "O solo está abaixo do ideal para a cultura."}
              </p>
            </div>
            <ChevronIcon />
          </Link>
        )}

        {/* Estação mais recente */}
        <h2 className="mt-5 text-sm font-semibold text-neutral-500">Estação mais recente</h2>
        {mainStation ? (
          <Link
            href="/sensores"
            className="mt-2 flex items-center justify-between rounded-2xl border border-neutral-100 p-4 shadow-card"
          >
            <div>
              <StationStatusPill status={mainStation.status} />
              <p className="mt-1 text-xs text-neutral-400">
                Último envio:{" "}
                {mainStation.last_seen_at
                  ? new Date(mainStation.last_seen_at).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "sem dados ainda"}
              </p>
            </div>
            <ChevronIcon />
          </Link>
        ) : (
          <p className="mt-2 rounded-2xl border border-dashed border-neutral-200 p-4 text-sm text-neutral-500">
            Nenhuma estação cadastrada ainda. Cadastre uma em Configurações → Dispositivos.
          </p>
        )}
      </div>
    </div>
  );
}

function TopBar({ name, propertyName }: { name: string; propertyName: string | null }) {
  return (
    <div className="flex items-center justify-between bg-agro-800 px-6 py-5 text-white">
      <div>
        <p className="text-sm text-agro-100">Olá, {name.split(" ")[0] || "produtor"}!</p>
        <p className="text-xs text-agro-200">{propertyName ?? "Nenhuma propriedade cadastrada"}</p>
      </div>
      <MenuIcon />
    </div>
  );
}

function SummaryStat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-neutral-100 py-3 shadow-card">
      <span className="text-agro-700">{icon}</span>
      <span className="text-sm font-semibold text-neutral-800">{value}</span>
      <span className="text-[11px] text-neutral-400">{label}</span>
    </div>
  );
}

function SunIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fde68a" strokeWidth="1.6">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
}
function DropIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11Z" />
    </svg>
  );
}
function BatteryIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="2" y="7" width="17" height="10" rx="2" />
      <path d="M21 10v4" strokeLinecap="round" />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}
