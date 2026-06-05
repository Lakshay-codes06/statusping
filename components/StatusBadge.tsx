type Props = {
  status: string;
};

export default function StatusBadge({
  status,
}: Props) {
  const styles = {
    up: `
      bg-green-500/20
      text-green-400
      border
      border-green-500/30
    `,
    down: `
      bg-red-500/20
      text-red-400
      border
      border-red-500/30
    `,
    degraded: `
      bg-yellow-500/20
      text-yellow-400
      border
      border-yellow-500/30
    `,
  };

  const labels = {
    up: "● Operational",
    down: "● Down",
    degraded: "● Degraded",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium
        ${
          styles[
            status as keyof typeof styles
          ]
        }
      `}
    >
      {
        labels[
          status as keyof typeof labels
        ]
      }
    </span>
  );
}