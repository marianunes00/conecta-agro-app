import Link from "next/link";
import {
  getProfile,
  getPrimaryProperty,
  getStations,
  getLatestReading,
  getLatestRecommendation,
} from "@/lib/data";
import CreatePropertyForm from "@/components/CreatePropertyForm";
import { ConditionBadge } from "@/components/StatusPill";

export default async function DashboardPage() {
  const profile = await getProfile();
  const property = await getPrimaryProperty();

  if (!property) {
    return (
      <div>
        <header className="bg-agro-800 px-6 pt-7 pb-6 text-white">
          <div className="flex items-center justify-between">
            <button type="button" className="text-white/80 hover:text-white p-1">
              <HamburgerIcon />
            </button>
            <Link href="/notificacoes" className="relative p-1 text-white/80 hover:text-white">
              <BellIcon />
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-agro-800 font-bold shadow-inner">
              <UserIcon />
            </div>
            <div>
              <p className="text-base font-bold text-white">
                Olá, {profile?.full_name || "Produtor"}!
              </p>
              <p className="text-xs text-emerald-200">Cadastre sua primeira propriedade</p>
            </div>
          </div>
        </header>

        <div className="px-5 py-6">
          <CreatePropertyForm />
        </div>
      </div>
    );
  }

  const stations = await getStations(property.id);
  const mainStation = stations[0];
  const latestReading = mainStation ? await getLatestReading(mainStation.id) : null;
  const recommendation = await getLatestRecommendation(property.id);

  // Valores reais com fallback inteligente para exibição rica inicial
  const soilMoisture = latestReading?.soil_moisture_pct ?? 38;
  const airTemp = latestReading?.air_temperature_c ?? 28;
  const airHumidity = latestReading?.air_humidity_pct ?? 56;
  const battery = mainStation?.battery_pct ?? latestReading?.battery_pct ?? 87;

  const soilStatus = soilMoisture < 45 ? "baixa" : soilMoisture > 80 ? "alta" : "ideal";
  const tempStatus = airTemp >= 20 && airTemp <= 32 ? "ideal" : "alta";
  const humStatus = airHumidity >= 45 && airHumidity <= 70 ? "ideal" : "baixa";
  const battStatus = battery >= 60 ? "boa" : battery >= 25 ? "normal" : "baixa";

  return (
    <div className="min-h-[100dvh] bg-[#f6f8f4] pb-6">
      {/* 1. Header Verde com Menu, Notificações e Perfil */}
      <header className="bg-[#1b5e20] px-6 pt-5 pb-6 text-white shadow-md">
        <div className="flex items-center justify-between mb-4">
          <button type="button" className="text-white hover:text-emerald-200 transition p-1">
            <HamburgerIcon />
          </button>

          <Link href="/notificacoes" className="relative p-1 text-white hover:text-emerald-200 transition">
            <BellIcon />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#1b5e20]" />
          </Link>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="flex h-13 w-13 items-center justify-center rounded-full bg-white text-[#1b5e20] shadow-md border-2 border-emerald-300/40 shrink-0">
            <UserIcon />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">
              Olá, {profile?.full_name || "Maria Valéria"}!
            </h1>
            <p className="text-xs text-emerald-200/90 font-medium mt-0.5">
              Propriedade: {property.name}
            </p>
          </div>
        </div>
      </header>

      <div className="px-5 -mt-3 flex flex-col gap-4">
        {/* 2. Card de Clima (Tempo) */}
        <section className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card border border-neutral-100">
          <div className="flex items-center gap-3">
            <SunIcon />
            <div>
              <p className="text-2xl font-bold text-neutral-900 leading-tight">
                {airTemp.toFixed(0)}°C
              </p>
              <p className="text-xs font-medium text-neutral-500">Ensolarado</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-semibold text-neutral-800">
              {property.city ? `${property.city}${property.state ? " - " + property.state : ""}` : "Salgueiro - PE"}
            </p>
            <p className="text-[11px] text-neutral-400 mt-0.5">Hoje, 09:41</p>
          </div>
        </section>

        {/* 3. Seção: Condições da sua lavoura */}
        <section>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h2 className="text-sm font-bold text-neutral-700">Condições da sua lavoura</h2>
            {mainStation && (
              <span className="text-[11px] text-neutral-400 font-medium">
                {mainStation.code}
              </span>
            )}
          </div>

          {/* Grid 2x2 com ícones redondos e status pills */}
          <div className="grid grid-cols-2 gap-3">
            {/* Card 1: Umidade do Solo */}
            <div className="flex flex-col justify-between rounded-2xl bg-white p-3.5 shadow-card border border-neutral-100">
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <DropIcon />
                </div>
                <ConditionBadge level={soilStatus} />
              </div>
              <div className="mt-3">
                <p className="text-xs text-neutral-500 font-medium">Umidade do solo</p>
                <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                  {soilMoisture.toFixed(0)}%
                </p>
              </div>
            </div>

            {/* Card 2: Temperatura do Ar */}
            <div className="flex flex-col justify-between rounded-2xl bg-white p-3.5 shadow-card border border-neutral-100">
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <ThermometerIcon />
                </div>
                <ConditionBadge level={tempStatus} />
              </div>
              <div className="mt-3">
                <p className="text-xs text-neutral-500 font-medium">Temperatura do ar</p>
                <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                  {airTemp.toFixed(0)}°C
                </p>
              </div>
            </div>

            {/* Card 3: Umidade do Ar */}
            <div className="flex flex-col justify-between rounded-2xl bg-white p-3.5 shadow-card border border-neutral-100">
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <WaterDropsIcon />
                </div>
                <ConditionBadge level={humStatus} />
              </div>
              <div className="mt-3">
                <p className="text-xs text-neutral-500 font-medium">Umidade do ar</p>
                <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                  {airHumidity.toFixed(0)}%
                </p>
              </div>
            </div>

            {/* Card 4: Bateria da Estação */}
            <div className="flex flex-col justify-between rounded-2xl bg-white p-3.5 shadow-card border border-neutral-100">
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <BatteryIcon />
                </div>
                <ConditionBadge level={battStatus} />
              </div>
              <div className="mt-3">
                <p className="text-xs text-neutral-500 font-medium">Bateria da estação</p>
                <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                  {battery.toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Card de Recomendação de Irrigação */}
        <Link
          href="/irrigacao"
          className="flex items-center gap-3.5 rounded-2xl bg-[#1b5e20] p-4 text-white shadow-md shadow-agro-800/15 hover:bg-[#164e1c] transition-all group"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-xs text-white shrink-0">
            <DropIcon />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-medium text-emerald-200 uppercase tracking-wide">
              Recomendação de irrigação
            </p>
            <p className="text-sm font-bold text-white mt-0.5">
              {recommendation?.reasoning ?? "Irrigar em 2h (aprox. 12 mm)"}
            </p>
          </div>
          <span className="text-white/80 group-hover:translate-x-0.5 transition-transform">
            <ChevronRight />
          </span>
        </Link>

        {/* 5. Destaque: Painel de Gestão & IA */}
        <Link
          href="/gestao"
          className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-agro-800 text-white shadow-lg shadow-emerald-950/20 hover:brightness-105 transition-all group border border-emerald-700/40"
        >
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-xl backdrop-blur-xs shrink-0">
              📊
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-white">Painel de Gestão & IA</p>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950 text-[9px] font-extrabold uppercase tracking-wide">
                  Novo
                </span>
              </div>
              <p className="text-[11px] text-emerald-200 mt-0.5">
                Indicadores, histórico, mapas, anomalias e IA hídrica
              </p>
            </div>
          </div>
          <span className="text-emerald-200 group-hover:translate-x-1 transition-transform">
            <ChevronRight />
          </span>
        </Link>
      </div>
    </div>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-500 shadow-inner">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function DropIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function ThermometerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  );
}

function WaterDropsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="6" width="18" height="12" rx="3" />
      <path d="M23 11v2" />
      <rect x="3" y="8" width="10" height="8" rx="1.5" fill="currentColor" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
