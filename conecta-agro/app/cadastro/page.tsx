"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CadastroPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone },
      },
    });

    if (error) {
      setError("Não foi possível criar a conta. " + error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-col px-6 py-8">
      <Link href="/login" className="mb-4 text-sm text-neutral-500">
        ← Criar conta
      </Link>

      <div className="mb-6 flex flex-col items-center gap-2">
        <div className="rounded-full bg-agro-50 p-3">
          <PersonIcon />
        </div>
        <h1 className="text-xl font-bold text-agro-800">Vamos começar!</h1>
        <p className="text-center text-sm text-neutral-500">
          Preencha seus dados para criar sua conta.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Field label="Nome completo" value={fullName} onChange={setFullName} required />
        <Field label="Telefone" value={phone} onChange={setPhone} type="tel" />
        <Field label="E-mail" value={email} onChange={setEmail} type="email" required />
        <Field label="Senha" value={password} onChange={setPassword} type="password" required />
        <Field
          label="Confirme a senha"
          value={confirmPassword}
          onChange={setConfirmPassword}
          type="password"
          required
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-xl bg-agro-700 py-3 text-center text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Criando conta…" : "Cadastrar"}
        </button>

        <p className="text-center text-sm text-neutral-500">
          Já tenho uma conta?{" "}
          <Link href="/login" className="font-semibold text-agro-700">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-neutral-500">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-agro-500"
      />
    </label>
  );
}

function PersonIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1f5c26" strokeWidth="1.7">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" strokeLinecap="round" />
    </svg>
  );
}
