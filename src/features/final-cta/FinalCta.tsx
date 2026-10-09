"use client";

import { useId, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createCardLiquid } from "./cardLiquid";
import glass from "@/components/ui/glass-button.module.css";
import styles from "./final-cta.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function FinalCta({ locale, active = true }: { locale: "pt-BR" | "en"; active?: boolean }) {
  const english = locale === "en";
  const root = useRef<HTMLElement>(null);
  const headingId = useId();
  useGSAP(() => {
    if (!active || !root.current) return;
    const node = root.current;
    let visible = false;
    const updateAmbient = () => { node.dataset.ambient = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateAmbient();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", updateAmbient);
    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const card = node.querySelector<HTMLElement>("[data-cta-card]");
      if (!card) return;
      const canvas = card.querySelector<HTMLCanvasElement>("canvas");
      const stopLiquid = canvas ? createCardLiquid(card, canvas) : undefined;
      const pane = card.querySelector<HTMLElement>("[data-card-glass]");
      if (!pane) return stopLiquid;
      const lightX = gsap.quickTo(pane, "--card-reflection-x", { duration: .85, ease: "power2.out" });
      const lightY = gsap.quickTo(pane, "--card-reflection-y", { duration: .85, ease: "power2.out" });
      const reflect = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const bounds = card.getBoundingClientRect();
        lightX(.5 + ((event.clientX - bounds.left) / bounds.width - .5) * .15);
        lightY(.5 + ((event.clientY - bounds.top) / bounds.height - .5) * .12);
      };
      const resetReflection = () => { lightX(.5); lightY(.5); };
      card.addEventListener("pointermove", reflect);
      card.addEventListener("pointerleave", resetReflection);
      return () => {
        stopLiquid?.();
        card.removeEventListener("pointermove", reflect);
        card.removeEventListener("pointerleave", resetReflection);
        lightX.tween.kill();
        lightY.tween.kill();
        pane.style.removeProperty("--card-reflection-x");
        pane.style.removeProperty("--card-reflection-y");
      };
    });
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(node.querySelectorAll("[data-cta-reveal]"), {
        opacity: 0, filter: "blur(14px)", y: 12,
      }, {
        opacity: 1, filter: "blur(0px)", y: 0,
        duration: .95, stagger: .1, ease: "power2.out",
        scrollTrigger: { trigger: node, start: "top 78%", once: true },
      });
    });
    return () => {
      media.revert();
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateAmbient);
      delete node.dataset.ambient;
    };
  }, { scope: root, dependencies: [active], revertOnUpdate: true });

  return <section ref={root} id="start-project" tabIndex={-1} className={styles.cta} hidden={!active} aria-labelledby={headingId} data-final-cta>
    <div className={styles.card} data-cta-card>
      <canvas className={styles.liquid} aria-hidden="true" />
      <div className={styles.glassPane} data-card-glass aria-hidden="true" />
      <h2 id={headingId} className={styles.heading} data-cta-reveal>
        <span>{english ? "Let’s build what’s next." : "Vamos construir o próximo."}{" "}</span>
        <span>{english ? "Your idea. Out in the world." : "Da sua ideia para o mundo."}</span>
      </h2>
      <div className={styles.body}>
        <div className={styles.visual} data-cta-reveal>
          <Image src={english ? "/media/final-cta/side-devices-en.webp" : "/media/final-cta/side-devices-transparent.webp"} width={1774} height={887}
            alt={english ? "Concept Side apps on a laptop, tablet and phone." : "Telas de apps simulados da Side em um laptop, tablet e celular."}
            sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1200px) 65vw, 920px"
            className={styles.mockup} />
        </div>
        <div className={styles.invitation} data-cta-reveal>
          <p><span>{english ? "Tell us what you have in mind." : "Conte sua ideia."}</span>{" "}
            {english ? "We’ll help shape the path from idea to reality." : "A gente cuida do caminho até ela ganhar forma."}</p>
          <span className={`${glass.wrap} ${styles.action}`}>
            <Link href={english ? "/en/contact" : "/contato"} className={`${glass.surface} ${glass.interactive} ${styles.link}`}>
              <span className={`${glass.content} ${styles.linkContent}`}>
                <span>{english ? "Start a project" : "Começar projeto"}</span>
                <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
            <span className={glass.shadow} aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  </section>;
}
