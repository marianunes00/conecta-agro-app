import Link from "next/link";
import { getPrimaryProperty, getStations, getLatestReading, getReadingsHistory } from "@/lib/data";
import SensorChart from "@/components/SensorChart";

export default async function SensoresPage({
  searchParams,
}: {
  searchParams: { tab?: string; estacao?: string };
}) {
  const property = await getPrimaryProperty();
  if (!property) {
    return (
      <EmptyState message="Cadastre uma propriedade no painel inicial para ver dados de sensores." />
    );
  }

  const stations = await getStations(property.id);
  const station = stations.find((s) => s.id === searchParams.estacao) ?? stations[0];

  if (!station) {
    return <EmptyState message="Nenhuma estação cadastrada ainda." />;
  }

  const tab = searchParams.tab === "clima" || searchParams.tab === "bateria" ? searchParams.tab : "solo";
  const latest = await getLatestReading(station.id);
  const history = await getReadingsHistory(station.id, 24);

  return (
    <div>
      <header className="flex items-center gap-3 bg-agro-800 px-6 py-5 text-white">
        <Link href="/dashboard">←</Link>
        <h1 className="text-base font-semibold">Dados dos Sensores</h1>
      </header>

      <div className="px-6 pt-4">
        <div className="flex gap-2">
          <TabLink tab="solo" active={tab === "solo"} station={station.id} label="Solo" />
          <TabLink tab="clima" active={tab === "clima"} station={station.id} label="Clima" />
          <TabLink tab="bateria" active={tab === "bateria"} station={station.id} label="Bateria" />
        </div>

        {tab === "solo" && (
          <section className="mt-4 rounded-2xl border border-neutral-100 p-4 shadow-card">
            <p className="text-sm text-neutral-500">Umidade do Solo</p>
            <p className="text-3xl font-bold text-agro-800">
              {latest?.soil_moisture_pct != null ? `${latest.soil_moisture_pct.toFixed(0)}%` : "—"}
            </p>
            <div className="mt-3">
              <SensorChart data={history} dataKey="soil_moisture_pct" unit="%" />
            </div>
          </section>
        )}

        {tab === "clima" && (
          <section className="mt-4 flex flex-col gap-3">
            <MetricRow label="Temperatura do ar" value={latest?.air_temperature_c} unit="°C" />
            <MetricRow label="Umidade do ar" value={latest?.air_humidity_pct} unit="%" />
            <MetricRow label="Pressão atmosférica" value={latest?.atmospheric_pressure_hpa} unit=" hPa" />
            <MetricRow label="Radiação UV" value={latest?.uv_index} unit=" mW/m²" />
            <div className="rounded-2xl border border-neutral-100 p-4 shadow-card">
              <p className="mb-2 text-sm text-neutral-500">Temperatura (24h)</p>
              <SensorChart data={history} dataKey="air_temperature_c" unit="°C" />
            </div>
          </section>
        )}

        {tab === "bateria" && (
          <section className="mt-4 rounded-2xl border border-neutral-100 p-4 shadow-card">
            <p className="text-sm text-neutral-500">Nível da bateria</p>
            <p className="text-3xl font-bold text-agro-800">
              {station.battery_pct != null ? `${station.battery_pct.toFixed(0)}%` : "—"}
            </p>
            <div className="mt-3">
              <SensorChart data={history} dataKey="battery_pct" unit="%" />
            </div>
          </section>
        )}

        {stations.length > 1 && (
          <div className="mt-5">
            <p className="mb-2 text-xs font-medium text-neutral-400">Outras estações</p>
            <div className="flex flex-wrap gap-2">
              {stations.map((s) => (
                <Link
                  key={s.id}
                  href={`/sensores?tab=${tab}&estacao=${s.id}`}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                    s.id === station.id ? "bg-agro-700 text-white" : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {s.code}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TabLink({ tab, active, station, label }: { tab: string; active: boolean; station: string; label: string }) {
  return (
    <Link
      href={`/sensores?tab=${tab}&estacao=${station}`}
      className={`rounded-full px-4 py-1.5 text-sm font-medium ${
        active ? "bg-agro-700 text-white" : "bg-neutral-100 text-neutral-500"
      }`}
    >
      {label}
    </Link>
  );
}

function MetricRow({ label, value, unit }: { label: string; value: number | null | undefined; unit: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-neutral-100 px-4 py-3 shadow-card">
      <span className="text-sm text-neutral-600">{label}</span>
      <span className="text-sm font-semibold text-neutral-800">
        {value != null ? `${value}${unit}` : "—"}
      </span>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="px-6 py-10 text-center text-sm text-neutral-500">
      <p>{message}</p>
    </div>
  );
}
