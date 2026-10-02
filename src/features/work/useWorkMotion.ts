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
    media.add("(min-width: 1000px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)", context => {
      const sequence = root.querySelector<HTMLElement>("[data-work-sequence]")!;
      const stage = root.querySelector<HTMLElement>("[data-work-stage]")!;
      const route = stage.querySelector<HTMLElement>("[data-project='route']")!;
      const owl = stage.querySelector<HTMLElement>("[data-project='owl']")!;
      const routeMedia = route.querySelector<HTMLElement>("[data-project-media]")!;
      const owlMedia = owl.querySelector<HTMLElement>("[data-project-media]")!;
      const routeCaption = route.querySelector("[data-project-caption]")!;
      const owlCaption = owl.querySelector("[data-project-caption]")!;
      const routeVideo = route.querySelector<HTMLVideoElement>("video")!;
      let requested = false;
      let showingOwl = false;
      let hold: number | undefined;
      let transition: gsap.core.Timeline | undefined;
      root.dataset.enhanced = "true";
      owl.dataset.hidden = "true";
      gsap.set(owlMedia, { yPercent: 108, scale: 0.96 });
      gsap.set(owlCaption, { opacity: 0, y: 14 });
      gsap.set(owl, { pointerEvents: "none" });

      const handoff = context.add("handoff", (immediate = false) => {
        if (showingOwl) { if (immediate) transition?.progress(1); return; }
        showingOwl = true;
        window.clearTimeout(hold);
        transition?.kill();
        route.dataset.hidden = "true";
        owl.dataset.hidden = "false";
        routeVideo.pause();
        root.dataset.workActive = "owl";
        transition = gsap.timeline()
          .to(routeCaption, { opacity: 0, y: -10, duration: 0.18 }, 0)
          .to(routeMedia, { scale: 0.92, duration: 0.3, ease: "power2.inOut" }, 0)
          .to(routeMedia, { yPercent: -108, duration: 0.6, ease: "power3.inOut" }, 0.12)
          .to(owlMedia, { yPercent: 0, scale: 1, duration: 0.6, ease: "power3.inOut" }, 0.12)
          .set(route, { pointerEvents: "none" }, 0)
          .set(owl, { pointerEvents: "auto" }, 0.72)
          .to(owlCaption, { opacity: 1, y: 0, duration: 0.32, ease: "power2.out" }, 0.74);
        if (immediate) transition.progress(1);
      });
      const reset = context.add("reset", () => {
        window.clearTimeout(hold);
        transition?.revert(); transition = undefined;
        showingOwl = false; requested = false;
        root.dataset.workActive = "route";
        route.dataset.hidden = "false";
        owl.dataset.hidden = "true";
        gsap.set(routeMedia, { yPercent: 0, scale: 1 });
        gsap.set(routeCaption, { opacity: 1, y: 0 });
        gsap.set(owlMedia, { yPercent: 108, scale: 0.96 });
        gsap.set(owlCaption, { opacity: 0, y: 14 });
        gsap.set(route, { pointerEvents: "auto" });
        gsap.set(owl, { pointerEvents: "none" });
      });
      function ended() {
        if (requested && !showingOwl) handoff();
      }
      function slow() {
        if (!routeVideo.duration) return;
        const remaining = routeVideo.duration - routeVideo.currentTime;
        routeVideo.playbackRate = remaining > 0.5 && remaining < 1 ? 0.85 : 1;
      }
      function focus(event: FocusEvent) {
        if (owl.contains(event.target as Node)) handoff(true);
        else if (route.contains(event.target as Node) && showingOwl) reset();
      }
      routeVideo.addEventListener("ended", ended);
      routeVideo.addEventListener("timeupdate", slow);
      stage.addEventListener("focusin", focus);
      const trigger = ScrollTrigger.create({
        trigger: sequence,
        start: "top 24px",
        end: "bottom bottom",
        onUpdate: self => {
          if (self.progress < 0.12 && showingOwl) reset();
          if (self.progress > 0.35 && !showingOwl) {
            requested = true;
            if (routeVideo.ended) handoff();
            else if (!routeVideo.getAttribute("src") || routeVideo.error) {
              if (hold === undefined) hold = window.setTimeout(() => handoff(), 350);
            }
          }
          if (self.progress > 0.85) handoff(true);
        },
      });
      gsap.fromTo(routeMedia, { opacity: 0.65 }, { opacity: 1, duration: 0.65, ease: "power2.out", scrollTrigger: { trigger: sequence, start: "top 90%", toggleActions: "play none none reverse" } });
      ScrollTrigger.refresh();
      return () => {
        window.clearTimeout(hold);
        transition?.revert(); trigger.kill();
        routeVideo.removeEventListener("ended", ended);
        routeVideo.removeEventListener("timeupdate", slow);
        routeVideo.playbackRate = 1;
        stage.removeEventListener("focusin", focus);
        delete root.dataset.enhanced; delete root.dataset.workActive;
        delete route.dataset.hidden; delete owl.dataset.hidden;
      };
    });
    media.add("(max-width: 999px) and (prefers-reduced-motion: no-preference), (max-height: 679px) and (prefers-reduced-motion: no-preference)", () => {
      const owlMedia = root.querySelector("[data-project='owl'] [data-project-media]")!;
      gsap.fromTo(owlMedia, { opacity: 0.7, y: 18 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", scrollTrigger: { trigger: owlMedia, start: "top 92%", toggleActions: "play none none reverse" } });
    });
    return () => media.revert();
  }, { scope: section, dependencies: [active], revertOnUpdate: true });
}
