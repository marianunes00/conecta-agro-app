import { createClient } from "@/lib/supabase/server";

/**
 * Retorna a primeira propriedade à qual o usuário logado tem acesso
 * (dono ou membro). Em uma conta nova, retorna null.
 */
export async function getPrimaryProperty() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("properties")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  return data;
}

export async function getProfile() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  return { ...data, email: user.email };
}

export async function getStations(propertyId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("stations")
    .select("*")
    .eq("property_id", propertyId)
    .order("code", { ascending: true });
  return data ?? [];
}

export async function getLatestReading(stationId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("sensor_readings")
    .select("*")
    .eq("station_id", stationId)
    .order("recorded_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}

export async function getReadingsHistory(stationId: string, hours = 24) {
  const supabase = createClient();
  const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
  const { data } = await supabase
    .from("sensor_readings")
    .select("*")
    .eq("station_id", stationId)
    .gte("recorded_at", since)
    .order("recorded_at", { ascending: true });
  return data ?? [];
}

export async function getIrrigationEvents(propertyId: string, limit = 20) {
  const supabase = createClient();
  const { data } = await supabase
    .from("irrigation_events")
    .select("*")
    .eq("property_id", propertyId)
    .order("started_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getAlerts(propertyId: string, limit = 20) {
  const supabase = createClient();
  const { data } = await supabase
    .from("alerts")
    .select("*")
    .eq("property_id", propertyId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getIrrigationSettings(propertyId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("irrigation_settings")
    .select("*")
    .eq("property_id", propertyId)
    .maybeSingle();
  return data;
}

export async function getLatestRecommendation(propertyId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("irrigation_recommendations")
    .select("*")
    .eq("property_id", propertyId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data;
}
