import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import UptimeChart from "@/components/UptimeChart";
import SubscribeForm from "@/components/SubscribeForm";
import IncidentTimeline from "@/components/IncidentTimeline";
import Footer from "@/components/Footer";

export default async function StatusPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: monitor } =
    await supabase
      .from("monitors")
      .select("*")
      .eq("slug", slug)
      .single();

  if (!monitor) {
    notFound();
  }

  const { data: checks } =
    await supabase
      .from("checks")
      .select("*")
      .eq("monitor_id", monitor.id);

  const { data: incidents } =
    await supabase
      .from("incidents")
      .select("*")
      .eq("monitor_id", monitor.id)
      .order("started_at", {
        ascending: false,
      });

  const totalChecks =
    checks?.length || 0;

  const upChecks =
    checks?.filter(
      (check) =>
        check.status === "up"
    ).length || 0;

  const uptime =
    totalChecks === 0
      ? 100
      : (
          (upChecks /
            totalChecks) *
          100
        ).toFixed(2);

  const recentChecks =
    checks?.filter(
      (check) =>
        check.response_time !== null
    ) || [];

  const avgResponse =
    recentChecks.length === 0
      ? 0
      : Math.round(
          recentChecks.reduce(
            (sum, check) =>
              sum +
              check.response_time,
            0
          ) /
            recentChecks.length
        );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto p-8">

        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold">
            {monitor.name}
          </h1>

          <p className="text-slate-400 mt-3">
            Public Status Page
          </p>
        </div>

        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-8
          mb-8
          "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Current Status
            </h2>

            <span
              className={`px-5 py-2 rounded-full font-semibold ${
                monitor.status === "up"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              ●{" "}
              {monitor.status === "up"
                ? "Operational"
                : "Down"}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div>
              <p className="text-slate-400">
                Uptime
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {uptime}%
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Avg Response
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {avgResponse} ms
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Status
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {monitor.status}
              </h3>
            </div>
          </div>
        </div>

        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-8
          mb-8
          "
        >
          <h2 className="text-2xl font-bold mb-6">
            Uptime History
          </h2>

          <UptimeChart
            checks={checks || []}
          />
        </div>

        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-8
          mb-8
          "
        >
          <IncidentTimeline
            incidents={incidents || []}
          />
        </div>
        {incidents?.[0]?.public_message && (
  <div
    className="
    bg-slate-900
    border
    border-slate-800
    rounded-3xl
    p-8
    mb-8
    "
  >
    <h2 className="text-2xl font-bold mb-4">
      Latest AI Incident Update
    </h2>

    <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">
      {incidents[0].public_message}
    </div>
  </div>
)}

        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-8
          mb-8
          "
        >
          <h2 className="text-2xl font-bold mb-4">
            Stay Updated
          </h2>

          <p className="text-slate-400 mb-6">
            Subscribe to receive outage
            and recovery notifications.
          </p>

          <SubscribeForm
            monitorId={monitor.id}
          />
        </div>

      </div>

      <Footer />
    </div>
  );
}