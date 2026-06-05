import Link from "next/link";
import {
  Activity,
  Shield,
  Bell,
  Globe,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-cyan-500/20 blur-3xl rounded-full top-20 left-20" />

        <div className="absolute w-96 h-96 bg-blue-500/20 blur-3xl rounded-full bottom-20 right-20" />
      </div>

      {/* Navbar */}
      <nav className="relative border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            StatusPing
          </h1>

          <Link
            href="/dashboard"
            className="
            bg-cyan-500
            hover:bg-cyan-400
            text-black
            px-5
            py-2
            rounded-xl
            font-semibold
            transition
            "
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 md:px-8 py-24 md:py-32 text-center">

        <div
          className="
          inline-flex
          items-center
          px-4
          py-2
          rounded-full
          bg-cyan-500/10
          border
          border-cyan-500/20
          text-cyan-400
          text-sm
          mb-8
          "
        >
          ⚡ Realtime Uptime Monitoring
        </div>

        <h1 className="text-4xl md:text-7xl font-bold leading-tight">
          Monitor
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {" "}Websites
          </span>

          <br />

          In Real Time
        </h1>

        <p className="text-slate-400 text-lg md:text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
          Monitor websites, APIs and services with
          realtime alerts, SSL tracking, incident
          management and beautiful public status pages.
        </p>

        <div className="flex justify-center mt-10">
          <Link
            href="/dashboard"
            className="
            bg-cyan-500
            hover:bg-cyan-400
            text-black
            px-8
            py-4
            rounded-xl
            font-semibold
            transition
            "
          >
            Start Monitoring
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 md:gap-16 mt-16 flex-wrap">
          <div>
            <h3 className="text-3xl font-bold">
              24/7
            </h3>

            <p className="text-slate-400">
              Monitoring
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">
              SSL
            </h3>

            <p className="text-slate-400">
              Tracking
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">
              Realtime
            </h3>

            <p className="text-slate-400">
              Alerts
            </p>
          </div>
        </div>

      </section>

      {/* Features */}
      <section className="relative max-w-6xl mx-auto px-6 md:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
            <Activity className="mb-4 text-cyan-400" />

            <h3 className="font-bold text-lg">
              Realtime Monitoring
            </h3>

            <p className="text-slate-400 mt-2">
              Continuous uptime checks with live updates.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
            <Shield className="mb-4 text-cyan-400" />

            <h3 className="font-bold text-lg">
              SSL Tracking
            </h3>

            <p className="text-slate-400 mt-2">
              Monitor certificate validity and expiry.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
            <Bell className="mb-4 text-cyan-400" />

            <h3 className="font-bold text-lg">
              Email Alerts
            </h3>

            <p className="text-slate-400 mt-2">
              Get notified instantly when downtime occurs.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
            <Globe className="mb-4 text-cyan-400" />

            <h3 className="font-bold text-lg">
              Public Status Pages
            </h3>

            <p className="text-slate-400 mt-2">
              Share service health with your users.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-slate-500">
        StatusPing © 2026 • Built by Lakshay Verma
      </footer>

    </div>
  );
}