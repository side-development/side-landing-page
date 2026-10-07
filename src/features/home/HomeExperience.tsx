"use client";

import { useCallback, useState } from "react";
import { Hero } from "@/features/hero/Hero";
import type { FakeErrorCopy } from "@/features/hero/FakeErrorIntro";
import type { HeroCopy } from "@/features/hero/copy";
import { SideCursor } from "@/features/cursor/SideCursor";
import { SelectedWork } from "@/features/work/SelectedWork";
import type { WorkCopy } from "@/features/work/copy";
import { useSmoothScroll } from "@/features/scroll/useSmoothScroll";
import { Services } from "@/features/services/Services";
import { TrustChapter } from "@/features/why-side/TrustChapter";
import styles from "./home.module.css";

export function HomeExperience({ errorCopy, heroCopy, workCopy, locale }: {
  errorCopy: FakeErrorCopy;
  heroCopy: HeroCopy;
  workCopy: WorkCopy;
  locale: "pt-BR" | "en";
}) {
  const [phase, setPhase] = useState<"idle" | "purple" | "final">("idle");
  const onPhase = useCallback((next: typeof phase) => setPhase(next), []);
  useSmoothScroll(phase === "final");

  return <main className={styles.home}>
    <Hero copy={errorCopy} finalCopy={heroCopy} onPhase={onPhase} />
    <SelectedWork copy={workCopy} active={phase === "final"} />
    <Services locale={locale} active={phase === "final"} />
    <TrustChapter locale={locale} active={phase === "final"} />
    <SideCursor active={phase !== "idle"} />
  </main>;
}
