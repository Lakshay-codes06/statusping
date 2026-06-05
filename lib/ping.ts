import { dispatchAlerts } from "./alerts";
import { supabase } from "./supabase/client";
import { checkSSL } from "./ssl";
import { createSSLIncident } from "./ssl-incidents";
export async function pingUrl(url: string) {
  const start = Date.now();

  try {
    const res = await fetch(url);

    return {
      status: res.ok ? "up" : "down",
      response_ms: Date.now() - start,
      status_code: res.status,
    };
  } catch {
    return {
      status: "down",
      response_ms: null,
      status_code: null,
    };
  }
}

export async function saveCheck(
  monitorId: string,
  result: any
) {
  const { error } = await supabase
    .from("checks")
    .insert({
      monitor_id: monitorId,
      status: result.status,
      response_time: result.response_ms,
      status_code: result.status_code,
      error: null,
    });

  if (error) {
    console.error(
      "Save check error:",
      error
    );
  }
}

export async function processMonitor(
  monitor: any
) {
  const result = await pingUrl(
    monitor.url
  );
  let ssl = null;
try {
  let url = monitor.url;

  if (
    !url.startsWith("http://") &&
    !url.startsWith("https://")
  ) {
    url = `https://${url}`;
  }

  const hostname =
    new URL(url).hostname;

  ssl =
    await checkSSL(
      hostname
    );

  console.log(
    "SSL RESULT:",
    ssl
  );
} catch (error) {
  console.error(
    "SSL check failed:",
    error
  );
}

  await saveCheck(
    monitor.id,
    result
  );

  if (
    monitor.status !== result.status
  ) {
    await dispatchAlerts(
      monitor,
      result.status
    );
await supabase
  .from("monitors")
  .update({
    status: result.status,

    ssl_expires_at:
      ssl?.valid_to,

    ssl_days_remaining:
      ssl?.daysRemaining,
  })
  .eq("id", monitor.id);
  }
if (ssl) {
  await supabase
    .from("monitors")
    .update({
      ssl_expires_at:
        ssl.valid_to,

      ssl_days_remaining:
        ssl.daysRemaining,
    })
    .eq("id", monitor.id);

  if (
    ssl.daysRemaining > 0 &&
    ssl.daysRemaining < 15
  ) {
    await createSSLIncident(
      monitor,
      ssl.daysRemaining
    );
  }
}
  return result;
}