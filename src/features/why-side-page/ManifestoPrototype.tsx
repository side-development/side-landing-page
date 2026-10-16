"use client";

// PROTOTYPE: one selected art direction, as requested in #19. Not the full page.
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { BrandWordmark } from "@/features/hero/BrandWordmark";
import { NavUnderline } from "@/features/hero/NavUnderline";
import { SideCursor } from "@/features/cursor/SideCursor";
import { openingCopy, type ManifestoLocale } from "./opening-copy";
import type { PrototypePlayback } from "./useManifestoMotion";
import { ManifestoOpening } from "./ManifestoOpening";
import styles from "./manifesto-opening.module.css";

export function ManifestoPrototype({ locale }: { locale: ManifestoLocale }) {
  const playback = useRef<PrototypePlayback | null>(null);
  const [playing, setPlaying] = useState(false);
  const copy = openingCopy[locale];
  const en = locale === "en";
  const prefix = en ? "/en" : "";

  return <div className={styles.page} data-locale={locale}>
    <a className={styles.skip} href="#prototype-notes">{copy.skip}</a>
    <header className={styles.header}>
      <Link href={en ? "/en" : "/"} aria-label={copy.home} prefetch={false}>
        <Image src="/brand/side-logo-black.svg" alt="Side" width={1265} height={1126} className={styles.symbol} priority />
      </Link>
      <nav aria-label={en ? "Main navigation" : "Navegação principal"}>
        <Link className={styles.secondaryLink} href={en ? "/en/work" : "/trabalhos"} prefetch={false}>{copy.work}<NavUnderline variant="work" /></Link>
        <Link className={styles.secondaryLink} href={en ? "/en/services" : "/servicos"} prefetch={false}>{copy.services}<NavUnderline variant="services" /></Link>
        <span className={styles.current}>{copy.why}</span>
        <Link className={styles.contact} href={en ? "/en/contact" : "/contato"} prefetch={false}>{copy.contact}<span aria-hidden="true"> ↗</span><NavUnderline variant="contact" /></Link>
      </nav>
    </header>

    <main>
      <ManifestoOpening locale={locale} playback={playback} onPlaybackChange={setPlaying} />

      <aside id="prototype-notes" tabIndex={-1} className={styles.notes}>
        <span className={styles.reviewLabel}>{copy.review}</span>
        <h2>{copy.end}</h2>
        <p>{copy.explanation}</p>
        <p className={styles.checkpoint}>{copy.checkpoint}</p>
        <BrandWordmark className={styles.notesWordmark} />
      </aside>
    </main>

    <div className={styles.controls} role="group" aria-label={copy.controls} data-prototype-controls>
      <button type="button" onClick={() => playback.current?.play()} aria-pressed={playing} data-prototype-play><span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>{playing ? copy.pause : copy.play}</button>
      <span className={styles.controlDivider} />
      <button type="button" onClick={() => playback.current?.seek(0)} data-prototype-start>{copy.start}</button>
      <button type="button" onClick={() => playback.current?.seek(1)} data-prototype-peak>{copy.peak}</button>
      <span className={styles.controlDivider} />
      <Link href={`${prefix ? "" : "/en"}/review/why-side-manifesto`} prefetch={false} lang={en ? "pt-BR" : "en"}>{en ? "PT" : "EN"}</Link>
    </div>
    <SideCursor active />
  </div>;
}
