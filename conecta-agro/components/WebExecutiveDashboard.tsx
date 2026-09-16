"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface WebExecutiveDashboardProps {
  property?: {
    id: string;
    name: string;
    city: string | null;
    state: string | null;
    area_hectares: number | null;
    main_crop: string | null;
  } | null;
  stations?: Array<{
    id: string;
    code: string;
    status: "online" | "atencao" | "offline";
    battery_pct: number | null;
  }>;
  userName?: string;
  userEmail?: string;
}

// Dados do Gráfico de Barras Duplo (Consumo Real vs Meta IA) - Idêntico ao design de referência
const monthlyComparisonData = [
  { month: "JAN", real: 32, ia: 26 },
  { month: "FEV", real: 42, ia: 35 },
  { month: "MAR", real: 28, ia: 22 },
  { month: "ABR", real: 38, ia: 30 },
  { month: "MAI", real: 22, ia: 18 },
  { month: "JUN", real: 48, ia: 36, isPeak: true }, // Pico de destaque
  { month: "JUL", real: 34, ia: 28 },
  { month: "AGO", real: 29, ia: 25 },
  { month: "SET", real: 36, ia: 30 },
];

// Dados da Curva de Ondas Suaves (Spline Area)
const waveData = [
  { time: "00:00", wave1: 30, wave2: 18 },
  { time: "03:00", wave1: 45, wave2: 24 },
  { time: "06:00", wave1: 65, wave2: 38 },
  { time: "09:00", wave1: 52, wave2: 62 },
  { time: "12:00", wave1: 85, wave2: 78 },
  { time: "15:00", wave1: 68, wave2: 92 },
  { time: "18:00", wave1: 42, wave2: 60 },
  { time: "21:00", wave1: 32, wave2: 35 },
  { time: "23:59", wave1: 28, wave2: 20 },
];

// Dados do Gráfico Circular Donut
const donutData = [
  { name: "Água Retida", value: 68, color: "#1b2a47" },
  { name: "Déficit Hídrico", value: 32, color: "#f59e0b" },
];

export default function WebExecutiveDashboard({
  property,
  stations = [],
  userName = "João da Silva",
  userEmail = "joao.silva@conectaagro.com.br",
}: WebExecutiveDashboardProps) {
  const [activeMenu, setActiveMenu] = useState("home");
  const [activeTabYear, setActiveTabYear] = useState<"2023" | "2024">("2024");
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(17);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const farmName = property?.name ?? "Fazenda Santa Fé";
  const farmLocation = property?.city
    ? `${property.city}${property.state ? " - " + property.state : ""}`
    : "Salgueiro - PE";

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }

  // Mini calendário: Dias do mês atual
  const calendarDays = [
    { day: 1, type: "normal" },
    { day: 2, type: "normal" },
    { day: 3, type: "normal" },
    { day: 4, type: "normal" },
    { day: 5, type: "normal" },
    { day: 6, type: "normal" },
    { day: 7, type: "normal" },
    { day: 8, type: "normal" },
    { day: 9, type: "normal" },
    { day: 10, type: "normal" },
    { day: 11, type: "normal" },
    { day: 12, type: "completed" }, // Irrigação executada (azul escuro)
    { day: 13, type: "normal" },
    { day: 14, type: "normal" },
    { day: 15, type: "normal" },
    { day: 16, type: "alert" },
    { day: 17, type: "highlight" }, // Irrigação IA programada hoje (laranja)
    { day: 18, type: "normal" },
    { day: 19, type: "normal" },
    { day: 20, type: "normal" },
    { day: 21, type: "normal" },
    { day: 22, type: "normal" },
    { day: 23, type: "scheduled" },
    { day: 24, type: "normal" },
    { day: 25, type: "normal" },
    { day: 26, type: "normal" },
    { day: 27, type: "normal" },
    { day: 28, type: "normal" },
    { day: 29, type: "normal" },
    { day: 30, type: "normal" },
  ];

  return (
    <div className="min-h-screen bg-[#eaedf2] flex flex-col justify-center items-center p-2 sm:p-4 lg:p-6 font-sans text-neutral-800 antialiased selection:bg-amber-400 selection:text-neutral-900">
      {/* Toast Notification Flutuante */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#16233b] text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center gap-3 animate-slide-down text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          {toastMessage}
        </div>
      )}

      {/* Top Banner de Navegação Rápida entre os Modos Web e Mobile */}
      <div className="w-full max-w-[1440px] mb-3 flex items-center justify-between px-2 text-xs">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900 font-semibold bg-white/80 hover:bg-white px-3 py-1.5 rounded-xl shadow-xs transition-all border border-neutral-200"
          >
            <span>←</span> Voltar para o Site Oficial
          </Link>
          <span className="text-neutral-400 hidden sm:inline">•</span>
          <span className="text-neutral-500 hidden sm:inline">
            Modo: <strong className="text-neutral-800">Web Executive Desktop</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-xl shadow-xs transition-all text-xs"
          >
            <span>📱</span> Abrir Aplicativo Mobile
          </Link>
        </div>
      </div>

      {/* Container Principal do Dashboard no Estilo Exato da Imagem */}
      <div className="w-full max-w-[1440px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.12)] border border-neutral-200/80 overflow-hidden flex flex-col lg:flex-row min-h-[760px]">
        {/* ========================================================================= */}
        {/* 1. SIDEBAR LATERAL ESQUERDA (DARK NAVY / AGRO NOVO)                        */}
        {/* ========================================================================= */}
        <aside className="w-full lg:w-[260px] bg-[#16233b] text-white flex flex-col justify-between shrink-0 p-6 lg:py-8 lg:px-6 relative overflow-hidden">
          {/* Efeito de brilho de fundo */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Bloco do Avatar e Identificação do Produtor (Idêntico ao da imagem) */}
            <div className="flex flex-col items-center text-center pb-6 border-b border-white/10">
              <div className="relative mb-3">
                {/* Glow ring externo */}
                <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-sm scale-110" />
                {/* Avatar circular idêntico ao modelo */}
                <div className="relative w-20 h-20 rounded-full bg-[#0e1726] border-2 border-sky-400/40 flex items-center justify-center shadow-inner">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white/90"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  {/* Ponto indicador de status online */}
                  <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#16233b] rounded-full" />
                </div>
              </div>

              {/* Nome e Cargo / Fazenda */}
              <h2 className="text-base font-extrabold uppercase tracking-wider text-white">
                {farmName}
              </h2>
              <p className="text-[11px] text-white/50 truncate max-w-[210px] mt-0.5">
                {userEmail}
              </p>
              <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/20 text-[10px] text-sky-300 font-semibold">
                {farmLocation}
              </span>
            </div>

            {/* Menu de Navegação Vertical (Com ícones idênticos ao layout da imagem) */}
            <nav className="mt-6 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setActiveMenu("home");
                  showToast("Visão Geral atualizada com telemetria ao vivo");
                }}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeMenu === "home"
                    ? "bg-white/10 text-white shadow-xs border-l-3 border-amber-400"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-sm">🏠</span>
                <span>home / visão geral</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMenu("file");
                  showToast("Relatórios agronômicos e balanço hídrico carregados");
                }}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeMenu === "file"
                    ? "bg-white/10 text-white shadow-xs border-l-3 border-amber-400"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-sm">📁</span>
                <span>file / balanço hídrico</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMenu("messages");
                  showToast("Canal de telemetria LoRaWAN e suporte ativo");
                }}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeMenu === "messages"
                    ? "bg-white/10 text-white shadow-xs border-l-3 border-amber-400"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-sm">✉️</span>
                <span>messages / telemetria</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMenu("notification");
                  showToast("0 incidentes críticos. Sistema 100% calibrado.");
                }}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeMenu === "notification"
                    ? "bg-white/10 text-white shadow-xs border-l-3 border-amber-400"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-sm">🔔</span>
                <span>notification / alertas</span>
              </button>

              <Link
                href="/mapa"
                className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                <span className="text-sm">📍</span>
                <span>location / talhões</span>
              </Link>

              <Link
                href="/gestao"
                className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                <span className="text-sm">📊</span>
                <span>graph / simulador IA</span>
              </Link>
            </nav>
          </div>

          {/* Rodapé da Sidebar com Logotipo Oficial e Ação */}
          <div className="pt-6 border-t border-white/10 mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-2.5 bg-black/20 p-2.5 rounded-xl border border-white/5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white shrink-0 p-0.5">
                <Image
                  src="/conecta-agro-logo.png"
                  alt="Conecta Agro Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white leading-tight truncate">
                  Conecta Agro
                </p>
                <p className="text-[10px] text-emerald-300">Inteligência Hídrica</p>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="w-full text-center py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-[11px] font-semibold text-white transition-colors"
            >
              📱 Abrir no Celular (App)
            </Link>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* 2. ÁREA DE CONTEÚDO PRINCIPAL (OFF-WHITE COM SHADOWS SUAVES)               */}
        {/* ========================================================================= */}
        <main className="flex-1 bg-[#f4f6fa] p-5 sm:p-7 flex flex-col gap-5 overflow-y-auto">
          {/* Top Bar: Título e Menu */}
          <header className="flex items-center justify-between pb-1">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-800 tracking-tight">
                Dashboard User
              </h1>
              <p className="text-xs text-neutral-400 mt-0.5 font-medium">
                Monitoramento Agronômico & Prescrição em Tempo Real • FAO-56
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-neutral-200/80 shadow-xs text-xs font-semibold text-neutral-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Estação Ativa: <strong>{stations[0]?.code ?? "EST-01"}</strong>
              </div>

              <button
                type="button"
                onClick={() => showToast("Menu rápido aberto")}
                className="w-9 h-9 rounded-xl bg-white border border-neutral-200/80 text-neutral-600 hover:text-neutral-900 flex items-center justify-center shadow-xs transition-colors"
                aria-label="Opções"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              </button>
            </div>
          </header>

          {/* ========================================================================= */}
          {/* 3. LINHA DOS 4 CARDS SUPERIORES (1 CARD ESCURO + 3 BRANCOS COM ÍCONES)   */}
          {/* ========================================================================= */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: ESCURO DE CONTRASTE (Idêntico ao card Earning $628) */}
            <div className="bg-[#16233b] text-white rounded-2xl p-4 sm:p-5 shadow-[0_8px_20px_rgba(22,35,59,0.22)] flex flex-col justify-between relative overflow-hidden group">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-white/70 tracking-wide">
                  Earning / Economia
                </span>
                {/* Ícone de moeda/água no canto superior direito */}
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold shadow-inner">
                  $
                </div>
              </div>

              <div className="mt-3">
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  R$ 4.820
                </p>
                <p className="text-[11px] text-emerald-300 font-medium mt-1 flex items-center gap-1">
                  <span>▲</span> 380 mil L poupados neste ciclo
                </p>
              </div>
            </div>

            {/* Card 2: BRANCO COM ÍCONE DE COMPARTILHAMENTO / GOTA LARANJA */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-neutral-400">
                  Share / Umidade
                </span>
                {/* Ícone Laranja idêntico ao modelo */}
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-800">
                  2434
                </p>
                <p className="text-[11px] text-neutral-400 font-medium mt-1">
                  Leituras de telemetria hoje
                </p>
              </div>
            </div>

            {/* Card 3: BRANCO COM ÍCONE THUMBS UP / EFICIÊNCIA */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-neutral-400">
                  Likes / Eficiência
                </span>
                {/* Ícone Laranja Thumb */}
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-800">
                  1259
                </p>
                <p className="text-[11px] text-neutral-400 font-medium mt-1">
                  Horas de bombeamento inteligente
                </p>
              </div>
            </div>

            {/* Card 4: BRANCO COM ÍCONE DE ESTRELA / RATING DA LAVOURA */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-neutral-400">
                  Rating / Saúde
                </span>
                {/* Ícone Estrela Laranja */}
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-800">
                  8,5
                </p>
                <p className="text-[11px] text-emerald-600 font-medium mt-1">
                  Índice de conformidade ótimo
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. LINHA INTERMEDIÁRIA: GRÁFICO DUPLO DE BARRAS + CARD DONUT LATERAL       */}
          {/* ========================================================================= */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* GRÁFICO CENTRAL DE BARRAS DUPLAS (Colspan 2) - Idêntico ao 'Result' */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col justify-between">
              {/* Header do Card Result */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-neutral-700">Result</h3>
                  <p className="text-[11px] text-neutral-400">
                    Consumo Real vs Estimativa IA (m³ / ha)
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Legenda Customizada com Quadrados Laranja e Azul Escuro */}
                  <div className="flex items-center gap-3 text-[11px] font-semibold">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b]" />
                      <span className="text-neutral-500">2019 / IA</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#16233b]" />
                      <span className="text-neutral-700">2020 / Real</span>
                    </div>
                  </div>

                  {/* Botão Check Now Laranja idêntico ao modelo */}
                  <button
                    type="button"
                    onClick={() => showToast("Auditoria completa do balanço hídrico gerada!")}
                    className="px-3 py-1 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-white text-[11px] font-bold shadow-xs transition-colors"
                  >
                    Check Now
                  </button>
                </div>
              </div>

              {/* Área do Gráfico de Barras com Tag de Destaque Flutuante */}
              <div className="relative w-full h-[180px] sm:h-[200px]">
                {/* Badge flutuante 26.79 no topo da barra mais alta (idêntico à referência) */}
                <div className="absolute top-1 left-[58%] -translate-x-1/2 z-10 bg-[#16233b] text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-md pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#16233b]">
                  26.79
                </div>

                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyComparisonData}
                    margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                    barGap={4}
                  >
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#9ca3af", fontSize: 10, fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#9ca3af", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 55]}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(0,0,0,0.02)" }}
                      contentStyle={{
                        backgroundColor: "#16233b",
                        borderColor: "#16233b",
                        borderRadius: "8px",
                        color: "#fff",
                        fontSize: "11px",
                      }}
                    />
                    {/* Barra 1: Laranja (Meta IA / Ano Base) */}
                    <Bar dataKey="ia" fill="#f59e0b" radius={[2, 2, 0, 0]} maxBarSize={12} />
                    {/* Barra 2: Azul Marinho Escuro (Consumo Real) */}
                    <Bar dataKey="real" fill="#16233b" radius={[2, 2, 0, 0]} maxBarSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* CARD LATERAL DIREITO COM GRÁFICO CIRCULAR DONUT (Colspan 1) */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col justify-between items-center text-center">
              {/* Donut Chart com 45% / 68% no centro */}
              <div className="relative w-36 h-36 flex items-center justify-center mt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={60}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={0}
                      dataKey="value"
                    >
                      <Cell fill="#16233b" />
                      <Cell fill="#f59e0b" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Texto Central com Porcentagem Grande */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-extrabold text-neutral-800">45%</span>
                  <span className="text-[9px] text-neutral-400 uppercase font-semibold">
                    Disponível
                  </span>
                </div>
              </div>

              {/* Lista com Marcadores e Textos (Lorem Ipsum / Setores) */}
              <div className="w-full mt-3 flex flex-col gap-1.5 text-left px-2">
                <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
                  <span className="truncate">Setor 1 - Pivô Central</span>
                  <span className="text-neutral-800 font-bold">82%</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
                  <span className="truncate">Setor 2 - Gotejo Sul</span>
                  <span className="text-neutral-800 font-bold">61%</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
                  <span className="truncate">Setor 3 - Microaspersão</span>
                  <span className="text-neutral-800 font-bold">74%</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
                  <span className="truncate">Setor 4 - Pomar</span>
                  <span className="text-neutral-800 font-bold">39%</span>
                </div>
              </div>

              {/* Botão Check Now Inferior Laranja */}
              <button
                type="button"
                onClick={() => showToast("Válvulas dos setores sincronizadas!")}
                className="w-full mt-4 py-2 rounded-xl bg-[#f59e0b] hover:bg-[#d97706] text-white text-xs font-bold shadow-xs transition-colors"
              >
                Check Now
              </button>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 5. LINHA INFERIOR: GRÁFICO DE ONDAS SUAVES (SPLINE) + MINI CALENDÁRIO      */}
          {/* ========================================================================= */}
          <section className="bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col lg:flex-row gap-6 items-center">
            {/* Gráfico de Ondas Suaves em Tons Amarelo/Laranja e Azul */}
            <div className="flex-1 w-full flex flex-col justify-between">
              {/* Legenda simples idêntica ao modelo */}
              <div className="flex items-center gap-4 text-[11px] font-semibold mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                  <span className="text-neutral-500">Umidade do Solo (%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16233b]" />
                  <span className="text-neutral-700">Evapotranspiração (ETc)</span>
                </div>
              </div>

              {/* Área do Gráfico de Ondas Fluidas */}
              <div className="w-full h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={waveData}
                    margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorWave1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorWave2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16233b" stopOpacity={0.7} />
                        <stop offset="95%" stopColor="#16233b" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="time"
                      tick={{ fill: "#9ca3af", fontSize: 9 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis tick={false} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#16233b",
                        borderColor: "#16233b",
                        borderRadius: "8px",
                        color: "#fff",
                        fontSize: "11px",
                      }}
                    />
                    {/* Onda 1: Laranja/Amarela Suave */}
                    <Area
                      type="monotone"
                      dataKey="wave1"
                      stroke="#f59e0b"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorWave1)"
                    />
                    {/* Onda 2: Azul Escuro Suave */}
                    <Area
                      type="monotone"
                      dataKey="wave2"
                      stroke="#16233b"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorWave2)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Separador vertical sutil em telas grandes */}
            <div className="hidden lg:block w-[1px] h-32 bg-neutral-100" />

            {/* Mini Calendário Agronômico (Idêntico aos dias e grid da imagem) */}
            <div className="w-full lg:w-[320px] shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-neutral-700">
                  Agenda de Irrigação
                </span>
                <span className="text-[11px] text-amber-600 font-semibold">
                  Setembro 2026
                </span>
              </div>

              {/* Cabeçalho dos dias da semana (S M T W T F S) */}
              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-neutral-400 mb-1.5">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
              </div>

              {/* Grade de 30 dias com estados ativos (laranja e azul) */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold">
                {calendarDays.map((item) => {
                  const isSelected = selectedCalendarDay === item.day;
                  const isHighlight = item.type === "highlight"; // Quadrado Laranja
                  const isCompleted = item.type === "completed"; // Quadrado Azul Marinho
                  const isScheduled = item.type === "scheduled";

                  return (
                    <button
                      key={item.day}
                      type="button"
                      onClick={() => {
                        setSelectedCalendarDay(item.day);
                        showToast(`Dia ${item.day}: Irrigação programada em 35 minutos`);
                      }}
                      className={`h-6 rounded-md flex items-center justify-center transition-all ${
                        isHighlight
                          ? "bg-[#f59e0b] text-white shadow-xs font-bold"
                          : isCompleted
                          ? "bg-[#16233b] text-white font-bold"
                          : isScheduled
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : isSelected
                          ? "ring-2 ring-neutral-400 text-neutral-900 bg-neutral-100"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      {item.day}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
