"use client";

import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { GlassButton } from "@/components/ui/glass-button";
import { choiceValues, contactContent, contactFields, customChoice, customChoiceText, emptyAnswers, validContactField, type ContactAnswers, type ContactLocale } from "./contact-content";
import styles from "./contact.module.css";

export function ContactFlow({ locale }: { locale: ContactLocale }) {
  const copy = contactContent[locale];
  const home = locale === "en" ? "/en" : "/";
  const [answers, setAnswers] = useState<ContactAnswers>(emptyAnswers);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const company = useRef<HTMLInputElement>(null);
  const busy = useRef(false);
  const request = useRef<AbortController | null>(null);
  const submission = useRef<{ json: string; id: string } | null>(null);
  const historyId = useRef("");
  const field = contactFields[step];
  const choices = choiceValues[field];
  const customText = choices ? customChoiceText(answers[field]) : null;
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    historyId.current = crypto.randomUUID();
    history.replaceState({ ...history.state, sideContact: { id: historyId.current, step: 0 } }, "");
    const restore = (event: PopStateEvent) => {
      const entry = event.state?.sideContact;
      if (entry?.id !== historyId.current || !Number.isInteger(entry.step) || entry.step < 0 || entry.step > 5) return;
      request.current?.abort();
      request.current = null;
      setPending(false);
      gsap.killTweensOf(panel.current);
      busy.current = false;
      setError("");
      setSent(false);
      setStep(entry.step);
    };
    window.addEventListener("popstate", restore);
    return () => {
      window.removeEventListener("popstate", restore);
      request.current?.abort();
      request.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const node = panel.current;
    if (!node) return;
    // Arrival is decorative: a valid first click must already work.
    busy.current = false;
    const focus = () => {
      busy.current = false;
      const target = node.querySelector<HTMLElement>("[data-answer-input], [data-custom-answer-input=true], [data-success-title]")
        || node.querySelector<HTMLElement>("input:checked") || node.querySelector<HTMLElement>("input[type=radio]");
      target?.focus({ preventScroll: true });
    };
    const media = gsap.matchMedia();
    media.add({ reduce: "(prefers-reduced-motion: reduce)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      const reduce = context.conditions?.reduce;
      gsap.fromTo(node, { opacity: 0, filter: reduce ? "none" : "blur(6px)" }, {
        opacity: 1, filter: "blur(0px)", duration: reduce ? .08 : .36, ease: "power2.out",
      });
    });
    focus();
    return () => { gsap.killTweensOf(node); media.revert(); busy.current = false; };
  }, [step, sent]);

  useLayoutEffect(() => {
    const input = panel.current?.querySelector<HTMLTextAreaElement>("textarea");
    if (!input) return;
    const resize = () => {
      input.style.height = "0px";
      input.style.height = `${input.scrollHeight + 1}px`;
    };
    resize();
    let width = input.clientWidth;
    const observer = new ResizeObserver(() => {
      if (input.clientWidth !== width) { width = input.clientWidth; resize(); }
    });
    observer.observe(input);
    return () => observer.disconnect();
  }, [answers.goal, step, sent]);

  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return;
    const viewport = window.visualViewport;
    const resize = () => {
      if (viewport && viewport.scale !== 1) return;
      node.style.setProperty("--contact-height", `${viewport?.height ?? innerHeight}px`);
      node.style.setProperty("--contact-top", `${viewport?.offsetTop ?? 0}px`);
      const input = document.activeElement;
      if (input instanceof HTMLInputElement && input.hasAttribute("data-custom-answer-input")) {
        const choices = input.closest("fieldset");
        if (choices) choices.scrollTop = choices.scrollHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    viewport?.addEventListener("resize", resize);
    viewport?.addEventListener("scroll", resize);
    return () => {
      window.removeEventListener("resize", resize);
      viewport?.removeEventListener("resize", resize);
      viewport?.removeEventListener("scroll", resize);
    };
  }, []);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const keyboard = (event: globalThis.KeyboardEvent) => { if (event.key === "Tab") node.dataset.keyboardFocus = "true"; };
    const pointer = () => { delete node.dataset.keyboardFocus; };
    window.addEventListener("keydown", keyboard, true);
    window.addEventListener("pointerdown", pointer, true);
    return () => {
      window.removeEventListener("keydown", keyboard, true);
      window.removeEventListener("pointerdown", pointer, true);
    };
  }, []);

  function answer(value: string) {
    setAnswers(previous => ({ ...previous, [field]: value }));
    setError("");
  }

  function advance(next: number) {
    busy.current = true;
    gsap.killTweensOf(panel.current);
    gsap.to(panel.current, {
      opacity: 0, filter: reduced() ? "none" : "blur(5px)", duration: reduced() ? .06 : .18, ease: "power1.in",
      onComplete: () => {
        history.pushState({ ...history.state, sideContact: { id: historyId.current, step: next } }, "");
        setStep(next);
      },
    });
  }

  async function send() {
    if (request.current) return;
    const invalid = contactFields.findIndex(key => !validContactField(key, answers[key]));
    if (invalid >= 0) {
      setError(copy.errors[contactFields[invalid]]);
      if (invalid !== step) advance(invalid);
      return;
    }
    const json = JSON.stringify({ ...answers, locale, company: company.current?.value || "" });
    if (submission.current?.json !== json) submission.current = { json, id: crypto.randomUUID() };
    const controller = new AbortController();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 12000);
    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": submission.current.id },
        body: json, signal: controller.signal,
      });
      const result = await response.json();
      if (request.current !== controller || controller.signal.aborted) return;
      if (!response.ok || result.ok !== true) {
        setError(response.status === 503 ? copy.unavailable : response.status === 429 ? copy.limited : copy.failed);
        return;
      }
      // Only the server's confirmed provider response can enter this screen.
      setSent(true);
      setError("");
    } catch {
      if (request.current === controller) setError(copy.failed);
    } finally {
      clearTimeout(timeout);
      if (request.current === controller) {
        request.current = null;
        setPending(false);
      }
    }
  }

  function confirm(event: FormEvent) {
    event.preventDefault();
    if (busy.current || pending) return;
    if (!validContactField(field, answers[field])) {
      setError(copy.errors[field]);
      const target = panel.current?.querySelector<HTMLElement>("[data-answer-input], [data-custom-answer-input=true]")
        || panel.current?.querySelector<HTMLElement>("input:checked") || panel.current?.querySelector<HTMLElement>("input[type=radio]");
      target?.focus({ preventScroll: true });
      return;
    }
    setError("");
    if (step === 5) void send();
    else advance(step + 1);
  }

  useEffect(() => {
    if (sent) return;
    function keyboard(event: globalThis.KeyboardEvent) {
      if (event.defaultPrevented || event.isComposing || event.repeat || event.altKey || event.ctrlKey || event.metaKey || pending || busy.current) return;
      const target = event.target instanceof Element ? event.target : null;
      // Preserve native activation for links/buttons; typing digits must stay text.
      if (event.key === "Enter" && target?.closest("a, button")) return;
      const typing = target?.matches("input:not([type=radio]), textarea, [contenteditable=true]");
      if (choices && !typing && /^[1-5]$/.test(event.key)) {
        const index = Number(event.key) - 1;
        if (choices[index]) {
          event.preventDefault();
          setAnswers(previous => ({ ...previous, [field]: choices[index] }));
          setError("");
          panel.current?.querySelectorAll<HTMLInputElement>("input[type=radio]")[index]?.focus({ preventScroll: true });
        } else if (index === choices.length) {
          event.preventDefault();
          setAnswers(previous => ({ ...previous, [field]: customChoice(customChoiceText(previous[field]) ?? "") }));
          setError("");
          panel.current?.querySelector<HTMLInputElement>("[data-custom-answer-input]")?.focus({ preventScroll: true });
        }
      }
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); form.current?.requestSubmit();
      }
    }
    window.addEventListener("keydown", keyboard);
    return () => window.removeEventListener("keydown", keyboard);
  }, [choices, field, pending, sent]);

  return <main ref={root} className={styles.page} data-contact-flow data-contact-step={sent ? "sent" : step + 1}>
    <header className={styles.header}>
      <Link className={styles.brand} href={home} aria-label="Side — Home" prefetch={false}><Image src="/brand/side-logo-black.svg" alt="" width={1265} height={1126} /></Link>
      <div className={styles.headerActions}>
        {!sent && <div className={styles.counterGroup}>
          <button type="button" data-contact-back className={styles.back} onClick={() => { if (!busy.current && !pending) history.back(); }} disabled={step === 0 || pending} data-first={step === 0} aria-label={copy.back}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" /></svg></button>
          <span className={styles.counter} aria-label={`${copy.progress} ${step + 1} ${copy.of} 6`}><strong>{String(step + 1).padStart(2, "0")}</strong><span aria-hidden="true"> / 06</span></span>
        </div>}
        <Link className={styles.close} href={`${home}#start-project`} scroll={false} prefetch={false} aria-label={copy.close}>
          <svg className={styles.cross} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </Link>
      </div>
    </header>
    <div className={styles.center}>
      <div ref={panel} className={styles.panel} data-contact-panel>
        {sent ? <section className={styles.success} aria-labelledby="contact-success">
          <p className={styles.eyebrow}>{copy.successLabel}</p>
          <h1 id="contact-success" tabIndex={-1} data-success-title>{copy.successTitle}<span>{copy.successNext}</span></h1>
          <p className={styles.successBody}>{copy.successBody}</p>
          <p className={styles.signature}>{copy.signature}{locale === "pt-BR" && <span lang="en">By your side.</span>}</p>
          <Link className={styles.homeLink} href={home} prefetch={false}>{copy.returnHome}<span aria-hidden="true">↗</span></Link>
        </section> : <form ref={form} onSubmit={confirm} noValidate aria-labelledby="contact-question" aria-busy={pending}>
          <div className={styles.stepLine}>
            <span className={styles.eyebrow}>{copy.eyebrow}</span>
          </div>
          <h1 id="contact-question">{copy.questions[field]}</h1>
          <div className={styles.answer}>
            {choices ? <fieldset className={styles.choices} aria-labelledby="contact-question" aria-describedby={error ? "contact-error" : undefined} aria-invalid={!!error}>
              {choices.map((value, index) => <label className={styles.choice} key={value} data-selected={answers[field] === value}>
                <input type="radio" name={field} value={value} checked={answers[field] === value} onChange={() => answer(value)} disabled={pending} />
                <span className={styles.key} aria-hidden="true">{index + 1}</span>
                <span>{copy.choices[field as "type" | "stage" | "timing"][index]}</span>
                <span className={styles.check} aria-hidden="true">↗</span>
              </label>)}
              <div className={styles.choice} data-selected={customText !== null}>
                <input id="contact-custom-option" type="radio" name={field} value="custom" checked={customText !== null} aria-label={copy.customLabel}
                  onChange={() => { answer(customChoice(customText ?? "")); panel.current?.querySelector<HTMLInputElement>("[data-custom-answer-input]")?.focus({ preventScroll: true }); }} disabled={pending} />
                <label htmlFor="contact-custom-option" className={styles.key} aria-label={copy.customLabel}><span aria-hidden="true">{choices.length + 1}</span></label>
                <input className={styles.customInput} type="text" data-custom-answer-input={customText !== null ? "true" : "false"} maxLength={500}
                  aria-label={`${copy.customLabel} — ${copy.questions[field]}`} aria-invalid={customText !== null && !!error} aria-describedby={error ? "contact-error" : undefined}
                  placeholder={copy.customPlaceholder} value={customText ?? ""} disabled={pending} enterKeyHint="next"
                  onFocus={() => { setAnswers(previous => customChoiceText(previous[field]) !== null ? previous : { ...previous, [field]: customChoice("") }); setError(""); }}
                  onChange={event => answer(customChoice(event.target.value))} />
                <span className={styles.check} aria-hidden="true">↗</span>
              </div>
            </fieldset> : field === "goal" ? <textarea
              id="contact-answer" data-answer-input className={styles.textarea} rows={1} maxLength={2000}
              value={answers.goal} onChange={event => answer(event.target.value)} placeholder={copy.placeholders.goal}
              aria-labelledby="contact-question" aria-invalid={!!error} aria-describedby={error ? "contact-error" : "contact-hint"}
              required disabled={pending}
            /> : <input
              key={field} id="contact-answer" data-answer-input className={styles.input}
              name={field} type={field === "email" ? "email" : "text"} autoComplete={field === "email" ? "email" : "name"}
              inputMode={field === "email" ? "email" : "text"} enterKeyHint={step === 5 ? "send" : "next"}
              spellCheck={false} maxLength={field === "email" ? 254 : 120}
              value={answers[field]} onChange={event => answer(event.target.value)} placeholder={copy.placeholders[field as "name" | "email"]}
              aria-labelledby="contact-question" aria-invalid={!!error} aria-describedby={error ? "contact-error" : field === "email" ? "contact-privacy" : undefined}
              required disabled={pending}
            />}
          </div>
          {field === "email" && <p id="contact-privacy" className={styles.privacy}>{copy.privacy}</p>}
          <p id="contact-error" className={styles.error} role="alert">{error}</p>
          <div className={styles.controls}>
            <GlassButton type="submit" className={styles.confirm} contentClassName={styles.confirmContent} disabled={pending}>
              {pending ? copy.sending : step === 5 ? copy.send : copy.confirm}<span aria-hidden="true">↗</span>
            </GlassButton>
            <div className={styles.hints} id="contact-hint"><span>{copy.enter} <span aria-hidden="true">↵</span></span>
              {choices && <span>{copy.choose}</span>}{field === "goal" && <span>{copy.multiline}</span>}
            </div>
          </div>
          <div className={styles.honeypot} aria-hidden="true"><label htmlFor="contact-company">Company</label><input ref={company} id="contact-company" name="company" tabIndex={-1} autoComplete="off" /></div>
        </form>}
      </div>
    </div>
    <footer className={styles.footer}>
      <span className={styles.estimate}>{copy.estimate}</span>
    </footer>
  </main>;
}
