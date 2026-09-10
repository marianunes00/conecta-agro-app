import Link from "next/link";
import { getPrimaryProperty, getIrrigationEvents } from "@/lib/data";

export default async function HistoricoPage() {
  const property = await getPrimaryProperty();

  if (!property) {
    return (
      <div className="px-6 py-10 text-center text-sm text-neutral-500">
        Cadastre uma propriedade no painel inicial para ver o histórico.
      </div>
    );
  }

  const events = await getIrrigationEvents(property.id, 50);

  return (
    <div>
      <header className="flex items-center gap-3 bg-agro-800 px-6 py-5 text-white">
        <Link href="/dashboard">←</Link>
        <h1 className="text-base font-semibold">Histórico</h1>
      </header>

      <div className="px-4 pt-4">
        <div className="flex gap-2">
          <span className="rounded-full bg-agro-700 px-4 py-1.5 text-sm font-medium text-white">Irrigação</span>
          <span className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-400">Sensores</span>
          <span className="rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-medium text-neutral-400">Consumo</span>
        </div>

        <ul className="mt-4 flex flex-col gap-2">
          {events.map((e) => (
            <li key={e.id} className="flex items-center gap-3 rounded-2xl border border-neutral-100 px-4 py-3 shadow-card">
              <span className="rounded-full bg-agro-50 p-2 text-agro-700">💧</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-neutral-700">
                  Irrigação {e.mode === "automatico" ? "automática" : "manual"}
                </p>
                <p className="text-xs text-neutral-400">
                  {new Date(e.started_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} -{" "}
                  {new Date(e.started_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  {e.duration_minutes ? ` · ${e.duration_minutes} min` : ""}
                </p>
              </div>
              <span className="text-neutral-300">›</span>
            </li>
          ))}

          {events.length === 0 && (
            <p className="mt-6 text-center text-sm text-neutral-400">
              Nenhuma irrigação registrada ainda. Inicie uma no Controle de Irrigação.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}
