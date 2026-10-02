"use client";

import { useRef, useState } from "react";
import type { ProjectCopy, WorkCopy } from "./copy";
import { useReelPlayback } from "./useReelPlayback";
import styles from "./work.module.css";

export function ProjectFeature({ id, copy, labels, active }: {
  id: "route" | "owl";
  copy: ProjectCopy;
  labels: Pick<WorkCopy, "view" | "pause" | "play">;
  active: boolean;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const playback = useReelPlayback(video, active);
  const href = id === "route" ? "https://routesecurity.com.br/" : "https://owlloc.com/";

  return <article className={styles.project} data-project={id} aria-labelledby={`${id}-title`}>
    <div className={styles.mediaFrame}><a className={styles.media} href={href} target="_blank" rel="noopener noreferrer" data-project-media data-cursor-label={labels.view.toLowerCase()} aria-label={`${labels.view}: ${copy.name}`}>
      <video ref={video} className={styles.video} width={1440} height={900} muted playsInline preload="none" poster={active ? `/work/${id}/${id}-poster.webp` : undefined} data-reel={id} aria-hidden="true" tabIndex={-1} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}>
        {copy.name}
      </video>
    </a></div>
    <div className={styles.caption} data-project-caption>
      <div className={styles.identity}>
        <h3 id={`${id}-title`}>{copy.name}</h3>
        <p className={styles.metadata}><span>{copy.category}</span><span>2026</span></p>
      </div>
      <div className={styles.details}>
        <p className={styles.teaser}>{copy.teaser}</p>
        <div className={styles.actions}>
          <a className={styles.projectLink} href={href} target="_blank" rel="noopener noreferrer">{labels.view}<span aria-hidden="true">↗</span></a>
          <button className={styles.playback} type="button" onClick={playback.toggle} aria-label={`${playing ? labels.pause : labels.play}: ${copy.name}`}>{playing ? labels.pause : labels.play}</button>
        </div>
      </div>
    </div>
  </article>;
}
