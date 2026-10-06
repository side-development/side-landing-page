"use client";

import { useRef } from "react";
import { DigitalExperienceDemo } from "./DigitalExperienceDemo";
import { ProductDashboardDemo } from "./ProductDashboardDemo";
import { IntegrationTerminalDemo } from "./IntegrationTerminalDemo";
import { digitalExperienceCopy, type DigitalExperienceLocale } from "./digitalExperienceCopy";
import { dashboardCopy } from "./dashboardData";
import { terminalCopy } from "./terminalData";
import { useServicesMotion } from "./useServicesMotion";
import styles from "./services.module.css";

export function Services({ locale, active = true }: { locale: DigitalExperienceLocale; active?: boolean }) {
  const root = useRef<HTMLElement>(null);
  const experience = useRef<HTMLDivElement>(null);
  useServicesMotion(root, active);
  const copies = [digitalExperienceCopy[locale], dashboardCopy[locale], terminalCopy[locale]];

  return <section ref={root} className={styles.services} hidden={!active} aria-labelledby="services-heading" data-services>
    <header className={styles.heading}><h2 id="services-heading">{locale === "en" ? "What we build." : "O que construímos."}</h2></header>
    <div className={styles.stage}>
      {copies.map((copy, index) => <section key={index} className={styles.chapter} data-service-chapter={index + 1} aria-labelledby={`service-${index + 1}`}>
        <div className={styles.titleStage} data-service-title-stage>
          <div className={styles.title} data-service-title><span className={styles.index}>0{index + 1}</span><h3 id={`service-${index + 1}`}>{copy.service}</h3></div>
          <div className={styles.copy} data-service-copy><p>{copy.description}</p><small>{copy.territories}</small></div>
        </div>
        {active && index === 0 && <div ref={experience} className={styles.experienceRun} data-experience-run><div className={styles.experienceShell} data-experience-shell><DigitalExperienceDemo locale={locale} scene={experience} /></div></div>}
        {active && index === 1 && <><ProductDashboardDemo locale={locale} /><div className={styles.atmosphere} data-service-atmosphere aria-hidden="true" /></>}
        {active && index === 2 && <div className={styles.terminalStage}><IntegrationTerminalDemo locale={locale} /></div>}
      </section>)}
    </div>
  </section>;
}
