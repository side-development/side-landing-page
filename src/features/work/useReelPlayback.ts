"use client";

import { useEffect, type RefObject } from "react";

export function useReelPlayback(video: RefObject<HTMLVideoElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !video.current) return;
    const node = video.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let disposed = false;
    function load() {
      if (!node.getAttribute("src")) node.src = `/work/${node.dataset.reel}/${node.dataset.reel}-reel.mp4`;
    }
    function sync() {
      if (visible && !document.hidden && !reduced.matches && node.closest<HTMLElement>("[data-project]")?.dataset.hidden !== "true") {
        load();
        if (!node.ended) node.play().then(() => {
          if (disposed || !visible || document.hidden || reduced.matches || node.closest<HTMLElement>("[data-project]")?.dataset.hidden === "true") node.pause();
        }).catch(() => {});
      } else node.pause();
    }
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: 0.2 });
    observer.observe(node);
    const project = node.closest("[data-project]")!;
    const stateObserver = new MutationObserver(sync);
    stateObserver.observe(project, { attributes: true, attributeFilter: ["data-hidden"] });
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      disposed = true;
      observer.disconnect(); stateObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      node.pause();
    };
  }, [active, video]);

}
