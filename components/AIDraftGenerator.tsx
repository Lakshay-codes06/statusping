"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AIDraftGenerator({
  monitorId,
  monitorName,
  url,
}: {
  monitorId: string;
  monitorName: string;
  url: string;
}) {
  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [draft, setDraft] =
    useState("");

  async function generate() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/ai-draft",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              monitorName,
              url,
              error:
                "Service unavailable",
            }),
          }
        );

      const data =
        await response.json();

      console.log(
        "AI RESPONSE:",
        data
      );

      setDraft(
        data.draft || ""
      );
    } catch (error) {
      console.error(error);
      alert(
        "Failed to generate AI update"
      );
    } finally {
      setLoading(false);
    }
  }

  async function publish() {
    try {
      setSaving(true);

      const {
        data: incident,
        error: selectError,
      } = await supabase
        .from("incidents")
        .select("*")
        .eq(
          "monitor_id",
          monitorId
        )
        .order(
          "started_at",
          {
            ascending: false,
          }
        )
        .limit(1)
        .single();

      console.log(
        "INCIDENT:",
        incident
      );

      console.log(
        "SELECT ERROR:",
        selectError
      );

      if (selectError) {
        alert(
          selectError.message
        );
        return;
      }

      if (!incident) {
        alert(
          "No incident found"
        );
        return;
      }

      const updateResult =
        await supabase
          .from("incidents")
          .update({
            public_message:
              draft,
          })
          .eq(
            "id",
            incident.id
          );

      console.log(
        "UPDATE RESULT:",
        updateResult
      );

      if (
        updateResult.error
      ) {
        alert(
          updateResult.error
            .message
        );
        return;
      }

      alert(
        "Published successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Unexpected error"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-8 border border-slate-800 rounded-xl p-6 bg-slate-900">
      <h2 className="text-2xl font-bold mb-4 text-white">
        AI Incident Assistant
      </h2>

      <button
        onClick={generate}
        disabled={loading}
        className="
          bg-cyan-500
          hover:bg-cyan-400
          text-black
          px-4
          py-2
          rounded-lg
          font-semibold
        "
      >
        {loading
          ? "Generating..."
          : "Generate AI Update"}
      </button>

      {draft && (
        <>
          <textarea
            value={draft}
            onChange={(e) =>
              setDraft(
                e.target.value
              )
            }
            className="
              w-full
              h-64
              mt-6
              p-4
              rounded-lg
              bg-slate-950
              border
              border-slate-700
              text-white
            "
          />

          <button
            onClick={publish}
            disabled={saving}
            className="
              mt-4
              bg-green-500
              hover:bg-green-400
              text-black
              px-4
              py-2
              rounded-lg
              font-semibold
            "
          >
            {saving
              ? "Publishing..."
              : "Publish Update"}
          </button>
        </>
      )}
    </div>
  );
}