"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./cursor.module.css";

gsap.registerPlugin(useGSAP);

export function SideCursor({ active }: { active: boolean }) {
  const cursor = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    function remember(event: PointerEvent) { if (event.pointerType === "mouse") pointer.current = { x: event.clientX, y: event.clientY }; }
    window.addEventListener("pointermove", remember, { passive: true });
    return () => window.removeEventListener("pointermove", remember);
  }, []);

  useGSAP(() => {
    if (!active || !cursor.current) return;
    const node = cursor.current;
    const media = gsap.matchMedia();
    media.add("(min-width: 801px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const label = node.querySelector<HTMLElement>("span")!;
      const x = gsap.quickTo(node, "x", { duration: 0.12, ease: "power2.out" });
      const y = gsap.quickTo(node, "y", { duration: 0.12, ease: "power2.out" });
      let shown = false;

      function hide() {
        shown = false;
        node.dataset.visible = "false";
        document.documentElement.removeAttribute("data-side-cursor");
      }
      function update(target: EventTarget | null) {
        const element = target instanceof Element ? target : null;
        if (!element || element.closest("input, textarea, select, [contenteditable], iframe, [data-native-cursor]")) { hide(); return; }
        const project = element.closest<HTMLElement>("[data-cursor-label]");
        node.dataset.mode = project ? "project" : element.closest("a, button, [role='button']") ? "link" : "normal";
        label.textContent = project?.dataset.cursorLabel ?? "";
        node.dataset.visible = "true";
        document.documentElement.setAttribute("data-side-cursor", "");
      }
      function move(event: PointerEvent) {
        if (event.pointerType !== "mouse") { hide(); return; }
        if (!shown) { gsap.set(node, { x: event.clientX, y: event.clientY }); shown = true; }
        else { x(event.clientX); y(event.clientY); }
        update(event.target);
        node.dataset.edge = event.clientX > innerWidth - 145 ? "right" : "left";
        node.dataset.top = String(event.clientY < 20);
      }
      function scroll() {
        const position = node.getBoundingClientRect();
        if (shown) update(document.elementFromPoint(position.x + position.width / 2, position.y + position.height / 2));
      }
      function key(event: KeyboardEvent) { if (event.key === "Tab") hide(); }
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("scroll", scroll, { passive: true });
      window.addEventListener("blur", hide);
      window.addEventListener("keydown", key);
      document.documentElement.addEventListener("pointerleave", hide);
      if (pointer.current) {
        gsap.set(node, { x: pointer.current.x, y: pointer.current.y });
        shown = true;
        update(document.elementFromPoint(pointer.current.x, pointer.current.y));
      }
      return () => {
        hide();
        x.tween.kill(); y.tween.kill();
        window.removeEventListener("pointermove", move);
        window.removeEventListener("scroll", scroll);
        window.removeEventListener("blur", hide);
        window.removeEventListener("keydown", key);
        document.documentElement.removeEventListener("pointerleave", hide);
      };
    });
    return () => media.revert();
  }, { scope: cursor, dependencies: [active], revertOnUpdate: true });

  return <div ref={cursor} className={styles.cursor} data-side-cursor-visual aria-hidden="true"><i /><span /></div>;
}
