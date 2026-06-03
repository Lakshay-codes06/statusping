export default function IncidentTimeline({
  incidents,
}: {
  incidents: any[];
}) {
  if (!incidents?.length) {
    return (
      <div className="mt-8 p-4 border rounded">
        <p className="text-green-600 font-bold">
          ✓ No incidents in the last 90 days
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Incident History
      </h2>

      {incidents.map((incident) => {
        const duration =
          incident.resolved_at
            ? Math.round(
                (
                  new Date(
                    incident.resolved_at
                  ).getTime() -
                  new Date(
                    incident.started_at
                  ).getTime()
                ) /
                  60000
              )
            : null;

        return (
          <div
            key={incident.id}
            className="border rounded p-4 mb-3"
          >
            <div className="flex gap-2 items-center">
              <span
                className={`px-2 py-1 rounded text-white text-sm ${
                  incident.status ===
                  "resolved"
                    ? "bg-green-600"
                    : "bg-yellow-600"
                }`}
              >
                {incident.status ===
                "resolved"
                  ? "Resolved"
                  : "Investigating"}
              </span>
            </div>
<h3 className="font-bold text-lg">
  {incident.title}
</h3>

<p className="text-sm text-gray-500">
  {incident.description}
</p>
            <p className="mt-2">
              Started:
              {" "}
              {new Date(
                incident.started_at
              ).toLocaleString()}
            </p>

            {duration && (
              <p>
                Lasted {duration} minutes
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}