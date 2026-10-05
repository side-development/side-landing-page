"use client";

import { useEffect, useId, useRef, type RefObject } from "react";
import { dashboardCopy, date, money, type DashboardLocale, type getDashboardData } from "./dashboardData";
import styles from "./dashboard.module.css";

export function DashboardDataModal({ data, locale, dashboard, onClose }: { data: ReturnType<typeof getDashboardData>; locale: DashboardLocale; dashboard: RefObject<HTMLElement | null>; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  const copy = dashboardCopy[locale];

  useEffect(() => {
    const node = dialog.current;
    const frame = dashboard.current;
    if (!node || !frame) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const overflow = html.style.overflow;
    const gutter = html.style.scrollbarGutter;
    html.style.scrollbarGutter = "stable";
    html.style.overflow = "hidden";
    html.removeAttribute("data-side-cursor");
    document.querySelectorAll<HTMLElement>("[data-side-cursor-visual]").forEach(cursor => { cursor.dataset.visible = "false"; });
    node.showModal();
    function position() {
      const bounds = frame!.getBoundingClientRect();
      const top = Math.max(16, bounds.top);
      const bottom = Math.min(innerHeight - 16, bounds.bottom);
      node!.style.left = `${bounds.left + bounds.width / 2}px`;
      node!.style.top = `${Math.max(node!.offsetHeight / 2 + 16, Math.min(innerHeight - node!.offsetHeight / 2 - 16, (top + bottom) / 2))}px`;
      node!.style.width = `${Math.min(680, bounds.width - 32)}px`;
    }
    position();
    const observer = new ResizeObserver(position);
    observer.observe(frame);
    window.addEventListener("resize", position);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", position);
      node.close();
      html.style.overflow = overflow;
      html.style.scrollbarGutter = gutter;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [dashboard]);

  return <>
    <div className={styles.modalScrim} aria-hidden="true" />
    <dialog ref={dialog} className={styles.dataModal} data-native-cursor aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} onKeyDown={event => {
      if (event.key !== "Tab") return;
      const controls = [...event.currentTarget.querySelectorAll<HTMLElement>("button, [tabindex='0']")];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
    }}>
      <header className={styles.modalHeader}><div><span>Demo data</span><h4 id={`${id}-title`}>{copy.table}</h4><p id={`${id}-description`}>{date(data.points[0].day, locale)} — {date(data.points.at(-1)!.day, locale)}, 2026 · BRL</p></div><button type="button" aria-label={copy.close} autoFocus onClick={onClose}><svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.3" /></svg></button></header>
      <div className={styles.modalScroll} tabIndex={0} aria-label={copy.tableCaption}>
        <table><caption className={styles.srOnly}>{copy.tableCaption}</caption><thead><tr><th scope="col">{copy.day}</th><th scope="col">{copy.daily}</th><th scope="col">{copy.previous}</th></tr></thead><tbody>{data.points.map(point => <tr key={point.day}><th scope="row">{date(point.day, locale)}</th><td>{money(point.value, locale)}</td><td>{money(point.previous, locale)}</td></tr>)}</tbody></table>
      </div>
      <footer className={styles.modalFooter}><span>{copy.total}</span><strong>{money(data.total, locale)}</strong></footer>
    </dialog>
  </>;
}
