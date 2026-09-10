import Link from "next/link";
import { getProfile, getPrimaryProperty, getStations } from "@/lib/data";
import SignOutButton from "@/components/SignOutButton";
import StationsManager from "@/components/StationsManager";

export default async function ConfiguracoesPage() {
  const profile = await getProfile();
  const property = await getPrimaryProperty();
  const stations = property ? await getStations(property.id) : [];

  return (
    <div>
      <header className="flex items-center gap-3 bg-agro-800 px-6 py-5 text-white">
        <Link href="/dashboard">←</Link>
        <h1 className="text-base font-semibold">Configurações</h1>
      </header>

      <div className="px-6 py-4">
        <div className="flex items-center gap-3 rounded-2xl border border-neutral-100 p-4 shadow-card">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-agro-100 text-lg font-semibold text-agro-700">
            {(profile?.full_name ?? "?").charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-800">{profile?.full_name}</p>
            <p className="text-xs text-neutral-400">{profile?.email}</p>
          </div>
        </div>

        <SettingsRow label="Minha propriedade" value={property?.name ?? "Nenhuma cadastrada"} />

        <h2 className="mt-6 mb-2 text-sm font-semibold text-neutral-500">Dispositivos</h2>
        {property ? (
          <StationsManager propertyId={property.id} stations={stations} />
        ) : (
          <p className="text-sm text-neutral-400">Cadastre uma propriedade primeiro no painel inicial.</p>
        )}

        <h2 className="mt-6 mb-2 text-sm font-semibold text-neutral-500">Preferências</h2>
        <SettingsRow label="Notificações" value="Ativadas" />
        <SettingsRow label="Conectividade" value="LoRa / Offline" />
        <SettingsRow label="Sobre o Conecta Agro" value="Versão 1.0.0" />

        <SignOutButton />
      </div>
    </div>
  );
}

function SettingsRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-2 flex items-center justify-between rounded-2xl border border-neutral-100 px-4 py-3 shadow-card">
      <span className="text-sm text-neutral-600">{label}</span>
      <span className="text-sm font-medium text-neutral-400">{value}</span>
    </div>
  );
}
