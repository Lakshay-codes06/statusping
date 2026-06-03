import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import UptimeChart from "@/components/UptimeChart";
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
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        {monitor.name}
      </h1>

      <div
        className={`inline-block px-6 py-3 rounded text-white text-xl font-bold ${
          monitor.status === "up"
            ? "bg-green-600"
            : "bg-red-600"
        }`}
      >
        {monitor.status === "up"
          ? "UP"
          : "DOWN"}
      </div>

      <div className="mt-6 space-y-3">
        <p>
          <strong>Uptime:</strong>{" "}
          {uptime}%
        </p>

        <p>
          <strong>
            Average Response Time:
          </strong>{" "}
          {avgResponse} ms
        </p>

        <p>
          <strong>
            Current Time:
          </strong>{" "}
          {new Date().toLocaleString()}
        </p>
      </div>
      <UptimeChart
  checks={checks || []}
/>
    </div>
  );
}