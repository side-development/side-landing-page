"use client";

import { SideCursor } from "@/features/cursor/SideCursor";
import { BrandWordmark } from "@/features/hero/BrandWordmark";
import { useSmoothScroll } from "@/features/scroll/useSmoothScroll";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductDashboardDemo } from "./ProductDashboardDemo";
import { dashboardCopy, type DashboardLocale } from "./dashboardData";
import styles from "./review.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function DashboardReview({ locale }: { locale: DashboardLocale }) {
  const copy = dashboardCopy[locale];
  const root = useRef<HTMLElement>(null);
  useSmoothScroll(true);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" }, context => {
      if (context.conditions?.reduced) return;
      const title = root.current!.querySelector<HTMLElement>("[data-review-title]")!;
      const section = root.current!.querySelector<HTMLElement>("[data-review-section]")!;
      gsap.fromTo(title, { opacity: 0, filter: "blur(14px)" }, {
        opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "sine.out", clearProps: "filter,opacity",
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });
      gsap.fromTo("[data-review-description]", { opacity: 0, y: 12, filter: "blur(10px)" }, {
        opacity: 1, y: 0, filter: "blur(0px)", duration: 1.8, ease: "sine.out", clearProps: "filter",
        scrollTrigger: { trigger: section, start: "top -32px", once: true },
      });
    });
    return () => media.revert();
  }, { scope: root });
  return <main ref={root} className={styles.review}>
    <header className={styles.header}><BrandWordmark className={styles.reviewBrand} /><nav aria-label={locale === "en" ? "Review language" : "Idioma da prévia"}><Link href="/review/services" aria-current={locale === "pt-BR" ? "page" : undefined}>PT</Link><Link href="/en/review/services" aria-current={locale === "en" ? "page" : undefined}>EN</Link></nav></header>
    <section aria-labelledby="review-title" data-review-section>
      <div className={styles.titleStage} data-review-title-stage><div className={styles.title} data-review-title><span className={styles.index}>02</span><h1 id="review-title">{copy.service}</h1></div></div>
      <div className={styles.copy} data-review-description><p>{copy.description}</p><span className={styles.territories}>{copy.territories}</span></div>
      <ProductDashboardDemo locale={locale} />
    </section>
    <SideCursor active />
  </main>;
}
