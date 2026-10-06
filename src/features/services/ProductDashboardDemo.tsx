"use client";

import { useId, useRef, useState } from "react";
import { dashboardCopy, getDashboardData, type DashboardLocale, type DashboardPeriod } from "./dashboardData";
import { DashboardPeriodSelect } from "./DashboardPeriodSelect";
import { DashboardMetric } from "./DashboardMetric";
import { DashboardDataModal } from "./DashboardDataModal";
import { RevenueChart } from "./RevenueChart";
import { SourceChart } from "./SourceChart";
import { ConversionFlow } from "./ConversionFlow";
import { useDashboardMotion } from "./useDashboardMotion";
import styles from "./dashboard.module.css";

export function ProductDashboardDemo({ locale, active = true }: { locale: DashboardLocale; active?: boolean }) {
  const copy = dashboardCopy[locale];
  const [period, setPeriod] = useState<DashboardPeriod>(30);
  const [modal, setModal] = useState(false);
  const root = useRef<HTMLElement>(null);
  const id = useId();
  const data = getDashboardData(period);
  useDashboardMotion(root, locale, period, active);
  const metrics = [
    { value: data.total, prefix: "R$", decimals: 0, change: data.revenueChange, unit: "%" },
    { value: data.users, prefix: "", decimals: 0, change: data.usersChange, unit: "%" },
    { value: data.conversion, prefix: "", decimals: 1, change: data.conversionChange, unit: "pp", suffix: "%" },
    { value: data.retention, prefix: "", decimals: 1, change: data.retentionChange, unit: "pp", suffix: "%" },
  ];

  return <div className={styles.demo} data-product-demo>
    <article ref={root} id={id} className={styles.dashboard} data-dashboard aria-labelledby={`${id}-heading`} aria-describedby={`${id}-disclaimer`}>
      <header className={styles.header} data-dashboard-shell>
        <div><p className={styles.context}><i aria-hidden="true" />{copy.context}</p><h3 id={`${id}-heading`}>{copy.overview}</h3></div>
        <div className={styles.controls}>
          <DashboardPeriodSelect period={period} locale={locale} onChange={setPeriod} />
        </div>
      </header>
      <p id={`${id}-disclaimer`} className={styles.srOnly}>{copy.summary}</p>
      <dl className={styles.metrics} data-dashboard-metrics>
        {metrics.map((metric, index) => <DashboardMetric key={`${period}-${index}`} metric={metric} label={copy.metrics[index]} compared={copy.compared} locale={locale} />)}
      </dl>
      <div className={styles.body} data-dashboard-panels>
        <RevenueChart key={period} points={data.points} locale={locale} enabled={active} />
        <SourceChart key={`sources-${period}`} data={data} locale={locale} enabled={active} id={`${id}-sources`} />
        <ConversionFlow key={`flow-${period}`} data={data} locale={locale} enabled={active} />
      </div>
      <footer className={styles.footer} data-dashboard-shell>
        <span>{copy.footer}<i aria-hidden="true">·</i>{copy.dataLabel}</span>
        <button type="button" className={styles.explore} aria-haspopup="dialog" onClick={() => setModal(true)}>{copy.table}<span aria-hidden="true">↗</span></button>
      </footer>
      {modal && <DashboardDataModal data={data} locale={locale} dashboard={root} onClose={() => setModal(false)} />}
    </article>
  </div>;
}
