"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { number, type DashboardLocale, type DashboardPeriod } from "./dashboardData";

gsap.registerPlugin(useGSAP);

export function useDashboardMotion(root: RefObject<HTMLElement | null>, locale: DashboardLocale, period: DashboardPeriod, replay: number, active: boolean) {
  const revealed = useRef(false);
  const lastReplay = useRef(replay);

  useGSAP(() => {
    const node = root.current;
    if (!node) return;
    const media = gsap.matchMedia();
    const counters = [...node.querySelectorAll<HTMLElement>("[data-dashboard-counter]")];
    const restoreCounters = () => counters.forEach(counter => {
      counter.textContent = number(Number(counter.dataset.value), locale, Number(counter.dataset.decimals));
    });
    const replayRequested = lastReplay.current !== replay;
    lastReplay.current = replay;

    media.add("(prefers-reduced-motion: reduce)", () => {
      node.dataset.animation = "settled";
      restoreCounters();
      revealed.current = true;
    });
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (!active || (revealed.current && !replayRequested)) {
        node.dataset.animation = "settled";
        restoreCounters();
        return;
      }
      const shell = node.querySelectorAll("[data-dashboard-shell]");
      const metrics = node.querySelectorAll("[data-dashboard-metric]");
      const chart = node.querySelector("[data-dashboard-chart]");
      const lines = node.querySelectorAll("[data-dashboard-line]");
      const sources = node.querySelectorAll("[data-dashboard-bar]");
      const rows = node.querySelectorAll("[data-dashboard-row]");
      node.dataset.animation = "waiting";
      node.inert = true;
      const timeline = gsap.timeline({ paused: true, defaults: { ease: "power2.out" }, onStart: () => { node.dataset.animation = "playing"; }, onComplete: () => { node.dataset.animation = "settled"; node.inert = false; revealed.current = true; } });
      timeline.from(node, { opacity: 0, scale: 0.97, y: 14, duration: 0.8 })
        .from(shell, { opacity: 0, y: 8, duration: 0.55, stagger: 0.08 }, 0.35)
        .from(metrics, { opacity: 0, y: 12, duration: 0.65, stagger: 0.1 }, 0.65);
      counters.forEach((counter, index) => {
        const value = { amount: 0 };
        counter.textContent = number(0, locale, Number(counter.dataset.decimals));
        timeline.to(value, { amount: Number(counter.dataset.value), duration: 1.25, onUpdate: () => { counter.textContent = number(value.amount, locale, Number(counter.dataset.decimals)); } }, 0.8 + index * 0.1);
      });
      timeline.from(chart, { opacity: 0, duration: 0.5 }, 1.2)
        .fromTo(lines, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.45, stagger: 0.15, ease: "power2.inOut", clearProps: "strokeDasharray,strokeDashoffset" }, 1.3)
        .from(sources, { scaleX: 0, transformOrigin: "left center", duration: 0.7, stagger: 0.1 }, 1.9)
        .from(rows, { opacity: 0, y: 6, duration: 0.45, stagger: 0.09 }, 2.3);
      let visible = false;
      let started = false;
      function sync() {
        if (visible && !document.hidden && !timeline.isActive() && timeline.progress() < 1) {
          started = true;
          timeline.play();
        } else if (!visible || document.hidden) timeline.pause();
      }
      const observer = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        sync();
      }, { threshold: Math.min(0.18, window.innerHeight / node.offsetHeight * 0.25) });
      observer.observe(node);
      document.addEventListener("visibilitychange", sync);
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", sync);
        timeline.kill();
        node.inert = false;
        if (started) revealed.current = true;
        restoreCounters();
        delete node.dataset.animation;
      };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [locale, period, replay, active], revertOnUpdate: true });
}
