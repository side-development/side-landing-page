"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SideCursor } from "@/features/cursor/SideCursor";
import { ProjectGallery } from "./ProjectGallery";
import { WorkNav } from "./WorkNav";
import { CaseOverlay } from "./CaseOverlay";
import { projects, type WorkLocale } from "./projects";
import { workPageContent, type WorkNavCopy } from "./work-page-content";
import styles from "./work-page.module.css";

gsap.registerPlugin(useGSAP);

type Props = {
  locale: WorkLocale;
  nav: WorkNavCopy;
  initialCase?: string;
};

export function WorkExperience({ locale, nav, initialCase }: Props) {
  const intro = useRef<HTMLElement>(null);
  const [activeCase, setActiveCase] = useState<string | null>(initialCase || null);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);

  const copy = workPageContent[locale];
  const heading = copy.heading;

  // Listen to popstate (browser Back / Forward navigation)
  useEffect(() => {
    function handlePopState() {
      const params = new URLSearchParams(window.location.search);
      const caseParam = params.get("case");
      setActiveCase(caseParam);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleOpenCase = useCallback((slug: string, el?: HTMLElement | null) => {
    setTriggerEl(el ?? null);
    setActiveCase(slug);
    const newUrl = `${window.location.pathname}?case=${encodeURIComponent(slug)}`;
    window.history.pushState(null, "", newUrl);
  }, []);

  const handleCloseCase = useCallback(() => {
    setActiveCase(null);
    window.history.pushState(null, "", window.location.pathname);
  }, []);

  const handleNavigateCase = useCallback((slug: string) => {
    setActiveCase(slug);
    const newUrl = `${window.location.pathname}?case=${encodeURIComponent(slug)}`;
    window.history.pushState(null, "", newUrl);
  }, []);

  useGSAP(
    () => {
      if (!intro.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.fromTo(
        intro.current,
        { opacity: 0, filter: "blur(14px)", y: 16 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          clearProps: "filter,transform",
        }
      );
    },
    { scope: intro }
  );

  const activeIndex = projects.findIndex((p) => p.slug === activeCase);
  const activeProject = activeIndex !== -1 ? projects[activeIndex] : null;
  const prevProject = activeIndex > 0 ? projects[activeIndex - 1] : undefined;
  const nextProject = activeIndex >= 0 && activeIndex < projects.length - 1 ? projects[activeIndex + 1] : undefined;

  return (
    <div className={styles.page}>
      <WorkNav locale={locale} nav={nav} copy={copy} />
      <main id="work-main">
        <header ref={intro} className={styles.intro}>
          <h1>
            {heading}
            <span className={styles.dot} aria-hidden="true" />
          </h1>
          <div className={styles.introSide}>
            <p className={styles.lede}>{copy.intro}</p>
          </div>
        </header>

        <div className={styles.list}>
          {projects.map((project, i) => (
            <ProjectGallery
              key={project.slug}
              project={project}
              position={i + 1}
              locale={locale}
              copy={copy}
              priority={i === 0}
              onOpen={handleOpenCase}
            />
          ))}
        </div>
      </main>

      {/* Fullscreen Case Overlay with URL sync */}
      {activeProject && (
        <CaseOverlay
          project={activeProject}
          locale={locale}
          copy={copy}
          onClose={handleCloseCase}
          onNavigateCase={handleNavigateCase}
          prevProject={prevProject}
          nextProject={nextProject}
          triggerElement={triggerEl}
        />
      )}

      <SideCursor active />
    </div>
  );
}
