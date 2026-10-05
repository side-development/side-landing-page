"use client";

import { useId, useRef, useState } from "react";
import { dashboardCopy, date, getDashboardData, money, number, type DashboardLocale, type DashboardPeriod } from "./dashboardData";
import { RevenueChart } from "./RevenueChart";
import { useDashboardMotion } from "./useDashboardMotion";
import styles from "./dashboard.module.css";

export function ProductDashboardDemo({ locale, active = true }: { locale: DashboardLocale; active?: boolean }) {
  const copy = dashboardCopy[locale];
  const [period, setPeriod] = useState<DashboardPeriod>(30);
  const [replay, setReplay] = useState(0);
  const root = useRef<HTMLElement>(null);
  const id = useId();
  const data = getDashboardData(period);
  useDashboardMotion(root, locale, period, replay, active);
  const metrics = [
    { value: data.total, prefix: "R$", decimals: 0, change: data.revenueChange, unit: "%" },
    { value: data.users, prefix: "", decimals: 0, change: data.usersChange, unit: "%" },
    { value: data.conversion, prefix: "", decimals: 1, change: data.conversionChange, unit: "pp", suffix: "%" },
    { value: data.retention, prefix: "", decimals: 1, change: data.retentionChange, unit: "pp", suffix: "%" },
  ];

  return <div className={styles.demo} data-product-demo>
    <div className={styles.affordance}>
      <button type="button" onClick={() => setReplay(value => value + 1)} aria-label={copy.replay} aria-controls={id}>{copy.open}<span aria-hidden="true">↗</span></button>
    </div>
    <article ref={root} id={id} className={styles.dashboard} data-dashboard aria-labelledby={`${id}-heading`} aria-describedby={`${id}-disclaimer`}>
      <header className={styles.header} data-dashboard-shell>
        <div><p className={styles.context}><i aria-hidden="true" />{copy.context}</p><h3 id={`${id}-heading`}>{copy.overview}</h3></div>
        <div className={styles.controls}>
          <span className={styles.demoLabel}>Demo data</span>
          <label className={styles.period}><span className={styles.srOnly}>{copy.period}</span><svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" /><path d="M6 2v4m8-4v4M3 8h14" stroke="currentColor" /></svg><select value={period} onChange={event => setPeriod(Number(event.target.value) as DashboardPeriod)}><option value="30">{copy.last30}</option><option value="7">{copy.last7}</option></select></label>
        </div>
      </header>
      <p id={`${id}-disclaimer`} className={styles.srOnly}>{copy.summary}</p>
      <dl className={styles.metrics}>
        {metrics.map((metric, index) => <div key={copy.metrics[index]} className={styles.metric} data-dashboard-metric>
          <dt>{copy.metrics[index]}</dt>
          <dd className={styles.value}><span className={styles.srOnly}>{metric.prefix ? money(metric.value, locale) : `${number(metric.value, locale, metric.decimals)}${metric.suffix ?? ""}`}</span><span className={styles.visualValue} aria-hidden="true">{metric.prefix && <small>{metric.prefix}</small>}<span data-dashboard-counter data-value={metric.value} data-decimals={metric.decimals}>{number(metric.value, locale, metric.decimals)}</span>{metric.suffix && <small className={styles.suffix}>{metric.suffix}</small>}</span></dd>
          <dd className={styles.change}><span>{metric.change >= 0 ? "+" : ""}{number(metric.change, locale, 1)}{metric.unit}</span><span>{copy.compared}</span></dd>
        </div>)}
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
        <details className={styles.dataTable}>
          <summary>{copy.table}<span aria-hidden="true">↗</span></summary>
          <table><caption>{copy.tableCaption}</caption><thead><tr><th scope="col">{copy.day}</th><th scope="col">{copy.daily}</th><th scope="col">{copy.previous}</th></tr></thead><tbody>{data.points.map(point => <tr key={point.day}><th scope="row">{date(point.day, locale)}</th><td>{money(point.value, locale)}</td><td>{money(point.previous, locale)}</td></tr>)}</tbody></table>
        </details>
      </footer>
    </article>
  </div>;
}
