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
    <div>
      <header className="flex items-center gap-3 bg-agro-800 px-6 py-5 text-white">
        <Link href="/dashboard">←</Link>
        <h1 className="text-base font-semibold">Controle de Irrigação</h1>
      </header>

      <IrrigationControls
        propertyId={property.id}
        stationId={stations[0]?.id ?? null}
        initialAutoEnabled={settings?.auto_mode_enabled ?? false}
        initialDuration={settings?.default_duration_minutes ?? 30}
        lastEvent={events[0] ?? null}
      />
    </div>
  );
}
