import { NextRequest, NextResponse } from "next/server";
import {
  estimateWaterDemand,
  CROPS_DATABASE,
  SOILS_DATABASE,
  type CropType,
  type PhenologicalStage,
  type SoilType,
} from "@/lib/ai/irrigation-model";

/**
 * GET /api/ai/estimate
 * Documentação e lista de culturas e solos suportados pela IA.
 */
export async function GET() {
  return NextResponse.json({
    service: "Conecta Agro — Motor de Inteligência Artificial para Demanda Hídrica (FAO-56)",
    description: "Estima a lâmina de água necessária (mm e Litros) e tempo de válvula baseado em cultura, solo e clima.",
    supported_crops: Object.keys(CROPS_DATABASE).map((k) => ({
      key: k,
      name: CROPS_DATABASE[k as CropType].name,
      description: CROPS_DATABASE[k as CropType].description,
    })),
    supported_soils: Object.keys(SOILS_DATABASE).map((k) => ({
      key: k,
      name: SOILS_DATABASE[k as SoilType].name,
      water_retention_pct: SOILS_DATABASE[k as SoilType].availableWaterPct,
    })),
    supported_stages: [
      { key: "inicial", label: "Inicial / Germinação" },
      { key: "vegetativo", label: "Desenvolvimento Vegetativo" },
      { key: "floracao_frutificacao", label: "Floração e Frutificação" },
      { key: "maturacao", label: "Maturação e Pré-colheita" },
    ],
    sample_request: {
      crop: "soja",
      phenological_stage: "floracao_frutificacao",
      soil_type: "franco_medio",
      air_temperature_c: 28.5,
      air_humidity_pct: 55.0,
      soil_moisture_pct: 38.0,
      area_hectares: 2.5,
    },
  });
}

/**
 * POST /api/ai/estimate
 * Executa o cálculo da IA agronômica com Machine Learning e FAO-56.
 */
export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Corpo da requisição deve ser um JSON válido." },
        { status: 400 }
      );
    }

    const crop = (body.crop || "soja").toLowerCase() as CropType;
    const phenologicalStage = (body.phenological_stage || "vegetativo") as PhenologicalStage;
    const soilType = (body.soil_type || "franco_medio") as SoilType;

    const airTemperatureC = Number(body.air_temperature_c ?? 28);
    const airHumidityPct = Number(body.air_humidity_pct ?? 60);
    const soilMoisturePct = Number(body.soil_moisture_pct ?? 40);
    const areaHectares = Number(body.area_hectares ?? 1.0);
    const solarRadiationMwM2 = body.solar_radiation != null ? Number(body.solar_radiation) : 6.0;
    const recentIrrigationMm = body.recent_irrigation_mm != null ? Number(body.recent_irrigation_mm) : 0;

    const result = estimateWaterDemand({
      crop,
      phenologicalStage,
      soilType,
      airTemperatureC,
      airHumidityPct,
      soilMoisturePct,
      solarRadiationMwM2,
      areaHectares,
      recentIrrigationMm,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erro ao processar estimativa da IA", detail: err?.message || String(err) },
      { status: 500 }
    );
  }
}
