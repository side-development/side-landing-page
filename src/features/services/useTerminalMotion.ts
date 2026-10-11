"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { serviceEntrance, serviceRevealDuration } from "./serviceEntrance";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const completionKey = "side:terminal-complete:v1";

export function useTerminalMotion(root: RefObject<HTMLElement | null>, replay: number) {
  useGSAP(() => {
    const node = root.current;
    if (!node) return;
    const remember = replay === 0 && Boolean(node.closest("[data-services]"));
    let settled = false;
    try { settled = remember && sessionStorage.getItem(completionKey) === "true"; } catch { /* Storage is optional. */ }
    let entered = false;
    let sync: (() => void) | undefined;
    const entrance = ScrollTrigger.create({ ...serviceEntrance(node), once: true, onEnter: () => { entered = true; sync?.(); }, onRefresh: self => { if (self.progress > 0) entered = true; sync?.(); } });
    if (entrance.progress > 0) entered = true;
    const typed = [...node.querySelectorAll<HTMLElement>("[data-terminal-type]")].map(element => ({ element, text: element.dataset.terminalText ?? "" }));
    const media = gsap.matchMedia();
    const restore = () => typed.forEach(({ element, text }) => { element.textContent = element.dataset.terminalText ?? text; });
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" }, context => {
      const reduced = context.conditions?.reduced;
      const parts = node.querySelectorAll("[data-terminal-shell], [data-terminal-command], [data-terminal-welcome], [data-terminal-response]");
      const timeline = gsap.timeline({ paused: true, onStart: () => { node.dataset.animation = "playing"; }, onComplete: () => {
        settled = true;
        restore();
        node.dataset.animation = "settled";
        try { if (remember) sessionStorage.setItem(completionKey, "true"); } catch { /* Storage is optional. */ }
      } });
      node.dataset.animation = "waiting";
      if (settled) {
        // Locale navigation remounts the page. Keep an already read terminal intact.
        restore();
        gsap.set(parts, { opacity: 1 });
        gsap.set(node, { opacity: 1, clearProps: "filter,transform" });
        node.dataset.animation = "settled";
      } else if (reduced) {
        restore();
        timeline.fromTo(node, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "sine.out" });
      } else {
        typed.forEach(({ element }) => { element.textContent = ""; });
        const command = node.querySelector("[data-terminal-command]");
        const shell = node.querySelector("[data-terminal-shell]");
        const welcome = node.querySelector("[data-terminal-welcome]");
        const response = node.querySelector("[data-terminal-response]");
        gsap.set([shell, command, welcome, response], { opacity: 0 });
        timeline.fromTo(node, { opacity: 0, scale: 0.97, filter: "blur(12px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: serviceRevealDuration, ease: "sine.out", clearProps: "filter,transform" });
        function type(index: number, at: number, speed: number) {
          const { element, text } = typed[index];
          const position = { count: 0 };
          timeline.to(position, { count: text.length, duration: text.length * speed, ease: "none", onUpdate: () => { element.textContent = text.slice(0, Math.floor(position.count)); } }, at);
        }
        timeline.to(shell, { opacity: 1, duration: .6 }, .4);
        // The window arrives in the common 1.8s; typing is the following story.
        type(0, serviceRevealDuration, .065);
        timeline.to(welcome, { opacity: 1, duration: .3 }, serviceRevealDuration + .6)
          .to(command, { opacity: 1, duration: .15 }, serviceRevealDuration + 1.9);
        type(1, serviceRevealDuration + 2.1, .16);
        timeline.set(response, { opacity: 1 }, serviceRevealDuration + 2.9);
      }
      let visible = false;
      sync = () => {
        const running = entered && visible && !document.hidden;
        node.dataset.visible = String(visible && !document.hidden);
        if (running && !settled && timeline.progress() < 1) timeline.play();
        else if (!running) timeline.pause();
      };
      const viewport = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync?.(); }, { threshold: 0.12 });
      viewport.observe(node);
      sync();
      document.addEventListener("visibilitychange", sync);
      return () => {
        viewport.disconnect(); timeline.kill();
        if (sync) document.removeEventListener("visibilitychange", sync);
        sync = undefined;
        restore();
        delete node.dataset.animation; delete node.dataset.visible;
      };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [replay], revertOnUpdate: true });
}
