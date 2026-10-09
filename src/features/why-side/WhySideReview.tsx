"use client";

import Link from "next/link";
import { BrandWordmark } from "@/features/hero/BrandWordmark";
import { SideCursor } from "@/features/cursor/SideCursor";
import { WhySide } from "./WhySide";
import { FinalClosing } from "@/features/final-cta/FinalClosing";
import type { WhySideLocale } from "./copy";
import styles from "./review.module.css";

export function WhySideReview({ locale, finalCta = false }: { locale: WhySideLocale; finalCta?: boolean }) {
  const reviewPath = finalCta ? "/review/final-cta" : "/review/why-side";
  return <main id="home-top" tabIndex={-1} className={styles.review}>
    <header className={styles.header}>
      <Link href={locale === "en" ? "/en" : "/"} aria-label={locale === "en" ? "Side home" : "Home Side"}><BrandWordmark className={styles.brand} /></Link>
      <nav aria-label={locale === "en" ? "Preview language" : "Idioma da prévia"}>
        {finalCta && <button className={styles.jump} onClick={() => {
          const sequence = document.querySelector<HTMLElement>("[data-why-sequence]");
          const finalValue = document.querySelector<HTMLElement>('[data-why-value="side"]');
          if (!sequence || !finalValue) return;
          const central = sequence.closest("[data-layout='central']");
          window.scrollTo({
            top: central
              ? sequence.getBoundingClientRect().top + window.scrollY + (sequence.offsetHeight - window.innerHeight) * 4.65 / 5
              : finalValue.getBoundingClientRect().top + window.scrollY,
            behavior: "instant",
          });
        }}>{locale === "en" ? "View closing ↓" : "Ver encerramento ↓"}</button>}
        <Link href={reviewPath} aria-current={locale === "pt-BR" ? "page" : undefined}>PT</Link>
        <Link href={`/en${reviewPath}`} aria-current={locale === "en" ? "page" : undefined}>EN</Link>
      </nav>
    </header>
    <h1 className={styles.srOnly}>{locale === "en" ? "Why Side — preview" : "Why Side — prévia"}</h1>
    <WhySide locale={locale} />
    {finalCta && <FinalClosing locale={locale} />}
    <SideCursor active />
  </main>;
}
