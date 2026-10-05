"use client";

import { useCallback, useState } from "react";
import { Hero } from "@/features/hero/Hero";
import type { FakeErrorCopy } from "@/features/hero/FakeErrorIntro";
import type { HeroCopy } from "@/features/hero/copy";
import { SideCursor } from "@/features/cursor/SideCursor";
import { SelectedWork } from "@/features/work/SelectedWork";
import type { WorkCopy } from "@/features/work/copy";
import { useSmoothScroll } from "@/features/scroll/useSmoothScroll";

export function HomeExperience({ errorCopy, heroCopy, workCopy }: {
  errorCopy: FakeErrorCopy;
  heroCopy: HeroCopy;
  workCopy: WorkCopy;
}) {
  const [phase, setPhase] = useState<"idle" | "purple" | "final">("idle");
  const onPhase = useCallback((next: typeof phase) => setPhase(next), []);
  useSmoothScroll(phase === "final");

  return <main style={{ background: "#fff" }}>
    <Hero copy={errorCopy} finalCopy={heroCopy} onPhase={onPhase} />
    <SelectedWork copy={workCopy} active={phase === "final"} />
    <SideCursor active={phase !== "idle"} />
  </main>;
}
