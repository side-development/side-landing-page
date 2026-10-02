"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function corrupt(text: string, offset: number) {
  const letters = Array.from(text);
  const positions = letters.flatMap((letter, index) => /\p{L}/u.test(letter) ? [index] : []);
  const start = offset % positions.length;
  ["_", "0", "_"].forEach((character, index) => {
    letters[positions[(start + index * 3) % positions.length]] = character;
  });
  return letters.join("");
}

export function useFinalHeroMotion(section: RefObject<HTMLElement | null>, visible: boolean) {
  useGSAP(() => {
    if (!visible || !section.current) return;
    const root = section.current;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const originals = Array.from(root.querySelectorAll<HTMLElement>("[data-support-text]"));
      const glitches = Array.from(root.querySelectorAll<HTMLElement>("[data-support-glitch]"));
      const copy = originals.map(element => element.textContent!);
      let timer: number;
      let pulse: gsap.core.Timeline | undefined;
      let index = 0;

      function queue() { timer = window.setTimeout(run, gsap.utils.random(8, 14) * 1000); }
      function run() {
        pulse?.kill();
        const target = index++ % originals.length;
        const offset = Math.floor(gsap.utils.random(0, copy[target].length));
        pulse = gsap.timeline({ onComplete: queue })
          .set(originals[target], { opacity: 0 })
          .set(glitches[target], { opacity: 1, textContent: corrupt(copy[target], offset) })
          .set(glitches[target], { textContent: corrupt(copy[target], offset + 2) }, 0.22)
          .set(glitches[target], { opacity: 0, textContent: "" }, 0.68)
          .set(originals[target], { opacity: 1 }, 0.68);
      }
      queue();
      return () => {
        window.clearTimeout(timer);
        pulse?.kill();
        originals.forEach(element => element.style.removeProperty("opacity"));
        glitches.forEach(element => { element.style.removeProperty("opacity"); element.textContent = ""; });
      };
    });

    media.add({ pointer: "(hover: hover) and (pointer: fine)", reduced: "(prefers-reduced-motion: reduce)" }, context => {
      if (!context.conditions?.pointer) return;
      const brand = root.querySelector<SVGSVGElement>("[data-wordmark]")!;
      const heading = root.querySelector<HTMLElement>("h1")!;
      const light = brand.querySelector<SVGRectElement>("[data-brand-light]")!;
      const gradient = brand.querySelector<SVGRadialGradientElement>("[data-brand-gradient]")!;
      const reduced = context.conditions.reduced;
      let bounds: DOMRect;
      const x = gsap.quickTo(heading, "x", { duration: 0.6, ease: "power3.out" });
      const y = gsap.quickTo(heading, "y", { duration: 0.6, ease: "power3.out" });
      const rx = gsap.quickTo(heading, "rotationX", { duration: 0.6, ease: "power3.out" });
      const ry = gsap.quickTo(heading, "rotationY", { duration: 0.6, ease: "power3.out" });
      const lighting = gsap.quickTo(light, "opacity", { duration: 0.3 });
      if (!reduced) gsap.set(heading, { transformPerspective: 1000 });

      function move(event: PointerEvent) {
        if (!bounds) return;
        const px = gsap.utils.clamp(0, 1, (event.clientX - bounds.left) / bounds.width);
        const py = gsap.utils.clamp(0, 1, (event.clientY - bounds.top) / bounds.height);
        gradient.setAttribute("cx", String(px * 1654));
        gradient.setAttribute("cy", String(py * 687));
        if (!reduced) { x((px - 0.5) * 10); y((py - 0.5) * 6); rx((0.5 - py) * 2); ry((px - 0.5) * 2); }
      }
      function enter(event: PointerEvent) {
        bounds = brand.getBoundingClientRect();
        move(event);
        if (reduced) light.style.opacity = "1";
        else lighting(1);
      }
      function leave() {
        if (reduced) light.style.opacity = "0";
        else { lighting(0); x(0); y(0); rx(0); ry(0); }
      }
      brand.addEventListener("pointerenter", enter);
      brand.addEventListener("pointermove", move);
      brand.addEventListener("pointerleave", leave);
      return () => {
        brand.removeEventListener("pointerenter", enter);
        brand.removeEventListener("pointermove", move);
        brand.removeEventListener("pointerleave", leave);
        [x, y, rx, ry, lighting].forEach(tween => tween.tween.kill());
        heading.style.removeProperty("transform");
        light.style.removeProperty("opacity");
      };
    });
    return () => media.revert();
  }, { scope: section, dependencies: [visible], revertOnUpdate: true });
}
