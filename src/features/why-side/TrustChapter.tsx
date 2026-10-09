"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { WhySideLocale } from "./copy";
import { SocialProof } from "./SocialProof";
import { WhySide } from "./WhySide";
import { FinalClosing } from "@/features/final-cta/FinalClosing";
import styles from "./trust-chapter.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TrustChapter({ locale, active }: { locale: WhySideLocale; active: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(context => {
    const node = root.current;
    if (!node || !active) return;
    const entrance = node.querySelector<HTMLElement>("[data-trust-entrance]")!;
    const proof = node.querySelector<HTMLElement>("[data-social-proof]")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (trigger: ScrollTrigger) => node.setAttribute("data-light", String(trigger.progress >= .30));
    let transition: gsap.core.Timeline | undefined;
    const clear = () => {
      transition?.revert(); transition?.scrollTrigger?.kill(); transition?.kill();
    };
    // Keep the entrance independent of the children's matchMedia contexts.
    const build = () => {
      clear();
      context.ignore(() => {
        transition = gsap.timeline({
          scrollTrigger: {
            trigger: entrance, start: "top top", end: "bottom top",
            scrub: reduced.matches ? true : .25, invalidateOnRefresh: true,
            onUpdate: update, onRefresh: update,
          },
        })
          .fromTo(node, { backgroundColor: "#101011" }, { backgroundColor: "#fff", duration: .58, ease: "sine.inOut" }, 0)
          // Blur only the heading and nearby text layers, not the whole section.
          .fromTo(proof, { opacity: 0, "--proof-entrance-blur": reduced.matches ? "0px" : "22px" }, {
            opacity: 1, "--proof-entrance-blur": "0px", duration: .38, ease: "sine.inOut",
          }, .62);
        update(transition.scrollTrigger!);
      });
    };
    build();
    reduced.addEventListener("change", build);
    return () => {
      reduced.removeEventListener("change", build);
      clear();
      node.removeAttribute("data-light");
    };
  }, { scope: root, dependencies: [active], revertOnUpdate: true });

  return <div ref={root} className={styles.chapter} hidden={!active} data-trust-chapter>
    <div className={styles.entrance} data-trust-entrance aria-hidden="true" />
    <SocialProof locale={locale} active={active} initialIndex={1} />
    <WhySide locale={locale} active={active} />
    <FinalClosing locale={locale} active={active} />
  </div>;
}
