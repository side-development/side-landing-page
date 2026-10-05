"use client";

import { SideCursor } from "@/features/cursor/SideCursor";
import { BrandWordmark } from "@/features/hero/BrandWordmark";
import Link from "next/link";
import { ProductDashboardDemo } from "./ProductDashboardDemo";
import { dashboardCopy, type DashboardLocale } from "./dashboardData";
import styles from "./review.module.css";

export function DashboardReview({ locale }: { locale: DashboardLocale }) {
  const copy = dashboardCopy[locale];
  return <main className={styles.review}>
    <header className={styles.header}><BrandWordmark className={styles.reviewBrand} /><nav aria-label={locale === "en" ? "Review language" : "Idioma da prévia"}><Link href="/review/services" aria-current={locale === "pt-BR" ? "page" : undefined}>PT</Link><Link href="/en/review/services" aria-current={locale === "en" ? "page" : undefined}>EN</Link></nav></header>
    <section aria-labelledby="review-title">
      <div className={styles.copy}><span className={styles.index}>02</span><h1 id="review-title">{copy.service}</h1><p>{copy.description}</p><span className={styles.territories}>{copy.territories}</span></div>
      <ProductDashboardDemo locale={locale} />
    </section>
    <SideCursor active />
  </main>;
}
