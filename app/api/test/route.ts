import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";
import { processMonitor } from "@/lib/ping";

export async function GET() {
  const { data: monitors } =
    await supabase
      .from("monitors")
      .select("*");

  for (const monitor of monitors || []) {
    await processMonitor(
      monitor
    );
  }

  return NextResponse.json({
    success: true,
    processed:
      monitors?.length || 0,
  });
}