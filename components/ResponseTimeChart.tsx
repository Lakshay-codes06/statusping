"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ResponseTimeChart({
  checks,
}: {
  checks: any[];
}) {
  const data =
    checks
      .filter(
        (c) =>
          c.response_time !== null
      )
      .slice(0, 20)
      .reverse()
      .map((check) => ({
        time: new Date(
          check.created_at
        ).toLocaleTimeString(),
        response:
          check.response_time,
      }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Response Time Trend
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={data}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="response"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}