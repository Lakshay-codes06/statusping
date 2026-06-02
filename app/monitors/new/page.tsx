"use client";

import { useState } from "react";

export default function NewMonitorPage() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const createMonitor = async () => {
    await fetch("/api/monitors", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        name,
        url,
        user_id:
          "5d5b5af2-5e40-4d3d-85a3-1cc1ce67d5a8",
      }),
    });

    window.location.href =
      "/dashboard";
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">
        New Monitor
      </h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="URL"
        value={url}
        onChange={(e) =>
          setUrl(e.target.value)
        }
      />

      <button
        onClick={createMonitor}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Create Monitor
      </button>
    </div>
  );
}