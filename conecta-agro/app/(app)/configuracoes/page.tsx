import Link from "next/link";
import { getProfile, getPrimaryProperty, getStations } from "@/lib/data";
import SignOutButton from "@/components/SignOutButton";
import StationsManager from "@/components/StationsManager";

export default async function ConfiguracoesPage() {
  const profile = await getProfile();
  const property = await getPrimaryProperty();
  const stations = property ? await getStations(property.id) : [];

  return (
    <div className="min-h-[100dvh] bg-brand-fundo pb-12">
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
        <h1 className="font-heading text-base font-bold text-brand-escuro">Configurações</h1>
      </header>

      <div className="px-5 pt-4 flex flex-col gap-3.5">
        {/* Card do Usuário com Avatar Verde Institucional */}
        <section className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card border border-brand-cinza/60">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-institucional text-white shadow-md shadow-brand-institucional/20 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div>
              <p className="font-heading text-sm font-bold text-brand-escuro leading-tight">
                {profile?.full_name || "Maria Valéria"}
              </p>
              <p className="font-sans text-xs text-brand-medio mt-0.5 font-medium">
                {profile?.email || "maria@email.com"}
              </p>
            </div>
          </div>

          <span className="text-brand-medio">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </section>

        {/* Grupo de Itens de Configuração com Ícones */}
        <div className="flex flex-col gap-2">
          {/* Minha Propriedade */}
          <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-card border border-brand-cinza/60">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cinza/40 text-brand-institucional">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <p className="font-heading text-xs font-bold text-brand-escuro">Minha Propriedade</p>
                <p className="font-sans text-[11px] text-brand-salvia mt-0.5">
                  {property?.name ?? "Sítio São José"}
                </p>
              </div>
            </div>
            <span className="text-brand-medio">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </div>

          {/* Notificações */}
          <Link
            href="/notificacoes"
            className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-card border border-brand-cinza/60 hover:bg-brand-cinza/20 transition"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cinza/40 text-brand-institucional">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div>
                <p className="font-heading text-xs font-bold text-brand-escuro">Notificações</p>
                <p className="font-sans text-[11px] text-brand-salvia mt-0.5">Preferências e alertas</p>
              </div>
            </div>
            <span className="text-brand-medio">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </Link>

          {/* Conectividade */}
          <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-card border border-brand-cinza/60">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cinza/40 text-brand-institucional">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                  <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                  <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
                </svg>
              </div>
              <div>
                <p className="font-heading text-xs font-bold text-brand-escuro">Conectividade</p>
                <p className="font-sans text-[11px] text-brand-salvia mt-0.5">LoRa / Offline</p>
              </div>
            </div>
            <span className="text-brand-medio">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </div>

          {/* Sobre o Conecta Agro */}
          <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-card border border-brand-cinza/60">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-cinza/40 text-brand-institucional">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <div>
                <p className="font-heading text-xs font-bold text-brand-escuro">Sobre o Conecta Agro</p>
                <p className="font-sans text-[11px] text-brand-salvia mt-0.5">Versão 1.0.0</p>
              </div>
            </div>
            <span className="text-brand-medio">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </div>
        </div>

        {/* Gerenciamento de Estações / Dispositivos */}
        <section className="mt-2 rounded-2xl bg-white p-4 shadow-card border border-brand-cinza/60">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cinza/40 text-brand-institucional">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.8 1.8 0 0 0 .36 2l.04.04a2 2 0 1 1-2.83 2.83l-.04-.04a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1 1.65V21a2 2 0 1 1-4 0v-.09a1.8 1.8 0 0 0-1-1.65 1.8 1.8 0 0 0-2 .36l-.04.04a2 2 0 1 1-2.83-2.83l.04-.04a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.65-1H3a2 2 0 1 1 0-4h.09a1.8 1.8 0 0 0 1.65-1 1.8 1.8 0 0 0-.36-2l-.04-.04a2 2 0 1 1 2.83-2.83l.04.04a1.8 1.8 0 0 0 2 .36H9a1.8 1.8 0 0 0 1-1.65V3a2 2 0 1 1 4 0v.09a1.8 1.8 0 0 0 1 1.65 1.8 1.8 0 0 0 2-.36l.04-.04a2 2 0 1 1 2.83 2.83l-.04.04a1.8 1.8 0 0 0-.36 2V9a1.8 1.8 0 0 0 1.65 1H21a2 2 0 1 1 0 4h-.09a1.8 1.8 0 0 0-1.65 1Z" />
              </svg>
            </div>
            <div>
              <h2 className="font-heading text-xs font-bold text-brand-escuro">Dispositivos & Sensores</h2>
              <p className="font-sans text-[11px] text-brand-salvia">Gerenciar estações e copiar ID</p>
            </div>
          </div>

          {property ? (
            <StationsManager propertyId={property.id} stations={stations} />
          ) : (
            <p className="font-sans text-xs text-brand-salvia">Cadastre uma propriedade para gerenciar estações.</p>
          )}
        </section>

        {/* Botão Sair com borda vermelha e texto vermelho */}
        <SignOutButton />

        {/* Assinatura Oficial da Marca */}
        <div className="mt-4 mb-2 text-center">
          <p className="font-heading text-[10px] tracking-wider uppercase font-extrabold text-brand-conecta">
            Conecta Agro
          </p>
          <p className="font-sans text-[9px] tracking-widest uppercase text-brand-medio mt-0.5">
            Inovação no campo, mais vida no futuro
          </p>
        </div>
      </div>
    </div>
  );
}
