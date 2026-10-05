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
        const commands = node.querySelectorAll("[data-terminal-command]");
        const response = node.querySelector("[data-terminal-response]");
        const servers = node.querySelectorAll("[data-terminal-server]");
        const statuses = node.querySelectorAll("[data-terminal-status]");
        const idle = node.querySelector("[data-terminal-idle]");
        gsap.set([commands, response, statuses, idle], { opacity: 0 });
        timeline.fromTo(node, { opacity: 0, scale: 0.97, filter: "blur(6px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.1, ease: "power2.out", clearProps: "filter,transform" });
        function type(index: number, caret: string, at: number, speed: number) {
          const { element, text } = typed[index];
          const position = { count: 0 };
          timeline.set(node, { attr: { "data-caret": caret } }, at)
            .to(position, { count: text.length, duration: text.length * speed, ease: "none", onUpdate: () => { element.textContent = text.slice(0, Math.floor(position.count)); } }, at);
        }
        timeline.to(commands[0], { opacity: 1, duration: 0.18 }, 0.8);
        type(0, "claude", 1.05, 0.065);
        timeline.set(node, { attr: { "data-caret": "none" } }, 1.65)
          .to(commands[1], { opacity: 1, duration: 0.18 }, 2);
        type(1, "mcp", 2.2, 0.08);
        timeline.set(node, { attr: { "data-caret": "none" } }, 2.85)
          .to(response, { opacity: 1, duration: 0.15 }, 3.05)
          .from(servers, { opacity: 0, duration: 0.16, stagger: 0.1 }, 3.15)
          .to(statuses, { opacity: 1, duration: 0.12, stagger: 0.14 }, 3.85)
          .to(commands[2], { opacity: 1, duration: 0.15 }, 4.6);
        type(2, "final", 4.8, 0.032);
        const end = 4.8 + typed[2].text.length * 0.032;
        timeline.set(node, { attr: { "data-caret": "none" } }, end + 0.2)
          .to(idle, { opacity: 1, duration: 0.15 }, end + 0.35)
          .set(node, { attr: { "data-caret": "idle" } }, end + 0.35);
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
