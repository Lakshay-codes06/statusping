import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";
import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  request: Request
) {
  const {
    email,
    monitor_id,
  } = await request.json();

  const { data, error } =
    await supabase
      .from("subscribers")
      .insert({
  email,
  monitor_id,
})
      .select();

  console.log(
    "SUBSCRIBER DATA:",
    data
  );

  console.log(
    "SUBSCRIBER ERROR:",
    error
  );

  if (error) {
    return NextResponse.json(
      { error },
      { status: 500 }
    );
  }

 const result =
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject:
      "Subscribed to Status Updates",
    html:
      "<h1>You are subscribed.</h1>",
  });
  console.log(
  "EMAIL RESULT:",
  result
);

  return NextResponse.json({
    success: true,
  });
}