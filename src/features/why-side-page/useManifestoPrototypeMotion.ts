"use client";

import { useRef, type Dispatch, type RefObject, type SetStateAction } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type PrototypePlayback = { play: () => void; seek: (progress: number) => void };

export function useManifestoPrototypeMotion(
  root: RefObject<HTMLElement | null>,
  playback: RefObject<PrototypePlayback | null>,
  setPlaying: Dispatch<SetStateAction<boolean>>,
) {
  const demo = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    const node = root.current;
    if (!node) return;
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", mobile: "(max-width: 800px)", desktop: "(min-width: 801px)" }, context => {
      if (!context.conditions?.motion) return;
      const mobile = !!context.conditions.mobile;
      const art = node.querySelector<HTMLElement>("[data-prototype-art]")!;
      const paper = art.querySelector<HTMLElement>("[data-paper]")!;
      const ink = art.querySelector<HTMLElement>("[data-ink]")!;
      const first = art.querySelector<HTMLElement>("[data-first-type]")!;
      const second = art.querySelector<HTMLElement>("[data-second-type]")!;
      const old = art.querySelector<HTMLElement>("[data-old-word]")!;
      const next = art.querySelector<HTMLElement>("[data-new-word]")!;
      const axis = art.querySelector<HTMLElement>("[data-axis]")!;
      const initial = art.querySelector<HTMLElement>("[data-initial-note]")!;
      const prefix = art.querySelector<HTMLElement>("[data-prefix]")!;
      const joiner = art.querySelector<HTMLElement>("[data-joiner]");
      const final = art.querySelector<HTMLElement>("[data-final-note]")!;
      const eyebrow = art.querySelector<HTMLElement>("[data-eyebrow]")!;
      const hint = node.querySelector<HTMLElement>("[data-scroll-hint]")!;
      const en = node.closest("[data-locale]")?.getAttribute("data-locale") === "en";
      if (mobile) node.style.setProperty("--prototype-stage-height", `${node.querySelector<HTMLElement>("[data-prototype-stage]")!.offsetHeight}px`);
      node.dataset.motion = "ready";

      const width = () => art.clientWidth;
      const height = () => art.clientHeight;
      const angle = () => -Math.atan(height() * .1 / width()) * 180 / Math.PI;
      const rotatedWidth = (element: HTMLElement) => element.offsetWidth * Math.cos(angle() * Math.PI / 180) + element.offsetHeight * Math.abs(Math.sin(angle() * Math.PI / 180));
      const firstEndScale = () => Math.min(1, width() * .90 / rotatedWidth(first));
      const secondEndScale = () => Math.min(en && !mobile ? 1.28 : 1, width() * .87 / rotatedWidth(second), height() * (mobile ? .36 : .35) / second.offsetHeight);
      const firstEndX = () => width() * (mobile ? .05 : .06);
      const firstEndY = () => height() * (mobile ? .325 : .309) - first.offsetHeight * firstEndScale() / 2;
      const secondEndY = () => height() * (mobile ? .762 : .707) - second.offsetHeight * secondEndScale() / 2;
      const firstScale = mobile ? (en ? .80 : .96) : en ? .62 : .70;
      const secondScale = mobile ? 1 : .50;
      const paperStart = mobile ? "polygon(0% 0%, 100% 0%, 100% 49.4%, 0% 49.4%)" : "polygon(0% 0%, 49.6% 0%, 49.6% 100%, 0% 100%)";
      const inkStart = mobile ? "polygon(0% 50.6%, 100% 50.6%, 100% 100%, 0% 100%)" : "polygon(50.4% 0%, 100% 0%, 100% 100%, 50.4% 100%)";
      const paperEnd = mobile ? "polygon(0% 10%, 100% 0%, 100% 46%, 0% 56%)" : "polygon(0% 12%, 100% 2%, 100% 41%, 0% 51%)";
      const inkEnd = mobile ? "polygon(0% 57%, 100% 47%, 100% 87%, 0% 97%)" : "polygon(0% 52%, 100% 42%, 100% 81%, 0% 91%)";
      const firstStartX = () => width() * (mobile ? .06 : .035);
      const firstStartY = () => height() * (mobile ? .29 : .47);
      const secondStartX = () => width() * (mobile ? .08 : .555);
      const secondStartY = () => height() * (mobile ? .69 : .47);

      gsap.set(paper, { clipPath: paperStart });
      gsap.set(ink, { clipPath: inkStart });
      gsap.set(first, { x: firstStartX, y: firstStartY, rotation: 0, scale: firstScale });
      gsap.set(second, { x: secondStartX, y: secondStartY, rotation: 0, scale: secondScale });
      gsap.set(old, { autoAlpha: 1, yPercent: 0 });
      gsap.set(next, { yPercent: 115 });
      gsap.set([prefix, initial, hint], { autoAlpha: 1 });
      if (joiner) gsap.set(joiner, { autoAlpha: 1 });
      gsap.set([final, eyebrow], { autoAlpha: 0 });
      gsap.set(axis, { x: () => mobile ? 0 : width() / 2, y: () => mobile ? height() / 2 : 0, rotation: mobile ? 0 : 90, scaleX: () => mobile ? 1 : height() / width() });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          id: "why-side-prototype",
          trigger: node,
          start: "top top",
          end: () => `+=${node.offsetHeight - node.querySelector<HTMLElement>("[data-prototype-stage]")!.offsetHeight}`,
          scrub: .45,
          invalidateOnRefresh: true,
          onUpdate: self => { node.dataset.progress = self.progress.toFixed(3); },
        },
      });

      // 1. Separation has a physical width; the dividing axis holds its ground.
      timeline.set(first, { x: firstStartX, y: firstStartY, rotation: 0, scale: firstScale }, 0)
        .set(second, { x: secondStartX, y: secondStartY, rotation: 0, scale: secondScale }, 0)
        .to(prefix, { y: -28, autoAlpha: 0, duration: .8 }, .65)
        .to(initial, { autoAlpha: 0, duration: .55 }, .7)
        .to(hint, { autoAlpha: 0, duration: .35 }, .4)
        .to(paper, { clipPath: mobile ? "polygon(0% 0%, 100% 0%, 100% 44%, 0% 37%)" : "polygon(0% 0%, 39% 0%, 46% 100%, 0% 100%)", duration: 1.6 }, .7)
        .to(ink, { clipPath: mobile ? "polygon(0% 63%, 100% 56%, 100% 100%, 0% 100%)" : "polygon(61% 0%, 100% 0%, 100% 100%, 54% 100%)", duration: 1.6 }, .7)
        .to(first, { x: () => firstStartX() - width() * .018, rotation: mobile ? -5 : -8, duration: 1.6 }, .7)
        .to(second, { x: () => secondStartX() + width() * .025, rotation: mobile ? 5 : 8, duration: 1.6 }, .7);
      if (joiner) timeline.to(joiner, { autoAlpha: 0, duration: .8 }, .65);

      // 2. One continuous change of axis. The old divider becomes common ground.
      timeline.to(paper, { clipPath: paperEnd, duration: 3.8 }, 2.25)
        .to(ink, { clipPath: inkEnd, duration: 3.8 }, 2.25)
        .to(axis, { x: 0, y: () => height() * (mobile ? .565 : .515), rotation: angle, scaleX: 1.05, duration: 3.8 }, 2.25)
        .to(first, { x: firstEndX, y: firstEndY, scale: firstEndScale, rotation: angle, duration: 3.8 }, 2.25)
        .to(second, { x: () => width() * .08, y: secondEndY, scale: secondEndScale, rotation: angle, duration: 3.8 }, 2.25)
        .to(old, { yPercent: -125, duration: 2.0, ease: "power4.inOut" }, 3.05)
        .to(next, { yPercent: 0, duration: 2.0, ease: "power4.inOut" }, 3.05);

      // Keep the original pacing, letting the aligned composition hold in silence.
      timeline.to(final, { autoAlpha: 1, duration: .8 }, 5.8)
        .to(eyebrow, { autoAlpha: 1, duration: .8 }, 5.6)
        .to({}, { duration: 2.65 });

      const trigger = timeline.scrollTrigger!;
      const stop = () => { demo.current?.kill(); demo.current = null; setPlaying(false); };
      const seek = (progress: number) => {
        stop();
        window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress, behavior: "instant" });
        trigger.update();
        timeline.progress(progress);
      };
      playback.current = {
        seek,
        play: () => {
          if (demo.current) { stop(); return; }
          seek(0);
          setPlaying(true);
          const cursor = { progress: 0 };
          demo.current = gsap.to(cursor, {
            progress: 1, duration: 15, ease: "none",
            onUpdate: () => window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * cursor.progress, behavior: "instant" }),
            onComplete: stop,
          });
        },
      };
      const key = (event: KeyboardEvent) => { if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) stop(); };
      window.addEventListener("wheel", stop, { passive: true });
      const touch = (event: TouchEvent) => { if (!(event.target instanceof Element && event.target.closest("[data-prototype-controls]"))) stop(); };
      window.addEventListener("touchstart", touch, { passive: true });
      window.addEventListener("keydown", key);
      const visibility = () => { if (document.hidden) stop(); };
      document.addEventListener("visibilitychange", visibility);
      ScrollTrigger.refresh();
      return () => {
        stop();
        playback.current = null;
        window.removeEventListener("wheel", stop);
        window.removeEventListener("touchstart", touch);
        window.removeEventListener("keydown", key);
        document.removeEventListener("visibilitychange", visibility);
        delete node.dataset.motion;
        delete node.dataset.progress;
        node.style.removeProperty("--prototype-stage-height");
      };
    });
    return () => media.revert();
  }, { scope: root });
}
