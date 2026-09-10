"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { IrrigationMode } from "@/types/database";

export default function IrrigationControls({
  propertyId,
  stationId,
  initialAutoEnabled,
  initialDuration,
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

  const [autoEnabled, setAutoEnabled] = useState(initialAutoEnabled);
  const [mode, setMode] = useState<IrrigationMode>(initialAutoEnabled ? "automatico" : "manual");
  const [duration, setDuration] = useState(initialDuration);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function toggleAuto() {
    const next = !autoEnabled;
    setAutoEnabled(next);
    setMode(next ? "automatico" : "manual");
    await supabase
      .from("irrigation_settings")
      .update({ auto_mode_enabled: next, updated_at: new Date().toISOString() })
      .eq("property_id", propertyId);
    router.refresh();
  }

  async function saveDuration(next: number) {
    const clamped = Math.max(5, Math.min(180, next));
    setDuration(clamped);
    await supabase
      .from("irrigation_settings")
      .update({ default_duration_minutes: clamped })
      .eq("property_id", propertyId);
  }

  async function startIrrigation() {
    setLoading(true);
    setMessage(null);

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
      setMessage("Não foi possível iniciar a irrigação. Tente novamente.");
      return;
    }
    setMessage("Irrigação iniciada com sucesso.");
    router.refresh();
  }

  return (
    <div className="px-6">
      {/* Auto toggle */}
      <div className="mt-4 flex items-start justify-between rounded-2xl bg-agro-700 p-4 text-white">
        <div className="pr-4">
          <p className="text-sm font-semibold">Irrigação automática</p>
          <p className="mt-1 text-xs text-agro-100">
            O sistema indica e executa a irrigação conforme os dados dos sensores.
          </p>
        </div>
        <button
          onClick={toggleAuto}
          className={`h-6 w-11 shrink-0 rounded-full transition ${autoEnabled ? "bg-white" : "bg-agro-500"}`}
          aria-label="Ativar irrigação automática"
        >
          <span
            className={`block h-5 w-5 translate-y-0.5 rounded-full bg-agro-800 transition ${
              autoEnabled ? "ml-[calc(100%-1.4rem)] !bg-agro-700" : "ml-0.5"
            }`}
          />
        </button>
      </div>

      {/* Mode select */}
      <p className="mt-5 text-sm font-semibold text-neutral-500">Modo de irrigação</p>
      <div className="mt-2 flex flex-col gap-2">
        <ModeOption
          active={mode === "automatico"}
          label="Automático (recomendado)"
          onClick={() => setMode("automatico")}
          icon="🤖"
        />
        <ModeOption active={mode === "manual"} label="Manual" onClick={() => setMode("manual")} icon="✋" />
      </div>

      {/* Duration */}
      {mode === "manual" && (
        <>
          <p className="mt-5 text-sm font-semibold text-neutral-500">Tempo de irrigação (manual)</p>
          <div className="mt-2 flex items-center justify-between rounded-2xl border border-neutral-100 px-4 py-3 shadow-card">
            <button
              onClick={() => saveDuration(duration - 5)}
              className="grid h-8 w-8 place-items-center rounded-full bg-neutral-100 text-lg"
            >
              −
            </button>
            <span className="text-base font-semibold">{duration} min</span>
            <button
              onClick={() => saveDuration(duration + 5)}
              className="grid h-8 w-8 place-items-center rounded-full bg-neutral-100 text-lg"
            >
              +
            </button>
          </div>
        </>
      )}

      <button
        onClick={startIrrigation}
        disabled={loading}
        className="mt-5 w-full rounded-xl bg-agro-700 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Iniciando…" : "Iniciar irrigação"}
      </button>

      {message && <p className="mt-2 text-center text-xs text-agro-700">{message}</p>}

      {lastEvent && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-neutral-100 p-4 shadow-card">
          <span className="rounded-full bg-agro-50 p-2 text-agro-700">💧</span>
          <div>
            <p className="text-sm font-semibold text-neutral-700">
              Última irrigação{" "}
              {new Date(lastEvent.started_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} às{" "}
              {new Date(lastEvent.started_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
            </p>
            <p className="text-xs text-neutral-400">Duração: {lastEvent.duration_minutes} min</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ModeOption({
  active,
  label,
  icon,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium ${
        active ? "border-agro-700 bg-agro-50 text-agro-800" : "border-neutral-100 text-neutral-600"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}
