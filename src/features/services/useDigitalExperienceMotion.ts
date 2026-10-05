"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const palettes = [
  { "--digital-ink": "#171719", "--digital-accent": "#3919bd", "--digital-light": "#6b4dea", "--digital-dark": "#260e88", "--digital-fold": "#230c80", "--digital-front": "#785be6", "--digital-back": "#28108a", "--digital-highlight": "#876cee", "--digital-muted": "#77747d", "--digital-border": "#d9d4ee" },
  { "--digital-ink": "#b82332", "--digital-accent": "#c62d3c", "--digital-light": "#ed6470", "--digital-dark": "#831326", "--digital-fold": "#76101f", "--digital-front": "#f17b84", "--digital-back": "#881528", "--digital-highlight": "#f7959e", "--digital-muted": "#a43a46", "--digital-border": "#edd0d4" },
];

function supportingPositions(node: HTMLElement, composed: boolean) {
  const note = node.querySelector<HTMLElement>("[data-digital-note-layout]")!;
  const action = node.querySelector<HTMLElement>("[data-digital-action-layout]")!;
  const lower = note.parentElement!.parentElement!;
  const actionSlot = action.parentElement!;
  return { note, action, noteX: composed ? lower.clientWidth - note.offsetWidth - note.parentElement!.offsetLeft : 0, actionX: composed ? note.parentElement!.offsetLeft - actionSlot.offsetLeft : 0 };
}

export function useDigitalExperienceMotion(root: RefObject<HTMLElement | null>, replay: number) {
  const { contextSafe } = useGSAP(() => {
    const node = root.current;
    if (!node) return;
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)", desktop: "(min-width: 801px) and (hover: hover) and (pointer: fine)" }, context => {
      const reduced = context.conditions?.reduced;
      const desktop = context.conditions?.desktop;
      const composed = node.dataset.composed === "true";
      gsap.set(node, palettes[Number(composed)]);
      gsap.set(node.querySelectorAll("[data-digital-headline], [data-digital-note]"), { autoAlpha: (_index, element: HTMLElement) => Number(element.dataset.digitalHeadline ?? element.dataset.digitalNote) === Number(composed) ? 1 : 0, xPercent: 0 });
      node.querySelectorAll<SVGPathElement>("[data-digital-strand]").forEach(strand => {
        strand.dataset.digitalClosed ??= strand.getAttribute("d") ?? "";
        gsap.set(strand, { attr: { d: (composed ? strand.dataset.digitalOpen : strand.dataset.digitalClosed) ?? "" } });
      });
      gsap.set(node.querySelector("[data-digital-highlight]"), { opacity: composed ? 0 : 1 });
      const layout = node.querySelector("[data-digital-layout]");
      gsap.set(layout, { rotation: 0, scale: composed ? .84 : 1, xPercent: composed && window.matchMedia("(min-width: 801px)").matches ? -112 : 0 });
      const art = node.querySelector("[data-digital-art-scroll]");
      const lines = node.querySelectorAll("[data-digital-line]");
      const layoutPosition = gsap.quickSetter(layout, "xPercent");
      const initial = supportingPositions(node, composed);
      gsap.set(initial.note, { x: initial.noteX });
      gsap.set(initial.action, { x: initial.actionX });
      const notePosition = gsap.quickSetter(initial.note, "x", "px");
      const actionPosition = gsap.quickSetter(initial.action, "x", "px");
      const resizeLayout = () => {
        const active = node.dataset.composed === "true";
        const positions = supportingPositions(node, active);
        notePosition(positions.noteX);
        actionPosition(positions.actionX);
        layoutPosition(active && window.matchMedia("(min-width: 801px)").matches ? -112 : 0);
      };
      window.addEventListener("resize", resizeLayout);
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
          window.removeEventListener("resize", resizeLayout);
          delete node.dataset.animation;
        };
      }
      return () => { window.removeEventListener("resize", resizeLayout); delete node.dataset.animation; };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [replay], revertOnUpdate: true });

  return contextSafe((composed: boolean) => {
    const node = root.current;
    if (!node) return;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1.8;
    gsap.to(node, { ...palettes[Number(composed)], duration, ease: "sine.inOut", overwrite: "auto" });
    node.querySelectorAll<SVGPathElement>("[data-digital-strand]").forEach(strand => {
      gsap.to(strand, { attr: { d: (composed ? strand.dataset.digitalOpen : strand.dataset.digitalClosed) ?? "" }, duration, ease: "sine.inOut", overwrite: "auto" });
    });
    gsap.to(node.querySelector("[data-digital-highlight]"), { opacity: composed ? 0 : 1, duration: duration ? .4 : 0, overwrite: "auto" });
    gsap.to(node.querySelector("[data-digital-layout]"), { rotation: 0, scale: composed ? .84 : 1, xPercent: composed && window.matchMedia("(min-width: 801px)").matches ? -112 : 0, duration, ease: "power3.inOut", overwrite: "auto" });
    node.querySelectorAll<HTMLElement>("[data-digital-headline], [data-digital-note]").forEach(element => {
      const active = Number(element.dataset.digitalHeadline ?? element.dataset.digitalNote) === Number(composed);
      gsap.to(element, { autoAlpha: active ? 1 : 0, xPercent: active ? 0 : composed ? 6 : -6, duration: duration ? active ? 1.4 : .6 : 0, ease: "sine.inOut", overwrite: "auto" });
    });
    const positions = supportingPositions(node, composed);
    gsap.to(positions.note, { x: positions.noteX, duration, ease: "sine.inOut", overwrite: "auto" });
    gsap.to(positions.action, { x: positions.actionX, duration, ease: "sine.inOut", overwrite: "auto" });
  });
}
