"use client";

import { useRef, type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { createHeroTimeline } from "./timeline";
import type { HeroCopy } from "./copy";
import styles from "./hero.module.css";

gsap.registerPlugin(useGSAP);

export function CinematicReveal({ container, copy, onComplete }: {
  container: RefObject<HTMLElement | null>;
  copy: HeroCopy;
  onComplete: () => void;
}) {
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current || !stage.current) return;
    const root = container.current;
    const visual = stage.current;
    const media = gsap.matchMedia();
    media.add({ reduced: "(prefers-reduced-motion: reduce)", full: "(prefers-reduced-motion: no-preference)" }, context => {
      const cleanup = createHeroTimeline(root, visual, Boolean(context.conditions?.reduced), onComplete);
      return cleanup;
    });
    return () => media.revert();
  }, { scope: container, dependencies: [onComplete], revertOnUpdate: true });

  return (
    <>
      <div ref={stage} className={styles.cinematic} aria-hidden="true" inert>
        <div className={styles.blackField} data-black-field />
        <div className={styles.fragmentLayer} data-white-fragments />
        <div className={styles.fragmentLayer} data-interface-fragments />
        <div className={styles.fragmentLayer} data-purple-fragments />
        <div className={styles.phrases}>
          {copy.narrative.map(sentence => <p key={sentence} className={styles.phrase} data-phrase><span>{sentence}</span></p>)}
        </div>
      </div>
      <div className={styles.srOnly} role="status" aria-live="polite">{copy.narrative.join(" ")}</div>
    </>
  );
}
