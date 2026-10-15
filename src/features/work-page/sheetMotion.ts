import type { CSSProperties } from "react";

/**
 * Pure maths for the sheet belt. The same function drives the server-rendered
 * first paint and the per-frame updates, so hydration never disagrees with motion.
 */

export type BeltTuning = {
  /** Max blur in px applied to the first neighbour. */
  blur: number;
  /** Fraction of scale lost by the first neighbour. */
  depth: number;
  /** Fraction of opacity lost by the first neighbour. */
  dim: number;
};

export const defaultTuning: BeltTuning = { blur: 8, depth: 0.12, dim: 0.46 };

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export const mod = (value: number, count: number) => ((value % count) + count) % count;

/** Signed shortest distance on a ring, in [-count/2, count/2). */
export const wrap = (value: number, count: number) => mod(value + count / 2, count) - count / 2;

export const relativeOf = (index: number, position: number, count: number, loop: boolean) =>
  loop ? wrap(index - position, count) : index - position;

export function sheetStyle(relative: number, tuning: BeltTuning = defaultTuning): CSSProperties {
  const distance = Math.abs(relative);
  const near = clamp(distance);
  const far = clamp(distance - 1, 0, 0.6);
  const scale = 1 - tuning.depth * near - 0.05 * far;
  const opacity = distance <= 1 ? 1 - tuning.dim * distance : (1 - tuning.dim) * (1 - far / 0.6);
  // Half-pixel steps keep the filter from being rasterised on every sub-pixel change.
  const blur = Math.round((tuning.blur * near + 3 * far) * 2) / 2;
  const origin = 50 - 50 * clamp(relative, -1, 1);
  return {
    transform: `translate3d(calc(${relative.toFixed(4)} * (100% + var(--sheet-gap))), 0, 0) scale(${scale.toFixed(4)})`,
    transformOrigin: `${origin.toFixed(2)}% 50%`,
    opacity: Number(opacity.toFixed(3)),
    filter: blur > 0 ? `blur(${blur}px)` : "none",
    zIndex: 20 - Math.round(distance * 4),
    visibility: opacity <= 0.001 ? "hidden" : "visible",
    pointerEvents: distance > 1.4 ? "none" : "auto",
  };
}

/** Writes a sheet style straight to the DOM (React never re-applies unchanged inline styles). */
export function paintSheet(element: HTMLElement, relative: number, tuning: BeltTuning) {
  const style = sheetStyle(relative, tuning);
  element.style.transform = style.transform as string;
  element.style.transformOrigin = style.transformOrigin as string;
  element.style.opacity = String(style.opacity);
  element.style.filter = style.filter as string;
  element.style.zIndex = String(style.zIndex);
  element.style.visibility = style.visibility as string;
  element.style.pointerEvents = style.pointerEvents as string;
}
