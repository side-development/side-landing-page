"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { BrandWordmark } from "@/features/hero/BrandWordmark";
import { SideCursor } from "@/features/cursor/SideCursor";
import { useSmoothScroll } from "@/features/scroll/useSmoothScroll";
import { DigitalExperienceDemo } from "./DigitalExperienceDemo";
import { digitalExperienceCopy, type DigitalExperienceLocale } from "./digitalExperienceCopy";
import styles from "./digital-review.module.css";

export function DigitalExperienceReview({ locale }: { locale: DigitalExperienceLocale }) {
  const [replay, setReplay] = useState(0);
  const root = useRef<HTMLElement>(null);
  const copy = digitalExperienceCopy[locale];
  useSmoothScroll(true);
  const restart = () => {
    const piece = root.current?.querySelector("[data-digital-experience]");
    if (piece) window.scrollTo({ top: window.scrollY + piece.getBoundingClientRect().top - window.innerHeight * .28, behavior: "instant" });
    setReplay(value => value + 1);
  };
  return <main ref={root} className={styles.review}>
    <header className={styles.header}><BrandWordmark className={styles.brand} /><nav aria-label={copy.navigation}><Link href={locale === "en" ? "/en/review/services" : "/review/services"}>{copy.dashboard}</Link><Link href={locale === "en" ? "/en/review/services/terminal" : "/review/services/terminal"}>{copy.terminal}</Link><Link href="/review/services/experience" aria-current={locale === "pt-BR" ? "page" : undefined}>PT</Link><Link href="/en/review/services/experience" aria-current={locale === "en" ? "page" : undefined}>EN</Link></nav></header>
    <section aria-labelledby="digital-service">
      <div className={styles.intro}><span>01</span><h1 id="digital-service">{copy.service}</h1><p>{copy.description}</p><small>{copy.territories}</small></div>
      <DigitalExperienceDemo locale={locale} replay={replay} />
      <div className={styles.replay}><button type="button" onClick={restart}>{copy.replay}<span aria-hidden="true">↻</span></button></div>
    </section>
    <SideCursor active />
  </main>;
}
