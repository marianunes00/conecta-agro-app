import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/database";

/**
 * GET /api/ingest
 * Rota informativa/health-check para verificar se a API está pronta e ver o formato esperado.
 */
export async function GET() {
  return NextResponse.json({
    status: "online",
    message: "Endpoint de ingestão de dados IoT (Conecta Agro)",
    description: "Envie requisições POST com Content-Type: application/json contendo os dados dos sensores.",
    expected_payload: {
      station_id: "03b777d4-0182-455d-8fc9-ebfa14a621e3",
      soil_moisture_pct: 65.5,
      air_temperature_c: 28.2,
      air_humidity_pct: 60.0,
      atmospheric_pressure_hpa: 1013.2,
      uv_index: 5.1,
      battery_pct: 90.0,
      water_flow_l: 0.0,
      reservoir_level_pct: 85.0,
    },
    curl_example: `curl -X POST http://localhost:3000/api/ingest -H "Content-Type: application/json" -d "{\\"station_id\\":\\"03b777d4-0182-455d-8fc9-ebfa14a621e3\\",\\"soil_moisture_pct\\":65.5,\\"air_temperature_c\\":28.2,\\"battery_pct\\":90.0}"`,
  });
}

/**
 * POST /api/ingest
 * Recebe medições de sensores de microcontroladores (ESP32) ou ferramentas de teste (Postman/cURL).
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Validação opcional de chave de API (caso configurada no .env)
    const expectedApiKey = process.env.INGEST_API_KEY;
    if (expectedApiKey) {
      const authHeader =
        req.headers.get("x-api-key") ||
        req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
      const queryKey = req.nextUrl.searchParams.get("api_key");

      if (authHeader !== expectedApiKey && queryKey !== expectedApiKey) {
        return NextResponse.json(
          { error: "Não autorizado: Chave de API inválida (envie no header 'x-api-key')." },
          { status: 401 }
        );
      }
    }

    // 2. Leitura do JSON do corpo da requisição
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Corpo da requisição inválido. Certifique-se de enviar um JSON válido." },
        { status: 400 }
      );
    }

    // 3. Validação do station_id
    const stationId = body.station_id;
    if (!stationId || typeof stationId !== "string") {
      return NextResponse.json(
        { error: "O campo 'station_id' (UUID da estação) é obrigatório." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 4. Verifica se a estação existe
    const { data: station, error: stationErr } = await supabase
      .from("stations")
      .select("id, code, property_id")
      .eq("id", stationId)
      .maybeSingle();

    if (stationErr) {
      if (stationErr.code === "42501") {
        return NextResponse.json(
          {
            error: "Erro de permissão no Supabase (RLS).",
            detail:
              "Configure a variável SUPABASE_SERVICE_ROLE_KEY no seu arquivo .env.local (ou Vercel) com a chave service_role do Supabase.",
          },
          { status: 403 }
        );
      }
      return NextResponse.json(
        { error: "Erro ao consultar a estação", detail: stationErr.message },
        { status: 500 }
      );
    }

    if (!station) {
      return NextResponse.json(
        {
          error: `Estação com id '${stationId}' não encontrada.`,
          hint: "Verifique se você cadastrou esta estação no painel do aplicativo (Configurações > Dispositivos).",
        },
        { status: 404 }
      );
    }

    // 5. Prepara os dados da leitura dos sensores
    const readingPayload = {
      station_id: stationId,
      recorded_at: body.recorded_at || new Date().toISOString(),
      soil_moisture_pct: body.soil_moisture_pct != null ? Number(body.soil_moisture_pct) : null,
      air_temperature_c: body.air_temperature_c != null ? Number(body.air_temperature_c) : null,
      air_humidity_pct: body.air_humidity_pct != null ? Number(body.air_humidity_pct) : null,
      atmospheric_pressure_hpa:
        body.atmospheric_pressure_hpa != null ? Number(body.atmospheric_pressure_hpa) : null,
      uv_index: body.uv_index != null ? Number(body.uv_index) : null,
      water_flow_l: body.water_flow_l != null ? Number(body.water_flow_l) : null,
      reservoir_level_pct:
        body.reservoir_level_pct != null ? Number(body.reservoir_level_pct) : null,
      battery_pct: body.battery_pct != null ? Number(body.battery_pct) : null,
    };

    // 6. Insere na tabela sensor_readings
    const { data: reading, error: readingErr } = await supabase
      .from("sensor_readings")
      .insert(readingPayload)
      .select()
      .single();

    if (readingErr) {
      if (readingErr.code === "42501") {
        return NextResponse.json(
          {
            error: "Erro de permissão RLS ao inserir dados do sensor.",
            detail:
              "Para chamadas externas/IoT, certifique-se de preencher a variável SUPABASE_SERVICE_ROLE_KEY no seu .env.local.",
          },
          { status: 403 }
        );
      }
      return NextResponse.json(
        { error: "Falha ao gravar medição de sensores", detail: readingErr.message },
        { status: 500 }
      );
    }

    // 7. Atualiza status da estação para online, last_seen_at e nível da bateria
    const stationUpdates: Database["public"]["Tables"]["stations"]["Update"] = {
      status: "online",
      last_seen_at: new Date().toISOString(),
      ...(body.battery_pct != null ? { battery_pct: Number(body.battery_pct) } : {}),
    };

    await supabase.from("stations").update(stationUpdates).eq("id", stationId);

    return NextResponse.json(
      {
        success: true,
        message: "Dados de sensores recebidos e registrados com sucesso!",
        station: {
          id: station.id,
          code: station.code,
          status: "online",
        },
        reading,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: "Erro interno no servidor ao processar ingestão de dados.",
        detail: err?.message || String(err),
      },
      { status: 500 }
    );
  }
}
