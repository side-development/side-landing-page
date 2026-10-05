"use client";

import { useId, useRef, useState } from "react";
import { dashboardCopy, getDashboardData, money, number, type DashboardLocale, type DashboardPeriod } from "./dashboardData";
import { DashboardPeriodSelect } from "./DashboardPeriodSelect";
import { DashboardMetric } from "./DashboardMetric";
import { DashboardDataModal } from "./DashboardDataModal";
import { RevenueChart } from "./RevenueChart";
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
          <span className={styles.demoLabel}>Demo data</span>
          <DashboardPeriodSelect period={period} locale={locale} onChange={setPeriod} />
        </div>
      </header>
      <p id={`${id}-disclaimer`} className={styles.srOnly}>{copy.summary}</p>
      <dl className={styles.metrics}>
        {metrics.map((metric, index) => <DashboardMetric key={`${period}-${index}`} metric={metric} label={copy.metrics[index]} compared={copy.compared} locale={locale} />)}
      </dl>
      <div className={styles.body}>
        <div className={styles.analytics}>
          <RevenueChart key={period} points={data.points} locale={locale} enabled={active} />
          <section className={styles.sources} aria-labelledby={`${id}-sources`}>
            <div className={styles.sectionHeading} data-dashboard-shell><h4 id={`${id}-sources`}>{copy.sources}</h4><span>{number(data.users, locale)} {copy.metrics[1].toLowerCase()}</span></div>
            <ul>{data.sources.map((share, index) => <li key={index} data-dashboard-row><div><span>{copy.sourceLabels[index]}</span><strong>{share}%</strong></div><div className={styles.barTrack} aria-hidden="true"><div className={styles.bar} data-dashboard-bar style={{ width: `${share / 38 * 100}%`, opacity: 1 - index * 0.18 }} /></div></li>)}</ul>
          </section>
        </div>
        <section className={styles.activity} aria-labelledby={`${id}-activity`}>
          <div className={styles.sectionHeading} data-dashboard-shell><h4 id={`${id}-activity`}>{copy.activity}</h4></div>
          <p className={styles.activityCount} data-dashboard-shell>{copy.activityCount}</p>
          <ol>{copy.activities.map(item => <li key={item.title} data-dashboard-row><span className={styles.activityMark} aria-hidden="true">{item.mark}</span><div><p>{item.title}</p><span>{item.detail}</span><small><i aria-hidden="true" />{copy.activityStatus}</small></div><time dateTime={`2026-09-30T${item.time}:00-03:00`}>{item.time}</time></li>)}</ol>
          <div className={styles.activityNote} data-dashboard-shell><span aria-hidden="true">↗</span><p>{copy.total}<strong>{money(data.total, locale)}</strong></p></div>
        </section>
      </div>
      <footer className={styles.footer} data-dashboard-shell>
        <span>{copy.footer}<i aria-hidden="true">·</i>Demo data</span>
        <button type="button" className={styles.explore} aria-haspopup="dialog" onClick={() => setModal(true)}>{copy.table}<span aria-hidden="true">↗</span></button>
      </footer>
      {modal && <DashboardDataModal data={data} locale={locale} dashboard={root} onClose={() => setModal(false)} />}
    </article>
  </div>;
}
