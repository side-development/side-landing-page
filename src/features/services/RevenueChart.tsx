"use client";

import { useId, useState, type KeyboardEvent, type PointerEvent } from "react";
import { dashboardCopy, date, money, type DashboardLocale, type getDashboardData } from "./dashboardData";
import styles from "./dashboard.module.css";

type Point = ReturnType<typeof getDashboardData>["points"][number];
const plot = { left: 46, right: 680, top: 24, bottom: 214, width: 700, height: 250 };

export function RevenueChart({ points, locale, enabled }: { points: Point[]; locale: DashboardLocale; enabled: boolean }) {
  const copy = dashboardCopy[locale];
  const [selected, setSelected] = useState<number | null>(null);
  const [compare, setCompare] = useState(true);
  const helpId = useId();
  const max = Math.ceil(Math.max(...points.flatMap(point => [point.value, point.previous])) / 3000) * 3000;
  const x = (index: number) => plot.left + index / (points.length - 1) * (plot.right - plot.left);
  const y = (value: number) => plot.bottom - value / max * (plot.bottom - plot.top);
  const path = (key: "value" | "previous") => points.map((point, index) => `${index ? "L" : "M"}${x(index).toFixed(2)},${y(point[key]).toFixed(2)}`).join(" ");
  const index = Math.min(selected ?? points.length - 1, points.length - 1);
  const point = points[index];
  const show = selected !== null && enabled;

  function inspect(event: PointerEvent<HTMLDivElement>) {
    if (!enabled) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = (event.clientX - bounds.left) / bounds.width * plot.width;
    setSelected(Math.max(0, Math.min(points.length - 1, Math.round((position - plot.left) / (plot.right - plot.left) * (points.length - 1)))));
  }

  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    if (!enabled) return;
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    setSelected(event.key === "Home" ? 0 : event.key === "End" ? points.length - 1 : Math.max(0, Math.min(points.length - 1, index + (["ArrowLeft", "ArrowDown"].includes(event.key) ? -1 : 1))));
  }

  return <figure className={styles.chart} data-dashboard-chart>
    <figcaption className={styles.chartHeader}>
      <div><h4>{copy.chart}</h4><p>{date(points[0].day, locale)} — {date(points.at(-1)!.day, locale)}, 2026</p></div>
      <div className={styles.legend}>
        <span><i />{copy.current}</span>
        <button type="button" aria-label={copy.comparison} aria-pressed={compare} disabled={!enabled} onClick={() => setCompare(value => !value)}><i />{copy.previous}</button>
      </div>
    </figcaption>
    <p id={helpId} className={styles.srOnly}>{copy.chartHelp}</p>
    <div className={styles.plot} role="slider" tabIndex={enabled ? 0 : -1} aria-label={copy.chart} aria-describedby={helpId} aria-valuemin={points[0].day} aria-valuemax={points.at(-1)!.day} aria-valuenow={point.day} aria-valuetext={`${date(point.day, locale)}: ${money(point.value, locale)}; ${copy.previous}: ${money(point.previous, locale)}`} aria-disabled={!enabled} onPointerMove={inspect} onPointerDown={inspect} onPointerLeave={() => setSelected(null)} onFocus={() => setSelected(points.length - 1)} onBlur={() => setSelected(null)} onKeyDown={navigate}>
      <svg viewBox={`0 0 ${plot.width} ${plot.height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
        {[0, 1, 2, 3].map(tick => <line key={tick} x1={plot.left} x2={plot.right} y1={y(max * tick / 3)} y2={y(max * tick / 3)} className={styles.gridline} />)}
        {compare && <path d={path("previous")} className={styles.previousLine} data-dashboard-line pathLength="1" />}
        <path d={path("value")} className={styles.revenueLine} data-dashboard-line pathLength="1" />
        {show && <g><line x1={x(index)} x2={x(index)} y1={plot.top} y2={plot.bottom} className={styles.crosshair} /><circle cx={x(index)} cy={y(point.value)} r="5" className={styles.chartPoint} />{compare && <circle cx={x(index)} cy={y(point.previous)} r="3" className={styles.previousPoint} />}</g>}
      </svg>
      <div className={styles.yLabels} aria-hidden="true">{[0, 1, 2, 3].map(tick => <span key={tick} style={{ top: `${y(max * tick / 3) / plot.height * 100}%` }}>{tick === 0 ? "0" : `${max * tick / 3000}k`}</span>)}</div>
      <div className={styles.xLabels} aria-hidden="true">{[0, Math.round((points.length - 1) / 2), points.length - 1].map(i => <span key={i}>{date(points[i].day, locale)}</span>)}</div>
      {show && <div className={styles.tooltip} aria-hidden="true" style={{ left: `clamp(12px, ${x(index) / plot.width * 100}%, calc(100% - 172px))` }}>
        <p>{date(point.day, locale)}</p><strong>{money(point.value, locale)}</strong>
        {compare && <span>{copy.previous}<b>{money(point.previous, locale)}</b></span>}
      </div>}
    </div>
  </figure>;
}
