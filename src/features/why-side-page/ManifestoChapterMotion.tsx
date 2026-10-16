"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./manifesto-chapters.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ManifestoChapterMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!root.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      root.current!.querySelectorAll<HTMLElement>("[data-editorial-reveal]").forEach(element => {
        gsap.fromTo(element, { y: 20 }, {
          y: 0, duration: 1.1, ease: "power3.out", clearProps: "transform",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
      });
      root.current!.querySelectorAll<HTMLElement>("[data-editorial-rule]").forEach(element => {
        gsap.fromTo(element, { scaleX: .18, transformOrigin: "0 50%" }, {
          scaleX: 1, duration: 1.25, ease: "power3.inOut", clearProps: "transform,transformOrigin",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
    });
    return () => media.revert();
  }, { scope: root });
  return <div ref={root} className={styles.body}>{children}</div>;
}
