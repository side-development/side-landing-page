"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useWorkMotion(section: RefObject<HTMLElement | null>, active: boolean) {
  useGSAP(() => {
    if (!active || !section.current) return;
    const root = section.current;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(root.querySelectorAll("header h2, header p"), {
        y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: root.querySelector("header"), start: "top 88%", toggleActions: "play none none reverse" },
      });
    });
    media.add("(min-width: 1000px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)", () => {
      const sequence = root.querySelector<HTMLElement>("[data-work-sequence]")!;
      const stage = root.querySelector<HTMLElement>("[data-work-stage]")!;
      const route = stage.querySelector<HTMLElement>("[data-project='route']")!;
      const owl = stage.querySelector<HTMLElement>("[data-project='owl']")!;
      const routeMedia = route.querySelector("[data-project-media]")!;
      const owlMedia = owl.querySelector("[data-project-media]")!;
      const routeCaption = route.querySelector("[data-project-caption]")!;
      const owlCaption = owl.querySelector("[data-project-caption]")!;
      root.dataset.enhanced = "true";
      root.dataset.workActive = "route";
      owl.dataset.hidden = "true";
      owl.inert = true;
      gsap.set(owlMedia, { yPercent: 115, opacity: 0 });
      gsap.set(owlCaption, { y: 30, opacity: 0 });

      const handoff = gsap.timeline({ paused: true })
        .to(routeMedia, { yPercent: -115, rotation: -3, opacity: 0, duration: 0.64, ease: "power2.inOut" }, 0.14)
        .to(routeCaption, { y: -30, opacity: 0, duration: 0.26, ease: "power2.in" }, 0.2)
        .to(owlMedia, { yPercent: 0, opacity: 1, duration: 0.64, ease: "power2.inOut" }, 0.3)
        .to(owlCaption, { y: 0, opacity: 1, duration: 0.24, ease: "power2.out" }, 0.72)
        .to({}, { duration: 0.2 });

      function sync() {
        const progress = handoff.progress();
        const showingOwl = progress >= 0.5;
        const current = showingOwl ? "owl" : "route";
        const routeHidden = String(progress >= 0.7);
        const owlHidden = String(progress <= 0.26);
        if (root.dataset.workActive !== current) root.dataset.workActive = current;
        if (route.dataset.hidden !== routeHidden) route.dataset.hidden = routeHidden;
        if (owl.dataset.hidden !== owlHidden) owl.dataset.hidden = owlHidden;
        route.inert = showingOwl; owl.inert = !showingOwl;
      }
      handoff.eventCallback("onUpdate", sync);
      const trigger = ScrollTrigger.create({
        trigger: sequence, start: "top top", end: "bottom bottom",
        animation: handoff, scrub: 0.7,
      });
      function focus(event: FocusEvent) {
        if (route.contains(event.target as Node) && handoff.progress() > 0.5) {
          window.scrollTo({ top: trigger.start, behavior: "instant" });
          handoff.progress(0); sync();
        }
        if (owl.contains(event.target as Node) && handoff.progress() < 0.5) {
          window.scrollTo({ top: trigger.end, behavior: "instant" });
          handoff.progress(1); sync();
        }
      }
      function key(event: KeyboardEvent) {
        if (event.key !== "Tab") return;
        const forward = !event.shiftKey && event.target === route.querySelector("a");
        const backward = event.shiftKey && event.target === owl.querySelector("a");
        if (!forward && !backward) return;
        event.preventDefault();
        window.scrollTo({ top: forward ? trigger.end : trigger.start, behavior: "instant" });
        ScrollTrigger.update();
        trigger.getTween()?.progress(1);
        handoff.progress(forward ? 1 : 0); sync();
        (forward ? owl.querySelector("a") : route.querySelector("a"))?.focus({ preventScroll: true });
      }
      stage.addEventListener("focusin", focus);
      stage.addEventListener("keydown", key);
      ScrollTrigger.refresh();
      return () => {
        trigger.kill();
        stage.removeEventListener("focusin", focus);
        stage.removeEventListener("keydown", key);
        route.inert = false; owl.inert = false;
        delete root.dataset.enhanced; delete root.dataset.workActive;
        delete route.dataset.hidden; delete owl.dataset.hidden;
      };
    });
    media.add("(max-width: 999px) and (prefers-reduced-motion: no-preference), (max-height: 679px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from(root.querySelector("[data-project='owl']"), {
        y: 24, opacity: 0, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: root.querySelector("[data-project='owl']"), start: "top 88%", toggleActions: "play none none reverse" },
      });
    });
    return () => media.revert();
  }, { scope: section, dependencies: [active], revertOnUpdate: true });
}
