"use client";

import { useEffect, useRef, type RefObject } from "react";

export function useReelPlayback(video: RefObject<HTMLVideoElement | null>, active: boolean) {
  const pausedByUser = useRef(false);

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
      if (visible && !document.hidden && !reduced.matches && !pausedByUser.current && node.closest<HTMLElement>("[data-project]")?.dataset.hidden !== "true") {
        load();
        if (!node.ended) node.play().then(() => {
          if (disposed || !visible || document.hidden || pausedByUser.current || reduced.matches || node.closest<HTMLElement>("[data-project]")?.dataset.hidden === "true") node.pause();
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

  function toggle() {
    const node = video.current;
    if (!node) return;
    if (!node.paused) { pausedByUser.current = true; node.pause(); }
    else {
      pausedByUser.current = false;
      if (!node.getAttribute("src")) node.setAttribute("src", `/work/${node.dataset.reel}/${node.dataset.reel}-reel.mp4`);
      if (node.ended) node.load();
      node.play().catch(() => {});
    }
  }
  return { toggle };
}
