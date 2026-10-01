"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function MotionProbe() {
  const marker = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(marker.current, { opacity: 0, y: 4, duration: 0.3 });
    });

    return () => media.revert();
  }, { scope: marker });

  return <div ref={marker} aria-hidden="true" style={{ width: 8, height: 8, background: "currentColor" }} />;
}
