"use client";

import { useId, useRef, useState } from "react";
import { DigitalExperienceArtwork } from "./DigitalExperienceArtwork";
import { digitalExperienceCopy, type DigitalExperienceLocale } from "./digitalExperienceCopy";
import { useDigitalExperienceMotion } from "./useDigitalExperienceMotion";
import styles from "./digital-experience.module.css";

export function DigitalExperienceDemo({ locale, replay = 0 }: { locale: DigitalExperienceLocale; replay?: number }) {
  const root = useRef<HTMLElement>(null);
  const id = useId();
  const [composed, setComposed] = useState(false);
  const copy = digitalExperienceCopy[locale];
  const changePerspective = useDigitalExperienceMotion(root, replay);

  return <article ref={root} className={styles.experience} aria-labelledby={`${id}-title`} data-digital-experience data-composed={composed} data-locale={locale}>
    <header className={styles.canvasHeader} data-digital-detail><span>Side / 01</span><span>{composed ? copy.composed : copy.free}</span></header>
    <div className={styles.composition}>
      <div className={styles.art} data-digital-art-scroll><div data-digital-reflow><div data-digital-layout><div data-digital-pointer><DigitalExperienceArtwork /></div></div></div></div>
      <h2 id={`${id}-title`} className={styles.headline} data-digital-type-layout>{copy.headline.map((line, index) => <span className={styles.lineMask} key={line}><span data-digital-line>{line}{index === 0 && <i aria-hidden="true" />}</span></span>)}</h2>
      <div className={styles.lower}>
        <p className={styles.note} data-digital-detail>{copy.note}</p>
        <div data-digital-detail><button type="button" className={styles.action} data-digital-action aria-pressed={composed} onClick={() => { changePerspective(!composed); setComposed(value => !value); }}><span>{copy.action}</span><span className={styles.arrow} aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" /></svg></span></button></div>
      </div>
    </div>
    <footer className={styles.canvasFooter} data-digital-detail><span>{copy.caption}</span><span>{copy.scroll}<span aria-hidden="true">↓</span></span></footer>
  </article>;
}
