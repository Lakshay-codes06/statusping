import StatusBadge from "./StatusBadge";

type Props = {
  monitor: any;
};

export default function MonitorCard({
  monitor,
}: Props) {
  return (
    <div className="border rounded-lg p-4 shadow">
      <div className="flex justify-between">
        <h2 className="font-semibold">
          {monitor.name}
        </h2>

        <StatusBadge
          status={monitor.status}
        />
      </div>

      <p className="text-gray-500 mt-2">
        {monitor.url}
      </p>

      <p className="text-sm mt-3">
        Last checked:
        {" "}
        {monitor.last_checked_at ||
          "Never"}
      </p>
    </div>
  );
}