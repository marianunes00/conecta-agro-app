"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { IrrigationMode } from "@/types/database";

export default function IrrigationControls({
  propertyId,
  stationId,
  initialAutoEnabled,
  initialDuration = 30,
  lastEvent,
}: {
  propertyId: string;
  stationId: string | null;
  initialAutoEnabled: boolean;
  initialDuration: number;
  lastEvent: { started_at: string; duration_minutes: number | null } | null;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [mode, setMode] = useState<IrrigationMode>(initialAutoEnabled ? "automatico" : "manual");
  const [valveOpen, setValveOpen] = useState(false);
  const [duration, setDuration] = useState(initialDuration || 30);
  const [loading, setLoading] = useState(false);
  const [activeIrrigation, setActiveIrrigation] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  async function handleModeChange(newMode: IrrigationMode) {
    setMode(newMode);
    const isAuto = newMode === "automatico";
    await supabase
      .from("irrigation_settings")
      .update({ auto_mode_enabled: isAuto, updated_at: new Date().toISOString() })
      .eq("property_id", propertyId);
    router.refresh();
  }

  function adjustDuration(amount: number) {
    setDuration((prev) => Math.max(5, Math.min(180, prev + amount)));
  }

  async function handleToggleValve() {
    const nextState = !valveOpen;
    setValveOpen(nextState);
    if (nextState) {
      setActiveIrrigation(true);
      setStatusMessage("Válvula aberta e irrigação em andamento.");
    } else {
      setActiveIrrigation(false);
      setStatusMessage("Válvula fechada.");
    }
  }

  async function startIrrigation() {
    setLoading(true);
    setStatusMessage(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("irrigation_events").insert({
      property_id: propertyId,
      station_id: stationId,
      mode,
      status: "em_andamento",
      duration_minutes: duration,
      triggered_by: user?.id ?? null,
    });

    setLoading(false);
    if (error) {
      setStatusMessage("Erro ao iniciar irrigação no sistema.");
      return;
    }

    setValveOpen(true);
    setActiveIrrigation(true);
    setStatusMessage("Irrigação iniciada com sucesso!");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-3.5">
      {statusMessage && (
        <div className="rounded-2xl bg-brand-cinza/40 border border-brand-salvia/40 p-3 text-xs text-brand-institucional font-semibold flex items-center gap-2">
          <span>💧</span>
          <span>{statusMessage}</span>
        </div>
      )}

      {/* 1. Modo de Operação */}
      <section className="rounded-2xl bg-white p-4 shadow-card border border-brand-cinza">
        <p className="font-heading text-xs font-bold text-brand-escuro mb-3">Modo de operação</p>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Opção Automático */}
          <button
            type="button"
            onClick={() => handleModeChange("automatico")}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
              mode === "automatico"
                ? "bg-brand-institucional text-white border-brand-institucional shadow-sm"
                : "bg-white text-brand-escuro border-brand-cinza hover:bg-[#F8FAF7]"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill={mode === "automatico" ? "white" : "#496F3C"}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93V17c-2.76 0-5-2.24-5-5h1.07c.48 1.93 2.03 3.44 3.93 3.93z" />
              </svg>
              <span className="font-heading text-xs font-bold">Automático</span>
            </div>
            <span className={`text-[10px] ${mode === "automatico" ? "text-brand-salvia" : "text-brand-medio"}`}>
              (recomendado)
            </span>
          </button>

          {/* Opção Manual */}
          <button
            type="button"
            onClick={() => handleModeChange("manual")}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
              mode === "manual"
                ? "bg-brand-institucional text-white border-brand-institucional shadow-sm"
                : "bg-white text-brand-escuro border-brand-cinza hover:bg-[#F8FAF7]"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v7M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8M6 14v-1.5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6a7 7 0 0 0 7 7h3a7 7 0 0 0 7-7v-6.5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2" />
              </svg>
              <span className="font-heading text-xs font-bold">Manual</span>
            </div>
            <span className={`text-[10px] ${mode === "manual" ? "text-brand-salvia" : "text-brand-medio"}`}>
              Controle direto
            </span>
          </button>
        </div>
      </section>

      {/* 2. Válvula de Irrigação */}
      <section className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card border border-brand-cinza">
        <div>
          <p className="font-heading text-xs font-bold text-brand-escuro">Válvula de irrigação</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={valveOpen ? "text-blue-600" : "text-brand-conecta"}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </span>
            <p className="text-sm font-bold text-brand-escuro">
              {valveOpen ? "Aberta (irrigando)" : "Fechada"}
            </p>
          </div>
        </div>

        {/* Switch estilo iOS */}
        <button
          type="button"
          onClick={handleToggleValve}
          className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            valveOpen ? "bg-brand-institucional" : "bg-neutral-300"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
              valveOpen ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </section>

      {/* 3. Tempo de Irrigação (Manual) */}
      <section className="rounded-2xl bg-white p-4 shadow-card border border-brand-cinza">
        <p className="font-heading text-xs font-bold text-brand-escuro mb-3">Tempo de irrigação (manual)</p>

        <div className="flex items-center justify-between bg-[#F8FAF7] rounded-xl p-2 border border-brand-cinza">
          <button
            type="button"
            onClick={() => adjustDuration(-5)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand-escuro hover:bg-brand-cinza/30 active:scale-95 shadow-xs border border-brand-cinza font-bold text-lg"
          >
            -
          </button>

          <span className="font-heading text-lg font-extrabold text-brand-escuro">
            {duration} min
          </span>

          <button
            type="button"
            onClick={() => adjustDuration(5)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand-escuro hover:bg-brand-cinza/30 active:scale-95 shadow-xs border border-brand-cinza font-bold text-lg"
          >
            +
          </button>
        </div>
      </section>

      {/* 4. Botão Principal: Iniciar Irrigação */}
      <button
        type="button"
        onClick={startIrrigation}
        disabled={loading || activeIrrigation}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-institucional hover:bg-[#1f5f09] active:bg-brand-escuro py-4 text-center text-sm font-heading font-extrabold text-white shadow-md shadow-brand-institucional/20 transition-all active:scale-[0.99] disabled:opacity-70"
      >
        {loading ? (
          <span>Iniciando...</span>
        ) : activeIrrigation ? (
          <>
            <span className="h-2 w-2 rounded-full bg-brand-salvia animate-ping" />
            <span>Irrigação em andamento...</span>
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>Iniciar Irrigação Manual</span>
          </>
        )}
      </button>

      {/* 5. Card: Última Irrigação */}
      <section className="flex items-center gap-3.5 rounded-2xl bg-white p-4 shadow-card border border-neutral-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold text-neutral-800">Última irrigação</p>
          <p className="text-xs text-neutral-500 mt-0.5">
            {lastEvent
              ? `${new Date(lastEvent.started_at).toLocaleDateString("pt-BR")} às ${new Date(
                  lastEvent.started_at
                ).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
              : "08/09 às 16:20"}
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Duração: {lastEvent?.duration_minutes ?? 28} min
          </p>
        </div>
      </section>
    </div>
  );
}
