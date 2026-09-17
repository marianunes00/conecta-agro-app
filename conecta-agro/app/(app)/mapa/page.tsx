import Link from "next/link";
import { getPrimaryProperty, getStations } from "@/lib/data";
import PropertyMap from "@/components/PropertyMap";

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
    <div className="min-h-[100dvh] bg-brand-fundo">
      {/* Header com voltar e ícone de camadas */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white/95 backdrop-blur px-5 py-3.5 border-b border-brand-cinza/50 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-brand-cinza/40 text-brand-escuro transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <h1 className="font-heading text-base font-bold text-brand-escuro">Mapa da Propriedade</h1>
        </div>

        {/* Ícone de Camadas do Mapa */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cinza/40 hover:bg-brand-cinza/70 text-brand-escuro transition"
          title="Alternar camadas do mapa"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </button>
      </header>

      {/* Mapa Satellite dos Talhões */}
      <div className="p-3">
        <PropertyMap stations={stations} />
      </div>
    </div>
  );
}
