import { useLayoutEffect, useRef, useState } from "react";
import styles from "./hero.module.css";

const strokes = {
  work: "M2 8 C14 5 23 11 36 8 S58 6 71 8 S91 9 118 5",
  services: "M2 6 C24 5 47 5 62 7 C78 9 80 13 67 12 C53 11 51 7 64 6 C83 5 102 6 118 8",
  why: "M2 10 C24 7 38 5 54 7 S79 12 94 8 L118 5",
  contact: "M2 7 C25 10 48 10 70 8 S101 6 118 4 M10 12 C42 9 78 9 109 11",
};

export function NavUnderline({ variant }: { variant: keyof typeof strokes }) {
  const svg = useRef<SVGSVGElement>(null);
  const [viewport, setViewport] = useState({ width: 120, height: 16 });

  useLayoutEffect(() => {
    const element = svg.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      setViewport(current => (
        current.width === width && current.height === height ? current : { width, height }
      ));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  let coordinate = 0;
  const path = strokes[variant].replace(/\d+(?:\.\d+)?/g, value => {
    const scale = coordinate++ % 2 === 0 ? viewport.width / 120 : viewport.height / 16;
    return (Number(value) * scale).toFixed(3);
  });

  return (
    <svg ref={svg} className={styles.navUnderline} viewBox={`0 0 ${viewport.width} ${viewport.height}`} aria-hidden="true" focusable="false">
      <path d={path} pathLength="1" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
