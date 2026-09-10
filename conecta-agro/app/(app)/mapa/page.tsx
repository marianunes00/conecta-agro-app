import Link from "next/link";
import { getPrimaryProperty, getStations } from "@/lib/data";
import PropertyMap from "@/components/PropertyMap";
import { StationStatusPill } from "@/components/StatusPill";

export default async function MapaPage() {
  const property = await getPrimaryProperty();

  if (!property) {
    return (
      <div className="px-6 py-10 text-center text-sm text-neutral-500">
        Cadastre uma propriedade no painel inicial para ver o mapa.
      </div>
    );
  }

  const stations = await getStations(property.id);

  return (
    <div>
      <header className="flex items-center gap-3 bg-agro-800 px-6 py-5 text-white">
        <Link href="/dashboard">←</Link>
        <h1 className="text-base font-semibold">Mapa da Propriedade</h1>
      </header>

      <div className="p-4">
        <PropertyMap stations={stations} />

        <ul className="mt-4 flex flex-col gap-2">
          {stations.map((s) => (
            <li key={s.id} className="flex items-center justify-between rounded-2xl border border-neutral-100 px-4 py-3 shadow-card">
              <div>
                <p className="text-sm font-semibold text-neutral-700">{s.code}</p>
                <StationStatusPill status={s.status} />
              </div>
              <Link href={`/sensores?estacao=${s.id}`} className="text-xs font-medium text-agro-700">
                Ver dados
              </Link>
            </li>
          ))}
          {stations.length === 0 && (
            <p className="text-center text-sm text-neutral-400">Nenhuma estação cadastrada ainda.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
