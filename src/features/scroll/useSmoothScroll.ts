"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function useSmoothScroll(active: boolean) {
  useGSAP(() => {
    if (!active) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 801px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const position = { y: window.scrollY };
      let target = position.y;
      let moving = false;
      const move = gsap.quickTo(position, "y", {
        duration: 0.6,
        ease: "power3.out",
        onUpdate: () => window.scrollTo({ top: position.y, behavior: "instant" }),
        onComplete: () => { moving = false; },
      });
      function stop() {
        move.tween.pause();
        moving = false;
        position.y = target = window.scrollY;
      }
      function nativeArea(element: Element | null) {
        if (element?.closest("input, textarea, select, [contenteditable], [data-native-scroll]")) return true;
        for (let node = element; node && node !== document.body && node !== document.documentElement; node = node.parentElement) {
          if (node.scrollHeight <= node.clientHeight + 1) continue;
          if (/auto|scroll/.test(getComputedStyle(node).overflowY)) return true;
        }
        return false;
      }
      function wheel(event: WheelEvent) {
        const element = event.target instanceof Element ? event.target : null;
        if (!event.cancelable || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || nativeArea(element)) {
          stop(); return;
        }
        const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
        if (!delta) return;
        const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
        if (!moving || (target - window.scrollY) * delta < 0) stop();
        const next = gsap.utils.clamp(0, max, target + delta);
        if (next === window.scrollY && !moving) return;
        event.preventDefault();
        target = next;
        moving = true;
        move(target, window.scrollY);
      }
      function key(event: KeyboardEvent) {
        if (["Tab", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Escape"].includes(event.key)) stop();
      }
      window.addEventListener("wheel", wheel, { passive: false });
      window.addEventListener("keydown", key);
      window.addEventListener("pointerdown", stop, { passive: true });
      window.addEventListener("touchstart", stop, { passive: true });
      window.addEventListener("focusin", stop);
      window.addEventListener("resize", stop);
      window.addEventListener("blur", stop);
      window.addEventListener("hashchange", stop);
      return () => {
        move.tween.kill();
        window.removeEventListener("wheel", wheel);
        window.removeEventListener("keydown", key);
        window.removeEventListener("pointerdown", stop);
        window.removeEventListener("touchstart", stop);
        window.removeEventListener("focusin", stop);
        window.removeEventListener("resize", stop);
        window.removeEventListener("blur", stop);
        window.removeEventListener("hashchange", stop);
      };
    });
    return () => media.revert();
  }, { dependencies: [active], revertOnUpdate: true });
}
