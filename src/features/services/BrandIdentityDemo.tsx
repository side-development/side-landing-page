"use client";

import Image from "next/image";
import { useCallback, useId, useRef } from "react";
import gsap from "gsap";
import type { DigitalExperienceLocale } from "./digitalExperienceCopy";
import { identityCopy } from "./serviceScenesCopy";
import { serviceRevealDuration } from "./serviceEntrance";
import { useServiceSceneMotion, type SceneSequence } from "./useServiceSceneMotion";
import { useIdentityPointer } from "./useIdentityPointer";
import styles from "./brand-identity.module.css";

const colors = ["#3919BD", "#080808", "#F0EDF7", "#FFFFFF"];

export function BrandIdentityDemo({ locale }: { locale: DigitalExperienceLocale }) {
  const root = useRef<HTMLElement>(null);
  const id = useId();
  const copy = identityCopy[locale];
  const sequence = useCallback<SceneSequence>((node, timeline) => {
    const lines = node.querySelectorAll("[data-identity-line]");
    const palettes = node.querySelectorAll("[data-identity-color]");
    const expression = node.querySelector("[data-identity-expression]");
    const logo = node.querySelector("[data-identity-logo]");
    if (!timeline) { gsap.set([palettes, expression, logo], { opacity: 1, clearProps: "transform,filter" }); gsap.set(lines, { strokeDashoffset: 0 }); return; }
    timeline.fromTo(lines, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: serviceRevealDuration - .45, stagger: { amount: .35 }, ease: "power2.inOut" }, .1)
      .fromTo(logo, { opacity: 0, scale: .92, filter: "blur(12px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "sine.out", clearProps: "filter" }, .6)
      .fromTo(palettes, { opacity: 0, y: 24, scaleY: .85 }, { opacity: 1, y: 0, scaleY: 1, duration: .85, stagger: .1, ease: "power3.out" }, .5)
      .fromTo(expression, { opacity: 0, y: 14, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: .9, ease: "sine.out", clearProps: "filter" }, .8)
      .to(logo, { y: -6, duration: 3, yoyo: true, repeat: 1, ease: "sine.inOut" }, 3);
  }, []);
  useServiceSceneMotion(root, sequence);
  useIdentityPointer(root);

  return <figure ref={root} className={styles.identity} data-identity aria-labelledby={`${id}-caption`}>
    <div className={styles.surface} data-scene-surface>
      <div className={styles.intro}><h4>{copy.headline[0]}<br /><span>{copy.headline[1]}</span></h4><p>{copy.signature}</p></div>
      <div className={styles.construction} aria-hidden="true">
        <div className={styles.annotation}><span>01 / {copy.structure}</span><span>SIDE</span></div>
        <svg className={styles.grid} viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
          <g className={styles.gridLines}>{Array.from({ length: 19 }, (_, i) => <path key={`v${i}`} d={`M${60 + i * 60} 0V500`} pathLength="1" data-identity-line />)}{Array.from({ length: 9 }, (_, i) => <path key={`h${i}`} d={`M0 ${10 + i * 60}H1200`} pathLength="1" data-identity-line />)}</g>
        </svg>
        <div className={styles.logo} data-identity-logo><div className={styles.logoPointer} data-identity-pointer><Image src="/brand/side-logo-black.svg" width={1265} height={1126} alt="" sizes="(max-width: 800px) 190px, 270px" /></div></div>
      </div>
      <div className={styles.elements} aria-hidden="true">
        <div className={styles.palette}><p>02 / {copy.palette}</p><div className={styles.swatches}>{colors.map((color, i) => <div key={color} className={styles.swatch} data-identity-color><div className={styles.colorTile} style={{ backgroundColor: color }} /><span>{String(i + 1).padStart(2, "0")}<small>{color}</small></span></div>)}</div></div>
        <div className={styles.expression} data-identity-expression><p>03 / {copy.type}</p><div><strong><span>Aa</span><span className={styles.italicLetters} aria-hidden="true">Aa</span></strong></div></div>
      </div>
    </div>
    <figcaption id={`${id}-caption`} className={styles.caption}><span>{copy.caption}</span><span className={styles.srOnly}>{copy.accessible}</span></figcaption>
  </figure>;
}
