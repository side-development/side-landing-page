"use client";

import { useCallback, useState } from "react";
import { FakeErrorIntro, type FakeErrorCopy } from "./FakeErrorIntro";
import styles from "./hero.module.css";

type Props = {
  copy: FakeErrorCopy;
  onReloadTriggered?: () => void;
};

export function Hero({ copy, onReloadTriggered }: Props) {
  const [state, setState] = useState<"idle" | "triggered">("idle");
  const handleReload = useCallback(() => {
    setState("triggered");
    onReloadTriggered?.();
  }, [onReloadTriggered]);

  return (
    <main className={styles.hero} data-hero-state={state}>
      <FakeErrorIntro copy={copy} active={state === "idle"} onReload={handleReload} />
    </main>
  );
}
