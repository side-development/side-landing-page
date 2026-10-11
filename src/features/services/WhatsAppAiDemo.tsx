"use client";

import Image from "next/image";
import { useCallback, useId, useRef } from "react";
import gsap from "gsap";
import type { DigitalExperienceLocale } from "./digitalExperienceCopy";
import { aiCopy } from "./serviceScenesCopy";
import { serviceRevealDuration } from "./serviceEntrance";
import { useServiceSceneMotion, type SceneSequence } from "./useServiceSceneMotion";
import styles from "./whatsapp-ai.module.css";
import { WhatsAppIcon as Icon } from "./WhatsAppIcon";

export function WhatsAppAiDemo({ locale }: { locale: DigitalExperienceLocale }) {
  const root = useRef<HTMLElement>(null);
  const id = useId();
  const copy = aiCopy[locale];
  const sequence = useCallback<SceneSequence>((node, timeline) => {
    const messages = [...node.querySelectorAll<HTMLElement>("[data-ai-message]")];
    const stages = [...node.querySelectorAll<HTMLElement>("[data-ai-stage]")];
    const values = node.querySelectorAll("[data-ai-value]");
    const typing = node.querySelector("[data-ai-typing]");
    const online = node.querySelector("[data-ai-online]");
    const chat = node.querySelector<HTMLElement>("[data-ai-chat]")!;
    if (!timeline) {
      gsap.set(messages, { display: "block", opacity: 1, clearProps: "transform,filter" });
      gsap.set([values, stages, online], { opacity: 1, clearProps: "transform,filter" });
      gsap.set(typing, { opacity: 0 });
      gsap.set(chat, { scrollTop: chat.scrollHeight });
      node.dataset.conversation = "complete";
      return;
    }
    node.dataset.conversation = "waiting";
    gsap.set(messages, { display: "none", opacity: 0, y: 12, scale: .96, filter: "blur(4px)" });
    gsap.set(stages, { opacity: .28 });
    gsap.set(values, { opacity: 0, y: 5 });
    gsap.set(typing, { opacity: 0 });
    gsap.set(online, { opacity: 1 });
    gsap.set(chat, { scrollTop: 0 });
    const times = [serviceRevealDuration + .15, 3.7, 5.7, 7.5, 9.9];
    messages.forEach((message, index) => {
      timeline.set(message, { display: "block" }, times[index])
        .to(message, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: .55, ease: "power2.out", clearProps: "filter" }, times[index])
        .to(chat, { scrollTop: () => chat.scrollHeight, duration: .55, ease: "power2.out" }, times[index]);
    });
    timeline.set(node, { attr: { "data-conversation": "playing" } }, times[0]);
    [2.5, 6.3].forEach(at => {
      timeline.set(online, { opacity: 0 }, at).set(typing, { opacity: 1 }, at)
        .set(typing, { opacity: 0 }, at + 1.1).set(online, { opacity: 1 }, at + 1.1);
    });
    [6.2, 8.2, 10.4].forEach((at, index) => {
      timeline.to(stages[index], { opacity: 1, duration: .5 }, at)
        .to(stages[index].querySelector("[data-ai-value]"), { opacity: 1, y: 0, duration: .5, ease: "power2.out" }, at);
    });
    timeline.set(node, { attr: { "data-conversation": "complete" } }, 10.9);
  }, []);
  useServiceSceneMotion(root, sequence);

  return <figure ref={root} className={styles.demo} data-whatsapp-ai aria-labelledby={`${id}-caption`}>
    <div className={styles.scene} data-scene-surface>
      <div className={styles.editorial}><span className={styles.eyebrow}>WhatsApp / AI / CRM</span><h4>{copy.headline[0]}<br /><span>{copy.headline[1]}</span></h4><p>{copy.note}</p></div>
      <div className={styles.phone} aria-hidden="true">
        <Image className={styles.body} src="/media/services/iphone-air-clay.webp" width={760} height={1573} alt="" unoptimized />
        <div className={styles.screen}>
          <div className={styles.status}><strong>9:41</strong><div><span className={styles.signal}><i /><i /><i /><i /></span><svg viewBox="0 0 20 15" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4Q10-2 18 4M5 7Q10 3 15 7M8 10q2-2 4 0" /><circle cx="10" cy="13" r=".8" fill="currentColor" /></svg><span className={styles.battery} /></div></div>
          <div className={styles.chatHeader}><span className={styles.back}><Icon name="back" /><span>2</span></span><span className={styles.avatar}>L</span><div className={styles.contact}><strong>{copy.store}</strong><small><span data-ai-online>{copy.online}</span><span data-ai-typing>{copy.typing}</span></small></div><span className={styles.calls}><Icon name="video" /><Icon name="phone" /></span></div>
          <div className={styles.chat} data-ai-chat><span className={styles.today}>{copy.today}</span><div className={styles.messages}>{copy.messages.map((message, i) => <div key={i} data-ai-message className={`${styles.bubble} ${message.sender === "customer" ? styles.outgoing : styles.incoming}`}><p>{message.text}<span className={styles.timestamp}>9:{String(41 + Math.floor(i / 2))}{message.sender === "customer" && <span className={styles.read}><Icon name="read" /></span>}</span></p></div>)}</div></div>
          <div className={styles.composer}><span className={styles.composerButton}><Icon name="plus" /></span><span className={styles.input}><span>{copy.input}</span><Icon name="sticker" /></span><span className={styles.composerButton}><Icon name="camera" /></span><span className={`${styles.composerButton} ${styles.microphone}`}><Icon name="mic" /></span></div>
          <span className={styles.homeIndicator} />
        </div>
        <span className={styles.island} />
      </div>
      <div className={styles.management} aria-hidden="true">{[
        { icon: "spark" as const, label: copy.intent, value: copy.intentValue },
        { icon: "team" as const, label: copy.team, value: copy.teamValue },
        { icon: "crm" as const, label: copy.crm, value: copy.crmValue },
      ].map((stage, i) => <div className={styles.stage} key={stage.label} data-ai-stage={i}><span className={styles.stageIcon}><Icon name={stage.icon} /></span><div><span className={styles.stageNumber}>0{i + 1}</span><h5>{stage.label}</h5><div className={styles.stageValue} data-ai-value><strong>{stage.value}</strong>{i === 2 && <small>{copy.next}</small>}</div></div></div>)}</div>
    </div>
    <figcaption id={`${id}-caption`} className={styles.caption}><span>{copy.caption}</span><span className={styles.srOnly}>{copy.messages.map(m => m.text).join(" ")} {copy.intent}: {copy.intentValue}. {copy.team}: {copy.teamValue}. {copy.crm}: {copy.crmValue}. {copy.next}.</span></figcaption>
  </figure>;
}
