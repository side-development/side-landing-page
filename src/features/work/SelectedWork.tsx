"use client";

import Link from "next/link";
import { useRef } from "react";
import { ProjectFeature } from "./ProjectFeature";
import { useWorkMotion } from "./useWorkMotion";
import type { WorkCopy } from "./copy";
import styles from "./work.module.css";

export function SelectedWork({ copy, active }: { copy: WorkCopy; active: boolean }) {
  const section = useRef<HTMLElement>(null);
  useWorkMotion(section, active);

  return <section id="work" tabIndex={-1} ref={section} className={styles.work} hidden={!active} aria-labelledby="selected-work-title" data-selected-work>
    <header className={styles.chapter}>
      <h2 id="selected-work-title">{copy.heading}</h2>
      <p>{copy.count}</p>
    </header>
    <div className={styles.sequence} data-work-sequence>
      <div className={styles.stage} data-work-stage>
        <ProjectFeature id="route" copy={copy.route} labels={copy} active={active} />
        <ProjectFeature id="owl" copy={copy.owl} labels={copy} active={active} />
      </div>
    </div>
    <div className={styles.exit}><Link href={copy.allHref} prefetch={false}>{copy.all}<span aria-hidden="true">→</span></Link></div>
  </section>;
}
