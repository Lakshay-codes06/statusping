import { supabase } from "@/lib/supabase/client";
import MonitorCard from "@/components/MonitorCard";
console.log("Dashboard loaded");
export default async function Dashboard() {
  const { data: monitors } =
    await supabase
      .from("monitors")
      .select("*");

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          StatusPing
        </h1>

        <a
  href="/monitors/new"
  className="rounded bg-black px-4 py-2 text-white"
>
  New Monitor
</a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {monitors?.map((monitor) => (
          <MonitorCard
            key={monitor.id}
            monitor={monitor}
          />
        ))}
      </div>
    </div>
  );
}