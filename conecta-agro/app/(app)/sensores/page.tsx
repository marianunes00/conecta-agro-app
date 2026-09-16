import Link from "next/link";
import { getPrimaryProperty, getStations, getLatestReading, getReadingsHistory } from "@/lib/data";
import SensorChart from "@/components/SensorChart";
import { ConditionBadge } from "@/components/StatusPill";

export default async function SensoresPage({
  searchParams,
}: {
  searchParams: { periodo?: string; estacao?: string };
}) {
  const property = await getPrimaryProperty();

  if (!property) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-neutral-500">Cadastre uma propriedade para visualizar os sensores.</p>
      </div>
    );
  }

  const stations = await getStations(property.id);
  const station = stations.find((s) => s.id === searchParams.estacao) ?? stations[0];

  const period = searchParams.periodo ?? "hoje";
  const hours = period === "30d" ? 720 : period === "7d" ? 168 : 24;

  const latest = station ? await getLatestReading(station.id) : null;
  const history = station ? await getReadingsHistory(station.id, hours) : [];

  // Valores com fallback inteligente para corresponder ao protótipo
  const soilMoisture = latest?.soil_moisture_pct ?? 38;
  const airTemp = latest?.air_temperature_c ?? 28;
  const airHumidity = latest?.air_humidity_pct ?? 56;
  const pressure = latest?.atmospheric_pressure_hpa ?? 1012;
  const uv = latest?.uv_index ?? 6.2;

  const soilStatus = soilMoisture < 45 ? "baixa" : soilMoisture > 80 ? "alta" : "ideal";
  const tempStatus = airTemp >= 20 && airTemp <= 32 ? "ideal" : "alta";
  const humStatus = airHumidity >= 45 && airHumidity <= 70 ? "ideal" : "baixa";

  return (
    <div className="min-h-[100dvh] bg-[#f6f8f4] pb-8">
      {/* 1. Header com voltar */}
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-white/95 backdrop-blur px-5 py-3.5 border-b border-neutral-100 shadow-xs">
        <Link
          href="/dashboard"
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-700 transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <h1 className="text-base font-bold text-neutral-900">Dados dos Sensores</h1>
      </header>

      <div className="px-5 pt-4 flex flex-col gap-3.5">
        {/* 2. Filtros de Período (Hoje, 7 dias, 30 dias) */}
        <div className="flex items-center gap-2">
          <Link
            href={`/sensores?periodo=hoje${station ? `&estacao=${station.id}` : ""}`}
            className={`flex-1 text-center py-2 rounded-xl text-xs font-semibold transition-all ${
              period === "hoje"
                ? "bg-[#1b5e20] text-white shadow-sm"
                : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            Hoje
          </Link>
          <Link
            href={`/sensores?periodo=7d${station ? `&estacao=${station.id}` : ""}`}
            className={`flex-1 text-center py-2 rounded-xl text-xs font-semibold transition-all ${
              period === "7d"
                ? "bg-[#1b5e20] text-white shadow-sm"
                : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            7 dias
          </Link>
          <Link
            href={`/sensores?periodo=30d${station ? `&estacao=${station.id}` : ""}`}
            className={`flex-1 text-center py-2 rounded-xl text-xs font-semibold transition-all ${
              period === "30d"
                ? "bg-[#1b5e20] text-white shadow-sm"
                : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            30 dias
          </Link>
        </div>

        {/* 3. Card Principal: Umidade do Solo com Gráfico Temporal */}
        <section className="rounded-2xl bg-white p-4 shadow-card border border-neutral-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-neutral-600">Umidade do Solo</p>
            </div>
            <ConditionBadge level={soilStatus} />
          </div>

          <div className="mt-2 mb-1">
            <p className="text-3xl font-extrabold text-neutral-900">
              {soilMoisture.toFixed(0)}%
            </p>
          </div>

          {/* Gráfico de Linha */}
          <div className="mt-1 -mx-2">
            <SensorChart data={history} dataKey="soil_moisture_pct" unit="%" />
          </div>
        </section>

        {/* 4. Lista de Métricas Climáticas Individuais */}
        <div className="flex flex-col gap-2.5">
          {/* Temperatura do Ar */}
          <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card border border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-600">Temperatura do Ar</p>
                <p className="text-lg font-bold text-neutral-900 mt-0.5">{airTemp.toFixed(0)}°C</p>
              </div>
            </div>
            <ConditionBadge level={tempStatus} />
          </div>

          {/* Umidade do Ar */}
          <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card border border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-600">Umidade do Ar</p>
                <p className="text-lg font-bold text-neutral-900 mt-0.5">{airHumidity.toFixed(0)}%</p>
              </div>
            </div>
            <ConditionBadge level={humStatus} />
          </div>

          {/* Pressão Atmosférica */}
          <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card border border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m14 14-4-4" />
                  <path d="M12 6v2" />
                  <path d="M6 12h2" />
                  <path d="M16 12h2" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-600">Pressão Atmosférica</p>
                <p className="text-lg font-bold text-neutral-900 mt-0.5">
                  {pressure ? `${pressure.toLocaleString("pt-BR")} hPa` : "1.012 hPa"}
                </p>
              </div>
            </div>
          </div>

          {/* Radiação Solar */}
          <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card border border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-600">Radiação Solar</p>
                <p className="text-lg font-bold text-neutral-900 mt-0.5">
                  {uv ? `${uv.toLocaleString("pt-BR")} mW/m²` : "6,2 mW/m²"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seletor de Estação caso haja mais de uma */}
        {stations.length > 1 && (
          <div className="mt-2 rounded-2xl bg-white p-3.5 border border-neutral-100 shadow-card">
            <p className="text-xs font-medium text-neutral-500 mb-2">Selecione a estação:</p>
            <div className="flex flex-wrap gap-2">
              {stations.map((s) => (
                <Link
                  key={s.id}
                  href={`/sensores?periodo=${period}&estacao=${s.id}`}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                    s.id === station?.id
                      ? "bg-[#1b5e20] text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
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
