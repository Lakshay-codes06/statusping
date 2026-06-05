export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div
      className="
      bg-slate-900
      border border-slate-800
      rounded-2xl
      p-5
      shadow-lg
      "
    >
      <p className="text-slate-400">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-white mt-2">
        {value}
      </h2>
    </div>
  );
}