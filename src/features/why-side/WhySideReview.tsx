"use client";

import Link from "next/link";
import { BrandWordmark } from "@/features/hero/BrandWordmark";
import { SideCursor } from "@/features/cursor/SideCursor";
import { WhySide } from "./WhySide";
import type { WhySideLocale } from "./copy";
import styles from "./review.module.css";

export function WhySideReview({ locale }: { locale: WhySideLocale }) {
  return <main className={styles.review}>
    <header className={styles.header}>
      <Link href={locale === "en" ? "/en" : "/"} aria-label={locale === "en" ? "Side home" : "Home Side"}><BrandWordmark className={styles.brand} /></Link>
      <nav aria-label={locale === "en" ? "Preview language" : "Idioma da prévia"}>
        <Link href="/review/why-side" aria-current={locale === "pt-BR" ? "page" : undefined}>PT</Link>
        <Link href="/en/review/why-side" aria-current={locale === "en" ? "page" : undefined}>EN</Link>
      </nav>
    </header>
    <h1 className={styles.srOnly}>{locale === "en" ? "Why Side — preview" : "Why Side — prévia"}</h1>
    <WhySide locale={locale} />
    <SideCursor active />
  </main>;
}
