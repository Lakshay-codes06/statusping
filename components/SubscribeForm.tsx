"use client";

import { useState } from "react";

export default function SubscribeForm({
  monitorId,
}: {
  monitorId: string;
}) {
  const [email, setEmail] =
    useState("");

  async function subscribe() {
    await fetch(
      "/api/subscribe",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          monitor_id:
            monitorId,
        }),
      }
    );

    alert("Subscribed!");
  }

  return (
    <div className="mt-8">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
        className="border p-2 mr-2"
      />

      <button
        onClick={subscribe}
        className="bg-black text-white px-4 py-2"
      >
        Subscribe to Updates
      </button>
    </div>
  );
}