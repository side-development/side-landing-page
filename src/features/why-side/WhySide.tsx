"use client";

import { useId, useRef } from "react";
import { BrandWordmark } from "@/features/hero/BrandWordmark";
import { whySideCopy, type WhySideLocale } from "./copy";
import { useWhySideMotion } from "./useWhySideMotion";
import styles from "./why-side.module.css";

export function WhySide({ locale, active = true }: { locale: WhySideLocale; active?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const headingId = useId();
  const copy = whySideCopy[locale];
  useWhySideMotion(root, active);

  return <section id="why-side" tabIndex={-1} ref={root} className={styles.why} hidden={!active} aria-labelledby={headingId} data-why-side>
    <h2 id={headingId} className={styles.srOnly}>{copy.heading}</h2>
    <div className={styles.sequence} data-why-sequence>
      <div className={styles.stage} data-why-stage>
        <ol className={styles.values}>
        {copy.values.map((value, index) => <li key={value.id} className={styles.value} data-why-value={value.id}>
          <div className={styles.srOnly}>
            <h3>{copy.you} + {value.label}</h3>
            <p>{value.description}</p>
          </div>
          <div className={styles.content} data-why-content aria-hidden="true">
            <div className={styles.title}>
              <div className={styles.composition}>
                <span className={styles.prefix} data-why-flow-prefix data-why-fixed-prefix={index === 0 ? "" : undefined}><span className={styles.you}>{copy.you}</span><span className={styles.plus}>+</span></span>
                <span className={styles.term}>
                  <span className={styles.word} data-why-word>{value.id === "side" ? <BrandWordmark className={styles.wordmark} /> : value.label}</span>
                </span>
              </div>
            </div>
            <p className={styles.description} data-why-description>{value.description}</p>
          </div>
        </li>)}
        </ol>
      </div>
    </div>
  </section>;
}
