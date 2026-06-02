import { supabase } from "./supabase/client";

export async function pingUrl(url: string) {
  const start = Date.now();

  try {
    const res = await fetch(url);

    return {
      status: res.ok ? "up" : "down",
      response_ms: Date.now() - start,
      status_code: res.status,
    };
  } catch (err) {
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
    console.error("Save check error:", error);
  }
}

export async function processMonitor(
  monitor: any
) {
  const result = await pingUrl(
    monitor.url
  );

  await saveCheck(
    monitor.id,
    result
  );

  return result;
}