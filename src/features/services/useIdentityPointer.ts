"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/** Move an inner layer so pointer interaction never competes with the arrival. */
export function useIdentityPointer(root: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const node = root.current;
    if (!node) return;
    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const logo = node.querySelector<HTMLElement>("[data-identity-logo]")!;
      const layer = logo.querySelector("[data-identity-pointer]");
      const x = gsap.quickTo(layer, "x", { duration: .65, ease: "power3.out" });
      const y = gsap.quickTo(layer, "y", { duration: .65, ease: "power3.out" });
      const rotate = gsap.quickTo(layer, "rotation", { duration: .8, ease: "power3.out" });
      const scaleX = gsap.quickTo(layer, "scaleX", { duration: .65, ease: "power3.out" });
      const scaleY = gsap.quickTo(layer, "scaleY", { duration: .65, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const bounds = logo.getBoundingClientRect();
        const px = (event.clientX - bounds.left) / bounds.width - .5;
        const py = (event.clientY - bounds.top) / bounds.height - .5;
        x(px * 24); y(py * 20); rotate(px * 9); scaleX(1.055); scaleY(1.055);
      };
      const reset = () => { x(0); y(0); rotate(0); scaleX(1); scaleY(1); };
      logo.addEventListener("pointermove", move, { passive: true });
      logo.addEventListener("pointerleave", reset);
      window.addEventListener("blur", reset);
      return () => {
        logo.removeEventListener("pointermove", move); logo.removeEventListener("pointerleave", reset);
        window.removeEventListener("blur", reset);
        [x, y, rotate, scaleX, scaleY].forEach(value => value.tween.kill());
      };
    });
    return () => media.revert();
  }, { scope: root });
}
