"use client";

import { useId, useRef, useState } from "react";
import type { WhySideLocale } from "./copy";
import { socialProofCopy, socialProofEntries, socialProofEmphasis, type SocialProofEntry } from "./socialProofCopy";
import { useSocialProofMotion } from "./useSocialProofMotion";
import styles from "./social-proof.module.css";

export function SocialProof({ locale, entries = socialProofEntries[locale], initialIndex = 0, active = true }: {
  locale: WhySideLocale; entries?: SocialProofEntry[]; initialIndex?: number; active?: boolean;
}) {
  const root = useRef<HTMLElement>(null);
  const headingId = useId(), beltId = useId(), instructionsId = useId();
  const [current, setCurrent] = useState(Math.max(0, Math.min(entries.length - 1, initialIndex)));
  const [paused, setPaused] = useState(false);
  const { goTo, togglePlayback } = useSocialProofMotion(root, entries.length, initialIndex, active, setCurrent, setPaused);
  const copy = socialProofCopy[locale];
  // Boundary copies preserve the neighbors during a seamless wrap.
  // Only nearby entries are painted: up to four during the edge crossfade.
  const loopEntries = [...entries.slice(-2), ...entries, ...entries.slice(0, 2)];
  function highlightedText(entry: SocialProofEntry) {
    const words = socialProofEmphasis[locale][entry.id] ?? [];
    let start = 0;
    const parts = words.flatMap(word => {
      const index = entry.text.indexOf(word, start);
      if (index < 0) return [];
      const before = entry.text.slice(start, index);
      start = index + word.length;
      return [before, <strong key={index} className={styles.keyword}>{word}</strong>];
    });
    return <>{parts}{entry.text.slice(start)}</>;
  }

  return <section ref={root} className={styles.proof} hidden={!active} aria-labelledby={headingId} data-social-proof>
    <h2 id={headingId} className={styles.heading}>{copy.heading}</h2>
    <p id={instructionsId} className={styles.srOnly}>{copy.instructions}</p>
    <ol className={styles.srOnly} aria-label={copy.region}>
      {entries.map(entry => <li key={entry.id}><p>{entry.text}</p><p>{entry.theme} · {entry.context}</p></li>)}
    </ol>
    <div id={beltId} className={styles.belt} tabIndex={0} role="group" aria-roledescription={copy.carousel} aria-label={copy.region} aria-describedby={instructionsId} data-proof-belt data-cursor-label="↔">
      <div className={styles.track} aria-hidden="true">
        {loopEntries.map((entry, index) => <div key={`${entry.id}-${index}`} className={styles.item} data-proof-item={entry.id}>
          <div className={styles.feedback} data-proof-feedback>
            <p className={styles.quote}><span aria-hidden="true">“</span>{highlightedText(entry)}<span aria-hidden="true">”</span></p>
            <p className={styles.metadata}>{entry.theme}<span> · </span>{entry.context}</p>
          </div>
        </div>)}
      </div>
    </div>
    <div className={styles.accessibleControls}>
      <button type="button" className={styles.accessibleButton} aria-controls={beltId} onClick={() => goTo(current - 1)}>{copy.previous}</button>
      <button type="button" className={styles.accessibleButton} aria-controls={beltId} onClick={togglePlayback}>{paused ? copy.resume : copy.pause}</button>
      <button type="button" className={styles.accessibleButton} aria-controls={beltId} onClick={() => goTo(current + 1)}>{copy.next}</button>
    </div>
  </section>;
}
