"use client";

import { Radar, RadarChart as RRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

interface RadarChartProps {
  data: { axis: string; value: number }[];
  max?: number;
  color?: string;
  height?: number;
}

export function RadarChart({ data, max = 10, color = "#a3e635", height = 260 }: RadarChartProps) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <RRadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="#262626" />
          <PolarAngleAxis dataKey="axis" tick={{ fill: "#737373", fontSize: 10 }} />
          <PolarRadiusAxis domain={[0, max]} tick={false} axisLine={false} />
          <Radar dataKey="value" stroke={color} fill={color} fillOpacity={0.25} strokeWidth={2} />
        </RRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
