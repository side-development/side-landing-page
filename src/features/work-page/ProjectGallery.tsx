"use client";

import Image from "next/image";
import { useRef, type KeyboardEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useGallery } from "./useGallery";
import { relativeOf, sheetStyle } from "./sheetMotion";
import type { WorkPageContent } from "./work-page-content";
import type { WorkLocale, WorkMedia, WorkProject } from "./projects";
import styles from "./gallery.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  project: WorkProject;
  position: number;
  locale: WorkLocale;
  copy: WorkPageContent;
  /** Called with the project slug and the trigger element for focus restoration. */
  onOpen?: (slug: string, triggerEl?: HTMLElement | null) => void;
  /** Mark the very first sheet of the page as the LCP candidate. */
  priority?: boolean;
};

const arrow = (direction: "left" | "right") => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {direction === "left" ? <path d="M19 12H5m6-6-6 6 6 6" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}
  </svg>
);

function Face({ media, locale, priority }: { media: WorkMedia; locale: WorkLocale; priority: boolean }) {
  if (media.kind === "image") {
    return <Image src={media.src} alt={media.alt[locale]} fill sizes="(max-width: 800px) 90vw, (max-width: 1500px) 62vw, 1180px" priority={priority} draggable={false} className={styles.image} style={{ objectFit: media.fit ?? "cover" }} />;
  }
  return <div className={styles.placeholder}><span>{media.caption[locale]}</span></div>;
}

export function ProjectGallery({ project, position, locale, copy, onOpen, priority = false }: Props) {
  const region = useRef<HTMLElement>(null);
  const total = project.media.length;
  const loop = total >= 3;
  const { index, next, prev, goTo } = useGallery(region, total);
  const label = String(position).padStart(2, "0");
  const titleId = `${project.slug}-title`;
  const open = (e?: React.MouseEvent<HTMLElement>) => onOpen?.(project.slug, e?.currentTarget ?? null);

  useGSAP(() => {
    if (!region.current) return;
    const node = region.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // The first project arrives on entry; later projects reveal as they approach.
    gsap.set(node, { opacity: 0, filter: "blur(14px)", y: 24 });

    const isFirst = position === 1;

    function reveal(immediate = false) {
      gsap.to(node, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: immediate ? 0.35 : 0.85,
        ease: "power2.out",
        clearProps: "filter,transform",
      });
    }

    if (isFirst) {
      reveal();
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: node,
      start: "top 72%",
      once: true,
      onEnter: () => reveal(false),
      onRefresh: (self) => {
        if (self.progress > 0) {
          reveal(true);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, { scope: region, dependencies: [position] });

  function keyboard(event: KeyboardEvent<HTMLElement>) {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey) return;
    switch (event.key) {
      case "ArrowRight": next(); break;
      case "ArrowLeft": prev(); break;
      case "Home": goTo(0); break;
      case "End": goTo(total - 1); break;
      default: return;
    }
    event.preventDefault();
  }

  return (
    <article ref={region} className={styles.project} data-project={project.slug} aria-labelledby={titleId}>
      <header className={styles.header}>
        <div className={styles.rule}>
          <span>{label}</span>
          <div>
            <span>{project.category[locale]}</span>
            <span>{project.year}</span>
          </div>
        </div>
        <div className={styles.identity}>
          <h2 id={titleId} className={styles.name}>
            {project.wordmark
              ? <Image src={project.wordmark.src} alt={project.name} width={project.wordmark.width} height={project.wordmark.height} className={styles.wordmark} style={{ "--wordmark-scale": project.wordmark.scale ?? 1 } as React.CSSProperties} />
              : project.name}
          </h2>
          <p className={styles.summary}>{project.summary[locale]}</p>
        </div>
      </header>

      <div className={styles.gallery} data-work-gallery role="group" aria-roledescription="carousel" aria-label={copy.gallery(project.name)}>
        <div className={styles.stage} data-gallery-stage data-cursor-label="↔" tabIndex={total > 1 ? 0 : undefined} onKeyDown={keyboard}>
          {project.media.map((media, i) => {
            const relative = relativeOf(i, 0, total, loop);
            const active = i === index;
            return (
              <div
                key={i}
                className={styles.sheet}
                data-sheet={i}
                data-active={active}
                style={sheetStyle(relative)}
                role="group"
                aria-roledescription="slide"
                aria-label={copy.slide(i + 1, total)}
                onClick={active ? undefined : () => goTo(i)}
              >
                <div className={styles.surface}>
                  <Face media={media} locale={locale} priority={priority && i === 0} />
                </div>
                {active && onOpen && (
                  <button type="button" className={styles.openSheet} onClick={open} aria-label={`${copy.openCase}: ${project.name}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.controls}>
          <div className={styles.pager}>
            {total > 1 && (
              <div className={styles.arrows}>
                <button type="button" className={styles.arrow} onClick={prev} aria-label={copy.previous}>{arrow("left")}</button>
                <button type="button" className={styles.arrow} onClick={next} aria-label={copy.next}>{arrow("right")}</button>
              </div>
            )}
            <p className={styles.counter}>
              <span className={styles.position}>{String(index + 1).padStart(2, "0")}<span aria-hidden="true"> / {String(total).padStart(2, "0")}</span></span>
              <span className={styles.caption}>{project.media[index].caption[locale]}</span>
            </p>
          </div>
          <button type="button" className={styles.open} onClick={open} disabled={!onOpen}>
            {copy.openCase}<span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </article>
  );
}
