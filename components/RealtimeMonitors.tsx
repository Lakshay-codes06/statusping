"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function RealtimeMonitors({
  initialMonitors,
}: {
  initialMonitors: any[];
}) {
  const [monitors, setMonitors] =
    useState(initialMonitors);

  useEffect(() => {
    const channel =
      supabase
        .channel("monitors")

        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "monitors",
          },
          (payload) => {
  console.log(
    "REALTIME PAYLOAD:",
    payload
  );

  setMonitors((current) =>
              current.map((monitor) =>
                monitor.id ===
                payload.new.id
                  ? payload.new
                  : monitor
              )
            );
          }
        )

        .subscribe((status) => {
  console.log(
    "REALTIME STATUS:",
    status
  );
});

    return () => {
      supabase.removeChannel(
        channel
      );
    };
  }, []);

  return (
    <div className="space-y-4">
      {monitors.map((monitor) => (
        <div
          key={monitor.id}
          className="border p-4 rounded"
        >
          <h2 className="font-bold">
            {monitor.name}
          </h2>

          <span
            className={`px-3 py-1 rounded text-white ${
              monitor.status ===
              "up"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {monitor.status}
          </span>
        </div>
      ))}
    </div>
  );
}