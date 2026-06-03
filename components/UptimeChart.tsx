"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function UptimeChart({
  checks,
}: {
  checks: any[];
}) {
  const data = checks.map((check) => ({
    date: new Date(
      check.created_at
    ).toLocaleDateString(),
    responseTime:
      check.response_time || 0,
  }));

  return (
    <div className="bg-zinc-900 p-4 rounded-xl mt-8">
      <h2 className="text-xl font-bold text-white mb-4">
        Response Time History
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <AreaChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#333"
          />

        <XAxis
  dataKey="date"
  stroke="#888"
/>

          
    <YAxis
  stroke="#888"
/>

       <Tooltip
  contentStyle={{
    backgroundColor: "#111",
    border: "1px solid #333",
  }}
/>

          <Area
            type="monotone"
            dataKey="responseTime"
            stroke="#06b6d4"
            fill="#06b6d4"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}