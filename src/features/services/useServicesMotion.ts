"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { serviceEntrance, serviceRevealDuration } from "./serviceEntrance";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useServicesMotion(root: RefObject<HTMLElement | null>, active: boolean) {
  useGSAP(() => {
    const node = root.current;
    if (!node || !active) return;
    node.setAttribute("data-motion-ready", "true");
    const page = document.documentElement;
    const scrollbarProperties = ["--page-scroll-track", "--page-scroll-thumb", "--page-scroll-hover"];
    const previousScrollbar = scrollbarProperties.map(property => page.style.getPropertyValue(property));
    const dashboard = node.querySelector<HTMLElement>("[data-dashboard]")!;
    const panels = dashboard.querySelector<HTMLElement>("[data-dashboard-panels]")!;
    const metrics = dashboard.querySelector<HTMLElement>("[data-dashboard-metrics]")!;
    const setDashboardActive = (active: boolean) => {
      dashboard.dataset.serviceActive = String(Boolean(active));
      panels.inert = metrics.inert = !active;
    };
    const visibility = ScrollTrigger.create({
      trigger: dashboard, start: "top bottom", end: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "bottom top" : "bottom 86%",
      onToggle: self => setDashboardActive(self.isActive), onRefresh: self => setDashboardActive(self.isActive),
    });
    setDashboardActive(Boolean(visibility.isActive));
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)", desktop: "(min-width: 1000px) and (min-height: 680px)" }, context => {
      const reduced = context.conditions?.reduced;
      const desktop = context.conditions?.desktop;
      const chapters = [...node.querySelectorAll<HTMLElement>("[data-service-chapter]")];
      const atmosphere = node.querySelector<HTMLElement>("[data-service-atmosphere]")!;

      gsap.timeline({ scrollTrigger: { trigger: node.querySelector("header"), start: "top 86%", once: true } })
        .from(node.querySelector("header h2"), { opacity: 0, y: reduced ? 0 : 20, duration: reduced ? .4 : 1.4, ease: "sine.out" });
      chapters.forEach(chapter => {
        gsap.timeline({ scrollTrigger: { ...serviceEntrance(chapter), once: true, invalidateOnRefresh: true } })
          .fromTo(chapter.querySelector("[data-service-title]"), { opacity: 0, filter: reduced ? "none" : "blur(14px)" }, {
            opacity: 1, filter: "blur(0px)", duration: reduced ? .4 : serviceRevealDuration, ease: "sine.out", clearProps: "filter",
          }, 0)
          .fromTo(chapter.querySelector("[data-service-copy]"), { opacity: 0, filter: reduced ? "none" : "blur(10px)" }, {
            opacity: 1, filter: "blur(0px)", duration: reduced ? .4 : serviceRevealDuration, ease: "sine.out", clearProps: "filter",
          }, 0);
      });

      if (!reduced) {
        const experience = node.querySelector("[data-experience-run]");
        const dissolve = gsap.timeline({ defaults: { ease: "sine.inOut" }, scrollTrigger: { trigger: experience, start: desktop ? "top -30%" : "bottom 65%", end: desktop ? "top -75%" : "bottom 15%", scrub: .9 } });
        dissolve.to(chapters[0].querySelectorAll("[data-digital-experience] h2, [data-digital-detail]"), { opacity: 0, duration: .45 }, 0)
          .to(chapters[0].querySelector("[data-experience-shell]"), { scale: .97, y: -12, duration: .85 }, 0)
          .to(chapters[0].querySelector("[data-digital-art-scroll] svg"), { opacity: 0, duration: .6 }, .3);

        const fade = gsap.timeline({ defaults: { ease: "sine.inOut" }, scrollTrigger: { trigger: dashboard, start: "bottom 86%", end: "bottom 28%", scrub: .8 } });
        fade.fromTo(dashboard, { "--services-values-opacity": 1 }, { "--services-values-opacity": .25, duration: .35 }, 0)
          .to(dashboard.querySelector("[data-dashboard-panels]"), { opacity: 0, duration: .5 }, .12)
          .to(dashboard.querySelectorAll("[data-dashboard-shell], [data-dashboard-metrics]"), { opacity: 0, duration: .45, stagger: .07 }, .32)
          .to(node.querySelector("[data-product-demo]"), { opacity: 0, duration: .3 }, .75);
      }
      gsap.timeline({ scrollTrigger: { trigger: atmosphere, start: "top 85%", end: "bottom 30%", scrub: reduced ? true : 1 } })
        .fromTo(node, { backgroundColor: "#ffffff" }, { backgroundColor: "#101011", ease: "sine.inOut", onUpdate: function () { node.dataset.dark = String(this.progress() > .65); } }, 0)
        .fromTo(page, { "--page-scroll-track": "#ffffff", "--page-scroll-thumb": "#e9e9e9", "--page-scroll-hover": "#dcdcdc" }, {
          "--page-scroll-track": "#101011", "--page-scroll-thumb": "#232324", "--page-scroll-hover": "#303032", ease: "sine.inOut",
        }, 0);
    });
    return () => {
      media.revert();
      scrollbarProperties.forEach((property, index) => {
        if (previousScrollbar[index]) page.style.setProperty(property, previousScrollbar[index]);
        else page.style.removeProperty(property);
      });
      panels.inert = metrics.inert = false; delete dashboard.dataset.serviceActive; delete node.dataset.motionReady; delete node.dataset.dark;
    };
  }, { scope: root, dependencies: [active], revertOnUpdate: true });
}
