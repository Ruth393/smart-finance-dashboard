import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const { category, amount, color } = payload[0].payload;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm shadow-xl">
      <p className="font-medium text-white">{category}</p>
      <p className="mt-0.5 text-slate-300">{formatCurrency(amount)}</p>
      <p className="text-xs text-slate-500">{payload[0].percent.toFixed(1)}% of expenses</p>
      <span className="sr-only" style={{ color }} />
    </div>
  );
}

export default function ExpenseDonutChart({ data, totalExpenses }) {
  if (!data?.length) return null;

  return (
    <div>
      <div className="relative mx-auto h-56 w-full max-w-xs sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius="58%"
              outerRadius="82%"
              paddingAngle={2}
              stroke="transparent"
            >
              {data.map((entry) => (
                <Cell key={entry.category} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Total expenses
          </p>
          <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
        {data.map((item) => (
          <li key={item.category} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="truncate text-slate-400">{item.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
