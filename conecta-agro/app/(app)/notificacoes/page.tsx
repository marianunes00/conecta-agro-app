import Link from "next/link";
import { getPrimaryProperty, getAlerts } from "@/lib/data";

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

  // Lista padrão fiel ao protótipo Screen 9 se não houver alertas gravados ainda
  const sampleNotifications = [
    {
      id: "n1",
      type: "recomendacao",
      title: "Irrigação recomendada",
      message: "Solo está abaixo do ideal. Irrigar em 2h (aprox. 12 mm).",
      date: "Hoje, 09:41",
    },
    {
      id: "n2",
      type: "bateria",
      title: "Bateria baixa",
      message: "A bateria da estação 2 está com 15%.",
      date: "Hoje, 07:32",
    },
    {
      id: "n3",
      type: "conexao",
      title: "Conexão restabelecida",
      message: "A estação 3 voltou a ficar online.",
      date: "08/09, 18:20",
    },
    {
      id: "n4",
      type: "concluida",
      title: "Irrigação concluída",
      message: "A irrigação manual foi concluída com sucesso.",
      date: "08/09, 16:20",
    },
    {
      id: "n5",
      type: "umidade",
      title: "Alerta de umidade",
      message: "O solo atingiu 90% de umidade.",
      date: "08/09, 12:14",
    },
  ];

  const displayList =
    alerts.length > 0
      ? alerts.map((a) => {
          let type = "recomendacao";
          const lower = (a.title + " " + a.message).toLowerCase();
          if (lower.includes("bateria")) type = "bateria";
          else if (lower.includes("conexão") || lower.includes("online")) type = "conexao";
          else if (lower.includes("concluída")) type = "concluida";
          else if (lower.includes("umidade") || a.severity === "atencao") type = "umidade";

          return {
            id: a.id,
            type,
            title: a.title,
            message: a.message,
            date: `${new Date(a.created_at).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
            })}, ${new Date(a.created_at).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}`,
          };
        })
      : sampleNotifications;

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
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-agro-700">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <h1 className="text-base font-bold text-neutral-900">Notificações</h1>
        </div>
      </header>

      <div className="px-5 pt-4">
        <ul className="flex flex-col gap-2.5">
          {displayList.map((n) => (
            <li
              key={n.id}
              className="flex items-start gap-3.5 rounded-2xl bg-white p-3.5 shadow-card border border-neutral-100 hover:border-neutral-200 transition-colors"
            >
              {/* Ícone Circular Colorido */}
              <div className="shrink-0 mt-0.5">
                {n.type === "recomendacao" && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                  </div>
                )}
                {n.type === "bateria" && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="7" width="16" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M20 11v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <rect x="4" y="9" width="4" height="6" rx="1" />
                    </svg>
                  </div>
                )}
                {n.type === "conexao" && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                      <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
                    </svg>
                  </div>
                )}
                {n.type === "concluida" && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
                {n.type === "umidade" && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Conteúdo da Notificação */}
              <div className="flex-1">
                <p className="text-xs font-bold text-neutral-900">{n.title}</p>
                <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">{n.message}</p>
                <p className="text-[11px] text-neutral-400 mt-1 font-medium">{n.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
