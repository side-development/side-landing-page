"use client";

import { useId, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./hero.module.css";

gsap.registerPlugin(useGSAP);

const ORIGINAL_CODE = "ERR_EMPTY_RESPONSE";
const CLUE_CODE = "ERR_DIGITAL_EXPERIENCE";

export type FakeErrorCopy = {
  heading: string;
  description: string;
  reload: string;
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
        const first = Math.random() < 0.5 ? "ERR_EMPTY_RESP0NSE" : "ERR_EMPTY_RESP_NSE";
        const second = Math.random() < 0.25 ? CLUE_CODE : "ERR_EMPTY_RESP_NSE";
        pulse = gsap.timeline({ onComplete: queuePulse })
          .call(() => write(first), [], 0)
          .call(() => write(second), [], gsap.utils.random(0.06, 0.1))
          .call(() => write(ORIGINAL_CODE), [], gsap.utils.random(0.2, 0.3));
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
          .call(() => write("ERR_EMPTY_RESP0NSE"), [], 1.86)
          .call(() => write(ORIGINAL_CODE), [], 1.94)
          .call(() => write("ERR_EMPTY_RESP_NSE"), [], 2.08)
          .call(() => write(ORIGINAL_CODE), [], 2.16)
          .call(() => write(CLUE_CODE), [], 2.4)
          .call(() => write(ORIGINAL_CODE), [], 2.54);
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
      <svg className={styles.icon} width="40" height="48" viewBox="0 0 40 48" aria-hidden="true" focusable="false">
        <path d="M7 2h17l9 9v12l-4 3 4 3v16H7V29l4-3-4-3Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M24 2v10h9M14 20v4m12-4v4m-11 12 5-3 5 3" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      <h1 id={headingId} className={styles.heading}>{copy.heading}</h1>
      <p className={styles.description}>{copy.description}</p>
      <p className={styles.errorCode}>
        <span className={styles.srOnly}>{ORIGINAL_CODE}</span>
        <span ref={errorCode} aria-hidden="true">{ORIGINAL_CODE}</span>
      </p>
      <div className={styles.actions}>
        <button className={styles.reload} type="button" aria-disabled={!active} onClick={handleReload}>
          {copy.reload}
        </button>
      </div>
    </section>
  );
}
