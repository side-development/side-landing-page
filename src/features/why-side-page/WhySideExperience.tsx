"use client";

import type { ReactNode } from "react";
import { WorkNav } from "@/features/work-page/WorkNav";
import type { WorkNavCopy } from "@/features/work-page/work-page-content";
import { FinalFooter } from "@/features/final-cta/FinalFooter";
import { SideCursor } from "@/features/cursor/SideCursor";
import { ManifestoOpening } from "./ManifestoOpening";
import { ManifestoChapterMotion } from "./ManifestoChapterMotion";
import { manifestoContent, manifestoPaths } from "./manifesto-content";
import type { ManifestoLocale } from "./opening-copy";
import opening from "./manifesto-opening.module.css";
import styles from "./manifesto-chapters.module.css";

export function WhySideExperience({ locale, nav, children }: { locale: ManifestoLocale; nav: WorkNavCopy; children: ReactNode }) {
  const copy = manifestoContent[locale];
  return <div className={`${opening.page} ${styles.page}`} data-locale={locale}>
    <a href="#manifesto-name" className={opening.skip}>{copy.skip}</a>
    <div className={styles.navBackdrop} aria-hidden="true" />
    <WorkNav locale={locale} nav={nav} copy={copy} currentPage="why" />
    <main>
      <ManifestoOpening locale={locale} />
      <ManifestoChapterMotion>{children}</ManifestoChapterMotion>
    </main>
    <FinalFooter locale={locale} localeLinks={manifestoPaths} />
    <SideCursor active />
  </div>;
}
