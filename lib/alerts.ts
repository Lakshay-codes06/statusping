import { Resend } from "resend";
import { supabase } from "@/lib/supabase/client";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

async function sendSlack(
  message: string
) {
  await fetch(
    process.env.SLACK_WEBHOOK_URL!,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        text: message,
      }),
    }
  );
}

export async function dispatchAlerts(
  monitor: any,
  status: string
) {
  const subject =
    status === "down"
      ? `🚨 ${monitor.name} is DOWN`
      : `✅ ${monitor.name} recovered`;

  const html = `
    <h1>${subject}</h1>
    <p>URL: ${monitor.url}</p>
  `;

  const { data: subscribers } =
    await supabase
      .from("subscribers")
      .select("*")
      .eq("monitor_id", monitor.id);

  // Owner email
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "vermalakshay849@gmail.com",
    subject,
    html,
  });

  // Subscriber emails
  for (const subscriber of subscribers || []) {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: subscriber.email,
      subject,
      html,
    });
  }

  // Slack notification
  await sendSlack(
    `${subject}\n${monitor.url}`
  );
}