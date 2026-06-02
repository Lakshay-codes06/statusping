type Props = {
  status: string;
};

export default function StatusBadge({
  status,
}: Props) {
  const styles = {
    up: "bg-green-100 text-green-700",
    down: "bg-red-100 text-red-700",
    degraded: "bg-yellow-100 text-yellow-700",
  };

  const labels = {
    up: "Operational",
    down: "Down",
    degraded: "Degraded",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-sm ${
        styles[status as keyof typeof styles]
      }`}
    >
      {labels[status as keyof typeof labels]}
    </span>
  );
}