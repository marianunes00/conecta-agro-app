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

// Dados do Gráfico de Barras Duplo (Consumo Real vs Meta IA) - Paleta Conecta Agro
const monthlyComparisonData = [
  { month: "JAN", real: 32, ia: 26 },
  { month: "FEV", real: 42, ia: 35 },
  { month: "MAR", real: 28, ia: 22 },
  { month: "ABR", real: 38, ia: 30 },
  { month: "MAI", real: 22, ia: 18 },
  { month: "JUN", real: 48, ia: 36, isPeak: true },
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

// Dados do Gráfico Circular Donut com cores da marca Conecta Agro
const donutData = [
  { name: "Água Otimizada", value: 68, color: "#174807" },
  { name: "Capacidade Restante", value: 32, color: "#8FA787" },
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
    { day: 8, type: "completed" },
    { day: 9, type: "normal" },
    { day: 10, type: "highlight" },
    { day: 11, type: "normal" },
    { day: 12, type: "normal" },
    { day: 13, type: "normal" },
    { day: 14, type: "normal" },
    { day: 15, type: "normal" },
    { day: 16, type: "scheduled" },
    { day: 17, type: "completed" },
    { day: 18, type: "normal" },
    { day: 19, type: "normal" },
    { day: 20, type: "normal" },
    { day: 21, type: "highlight" },
    { day: 22, type: "normal" },
    { day: 23, type: "normal" },
    { day: 24, type: "normal" },
    { day: 25, type: "normal" },
    { day: 26, type: "normal" },
    { day: 27, type: "normal" },
    { day: 28, type: "normal" },
    { day: 29, type: "normal" },
    { day: 30, type: "normal" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F2] flex flex-col justify-center items-center p-2 sm:p-4 lg:p-6 font-sans text-brand-escuro antialiased selection:bg-brand-cinza selection:text-brand-institucional">
      {/* Toast Notification Flutuante */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#123A08] text-white px-5 py-3 rounded-2xl shadow-2xl border border-brand-salvia/40 flex items-center gap-3 animate-slide-down text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-brand-salvia animate-ping" />
          {toastMessage}
        </div>
      )}

      {/* Top Banner de Navegação Rápida entre os Modos Web e Mobile */}
      <div className="w-full max-w-[1440px] mb-3 flex items-center justify-between px-2 text-xs">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-brand-institucional hover:text-brand-escuro font-semibold bg-white px-3 py-1.5 rounded-xl shadow-xs transition-all border border-brand-cinza"
          >
            <span>←</span> Voltar para o Site Oficial
          </Link>
          <span className="text-brand-medio hidden sm:inline">•</span>
          <span className="text-brand-medio hidden sm:inline">
            Modo: <strong className="text-brand-institucional">Web Executive Desktop</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 bg-brand-institucional hover:bg-[#1f5f09] text-white font-heading font-bold px-3 py-1.5 rounded-xl shadow-xs transition-all text-xs"
          >
            <span>📱</span> Abrir Aplicativo Mobile
          </Link>
        </div>
      </div>

      {/* Container Principal do Dashboard no Estilo Conecta Agro */}
      <div className="w-full max-w-[1440px] bg-white rounded-3xl shadow-[0_15px_45px_rgba(23,72,7,0.08)] border border-brand-cinza overflow-hidden flex flex-col lg:flex-row min-h-[760px]">
        {/* ========================================================================= */}
        {/* 1. SIDEBAR LATERAL ESQUERDA (VERDE ESCURO INSTITUCIONAL DA MARCA)          */}
        {/* ========================================================================= */}
        <aside className="w-full lg:w-[260px] bg-[#123A08] text-white flex flex-col justify-between shrink-0 p-6 lg:py-8 lg:px-6 relative overflow-hidden">
          {/* Efeito de brilho de fundo */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-conecta/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Bloco do Avatar e Identificação do Produtor */}
            <div className="flex flex-col items-center text-center pb-6 border-b border-white/10">
              <div className="relative mb-3">
                {/* Glow ring externo */}
                <div className="absolute inset-0 rounded-full bg-brand-conecta/30 blur-sm scale-110" />
                {/* Avatar circular */}
                <div className="relative w-20 h-20 rounded-full bg-[#0c2506] border-2 border-brand-salvia/40 flex items-center justify-center shadow-inner">
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
                  <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-brand-salvia border-2 border-[#123A08] rounded-full" />
                </div>
              </div>

              {/* Nome e Cargo / Fazenda */}
              <h2 className="font-heading text-base font-extrabold uppercase tracking-wider text-white">
                {farmName}
              </h2>
              <p className="font-sans text-[11px] text-brand-cinza/70 truncate max-w-[210px] mt-0.5">
                {userEmail}
              </p>
              <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full bg-brand-institucional border border-brand-conecta text-[10px] text-brand-salvia font-semibold">
                {farmLocation}
              </span>
            </div>

            {/* Menu de Navegação Vertical */}
            <nav className="mt-6 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setActiveMenu("home");
                  showToast("Visão Geral atualizada com telemetria ao vivo");
                }}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeMenu === "home"
                    ? "bg-[#174807] text-white shadow-xs border-l-3 border-brand-salvia"
                    : "text-white/70 hover:text-white hover:bg-white/5"
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
                    ? "bg-[#174807] text-white shadow-xs border-l-3 border-brand-salvia"
                    : "text-white/70 hover:text-white hover:bg-white/5"
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
                    ? "bg-[#174807] text-white shadow-xs border-l-3 border-brand-salvia"
                    : "text-white/70 hover:text-white hover:bg-white/5"
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
                    ? "bg-[#174807] text-white shadow-xs border-l-3 border-brand-salvia"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-sm">🔔</span>
                <span>notification / alertas</span>
              </button>

              <Link
                href="/mapa"
                className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                <span className="text-sm">📍</span>
                <span>location / talhões</span>
              </Link>

              <Link
                href="/gestao"
                className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                <span className="text-sm">📊</span>
                <span>graph / simulador IA</span>
              </Link>
            </nav>
          </div>

          {/* Rodapé da Sidebar com Logotipo Oficial da Marca */}
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
                <p className="font-heading text-xs font-bold text-white leading-tight truncate">
                  Conecta Agro
                </p>
                <p className="text-[10px] text-brand-salvia">Tecnologia no Campo</p>
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
        {/* 2. ÁREA DE CONTEÚDO PRINCIPAL (OFF-WHITE SUAVE COM CARDS DA MARCA)         */}
        {/* ========================================================================= */}
        <main className="flex-1 bg-[#F8FAF7] p-5 sm:p-7 flex flex-col gap-5 overflow-y-auto">
          {/* Top Bar: Título e Menu */}
          <header className="flex items-center justify-between pb-1">
            <div>
              <h1 className="font-heading text-xl sm:text-2xl font-bold text-brand-escuro tracking-tight">
                Painel Executivo
              </h1>
              <p className="font-sans text-xs text-brand-medio mt-0.5 font-medium">
                Monitoramento Agronômico & Prescrição em Tempo Real • FAO-56
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-brand-cinza shadow-xs text-xs font-semibold text-brand-institucional">
                <span className="w-2 h-2 rounded-full bg-brand-conecta animate-pulse" />
                Estação Ativa: <strong>{stations[0]?.code ?? "EST-01"}</strong>
              </div>

              <button
                type="button"
                onClick={() => showToast("Menu rápido aberto")}
                className="w-9 h-9 rounded-xl bg-white border border-brand-cinza text-brand-institucional hover:text-brand-escuro flex items-center justify-center shadow-xs transition-colors"
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
          {/* 3. LINHA DOS 4 CARDS SUPERIORES                                           */}
          {/* ========================================================================= */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: VERDE INSTITUCIONAL DE CONTRASTE */}
            <div className="bg-[#174807] text-white rounded-2xl p-4 sm:p-5 shadow-[0_8px_20px_rgba(23,72,7,0.20)] flex flex-col justify-between relative overflow-hidden group">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-brand-cinza tracking-wide">
                  Economia / Eficiência
                </span>
                <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-white text-xs font-bold shadow-inner">
                  💧
                </div>
              </div>

              <div className="mt-3">
                <p className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  R$ 4.820
                </p>
                <p className="text-[11px] text-brand-salvia font-medium mt-1 flex items-center gap-1">
                  <span>▲</span> 380 mil L poupados neste ciclo
                </p>
              </div>
            </div>

            {/* Card 2: BRANCO COM ÍCONE VERDE CONECTA */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(23,72,7,0.04)] border border-brand-cinza flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-brand-medio">
                  Telemetria / Leituras
                </span>
                <div className="w-7 h-7 rounded-lg bg-brand-cinza/40 text-brand-conecta flex items-center justify-center">
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
                <p className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-escuro">
                  2.434
                </p>
                <p className="text-[11px] text-brand-medio font-medium mt-1">
                  Pontos registrados hoje
                </p>
              </div>
            </div>

            {/* Card 3: BRANCO COM ÍCONE DE HORAS DE BOMBEAMENTO */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(23,72,7,0.04)] border border-brand-cinza flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-brand-medio">
                  Bombeamento Inteligente
                </span>
                <div className="w-7 h-7 rounded-lg bg-brand-cinza/40 text-brand-conecta flex items-center justify-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                </div>
              </div>

              <div className="mt-3">
                <p className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-escuro">
                  1.259h
                </p>
                <p className="text-[11px] text-brand-medio font-medium mt-1">
                  Operação calibrada por IA
                </p>
              </div>
            </div>

            {/* Card 4: BRANCO COM ÍCONE DE SAÚDE HÍDRICA */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(23,72,7,0.04)] border border-brand-cinza flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-brand-medio">
                  Índice de Saúde Hídrica
                </span>
                <div className="w-7 h-7 rounded-lg bg-brand-cinza/40 text-brand-conecta flex items-center justify-center">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
              </div>

              <div className="mt-3">
                <p className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-escuro">
                  8,5
                </p>
                <p className="text-[11px] text-brand-conecta font-semibold mt-1">
                  Conformidade ideal no talhão
                </p>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. LINHA INTERMEDIÁRIA: GRÁFICO DUPLO DE BARRAS + CARD DONUT LATERAL       */}
          {/* ========================================================================= */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* GRÁFICO CENTRAL DE BARRAS DUPLAS (Colspan 2) */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(23,72,7,0.04)] border border-brand-cinza flex flex-col justify-between">
              {/* Header do Card Result */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-heading text-sm font-bold text-brand-escuro">Balanço Hídrico</h3>
                  <p className="text-[11px] text-brand-medio">
                    Consumo Real vs Meta Prescrita pela IA (m³ / ha)
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Legenda Customizada com Cores da Marca Conecta Agro */}
                  <div className="flex items-center gap-3 text-[11px] font-semibold">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#496F3C]" />
                      <span className="text-brand-medio">Meta IA</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-xs bg-[#174807]" />
                      <span className="text-brand-escuro font-bold">Consumo Real</span>
                    </div>
                  </div>

                  {/* Botão de Ação */}
                  <button
                    type="button"
                    onClick={() => showToast("Auditoria completa do balanço hídrico gerada!")}
                    className="px-3 py-1 rounded-lg bg-brand-institucional hover:bg-[#1f5f09] text-white text-[11px] font-heading font-bold shadow-xs transition-colors"
                  >
                    Auditar Balanço
                  </button>
                </div>
              </div>

              {/* Área do Gráfico de Barras com Tag de Destaque Flutuante */}
              <div className="relative w-full h-[180px] sm:h-[200px]">
                {/* Badge flutuante no pico */}
                <div className="absolute top-1 left-[58%] -translate-x-1/2 z-10 bg-[#174807] text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-md pointer-events-none after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#174807]">
                  Pico 48 m³
                </div>

                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyComparisonData}
                    margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                    barGap={4}
                  >
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#738C69", fontSize: 10, fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "#738C69", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 55]}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(23,72,7,0.03)" }}
                      contentStyle={{
                        backgroundColor: "#123A08",
                        borderColor: "#496F3C",
                        borderRadius: "8px",
                        color: "#fff",
                        fontSize: "11px",
                      }}
                    />
                    {/* Barra 1: Verde Conecta (Meta IA) */}
                    <Bar dataKey="ia" fill="#496F3C" radius={[2, 2, 0, 0]} maxBarSize={12} />
                    {/* Barra 2: Verde Institucional (Consumo Real) */}
                    <Bar dataKey="real" fill="#174807" radius={[2, 2, 0, 0]} maxBarSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* CARD LATERAL DIREITO COM GRÁFICO CIRCULAR DONUT */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(23,72,7,0.04)] border border-brand-cinza flex flex-col justify-between items-center text-center">
              <div className="w-full text-left">
                <h3 className="font-heading text-sm font-bold text-brand-escuro">Capacidade Hídrica</h3>
                <p className="text-[11px] text-brand-medio">Retenção no solo atual</p>
              </div>

              {/* Donut Chart */}
              <div className="relative w-36 h-36 flex items-center justify-center my-1">
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
                      <Cell fill="#174807" />
                      <Cell fill="#8FA787" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Texto Central */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="font-heading text-2xl font-extrabold text-brand-escuro">68%</span>
                  <span className="text-[9px] text-brand-medio uppercase font-semibold">
                    Capacidade
                  </span>
                </div>
              </div>

              {/* Lista com Setores */}
              <div className="w-full mt-2 flex flex-col gap-1.5 text-left px-2">
                <div className="flex items-center justify-between text-xs text-neutral-600 font-medium">
                  <span className="truncate">Setor 1 - Pivô Central</span>
                  <span className="text-brand-institucional font-bold">82%</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-600 font-medium">
                  <span className="truncate">Setor 2 - Gotejo Sul</span>
                  <span className="text-brand-institucional font-bold">61%</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-600 font-medium">
                  <span className="truncate">Setor 3 - Microaspersão</span>
                  <span className="text-brand-institucional font-bold">74%</span>
                </div>
              </div>

              {/* Botão Sincronizar */}
              <button
                type="button"
                onClick={() => showToast("Válvulas dos setores sincronizadas!")}
                className="w-full mt-3 py-2 rounded-xl bg-brand-conecta hover:bg-brand-institucional text-white font-heading text-xs font-bold shadow-xs transition-colors"
              >
                Sincronizar Válvulas
              </button>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 5. LINHA INFERIOR: GRÁFICO DE ONDAS SUAVES + MINI CALENDÁRIO               */}
          {/* ========================================================================= */}
          <section className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(23,72,7,0.04)] border border-brand-cinza flex flex-col lg:flex-row gap-6 items-center">
            {/* Gráfico de Ondas Suaves em Tons Verdes da Marca */}
            <div className="flex-1 w-full flex flex-col justify-between">
              <div className="flex items-center gap-4 text-[11px] font-semibold mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#496F3C]" />
                  <span className="text-brand-medio">Umidade do Solo (%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#174807]" />
                  <span className="text-brand-escuro font-bold">Demanda Hídrica (ETc)</span>
                </div>
              </div>

              {/* Área do Gráfico de Ondas */}
              <div className="w-full h-[140px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={waveData}
                    margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorWave1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#496F3C" stopOpacity={0.7} />
                        <stop offset="95%" stopColor="#496F3C" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="colorWave2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#174807" stopOpacity={0.7} />
                        <stop offset="95%" stopColor="#174807" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="time"
                      tick={{ fill: "#738C69", fontSize: 9 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis tick={false} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#123A08",
                        borderColor: "#496F3C",
                        borderRadius: "8px",
                        color: "#fff",
                        fontSize: "11px",
                      }}
                    />
                    {/* Onda 1: Verde Conecta */}
                    <Area
                      type="monotone"
                      dataKey="wave1"
                      stroke="#496F3C"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorWave1)"
                    />
                    {/* Onda 2: Verde Institucional */}
                    <Area
                      type="monotone"
                      dataKey="wave2"
                      stroke="#174807"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorWave2)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Separador vertical */}
            <div className="hidden lg:block w-[1px] h-32 bg-brand-cinza" />

            {/* Mini Calendário Agronômico */}
            <div className="w-full lg:w-[320px] shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading text-xs font-bold text-brand-escuro">
                  Agenda de Irrigação
                </span>
                <span className="text-[11px] text-brand-conecta font-semibold">
                  Mês Corrente
                </span>
              </div>

              {/* Cabeçalho dos dias da semana */}
              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-brand-medio mb-1.5">
                <span>D</span>
                <span>S</span>
                <span>T</span>
                <span>Q</span>
                <span>Q</span>
                <span>S</span>
                <span>S</span>
              </div>

              {/* Grade de dias com estados ativos da paleta Conecta Agro */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold">
                {calendarDays.map((item) => {
                  const isSelected = selectedCalendarDay === item.day;
                  const isHighlight = item.type === "highlight";
                  const isCompleted = item.type === "completed";
                  const isScheduled = item.type === "scheduled";

                  return (
                    <button
                      key={item.day}
                      type="button"
                      onClick={() => {
                        setSelectedCalendarDay(item.day);
                        showToast(`Dia ${item.day}: Irrigação programada de 35 minutos`);
                      }}
                      className={`h-6 rounded-md flex items-center justify-center transition-all ${
                        isHighlight
                          ? "bg-brand-conecta text-white shadow-xs font-bold"
                          : isCompleted
                          ? "bg-brand-institucional text-white font-bold"
                          : isScheduled
                          ? "bg-brand-cinza text-brand-escuro border border-brand-salvia"
                          : isSelected
                          ? "ring-2 ring-brand-institucional text-brand-escuro bg-brand-cinza/60"
                          : "text-brand-medio hover:bg-brand-cinza/30"
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
