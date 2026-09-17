"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TechGeometricBackground } from "@/components/ConectaAgroLogo";

export default function CadastroPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    const { data: authData, error: authErr } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          property_name: propertyName,
        },
      },
    });

    if (authErr) {
      setError("Não foi possível criar a conta. " + authErr.message);
      setLoading(false);
      return;
    }

    // Se informou nome da propriedade e usuário foi criado, cadastra a propriedade direto
    if (authData.user && propertyName.trim()) {
      try {
        await supabase.from("properties").insert({
          owner_id: authData.user.id,
          name: propertyName.trim(),
        });
      } catch {
        // não bloqueia se o trigger já tratar
      }
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0c2506] via-[#123A08] to-[#174807] flex items-center justify-center p-0 sm:p-4 md:py-8">
      <div className="relative w-full max-w-md min-h-[100dvh] sm:min-h-auto sm:rounded-3xl shadow-2xl flex flex-col justify-between px-6 py-7 bg-white overflow-hidden text-brand-escuro border border-brand-salvia/20">
        <TechGeometricBackground />

        {/* Topo com Voltar */}
        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/login"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-brand-cinza/40 text-brand-institucional transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <h1 className="font-heading text-base font-bold text-brand-escuro">Criar conta</h1>
        </div>

        {/* Cabeçalho com Avatar Conecta Agro */}
        <div className="relative z-10 flex flex-col items-center text-center mt-2 mb-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-institucional text-white shadow-md shadow-brand-institucional/20 mb-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>

          <h2 className="font-heading text-xl font-bold text-brand-escuro">Vamos começar!</h2>
          <p className="font-sans text-xs text-brand-medio mt-0.5">Preencha seus dados para criar sua conta.</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-3">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-2.5 text-xs text-red-700 flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Nome Completo */}
          <label className="flex items-center gap-3 rounded-xl border border-brand-cinza bg-white px-3.5 py-2.5 focus-within:border-brand-institucional focus-within:ring-2 focus-within:ring-brand-institucional/10 transition-all shadow-xs">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#496F3C" strokeWidth="1.8">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input
              type="text"
              required
              placeholder="Nome completo"
              className="w-full text-sm outline-none text-brand-escuro placeholder:text-neutral-400 bg-transparent font-sans"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </label>

          {/* Telefone */}
          <label className="flex items-center gap-3 rounded-xl border border-brand-cinza bg-white px-3.5 py-2.5 focus-within:border-brand-institucional focus-within:ring-2 focus-within:ring-brand-institucional/10 transition-all shadow-xs">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#496F3C" strokeWidth="1.8">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <input
              type="tel"
              placeholder="Telefone"
              className="w-full text-sm outline-none text-brand-escuro placeholder:text-neutral-400 bg-transparent font-sans"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          {/* E-mail */}
          <label className="flex items-center gap-3 rounded-xl border border-brand-cinza bg-white px-3.5 py-2.5 focus-within:border-brand-institucional focus-within:ring-2 focus-within:ring-brand-institucional/10 transition-all shadow-xs">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#496F3C" strokeWidth="1.8">
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="m3 7 9 6 9-6" strokeLinecap="round" />
            </svg>
            <input
              type="email"
              required
              placeholder="E-mail"
              className="w-full text-sm outline-none text-brand-escuro placeholder:text-neutral-400 bg-transparent font-sans"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {/* Nome da Propriedade */}
          <label className="flex items-center gap-3 rounded-xl border border-brand-cinza bg-white px-3.5 py-2.5 focus-within:border-brand-institucional focus-within:ring-2 focus-within:ring-brand-institucional/10 transition-all shadow-xs">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#496F3C" strokeWidth="1.8">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <input
              type="text"
              placeholder="Nome da sua Fazenda / Propriedade"
              className="w-full text-sm outline-none text-brand-escuro placeholder:text-neutral-400 bg-transparent font-sans"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
            />
          </label>

          {/* Senha */}
          <label className="flex items-center gap-3 rounded-xl border border-brand-cinza bg-white px-3.5 py-2.5 focus-within:border-brand-institucional focus-within:ring-2 focus-within:ring-brand-institucional/10 transition-all shadow-xs">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#496F3C" strokeWidth="1.8">
              <rect x="4" y="11" width="16" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Senha (mínimo 6 caracteres)"
              className="w-full text-sm outline-none text-brand-escuro placeholder:text-neutral-400 bg-transparent font-sans"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-neutral-400 hover:text-brand-institucional p-0.5"
              tabIndex={-1}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </button>
          </label>

          {/* Botão Cadastrar */}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-2xl bg-brand-institucional hover:bg-[#1f5f09] active:bg-brand-escuro py-3.5 text-center text-sm font-heading font-extrabold text-white shadow-md shadow-brand-institucional/25 transition-all active:scale-[0.99] disabled:opacity-60"
          >
            {loading ? "Criando conta..." : "Criar conta"}
          </button>

          {/* Link para Login */}
          <div className="text-center pt-2">
            <span className="text-xs text-brand-medio font-sans">
              Já possui cadastro?{" "}
              <Link href="/login" className="font-semibold text-brand-institucional hover:underline">
                Faça login
              </Link>
            </span>
          </div>
        </form>

        {/* Rodapé institucional com slogan */}
        <div className="relative z-10 text-center pt-3 pb-1 border-t border-brand-cinza/40 mt-3">
          <p className="text-[10px] text-brand-medio font-medium tracking-wide">
            CONECTA AGRO • INOVAÇÃO NO CAMPO, MAIS VIDA NO FUTURO
          </p>
        </div>
      </div>
    </div>
  );
}

