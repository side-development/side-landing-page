"use client";

import { useRef } from "react";
import { DigitalExperienceDemo } from "./DigitalExperienceDemo";
import { ProductDashboardDemo } from "./ProductDashboardDemo";
import { IntegrationTerminalDemo } from "./IntegrationTerminalDemo";
import { BrandIdentityDemo } from "./BrandIdentityDemo";
import { WhatsAppAiDemo } from "./WhatsAppAiDemo";
import { identityCopy, aiCopy } from "./serviceScenesCopy";
import { digitalExperienceCopy, type DigitalExperienceLocale } from "./digitalExperienceCopy";
import { dashboardCopy } from "./dashboardData";
import { terminalCopy } from "./terminalData";
import { useServicesMotion } from "./useServicesMotion";
import styles from "./services.module.css";

export function Services({ locale, active = true }: { locale: DigitalExperienceLocale; active?: boolean }) {
  const root = useRef<HTMLElement>(null);
  useServicesMotion(root, active);
  const services = [
    { kind: "experience", copy: digitalExperienceCopy[locale] },
    { kind: "identity", copy: identityCopy[locale] },
    { kind: "product", copy: dashboardCopy[locale] },
    { kind: "ai", copy: aiCopy[locale] },
    { kind: "integrations", copy: terminalCopy[locale] },
  ];

  return <section id="services" tabIndex={-1} ref={root} className={styles.services} hidden={!active} aria-labelledby="services-heading" data-services>
    <header className={styles.heading}><h2 id="services-heading">{locale === "en" ? "What we build." : "O que construímos."}</h2></header>
    <div className={styles.stage}>
      {services.map(({ kind, copy }, index) => <section key={kind} id={`services-${kind}`} className={styles.chapter} data-service-chapter={index + 1} data-service-kind={kind} data-service-theme={kind === "integrations" ? "dark" : "light"} aria-labelledby={`service-${index + 1}`}>
        <div className={styles.titleStage} data-service-title-stage>
          <div className={styles.title} data-service-title><span className={styles.index}>0{index + 1}</span><h3 id={`service-${index + 1}`}>{copy.service}</h3></div>
          <div className={styles.copy} data-service-copy><p>{copy.description}</p><small>{copy.territories}</small></div>
        </div>
        {active && kind === "experience" && <div className={styles.experienceRun} data-experience-run><div className={styles.experienceShell} data-experience-shell><DigitalExperienceDemo locale={locale} /></div></div>}
        {active && kind === "identity" && <BrandIdentityDemo locale={locale} />}
        {active && kind === "product" && <ProductDashboardDemo locale={locale} />}
        {active && kind === "ai" && <><WhatsAppAiDemo locale={locale} /><div className={styles.atmosphere} data-service-atmosphere aria-hidden="true" /></>}
        {active && kind === "integrations" && <div className={styles.terminalStage}><IntegrationTerminalDemo locale={locale} /></div>}
      </section>)}
    </div>
  </section>;
}
