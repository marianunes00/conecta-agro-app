/**
 * CONECTA AGRO — MOTOR DE DETECÇÃO INTELIGENTE DE ANOMALIAS
 * Analisa telemetria em tempo real para identificar vazamentos de água,
 * sensores congelados/defeituosos e falhas operacionais na infraestrutura.
 */

export type AnomalyType =
  | "vazamento"
  | "sensor_congelado"
  | "sensor_outlier"
  | "queda_abrupta"
  | "bateria_critica"
  | "conectividade_offline"
  | "reservatorio_anomalo";

export type AnomalySeverity = "critico" | "atencao" | "info";

export interface AnomalyReport {
  id: string;
  type: AnomalyType;
  severity: AnomalySeverity;
  title: string;
  description: string;
  stationCode?: string;
  stationId?: string;
  detectedAt: string;
  affectedMetric: string;
  currentValue: number | string;
  expectedValue?: string;
  recommendedAction: string;
}

export interface NetworkHealth {
  overallScore: number; // 0 a 100
  status: "excelente" | "estavel" | "atencao" | "critico";
  activeAnomaliesCount: number;
  criticalCount: number;
  leakRiskLevel: "baixo" | "moderado" | "alto";
  sensorReliabilityPct: number;
}

/**
 * Analisa histórico de leituras de sensores para detectar anomalias
 */
export function analyzeSensorAnomalies(
  readings: Array<{
    id?: number;
    station_id: string;
    recorded_at: string;
    soil_moisture_pct?: number | null;
    air_temperature_c?: number | null;
    air_humidity_pct?: number | null;
    atmospheric_pressure_hpa?: number | null;
    water_flow_l?: number | null;
    reservoir_level_pct?: number | null;
    battery_pct?: number | null;
  }>,
  stationCodeMap: Record<string, string> = {},
  isValveOpen: boolean = false
): AnomalyReport[] {
  const anomalies: AnomalyReport[] = [];

  if (!readings || readings.length === 0) {
    return anomalies;
  }

  // Agrupa leituras por estação
  const readingsByStation: Record<string, typeof readings> = {};
  for (const r of readings) {
    if (!readingsByStation[r.station_id]) {
      readingsByStation[r.station_id] = [];
    }
    readingsByStation[r.station_id].push(r);
  }

  for (const [stationId, stationReadings] of Object.entries(readingsByStation)) {
    const code = stationCodeMap[stationId] || "Estação";

    // Ordena da mais recente para a mais antiga
    const sorted = [...stationReadings].sort(
      (a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime()
    );

    const latest = sorted[0];

    // 1. Detecção de Outliers Físicos (Valores fora dos limites termodinâmicos)
    if (latest.soil_moisture_pct != null) {
      if (latest.soil_moisture_pct < 0 || latest.soil_moisture_pct > 100) {
        anomalies.push({
          id: `outlier-soil-${stationId}-${Date.now()}`,
          type: "sensor_outlier",
          severity: "critico",
          title: "Leitura de umidade de solo inválida",
          description: `Sensor registrou ${latest.soil_moisture_pct}%, valor fora dos limites físicos possíveis (0% a 100%).`,
          stationCode: code,
          stationId,
          detectedAt: latest.recorded_at,
          affectedMetric: "Umidade do Solo",
          currentValue: `${latest.soil_moisture_pct}%`,
          expectedValue: "0% a 100%",
          recommendedAction: "Verifique a fiação e a integridade da sonda TDR/capacitiva no talhão.",
        });
      }
    }

    if (latest.air_temperature_c != null) {
      if (latest.air_temperature_c > 60 || latest.air_temperature_c < -10) {
        anomalies.push({
          id: `outlier-temp-${stationId}-${Date.now()}`,
          type: "sensor_outlier",
          severity: "atencao",
          title: "Temperatura do ar anômala",
          description: `Temperatura de ${latest.air_temperature_c}°C indica possível falha no sensor ambiental DHT/SHT.`,
          stationCode: code,
          stationId,
          detectedAt: latest.recorded_at,
          affectedMetric: "Temperatura",
          currentValue: `${latest.air_temperature_c}°C`,
          expectedValue: "-5°C a 50°C",
          recommendedAction: "Inspecione o abrigo meteorológico e limpe o sensor contra poeira e teias.",
        });
      }
    }

    // 2. Detecção de Sensor Congelado (Frozen Reading)
    // Se o sensor reporta EXATAMENTE o mesmo valor de umidade por 4 leituras seguidas
    if (sorted.length >= 4) {
      const moistures = sorted.slice(0, 4).map((r) => r.soil_moisture_pct);
      const allEqual = moistures.every((val) => val != null && val === moistures[0]);
      if (allEqual && moistures[0] != null) {
        anomalies.push({
          id: `frozen-soil-${stationId}-${Date.now()}`,
          type: "sensor_congelado",
          severity: "atencao",
          title: "Possível sensor de solo travado/congelado",
          description: `O sensor manteve o valor idêntico de ${moistures[0]}% inalterado nas últimas 4 medições consecutivas.`,
          stationCode: code,
          stationId,
          detectedAt: latest.recorded_at,
          affectedMetric: "Umidade do Solo",
          currentValue: `${moistures[0]}% estático`,
          recommendedAction: "Reinicie o transmissor ou teste a sensibilidade do sensor adicionando água no ponto de contato.",
        });
      }
    }

    // 3. Detecção de Queda Abrupta Não Física
    if (sorted.length >= 2) {
      const prev = sorted[1];
      if (latest.soil_moisture_pct != null && prev.soil_moisture_pct != null) {
        const delta = prev.soil_moisture_pct - latest.soil_moisture_pct;
        // Queda súbita maior que 35% de umidade em curto intervalo
        if (delta > 35) {
          anomalies.push({
            id: `drop-soil-${stationId}-${Date.now()}`,
            type: "queda_abrupta",
            severity: "critico",
            title: "Queda abrupta de umidade do solo",
            description: `A umidade despencou de ${prev.soil_moisture_pct}% para ${latest.soil_moisture_pct}% (-${delta.toFixed(1)}%). Pode indicar deslocamento do sensor ou cavidade no solo.`,
            stationCode: code,
            stationId,
            detectedAt: latest.recorded_at,
            affectedMetric: "Umidade do Solo",
            currentValue: `Queda de ${delta.toFixed(1)}%`,
            recommendedAction: "Compacte o solo ao redor do sensor ou verifique se animais/trator deslocaram a haste.",
          });
        }
      }
    }

    // 4. Detecção de Bateria Crítica
    if (latest.battery_pct != null && latest.battery_pct < 20) {
      anomalies.push({
        id: `batt-crit-${stationId}-${Date.now()}`,
        type: "bateria_critica",
        severity: "critico",
        title: "Bateria em nível crítico",
        description: `Bateria da estação está em ${latest.battery_pct}%. Risco iminente de interrupção da telemetria.`,
        stationCode: code,
        stationId,
        detectedAt: latest.recorded_at,
        affectedMetric: "Bateria",
        currentValue: `${latest.battery_pct}%`,
        expectedValue: "> 25%",
        recommendedAction: "Limpe a placa solar de poeira ou substitua a célula Li-ion da estação.",
      });
    }

    // 5. Detecção de Vazamento de Água (Fluxo sem válvula aberta ou vazão inesperada)
    if (latest.water_flow_l != null && latest.water_flow_l > 0.5 && !isValveOpen) {
      anomalies.push({
        id: `leak-unmetered-${stationId}-${Date.now()}`,
        type: "vazamento",
        severity: "critico",
        title: "Alerta de vazamento de água detectado",
        description: `O hidrômetro registrou vazão contínua (${latest.water_flow_l} L/min) com as válvulas de irrigação fechadas no sistema.`,
        stationCode: code,
        stationId,
        detectedAt: latest.recorded_at,
        affectedMetric: "Vazão de Água",
        currentValue: `${latest.water_flow_l} L/min`,
        expectedValue: "0 L/min (fechada)",
        recommendedAction: "Feche o registro geral da linha e inspecione conexões e mangueiras gotejadoras.",
      });
    }
  }

  return anomalies;
}

/**
 * Calcula o Índice Geral de Saúde da Infraestrutura Agronômica
 */
export function calculateNetworkHealth(
  stationsCount: number,
  onlineStationsCount: number,
  anomalies: AnomalyReport[]
): NetworkHealth {
  const criticalCount = anomalies.filter((a) => a.severity === "critico").length;
  const atencaoCount = anomalies.filter((a) => a.severity === "atencao").length;

  const onlineRatio = stationsCount > 0 ? onlineStationsCount / stationsCount : 1;
  let score = Math.round(onlineRatio * 60 + 40);

  // Penalidades por anomalias
  score -= criticalCount * 15;
  score -= atencaoCount * 5;
  score = Math.max(10, Math.min(100, score));

  let status: NetworkHealth["status"] = "excelente";
  if (score < 50 || criticalCount >= 2) status = "critico";
  else if (score < 75 || criticalCount === 1) status = "atencao";
  else if (score < 90) status = "estavel";

  const hasLeak = anomalies.some((a) => a.type === "vazamento");
  const leakRiskLevel: NetworkHealth["leakRiskLevel"] = hasLeak
    ? "alto"
    : criticalCount > 0
    ? "moderado"
    : "baixo";

  const sensorReliabilityPct = Math.max(70, Math.min(99, 100 - (anomalies.length * 4)));

  return {
    overallScore: score,
    status,
    activeAnomaliesCount: anomalies.length,
    criticalCount,
    leakRiskLevel,
    sensorReliabilityPct,
  };
}
