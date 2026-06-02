import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

function createSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}

export async function POST(req: Request) {
  const body = await req.json();

  const slug = createSlug(body.name);

  const { data, error } = await supabase
    .from("monitors")
    .insert({
      name: body.name,
      url: body.url,
      slug,
      status: "up",
      is_active: true,
      user_id: body.user_id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}