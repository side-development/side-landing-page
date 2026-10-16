"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SideCursor } from "@/features/cursor/SideCursor";
import { FinalFooter } from "@/features/final-cta/FinalFooter";
import { WorkNav } from "@/features/work-page/WorkNav";
import type { WorkNavCopy } from "@/features/work-page/work-page-content";
import { servicesPageContent, type ServiceId, type ServicesLocale } from "./services-page-content";
import { ServiceVisual } from "./ServiceVisual";
import introStyles from "@/features/work-page/work-page.module.css";
import styles from "./services-page.module.css";

gsap.registerPlugin(useGSAP);

export function ServicesExperience({ locale, nav }: { locale: ServicesLocale; nav: WorkNavCopy }) {
  const [selected, setSelected] = useState<ServiceId | null>("websites");
  const intro = useRef<HTMLElement>(null);
  const body = useRef<HTMLElement>(null);
  const revealTarget = useRef<HTMLButtonElement | null>(null);
  const copy = servicesPageContent[locale];

  useGSAP(() => {
    if (!intro.current || !body.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo([intro.current, body.current], { opacity: 0, filter: "blur(14px)", y: 16 }, {
        opacity: 1, filter: "blur(0px)", y: 0, duration: .75, stagger: .12, ease: "power2.out", clearProps: "opacity,filter,transform",
      });
    });
    return () => media.revert();
  }, { scope: intro });

  // Preserve the focused control after expansion. New pointer/scroll intent cancels
  // this adjustment, so a completed transition cannot pull someone back up the page.
  function keepSelectedVisible() {
    const button = revealTarget.current;
    if (!button || !window.matchMedia("(max-width: 800px)").matches) return;
    const focus = document.activeElement;
    if (!(focus instanceof HTMLElement) || !focus.closest("#services-index")) return;
    const bounds = focus.getBoundingClientRect();
    const delta = bounds.top < 96 ? bounds.top - 96 : bounds.bottom > innerHeight - 16 ? bounds.bottom - innerHeight + 16 : 0;
    if (delta) window.scrollBy({ top: delta, behavior: "instant" });
  }

  function cancelReposition() { revealTarget.current = null; }

  return <div className={styles.page} onPointerDownCapture={cancelReposition} onWheelCapture={cancelReposition} onTouchMoveCapture={cancelReposition} onKeyDownCapture={event => {
    if (["PageDown", "PageUp", "Home", "End", "ArrowDown", "ArrowUp"].includes(event.key)) cancelReposition();
  }}>
    <a href="#services-index" className={styles.skip}>{copy.skip}</a>
    <WorkNav locale={locale} nav={nav} copy={copy} currentPage="services" />
    <main id="services-main">
      <header ref={intro} className={introStyles.intro}>
        <h1>{copy.heading}<span className={introStyles.dot} aria-hidden="true" /></h1>
        <div className={introStyles.introSide}>
          <p className={introStyles.lede}>{copy.intro}</p>
        </div>
      </header>

      <section ref={body} id="services-index" className={styles.services} aria-label={copy.heading} tabIndex={-1}>
        <div className={styles.serviceList}>
          {copy.services.map((service, index) => {
            const open = service.id === selected;
            const triggerId = `service-${service.id}`;
            const panelId = `${triggerId}-panel`;
            return <section key={service.id} className={styles.serviceItem} data-open={open}>
              <h2 className={styles.serviceHeading} style={{ gridRow: index + 1 }}>
                <button type="button" id={triggerId} data-service-trigger aria-expanded={open} aria-controls={panelId} className={styles.trigger} onClick={event => {
                  const button = event.currentTarget;
                  revealTarget.current = open ? null : button;
                  button.focus({ preventScroll: true });
                  setSelected(open ? null : service.id);
                  if (!open && window.matchMedia("(prefers-reduced-motion: reduce)").matches) requestAnimationFrame(keepSelectedVisible);
                }}>
                  <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                  <span className={styles.serviceName}>{service.name}</span>
                  <span className={styles.indicator} aria-hidden="true"><i /><i /></span>
                </button>
              </h2>
              <div id={panelId} role="region" aria-labelledby={triggerId} aria-hidden={!open} inert={!open} data-service-panel className={styles.panel} onTransitionEnd={event => {
                if (event.target === event.currentTarget && event.propertyName === "grid-template-rows") keepSelectedVisible();
              }}>
                <div className={styles.panelClip}>
                  <div className={styles.panelContent}>
                    <ServiceVisual service={service.id} locale={locale} active={open} />
                    <p className={styles.summary}>{service.summary}</p>
                    {service.problem && <p className={styles.problem}>{service.problem}</p>}
                    <div className={styles.deliverables}>
                      <h3>{copy.deliverables}</h3>
                      <ul>{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul>
                    </div>
                    {service.outcome && <div className={styles.outcome}><h3>{copy.outcome}</h3><p>{service.outcome}</p></div>}
                  </div>
                </div>
              </div>
            </section>;
          })}
        </div>
      </section>
    </main>
    <FinalFooter locale={locale} localeLinks={{ "pt-BR": "/servicos", en: "/en/services" }} />
    <SideCursor active />
  </div>;
}
