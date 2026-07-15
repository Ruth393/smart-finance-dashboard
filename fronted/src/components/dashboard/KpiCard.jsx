import { formatCurrency } from '../../utils/formatters';

const VARIANTS = {
  income: {
    accent: 'text-emerald-400',
    glow: 'from-emerald-500/20',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
      </svg>
    ),
  },
  expenses: {
    accent: 'text-rose-400',
    glow: 'from-rose-500/20',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
      </svg>
    ),
  },
  savings: {
    accent: 'text-sky-400',
    glow: 'from-sky-500/20',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
};

export default function KpiCard({ title, value, variant = 'income', currency = 'USD' }) {
  const style = VARIANTS[variant] ?? VARIANTS.income;

  return (
    <article className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/20">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.glow} to-transparent opacity-60`}
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {title}
          </p>
          <p className="mt-2 truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {formatCurrency(value, currency)}
          </p>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800/80 ${style.accent}`}
        >
          {style.icon}
        </div>
      </div>
    </article>
  );
}
