import { getPrimaryProperty, getStations, getProfile } from "@/lib/data";
import WebExecutiveDashboard from "@/components/WebExecutiveDashboard";

export const metadata = {
  title: "Dashboard Executivo Web | Conecta Agro",
  description: "Painel de controle executivo para gestão hídrica, sensores e estimativa por inteligência artificial.",
};

export default async function DashboardWebPage() {
  const profile = await getProfile();
  const property = await getPrimaryProperty();
  const stations = property ? await getStations(property.id) : [];

  return (
    <div className="w-full min-h-screen bg-[#F4F7F2]">
      <WebExecutiveDashboard
        property={property}
        stations={stations.map((s) => ({
          id: s.id,
          code: s.code,
          status: (s.status as "online" | "atencao" | "offline") || "online",
          battery_pct: s.battery_pct,
        }))}
        userName={profile?.full_name || "João da Silva"}
        userEmail={profile?.email || "gestao@conectaagro.com.br"}
      />
    </div>
  );
}
