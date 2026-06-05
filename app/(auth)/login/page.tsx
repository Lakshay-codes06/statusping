import Link from "next/link";
import Image from "next/image";
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
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
  <Image
    src="/logo.svg"
    alt="StatusPing Logo"
    width={36}
    height={36}
  />

  <div>
    <h1 className="text-2xl font-bold">
      StatusPing
    </h1>

    <p className="text-xs text-slate-400">
      Realtime Monitoring
    </p>
  </div>
</div>

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
      <section className="relative max-w-6xl mx-auto px-8 py-32 text-center">
<Image
  src="/logo.svg"
  alt="StatusPing Logo"
  width={120}
  height={120}
  className="mx-auto mb-8"
/>
        <h1 className="text-6xl md:text-7xl font-bold leading-tight">
          Monitor
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {" "}Websites
          </span>

          <br />

          In Real Time
        </h1>

        <p className="text-slate-400 text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
  Monitor websites, APIs and services
  with realtime alerts, SSL tracking,
  incident history and beautiful public
  status pages.
</p>
        <div className="flex gap-4 justify-center mt-10">
          <Link
            href="/dashboard"
            className="
            bg-cyan-500
            hover:bg-cyan-400
            text-black
            px-6
            py-3
            rounded-xl
            font-semibold
            transition
            "
          >
            Start Monitoring
          </Link>

          <Link
            href="/status/google"
            className="
            border
            border-slate-700
            px-6
            py-3
            rounded-xl
            hover:bg-slate-900
            transition
            "
          >
            View Demo
          </Link>
        </div>
<div className="flex justify-center gap-12 mt-16 flex-wrap">
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
      <section className="relative max-w-6xl mx-auto px-8 pb-24">
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
            <Activity className="mb-4 text-cyan-400" />
            <h3 className="font-bold">
              Realtime Monitoring
            </h3>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
            <Shield className="mb-4 text-cyan-400" />
            <h3 className="font-bold">
              SSL Tracking
            </h3>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
            <Bell className="mb-4 text-cyan-400" />
            <h3 className="font-bold">
              Email Alerts
            </h3>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
            <Globe className="mb-4 text-cyan-400" />
            <h3 className="font-bold">
              Public Status Pages
            </h3>
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