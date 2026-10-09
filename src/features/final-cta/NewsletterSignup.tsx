"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { GlassButton } from "@/components/ui/glass-button";
import glass from "@/components/ui/glass-button.module.css";
import styles from "./final-footer.module.css";

export function NewsletterSignup({ english }: { english: boolean }) {
  const id = useId();
  const pending = useRef(false);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || status === "success") return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    pending.current = true;
    setStatus("pending");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fields.get("email"), company: fields.get("company") }),
        signal: AbortSignal.timeout(12000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error("Subscription unavailable");
      setStatus("success");
      setMessage(english ? "You're on the list. See you in your inbox." : "Você está na lista. A gente se encontra no seu inbox.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage(english ? "We couldn't subscribe you right now. Please try again later." : "Não conseguimos concluir agora. Tente novamente mais tarde.");
    } finally {
      pending.current = false;
    }
  }

  return <form className={styles.signup} onSubmit={subscribe} aria-busy={status === "pending"}>
    <label htmlFor={`${id}-email`} className={styles.label}>{english ? "Get updates" : "Receba novidades"}</label>
    <div className={`${glass.surface} ${styles.emailField}`}>
      <input id={`${id}-email`} name="email" type="email" autoComplete="email" inputMode="email" required maxLength={254}
        placeholder={english ? "Your email" : "Seu email"} aria-describedby={`${id}-message`} disabled={status === "success"} />
      <GlassButton className={styles.subscribeButton} size="sm" type="submit" disabled={status === "pending" || status === "success"}>
        {status === "pending" ? (english ? "Joining…" : "Inscrevendo…")
          : status === "success" ? (english ? "Subscribed" : "Inscrito") : (english ? "Subscribe" : "Inscrever")}
      </GlassButton>
    </div>
    <div className={styles.honeypot} aria-hidden="true">
      <label htmlFor={`${id}-company`}>Company website</label>
      <input id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
    </div>
    <p id={`${id}-message`} className={styles.signupMessage} data-error={status === "error"} role="status">{message}</p>
  </form>;
}
