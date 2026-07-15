export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-8" aria-busy="true" aria-label="Loading dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((key) => (
          <div
            key={key}
            className="h-28 rounded-xl border border-slate-800 bg-slate-900/60"
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-96 rounded-xl border border-slate-800 bg-slate-900/60" />
        <div className="h-96 rounded-xl border border-slate-800 bg-slate-900/60" />
      </div>
    </div>
  );
}
