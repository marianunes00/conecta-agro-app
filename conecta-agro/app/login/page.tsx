"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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
          : "Não foi possível entrar. Tente novamente."
      );
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-10">
      <div className="mb-8 flex flex-col items-center gap-3">
        <LeafLogo />
        <h1 className="text-2xl font-bold text-agro-800">Conecta Agro</h1>
        <p className="text-sm text-neutral-500">Acesse sua conta</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-3">
          <MailIcon />
          <input
            type="email"
            required
            placeholder="E-mail ou telefone"
            className="w-full text-sm outline-none placeholder:text-neutral-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-3">
          <LockIcon />
          <input
            type={showPassword ? "text" : "password"}
            required
            placeholder="Senha"
            className="w-full text-sm outline-none placeholder:text-neutral-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-xs text-neutral-400"
          >
            {showPassword ? "ocultar" : "ver"}
          </button>
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-xl bg-agro-700 py-3 text-center text-sm font-semibold text-white transition active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>

        <Link href="#" className="text-center text-sm text-agro-700">
          Esqueceu sua senha?
        </Link>

        <div className="my-2 flex items-center gap-3 text-xs text-neutral-400">
          <span className="h-px flex-1 bg-neutral-200" />
          ou
          <span className="h-px flex-1 bg-neutral-200" />
        </div>

        <Link
          href="/cadastro"
          className="rounded-xl border border-agro-700 py-3 text-center text-sm font-semibold text-agro-700"
        >
          Criar uma conta
        </Link>
      </form>

      <p className="mt-10 text-center text-xs text-neutral-400">
        Conectando o campo à tecnologia
      </p>
    </div>
  );
}

function LeafLogo() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#1f5c26" strokeWidth="1.6">
      <path d="M12 21C7 21 4 17.5 4 12.5 9 12.5 12 15.5 12 21Z" />
      <path d="M12 21c5 0 8-3.5 8-8.5-5 0-8 3-8 8.5Z" />
      <path d="M6 4c3.5 1 6 3.5 6 8" strokeLinecap="round" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.7">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.7">
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
