import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import UptimeChart from "@/components/UptimeChart";

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

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        {monitor.name}
      </h1>

      <div className="mb-6">
        Status:
        {" "}
        {monitor.status}
      </div>

      <UptimeChart
        checks={checks || []}
      />
    </div>
  );
}