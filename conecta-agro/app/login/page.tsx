"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0c2506] via-[#123A08] to-[#174807] flex items-center justify-center p-0 sm:p-4 md:py-8">
      {/* Container que reproduz a tela do Aplicativo exibida no manual */}
      <div className="relative w-full max-w-md min-h-[100dvh] sm:min-h-[820px] sm:max-h-[880px] sm:rounded-3xl shadow-2xl flex flex-col justify-between bg-white overflow-hidden text-brand-escuro border border-brand-salvia/20">
        <TechGeometricBackground />

        {/* Parte Superior: Identidade Visual e Boas-Vindas */}
        <div className="relative z-10 px-6 pt-8 sm:pt-10 flex flex-col items-center text-center">
          {/* Logo Oficial Conecta Agro */}
          <div className="relative w-24 h-24 mb-2 hover:scale-105 transition-transform duration-300">
            <Image
              src="/conecta-agro-logo.png"
              alt="Conecta Agro"
              fill
              className="object-contain"
              priority
            />
          </div>

          <span className="font-heading font-black text-2xl tracking-tight text-brand-institucional">
            Conecta <span className="text-brand-conecta">Agro</span>
          </span>
          <span className="text-[10px] font-semibold text-brand-medio uppercase tracking-widest mt-1">
            Tecnologia que cultiva o amanhã
          </span>

          <div className="mt-5 w-full text-left">
            <h1 className="font-heading text-lg font-bold text-brand-escuro">
              Bem-vindo de volta!
            </h1>
            <p className="font-sans text-xs text-brand-medio mt-0.5">
              Acesse a plataforma de inteligência no campo
            </p>
          </div>
        </div>

        {/* Formulário Central */}
        <form onSubmit={handleSubmit} className="relative z-10 px-6 py-2 flex flex-col gap-3.5 my-auto">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Campo E-mail ou Telefone */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-semibold text-brand-medio">
              E-mail ou Usuário
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-brand-cinza bg-white px-3.5 py-3 focus-within:border-brand-institucional focus-within:ring-2 focus-within:ring-brand-institucional/10 transition-all shadow-xs">
              <MailIcon />
              <input
                type="email"
                required
                placeholder="seu.email@fazenda.com.br"
                className="w-full text-sm outline-none text-brand-escuro placeholder:text-neutral-400 bg-transparent font-sans"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Campo Senha */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-brand-medio">
                Senha de Acesso
              </label>
              <button
                type="button"
                onClick={() => alert("Para redefinir sua senha, entre em contato com o suporte ou gestor da propriedade.")}
                className="text-[11px] text-brand-conecta hover:text-brand-institucional font-medium transition-colors"
              >
                Esqueceu a senha?
              </button>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-brand-cinza bg-white px-3.5 py-3 focus-within:border-brand-institucional focus-within:ring-2 focus-within:ring-brand-institucional/10 transition-all shadow-xs">
              <LockIcon />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Sua senha secreta"
                className="w-full text-sm outline-none text-brand-escuro placeholder:text-neutral-400 bg-transparent font-sans"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-400 hover:text-brand-institucional p-0.5"
                tabIndex={-1}
                title={showPassword ? "Ocultar senha" : "Ver senha"}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
          </div>
        </form>

        {/* Parte Inferior: Lavoura Verde em Perspectiva e Botão Entrar (Mockup Oficial) */}
        <div className="relative mt-auto w-full h-[220px] overflow-hidden flex flex-col justify-end p-6">
          {/* Imagem de Fundo da Lavoura (Foto Oficial de Precisão) */}
          <Image
            src="/agro-field-hero.jpg"
            alt="Lavoura Conecta Agro"
            fill
            className="object-cover object-bottom"
            priority
          />
          {/* Gradiente de transição do branco para a imagem */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-white pointer-events-none" />

          {/* Botão Entrar (Em destaque sobre a base da lavoura com alto contraste) */}
          <div className="relative z-10 flex flex-col gap-2.5">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-2xl bg-white hover:bg-white/95 text-brand-institucional py-3.5 px-4 font-heading font-extrabold text-sm text-center shadow-lg shadow-black/25 border border-white/60 hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-75"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

            <Link
              href="/cadastro"
              className="w-full text-center text-xs font-semibold text-white/95 hover:text-white drop-shadow-md transition-colors"
            >
              Não tem conta? <span className="underline underline-offset-2">Criar nova conta</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#496F3C" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#496F3C" strokeWidth="1.8">
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

