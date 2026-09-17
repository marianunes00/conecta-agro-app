import React from "react";
import Image from "next/image";

interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  showTagline?: boolean;
  orientation?: "horizontal" | "vertical";
  variant?: "dark" | "negative" | "white" | "symbol";
  className?: string;
  useImage?: boolean;
}

export default function ConectaAgroLogo({
  size = "md",
  showText = true,
  showTagline = false,
  orientation = "horizontal",
  variant = "dark",
  className = "",
  useImage = false,
}: LogoProps) {
  const pixelSizes = {
    xs: 28,
    sm: 36,
    md: 48,
    lg: 68,
    xl: 96,
  }[size];

  const titleSizes = {
    xs: "text-sm",
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  }[size];

  const taglineSizes = {
    xs: "text-[8px]",
    sm: "text-[9px]",
    md: "text-[11px]",
    lg: "text-xs",
    xl: "text-sm",
  }[size];

  const isDarkBg = variant === "negative" || variant === "white";

  // Se solicitado apenas o símbolo reduzido (duas folhas da marca)
  if (variant === "symbol") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg
          width={pixelSizes}
          height={pixelSizes}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-xs"
        >
          <path
            d="M 12 30 C 12 30, 16 10, 34 6 C 36 18, 26 28, 12 30 Z"
            fill="#3B7D23"
          />
          <path
            d="M 12 30 C 12 30, 24 20, 36 24 C 34 32, 24 35, 12 30 Z"
            fill="#5BA632"
          />
          <path
            d="M 12 30 Q 22 18, 34 6"
            stroke="#205012"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // Renderização utilizando a imagem oficial PNG de alta resolução quando em fundo claro
  if (useImage && !isDarkBg) {
    return (
      <div
        className={`flex items-center ${
          orientation === "vertical" ? "flex-col text-center" : "flex-row gap-3"
        } ${className}`}
      >
        <div
          className="relative shrink-0"
          style={{ width: pixelSizes, height: pixelSizes }}
        >
          <Image
            src="/conecta-agro-logo.png"
            alt="Conecta Agro Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        {showTagline && (
          <span className={`text-brand-conecta font-medium tracking-wide uppercase ${taglineSizes}`}>
            Tecnologia que cultiva o amanhã
          </span>
        )}
      </div>
    );
  }

  // Cores institucionais do manual
  const constellationStroke = isDarkBg ? "#FFFFFF" : "#496F3C";
  const nodeFill = isDarkBg ? "#FFFFFF" : "#174807";
  const textColor = isDarkBg ? "text-white" : "text-brand-institucional";
  const textSubColor = isDarkBg ? "text-emerald-300" : "text-brand-conecta";
  const taglineColor = isDarkBg ? "text-brand-salvia" : "text-brand-medio";

  return (
    <div
      className={`flex items-center justify-center ${
        orientation === "vertical" ? "flex-col gap-2 text-center" : "gap-3"
      } ${className}`}
    >
      {/* Símbolo: Arco/Globo de nós de tecnologia + Folhas verdes oficiais */}
      <svg
        width={pixelSizes}
        height={pixelSizes}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Arco de conexões e constelação de dados */}
        <g stroke={constellationStroke} strokeWidth="1.2" strokeLinecap="round" opacity={isDarkBg ? 0.85 : 0.8}>
          <line x1="48" y1="12" x2="64" y2="18" />
          <line x1="64" y1="18" x2="76" y2="28" />
          <line x1="48" y1="12" x2="38" y2="22" />
          <line x1="38" y1="22" x2="28" y2="34" />
          <line x1="28" y1="34" x2="20" y2="48" />
          <line x1="20" y1="48" x2="16" y2="62" />
          <line x1="16" y1="62" x2="22" y2="76" />
          <line x1="22" y1="76" x2="34" y2="86" />
          <line x1="34" y1="86" x2="48" y2="90" />
          <line x1="48" y1="90" x2="62" y2="88" />
          <line x1="62" y1="88" x2="74" y2="80" />

          {/* Linhas transversais de malha */}
          <line x1="38" y1="22" x2="50" y2="28" />
          <line x1="50" y1="28" x2="64" y2="18" />
          <line x1="28" y1="34" x2="38" y2="44" />
          <line x1="38" y1="44" x2="50" y2="28" />
          <line x1="20" y1="48" x2="32" y2="58" />
          <line x1="32" y1="58" x2="38" y2="44" />
          <line x1="22" y1="76" x2="38" y2="70" />
          <line x1="38" y1="70" x2="32" y2="58" />
          <line x1="34" y1="86" x2="44" y2="78" />
          <line x1="44" y1="78" x2="38" y2="70" />
          <line x1="48" y1="90" x2="58" y2="78" />
          <line x1="58" y1="78" x2="44" y2="78" />
        </g>

        {/* Nós da rede de tecnologia */}
        <g fill={nodeFill}>
          <circle cx="48" cy="12" r="2.8" />
          <circle cx="64" cy="18" r="2.6" />
          <circle cx="76" cy="28" r="2.4" />
          <circle cx="38" cy="22" r="2.8" />
          <circle cx="50" cy="28" r="2.4" />
          <circle cx="28" cy="34" r="3.2" />
          <circle cx="38" cy="44" r="2.8" />
          <circle cx="20" cy="48" r="3" />
          <circle cx="32" cy="58" r="2.8" />
          <circle cx="16" cy="62" r="3" />
          <circle cx="22" cy="76" r="3" />
          <circle cx="38" cy="70" r="2.6" />
          <circle cx="34" cy="86" r="2.8" />
          <circle cx="44" cy="78" r="2.6" />
          <circle cx="48" cy="90" r="3" />
          <circle cx="58" cy="78" r="2.4" />
          <circle cx="62" cy="88" r="2.6" />
          <circle cx="74" cy="80" r="2.4" />
        </g>

        {/* Folhas orgânicas no canto inferior direito do arco */}
        <g transform="translate(62, 64) scale(0.7)">
          <path
            d="M 4 28 C 4 28, 10 6, 28 2 C 30 14, 20 25, 4 28 Z"
            fill="#3B7D23"
          />
          <path
            d="M 4 28 C 4 28, 16 18, 30 22 C 28 30, 18 33, 4 28 Z"
            fill="#5BA632"
          />
          <path
            d="M 4 28 Q 15 15, 28 2"
            stroke="#174807"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Tipografia da Marca com Poppins */}
      {showText && (
        <div className={`leading-none ${orientation === "vertical" ? "mt-0.5" : ""}`}>
          <div className="font-heading font-extrabold tracking-tight">
            <span className={`${titleSizes} ${textColor}`}>Conecta</span>{" "}
            <span className={`${titleSizes} ${textSubColor}`}>Agro</span>
          </div>
          {showTagline && (
            <p className={`font-sans font-medium tracking-wide uppercase mt-1 ${taglineSizes} ${taglineColor}`}>
              Tecnologia que cultiva o amanhã
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Padrão sutil geométrico de fundo para telas de autenticação e cabeçalhos
 */
export function TechGeometricBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06] ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="network-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="1.8" fill="#174807" />
            <circle cx="42" cy="42" r="1.8" fill="#174807" />
            <line x1="8" y1="8" x2="42" y2="42" stroke="#174807" strokeWidth="0.75" />
            <line x1="8" y1="8" x2="50" y2="8" stroke="#174807" strokeWidth="0.4" strokeDasharray="2 2" />
            <line x1="42" y1="42" x2="8" y2="76" stroke="#174807" strokeWidth="0.4" strokeDasharray="2 2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#network-grid)" />
      </svg>
    </div>
  );
}
