"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function useSocialProofMotion(root: RefObject<HTMLElement | null>, count: number, initialIndex: number, active: boolean, onChange: (index: number) => void, onPause: (paused: boolean) => void) {
  const actions = useRef<{ goTo: (index: number) => void; togglePlayback: () => void }>({ goTo: () => {}, togglePlayback: () => {} });

  useGSAP(() => {
    const element = root.current;
    if (!element || !active || !count) return;
    const node: HTMLElement = element;
    const belt = node.querySelector<HTMLElement>("[data-proof-belt]")!;
    const items = [...node.querySelectorAll<HTMLElement>("[data-proof-item]")];
    const feedbacks = items.map(item => item.querySelector<HTMLElement>("[data-proof-feedback]")!);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const offset = Math.min(2, count);
    const logical = (physical: number) => (physical - offset + count) % count;
    let targets: number[] = [];
    let current = Math.max(0, Math.min(count - 1, initialIndex));
    let inViewport = false, interacting = false, focused = false, stopped = false;
    let frame = 0, isAutomatic = false;
    let tween: gsap.core.Tween | undefined;
    let settle: ReturnType<typeof setTimeout> | undefined;
    let pointer: { id: number; x: number; left: number; dragging: boolean } | undefined;

    function nearest() {
      return targets.reduce((closest, target, index) => Math.abs(target - belt.scrollLeft) < Math.abs(targets[closest] - belt.scrollLeft) ? index : closest, offset);
    }
    function smootherstep(value: number) {
      const t = Math.max(0, Math.min(1, value));
      return t * t * t * (t * (t * 6 - 15) + 10);
    }
    function render() {
      frame = 0;
      const next = nearest(), step = targets[1] - targets[0] || belt.clientWidth;
      feedbacks.forEach((feedback, index) => {
        const pixels = Math.abs(targets[index] - belt.scrollLeft);
        const distance = pixels < 1.5 ? 0 : pixels / step;
        // Fade a neighbor before removing it, independent of the active index.
        // At most four text layers are painted during the boundary crossfade.
        if (distance >= 1.6) {
          if (feedback.style.visibility !== "hidden") {
            feedback.style.visibility = "hidden";
            feedback.style.removeProperty("will-change");
          }
          return;
        }
        // Keep a readable focal zone while the belt moves continuously. The
        // neighboring phrases still reach full blur/depth outside that zone.
        // Zero slope/acceleration at each end avoids a hard blur onset or stop.
        const treatment = smootherstep((distance - .28) / .72);
        const edgeFade = 1 - smootherstep((distance - 1) / .6);
        if (feedback.style.visibility !== "visible") feedback.style.visibility = "visible";
        const hint = reduced.matches ? "opacity" : "transform, opacity, filter";
        if (feedback.style.willChange !== hint) feedback.style.willChange = hint;
        feedback.style.setProperty("--proof-opacity", String((1 - .56 * treatment) * edgeFade));
        feedback.style.setProperty("--proof-blur", `${reduced.matches ? 0 : 24 * treatment}px`);
        feedback.style.setProperty("--proof-scale", String(1 - .18 * treatment));
        feedback.style.setProperty("--proof-depth", `${16 * treatment}px`);
      });
      const nextLogical = logical(next);
      if (current !== nextLogical) { current = nextLogical; onChange(current); }
      if (node.getAttribute("data-proof-active") !== String(current)) node.setAttribute("data-proof-active", String(current));
    }
    function schedule() { if (inViewport && !frame) frame = requestAnimationFrame(render); }
    function normalize() {
      const physical = nearest(), canonical = logical(physical) + offset;
      if (physical !== canonical) {
        belt.setAttribute("data-driving", "true");
        belt.scrollLeft = targets[canonical];
        render();
        belt.removeAttribute("data-driving");
      }
    }
    function syncPlayback() {
      const canRun = inViewport && !document.hidden && !reduced.matches && !interacting && !focused && !stopped;
      node.setAttribute("data-autoplay", reduced.matches ? "reduced" : stopped ? "stopped" : canRun ? "playing" : "paused");
      if (!canRun) { if (isAutomatic) tween?.pause(); return; }
      if (tween) { if (isAutomatic) tween.resume(); return; }
      // Continue from the actual position, including after a drag. No reading
      // delay, hover gate or speed ramp between entries.
      const next = targets.findIndex(target => target > belt.scrollLeft + 1.5);
      moveTo(next < 0 ? offset : next, true);
    }
    function interrupt() {
      interacting = true;
      if (isAutomatic) { tween?.kill(); tween = undefined; isAutomatic = false; belt.removeAttribute("data-driving"); }
      syncPlayback();
    }
    function moveTo(physical: number, automatic = false) {
      tween?.kill(); tween = undefined;
      isAutomatic = automatic;
      const target = Math.max(0, Math.min(items.length - 1, physical));
      if (reduced.matches) {
        belt.scrollLeft = targets[target]; render(); normalize(); isAutomatic = false; return;
      }
      belt.setAttribute("data-driving", "true");
      tween = gsap.to(belt, {
        scrollLeft: targets[target],
        // Twelve seconds per entry; partial journeys use the same px/s speed.
        duration: automatic ? Math.max(.01, Math.abs(targets[target] - belt.scrollLeft) / (targets[1] - targets[0]) * 12) : 1.2,
        ease: automatic ? "none" : "sine.inOut",
        onUpdate: schedule,
        onComplete: () => {
          tween = undefined; isAutomatic = false;
          render(); normalize(); belt.removeAttribute("data-driving"); syncPlayback();
        },
      });
    }
    function goTo(index: number) {
      interrupt(); normalize(); interacting = false;
      const delta = index - current;
      moveTo(Math.abs(delta) === 1 ? nearest() + delta : ((index + count) % count) + offset);
    }
    function measure() {
      node.removeAttribute("data-cursor-active");
      tween?.kill(); tween = undefined; isAutomatic = false;
      const center = belt.clientWidth / 2;
      targets = items.map(item => Math.max(0, item.offsetLeft + item.offsetWidth / 2 - center));
      belt.setAttribute("data-driving", "true");
      belt.scrollLeft = targets[current + offset]; render(); belt.removeAttribute("data-driving");
      syncPlayback();
    }
    function down(event: PointerEvent) {
      if (event.pointerType === "mouse" && (event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey)) return;
      interrupt();
      tween?.kill(); tween = undefined; belt.removeAttribute("data-driving");
      pointer = { id: event.pointerId, x: event.clientX, left: belt.scrollLeft, dragging: false };
      if (event.pointerType !== "mouse") return;
      belt.setPointerCapture(event.pointerId); event.preventDefault();
    }
    function move(event: PointerEvent) {
      if (event.pointerType === "mouse") node.setAttribute("data-cursor-active", "true");
      if (event.pointerType !== "mouse") return;
      if (!pointer || event.pointerId !== pointer.id) return;
      const delta = event.clientX - pointer.x;
      if (!pointer.dragging && Math.abs(delta) < 6) return;
      pointer.dragging = true; belt.setAttribute("data-dragging", "true");
      belt.scrollLeft = pointer.left - delta;
    }
    function release(event: PointerEvent) {
      if (!pointer || event.pointerId !== pointer.id) return;
      const dragged = pointer.dragging; pointer = undefined;
      if (event.pointerType !== "mouse") { queueNativeResume(); return; }
      interacting = false;
      if (dragged) moveTo(nearest());
      belt.removeAttribute("data-dragging");
      if (belt.hasPointerCapture(event.pointerId)) belt.releasePointerCapture(event.pointerId);
      syncPlayback();
    }
    function key(event: KeyboardEvent) {
      const index = event.key === "ArrowRight" ? current + 1 : event.key === "ArrowLeft" ? current - 1 : event.key === "Home" ? 0 : event.key === "End" ? count - 1 : undefined;
      if (index === undefined) return;
      event.preventDefault(); node.removeAttribute("data-cursor-active"); goTo(index);
    }
    function queueNativeResume() {
      if (settle) clearTimeout(settle);
      settle = setTimeout(() => {
        if (pointer) return;
        interacting = false;
        if (inViewport) { normalize(); render(); syncPlayback(); }
      }, 240);
    }
    function wheel(event: WheelEvent) { if (Math.abs(event.deltaX) > 0) { interrupt(); queueNativeResume(); } }
    function scroll() {
      schedule();
      if (!tween && !pointer) queueNativeResume();
    }
    function hideCursor() { node.removeAttribute("data-cursor-active"); }
    function focus() { focused = true; hideCursor(); syncPlayback(); }
    function blur(event: FocusEvent) { if (!node.contains(event.relatedTarget as Node | null)) { focused = false; syncPlayback(); } }
    function preference() { hideCursor(); onPause(stopped || reduced.matches); measure(); }
    function togglePlayback() { stopped = !stopped; onPause(stopped || reduced.matches); syncPlayback(); }

    measure(); onChange(current); onPause(reduced.matches);
    node.setAttribute("data-ready", "true"); actions.current = { goTo, togglePlayback };
    const resize = new ResizeObserver(measure); resize.observe(belt);
    const visibility = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      syncPlayback();
      if (inViewport) schedule();
      else { if (frame) cancelAnimationFrame(frame); frame = 0; if (settle) clearTimeout(settle); }
    });
    visibility.observe(belt);
    belt.addEventListener("scroll", scroll, { passive: true });
    belt.addEventListener("pointerdown", down); belt.addEventListener("pointermove", move);
    belt.addEventListener("pointerup", release); belt.addEventListener("pointercancel", release); belt.addEventListener("lostpointercapture", release);
    belt.addEventListener("keydown", key); belt.addEventListener("wheel", wheel, { passive: true });
    belt.addEventListener("pointerleave", hideCursor);
    node.addEventListener("focusin", focus); node.addEventListener("focusout", blur);
    document.addEventListener("visibilitychange", syncPlayback); reduced.addEventListener("change", preference);
    return () => {
      tween?.kill(); if (settle) clearTimeout(settle);
      resize.disconnect(); visibility.disconnect(); if (frame) cancelAnimationFrame(frame);
      actions.current = { goTo: () => {}, togglePlayback: () => {} };
      belt.removeEventListener("scroll", scroll); belt.removeEventListener("pointerdown", down); belt.removeEventListener("pointermove", move);
      belt.removeEventListener("pointerup", release); belt.removeEventListener("pointercancel", release); belt.removeEventListener("lostpointercapture", release);
      belt.removeEventListener("keydown", key); belt.removeEventListener("wheel", wheel);
      belt.removeEventListener("pointerleave", hideCursor);
      node.removeEventListener("focusin", focus); node.removeEventListener("focusout", blur);
      document.removeEventListener("visibilitychange", syncPlayback); reduced.removeEventListener("change", preference);
      feedbacks.forEach(feedback => ["--proof-opacity", "--proof-blur", "--proof-scale", "--proof-depth", "visibility", "will-change"].forEach(property => feedback.style.removeProperty(property)));
      ["data-ready", "data-proof-active", "data-autoplay", "data-cursor-active"].forEach(attribute => node.removeAttribute(attribute));
      belt.removeAttribute("data-driving"); belt.removeAttribute("data-dragging");
    };
  }, { scope: root, dependencies: [count, initialIndex, active, onChange, onPause], revertOnUpdate: true });

  return { goTo: (index: number) => actions.current.goTo(index), togglePlayback: () => actions.current.togglePlayback() };
}
