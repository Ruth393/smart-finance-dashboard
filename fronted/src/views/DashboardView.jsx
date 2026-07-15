import { ErrorMessage } from '../components/common';
import {
  DashboardEmptyState,
  DashboardSkeleton,
  ExpenseDonutChart,
  KpiCard,
  MonthlyComparisonChart,
} from '../components/dashboard';
import { useApi } from '../hooks';
import { dashboardService } from '../services';

function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
    new Date(year, month - 1, 1),
  );
}

function isDashboardEmpty({ summary, expensesByCategory, monthlyTrends }) {
  const hasActivity =
    (summary?.totalIncome ?? 0) > 0 ||
    (summary?.totalExpenses ?? 0) > 0 ||
    (expensesByCategory?.length ?? 0) > 0;

  const hasTrends = (monthlyTrends ?? []).some(
    (point) => point.income > 0 || point.expenses > 0,
  );

  return !hasActivity && !hasTrends;
}

export default function DashboardView() {
  const { data, error, loading, execute } = useApi(
    () => dashboardService.getDashboardData(),
    [],
    { immediate: true },
  );

  const monthLabel = data?.summary?.month
    ? formatMonthLabel(data.summary.month)
    : formatMonthLabel(
        `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`,
      );

  const isEmpty = data ? isDashboardEmpty(data) : false;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="mt-2 text-slate-400">
          {loading
            ? 'Loading your financial overview…'
            : `Overview for ${monthLabel}`}
        </p>
      </header>

      {loading && <DashboardSkeleton />}

      {error && !loading && (
        <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-8">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-white">
              Could not load dashboard
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              We had trouble fetching your data. Check your connection and try again.
            </p>
            <div className="mt-6">
              <ErrorMessage message={error.message} onRetry={() => execute()} />
            </div>
          </div>
        </section>
      )}

      {!loading && !error && isEmpty && (
        <DashboardEmptyState monthLabel={monthLabel} />
      )}

      {!loading && !error && data && !isEmpty && (
        <>
          <section
            aria-label="Key performance indicators"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <KpiCard
              title="Total Income"
              value={data.summary.totalIncome}
              variant="income"
              currency={data.summary.currency}
            />
            <KpiCard
              title="Total Expenses"
              value={data.summary.totalExpenses}
              variant="expenses"
              currency={data.summary.currency}
            />
            <KpiCard
              title="Net Savings"
              value={data.summary.netSavings}
              variant="savings"
              currency={data.summary.currency}
            />
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-lg font-semibold text-white">Expense breakdown</h2>
              <p className="mt-1 text-sm text-slate-400">
                How your spending is distributed across categories
              </p>
              <div className="mt-6">
                <ExpenseDonutChart
                  data={data.expensesByCategory}
                  totalExpenses={data.summary.totalExpenses}
                />
              </div>
            </article>

            <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-lg font-semibold text-white">Income vs. expenses</h2>
              <p className="mt-1 text-sm text-slate-400">
                Monthly comparison over the last 6 months
              </p>
              <div className="mt-6">
                <MonthlyComparisonChart data={data.monthlyTrends} />
              </div>
            </article>
          </section>
        </>
      )}
    </div>
  );
}
