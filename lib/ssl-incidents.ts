import { supabase } from "./supabase/client";

export async function createSSLIncident(
  monitor: any,
  daysRemaining: number
) {
  const { data: existing } =
    await supabase
      .from("incidents")
      .select("*")
      .eq(
        "monitor_id",
        monitor.id
      )
      .eq(
        "type",
        "ssl_expiry"
      )
      .is(
        "resolved_at",
        null
      )
      .maybeSingle();

  if (existing) {
    return;
  }

  await supabase
    .from("incidents")
    .insert({
      monitor_id:
        monitor.id,

      title:
        "SSL Certificate Expiring",

      description:
        `SSL certificate expires in ${daysRemaining} days.`,

      type:
        "ssl_expiry",

      status:
        "investigating",

      started_at:
        new Date().toISOString(),
    });
}