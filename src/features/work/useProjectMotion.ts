"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function useProjectMotion(media: RefObject<HTMLAnchorElement | null>, active: boolean) {
  useGSAP(() => {
    if (!active || !media.current) return;
    const node = media.current;
    const match = gsap.matchMedia();
    match.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const sheets = Array.from(node.querySelectorAll<HTMLElement>("[data-sheet]"));
      const movers = sheets.map(sheet => ({
        x: gsap.quickTo(sheet, "x", { duration: 0.65, ease: "power3.out" }),
        y: gsap.quickTo(sheet, "y", { duration: 0.65, ease: "power3.out" }),
        rx: gsap.quickTo(sheet, "rotationX", { duration: 0.75, ease: "power3.out" }),
        ry: gsap.quickTo(sheet, "rotationY", { duration: 0.75, ease: "power3.out" }),
      }));
      gsap.set(sheets, { transformPerspective: 1100 });
      let bounds: DOMRect | undefined;
      function move(event: PointerEvent) {
        if (event.pointerType !== "mouse" || !bounds) return;
        const x = gsap.utils.clamp(-0.5, 0.5, (event.clientX - bounds.left) / bounds.width - 0.5);
        const y = gsap.utils.clamp(-0.5, 0.5, (event.clientY - bounds.top) / bounds.height - 0.5);
        movers.forEach((motion, index) => {
          const depth = index === 0 ? 0.55 : 1;
          motion.x(x * 32 * depth); motion.y(y * 22 * depth);
          motion.rx(-y * 7 * depth); motion.ry(x * 9 * depth);
        });
      }
      function enter(event: PointerEvent) { bounds = node.getBoundingClientRect(); move(event); }
      function leave() { movers.forEach(motion => { motion.x(0); motion.y(0); motion.rx(0); motion.ry(0); }); }
      function resize() { bounds = undefined; leave(); }
      node.addEventListener("pointerenter", enter);
      node.addEventListener("pointermove", move);
      node.addEventListener("pointerleave", leave);
      window.addEventListener("resize", resize);
      return () => {
        node.removeEventListener("pointerenter", enter);
        node.removeEventListener("pointermove", move);
        node.removeEventListener("pointerleave", leave);
        window.removeEventListener("resize", resize);
        movers.forEach(motion => Object.values(motion).forEach(tween => tween.tween.kill()));
      };
    });
    return () => match.revert();
  }, { scope: media, dependencies: [active], revertOnUpdate: true });
}
