"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { number, type DashboardLocale, type DashboardPeriod } from "./dashboardData";
import { serviceEntrance, serviceRevealDuration } from "./serviceEntrance";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useDashboardMotion(root: RefObject<HTMLElement | null>, locale: DashboardLocale, period: DashboardPeriod, active: boolean) {
  const revealed = useRef(false);

  useGSAP(() => {
    const node = root.current;
    if (!node) return;
    const media = gsap.matchMedia();
    const counters = [...node.querySelectorAll<HTMLElement>("[data-dashboard-counter]")];
    const restoreCounters = () => counters.forEach(counter => {
      counter.textContent = number(Number(counter.dataset.value), locale, Number(counter.dataset.decimals));
    });

    media.add("(prefers-reduced-motion: reduce)", () => {
      node.dataset.animation = "settled";
      restoreCounters();
      revealed.current = true;
    });
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (!active || revealed.current) {
        node.dataset.animation = "settled";
        restoreCounters();
        return;
      }
      const shell = node.querySelectorAll("[data-dashboard-shell]");
      const metrics = node.querySelectorAll("[data-dashboard-metric]");
      const chart = node.querySelector("[data-dashboard-chart]");
      const lines = node.querySelectorAll("[data-dashboard-draw]");
      const sources = node.querySelectorAll("[data-dashboard-bar]");
      const areas = node.querySelectorAll("[data-dashboard-area]");
      const rows = node.querySelectorAll("[data-dashboard-row]");
      node.dataset.animation = "waiting";
      node.inert = true;
      const timeline = gsap.timeline({ paused: true, defaults: { ease: "power2.out" }, onStart: () => { started = true; node.dataset.animation = "playing"; }, onComplete: () => { node.dataset.animation = "settled"; node.inert = false; revealed.current = true; } });
      timeline.fromTo(node, { opacity: 0, y: 12, filter: "blur(12px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: serviceRevealDuration, ease: "sine.out", clearProps: "filter" })
        .from(shell, { opacity: 0, y: 8, duration: 0.75, stagger: 0.08 }, 0.55)
        .from(metrics, { opacity: 0, y: 10, duration: 0.85, stagger: 0.1 }, 0.8);
      counters.forEach((counter, index) => {
        const value = { amount: 0 };
        counter.textContent = number(0, locale, Number(counter.dataset.decimals));
        timeline.to(value, { amount: Number(counter.dataset.value), duration: 1.45, onUpdate: () => { counter.textContent = number(value.amount, locale, Number(counter.dataset.decimals)); } }, 1 + index * 0.1);
      });
      timeline.from(chart, { opacity: 0, duration: 0.65 }, 1.35)
        .fromTo(lines, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 1.6, stagger: 0.15, ease: "power2.inOut", clearProps: "strokeDasharray,strokeDashoffset" }, 1.5)
        .from(areas, { attr: { width: 0 }, duration: 1.6, ease: "power2.inOut" }, 1.5)
        .from(sources, { scaleX: 0, transformOrigin: "left center", duration: 0.8, stagger: 0.1 }, 2.1)
        .from(rows, { opacity: 0, y: 6, duration: 0.55, stagger: 0.09 }, 2.5);
      let visible = false;
      let started = false;
      let triggered = false;
      function sync() {
        const running = visible && !document.hidden && node!.dataset.serviceActive !== "false";
        if (triggered && running && !timeline.isActive() && timeline.progress() < 1) {
          timeline.play();
        } else if (!running) timeline.pause();
      }
      const observer = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        sync();
      }, { threshold: Math.min(0.18, window.innerHeight / node.offsetHeight * 0.25) });
      observer.observe(node);
      const readiness = new MutationObserver(sync);
      readiness.observe(node, { attributes: true, attributeFilter: ["data-service-active"] });
      const entrance = ScrollTrigger.create({ ...serviceEntrance(node), once: true, onEnter: () => { triggered = true; sync(); }, onRefresh: self => { if (self.progress > 0) triggered = true; sync(); } });
      document.addEventListener("visibilitychange", sync);
      return () => {
        observer.disconnect();
        readiness.disconnect();
        entrance.kill();
        document.removeEventListener("visibilitychange", sync);
        timeline.kill();
        node.inert = false;
        if (started) revealed.current = true;
        restoreCounters();
        delete node.dataset.animation;
      };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [locale, period, active], revertOnUpdate: true });
}
