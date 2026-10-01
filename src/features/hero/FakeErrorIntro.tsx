"use client";

import { useId, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./hero.module.css";

gsap.registerPlugin(useGSAP);

const ORIGINAL_CODE = "ERR_CONNECTION_CLOSED";
const CLUE_CODE = "ERR_DIGITAL_EXPERIENCE";

export type FakeErrorCopy = {
  heading: string;
  description: string;
  tryLabel: string;
  checkConnection: string;
  checkProxy: string;
  runDiagnostics: string;
  reload: string;
  learnMore: string;
};

type Props = {
  copy: FakeErrorCopy;
  active: boolean;
  onReload: () => void;
};

export function FakeErrorIntro({ copy, active, onReload }: Props) {
  const container = useRef<HTMLElement>(null);
  const errorCode = useRef<HTMLSpanElement>(null);
  const idleMotion = useRef<gsap.MatchMedia | null>(null);
  const triggered = useRef(false);
  const headingId = useId();
  const [beforeDomain, afterDomain] = copy.description.split("sidecode.com.br");

  useGSAP(() => {
    if (!active || !errorCode.current) return;

    triggered.current = false;
    const code = errorCode.current;
    const media = gsap.matchMedia(container);
    idleMotion.current = media;

    media.add({
      reduce: "(prefers-reduced-motion: reduce)",
      full: "(prefers-reduced-motion: no-preference)",
    }, (context) => {
      let nextPulse: gsap.core.Tween | undefined;
      let pulse: gsap.core.Timeline | undefined;
      const write = (value: string) => { code.textContent = value; };

      function queuePulse() {
        nextPulse = gsap.delayedCall(gsap.utils.random(1.8, 4.8), runPulse);
      }

      function runPulse() {
        pulse?.kill();
        const first = Math.random() < 0.5 ? "ERR_CONNECTI0N_CLOSED" : "ERR_CONNECTION_CL_SED";
        const second = Math.random() < 0.25 ? CLUE_CODE : "ERR_CONNECTION_CL_SED";
        pulse = gsap.timeline({ onComplete: queuePulse })
          .call(() => write(first), [], 0)
          .call(() => write(second), [], gsap.utils.random(0.18, 0.24))
          .call(() => write(ORIGINAL_CODE), [], gsap.utils.random(0.58, 0.72));
      }

      const reduced = context.conditions?.reduce;
      const intro = gsap.timeline({ onComplete: reduced ? undefined : queuePulse });

      if (reduced) {
        intro
          .to(code, { opacity: 0, duration: 0.18, ease: "none" }, 2.4)
          .call(() => write(CLUE_CODE))
          .to(code, { opacity: 1, duration: 0.18, ease: "none" })
          .to(code, { opacity: 0, duration: 0.18, ease: "none" }, "+=0.7")
          .call(() => write(ORIGINAL_CODE))
          .to(code, { opacity: 1, duration: 0.18, ease: "none" });
      } else {
        intro
          .call(() => write("ERR_CONNECTI0N_CLOSED"), [], 1.86)
          .call(() => write(ORIGINAL_CODE), [], 2.06)
          .call(() => write("ERR_CONNECTION_CL_SED"), [], 2.22)
          .call(() => write(ORIGINAL_CODE), [], 2.42)
          .call(() => write(CLUE_CODE), [], 2.6)
          .call(() => write(ORIGINAL_CODE), [], 3);
      }

      return () => {
        nextPulse?.kill();
        pulse?.kill();
        intro.kill();
        write(ORIGINAL_CODE);
      };
    });

    return () => {
      media.revert();
      idleMotion.current = null;
    };
  }, { scope: container, dependencies: [active], revertOnUpdate: true });

  function handleReload() {
    if (!active || triggered.current) return;
    triggered.current = true;
    idleMotion.current?.revert();
    onReload();
  }

  return (
    <section ref={container} className={styles.content} aria-labelledby={headingId}>
      <svg className={styles.icon} width="45" height="54" viewBox="0 0 45 54" aria-hidden="true" focusable="false">
        <path d="M0 0h32v4H4v46h37V21H23V4h4v13h14v-4h4v41H0Zm32 4h4v4h-4Zm4 4h5v5h-5Z" fill="currentColor" />
        <path d="M11 13h5v8h-5Zm5 22h13v4H16Zm-5 4h5v4h-5Zm18 0h5v4h-5Z" fill="currentColor" />
      </svg>
      <h1 id={headingId} className={styles.heading}>{copy.heading}</h1>
      <div className={styles.details}>
        <p className={styles.description}>
          {beforeDomain}<strong className={styles.domain}>sidecode.com.br</strong>{afterDomain}
        </p>
        <div className={styles.suggestions}>
          <p>{copy.tryLabel}</p>
          <ul className={styles.suggestionList}>
            <li>{copy.checkConnection}</li>
            <li><button className={styles.suggestionLink} type="button">{copy.checkProxy}</button></li>
            <li><button className={styles.suggestionLink} type="button">{copy.runDiagnostics}</button></li>
          </ul>
        </div>
      </div>
      <p className={styles.errorCode}>
        <span className={styles.srOnly}>{ORIGINAL_CODE}</span>
        <span ref={errorCode} aria-hidden="true">{ORIGINAL_CODE}</span>
      </p>
      <div className={styles.actions}>
        <button className={styles.reload} type="button" aria-disabled={!active} onClick={handleReload}>
          {copy.reload}
        </button>
        <button className={styles.learnMore} type="button">
          {copy.learnMore}
        </button>
      </div>
    </section>
  );
}
