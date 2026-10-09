"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useWhySideMotion(root: RefObject<HTMLElement | null>, active: boolean) {
  useGSAP(() => {
    const node = root.current;
    if (!node || !active) return;
    const values = [...node.querySelectorAll<HTMLElement>("[data-why-value]")];
    const words = values.map(value => value.querySelector<HTMLElement>("[data-why-word]")!);
    const prefixes = values.map(value => value.querySelector<HTMLElement>("[data-why-flow-prefix]")!);
    const descriptions = values.map(value => value.querySelector<HTMLElement>("[data-why-description]")!);
    const media = gsap.matchMedia();

    // Share the same stationary composition across desktop and mobile.
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      mobile: "(max-width: 800px)",
      desktop: "(min-width: 801px)",
      touch: "(pointer: coarse)",
      portrait: "(orientation: portrait)",
    }, context => {
      if (!context.conditions?.motion) return;
      node.dataset.layout = "central";
      const sequence = node.querySelector<HTMLElement>("[data-why-sequence]")!;
      const stage = node.querySelector<HTMLElement>("[data-why-stage]")!;
      const compact = context.conditions.mobile || context.conditions.touch;
      let viewportWidth = window.innerWidth;
      const measureStage = () => {
        node.style.removeProperty("--why-stage-height");
        node.style.setProperty("--why-stage-height", `${stage.offsetHeight}px`);
      };
      // Browser chrome may resize the viewport during a swipe. Keep the stage
      // and its scroll distance stable until the width/orientation changes.
      if (compact) measureStage();
      const resize = () => {
        if (window.innerWidth === viewportWidth) return;
        viewportWidth = window.innerWidth;
        measureStage();
        ScrollTrigger.refresh();
      };
      if (compact) window.addEventListener("resize", resize);
      const timeline = gsap.timeline({
        defaults: { ease: "sine.inOut" },
        scrollTrigger: {
          trigger: sequence,
          start: "top top", end: () => `+=${sequence.offsetHeight - stage.offsetHeight}`, scrub: .9,
          invalidateOnRefresh: true,
        },
      });
      words.forEach((word, index) => {
        // Keep one sharp prefix; reposition it to center each visible phrase.
        // offsetLeft excludes its GSAP transform, so refresh/resize stays stable.
        timeline.to(prefixes[0], {
          x: () => prefixes[index].offsetLeft - prefixes[0].offsetLeft,
          duration: .42,
        }, index);
        // Non-overlapping windows: only one large text layer is painted at a time.
        timeline.fromTo(word, { autoAlpha: index === 0 ? .14 : 0, filter: "blur(22px)" }, {
          autoAlpha: 1, filter: "blur(0px)", duration: .42,
        }, index)
          .fromTo(descriptions[index], { autoAlpha: 0 }, { autoAlpha: 1, duration: .30 }, index + .12);
        if (index === words.length - 1) {
          // Let the final brand hold while the stage leaves through natural scroll.
          timeline.to(word, { autoAlpha: 1, duration: .58 }, index + .42);
        } else {
          timeline.to(word, { autoAlpha: 1, duration: .28 }, index + .42)
            .to(word, { autoAlpha: 0, filter: "blur(22px)", duration: .26 }, index + .70)
            .to(descriptions[index], { autoAlpha: 0, duration: .26 }, index + .70)
            .to({}, { duration: .04 }, index + .96);
        }
      });
      // Visibility affects only the visual layer; all five semantic headings/copies
      // remain exposed through the separate text within each list item.
      node.dataset.motion = "ready";
      ScrollTrigger.refresh();
      return () => {
        window.removeEventListener("resize", resize);
        node.style.removeProperty("--why-stage-height");
        delete node.dataset.layout;
        delete node.dataset.motion;
      };
    });

    media.add("(prefers-reduced-motion: reduce)", () => {
      node.dataset.layout = "flow";
      words.forEach((word, index) => {
        gsap.timeline({
          defaults: { ease: "sine.inOut" },
          scrollTrigger: {
            trigger: values[index], start: "top 85%", end: "bottom 15%",
            scrub: true, invalidateOnRefresh: true,
          },
        })
          .fromTo(word, { opacity: .12, filter: "none" }, {
            opacity: 1, filter: "none", duration: .15,
          }, 0)
          .to(word, { opacity: 1, duration: .70 })
          .to(word, { opacity: .12, filter: "none", duration: .15 })
          .fromTo(descriptions[index], { opacity: .12 }, { opacity: 1, duration: .15 }, 0)
          .to(descriptions[index], { opacity: .12, duration: .15 }, .85);
      });
      return () => { delete node.dataset.layout; };
    });

    return () => media.revert();
  }, { scope: root, dependencies: [active], revertOnUpdate: true });
}
