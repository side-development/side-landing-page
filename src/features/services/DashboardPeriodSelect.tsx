"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { dashboardCopy, type DashboardLocale, type DashboardPeriod } from "./dashboardData";
import styles from "./dashboard.module.css";

export function DashboardPeriodSelect({ period, locale, onChange }: { period: DashboardPeriod; locale: DashboardLocale; onChange: (period: DashboardPeriod) => void }) {
  const copy = dashboardCopy[locale];
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();
  const options = [{ value: 30 as const, label: copy.last30 }, { value: 7 as const, label: copy.last7 }];

  useEffect(() => {
    if (!open) return;
    root.current?.querySelector<HTMLButtonElement>(`[data-period-option="${period}"]`)?.focus();
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open, period]);

  function close() { setOpen(false); button.current?.focus(); }
  function key(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === "Escape") { event.preventDefault(); close(); return; }
    if (event.key === "Tab") { close(); return; }
    if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("[role='option']")];
    const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const next = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : (current + (event.key === "ArrowUp" ? -1 : 1) + buttons.length) % buttons.length;
    buttons[next]?.focus();
  }

  return <div ref={root} className={styles.periodSelect} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <button ref={button} type="button" className={styles.period} aria-label={`${copy.period}: ${period === 30 ? copy.last30 : copy.last7}`} aria-haspopup="listbox" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)} onKeyDown={event => { if (["ArrowUp", "ArrowDown"].includes(event.key)) { event.preventDefault(); setOpen(true); } }}>
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" /><path d="M6 2v4m8-4v4M3 8h14" stroke="currentColor" /></svg>
      {period === 30 ? copy.last30 : copy.last7}
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={styles.periodChevron}><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.4" /></svg>
    </button>
    {open && <ul id={id} role="listbox" aria-label={copy.period} className={styles.periodOptions} onKeyDown={key}>
      {options.map(option => <li key={option.value} role="none"><button type="button" role="option" aria-selected={period === option.value} tabIndex={period === option.value ? 0 : -1} data-period-option={option.value} onClick={() => { onChange(option.value); close(); }}>{option.label}<span aria-hidden="true">{period === option.value ? "✓" : ""}</span></button></li>)}
    </ul>}
  </div>;
}
