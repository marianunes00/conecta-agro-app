"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function SensorChart({
  data,
  dataKey,
  unit,
}: {
  data: { recorded_at: string; [key: string]: any }[];
  dataKey: string;
  unit: string;
}) {
  const chartData = data.map((d) => ({
    time: new Date(d.recorded_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    value: d[dataKey],
  }));

  if (chartData.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl bg-agro-50 text-sm text-neutral-400">
        Ainda sem leituras registradas
      </div>
    );
  }

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} unit={unit} />
          <Tooltip
            formatter={(value: number) => [`${value}${unit}`, ""]}
            labelStyle={{ fontSize: 12 }}
            contentStyle={{ borderRadius: 12, border: "1px solid #dcf1dd", fontSize: 12 }}
          />
          <Line type="monotone" dataKey="value" stroke="#1f5c26" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
