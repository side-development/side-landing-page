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
        x: gsap.quickTo(sheet, "x", { duration: 0.8, ease: "power3.out" }),
        y: gsap.quickTo(sheet, "y", { duration: 0.8, ease: "power3.out" }),
        ry: gsap.quickTo(sheet, "rotationY", { duration: 0.9, ease: "power3.out" }),
      }));
      gsap.set(sheets, { transformPerspective: 1100 });
      function enter(event: PointerEvent) {
        if (event.pointerType !== "mouse") return;
        movers.forEach((motion, index) => {
          const direction = index === 0 ? -1 : 1;
          motion.x(direction * 18); motion.y(direction * 4); motion.ry(direction * 10);
        });
      }
      function leave() { movers.forEach(motion => { motion.x(0); motion.y(0); motion.ry(0); }); }
      node.addEventListener("pointerenter", enter);
      node.addEventListener("pointerleave", leave);
      return () => {
        node.removeEventListener("pointerenter", enter);
        node.removeEventListener("pointerleave", leave);
        movers.forEach(motion => Object.values(motion).forEach(tween => tween.tween.kill()));
      };
    });
    return () => match.revert();
  }, { scope: media, dependencies: [active], revertOnUpdate: true });
}
