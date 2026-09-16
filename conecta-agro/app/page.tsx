"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ConectaAgroLogo from "@/components/ConectaAgroLogo";

export default function SplashPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(45), 400);
    const timer2 = setTimeout(() => setProgress(80), 900);
    const timer3 = setTimeout(() => setProgress(100), 1500);
    const redirectTimer = setTimeout(() => {
      router.push("/login");
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#1b5e20] via-[#2e7d32] to-[#0d3311] text-white p-6 select-none">
      {/* Imagem estilizada de lavoura iluminada pelo sol ao amanhecer */}
      <div className="absolute inset-0 z-0 opacity-45 mix-blend-overlay">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sunGlow" x1="0.5" y1="0.3" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#fff7ed" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#fde047" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#15803d" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="cropRow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86efac" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#14532d" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Céu e raios solares */}
          <circle cx="200" cy="240" r="180" fill="url(#sunGlow)" />
          <path d="M 0 0 L 200 240 L 400 0 Z" fill="#fef08a" opacity="0.15" />
          <path d="M 0 100 L 200 240 L 0 300 Z" fill="#fef08a" opacity="0.1" />
          <path d="M 400 100 L 200 240 L 400 300 Z" fill="#fef08a" opacity="0.1" />

          {/* Perspectiva de linhas de plantação convergindo no horizonte */}
          <g stroke="url(#cropRow)" strokeWidth="3" opacity="0.7">
            <line x1="200" y1="360" x2="-50" y2="800" strokeWidth="8" />
            <line x1="200" y1="360" x2="20" y2="800" strokeWidth="7" />
            <line x1="200" y1="360" x2="90" y2="800" strokeWidth="6" />
            <line x1="200" y1="360" x2="160" y2="800" strokeWidth="6" />
            <line x1="200" y1="360" x2="240" y2="800" strokeWidth="6" />
            <line x1="200" y1="360" x2="310" y2="800" strokeWidth="6" />
            <line x1="200" y1="360" x2="380" y2="800" strokeWidth="7" />
            <line x1="200" y1="360" x2="450" y2="800" strokeWidth="8" />
          </g>
        </svg>
      </div>

      {/* Topo / Barra de status simulada */}
      <div className="relative z-10 flex justify-between items-center text-xs font-semibold text-white/80 pt-2 px-1">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span>5G</span>
          <span>100%</span>
        </div>
      </div>

      {/* Centro: Logo oficial Conecta Agro com globo tecnológico e broto */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center px-4 animate-slide-up">
        <div className="p-4 rounded-full bg-white/10 backdrop-blur-md shadow-2xl border border-white/20 mb-6">
          <ConectaAgroLogo
            size="xl"
            showText={false}
            className="text-white drop-shadow-md"
          />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-md">
          Conecta
          <span className="block text-emerald-300 font-black">Agro</span>
        </h1>

        <p className="mt-6 text-sm text-emerald-100/90 font-medium max-w-[260px] leading-relaxed drop-shadow">
          Irrigação inteligente para um futuro mais sustentável
        </p>
      </div>

      {/* Rodapé com barra de progresso verde e atalho */}
      <div className="relative z-10 flex flex-col items-center pb-6">
        <div className="w-44 h-1.5 bg-white/20 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-emerald-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(52,211,153,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <Link
          href="/login"
          className="text-xs text-emerald-200 hover:text-white transition-colors"
        >
          Pular introdução →
        </Link>
      </div>
    </div>
  );
}
