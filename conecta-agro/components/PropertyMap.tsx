"use client";

import { useState } from "react";
import type { StationStatus } from "@/types/database";

type Station = {
  id: string;
  code: string;
  status: StationStatus;
  latitude: number | null;
  longitude: number | null;
  battery_pct: number | null;
};

export default function PropertyMap({ stations }: { stations: Station[] }) {
  const [selectedStation, setSelectedStation] = useState<string | null>(
    stations[0]?.id ?? null
  );

  const onlineCount = stations.filter((s) => s.status === "online").length || 1;
  const atencaoCount = stations.filter((s) => s.status === "atencao").length;
  const offlineCount = stations.filter((s) => s.status === "offline").length;

  return (
    <div className="relative w-full h-[calc(100dvh-135px)] min-h-[520px] overflow-hidden rounded-3xl bg-[#0c2506] shadow-inner select-none">
      {/* 1. Imagem de Satélite / Textura de Lavoura com Talhões Agrícolas */}
      <div className="absolute inset-0 z-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 600 750"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="plot1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#174807" />
              <stop offset="100%" stopColor="#123A08" />
            </linearGradient>
            <linearGradient id="plot2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#496F3C" />
              <stop offset="100%" stopColor="#174807" />
            </linearGradient>
            <linearGradient id="plotDry" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#665330" />
              <stop offset="100%" stopColor="#4a3b22" />
            </linearGradient>
            <pattern id="soilLines" width="20" height="20" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="20" stroke="#ffffff" strokeWidth="0.8" opacity="0.1" />
            </pattern>
          </defs>

          {/* Fundo base textura terra/vegetação */}
          <rect width="600" height="750" fill="#123A08" />

          {/* Polígonos de Talhões Agrícolas (Perspectiva de Satélite) */}
          <g stroke="#ffffff" strokeWidth="1.8" opacity="0.85">
            {/* Talhão 1 (Principal irrigado) */}
            <polygon points="120,180 340,150 360,340 150,380" fill="url(#plot2)" />
            <polygon points="120,180 340,150 360,340 150,380" fill="url(#soilLines)" />

            {/* Talhão 2 (Secundário) */}
            <polygon points="340,150 510,120 530,300 360,340" fill="url(#plot1)" />

            {/* Talhão 3 (Solo em descanso) */}
            <polygon points="150,380 360,340 380,560 180,600" fill="url(#plot1)" />

            {/* Talhão 4 (Área com alerta) */}
            <polygon points="360,340 530,300 550,520 380,560" fill="url(#plotDry)" />
            <polygon points="360,340 530,300 550,520 380,560" fill="url(#soilLines)" />

            {/* Talhões laterais de fronteira */}
            <polygon points="50,220 120,180 150,380 70,420" fill="#123A08" opacity="0.6" />
            <polygon points="180,600 380,560 390,700 190,720" fill="#174807" opacity="0.7" />
          </g>

          {/* Estradas vicinais / carreadores entre talhões */}
          <g stroke="#a38257" strokeWidth="4" strokeLinecap="round" opacity="0.6">
            <line x1="340" y1="150" x2="380" y2="560" />
            <line x1="150" y1="380" x2="530" y2="300" />
          </g>
        </svg>
      </div>

      {/* 2. Marcadores das Estações de Sensores no Mapa */}
      {/* Estação 1 (Online - Verde Institucional) */}
      <div
        className="absolute top-[34%] left-[34%] -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 z-10"
        onClick={() => setSelectedStation("1")}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute h-10 w-10 rounded-full bg-brand-conecta/30 animate-ping" />
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-institucional text-white border-2 border-white shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Estação 2 (Selecionada - Verde Conecta com pulso) */}
      <div
        className="absolute top-[48%] left-[52%] -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 z-10"
        onClick={() => setSelectedStation("2")}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute h-12 w-12 rounded-full bg-brand-conecta/40 animate-pulse" />
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-conecta text-white border-2 border-white shadow-xl ring-4 ring-brand-salvia/40">
            <div className="h-3 w-3 rounded-full bg-white" />
          </div>
        </div>
      </div>

      {/* Estação 3 (Online - Verde Institucional) */}
      <div
        className="absolute top-[28%] left-[68%] -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 z-10"
        onClick={() => setSelectedStation("3")}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-institucional text-white border-2 border-white shadow-md">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>

      {/* Estação 4 (Alerta / Atenção - Vermelha com triângulo de atenção) */}
      <div
        className="absolute top-[64%] left-[66%] -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 z-10"
        onClick={() => setSelectedStation("4")}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute h-9 w-9 rounded-full bg-red-500/30 animate-pulse" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white border-2 border-white shadow-lg">
            <span className="text-xs font-bold leading-none">⚠️</span>
          </div>
        </div>
      </div>

      {/* 3. Botão de Mira / Centralizar GPS no canto inferior direito */}
      <div className="absolute right-4 bottom-32 z-10">
        <button
          type="button"
          onClick={() => alert("Localização da fazenda centralizada")}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-escuro shadow-lg border border-brand-cinza hover:bg-brand-fundo active:scale-95 transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="7" />
            <line x1="12" y1="2" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="2" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
          </svg>
        </button>
      </div>

      {/* 4. Painel Inferior Flutuante com Contadores e Resumo do Talhão */}
      <div className="absolute bottom-4 inset-x-4 z-10 flex flex-col gap-2">
        {/* Card: Estações (Online, Atenção, Offline) */}
        <div className="flex items-center justify-between rounded-2xl bg-white/95 backdrop-blur-md px-4 py-3 shadow-lg border border-white/60">
          <div>
            <p className="font-heading text-xs font-bold text-brand-escuro mb-1">Estações</p>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-brand-escuro">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-conecta" />
                Online
              </span>
              <span className="flex items-center gap-1.5 font-medium text-brand-escuro">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Atenção
              </span>
              <span className="flex items-center gap-1.5 font-medium text-brand-escuro">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                Offline
              </span>
            </div>
          </div>

          <span className="text-brand-medio">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </div>

        {/* Pílula de Resumo do Talhão */}
        <div className="flex items-center justify-between rounded-2xl bg-white/95 backdrop-blur-md px-4 py-3 shadow-lg border border-white/60 cursor-pointer hover:bg-white transition">
          <div className="flex items-center gap-2">
            <span className="text-brand-institucional">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </span>
            <p className="font-heading text-xs font-semibold text-brand-escuro">
              Talhão 1 <span className="text-brand-salvia mx-1">|</span> Umidade: 38%
            </p>
          </div>

          <span className="text-brand-medio">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
