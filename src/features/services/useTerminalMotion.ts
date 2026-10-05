"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type TerminalLocale } from "./terminalData";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useTerminalMotion(root: RefObject<HTMLElement | null>, locale: TerminalLocale, replay: number) {
  useGSAP(() => {
    const node = root.current;
    if (!node) return;
    const typed = [...node.querySelectorAll<HTMLElement>("[data-terminal-type]")].map(element => ({ element, text: element.dataset.terminalText ?? "" }));
    const media = gsap.matchMedia();
    const restore = () => typed.forEach(({ element, text }) => { element.textContent = element.dataset.terminalText ?? text; });
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" }, context => {
      const reduced = context.conditions?.reduced;
      const timeline = gsap.timeline({ paused: true, onStart: () => { node.dataset.animation = "playing"; }, onComplete: () => { node.dataset.animation = "settled"; } });
      node.dataset.animation = "waiting";
      node.dataset.caret = "none";
      if (reduced) {
        restore();
        node.dataset.caret = "idle";
        timeline.fromTo(node, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "sine.out" });
      } else {
        typed.forEach(({ element }) => { element.textContent = ""; });
        const command = node.querySelector("[data-terminal-command]");
        const shell = node.querySelector("[data-terminal-shell]");
        const welcome = node.querySelector("[data-terminal-welcome]");
        const response = node.querySelector("[data-terminal-response]");
        const status = node.querySelector("[data-terminal-status]");
        const footer = node.querySelector("[data-terminal-final]");
        gsap.set([shell, command, welcome, response, status, footer], { opacity: 0 });
        timeline.fromTo(node, { opacity: 0, scale: 0.97, filter: "blur(6px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power2.out", clearProps: "filter,transform" });
        function type(index: number, caret: string, at: number, speed: number) {
          const { element, text } = typed[index];
          const position = { count: 0 };
          timeline.set(node, { attr: { "data-caret": caret } }, at)
            .to(position, { count: text.length, duration: text.length * speed, ease: "none", onUpdate: () => { element.textContent = text.slice(0, Math.floor(position.count)); } }, at);
        }
        timeline.to(shell, { opacity: 1, duration: 0.18 }, 0.8);
        type(0, "claude", 1.05, 0.065);
        timeline.set(node, { attr: { "data-caret": "none" } }, 1.55)
          .to(welcome, { opacity: 1, duration: 0.3 }, 1.65)
          .to(command, { opacity: 1, duration: 0.15 }, 2.65);
        type(1, "mcp", 2.9, 0.075);
        timeline.set(node, { attr: { "data-caret": "none" } }, 3.25)
          .to(response, { opacity: 1, duration: 0.2 }, 3.4)
          .to(status, { opacity: 1, duration: 0.15 }, 3.65)
          .to(footer, { opacity: 1, duration: 0.2 }, 4.15)
          .set(node, { attr: { "data-caret": "idle" } }, 4.35);
      }
      let entered = false, visible = false;
      const sync = () => {
        const running = entered && visible && !document.hidden;
        node.dataset.visible = String(visible && !document.hidden);
        if (running && timeline.progress() < 1) timeline.play();
        else if (!running) timeline.pause();
      };
      const viewport = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: 0.12 });
      viewport.observe(node);
      const entrance = ScrollTrigger.create({ trigger: node, start: "top 80%", once: true, onEnter: () => { entered = true; sync(); } });
      document.addEventListener("visibilitychange", sync);
      return () => {
        viewport.disconnect(); entrance.kill(); timeline.kill();
        document.removeEventListener("visibilitychange", sync);
        restore();
        delete node.dataset.animation; delete node.dataset.visible; delete node.dataset.caret;
      };
    });
    return () => media.revert();
  }, { scope: root, dependencies: [locale, replay], revertOnUpdate: true });
}
