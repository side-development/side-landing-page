import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { partition, surfaceFragment } from "./fragments";
import styles from "./hero.module.css";

gsap.registerPlugin(ScrambleTextPlugin);

export function createHeroTimeline(root: HTMLElement, stage: HTMLElement, reduced: boolean, onComplete: () => void, onPurple?: () => void) {
  const surface = root.querySelector<HTMLElement>("[data-error-surface]")!;
  const final = root.querySelector<HTMLElement>("[data-final-hero]")!;
  const brand = root.querySelector<SVGSVGElement>("[data-wordmark]")!;
  const s = brand.querySelector("[data-part='s']")!;
  const dot = brand.querySelector("[data-part='circulo-roxo']")!;
  const letters = ["i", "d", "e"].map(part => brand.querySelector(`[data-part='${part}']`)!);
  const chrome = final.querySelectorAll("[data-final-chrome]");
  const black = stage.querySelector("[data-black-field]");
  const whiteLayer = stage.querySelector<HTMLElement>("[data-white-fragments]")!;
  const uiLayer = stage.querySelector<HTMLElement>("[data-interface-fragments]")!;
  const purpleLayer = stage.querySelector<HTMLElement>("[data-purple-fragments]")!;
  const purpleField = stage.querySelector<SVGSVGElement>("[data-purple-field]")!;
  const circle = purpleField.querySelector<SVGCircleElement>("[data-purple-surface]")!;
  const phrases = Array.from(stage.querySelectorAll<HTMLElement>("[data-phrase]"));
  const width = window.innerWidth;
  const height = window.innerHeight;
  const mobile = width < 700;
  const travel = mobile ? 7 : 18;
  const brandRect = brand.getBoundingClientRect();
  const brandTop = brandRect.top + window.scrollY;
  const unit = brandRect.width / 1654;
  const symbolScale = Math.min(mobile ? 1.2 : 0.42, height * 0.28 / (467 * unit));
  const symbolX = width / 2 - brandRect.left - 263 * unit * symbolScale;
  const symbolY = height / 2 - brandTop - 450 * unit * symbolScale;
  const dotX = brandRect.left + symbolX + 464 * unit * symbolScale;
  const dotY = brandTop + symbolY + 627 * unit * symbolScale;
  const dotSize = 118.6 * unit * symbolScale;
  const fieldRegions = partition(width, height, mobile ? 4 : 5);

  gsap.set(stage, { visibility: "visible", "--phrase-emphasis": "#3919BD" });
  gsap.set(brand, { transformOrigin: "0 0", x: symbolX, y: symbolY, scale: symbolScale });
  gsap.set([s, ...letters], { opacity: 0 });
  gsap.set(dot, { opacity: 0, x: -1102, y: 42, scale: 0.674, transformOrigin: "50% 50%" });
  gsap.set(chrome, { opacity: 0 });
  const timeline = gsap.timeline({ onComplete });
  timeline.call(() => { surface.inert = true; }, [], 0.34);
  timeline.set(document.body, { overflow: "hidden" }, 0.34);

  if (reduced) {
    timeline.to(surface, { opacity: 0, duration: 0.65 }, 0.34)
      .to(black, { opacity: 1, duration: 0.65 }, 0.34);
  } else {
    timeline.set(surface, { filter: "grayscale(1)" }, 0.34);
    const code = surface.querySelector(`.${styles.errorCode} span[aria-hidden]`)!;
    const heading = surface.querySelector(`.${styles.heading}`)!;
    timeline.to(code, { duration: 0.32, scrambleText: { text: "ERR_CONNEC██N_CLOSED", chars: "_█", speed: 0.2 } }, 0.34)
      .set(code, { textContent: "ER_ CONNECTION_CLO_ED" }, 0.69)
      .set(code, { textContent: "ERR_DIGITAL_EXPERIENCE" }, 0.83)
      .to(heading, { x: -travel * 0.3, clipPath: "inset(0 0 14% 0)", duration: 0.11 }, 0.43)
      .to(heading, { x: travel * 0.2, clipPath: "inset(8% 0 0 0)", duration: 0.09 }, 0.57)
      .to(heading, { x: 0, clipPath: "inset(0 0 0 0)", duration: 0.12 }, 0.7);

    const groups: [string, number][] = [
      [`.${styles.description}, .${styles.suggestionLink}`, 1.1],
      [`.${styles.suggestions}`, 1.5],
      [`.${styles.errorCode}`, 1.9],
      [`.${styles.heading}`, 2.3],
      [`.${styles.actions} button, .${styles.icon}`, 2.7],
    ];
    groups.forEach(([selector, at], groupIndex) => {
      surface.querySelectorAll<HTMLElement>(selector).forEach((element, elementIndex) => {
        const rect = element.getBoundingClientRect();
        const pieces = partition(rect.width, rect.height, mobile ? 1 : 2);
        pieces.forEach((region, index) => {
          const fragment = document.createElement("div");
          fragment.className = styles.interfaceFragment;
          Object.assign(fragment.style, { left: `${rect.left + region.x}px`, top: `${rect.top + region.y}px`, width: `${region.width}px`, height: `${region.height}px`, opacity: "0" });
          const clone = element.cloneNode(true) as HTMLElement;
          clone.removeAttribute("id");
          if (element.classList.contains(styles.errorCode)) {
            const visualCode = clone.querySelector("span[aria-hidden]");
            if (visualCode) visualCode.textContent = "ERR█D█GITAL█EXPERIENCE";
          }
          clone.querySelectorAll("[id]").forEach(node => node.removeAttribute("id"));
          clone.querySelectorAll(`.${styles.suggestionLink}`).forEach(node => (node as HTMLElement).style.visibility = "hidden");
          const appearance = getComputedStyle(element);
          Object.assign(clone.style, { position: "absolute", margin: "0", left: `${-region.x}px`, top: `${-region.y}px`, width: `${rect.width}px`, height: `${rect.height}px`, maxWidth: "none", fontSize: appearance.fontSize, lineHeight: appearance.lineHeight, color: appearance.color });
          fragment.appendChild(clone);
          uiLayer.appendChild(fragment);
          const start = at + (elementIndex % 2) * 0.05;
          timeline.set(fragment, { opacity: 1 }, start)
            .to(fragment, { x: (index % 2 ? 1 : -1) * travel, y: (index % 3 - 1) * 4, scaleX: 0.88, duration: 0.24, ease: "steps(2)" }, start + 0.09 + index * 0.1)
            .set(fragment, { opacity: 0 }, start + 0.4 + index * 0.1 + groupIndex * 0.015);
        });
        timeline.set(element, { visibility: "hidden" }, at + (elementIndex % 2) * 0.05);
      });
    });

    const white = fieldRegions.map(region => {
      const tile = surfaceFragment(region, "#fff");
      whiteLayer.appendChild(tile);
      return tile;
    });
    gsap.set(white, { visibility: "hidden" });
    timeline.set(white, { visibility: "visible" }, 3.2)
      .set(black, { opacity: 1 }, 3.2)
      .set(surface, { visibility: "hidden" }, 3.2);
    white.forEach((tile, index) => {
      timeline.to(tile, { scaleX: index % 3 === 0 ? 0.02 : 0.92, scaleY: index % 3 === 0 ? 0.94 : 0.02, opacity: 0, duration: 0.3, ease: "steps(3)" }, 3.21 + ((index * 13) % white.length) / white.length * 0.85);
    });
  }

  const sentenceStart = reduced ? 1.34 : 4.7;
  timeline.call(() => window.scrollTo({ top: 0, behavior: "instant" }), [], sentenceStart - 0.32);
  const sentenceTimes = [sentenceStart, sentenceStart + 2.65, sentenceStart + 5.4];
  phrases.forEach((phrase, index) => {
    const text = phrase.firstElementChild;
    timeline.set(phrase, { visibility: "visible" }, sentenceTimes[index])
      .fromTo(text, { yPercent: reduced ? 0 : 106, opacity: reduced ? 0 : 1 }, { yPercent: 0, opacity: 1, duration: reduced ? 0.55 : 0.7, ease: "power3.out" }, sentenceTimes[index])
      .to(text, { opacity: 0, yPercent: reduced ? 0 : -12, duration: 0.4 }, sentenceTimes[index] + (index === 2 ? 4.15 : 2.15));
  });

  const purpleAt = sentenceTimes[2] + 1.9;
  const collapseAt = purpleAt + 2.75;
  timeline.call(() => onPurple?.(), [], purpleAt + (reduced ? 0.85 : 1.14));
  timeline.to(stage, { "--phrase-emphasis": "#000", duration: 0.9, ease: "none" }, purpleAt + (reduced ? 0.4 : 0.75));
  if (reduced) {
    timeline.to(black, { backgroundColor: "#3919BD", duration: 0.85 }, purpleAt)
      .set(final, { visibility: "visible" }, collapseAt)
      .set(dot, { opacity: 1 }, collapseAt)
      .to(black, { opacity: 0, duration: 0.85 }, collapseAt);
  } else {
    const purple = fieldRegions.map(region => {
      const tile = surfaceFragment(region, "#3919BD");
      purpleLayer.appendChild(tile);
      return tile;
    });
    gsap.set(purple, { scaleX: 0, transformOrigin: "left center" });
    purple.forEach((tile, index) => {
      timeline.to(tile, { scaleX: 1, duration: 0.34, ease: "steps(4)" }, purpleAt + ((index * 7) % purple.length) / purple.length * 0.8);
    });
    const fullRadius = Math.hypot(Math.max(dotX, width - dotX), Math.max(dotY, height - dotY)) + 2;
    const pointRadius = dotSize / 2;
    const circularEase = (progress: number) => {
      const pull = progress * progress * (3 - 2 * progress);
      const radius = fullRadius * Math.pow(pointRadius / fullRadius, pull);
      return (fullRadius - radius) / (fullRadius - pointRadius);
    };
    purpleField.setAttribute("viewBox", `0 0 ${width} ${height}`);
    gsap.set(circle, { attr: { cx: dotX, cy: dotY, r: fullRadius } });
    timeline.set(purpleField, { visibility: "visible" }, purpleAt + 1.14)
      .set(purpleLayer, { visibility: "hidden" }, purpleAt + 1.14)
      .set(black, { opacity: 0 }, collapseAt)
      .set(final, { visibility: "visible" }, collapseAt)
      .to(circle, { attr: { r: pointRadius }, duration: 3.1, ease: circularEase }, collapseAt)
      .set(dot, { opacity: 1 }, collapseAt + 3.05)
      .to(purpleField, { opacity: 0, duration: 0.12 }, collapseAt + 3.1);
  }

  const symbolAt = collapseAt + (reduced ? 1.15 : 3.6);
  timeline.fromTo(s, { opacity: 0, clipPath: "inset(100% 0 0 0)" }, { opacity: 1, clipPath: "inset(0% 0 0 0)", duration: reduced ? 0.65 : 0.85, ease: "power3.inOut" }, symbolAt);
  const expandAt = symbolAt + 1.25;
  const completeScale = mobile ? 0.85 : 0.63;
  const fullX = (width - brandRect.width * completeScale) / 2 - brandRect.left;
  const fullY = (height - brandRect.height * completeScale) / 2 - brandTop;
  timeline.to(dot, { x: 0, y: 0, scale: 1, duration: reduced ? 0.65 : 1.25, ease: "power3.inOut" }, expandAt)
    .to(brand, { x: fullX, y: fullY, scale: completeScale, duration: reduced ? 0.65 : 1.25, ease: "power3.inOut" }, expandAt);
  letters.forEach((letter, index) => timeline.fromTo(letter, { opacity: 0, clipPath: "inset(0 100% 0 0)" }, { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.65, ease: "power3.out" }, expandAt + 0.22 + index * 0.19));
  const settleAt = expandAt + 1.8;
  timeline.to(brand, { x: 0, y: 0, scale: 1, duration: reduced ? 0.7 : 1.35, ease: "power3.inOut" }, settleAt)
    .to(chrome, { opacity: 1, duration: 0.75 }, settleAt + (reduced ? 0.5 : 0.9));

  return () => {
    timeline.revert();
    whiteLayer.replaceChildren();
    uiLayer.replaceChildren();
    purpleLayer.replaceChildren();
    surface.inert = false;
  };
}
