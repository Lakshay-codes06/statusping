import { supabase } from "@/lib/supabase/client";
import { processMonitor } from "@/lib/ping";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (
    authHeader !==
    `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { data: monitors, error } =
    await supabase
      .from("monitors")
      .select("*")
      .eq("is_active", true);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  for (const monitor of monitors) {
    await processMonitor(monitor);
  }

  return NextResponse.json({
    pinged: monitors.length,
  });
}