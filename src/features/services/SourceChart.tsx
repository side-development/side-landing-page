"use client";

import { useId, useState, type CSSProperties } from "react";
import { dashboardCopy, number, type DashboardLocale, type getDashboardData } from "./dashboardData";
import styles from "./dashboard.module.css";

const colors = ["#f64b3c", "#f5a12c", "#65bf40", "#a6b6b5"];

export function SourceChart({ data, locale, enabled, id }: { data: ReturnType<typeof getDashboardData>; locale: DashboardLocale; enabled: boolean; id: string }) {
  const copy = dashboardCopy[locale];
  const [preview, setPreview] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const active = preview ?? selected;
  const gradient = useId();
  const angle = (degrees: number) => ({ x: 110 + 82 * Math.cos(degrees * Math.PI / 180), y: 110 + 82 * Math.sin(degrees * Math.PI / 180) });
  const start = angle(-225), end = angle(45);
  const arc = `M${start.x},${start.y} A82,82 0 1,1 ${end.x},${end.y}`;
  const share = active === null ? 100 : data.sources[active];

  return <section className={styles.sources} aria-labelledby={id} data-dashboard-chart>
    <div className={styles.sectionHeading} data-dashboard-shell><h4 id={id}>{copy.sources}</h4><span>{number(data.users, locale)} {copy.metrics[1].toLowerCase()}</span></div>
    <div className={styles.sourceGauge} aria-hidden="true">
      <svg viewBox="0 0 220 178" focusable="false"><defs><linearGradient id={gradient} x1="28" x2="192" y1="0" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#88d33a" /><stop offset="0.42" stopColor="#f3ad2e" /><stop offset="1" stopColor="#ff3538" /></linearGradient><mask id={`${gradient}-reveal`}><path d={arc} fill="none" stroke="white" strokeWidth="8" pathLength="1" data-dashboard-draw /></mask></defs><path d={arc} className={styles.gaugeTrack} /><path d={arc} className={styles.gaugeProgress} pathLength="1" style={{ stroke: active === null ? `url(#${gradient})` : colors[active], strokeDasharray: `${share / 100} 1` }} mask={`url(#${gradient}-reveal)`} /></svg>
      <div><strong>{number(active === null ? data.users : data.sourceUsers[active], locale)}</strong><span>{active === null ? copy.metrics[1] : copy.sourceLabels[active]}</span><small>{share}%</small></div>
    </div>
    <ul>{data.sources.map((share, index) => <li key={index} data-dashboard-row style={{ "--source-color": colors[index] } as CSSProperties}>
      <button type="button" disabled={!enabled} aria-label={`${copy.sourceLabels[index]}: ${share}%, ${number(data.sourceUsers[index], locale)} ${copy.metrics[1].toLowerCase()}`} aria-pressed={selected === index} data-source-active={active === index}
        onPointerEnter={event => { if (event.pointerType === "mouse") setPreview(index); }} onPointerLeave={() => setPreview(null)}
        onFocus={() => setPreview(index)} onBlur={() => setPreview(null)} onClick={() => setSelected(value => value === index ? null : index)}
        onKeyDown={event => { if (event.key === "Escape") { setPreview(null); setSelected(null); } }}>
        <span className={styles.sourceLabel}><span><i aria-hidden="true" />{copy.sourceLabels[index]}</span><strong>{share}%</strong></span>
        <span className={styles.barTrack} aria-hidden="true"><span className={styles.bar} data-dashboard-bar style={{ width: `${share / 38 * 100}%` }} /></span>
      </button>
    </li>)}</ul>
  </section>;
}
