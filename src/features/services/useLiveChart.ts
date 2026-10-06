"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function useLiveChart(root: RefObject<HTMLElement | null>, key: number, update: (tension: number) => void) {
  useGSAP(() => {
    const node = root.current;
    const dashboard = node?.closest<HTMLElement>("[data-dashboard]");
    if (!node || !dashboard) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const phase = { value: 0 };
      const tween = gsap.to(phase, { value: Math.PI * 2, duration: 8, repeat: -1, ease: "none", paused: true, onUpdate: () => update(1 + Math.sin(phase.value) * 0.3) });
      let visible = false;
      function sync() {
        const running = visible && !document.hidden && dashboard!.dataset.animation === "settled" && dashboard!.dataset.serviceActive !== "false";
        tween.paused(!running);
        node!.dataset.liveChart = running ? "playing" : "paused";
      }
      const viewport = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
      const readiness = new MutationObserver(sync);
      viewport.observe(node);
      readiness.observe(dashboard, { attributes: true, attributeFilter: ["data-animation", "data-service-active"] });
      document.addEventListener("visibilitychange", sync);
      return () => {
        viewport.disconnect(); readiness.disconnect();
        document.removeEventListener("visibilitychange", sync);
        tween.kill(); update(1);
        delete node.dataset.liveChart;
      };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [key], revertOnUpdate: true });
}
