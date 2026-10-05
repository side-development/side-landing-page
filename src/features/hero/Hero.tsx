"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
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
  onPhase?: (phase: "idle" | "purple" | "final") => void;
};

export function Hero({ copy, finalCopy, onPhase }: Props) {
  const container = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "triggered" | "final">("idle");
  const [replaying, setReplaying] = useState(false);
  const ready = useSyncExternalStore(subscribe, clientReady, serverSession);
  const visited = useSyncExternalStore(subscribe, sessionComplete, serverSession);
  const review = useSyncExternalStore(subscribe, reviewEnabled, serverSession);
  const forced = useSyncExternalStore(subscribe, forceReplay, serverSession);
  const final = state === "final" || (visited && !forced && !replaying);
  const start = useCallback(() => setState(current => current === "idle" ? "triggered" : current), []);
  const complete = useCallback(() => {
    try { sessionStorage.setItem(SESSION_KEY, "true"); } catch { /* Storage can be unavailable in private browsing. */ }
    setState("final");
  }, []);

  useEffect(() => { onPhase?.(final ? "final" : "idle"); }, [final, replaying, onPhase]);

  useEffect(() => {
    if (!ready || final || state !== "idle") return;
    const timer = window.setTimeout(start, 2000);
    return () => window.clearTimeout(timer);
  }, [ready, final, state, start]);

  function replay() {
    setReplaying(true);
    setState("idle");
  }

  return (
    <section ref={container} className={styles.hero} data-hero-state={final ? "final" : state} data-session-ready={ready}>
      {!final && <div data-error-surface><FakeErrorIntro copy={copy} active={state === "idle"} onReload={start} /></div>}
      <FinalHero copy={finalCopy} visible={final} focusOnReveal={state === "final"} />
      {state === "triggered" && !final && <CinematicReveal container={container} copy={finalCopy} onComplete={complete} onPurple={() => onPhase?.("purple")} />}
      {final && review && <button className={styles.replay} type="button" onClick={replay}>{finalCopy.replay}</button>}
    </section>
  );
}
