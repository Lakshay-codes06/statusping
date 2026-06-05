import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Globe,
  AlertTriangle,
  Bell,
  Settings,
  Activity,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside
  className="
  hidden
  md:flex
  w-72
  min-h-screen
  bg-slate-900
  border-r
  border-slate-800
  flex-col
  "
><div className="p-6 border-b border-slate-800">
  <div className="flex items-center gap-3">
    <Image
      src="/logo.svg"
      alt="StatusPing Logo"
      width={42}
      height={42}
    />

    <div>
      <h1 className="text-xl font-bold text-white">
        StatusPing
      </h1>

      <p className="text-xs text-slate-400">
        Realtime Website Monitoring
      </p>
    </div>
  </div>
</div>

<nav className="p-4 space-y-2">
        <Link
          href="/dashboard"
          className="
          flex items-center gap-3
          p-3
          rounded-xl
          bg-slate-800
          text-white
          "
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/dashboard"
          className="
          flex items-center gap-3
          p-3
          rounded-xl
          hover:bg-slate-800
          text-slate-300
          transition
          "
        >
          <Globe size={18} />
          Monitors
        </Link>

        <Link
          href="#"
          className="
          flex items-center gap-3
          p-3
          rounded-xl
          hover:bg-slate-800
          text-slate-300
          transition
          "
        >
          <AlertTriangle size={18} />
          Incidents
        </Link>

        <Link
          href="#"
          className="
          flex items-center gap-3
          p-3
          rounded-xl
          hover:bg-slate-800
          text-slate-300
          transition
          "
        >
          <Bell size={18} />
          Subscribers
        </Link>

        <Link
          href="#"
          className="
          flex items-center gap-3
          p-3
          rounded-xl
          hover:bg-slate-800
          text-slate-300
          transition
          "
        >
          <Settings size={18} />
          Settings
        </Link>
      </nav>

      <div className="mt-auto p-4">
        <div
          className="
          bg-slate-800
          rounded-xl
          p-4
          border
          border-slate-700
          "
        >
          <p className="text-sm text-slate-400">
            Status
          </p>

          <p className="text-green-400 font-semibold">
            ● All systems operational
          </p>
        </div>
      </div>
    </aside>
  );
}