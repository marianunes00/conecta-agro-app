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
    <div className="mx-6 mt-6 rounded-2xl border border-brand-cinza bg-brand-cinza/20 p-5 shadow-xs">
      <h2 className="font-heading text-base font-bold text-brand-institucional">Cadastre sua primeira propriedade</h2>
      <p className="mt-1 font-sans text-sm text-brand-escuro/80">
        Para ver o painel, o mapa e os dados dos sensores, comece cadastrando onde você planta.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <input
          required
          placeholder="Nome da propriedade (ex: Sítio São José)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-brand-cinza px-4 py-2.5 text-sm outline-none focus:border-brand-institucional font-sans bg-white"
        />
        <div className="flex gap-3">
          <input
            placeholder="Cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-2/3 rounded-xl border border-brand-cinza px-4 py-2.5 text-sm outline-none focus:border-brand-institucional font-sans bg-white"
          />
          <input
            placeholder="UF"
            maxLength={2}
            value={state}
            onChange={(e) => setState(e.target.value.toUpperCase())}
            className="w-1/3 rounded-xl border border-brand-cinza px-4 py-2.5 text-sm uppercase outline-none focus:border-brand-institucional font-sans bg-white"
          />
        </div>
        <input
          placeholder="Cultura principal (ex: Milho, Feijão)"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="rounded-xl border border-brand-cinza px-4 py-2.5 text-sm outline-none focus:border-brand-institucional font-sans bg-white"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-brand-institucional py-2.5 text-sm font-heading font-semibold text-white hover:bg-brand-escuro transition disabled:opacity-60 shadow-xs"
        >
          {loading ? "Salvando…" : "Salvar propriedade"}
        </button>
      </form>
    </div>
  );
}
