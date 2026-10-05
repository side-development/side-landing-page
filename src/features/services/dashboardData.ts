export type DashboardLocale = "pt-BR" | "en";
export type DashboardPeriod = 7 | 30;

const weights = [58, 62, 59, 67, 72, 65, 61, 69, 74, 71, 66, 78, 82, 75, 72, 79, 85, 81, 76, 89, 94, 86, 82, 91, 99, 93, 88, 102, 108, 104];

function distribute(total: number, values: number[]) {
  const sum = values.reduce((a, b) => a + b, 0);
  const result = values.map(value => Math.floor(total * value / sum));
  result[result.length - 1] += total - result.reduce((a, b) => a + b, 0);
  return result;
}

const revenue = distribute(248420, weights);
const previous = distribute(Math.round(248420 / 1.187), weights.map((value, index) => value + Math.sin(index * 0.8) * 9));

export function getDashboardData(period: DashboardPeriod) {
  const values = period === 30 ? revenue : revenue.slice(-7);
  const comparison = period === 30 ? previous : revenue.slice(-14, -7);
  const total = values.reduce((a, b) => a + b, 0);
  const priorTotal = comparison.reduce((a, b) => a + b, 0);
  return {
    period,
    total,
    revenueChange: (total / priorTotal - 1) * 100,
    users: period === 30 ? 4821 : 1264,
    usersChange: period === 30 ? 11.2 : 12.1,
    conversion: period === 30 ? 12.8 : 13.3,
    conversionChange: period === 30 ? 2.4 : 0.9,
    retention: period === 30 ? 68.4 : 69.1,
    retentionChange: period === 30 ? 5.1 : 2.1,
    points: values.map((value, index) => ({ day: 31 - period + index, value, previous: comparison[index] })),
    sources: [38, 27, 21, 14],
  };
}

export function number(value: number, locale: DashboardLocale, decimals = 0) {
  return new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
}

export function money(value: number, locale: DashboardLocale) {
  return new Intl.NumberFormat(locale, { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);
}

export function date(day: number, locale: DashboardLocale) {
  return new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", timeZone: "UTC" }).format(new Date(Date.UTC(2026, 8, day)));
}

export const dashboardCopy = {
  "pt-BR": {
    service: "Produtos & software",
    description: "Software pensado para simplificar processos, organizar informação e acompanhar a operação.",
    territories: "Plataformas · Dashboards · Sistemas internos · Produtos digitais",
    open: "Abrir produto", replay: "Rever construção", overview: "Visão geral", context: "Operação digital",
    period: "Período", last30: "Últimos 30 dias", last7: "Últimos 7 dias", compared: "vs. período anterior",
    metrics: ["Receita", "Usuários ativos", "Conversão", "Retenção"],
    chart: "Receita diária", current: "Período atual", previous: "Período anterior", comparison: "Mostrar comparação",
    chartHelp: "Use as setas para explorar os dias. Home e End acessam o primeiro e último dia.",
    sources: "Origem dos usuários", sourceLabels: ["Direto", "Orgânico", "Referral", "Campanhas"],
    activity: "Atividade recente", activityCount: "30 set · 3 eventos", activityStatus: "Concluído",
    activities: [
      { title: "Pagamento confirmado", detail: "Fatura #4829 · R$ 1.240", time: "14:32", mark: "↗" },
      { title: "Novo workspace", detail: "Workspace 018 · Plano Pro", time: "14:18", mark: "+" },
      { title: "Relatório atualizado", detail: "Receita · Setembro 2026", time: "14:02", mark: "✓" },
    ],
    summary: "Dados demonstrativos de uma operação digital. Não representam resultados da Side ou de clientes.",
    table: "Explorar dados", day: "Dia", daily: "Receita diária", tableCaption: "Série demonstrativa em reais (BRL)",
    footer: "Valores em BRL", total: "Total no período",
  },
  en: {
    service: "Products & software",
    description: "Software designed to simplify processes, organize information and keep operations moving.",
    territories: "Platforms · Dashboards · Internal systems · Digital products",
    open: "Open product", replay: "Replay reveal", overview: "Overview", context: "Digital operations",
    period: "Date range", last30: "Last 30 days", last7: "Last 7 days", compared: "vs. previous period",
    metrics: ["Revenue", "Active users", "Conversion", "Retention"],
    chart: "Daily revenue", current: "Current period", previous: "Previous period", comparison: "Show comparison",
    chartHelp: "Use arrow keys to explore days. Home and End select the first and last day.",
    sources: "User acquisition", sourceLabels: ["Direct", "Organic", "Referral", "Campaigns"],
    activity: "Recent activity", activityCount: "Sep 30 · 3 events", activityStatus: "Completed",
    activities: [
      { title: "Payment confirmed", detail: "Invoice #4829 · R$ 1,240", time: "14:32", mark: "↗" },
      { title: "New workspace", detail: "Workspace 018 · Pro plan", time: "14:18", mark: "+" },
      { title: "Report updated", detail: "Revenue · September 2026", time: "14:02", mark: "✓" },
    ],
    summary: "Demo data for a digital operation. These are not results from Side or its clients.",
    table: "Explore data", day: "Day", daily: "Daily revenue", tableCaption: "Demo time series in Brazilian reais (BRL)",
    footer: "Values in BRL", total: "Period total",
  },
} as const;
