"use client";

// PROTOTYPE: one selected art direction, as requested in #19. Not the full page.
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { BrandWordmark } from "@/features/hero/BrandWordmark";
import { NavUnderline } from "@/features/hero/NavUnderline";
import { SideCursor } from "@/features/cursor/SideCursor";
import { prototypeCopy, type ManifestoLocale } from "./prototype-copy";
import { useManifestoPrototypeMotion, type PrototypePlayback } from "./useManifestoPrototypeMotion";
import styles from "./manifesto-prototype.module.css";

export function ManifestoPrototype({ locale }: { locale: ManifestoLocale }) {
  const root = useRef<HTMLElement>(null);
  const playback = useRef<PrototypePlayback | null>(null);
  const [playing, setPlaying] = useState(false);
  const copy = prototypeCopy[locale];
  const en = locale === "en";
  const prefix = en ? "/en" : "";
  useManifestoPrototypeMotion(root, playback, setPlaying);

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
      <section ref={root} className={styles.sequence} data-manifesto-prototype aria-labelledby="manifesto-heading">
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
      </section>

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
