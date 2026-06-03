import { Resend } from "resend";

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

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "vermalakshay849@gmail.com",
    subject,
    html: `
      <h1>${subject}</h1>
      <p>URL: ${monitor.url}</p>
    `,
  });

  await sendSlack(
    `${subject}\n${monitor.url}`
  );
}