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
  useDigitalExperienceMotion(root, replay, setComposed);

  return <article ref={root} className={styles.experience} aria-labelledby={`${id}-title`} data-digital-experience data-composed={composed} data-locale={locale}>
    <div className={styles.composition}>
      <div className={styles.art} data-digital-art-scroll><div data-digital-layout><div data-digital-pointer><DigitalExperienceArtwork /></div></div></div>
      <h2 id={`${id}-title`} className={styles.headline} aria-label={(composed ? copy.alternateHeadline : copy.headline).join(" ")}>
        {[copy.headline, copy.alternateHeadline].map((headline, state) => <span className={styles.headlineState} data-digital-headline={state} aria-hidden="true" key={state}>{headline.map(line => <span className={styles.lineMask} key={line}><span data-digital-line>{line}</span></span>)}</span>)}
      </h2>
      <div className={styles.lower}>
        <div data-digital-detail><p className={styles.note} data-digital-note-layout aria-label={composed ? copy.alternateNote : copy.note}>{[copy.note, copy.alternateNote].map((note, state) => <span data-digital-note={state} aria-hidden="true" key={state}>{note}</span>)}</p></div>
      </div>
    </div>
    <footer className={styles.canvasFooter} data-digital-detail><span>{copy.caption}</span></footer>
  </article>;
}
