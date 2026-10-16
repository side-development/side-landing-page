import Image from "next/image";
import Link from "next/link";
import { BrandWordmark } from "@/features/hero/BrandWordmark";
import { projects, type ImageMedia } from "@/features/work-page/projects";
import glass from "@/components/ui/glass-button.module.css";
import { manifestoContent } from "./manifesto-content";
import type { ManifestoLocale } from "./opening-copy";
import styles from "./manifesto-chapters.module.css";

const Arrow = () => <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function ManifestoChapters({ locale }: { locale: ManifestoLocale }) {
  const copy = manifestoContent[locale];
  const workPath = locale === "en" ? "/en/work" : "/trabalhos";
  const selections = projects.filter(project => project.slug === "route" || project.slug === "owl");
  const vision = projects.find(project => project.slug === "computer-vision");

  return <>
    <section id="manifesto-name" tabIndex={-1} className={styles.name} aria-labelledby="name-heading">
      <p className={styles.label}>{copy.nameLabel}</p>
      <div className={styles.nameLayout}>
        <h2 id="name-heading" data-editorial-reveal><span>{copy.nameTitle[0]}</span>{" "}<span className={styles.accent}>{copy.nameTitle[1]}</span></h2>
        <div className={styles.nameAside} data-editorial-reveal>
          <p className={styles.origin}>{copy.origin}</p>
          <p className={styles.nameText}>{copy.nameText}</p>
          <div className={styles.brandSignature}>
            <BrandWordmark className={styles.wordmark} />
            <p>{copy.signature}{locale === "pt-BR" && <span lang="en">By your side.</span>}</p>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.principles} aria-labelledby="principles-heading">
      <h2 id="principles-heading" className={styles.label}>{copy.principlesLabel}</h2>
      <ol className={styles.principleList}>
        {copy.principles.map((principle, index) => <li key={principle.action} className={styles.principle}>
          <div className={styles.rule} data-editorial-rule aria-hidden="true" />
          <span className={styles.number} aria-hidden="true">0{index + 1}</span>
          <h3 data-editorial-reveal><span className={styles.accent}>{principle.action}</span>{" "}{principle.rest}</h3>
          <p data-editorial-reveal>{principle.text}</p>
        </li>)}
      </ol>
    </section>

    <section className={styles.work} aria-labelledby="manifesto-work-heading">
      <p className={styles.label}>{copy.workLabel}</p>
      <div className={styles.workIntro}>
        <h2 id="manifesto-work-heading" data-editorial-reveal><span>{copy.workTitle[0]}</span>{" "}<span className={styles.accent}>{copy.workTitle[1]}</span></h2>
        <p data-editorial-reveal>{copy.workText}</p>
      </div>
      <div className={styles.workFragments}>
        {selections.map(project => {
          const media = project.media.find((item): item is ImageMedia => item.kind === "image" && (project.slug !== "owl" || item.src.endsWith("/02-servico.webp")));
          if (!media) return null;
          return <article key={project.slug} className={styles.fragment} data-editorial-reveal>
            <Link href={`${workPath}?case=${project.slug}`} prefetch={false} className={styles.projectLink} aria-label={`${copy.caseLink}: ${project.name}`}>
              <div className={styles.imageFrame}><Image src={media.src} alt={media.alt[locale]} width={media.width} height={media.height} sizes="(max-width: 800px) calc(100vw - 48px), (max-width: 1200px) 50vw, 760px" /></div>
              <div className={styles.projectCaption}><div><h3>{project.name}</h3><p>{project.category[locale]}</p></div><Arrow /></div>
            </Link>
          </article>;
        })}
      </div>
      {vision && <div className={styles.vision} data-editorial-reveal>
        <h3><Link href={`${workPath}?case=${vision.slug}`} prefetch={false}>{vision.name}<Arrow /></Link></h3>
        <div><p>{vision.summary[locale]}</p><small>{copy.confidentiality}</small></div>
      </div>}
      <Link className={styles.textLink} href={workPath} prefetch={false}>{copy.workLink}<Arrow /></Link>
    </section>

    <section className={styles.closing} aria-labelledby="manifesto-closing-heading">
      <div className={styles.rule} data-editorial-rule aria-hidden="true" />
      <p className={styles.label}>{copy.closingLabel}</p>
      <h2 id="manifesto-closing-heading" data-editorial-reveal>{copy.closingTitle}</h2>
      <div className={styles.closingAction}>
        <p>{copy.closingText}</p>
        <span className={`${glass.wrap} ${styles.contactWrap}`}>
          <Link href={locale === "en" ? "/en/contact" : "/contato"} prefetch={false} className={`${glass.surface} ${glass.interactive} ${styles.contact}`}>
            <span className={glass.content}>{copy.contact}<Arrow /></span>
          </Link>
          <span className={glass.shadow} aria-hidden="true" />
        </span>
      </div>
    </section>
  </>;
}
