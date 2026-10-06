"use client";

import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { dashboardCopy, date, money, number, type DashboardLocale, type getDashboardData } from "./dashboardData";
import { chartCurve } from "./chartCurve";
import { useLiveChart } from "./useLiveChart";
import styles from "./dashboard.module.css";

type Point = ReturnType<typeof getDashboardData>["points"][number];
const plot = { left: 46, right: 680, top: 24, bottom: 214, width: 700, height: 250 };

export function RevenueChart({ points, locale, enabled }: { points: Point[]; locale: DashboardLocale; enabled: boolean }) {
  const copy = dashboardCopy[locale];
  const [selected, setSelected] = useState<number | null>(null);
  const [compare, setCompare] = useState(true);
  const helpId = useId();
  const maskId = useId();
  const root = useRef<HTMLElement>(null);
  const max = Math.ceil(Math.max(...points.flatMap(point => [point.value, point.previous])) / 3000) * 3000;
  const x = (index: number) => plot.left + index / (points.length - 1) * (plot.right - plot.left);
  const y = (value: number) => plot.bottom - value / max * (plot.bottom - plot.top);
  const path = (key: "value" | "previous", tension = 1) => chartCurve(points.map((point, index) => ({ x: x(index), y: y(point[key]) })), tension);
  const index = Math.min(selected ?? points.length - 1, points.length - 1);
  const point = points[index];
  const show = selected !== null && enabled;
  const change = (point.value / point.previous - 1) * 100;
  useLiveChart(root, points.length, tension => {
    root.current?.querySelectorAll<SVGPathElement>("[data-curve-series]").forEach(line => {
      const series = line.dataset.curveSeries as "value" | "previous";
      const d = path(series, tension);
      line.setAttribute("d", line.hasAttribute("data-curve-area") ? `${d} L${plot.right},${plot.bottom} L${plot.left},${plot.bottom} Z` : d);
    });
  });

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

  return <figure ref={root} className={styles.chart} data-dashboard-chart>
    <figcaption className={styles.chartHeader}>
      <div><h4>{copy.chart}</h4><p>{date(points[0].day, locale)} — {date(points.at(-1)!.day, locale)}, 2026</p></div>
      <div className={styles.legend}>
        <span><i />{copy.current}</span>
        <button type="button" aria-label={copy.comparison} aria-pressed={compare} disabled={!enabled} onClick={() => setCompare(value => !value)}><i />{copy.previous}</button>
      </div>
    </figcaption>
    <p id={helpId} className={styles.srOnly}>{copy.chartHelp}</p>
    <div className={styles.plot} role="slider" tabIndex={enabled ? 0 : -1} aria-label={copy.chart} aria-describedby={helpId} aria-valuemin={points[0].day} aria-valuemax={points.at(-1)!.day} aria-valuenow={point.day} aria-valuetext={`${date(point.day, locale)}: ${money(point.value, locale)}; ${copy.previous}: ${money(point.previous, locale)}`} aria-disabled={!enabled} onPointerMove={inspect} onPointerDown={inspect} onPointerLeave={event => { if (event.pointerType === "mouse") setSelected(null); }} onFocus={() => setSelected(current => current ?? points.length - 1)} onBlur={() => setSelected(null)} onKeyDown={navigate}>
      <svg viewBox={`0 0 ${plot.width} ${plot.height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`${maskId}-line`} x1={plot.left} x2={plot.right} y1="0" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#f0ad2c" /><stop offset="0.45" stopColor="#ff842b" /><stop offset="1" stopColor="#ff3835" /></linearGradient>
          <linearGradient id={`${maskId}-area`} x1="0" x2="0" y1={plot.top} y2={plot.bottom} gradientUnits="userSpaceOnUse"><stop stopColor="#ff793e" stopOpacity="0.14" /><stop offset="1" stopColor="#ff793e" stopOpacity="0" /></linearGradient>
          <clipPath id={`${maskId}-area-clip`}><rect x={plot.left} y="0" width={plot.right - plot.left} height={plot.height} data-dashboard-area /></clipPath>
          {(["value", "previous"] as const).map(key => <mask key={key} id={`${maskId}-${key}`} maskUnits="userSpaceOnUse" x="0" y="0" width={plot.width} height={plot.height}><path d={path(key)} fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" pathLength="1" data-dashboard-draw data-curve-series={key} /></mask>)}
        </defs>
        {[0, 1, 2, 3].map(tick => <line key={tick} x1={plot.left} x2={plot.right} y1={y(max * tick / 3)} y2={y(max * tick / 3)} className={styles.gridline} />)}
        <path d={`${path("value")} L${plot.right},${plot.bottom} L${plot.left},${plot.bottom} Z`} fill={`url(#${maskId}-area)`} clipPath={`url(#${maskId}-area-clip)`} data-curve-series="value" data-curve-area />
        {compare && <path d={path("previous")} className={styles.previousLine} data-dashboard-line pathLength="1" mask={`url(#${maskId}-previous)`} data-curve-series="previous" />}
        <path d={path("value")} className={styles.revenueLine} style={{ stroke: `url(#${maskId}-line)` }} data-dashboard-line pathLength="1" mask={`url(#${maskId}-value)`} data-curve-series="value" />
        {show && <g><line x1={x(index)} x2={x(index)} y1={plot.top} y2={plot.bottom} className={styles.crosshair} /><path d={`M${x(index)-3},${plot.top-6}h6l-3,5Z M${x(index)-3},${plot.bottom+6}h6l-3,-5Z`} className={styles.crosshairTip} /><circle cx={x(index)} cy={y(point.value)} r="5" className={styles.chartPoint} />{compare && <circle cx={x(index)} cy={y(point.previous)} r="3" className={styles.previousPoint} />}</g>}
      </svg>
      <div className={styles.yLabels} aria-hidden="true">{[0, 1, 2, 3].map(tick => <span key={tick} style={{ top: `${y(max * tick / 3) / plot.height * 100}%` }}>{tick === 0 ? "0" : `${max * tick / 3000}k`}</span>)}</div>
      <div className={styles.xLabels} aria-hidden="true">{[0, Math.round((points.length - 1) / 2), points.length - 1].map(i => <span key={i}>{date(points[i].day, locale)}</span>)}</div>
      {show && <div className={styles.chartReadout} data-chart-readout aria-hidden="true" style={{ left: `clamp(0px, calc(${x(index) / plot.width * 100}% ${index >= points.length / 2 ? "- 90px" : "+ 8px"}), calc(100% - 82px))`, top: `clamp(2px, calc(${y(point.value) / plot.height * 100}% - 11px), calc(100% - 40px))`, textAlign: index >= points.length / 2 ? "right" : "left" }}>
        <strong>{money(point.value, locale)}</strong>
        {compare && <><span>{money(point.previous, locale)}</span><em data-negative={change < 0}>{change >= 0 ? "+" : ""}{number(change, locale, 1)}%</em></>}
      </div>}
    </div>
  </figure>;
}
