"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { serviceEntrance, serviceRevealDuration } from "./serviceEntrance";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const palettes = [
  { "--digital-accent": "#3919bd", "--digital-light": "#6b4dea", "--digital-dark": "#260e88", "--digital-fold": "#230c80", "--digital-front": "#785be6", "--digital-back": "#28108a", "--digital-highlight": "#876cee" },
  { "--digital-accent": "#c62d3c", "--digital-light": "#ed6470", "--digital-dark": "#831326", "--digital-fold": "#76101f", "--digital-front": "#f17b84", "--digital-back": "#881528", "--digital-highlight": "#f7959e" },
];

export function useDigitalExperienceMotion(root: RefObject<HTMLElement | null>, replay: number, onPerspectiveChange: (composed: boolean) => void) {
  useGSAP(() => {
    const node = root.current;
    if (!node) return;
    let reveal: gsap.core.Timeline | undefined;
    const revealTrigger = ScrollTrigger.create({ ...serviceEntrance(node), onEnter: () => reveal?.play(), onRefresh: self => { if (self.progress > 0) reveal?.play(); } });
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)", desktop: "(min-width: 801px) and (hover: hover) and (pointer: fine)" }, context => {
      const reduced = context.conditions?.reduced;
      const desktop = context.conditions?.desktop;
      const integrated = Boolean(node.closest("[data-experience-run]"));
      const run = node.closest<HTMLElement>("[data-experience-run]");
      const shell = run?.querySelector<HTMLElement>("[data-experience-shell]");
      const stickyTop = () => Math.max(72, (window.innerHeight - (shell?.offsetHeight ?? 0)) / 2);
      const measureStage = () => {
        if (!run || !shell) return;
        const fits = !reduced && shell.offsetHeight <= window.innerHeight - 80;
        run.dataset.experienceSticky = String(fits);
        run.style.setProperty("--experience-sticky-top", `${stickyTop()}px`);
        run.style.setProperty("--experience-stage-height", `${shell.offsetHeight}px`);
        run.style.setProperty("--experience-scroll-distance", `${window.innerHeight * 1.6}px`);
      };
      measureStage();
      // Re-measure before ScrollTrigger calculates the scroll interval.
      ScrollTrigger.addEventListener("refreshInit", measureStage);
      let composed = false;
      onPerspectiveChange(false);
      gsap.set(node, palettes[0]);
      const first = node.querySelectorAll('[data-digital-headline="0"], [data-digital-note="0"]');
      const second = node.querySelectorAll('[data-digital-headline="1"], [data-digital-note="1"]');
      gsap.set(first, { autoAlpha: 1, xPercent: 0 });
      gsap.set(second, { autoAlpha: 0, xPercent: reduced ? 0 : -6 });
      const strands = node.querySelectorAll<SVGPathElement>("[data-digital-strand]");
      strands.forEach(strand => {
        strand.dataset.digitalClosed ??= strand.getAttribute("d") ?? "";
        gsap.set(strand, { attr: { d: strand.dataset.digitalClosed ?? "" } });
      });
      const highlight = node.querySelector("[data-digital-highlight]");
      const layout = node.querySelector("[data-digital-layout]");
      const note = node.querySelector<HTMLElement>("[data-digital-note-layout]")!;
      gsap.set(highlight, { opacity: 1 });
      gsap.set(layout, { scale: 1, xPercent: 0 });
      gsap.set(note, { x: 0 });
      const noteEnd = () => note.parentElement!.parentElement!.clientWidth - note.offsetWidth - note.parentElement!.offsetLeft;
      const layoutEnd = () => window.matchMedia("(min-width: 801px)").matches ? -112 : 0;
      const updateCopy = (progress: number) => {
        const active = progress >= .55;
        if (active !== composed) { composed = active; onPerspectiveChange(active); }
      };
      const held = () => run?.dataset.experienceSticky === "true";
      const perspective = gsap.timeline({
        defaults: { duration: 1, ease: "sine.inOut" },
        scrollTrigger: {
          trigger: run ?? node,
          start: () => held() ? `top ${stickyTop()}px` : integrated ? "top 55%" : "top 20%",
          end: () => held() ? `+=${run!.offsetHeight - shell!.offsetHeight}` : integrated ? "top 18%" : "top 4%",
          scrub: reduced ? true : .55, invalidateOnRefresh: true,
          onRefresh: self => updateCopy(self.progress),
        },
        onUpdate: function () { updateCopy(this.progress()); },
      });
      const lead = integrated && !reduced ? .3 : 0;
      perspective.to(node, palettes[1], lead)
        .to(first, { autoAlpha: 0, xPercent: reduced ? 0 : 6, duration: reduced ? .15 : .35 }, lead + (reduced ? .35 : .08))
        .to(second, { autoAlpha: 1, xPercent: 0, duration: reduced ? .15 : .58 }, lead + (reduced ? .55 : .32));
      if (reduced) {
        strands.forEach(strand => perspective.set(strand, { attr: { d: strand.dataset.digitalOpen ?? "" } }, .5));
        perspective.set(highlight, { opacity: 0 }, .5)
          .set(layout, { scale: .84, xPercent: layoutEnd }, .5)
          .set(note, { x: noteEnd }, .5);
      } else {
        strands.forEach(strand => perspective.to(strand, { attr: { d: strand.dataset.digitalOpen ?? "" } }, lead));
        perspective.to(highlight, { opacity: 0, duration: .3 }, lead)
          .to(layout, { scale: .84, xPercent: layoutEnd }, lead)
          .to(note, { x: noteEnd }, lead);
        if (integrated) perspective.to({}, { duration: .3 }, lead + 1);
      }
      perspective.progress(perspective.scrollTrigger?.progress ?? 0);
      const art = node.querySelector("[data-digital-art-scroll]");
      const entrance = gsap.timeline({
        paused: true,
        onStart: () => { node.dataset.animation = "playing"; },
        onComplete: () => { node.dataset.animation = "settled"; },
      });
      if (reduced) entrance.fromTo(node, { opacity: 0 }, { opacity: 1, duration: .4, clearProps: "opacity" });
      else entrance.fromTo(node.querySelectorAll("[data-digital-line]"), { yPercent: 115 }, { yPercent: 0, duration: serviceRevealDuration - .2, stagger: { amount: .2 }, ease: "power3.out" }, 0)
        .fromTo(art, { opacity: 0, scale: .9, rotation: -12, filter: "blur(12px)" }, { opacity: 1, scale: 1, rotation: 0, filter: "blur(0px)", duration: serviceRevealDuration, ease: "sine.out", clearProps: "filter" }, 0)
        .fromTo(node.querySelectorAll("[data-digital-detail]"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1, stagger: { amount: .2 }, ease: "sine.out" }, .6);
      reveal = entrance;
      if (revealTrigger.progress > 0) entrance.play();

      const clearStage = () => {
        ScrollTrigger.removeEventListener("refreshInit", measureStage);
        if (run) {
          delete run.dataset.experienceSticky;
          ["--experience-sticky-top", "--experience-stage-height", "--experience-scroll-distance"].forEach(property => run.style.removeProperty(property));
        }
      };

      if (desktop && !reduced) {
        const pointer = node.querySelector("[data-digital-pointer]");
        const x = gsap.quickTo(pointer, "x", { duration: .8, ease: "power3.out" });
        const y = gsap.quickTo(pointer, "y", { duration: .8, ease: "power3.out" });
        const angle = gsap.quickTo(pointer, "rotation", { duration: .9, ease: "power3.out" });
        let bounds = node.getBoundingClientRect();
        const measure = () => { bounds = node.getBoundingClientRect(); };
        const move = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          const px = (event.clientX - bounds.left) / bounds.width - .5;
          const py = (event.clientY - bounds.top) / bounds.height - .5;
          x(px * 30); y(py * 24); angle(px * 7);
        };
        const reset = () => { x(0); y(0); angle(0); };
        node.addEventListener("pointerenter", measure);
        node.addEventListener("pointermove", move, { passive: true });
        node.addEventListener("pointerleave", reset);
        window.addEventListener("scroll", measure, { passive: true });
        window.addEventListener("resize", measure);
        window.addEventListener("blur", reset);
        return () => {
          clearStage();
          node.removeEventListener("pointerenter", measure); node.removeEventListener("pointermove", move); node.removeEventListener("pointerleave", reset);
          window.removeEventListener("scroll", measure); window.removeEventListener("resize", measure); window.removeEventListener("blur", reset);
          [x, y, angle].forEach(value => value.tween.kill());
          delete node.dataset.animation;
        };
      }
      return () => { clearStage(); delete node.dataset.animation; };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [replay, onPerspectiveChange], revertOnUpdate: true });
}
