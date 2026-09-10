"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { StationStatusPill } from "@/components/StatusPill";
import type { StationStatus } from "@/types/database";

type Station = {
  id: string;
  code: string;
  status: StationStatus;
  latitude: number | null;
  longitude: number | null;
};

export default function StationsManager({ propertyId, stations }: { propertyId: string; stations: Station[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("stations").insert({
      property_id: propertyId,
      code,
      latitude: lat ? parseFloat(lat) : null,
      longitude: lng ? parseFloat(lng) : null,
      status: "offline",
    });

    setLoading(false);
    if (error) {
      setError(error.message.includes("duplicate") ? "Já existe uma estação com esse nome." : "Erro ao salvar.");
      return;
    }
    setCode("");
    setLat("");
    setLng("");
    setOpen(false);
    router.refresh();
  }

  return (
    <div>
      <ul className="flex flex-col gap-2">
        {stations.map((s) => (
          <li key={s.id} className="flex items-center justify-between rounded-2xl border border-neutral-100 px-4 py-3 shadow-card">
            <div>
              <p className="text-sm font-semibold text-neutral-700">{s.code}</p>
              <StationStatusPill status={s.status} />
            </div>
          </li>
        ))}
        {stations.length === 0 && (
          <p className="text-sm text-neutral-400">Nenhum dispositivo cadastrado ainda.</p>
        )}
      </ul>

      {open ? (
        <form onSubmit={handleAdd} className="mt-3 flex flex-col gap-2 rounded-2xl border border-agro-100 bg-agro-50/60 p-4">
          <input
            required
            placeholder="Nome da estação (ex: Estação 1)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-agro-500"
          />
          <div className="flex gap-2">
            <input
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="w-1/2 rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-agro-500"
            />
            <input
              placeholder="Longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              className="w-1/2 rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-agro-500"
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl border border-neutral-200 py-2 text-sm text-neutral-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-agro-700 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Salvando…" : "Salvar"}
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="mt-3 w-full rounded-xl border border-dashed border-agro-300 py-2.5 text-sm font-semibold text-agro-700"
        >
          + Adicionar estação
        </button>
      )}
    </div>
  );
}
