"use client";

import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { dashboardCopy, number, type DashboardLocale, type getDashboardData } from "./dashboardData";
import { chartCurve } from "./chartCurve";
import { useLiveChart } from "./useLiveChart";
import styles from "./dashboard.module.css";

export function ConversionFlow({ data, locale, enabled }: { data: ReturnType<typeof getDashboardData>; locale: DashboardLocale; enabled: boolean }) {
  const copy = dashboardCopy[locale];
  const id = useId();
  const root = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const stages = [
    { label: copy.metrics[1], count: data.users, share: 100 },
    { label: copy.retained, count: Math.round(data.users * data.retention / 100), share: data.retention },
    { label: copy.converted, count: Math.round(data.users * data.conversion / 100), share: data.conversion },
  ];
  const xs = [54, 300, 546], center = 95;
  function band(scale: number, tension = 1) {
    const top = stages.map((stage, index) => ({ x: xs[index], y: center - stage.share * 0.68 * scale }));
    const bottom = stages.map((stage, index) => ({ x: xs[index], y: center + stage.share * 0.68 * scale })).reverse();
    return `${chartCurve(top, tension)} L${bottom[0].x},${bottom[0].y} ${chartCurve(bottom, tension).replace(/^M[^ ]+ /, "")} Z`;
  }
  useLiveChart(root, data.period, tension => root.current?.querySelectorAll<SVGPathElement>("[data-flow-band]").forEach(path => path.setAttribute("d", band(Number(path.dataset.flowBand), tension))));
  function inspect(event: PointerEvent<HTMLDivElement>) {
    if (!enabled) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setSelected(Math.max(0, Math.min(2, Math.round(((event.clientX - bounds.left) / bounds.width * 600 - 54) / 246))));
  }
  function navigate(event: KeyboardEvent<HTMLDivElement>) {
    if (!enabled || !["ArrowLeft", "ArrowRight", "Home", "End", "Escape"].includes(event.key)) return;
    event.preventDefault();
    setSelected(event.key === "Escape" ? null : event.key === "Home" ? 0 : event.key === "End" ? 2 : Math.max(0, Math.min(2, (selected ?? 0) + (event.key === "ArrowLeft" ? -1 : 1))));
  }
  const current = stages[selected ?? 0];

  return <figure ref={root} className={styles.flow} data-dashboard-chart>
    <figcaption className={styles.sectionHeading}><h4>{copy.flow}</h4><span>{copy.flowContext}</span></figcaption>
    <div className={styles.flowLabels}>{stages.map((stage, index) => <button key={stage.label} type="button" disabled={!enabled} aria-pressed={selected === index} onClick={() => setSelected(index)} data-dashboard-row><strong>{number(stage.count, locale)}</strong><span>{stage.label}</span></button>)}</div>
    <div className={styles.flowPlot} role="slider" tabIndex={enabled ? 0 : -1} aria-label={copy.flow} aria-valuemin={0} aria-valuemax={2} aria-valuenow={selected ?? 0} aria-valuetext={`${current.label}: ${number(current.count, locale)}, ${number(current.share, locale, 1)}%`} aria-describedby={`${id}-note`} onPointerMove={inspect} onPointerDown={inspect} onPointerLeave={event => { if (event.pointerType === "mouse") setSelected(null); }} onFocus={() => setSelected(current => current ?? 0)} onBlur={() => setSelected(null)} onKeyDown={navigate}>
      <svg viewBox="0 0 600 190" preserveAspectRatio="none" focusable="false" aria-hidden="true"><defs><linearGradient id={`${id}-gradient`} x1="54" x2="546" y1="0" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#8fe249" /><stop offset="0.47" stopColor="#f5b745" /><stop offset="1" stopColor="#ff4935" /></linearGradient><clipPath id={`${id}-clip`}><rect x="0" y="0" width="600" height="190" data-dashboard-area /></clipPath></defs><g clipPath={`url(#${id}-clip)`}>{[1, 0.8, 0.6].map((scale, index) => <path key={scale} d={band(scale)} fill={`url(#${id}-gradient)`} opacity={[0.13, 0.22, 0.6][index]} data-flow-band={scale} />)}</g>{selected !== null && <g><line x1={xs[selected]} x2={xs[selected]} y1="8" y2="182" className={styles.crosshair} /><circle cx={xs[selected]} cy={center} r="4" className={styles.flowPoint} /></g>}</svg>
      {selected !== null && <div className={styles.flowReadout} aria-hidden="true" style={{ left: `clamp(0px, ${xs[selected] / 600 * 100}%, calc(100% - 80px))` }}>{number(current.share, locale, 1)}%</div>}
    </div>
    <p id={`${id}-note`}>{copy.flowNote}</p>
  </figure>;
}
