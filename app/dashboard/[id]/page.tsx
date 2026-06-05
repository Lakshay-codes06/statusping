import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import UptimeChart from "@/components/UptimeChart";
import IncidentTimeline from "@/components/IncidentTimeline";
import AIDraftGenerator from "@/components/AIDraftGenerator";
import ResponseTimeChart from "@/components/ResponseTimeChart";
export default async function MonitorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: monitor } =
    await supabase
      .from("monitors")
      .select("*")
      .eq("id", id)
      .single();

  if (!monitor) {
    notFound();
  }

  const { data: checks } =
    await supabase
      .from("checks")
      .select("*")
      .eq("monitor_id", monitor.id)
      .order("created_at", {
        ascending: false,
      });

  const { data: incidents } =
    await supabase
      .from("incidents")
      .select("*")
      .eq("monitor_id", monitor.id)
      .order("started_at", {
        ascending: false,
      });

  const validChecks =
    (checks || []).filter(
      (check) =>
        check.response_time !== null
    );

  const avgResponse =
    validChecks.length === 0
      ? 0
      : Math.round(
          validChecks.reduce(
            (sum, check) =>
              sum +
              check.response_time,
            0
          ) /
            validChecks.length
        );

  const fastestResponse =
    validChecks.length === 0
      ? 0
      : Math.min(
          ...validChecks.map(
            (c) => c.response_time
          )
        );

  const slowestResponse =
    validChecks.length === 0
      ? 0
      : Math.max(
          ...validChecks.map(
            (c) => c.response_time
          )
        );

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        {monitor.name}
      </h1>

      <div className="mb-6">
        Status: {monitor.status}
      </div>

      <div className="grid md:grid-cols-5 gap-4 mb-8">

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-slate-400">
            SSL Days Remaining
          </p>

          <p className="text-3xl font-bold mt-2">
            {monitor.ssl_days_remaining ??
              "--"}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-slate-400">
            SSL Expiry
          </p>

          <p className="text-lg font-bold mt-2">
            {monitor.ssl_expires_at
              ? new Date(
                  monitor.ssl_expires_at
                ).toLocaleDateString()
              : "--"}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-slate-400">
            Avg Response
          </p>

          <p className="text-3xl font-bold mt-2">
            {avgResponse} ms
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-slate-400">
            Fastest
          </p>

          <p className="text-3xl font-bold mt-2 text-green-400">
            {fastestResponse} ms
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <p className="text-slate-400">
            Slowest
          </p>

          <p className="text-3xl font-bold mt-2 text-red-400">
            {slowestResponse} ms
          </p>
        </div>

      </div>

      <UptimeChart
        checks={checks || []}
      />
<ResponseTimeChart
  checks={checks || []}
/>
      <div className="mt-8">
        <IncidentTimeline
          incidents={incidents || []}
        />
      </div>

      <AIDraftGenerator
        monitorId={monitor.id}
        monitorName={monitor.name}
        url={monitor.url}
      />
    </div>
  );
}