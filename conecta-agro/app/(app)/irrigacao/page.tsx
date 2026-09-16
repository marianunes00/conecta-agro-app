import Link from "next/link";
import { getPrimaryProperty, getStations, getIrrigationSettings, getIrrigationEvents } from "@/lib/data";
import IrrigationControls from "@/components/IrrigationControls";

export default async function IrrigacaoPage() {
  const property = await getPrimaryProperty();

  if (!property) {
    return (
      <div className="px-6 py-10 text-center text-sm text-neutral-500">
        Cadastre uma propriedade no painel inicial para controlar a irrigação.
      </div>
    );
  }

  const [stations, settings, events] = await Promise.all([
    getStations(property.id),
    getIrrigationSettings(property.id),
    getIrrigationEvents(property.id, 1),
  ]);

  return (
    <div className="min-h-[100dvh] bg-[#f6f8f4] pb-8">
      {/* Header com voltar */}
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-white/95 backdrop-blur px-5 py-3.5 border-b border-neutral-100 shadow-xs">
        <Link
          href="/dashboard"
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-700 transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <h1 className="text-base font-bold text-neutral-900">Controle de Irrigação</h1>
      </header>

      <div className="px-5 pt-4">
        <IrrigationControls
          propertyId={property.id}
          stationId={stations[0]?.id ?? null}
          initialAutoEnabled={settings?.auto_mode_enabled ?? true}
          initialDuration={settings?.default_duration_minutes ?? 30}
          lastEvent={events[0] ?? null}
        />
      </div>
    </div>
  );
}
