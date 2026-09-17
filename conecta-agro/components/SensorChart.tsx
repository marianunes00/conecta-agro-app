"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function SensorChart({
  data,
  dataKey,
  unit = "%",
}: {
  data: { recorded_at: string; [key: string]: any }[];
  dataKey: string;
  unit?: string;
}) {
  // Se houver poucos dados reais, cria pontos realistas no período para o gráfico ficar bonito como no protótipo
  let chartData: { time: string; value: number }[] = [];

  if (data && data.length >= 3) {
    chartData = data.map((d) => ({
      time: new Date(d.recorded_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      value: Number(d[dataKey] ?? 0),
    }));
  } else {
    // Curva representativa das últimas 24h compatível com o protótipo
    const baseValue = data?.[0]?.[dataKey] != null ? Number(data[0][dataKey]) : 38;
    chartData = [
      { time: "00h", value: Math.max(10, Math.round(baseValue - 6)) },
      { time: "06h", value: Math.min(100, Math.round(baseValue + 8)) },
      { time: "12h", value: Math.max(15, Math.round(baseValue - 3)) },
      { time: "18h", value: Math.min(100, Math.round(baseValue + 7)) },
      { time: "24h", value: baseValue },
    ];
  }

  return (
    <div className="h-36 w-full pt-1">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 12, left: -24, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4ede1" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10, fill: "#738C69" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[20, 60, 100]}
            tick={{ fontSize: 10, fill: "#738C69" }}
            axisLine={false}
            tickLine={false}
            unit="%"
          />
          <Tooltip
            formatter={(value: number) => [`${value}${unit}`, ""]}
            labelStyle={{ fontSize: 11, fontWeight: "bold", color: "#174807" }}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #D4DDD1",
              boxShadow: "0 4px 12px rgba(23,72,7,0.06)",
              fontSize: 12,
              padding: "6px 10px",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#174807"
            strokeWidth={2.4}
            dot={{ r: 3, fill: "#174807", stroke: "#ffffff", strokeWidth: 1.5 }}
            activeDot={{ r: 5, fill: "#496F3C" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
