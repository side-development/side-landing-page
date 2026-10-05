"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { money, number, type DashboardLocale } from "./dashboardData";
import styles from "./dashboard.module.css";

export type MetricData = { value: number; prefix: string; decimals: number; change: number; unit: string; suffix?: string };

export function DashboardMetric({ metric, label, compared, locale }: { metric: MetricData; label: string; compared: string; locale: DashboardLocale }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const amount = useRef({ value: metric.value });
  const { contextSafe } = useGSAP({ scope: root });

  function appreciate(hovered: boolean) { contextSafe(() => {
    const node = root.current;
    if (!node || node.closest<HTMLElement>("[data-dashboard]")?.dataset.animation !== "settled") return;
    if (hovered && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    node.dataset.appreciating = String(hovered);
    tween.current?.kill();
    const target = hovered ? metric.unit === "pp" ? Math.min(100, metric.value + metric.change) : metric.value * (1 + metric.change / 100) : metric.value;
    tween.current = gsap.to(amount.current, {
      value: target, duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : hovered ? 0.75 : 0.5, ease: "power2.out",
      onUpdate: () => { if (counter.current) counter.current.textContent = number(amount.current.value, locale, metric.decimals); },
    });
  })(); }

  return <div ref={root} className={styles.metric} data-dashboard-metric onPointerEnter={() => appreciate(true)} onPointerLeave={() => appreciate(false)}>
    <dt>{label}</dt>
    <dd className={styles.value}><span className={styles.srOnly}>{metric.prefix ? money(metric.value, locale) : `${number(metric.value, locale, metric.decimals)}${metric.suffix ?? ""}`}</span><span className={styles.visualValue} aria-hidden="true">{metric.prefix && <small>{metric.prefix}</small>}<span ref={counter} data-dashboard-counter data-value={metric.value} data-decimals={metric.decimals}>{number(metric.value, locale, metric.decimals)}</span>{metric.suffix && <small className={styles.suffix}>{metric.suffix}</small>}</span></dd>
    <dd className={styles.change}><span><svg className={styles.growthArrow} width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 12 12 3M4 3h8v8" stroke="currentColor" strokeWidth="1.5" /></svg>{metric.change >= 0 ? "+" : ""}{number(metric.change, locale, 1)}{metric.unit}</span><span>{compared}</span></dd>
  </div>;
}
