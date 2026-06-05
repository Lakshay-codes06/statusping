import Link from "next/link";
import { Globe, Clock } from "lucide-react";
import StatusBadge from "./StatusBadge";

type Props = {
  monitor: any;
};

export default function MonitorCard({
  monitor,
}: Props) {
  return (
    <Link
      href={`/dashboard/${monitor.id}`}
    >
      <div
        className="
        bg-slate-900
        border border-slate-800
        rounded-2xl
        p-5
        shadow-lg
        hover:border-cyan-500
        hover:scale-[1.02]
        transition-all
        cursor-pointer
        "
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe
              size={20}
              className="text-cyan-400"
            />

            <h2 className="font-semibold text-lg text-white">
              {monitor.name}
            </h2>
          </div>

          <StatusBadge
            status={monitor.status}
          />
        </div>

        <p className="text-slate-400 mt-3 truncate">
          {monitor.url}
        </p>

        <div className="flex items-center gap-2 mt-4 text-slate-500 text-sm">
          <Clock size={16} />

          <span>
            Last checked:{" "}
            {monitor.last_checked_at
              ? new Date(
                  monitor.last_checked_at
                ).toLocaleString()
              : "Never"}
          </span>
        </div>
        {monitor.ssl_days_remaining !==
  null &&
  monitor.ssl_days_remaining !==
    undefined && (
    <div className="mt-3">
      <span
        className={`
        px-2
        py-1
        rounded-lg
        text-xs
        font-semibold
        ${
          monitor.ssl_days_remaining <
          15
            ? "bg-yellow-500/20 text-yellow-400"
            : "bg-green-500/20 text-green-400"
        }
      `}
      >
        🛡 SSL:{" "}
        {
          monitor.ssl_days_remaining
        }{" "}
        days left
      </span>
    </div>
  )}
      </div>
    </Link>
  );
}