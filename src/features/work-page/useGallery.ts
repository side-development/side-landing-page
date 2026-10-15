"use client";

import { useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { defaultTuning, mod, paintSheet, relativeOf, wrap, type BeltTuning } from "./sheetMotion";

gsap.registerPlugin(useGSAP);

/** Slow editorial pace: how long a sheet rests before the belt moves on. */
export const AUTOPLAY_MS = 6800;
const DRAG_THRESHOLD = 6;

type Controls = { next(): void; prev(): void; goTo(index: number): void };
const idle: Controls = { next() {}, prev() {}, goTo() {} };

function readTuning(stage: HTMLElement): BeltTuning {
  const style = getComputedStyle(stage);
  const read = (name: string, fallback: number) => {
    const value = parseFloat(style.getPropertyValue(name));
    return Number.isFinite(value) ? value : fallback;
  };
  return {
    blur: read("--belt-blur", defaultTuning.blur),
    depth: read("--belt-depth", defaultTuning.depth),
    dim: read("--belt-dim", defaultTuning.dim),
  };
}

/**
 * One belt of sheets. `position` is a float: 0 means sheet 0 is centred, 1.5 is halfway
 * between sheets 1 and 2. Drag, arrows, keyboard and autoplay all just move `position`;
 * every sheet derives its own scale/opacity/blur from its distance to it.
 */
export function useGallery(region: RefObject<HTMLElement | null>, count: number) {
  const [index, setIndex] = useState(0);
  const controls = useRef<Controls>(idle);

  useGSAP(() => {
    const root = region.current;
    const stage = root?.querySelector<HTMLElement>("[data-gallery-stage]");
    if (!root || !stage || count < 2) return;

    const sheets = Array.from(stage.querySelectorAll<HTMLElement>("[data-sheet]"));
    const loop = count >= 3;
    const state = { position: 0 };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const flags = { hover: false, focus: false, drag: false, visible: false };
    let tuning = readTuning(stage);
    let reported = 0;
    let tween: gsap.core.Tween | null = null;
    let target = 0;
    let timer: gsap.core.Tween | null = null;

    const limit = (value: number) => (loop ? value : Math.min(count - 1, Math.max(0, value)));

    function render() {
      sheets.forEach((sheet, i) => paintSheet(sheet, relativeOf(i, state.position, count, loop), tuning));
      const current = mod(Math.round(state.position), count);
      if (current !== reported) { reported = current; setIndex(current); }
    }

    function sync() {
      const playing = fine.matches && !reduced.matches && flags.visible && !document.hidden
        && !flags.hover && !flags.focus && !flags.drag && !tween?.isActive();
      if (!playing) { timer?.kill(); timer = null; return; }
      if (!timer) timer = gsap.delayedCall(AUTOPLAY_MS / 1000, () => { timer = null; goTo(mod(reported + 1, count), true); });
    }

    function moveTo(next: number, slow = false) {
      timer?.kill(); timer = null;
      tween?.kill();
      target = limit(next);
      const distance = Math.abs(target - state.position);
      tween = gsap.to(state, {
        position: target,
        duration: reduced.matches ? 0.01 : gsap.utils.clamp(0.55, 1.2, 0.55 + distance * 0.22) + (slow ? 0.35 : 0),
        ease: slow ? "power2.inOut" : "power3.out",
        onUpdate: render,
        onComplete: () => { if (loop) state.position = mod(state.position, count); render(); sync(); },
      });
    }

    function goTo(destination: number, slow = false) {
      const here = state.position;
      moveTo(loop ? here + wrap(destination - here, count) : destination, slow);
    }

    function step(direction: 1 | -1) {
      const base = tween?.isActive() ? target : Math.round(state.position);
      moveTo(base + direction);
    }

    controls.current = { next: () => step(1), prev: () => step(-1), goTo: destination => goTo(destination) };

    // Drag / swipe -------------------------------------------------------------------
    let pointer = -1;
    let startX = 0;
    let startPosition = 0;
    let pitch = 1;
    let dragging = false;
    let moved = false;
    let lastX = 0;
    let lastTime = 0;
    let speed = 0; // belt units per ms

    function down(event: PointerEvent) {
      if (pointer !== -1 || (event.pointerType === "mouse" && event.button !== 0)) return;
      pointer = event.pointerId;
      startX = lastX = event.clientX;
      lastTime = event.timeStamp;
      speed = 0;
      moved = false;
      const gap = parseFloat(getComputedStyle(stage!).getPropertyValue("--sheet-gap")) / 100 || 0;
      pitch = Math.max(1, sheets[0].offsetWidth * (1 + gap));
    }
    function move(event: PointerEvent) {
      if (event.pointerId !== pointer) return;
      const dx = event.clientX - startX;
      if (!dragging) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        dragging = moved = true;
        flags.drag = true;
        tween?.kill();
        startPosition = state.position;
        startX = event.clientX; // measure from where the drag actually began
        stage!.setPointerCapture(pointer);
        stage!.dataset.dragging = "true";
        sync();
        return;
      }
      const elapsed = Math.max(1, event.timeStamp - lastTime);
      speed = (-(event.clientX - lastX) / pitch) / elapsed * 0.6 + speed * 0.4;
      lastX = event.clientX;
      lastTime = event.timeStamp;
      const raw = startPosition - (event.clientX - startX) / pitch;
      // Without a loop the ends resist instead of stopping dead.
      state.position = loop ? raw : raw < 0 ? raw * 0.35 : raw > count - 1 ? count - 1 + (raw - (count - 1)) * 0.35 : raw;
      render();
    }
    function up(event: PointerEvent) {
      if (event.pointerId !== pointer) return;
      pointer = -1;
      if (!dragging) return;
      dragging = false;
      flags.drag = false;
      delete stage!.dataset.dragging;
      if (stage!.hasPointerCapture(event.pointerId)) stage!.releasePointerCapture(event.pointerId);
      const projected = state.position + gsap.utils.clamp(-0.9, 0.9, speed * 450);
      moveTo(Math.round(projected));
      // The click that follows a drag must not open the case or select a neighbour.
      setTimeout(() => { moved = false; }, 0);
    }
    function swallow(event: MouseEvent) {
      if (!moved) return;
      event.preventDefault();
      event.stopPropagation();
    }

    // Autoplay gates & cursor --------------------------------------------------------
    const enter = (event: PointerEvent) => { if (event.pointerType === "mouse") { flags.hover = true; sync(); } };
    const leave = (event: PointerEvent) => { if (event.pointerType === "mouse") { flags.hover = false; sync(); } };
    const stageEnter = (event: PointerEvent) => { if (event.pointerType === "mouse") stage.setAttribute("data-cursor-active", "true"); };
    const stageLeave = (event: PointerEvent) => { if (event.pointerType === "mouse") stage.removeAttribute("data-cursor-active"); };
    const focusIn = (event: FocusEvent) => {
      // Only keyboard focus pauses; a mouse click on an arrow must not stall the belt forever.
      if (event.target instanceof Element && event.target.matches(":focus-visible")) { flags.focus = true; sync(); }
    };
    const focusOut = (event: FocusEvent) => {
      if (event.relatedTarget instanceof Node && root.contains(event.relatedTarget)) return;
      flags.focus = false; sync();
    };
    const observer = new IntersectionObserver(entries => {
      flags.visible = entries[0].isIntersecting;
      sync();
    }, { threshold: 0.35 });
    observer.observe(root);
    const resize = new ResizeObserver(() => { tuning = readTuning(stage); render(); });
    resize.observe(stage);
    const environment = () => sync();

    stage.addEventListener("pointerdown", down);
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);
    stage.addEventListener("click", swallow, true);
    stage.addEventListener("pointerenter", stageEnter);
    stage.addEventListener("pointerleave", stageLeave);
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);
    root.addEventListener("focusin", focusIn);
    root.addEventListener("focusout", focusOut);
    document.addEventListener("visibilitychange", environment);
    reduced.addEventListener("change", environment);
    fine.addEventListener("change", environment);
    render();

    return () => {
      controls.current = idle;
      tween?.kill();
      timer?.kill();
      observer.disconnect();
      resize.disconnect();
      stage.removeAttribute("data-cursor-active");
      stage.removeEventListener("pointerdown", down);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerup", up);
      stage.removeEventListener("pointercancel", up);
      stage.removeEventListener("click", swallow, true);
      stage.removeEventListener("pointerenter", stageEnter);
      stage.removeEventListener("pointerleave", stageLeave);
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
      root.removeEventListener("focusin", focusIn);
      root.removeEventListener("focusout", focusOut);
      document.removeEventListener("visibilitychange", environment);
      reduced.removeEventListener("change", environment);
      fine.removeEventListener("change", environment);
    };
  }, { scope: region, dependencies: [count] });

  return {
    index,
    next: () => controls.current.next(),
    prev: () => controls.current.prev(),
    goTo: (destination: number) => controls.current.goTo(destination),
  };
}
