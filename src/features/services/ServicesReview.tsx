"use client";

import Link from "next/link";
import { BrandWordmark } from "@/features/hero/BrandWordmark";
import { SideCursor } from "@/features/cursor/SideCursor";
import { useSmoothScroll } from "@/features/scroll/useSmoothScroll";
import { Services } from "./Services";
import type { DigitalExperienceLocale } from "./digitalExperienceCopy";
import styles from "./services-review.module.css";

export function ServicesReview({ locale }: { locale: DigitalExperienceLocale }) {
  useSmoothScroll(true);
  return <main className={styles.review}>
    <header className={styles.header}><BrandWordmark className={styles.brand} /><nav aria-label={locale === "en" ? "Review language" : "Idioma da prévia"}><Link href="/review/services/sequence" aria-current={locale === "pt-BR" ? "page" : undefined}>PT</Link><Link href="/en/review/services/sequence" aria-current={locale === "en" ? "page" : undefined}>EN</Link><Link href={locale === "en" ? "/en" : "/"}>Home</Link></nav></header>
    <Services locale={locale} />
    <SideCursor active />
  </main>;
}
