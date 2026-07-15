import api from './api.js';

const MOCK_DELAY_MS = 750;

const CATEGORY_COLORS = {
  Housing: '#6366f1',
  Food: '#f59e0b',
  Transport: '#06b6d4',
  Entertainment: '#ec4899',
  Utilities: '#8b5cf6',
  Shopping: '#10b981',
  Other: '#64748b',
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function currentMonthKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

function mockSummary(month) {
  return {
    month,
    totalIncome: 5_850,
    totalExpenses: 4_120,
    netSavings: 1_730,
    currency: 'USD',
  };
}

function mockExpensesByCategory() {
  return [
    { category: 'Housing', amount: 1_450, color: CATEGORY_COLORS.Housing },
    { category: 'Food', amount: 680, color: CATEGORY_COLORS.Food },
    { category: 'Transport', amount: 420, color: CATEGORY_COLORS.Transport },
    { category: 'Entertainment', amount: 310, color: CATEGORY_COLORS.Entertainment },
    { category: 'Utilities', amount: 560, color: CATEGORY_COLORS.Utilities },
    { category: 'Shopping', amount: 700, color: CATEGORY_COLORS.Shopping },
  ];
}

function mockMonthlyTrends(months = 6) {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  const data = [];

  for (let i = months - 1; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const income = 4_800 + Math.round(Math.sin(i * 0.9) * 600) + i * 120;
    const expenses = 3_600 + Math.round(Math.cos(i * 0.7) * 450) + i * 80;

    data.push({
      month: labels[date.getMonth()],
      year: date.getFullYear(),
      income,
      expenses,
    });
  }

  return data;
}

/**
 * Simulates backend dashboard endpoints until they are implemented.
 * Set VITE_USE_MOCK_DASHBOARD=false to call real API routes.
 */
const USE_MOCK = import.meta.env.VITE_USE_MOCK_DASHBOARD !== 'false';

async function fetchWithMock(endpoint, mockData) {
  if (USE_MOCK) {
    await delay(MOCK_DELAY_MS);
    return { data: mockData };
  }
  return api.get(endpoint);
}

const dashboardService = {
  getSummary: (month = currentMonthKey()) =>
    fetchWithMock('/dashboard/summary', mockSummary(month)),

  getExpensesByCategory: (month = currentMonthKey()) =>
    fetchWithMock('/dashboard/expenses-by-category', mockExpensesByCategory()),

  getMonthlyTrends: (months = 6) =>
    fetchWithMock('/dashboard/monthly-trends', mockMonthlyTrends(months)),

  getDashboardData: async (month = currentMonthKey()) => {
    const [summary, categories, trends] = await Promise.all([
      dashboardService.getSummary(month),
      dashboardService.getExpensesByCategory(month),
      dashboardService.getMonthlyTrends(6),
    ]);

    return {
      summary: summary.data,
      expensesByCategory: categories.data,
      monthlyTrends: trends.data,
    };
  },
};

export default dashboardService;
export { CATEGORY_COLORS, currentMonthKey };
