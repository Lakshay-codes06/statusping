"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

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

            const updated =
              payload.new as any;

            const previous =
              monitors.find(
                (m) =>
                  m.id ===
                  updated.id
              );

            if (
              previous &&
              previous.status !==
                updated.status
            ) {
              if (
                updated.status ===
                "down"
              ) {
                toast.error(
                  `${updated.name} went down`
                );
              }

              if (
                updated.status ===
                "up"
              ) {
                toast.success(
                  `${updated.name} recovered`
                );
              }
            }

            setMonitors(
              (current) =>
                current.map(
                  (monitor) =>
                    monitor.id ===
                    updated.id
                      ? updated
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
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {monitors.map(
        (monitor) => (
          <Link
            href={`/dashboard/${monitor.id}`}
            key={monitor.id}
          >
            <div
              className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-5
              shadow-lg
              hover:border-cyan-500
              hover:shadow-cyan-500/10
              hover:-translate-y-1
              transition-all
              cursor-pointer
              h-full
              "
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${monitor.url}&sz=64`}
                    alt=""
                    className="w-6 h-6 rounded"
                  />

                  <h2 className="font-bold text-white">
                    {monitor.name}
                  </h2>
                </div>

                <span
                  className={`
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  ${
                    monitor.status ===
                    "up"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }
                `}
                >
                  ● {monitor.status}
                </span>
              </div>

              <p className="text-slate-400 mt-3 truncate">
                {monitor.url}
              </p>
<div className="mt-4 space-y-1 text-sm text-slate-400">
  <p>
    Last checked:{" "}
    {monitor.last_checked_at
      ? new Date(
          monitor.last_checked_at
        ).toLocaleString()
      : "Never"}
  </p>

  <p>
    Uptime: 99.98%
  </p>

  <p>
    Response: 124ms
  </p>

  {monitor.ssl_days_remaining !==
    null &&
    monitor.ssl_days_remaining !==
      undefined && (
      <p
        className={
          monitor.ssl_days_remaining <
          15
            ? "text-yellow-400"
            : "text-green-400"
        }
      >
        🛡 SSL:{" "}
        {
          monitor.ssl_days_remaining
        }{" "}
        days left
      </p>
    )}
</div>
            </div>
          </Link>
        )
      )}
    </div>
  );
}