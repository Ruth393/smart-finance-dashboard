import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm shadow-xl">
      <p className="mb-2 font-medium text-white">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-slate-300">
          <span style={{ color: entry.color }}>{entry.name}: </span>
          {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
}

export default function MonthlyComparisonChart({ data }) {
  if (!data?.length) return null;

  return (
    <div className="h-72 w-full sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={{ stroke: '#475569' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) =>
              value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`
            }
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e293b', opacity: 0.4 }} />
          <Legend
            wrapperStyle={{ paddingTop: 16 }}
            formatter={(value) => (
              <span className="text-sm text-slate-400">{value}</span>
            )}
          />
          <Bar
            dataKey="income"
            name="Income"
            fill="#34d399"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="expenses"
            name="Expenses"
            fill="#fb7185"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
