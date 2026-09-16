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
    <div className="relative min-h-[100dvh] flex flex-col justify-between px-6 py-6 bg-white overflow-hidden">
      <TechGeometricBackground />

      {/* Topo com Voltar */}
      <div className="relative z-10 flex items-center gap-3">
        <Link
          href="/login"
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-700 transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <h1 className="text-base font-bold text-neutral-800">Criar conta</h1>
      </div>

      {/* Cabeçalho com Avatar Verde */}
      <div className="relative z-10 flex flex-col items-center text-center mt-2 mb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1b5e20] text-white shadow-md shadow-agro-700/20 mb-3">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-neutral-900">Vamos começar!</h2>
        <p className="text-xs text-neutral-500 mt-1">Preencha seus dados para criar sua conta.</p>
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
        <label className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 focus-within:border-agro-600 focus-within:ring-2 focus-within:ring-agro-100 transition-all shadow-xs">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="1.8">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <input
            type="text"
            required
            placeholder="Nome completo"
            className="w-full text-sm outline-none text-neutral-800 placeholder:text-neutral-400 bg-transparent"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>

        {/* Telefone */}
        <label className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 focus-within:border-agro-600 focus-within:ring-2 focus-within:ring-agro-100 transition-all shadow-xs">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="1.8">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <input
            type="tel"
            placeholder="Telefone"
            className="w-full text-sm outline-none text-neutral-800 placeholder:text-neutral-400 bg-transparent"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        {/* E-mail */}
        <label className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 focus-within:border-agro-600 focus-within:ring-2 focus-within:ring-agro-100 transition-all shadow-xs">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="1.8">
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="m3 7 9 6 9-6" strokeLinecap="round" />
          </svg>
          <input
            type="email"
            required
            placeholder="E-mail"
            className="w-full text-sm outline-none text-neutral-800 placeholder:text-neutral-400 bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {/* Propriedade / Fazenda */}
        <label className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 focus-within:border-agro-600 focus-within:ring-2 focus-within:ring-agro-100 transition-all shadow-xs">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="1.8">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <input
            type="text"
            placeholder="Propriedade / Fazenda"
            className="w-full text-sm outline-none text-neutral-800 placeholder:text-neutral-400 bg-transparent"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
          />
        </label>

        {/* Senha */}
        <label className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 focus-within:border-agro-600 focus-within:ring-2 focus-within:ring-agro-100 transition-all shadow-xs">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="1.8">
            <rect x="4" y="11" width="16" height="9" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            required
            minLength={6}
            placeholder="Senha"
            className="w-full text-sm outline-none text-neutral-800 placeholder:text-neutral-400 bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-neutral-400 hover:text-neutral-600 p-0.5"
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
          className="mt-2 w-full rounded-xl bg-agro-700 hover:bg-agro-800 active:bg-agro-900 py-3.5 text-center text-sm font-semibold text-white shadow-md shadow-agro-700/20 transition-all active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        {/* Já tem uma conta? Entrar */}
        <p className="text-center text-xs text-neutral-500 pt-1">
          Já tem uma conta?{" "}
          <Link href="/login" className="font-semibold text-agro-700 hover:underline">
            Entrar
          </Link>
        </p>
      </form>

      {/* Ilustração geométrica no rodapé */}
      <div className="relative z-10 flex justify-center items-center py-2 opacity-60">
        <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
          <circle cx="10" cy="16" r="2.5" fill="#2e7d32" />
          <circle cx="30" cy="8" r="2.5" fill="#2e7d32" />
          <circle cx="50" cy="16" r="2.5" fill="#2e7d32" />
          <line x1="10" y1="16" x2="30" y2="8" stroke="#2e7d32" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="30" y1="8" x2="50" y2="16" stroke="#2e7d32" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M42 12 C44 7, 50 8, 50 12 C50 15, 45 16, 42 12 Z" fill="#4caf50" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}
