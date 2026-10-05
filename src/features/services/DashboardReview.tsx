"use client";

import { SideCursor } from "@/features/cursor/SideCursor";
import { BrandWordmark } from "@/features/hero/BrandWordmark";
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
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({ motion: "(prefers-reduced-motion: no-preference)", reduced: "(prefers-reduced-motion: reduce)" }, context => {
      if (context.conditions?.reduced) return;
      const title = root.current!.querySelector<HTMLElement>("[data-review-title]")!;
      gsap.timeline({ scrollTrigger: { trigger: "[data-review-section]", start: "top top", end: () => `+=${innerHeight * 0.6}`, scrub: 0.5, invalidateOnRefresh: true } })
        .to("[data-review-title-stage]", { height: () => innerHeight * 0.6 + title.offsetHeight + 132, duration: 1, ease: "power2.inOut" }, 0)
        .to(title, { top: () => innerHeight * 0.6 + 76 + title.offsetHeight / 2, duration: 1, ease: "power2.inOut" }, 0)
        .from("[data-review-description]", { opacity: 0, y: 24, duration: 0.55, ease: "power2.out" }, 0.45);
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
