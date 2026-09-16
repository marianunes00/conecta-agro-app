"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ConectaAgroLogo, { TechGeometricBackground } from "@/components/ConectaAgroLogo";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(
        error.message.includes("Invalid login")
          ? "E-mail ou senha incorretos."
          : "Não foi possível entrar. Verifique seus dados e tente novamente."
      );
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="relative min-h-[100dvh] flex flex-col justify-between px-6 py-8 bg-white overflow-hidden">
      <TechGeometricBackground />

      {/* Topo / Logo */}
      <div className="relative z-10 pt-4 flex flex-col items-center text-center">
        <ConectaAgroLogo size="lg" orientation="vertical" />

        <div className="mt-6">
          <h1 className="text-xl font-bold text-neutral-900">
            Bem-vindo de volta!
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Acesse sua conta para continuar
          </p>
        </div>
      </div>

      {/* Formulário de Login */}
      <form onSubmit={handleSubmit} className="relative z-10 my-auto flex flex-col gap-3.5 pt-4">
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Campo E-mail ou Telefone */}
        <label className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-3.5 py-3 focus-within:border-agro-600 focus-within:ring-2 focus-within:ring-agro-100 transition-all shadow-xs">
          <MailIcon />
          <input
            type="email"
            required
            placeholder="E-mail ou telefone"
            className="w-full text-sm outline-none text-neutral-800 placeholder:text-neutral-400 bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {/* Campo Senha */}
        <label className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-3.5 py-3 focus-within:border-agro-600 focus-within:ring-2 focus-within:ring-agro-100 transition-all shadow-xs">
          <LockIcon />
          <input
            type={showPassword ? "text" : "password"}
            required
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
            title={showPassword ? "Ocultar senha" : "Ver senha"}
          >
            <EyeIcon open={showPassword} />
          </button>
        </label>

        {/* Botão Entrar */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-agro-700 hover:bg-agro-800 active:bg-agro-900 py-3.5 text-center text-sm font-semibold text-white shadow-md shadow-agro-700/20 transition-all active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {/* Link Esqueci Minha Senha */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => alert("Por favor, contate o administrador para redefinir sua senha.")}
            className="text-xs text-neutral-500 hover:text-agro-700 transition-colors"
          >
            Esqueceu sua senha?
          </button>
        </div>

        {/* Divisor "ou" */}
        <div className="my-2 flex items-center gap-3 text-xs text-neutral-400">
          <span className="h-px flex-1 bg-neutral-200" />
          <span>ou</span>
          <span className="h-px flex-1 bg-neutral-200" />
        </div>

        {/* Botão Criar nova conta */}
        <Link
          href="/cadastro"
          className="w-full rounded-xl border border-neutral-200 bg-white py-3 text-center text-sm font-semibold text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 transition-all shadow-xs"
        >
          Criar nova conta
        </Link>
      </form>

      {/* Ilustração geométrica sutil com folhas no rodapé */}
      <div className="relative z-10 flex justify-center items-center py-2 opacity-60">
        <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
          <path d="M12 18 C16 8, 28 8, 36 18" stroke="#2e7d32" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="12" cy="18" r="2" fill="#2e7d32" />
          <circle cx="36" cy="18" r="2" fill="#2e7d32" />
          <path d="M24 14 C26 9, 32 10, 32 14 C32 17, 27 18, 24 14 Z" fill="#4caf50" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="1.8">
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}
