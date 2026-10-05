"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useDigitalExperienceMotion(root: RefObject<HTMLElement | null>, replay: number) {
  const { contextSafe } = useGSAP(() => {
    const node = root.current;
    if (!node) return;
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)", desktop: "(min-width: 801px) and (hover: hover) and (pointer: fine)" }, context => {
      const reduced = context.conditions?.reduced;
      const desktop = context.conditions?.desktop;
      const composed = node.dataset.composed === "true";
      gsap.set(node.querySelector("[data-digital-layout]"), { rotation: composed ? -28 : 0, scale: composed ? .84 : 1, xPercent: composed ? -8 : 0 });
      gsap.set(node.querySelector("[data-digital-type-layout]"), { xPercent: composed ? 3 : 0 });
      const art = node.querySelector("[data-digital-art-scroll]");
      const lines = node.querySelectorAll("[data-digital-line]");
      const detail = node.querySelectorAll("[data-digital-detail]");
      const entrance = gsap.timeline({
        onStart: () => { node.dataset.animation = "playing"; },
        onComplete: () => { node.dataset.animation = "settled"; },
        scrollTrigger: { trigger: node, start: "top 85%", once: true },
      });
      if (reduced) entrance.fromTo(node, { opacity: 0 }, { opacity: 1, duration: .4, clearProps: "opacity" });
      else {
        entrance.fromTo(lines, { yPercent: 115 }, { yPercent: 0, duration: 1.5, stagger: .12, ease: "power3.out" }, 0)
          .fromTo(art, { opacity: 0, scale: .9, rotation: -12 }, { opacity: 1, scale: 1, rotation: 0, duration: 1.8, ease: "power3.out" }, .12)
          .fromTo(detail, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1, stagger: .08, ease: "sine.out" }, .6);
        gsap.to(node.querySelector("[data-digital-reflow]"), {
          rotation: desktop ? 12 : 4, yPercent: desktop ? -10 : -3, scale: desktop ? .92 : .98,
          ease: "none", scrollTrigger: { trigger: node, start: "top 20%", end: "bottom 15%", scrub: .9 },
        });
      }
      if (desktop && !reduced) {
        const pointer = node.querySelector("[data-digital-pointer]");
        const button = node.querySelector<HTMLButtonElement>("[data-digital-action]")!;
        const x = gsap.quickTo(pointer, "x", { duration: .8, ease: "power3.out" });
        const y = gsap.quickTo(pointer, "y", { duration: .8, ease: "power3.out" });
        const angle = gsap.quickTo(pointer, "rotation", { duration: .9, ease: "power3.out" });
        const buttonX = gsap.quickTo(button, "x", { duration: .45, ease: "power3.out" });
        const buttonY = gsap.quickTo(button, "y", { duration: .45, ease: "power3.out" });
        let bounds = node.getBoundingClientRect(), buttonBounds = button.getBoundingClientRect();
        const measure = () => { bounds = node.getBoundingClientRect(); buttonBounds = button.getBoundingClientRect(); };
        const move = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          const px = (event.clientX - bounds.left) / bounds.width - .5;
          const py = (event.clientY - bounds.top) / bounds.height - .5;
          x(px * 30); y(py * 24); angle(px * 7);
          if (button.contains(event.target as Node)) { buttonX((event.clientX - buttonBounds.left - buttonBounds.width / 2) * .08); buttonY((event.clientY - buttonBounds.top - buttonBounds.height / 2) * .08); }
          else { buttonX(0); buttonY(0); }
        };
        const reset = () => { x(0); y(0); angle(0); buttonX(0); buttonY(0); };
        node.addEventListener("pointerenter", measure);
        node.addEventListener("pointermove", move, { passive: true });
        node.addEventListener("pointerleave", reset);
        window.addEventListener("scroll", measure, { passive: true });
        window.addEventListener("resize", measure);
        window.addEventListener("blur", reset);
        return () => {
          node.removeEventListener("pointerenter", measure); node.removeEventListener("pointermove", move); node.removeEventListener("pointerleave", reset);
          window.removeEventListener("scroll", measure); window.removeEventListener("resize", measure); window.removeEventListener("blur", reset);
          [x, y, angle, buttonX, buttonY].forEach(value => value.tween.kill());
          delete node.dataset.animation;
        };
      }
      return () => { delete node.dataset.animation; };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [replay], revertOnUpdate: true });

  return contextSafe((composed: boolean) => {
    const node = root.current;
    if (!node) return;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1.2;
    gsap.to(node.querySelector("[data-digital-layout]"), { rotation: composed ? -28 : 0, scale: composed ? .84 : 1, xPercent: composed ? -8 : 0, duration, ease: "power3.inOut", overwrite: "auto" });
    gsap.to(node.querySelector("[data-digital-type-layout]"), { xPercent: composed ? 3 : 0, duration, ease: "power3.inOut", overwrite: "auto" });
  });
}
