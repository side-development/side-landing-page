"use client";

import { useState } from "react";
import Link from "next/link";
import { SideCursor } from "@/features/cursor/SideCursor";
import { BrandWordmark } from "@/features/hero/BrandWordmark";
import { useSmoothScroll } from "@/features/scroll/useSmoothScroll";
import { IntegrationTerminalDemo } from "./IntegrationTerminalDemo";
import { terminalCopy, type TerminalLocale } from "./terminalData";
import styles from "./terminal-review.module.css";

export function TerminalReview({ locale }: { locale: TerminalLocale }) {
  const [replay, setReplay] = useState(0);
  const copy = terminalCopy[locale];
  useSmoothScroll(true);
  return <main className={styles.review}>
    <header className={styles.header}><BrandWordmark className={styles.brand} /><nav aria-label={locale === "en" ? "Review navigation" : "Navegação da prévia"}><Link href={locale === "en" ? "/en/review/services" : "/review/services"}>{copy.dashboard}</Link><Link href="/review/services/terminal" aria-current={locale === "pt-BR" ? "page" : undefined}>PT</Link><Link href="/en/review/services/terminal" aria-current={locale === "en" ? "page" : undefined}>EN</Link></nav></header>
    <section aria-labelledby="terminal-service">
      <div className={styles.intro}><span>03</span><h1 id="terminal-service">{copy.service}</h1><p>{copy.description}</p><small>{copy.territories}</small></div>
      <div className={styles.stage} data-terminal-stage><IntegrationTerminalDemo locale={locale} replay={replay} /><button className={styles.replay} type="button" onClick={() => setReplay(value => value + 1)}>{copy.replay}<span aria-hidden="true">↻</span></button></div>
    </section>
    <SideCursor active />
  </main>;
}
