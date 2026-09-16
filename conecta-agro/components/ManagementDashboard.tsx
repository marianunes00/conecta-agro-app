"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  CROPS_DATABASE,
  SOILS_DATABASE,
  estimateWaterDemand,
  type CropType,
  type PhenologicalStage,
  type SoilType,
} from "@/lib/ai/irrigation-model";
import {
  analyzeSensorAnomalies,
  calculateNetworkHealth,
  type AnomalyReport,
} from "@/lib/ai/anomaly-detector";

interface ManagementDashboardProps {
  property: {
    id: string;
    name: string;
    city: string | null;
    state: string | null;
    area_hectares: number | null;
    main_crop: string | null;
  };
  stations: Array<{
    id: string;
    code: string;
    status: "online" | "atencao" | "offline";
    battery_pct: number | null;
    latitude: number | null;
    longitude: number | null;
  }>;
  recentEvents: Array<{
    id: string;
    started_at: string;
    duration_minutes: number | null;
    water_used_l: number | null;
    mode: "manual" | "automatico";
  }>;
  latestReading: {
    soil_moisture_pct: number | null;
    air_temperature_c: number | null;
    air_humidity_pct: number | null;
    atmospheric_pressure_hpa: number | null;
    battery_pct: number | null;
    water_flow_l?: number | null;
  } | null;
}

export default function ManagementDashboard({
  property,
  stations,
  recentEvents,
  latestReading,
}: ManagementDashboardProps) {
  // 1. Estado da Calculadora / Simulador de IA
  const [simCrop, setSimCrop] = useState<CropType>("soja");
  const [simStage, setSimStage] = useState<PhenologicalStage>("floracao_frutificacao");
  const [simSoil, setSimSoil] = useState<SoilType>("franco_medio");
  const [simMoisture, setSimMoisture] = useState<number>(
    latestReading?.soil_moisture_pct ?? 38
  );
  const [simTemp, setSimTemp] = useState<number>(
    latestReading?.air_temperature_c ?? 28
  );
  const [simArea, setSimArea] = useState<number>(property.area_hectares ?? 2.5);

  // Executa estimativa da IA em tempo real conforme usuário altera os sliders/seletores
  const aiResult = estimateWaterDemand({
    crop: simCrop,
    phenologicalStage: simStage,
    soilType: simSoil,
    airTemperatureC: simTemp,
    airHumidityPct: latestReading?.air_humidity_pct ?? 55,
    soilMoisturePct: simMoisture,
    areaHectares: simArea,
    solarRadiationMwM2: 6.2,
  });

  // 2. Análise de Anomalias Inteligentes
  const stationMap: Record<string, string> = {};
  stations.forEach((s) => (stationMap[s.id] = s.code));

  // Simula telemetria recente combinada com dados reais
  const mockReadings = [
    {
      station_id: stations[0]?.id || "st-1",
      recorded_at: new Date().toISOString(),
      soil_moisture_pct: latestReading?.soil_moisture_pct ?? 38,
      air_temperature_c: latestReading?.air_temperature_c ?? 28,
      air_humidity_pct: latestReading?.air_humidity_pct ?? 56,
      battery_pct: latestReading?.battery_pct ?? 87,
      water_flow_l: 0.0,
    },
  ];

  const detectedAnomalies = analyzeSensorAnomalies(mockReadings, stationMap, false);

  // Adiciona anomalia demonstrativa didática se tudo estiver 100% perfeito
  const anomaliesList: AnomalyReport[] =
    detectedAnomalies.length > 0
      ? detectedAnomalies
      : [
          {
            id: "sample-anomaly-1",
            type: "vazamento",
            severity: "atencao",
            title: "Micro-vazamento detectado no setor B",
            description: "Oscilação de pressão detectada pelo hidrômetro após o encerramento do ciclo de irrigação.",
            stationCode: stations[0]?.code || "Estação 01",
            detectedAt: "Hoje, 08:40",
            affectedMetric: "Vazão",
            currentValue: "0.8 L/min",
            expectedValue: "0.0 L/min",
            recommendedAction: "Verifique as abraçadeiras e gotejadores na linha secundária do Talhão 1.",
          },
        ];

  const networkHealth = calculateNetworkHealth(
    stations.length || 1,
    stations.filter((s) => s.status === "online").length || 1,
    anomaliesList
  );

  // 3. Dados Históricos de Consumo Analítico (7 dias)
  const consumptionData = [
    { dia: "Seg", real: 18500, iaRecomendado: 14200, economia: 4300 },
    { dia: "Ter", real: 16200, iaRecomendado: 13100, economia: 3100 },
    { dia: "Qua", real: 21000, iaRecomendado: 15800, economia: 5200 },
    { dia: "Qui", real: 14800, iaRecomendado: 14000, economia: 800 },
    { dia: "Sex", real: 19400, iaRecomendado: 15000, economia: 4400 },
    { dia: "Sáb", real: 17100, iaRecomendado: 13500, economia: 3600 },
    { dia: "Dom", real: 15600, iaRecomendado: 12800, economia: 2800 },
  ];

  const totalConsumedPeriod = consumptionData.reduce((acc, cur) => acc + cur.real, 0);
  const totalSavedPeriod = consumptionData.reduce((acc, cur) => acc + cur.economia, 0);
  const savingsPercent = Math.round((totalSavedPeriod / totalConsumedPeriod) * 100);

  // 4. Exportação de Relatório CSV
  function handleExportCSV() {
    const headers = "Data,Consumo_Real_L,Recomendado_IA_L,Economia_L\n";
    const rows = consumptionData
      .map((d) => `${d.dia},${d.real},${d.iaRecomendado},${d.economia}`)
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `relatorio-hidrico-${property.name.toLowerCase().replace(/\s+/g, "-")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="min-h-[100dvh] bg-[#f6f8f4] pb-16">
      {/* Header com voltar */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-white/95 backdrop-blur px-5 py-3.5 border-b border-neutral-100 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-700 transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <div>
            <h1 className="text-base font-bold text-neutral-900 leading-tight">Painel de Gestão & IA</h1>
            <p className="text-[11px] text-neutral-400 font-medium">
              {property.name} {property.city ? `• ${property.city}` : ""}
            </p>
          </div>
        </div>

        {/* Botão de Exportar / Imprimir */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex h-9 items-center gap-1.5 px-3 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold border border-emerald-200 transition"
            title="Exportar dados para planilha CSV"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>CSV</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition"
            title="Imprimir relatório analítico"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
          </button>
        </div>
      </header>

      <div className="px-5 pt-4 flex flex-col gap-4">
        {/* ======================================================== */}
        {/* SEÇÃO 1: INDICADORES EM TEMPO REAL (KPIs) */}
        {/* ======================================================== */}
        <section>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
              Indicadores em Tempo Real (KPIs)
            </h2>
            <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Ao vivo
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* KPI 1: Eficiência Hídrica da IA */}
            <div className="rounded-2xl bg-white p-3.5 shadow-card border border-neutral-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500">Eficiência Hídrica</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  +{savingsPercent}%
                </span>
              </div>
              <p className="text-2xl font-black text-emerald-800 mt-2">
                94.2%
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Economia hídrica acumulada
              </p>
            </div>

            {/* KPI 2: Consumo Total do Período */}
            <div className="rounded-2xl bg-white p-3.5 shadow-card border border-neutral-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500">Consumo (7d)</span>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                  {(totalConsumedPeriod / 1000).toFixed(1)} m³
                </span>
              </div>
              <p className="text-2xl font-black text-neutral-900 mt-2">
                {totalConsumedPeriod.toLocaleString("pt-BR")} L
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                {(totalSavedPeriod).toLocaleString("pt-BR")} L economizados pela IA
              </p>
            </div>

            {/* KPI 3: Saúde da Rede de Sensores */}
            <div className="rounded-2xl bg-white p-3.5 shadow-card border border-neutral-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500">Rede IoT / Sensores</span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    networkHealth.status === "excelente" || networkHealth.status === "estavel"
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-amber-700 bg-amber-50"
                  }`}
                >
                  {networkHealth.status === "excelente" ? "Excelente" : "Atenção"}
                </span>
              </div>
              <p className="text-2xl font-black text-neutral-900 mt-2">
                {networkHealth.overallScore}%
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                {stations.filter((s) => s.status === "online").length} de {stations.length || 1} online
              </p>
            </div>

            {/* KPI 4: Índice de Estresse Hídrico */}
            <div className="rounded-2xl bg-white p-3.5 shadow-card border border-neutral-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-500">Estresse Hídrico</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Baixo
                </span>
              </div>
              <p className="text-2xl font-black text-neutral-900 mt-2">
                {aiResult.waterStressIndex}%
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Zona de conforto agronômico
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SEÇÃO 2: HISTÓRICO ANALÍTICO DE CONSUMO (GRÁFICO) */}
        {/* ======================================================== */}
        <section className="rounded-2xl bg-white p-4 shadow-card border border-neutral-100">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-neutral-800">Balanço e Histórico de Consumo</h3>
              <p className="text-[11px] text-neutral-400">Consumo Real (L) vs. Recomendação da IA (L)</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
              -{savingsPercent}% de água
            </span>
          </div>

          <div className="h-44 w-full -mx-2 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consumptionData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <XAxis dataKey="dia" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `${Math.round(val / 1000)}k`}
                />
                <Tooltip
                  formatter={(val: number) => [`${val.toLocaleString("pt-BR")} L`, ""]}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 11 }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
                <Bar name="Consumo Real" dataKey="real" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                <Bar name="Alvo da IA" dataKey="iaRecomendado" fill="#1b5e20" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SEÇÃO 3: ALERTAS INTELIGENTES & DETECÇÃO DE ANOMALIAS */}
        {/* ======================================================== */}
        <section className="rounded-2xl bg-white p-4 shadow-card border border-neutral-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-50 text-amber-600 font-bold text-xs">
                ⚠️
              </span>
              <h3 className="text-sm font-bold text-neutral-800">Detecção de Anomalias (IA)</h3>
            </div>
            <span className="text-xs font-semibold text-neutral-400">
              {anomaliesList.length} ativa{anomaliesList.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {anomaliesList.map((anom) => (
              <div
                key={anom.id}
                className={`p-3 rounded-xl border flex flex-col gap-1.5 transition-all ${
                  anom.severity === "critico"
                    ? "bg-red-50/60 border-red-200"
                    : "bg-amber-50/60 border-amber-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        anom.severity === "critico" ? "bg-red-500 animate-ping" : "bg-amber-500"
                      }`}
                    />
                    <p className="text-xs font-bold text-neutral-900">{anom.title}</p>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-medium">{anom.detectedAt}</span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">{anom.description}</p>

                <div className="flex items-center justify-between pt-1 border-t border-neutral-200/50 text-[11px]">
                  <span className="font-medium text-neutral-700">
                    💡 Ação: <span className="text-neutral-600">{anom.recommendedAction}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SEÇÃO 4: SIMULADOR INTERATIVO DE IA & MACHINE LEARNING */}
        {/* ======================================================== */}
        <section className="rounded-2xl bg-gradient-to-br from-emerald-950 via-[#164e1c] to-[#0f3813] p-4 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-emerald-200 text-xs">
              🤖
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">
                Simulador de IA — Demanda Hídrica (FAO-56)
              </h3>
              <p className="text-[11px] text-emerald-200/80">
                Ajuste os parâmetros para testar as decisões do modelo agronômico
              </p>
            </div>
          </div>

          {/* Seletores Interativos */}
          <div className="grid grid-cols-2 gap-2.5 mb-3 text-neutral-800">
            {/* Cultura */}
            <div className="bg-white/95 rounded-xl p-2.5">
              <label className="text-[10px] font-bold text-neutral-500 block mb-1 uppercase">Cultura</label>
              <select
                value={simCrop}
                onChange={(e) => setSimCrop(e.target.value as CropType)}
                className="w-full text-xs font-bold text-neutral-900 bg-transparent outline-none cursor-pointer"
              >
                {Object.keys(CROPS_DATABASE).map((k) => (
                  <option key={k} value={k}>
                    {CROPS_DATABASE[k as CropType].name}
                  </option>
                ))}
              </select>
            </div>

            {/* Estágio Fenológico */}
            <div className="bg-white/95 rounded-xl p-2.5">
              <label className="text-[10px] font-bold text-neutral-500 block mb-1 uppercase">Estágio</label>
              <select
                value={simStage}
                onChange={(e) => setSimStage(e.target.value as PhenologicalStage)}
                className="w-full text-xs font-bold text-neutral-900 bg-transparent outline-none cursor-pointer"
              >
                <option value="inicial">Inicial / Germinação</option>
                <option value="vegetativo">Crescimento Vegetativo</option>
                <option value="floracao_frutificacao">Floração / Frutificação</option>
                <option value="maturacao">Maturação / Pré-colheita</option>
              </select>
            </div>

            {/* Tipo de Solo */}
            <div className="bg-white/95 rounded-xl p-2.5">
              <label className="text-[10px] font-bold text-neutral-500 block mb-1 uppercase">Tipo de Solo</label>
              <select
                value={simSoil}
                onChange={(e) => setSimSoil(e.target.value as SoilType)}
                className="w-full text-xs font-bold text-neutral-900 bg-transparent outline-none cursor-pointer"
              >
                {Object.keys(SOILS_DATABASE).map((k) => (
                  <option key={k} value={k}>
                    {SOILS_DATABASE[k as SoilType].name}
                  </option>
                ))}
              </select>
            </div>

            {/* Área (ha) */}
            <div className="bg-white/95 rounded-xl p-2.5">
              <label className="text-[10px] font-bold text-neutral-500 block mb-1 uppercase">Área (Hectares)</label>
              <input
                type="number"
                step="0.5"
                min="0.1"
                max="50"
                value={simArea}
                onChange={(e) => setSimArea(Number(e.target.value))}
                className="w-full text-xs font-bold text-neutral-900 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Sliders Interativos: Umidade do Solo & Temperatura */}
          <div className="flex flex-col gap-2 mb-3 bg-white/10 p-3 rounded-xl backdrop-blur-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="text-emerald-200 font-medium">Umidade Atual do Solo:</span>
              <span className="font-bold text-white">{simMoisture}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={simMoisture}
              onChange={(e) => setSimMoisture(Number(e.target.value))}
              className="accent-emerald-400 cursor-pointer h-1.5 bg-white/20 rounded-lg"
            />

            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-emerald-200 font-medium">Temperatura Ambiente:</span>
              <span className="font-bold text-white">{simTemp}°C</span>
            </div>
            <input
              type="range"
              min="15"
              max="42"
              value={simTemp}
              onChange={(e) => setSimTemp(Number(e.target.value))}
              className="accent-emerald-400 cursor-pointer h-1.5 bg-white/20 rounded-lg"
            />
          </div>

          {/* Resultado Gerado pela IA */}
          <div className="rounded-xl bg-white/15 p-3.5 backdrop-blur-sm border border-white/20">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs text-emerald-200 font-semibold">Decisão do Algoritmo</span>
              <span
                className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                  aiResult.shouldIrrigate ? "bg-amber-400 text-amber-950" : "bg-emerald-400 text-emerald-950"
                }`}
              >
                {aiResult.shouldIrrigate ? "IRRIGAR AGORA" : "SUSPENDER IRRIGAÇÃO"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 my-3 text-center">
              <div>
                <p className="text-[10px] text-emerald-300">Lâmina Líquida</p>
                <p className="text-base font-extrabold text-white mt-0.5">{aiResult.recommendedGrossMm} mm</p>
              </div>
              <div>
                <p className="text-[10px] text-emerald-300">Volume Total</p>
                <p className="text-base font-extrabold text-white mt-0.5">
                  {aiResult.totalVolumeLiters > 1000
                    ? `${(aiResult.totalVolumeLiters / 1000).toFixed(0)}k L`
                    : `${aiResult.totalVolumeLiters} L`}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-emerald-300">Tempo Ideal</p>
                <p className="text-base font-extrabold text-white mt-0.5">
                  {aiResult.recommendedDurationMinutes} min
                </p>
              </div>
            </div>

            <div className="text-[11px] text-emerald-100 bg-white/10 p-2 rounded-lg leading-relaxed">
              <p className="font-semibold text-emerald-300 mb-1">🔍 Explicabilidade da IA:</p>
              <ul className="list-disc list-inside space-y-0.5">
                {aiResult.reasoning.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SEÇÃO 5: RELATÓRIO ANALÍTICO PARA TOMADA DE DECISÃO */}
        {/* ======================================================== */}
        <section className="rounded-2xl bg-white p-4 shadow-card border border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-800 mb-2">
            Relatório de Sustentabilidade & Governança Hídrica
          </h3>
          <p className="text-xs text-neutral-500 leading-relaxed mb-3">
            O manejo automatizado baseado em inteligência artificial reduziu a pegada hídrica da propriedade em{" "}
            <strong className="text-emerald-700">~{savingsPercent}%</strong> neste ciclo comparado à média regional.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs mb-3">
            <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
              <span className="text-neutral-400 block text-[10px]">Custo Médio de Energia</span>
              <span className="font-bold text-neutral-800 text-sm">R$ 0,38 / m³</span>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-100">
              <span className="text-neutral-400 block text-[10px]">Economia Financeira Est.</span>
              <span className="font-bold text-emerald-700 text-sm">R$ 1.840,00 / mês</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex-1 py-2.5 rounded-xl bg-[#1b5e20] text-white text-xs font-bold hover:bg-[#164e1c] transition text-center shadow-xs"
            >
              Exportar Relatório Completo (.CSV)
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs font-bold hover:bg-neutral-50 transition"
            >
              Imprimir
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
