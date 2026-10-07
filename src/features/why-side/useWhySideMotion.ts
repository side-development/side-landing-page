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

    media.add("(min-width: 801px) and (min-height: 601px) and (prefers-reduced-motion: no-preference)", () => {
      node.dataset.layout = "central";
      const timeline = gsap.timeline({
        defaults: { ease: "sine.inOut" },
        scrollTrigger: {
          trigger: node.querySelector("[data-why-sequence]"),
          start: "top top", end: "bottom bottom", scrub: .9,
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
      return () => { delete node.dataset.layout; delete node.dataset.motion; };
    });

    media.add({
      flow: "(max-width: 800px), (max-height: 600px)",
      reduced: "(prefers-reduced-motion: reduce)",
    }, context => {
      if (!context.conditions?.flow && !context.conditions?.reduced) return;
      const reduced = context.conditions?.reduced;
      node.dataset.layout = "flow";
      words.forEach((word, index) => {
        gsap.timeline({
          defaults: { ease: "sine.inOut" },
          scrollTrigger: {
            trigger: values[index], start: "top 85%", end: "bottom 15%",
            scrub: reduced ? true : .55, invalidateOnRefresh: true,
          },
        })
          .fromTo(word, { opacity: .12, filter: reduced ? "none" : "blur(12px)" }, {
            opacity: 1, filter: reduced ? "none" : "blur(0px)", duration: reduced ? .15 : .30,
          }, 0)
          .to(word, { opacity: 1, duration: reduced ? .70 : .40 })
          .to(word, { opacity: .12, filter: reduced ? "none" : "blur(12px)", duration: reduced ? .15 : .30 })
          .fromTo(descriptions[index], { opacity: .12 }, { opacity: 1, duration: reduced ? .15 : .30 }, 0)
          .to(descriptions[index], { opacity: .12, duration: reduced ? .15 : .30 }, reduced ? .85 : .70);
      });
      return () => { delete node.dataset.layout; };
    });

    return () => media.revert();
  }, { scope: root, dependencies: [active], revertOnUpdate: true });
}
