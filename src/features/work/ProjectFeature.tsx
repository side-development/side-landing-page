"use client";

import { useRef } from "react";
import Image from "next/image";
import type { ProjectCopy, WorkCopy } from "./copy";
import { useReelPlayback } from "./useReelPlayback";
import { useProjectMotion } from "./useProjectMotion";
import styles from "./work.module.css";

export function ProjectFeature({ id, copy, labels, active }: {
  id: "route" | "owl";
  copy: ProjectCopy;
  labels: Pick<WorkCopy, "view">;
  active: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const media = useRef<HTMLAnchorElement>(null);
  useReelPlayback(video, active);
  useProjectMotion(media, active);
  const href = id === "route" ? "https://routesecurity.com.br/" : "https://owlloc.com/";

  return <article className={styles.project} data-project={id} aria-labelledby={`${id}-title`}>
    <a ref={media} className={styles.media} href={href} target="_blank" rel="noopener noreferrer" data-project-media data-cursor-label={labels.view.toLowerCase()} aria-label={`${labels.view}: ${copy.name}`}>
      <div className={styles.sheets}>
        <div className={`${styles.sheet} ${styles.backSheet}`} data-sheet="back" aria-hidden="true">
          <div className={styles.sheetSurface}>
            {active && <Image src={`/work/${id}/${id}-still.webp`} fill sizes="(max-width: 800px) 75vw, 42vw" alt="" className={styles.still} />}
          </div>
        </div>
        <div className={`${styles.sheet} ${styles.frontSheet}`} data-sheet="front">
          <div className={styles.sheetSurface}>
            <video ref={video} className={styles.video} width={1440} height={900} loop muted playsInline preload="none" poster={active ? `/work/${id}/${id}-poster.webp` : undefined} data-reel={id} aria-hidden="true" tabIndex={-1}>
              {copy.name}
            </video>
          </div>
        </div>
      </div>
    </a>
    <div className={styles.caption} data-project-caption>
      <div className={styles.identity}>
        <h3 id={`${id}-title`}>{copy.name}</h3>
        <p className={styles.metadata}><span>{copy.category}</span><span>2026</span></p>
      </div>
      <div>
        <p className={styles.teaser}>{copy.teaser}</p>
      </div>
    </div>
  </article>;
}
