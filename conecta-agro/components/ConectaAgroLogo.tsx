import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  orientation?: "horizontal" | "vertical";
  variant?: "dark" | "light" | "white";
  className?: string;
}

export default function ConectaAgroLogo({
  size = "md",
  showText = true,
  orientation = "horizontal",
  variant = "dark",
  className = "",
}: LogoProps) {
  const iconDimensions = {
    sm: 36,
    md: 48,
    lg: 64,
    xl: 84,
  }[size];

  const textSize = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  }[size];

  const textColor = variant === "white" ? "text-white" : "text-agro-900";
  const subTextColor = variant === "white" ? "text-white/80" : "text-agro-600";

  return (
    <div
      className={`flex items-center justify-center ${
        orientation === "vertical" ? "flex-col gap-2.5 text-center" : "gap-3"
      } ${className}`}
    >
      {/* Ícone: Globo tecnológico de nós conectados com broto de folhas verdes */}
      <svg
        width={iconDimensions}
        height={iconDimensions}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform hover:scale-105 duration-300"
      >
        {/* Círculo do globo tecnológico (linhas de conexão em malha) */}
        <g stroke="#1b7a37" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          {/* Meridianos e paralelos curvos */}
          <ellipse cx="45" cy="50" rx="34" ry="34" strokeDasharray="3 3" opacity="0.4" />
          <path d="M 45 16 C 28 28, 28 72, 45 84" opacity="0.6" />
          <path d="M 45 16 C 62 28, 62 72, 45 84" opacity="0.6" />
          <path d="M 12 50 Q 45 36, 78 50" opacity="0.5" />
          <path d="M 16 32 Q 45 22, 74 32" opacity="0.4" />
          <path d="M 16 68 Q 45 78, 74 68" opacity="0.4" />

          {/* Nós da malha conectados por linhas sólidas */}
          <line x1="24" y1="28" x2="45" y2="20" />
          <line x1="45" y1="20" x2="66" y2="28" />
          <line x1="24" y1="28" x2="18" y2="48" />
          <line x1="66" y1="28" x2="72" y2="48" />
          <line x1="18" y1="48" x2="35" y2="46" />
          <line x1="35" y1="46" x2="55" y2="46" />
          <line x1="55" y1="46" x2="72" y2="48" />
          <line x1="35" y1="46" x2="45" y2="20" />
          <line x1="55" y1="46" x2="66" y2="28" />
          <line x1="18" y1="48" x2="26" y2="72" />
          <line x1="35" y1="46" x2="45" y2="76" />
          <line x1="55" y1="46" x2="64" y2="72" />
          <line x1="26" y1="72" x2="45" y2="76" />
          <line x1="45" y1="76" x2="64" y2="72" />
        </g>

        {/* Círculos / nós da rede tecnológica */}
        <g fill="#2e7d32">
          <circle cx="45" cy="20" r="3.2" />
          <circle cx="24" cy="28" r="2.8" />
          <circle cx="66" cy="28" r="2.8" />
          <circle cx="18" cy="48" r="3" />
          <circle cx="35" cy="46" r="3.2" />
          <circle cx="55" cy="46" r="3.2" />
          <circle cx="72" cy="48" r="2.8" />
          <circle cx="26" cy="72" r="2.8" />
          <circle cx="45" cy="76" r="3.2" />
          <circle cx="64" cy="72" r="2.8" />
        </g>

        {/* Folhas orgânicas e broto lateral direito (identidade Conecta Agro) */}
        <path
          d="M 60 52 C 60 52, 74 38, 88 44 C 92 46, 94 54, 86 60 C 76 66, 62 58, 60 52 Z"
          fill="url(#leafGradient1)"
        />
        <path
          d="M 68 60 C 68 60, 80 54, 90 62 C 93 65, 92 73, 84 76 C 74 80, 68 68, 68 60 Z"
          fill="url(#leafGradient2)"
        />
        <path
          d="M 60 52 Q 74 46, 88 44"
          stroke="#165324"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 68 60 Q 78 63, 86 70"
          stroke="#165324"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        <defs>
          <linearGradient id="leafGradient1" x1="60" y1="44" x2="90" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2e7d32" />
            <stop offset="100%" stopColor="#4caf50" />
          </linearGradient>
          <linearGradient id="leafGradient2" x1="68" y1="56" x2="90" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1b5e20" />
            <stop offset="100%" stopColor="#388e3c" />
          </linearGradient>
        </defs>
      </svg>

      {/* Tipografia da Marca */}
      {showText && (
        <div className={`leading-tight ${orientation === "vertical" ? "mt-1" : ""}`}>
          <div className={`font-bold tracking-tight ${textSize} ${textColor}`}>
            Conecta
          </div>
          <div className={`font-black tracking-normal ${textSize} text-agro-600 -mt-1`}>
            Agro
          </div>
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
    <div className={`pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07] ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="network-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="#1b5e20" />
            <circle cx="50" cy="50" r="2" fill="#1b5e20" />
            <line x1="10" y1="10" x2="50" y2="50" stroke="#1b5e20" strokeWidth="0.8" />
            <line x1="10" y1="10" x2="60" y2="10" stroke="#1b5e20" strokeWidth="0.5" strokeDasharray="2 2" />
            <line x1="50" y1="50" x2="10" y2="90" stroke="#1b5e20" strokeWidth="0.5" strokeDasharray="2 2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#network-grid)" />
      </svg>
    </div>
  );
}
