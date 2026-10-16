"use client";

import { useRef, type Dispatch, type RefObject, type SetStateAction } from "react";
import { openingCopy, type ManifestoLocale } from "./opening-copy";
import { useManifestoMotion, type PrototypePlayback } from "./useManifestoMotion";
import styles from "./manifesto-opening.module.css";

/** Approved signature scene. Review playback is optional; the page uses native scroll. */
export function ManifestoOpening({ locale, playback, onPlaybackChange }: {
  locale: ManifestoLocale;
  playback?: RefObject<PrototypePlayback | null>;
  onPlaybackChange?: Dispatch<SetStateAction<boolean>>;
}) {
  const root = useRef<HTMLElement>(null);
  const copy = openingCopy[locale];
  useManifestoMotion(root, playback, onPlaybackChange);

  return <section ref={root} className={styles.sequence} data-manifesto-opening data-manifesto-prototype aria-labelledby="manifesto-heading">
    <h1 id="manifesto-heading" className={styles.srOnly}>{copy.heading}</h1>
    <div className={styles.stage} data-prototype-stage>
      <div className={styles.art} data-prototype-art aria-hidden="true">
        <div className={styles.paper} data-paper />
        <div className={styles.ink} data-ink />
        <div className={styles.axis} data-axis />
        <p className={styles.staticLead}>{copy.staticLead}</p>
        <div className={styles.prefix} data-prefix>{copy.prefix}</div>
        {copy.joiner && <span className={styles.joiner} data-joiner>{copy.joiner}</span>}
        <div className={styles.firstType} data-first-type>
          <div className={styles.typeWindow}>
            <div className={styles.oldWord} data-old-word>{copy.other}</div>
            <div className={styles.newWord} data-new-word><span>{copy.beside[0]}</span><span>{copy.beside[1]}</span></div>
          </div>
        </div>
        <div className={styles.secondType} data-second-type>{copy.side}<span className={styles.period} /></div>
        <p className={styles.eyebrow} data-eyebrow>{copy.eyebrow}</p>
        <p className={styles.initialNote} data-initial-note>{copy.initialNote}</p>
        <p className={styles.finalNote} data-final-note>{copy.finalNote}</p>
      </div>
      <div className={styles.scrollHint} data-scroll-hint><span aria-hidden="true">↓</span>{copy.scroll}</div>
    </div>
  </section>;
}
