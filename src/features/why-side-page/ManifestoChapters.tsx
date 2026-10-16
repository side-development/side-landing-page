import Link from "next/link";
import glass from "@/components/ui/glass-button.module.css";
import { manifestoContent } from "./manifesto-content";
import type { ManifestoLocale } from "./opening-copy";
import styles from "./manifesto-chapters.module.css";

const Arrow = () => <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function ManifestoChapters({ locale }: { locale: ManifestoLocale }) {
  const copy = manifestoContent[locale];

  return <>
    <section id="manifesto-name" tabIndex={-1} className={styles.name} aria-labelledby="name-heading">
      <div className={styles.nameLayout}>
        <h2 id="name-heading" data-editorial-reveal><span>{copy.nameTitle[0]}</span>{" "}<span className={styles.accent}>{copy.nameTitle[1]}</span></h2>
        <div className={styles.nameAside}>
          <p className={styles.origin} data-editorial-reveal>{copy.origin}</p>
          <p className={styles.nameText} data-editorial-reveal>{copy.nameText}</p>
        </div>
      </div>
    </section>

    <section className={styles.principles} aria-labelledby="principles-heading">
      <h2 id="principles-heading" className={styles.label} data-editorial-reveal>{copy.principlesLabel}</h2>
      <ol className={styles.principleList}>
        {copy.principles.map((principle, index) => <li key={principle.action} className={styles.principle} data-editorial-reveal data-editorial-phase>
          <div className={styles.rule} data-editorial-rule aria-hidden="true" />
          <span className={styles.number} aria-hidden="true">0{index + 1}</span>
          <h3><span className={styles.accent}>{principle.action}</span>{" "}{principle.rest}</h3>
          <p>{principle.text}</p>
        </li>)}
      </ol>
    </section>

    <section className={styles.closing} aria-labelledby="manifesto-closing-heading">
      <div className={styles.rule} data-editorial-rule aria-hidden="true" />
      <p className={styles.label} data-editorial-reveal>{copy.closingLabel}</p>
      <h2 id="manifesto-closing-heading" data-editorial-reveal>{copy.closingTitle}</h2>
      <div className={styles.closingAction}>
        <p data-editorial-reveal>{copy.closingText}</p>
        <span className={`${glass.wrap} ${styles.contactWrap}`} data-editorial-reveal>
          <Link href={locale === "en" ? "/en/contact" : "/contato"} prefetch={false} className={`${glass.surface} ${glass.interactive} ${styles.contact}`}>
            <span className={glass.content}>{copy.contact}<Arrow /></span>
          </Link>
          <span className={glass.shadow} aria-hidden="true" />
        </span>
      </div>
    </section>
  </>;
}
