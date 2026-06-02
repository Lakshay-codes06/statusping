import { supabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("monitors")
    .select("*");

  return NextResponse.json({
    data,
    error,
  });
}