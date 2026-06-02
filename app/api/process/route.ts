import { supabase } from "@/lib/supabase/client";
import { processMonitor } from "@/lib/ping";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("monitors")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    return NextResponse.json({
      error: error.message,
    });
  }

  if (!data) {
    return NextResponse.json({
      error: "No monitor found",
    });
  }

  const result = await processMonitor(data);

  return NextResponse.json(result);
}

 