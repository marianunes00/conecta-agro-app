import Link from "next/link";
import { getPrimaryProperty, getAlerts } from "@/lib/data";
import { SeverityBadge } from "@/components/StatusPill";

export default async function NotificacoesPage() {
  const property = await getPrimaryProperty();

  if (!property) {
    return (
      <div className="px-6 py-10 text-center text-sm text-neutral-500">
        Cadastre uma propriedade no painel inicial para ver notificações.
      </div>
    );
  }

  const alerts = await getAlerts(property.id, 50);

  return (
    <div>
      <header className="flex items-center gap-3 bg-agro-800 px-6 py-5 text-white">
        <Link href="/dashboard">←</Link>
        <h1 className="text-base font-semibold">Notificações</h1>
      </header>

      <ul className="flex flex-col gap-2 p-4">
        {alerts.map((a) => (
          <li key={a.id} className="rounded-2xl border border-neutral-100 p-4 shadow-card">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-sm font-semibold text-neutral-700">{a.title}</p>
              <SeverityBadge severity={a.severity} />
            </div>
            <p className="text-sm text-neutral-500">{a.message}</p>
            <p className="mt-1 text-xs text-neutral-400">
              {new Date(a.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} -{" "}
              {new Date(a.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </li>
        ))}

        {alerts.length === 0 && (
          <p className="mt-6 text-center text-sm text-neutral-400">Nenhuma notificação por enquanto.</p>
        )}
      </ul>
    </div>
  );
}
