"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { FakeErrorIntro, type FakeErrorCopy } from "./FakeErrorIntro";
import { CinematicReveal } from "./CinematicReveal";
import { FinalHero } from "./FinalHero";
import type { HeroCopy } from "./copy";
import styles from "./hero.module.css";

const SESSION_KEY = "side:hero-complete:v1";
const subscribe = () => () => {};
const serverSession = () => false;
const clientReady = () => true;

function sessionComplete() {
  try { return sessionStorage.getItem(SESSION_KEY) === "true"; }
  catch { return false; }
}

function reviewEnabled() {
  return process.env.NODE_ENV === "development" || new URLSearchParams(location.search).get("intro") === "replay";
}

function forceReplay() {
  return new URLSearchParams(location.search).get("intro") === "replay";
}

type Props = {
  copy: FakeErrorCopy;
  finalCopy: HeroCopy;
};

export function Hero({ copy, finalCopy }: Props) {
  const container = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "triggered" | "final">("idle");
  const [replaying, setReplaying] = useState(false);
  const ready = useSyncExternalStore(subscribe, clientReady, serverSession);
  const visited = useSyncExternalStore(subscribe, sessionComplete, serverSession);
  const review = useSyncExternalStore(subscribe, reviewEnabled, serverSession);
  const forced = useSyncExternalStore(subscribe, forceReplay, serverSession);
  const final = state === "final" || (visited && !forced && !replaying);
  const complete = useCallback(() => {
    try { sessionStorage.setItem(SESSION_KEY, "true"); } catch { /* Storage can be unavailable in private browsing. */ }
    setState("final");
  }, []);

  function replay() {
    setReplaying(true);
    setState("idle");
  }

  return (
    <main ref={container} className={styles.hero} data-hero-state={final ? "final" : state} data-session-ready={ready}>
      {!final && <div data-error-surface><FakeErrorIntro copy={copy} active={state === "idle"} onReload={() => setState("triggered")} /></div>}
      <FinalHero copy={finalCopy} visible={final} focusOnReveal={state === "final"} />
      {state === "triggered" && !final && <CinematicReveal container={container} copy={finalCopy} onComplete={complete} />}
      {final && review && <button className={styles.replay} type="button" onClick={replay}>{finalCopy.replay}</button>}
    </main>
  );
}
