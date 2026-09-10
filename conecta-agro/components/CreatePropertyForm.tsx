"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CreatePropertyForm() {
  const router = useRouter();
  const supabase = createClient();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("PE");
  const [crop, setCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data: property, error: insertError } = await supabase
      .from("properties")
      .insert({ owner_id: user.id, name, city, state, main_crop: crop })
      .select()
      .single();

    if (insertError || !property) {
      setError("Não foi possível salvar a propriedade. Tente novamente.");
      setLoading(false);
      return;
    }

    await supabase.from("irrigation_settings").insert({ property_id: property.id });

    setLoading(false);
    router.refresh();
  }

  return (
    <div className="mx-6 mt-6 rounded-2xl border border-agro-100 bg-agro-50/60 p-5">
      <h2 className="text-base font-semibold text-agro-800">Cadastre sua primeira propriedade</h2>
      <p className="mt-1 text-sm text-neutral-600">
        Para ver o painel, o mapa e os dados dos sensores, comece cadastrando onde você planta.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <input
          required
          placeholder="Nome da propriedade (ex: Sítio São José)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-agro-500"
        />
        <div className="flex gap-3">
          <input
            placeholder="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-2/3 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-agro-500"
          />
          <input
            placeholder="UF"
            maxLength={2}
            value={state}
            onChange={(e) => setState(e.target.value.toUpperCase())}
            className="w-1/3 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm uppercase outline-none focus:border-agro-500"
          />
        </div>
        <input
          placeholder="Cultura principal (ex: Milho, Feijão)"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-agro-500"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-agro-700 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Salvando…" : "Salvar propriedade"}
        </button>
      </form>
    </div>
  );
}
