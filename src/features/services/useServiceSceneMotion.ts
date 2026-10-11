"use client";

import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { serviceEntrance, serviceRevealDuration } from "./serviceEntrance";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type SceneSequence = (node: HTMLElement, timeline: gsap.core.Timeline | null) => void;

/** A shared arrival followed by a once-only story, paused outside the viewport or in a hidden tab. */
export function useServiceSceneMotion(root: RefObject<HTMLElement | null>, sequence: SceneSequence) {
  useGSAP(() => {
    const node = root.current;
    if (!node) return;
    const media = gsap.matchMedia();
    media.add({ reduced: "(prefers-reduced-motion: reduce)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      if (context.conditions?.reduced) {
        sequence(node, null);
        node.dataset.animation = "settled";
        return () => { delete node.dataset.animation; };
      }
      let visible = false;
      let entered = false;
      node.dataset.animation = "waiting";
      const timeline = gsap.timeline({ paused: true, onStart: () => { node.dataset.animation = "playing"; }, onComplete: () => { node.dataset.animation = "settled"; node.dataset.sceneRunning = "false"; } });
      timeline.fromTo(node.querySelector("[data-scene-surface]"), { opacity: 0, y: 12, filter: "blur(12px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: serviceRevealDuration, ease: "sine.out", clearProps: "filter,transform" });
      sequence(node, timeline);
      const sync = () => {
        const running = entered && visible && !document.hidden;
        if (running && timeline.progress() < 1) timeline.play();
        else if (!running) timeline.pause();
        node.dataset.sceneRunning = String(running && timeline.progress() < 1);
      };
      const entrance = ScrollTrigger.create({ ...serviceEntrance(node), once: true, onEnter: () => { entered = true; sync(); }, onRefresh: self => { if (self.progress > 0) entered = true; sync(); } });
      if (entrance.progress > 0) entered = true;
      const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: .12 });
      observer.observe(node);
      document.addEventListener("visibilitychange", sync);
      sync();
      return () => {
        observer.disconnect(); entrance.kill(); timeline.kill();
        document.removeEventListener("visibilitychange", sync);
        delete node.dataset.animation; delete node.dataset.sceneRunning;
      };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [sequence], revertOnUpdate: true });
}
