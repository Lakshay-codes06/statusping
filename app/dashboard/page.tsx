import { supabase } from "@/lib/supabase/client";
import RealtimeMonitors from "@/components/RealtimeMonitors";
import StatCard from "@/components/StatCard";
import Sidebar from "@/components/Sidebar";
console.log("Dashboard loaded");
export default async function Dashboard() {
  const { data: monitors } =
    await supabase
      .from("monitors")
      .select("*");


  return (
  <div className="flex flex-col md:flex-row bg-slate-950 min-h-screen">
    <Sidebar />

   <main className="flex-1 p-4 md:p-8 text-white overflow-x-hidden">
     <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
         <h1 className="text-3xl md:text-4xl font-bold">
            Dashboard
          </h1>

          <p className="text-slate-400 mt-1">
            Monitor websites in real time
          </p>
        </div>

        <a
          href="/monitors/new"
          className="
          bg-cyan-500
          hover:bg-cyan-400
          text-black
          font-semibold
          px-5
          py-3
          rounded-xl
          transition
          "
        >
          New Monitor
        </a>
      </div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Monitors"
          value={monitors?.length || 0}
        />

        <StatCard
          title="Operational"
          value={
            monitors?.filter(
              (m) => m.status === "up"
            ).length || 0
          }
        />

        <StatCard
          title="Down"
          value={
            monitors?.filter(
              (m) => m.status === "down"
            ).length || 0
          }
        />

        <StatCard
          title="Realtime"
          value="Live"
        />
      </div>

      <input
      
  placeholder="Search monitors..."
  className="
  w-full
  bg-slate-900
  border
  border-slate-800
  rounded-2xl
  px-4
  py-3
  text-white
  mb-6
  focus:outline-none
  focus:border-cyan-500
  "
/>
      

      <RealtimeMonitors
        initialMonitors={monitors || []}
      />
    </main>
  </div>
);
}