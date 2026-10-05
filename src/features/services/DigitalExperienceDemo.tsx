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
    <div className={styles.composition}>
      <div className={styles.art} data-digital-art-scroll><div data-digital-reflow><div data-digital-layout><div data-digital-pointer><DigitalExperienceArtwork /></div></div></div></div>
      <h2 id={`${id}-title`} className={styles.headline} aria-label={(composed ? copy.alternateHeadline : copy.headline).join(" ")}>
        {[copy.headline, copy.alternateHeadline].map((headline, state) => <span className={styles.headlineState} data-digital-headline={state} aria-hidden="true" key={state}>{headline.map(line => <span className={styles.lineMask} key={line}><span data-digital-line>{line}</span></span>)}</span>)}
      </h2>
      <div className={styles.lower}>
        <div data-digital-detail><p className={styles.note} data-digital-note-layout aria-label={composed ? copy.alternateNote : copy.note}>{[copy.note, copy.alternateNote].map((note, state) => <span data-digital-note={state} aria-hidden="true" key={state}>{note}</span>)}</p></div>
        <div data-digital-detail><div data-digital-action-layout><button type="button" className={styles.action} data-digital-action aria-pressed={composed} onClick={() => { changePerspective(!composed); setComposed(value => !value); }}><span>{copy.action}</span><span className={styles.arrow} aria-hidden="true"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" /></svg></span></button></div></div>
      </div>
    </div>
    <footer className={styles.canvasFooter} data-digital-detail><span>{copy.caption}</span></footer>
  </article>;
}
