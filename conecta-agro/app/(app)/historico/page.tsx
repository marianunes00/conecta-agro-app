import Link from "next/link";
import { getPrimaryProperty, getIrrigationEvents } from "@/lib/data";

export default async function HistoricoPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const property = await getPrimaryProperty();

  if (!property) {
    return (
      <div className="px-6 py-10 text-center text-sm text-neutral-500">
        Cadastre uma propriedade no painel inicial para ver o histórico.
      </div>
    );
  }

  const activeTab = searchParams.tab ?? "irrigacoes";
  const events = await getIrrigationEvents(property.id, 50);

  // Se não houver eventos ainda, dados ilustrativos fiéis ao protótipo
  const sampleEvents = [
    { id: "e1", mode: "automatico", date: "09/09 - 16:20", duration: 28 },
    { id: "e2", mode: "manual", date: "08/09 - 07:45", duration: 30 },
    { id: "e3", mode: "automatico", date: "07/09 - 16:10", duration: 26 },
    { id: "e4", mode: "manual", date: "06/09 - 08:12", duration: 30 },
    { id: "e5", mode: "automatico", date: "05/09 - 17:03", duration: 27 },
    { id: "e6", mode: "automatico", date: "04/09 - 16:45", duration: 25 },
  ];

  const displayList =
    events.length > 0
      ? events.map((e) => ({
          id: e.id,
          mode: e.mode,
          date: `${new Date(e.started_at).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
          })} - ${new Date(e.started_at).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}`,
          duration: e.duration_minutes ?? 30,
        }))
      : sampleEvents;

  return (
    <div className="min-h-[100dvh] bg-brand-fundo pb-8">
      {/* Header com voltar */}
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-white/95 backdrop-blur px-5 py-3.5 border-b border-brand-cinza/50 shadow-xs">
        <Link
          href="/dashboard"
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-brand-cinza/40 text-brand-escuro transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <h1 className="font-heading text-base font-bold text-brand-escuro">Histórico</h1>
      </header>

      <div className="px-5 pt-4 flex flex-col gap-3.5">
        {/* Pílulas de filtro: Irrigações, Sensores, Consumo */}
        <div className="flex items-center gap-2">
          <Link
            href="/historico?tab=irrigacoes"
            className={`flex-1 text-center py-2 rounded-xl text-xs font-heading font-semibold transition-all ${
              activeTab === "irrigacoes"
                ? "bg-brand-institucional text-white shadow-xs"
                : "bg-white text-brand-escuro/70 border border-brand-cinza hover:bg-brand-cinza/30"
            }`}
          >
            Irrigações
          </Link>
          <Link
            href="/historico?tab=sensores"
            className={`flex-1 text-center py-2 rounded-xl text-xs font-heading font-semibold transition-all ${
              activeTab === "sensores"
                ? "bg-brand-institucional text-white shadow-xs"
                : "bg-white text-brand-escuro/70 border border-brand-cinza hover:bg-brand-cinza/30"
            }`}
          >
            Sensores
          </Link>
          <Link
            href="/historico?tab=consumo"
            className={`flex-1 text-center py-2 rounded-xl text-xs font-heading font-semibold transition-all ${
              activeTab === "consumo"
                ? "bg-brand-institucional text-white shadow-xs"
                : "bg-white text-brand-escuro/70 border border-brand-cinza hover:bg-brand-cinza/30"
            }`}
          >
            Consumo
          </Link>
        </div>

        {/* Lista de Registros */}
        <ul className="flex flex-col gap-2.5">
          {displayList.map((item) => {
            const isAuto = item.mode === "automatico";
            return (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-card border border-brand-cinza/60 hover:border-brand-salvia transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* Ícone: Checkmark verde institucional para automática, Gota verde conecta para manual */}
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full shrink-0 ${
                      isAuto ? "bg-brand-cinza/40 text-brand-institucional" : "bg-brand-salvia/30 text-brand-conecta"
                    }`}
                  >
                    {isAuto ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                      </svg>
                    )}
                  </div>

                  <div>
                    <p className="font-heading text-xs font-bold text-brand-escuro">
                      Irrigação {isAuto ? "automática" : "manual"}
                    </p>
                    <p className="font-sans text-[11px] text-brand-salvia mt-0.5">{item.date}</p>
                    <p className="font-sans text-[11px] font-semibold text-brand-medio mt-0.5">
                      {item.duration} min
                    </p>
                  </div>
                </div>

                <span className="text-brand-medio">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
