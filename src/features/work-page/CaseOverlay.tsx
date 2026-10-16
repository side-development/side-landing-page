"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { WorkLocale, WorkProject } from "./projects";
import type { WorkPageContent } from "./work-page-content";
import styles from "./case-overlay.module.css";

gsap.registerPlugin(useGSAP);

type Props = {
  project: WorkProject;
  locale: WorkLocale;
  copy: WorkPageContent;
  onClose: () => void;
  onNavigateCase?: (slug: string) => void;
  nextProject?: WorkProject;
  prevProject?: WorkProject;
  triggerElement?: HTMLElement | null;
};

export function CaseOverlay({
  project,
  locale,
  copy,
  onClose,
  onNavigateCase,
  nextProject,
  prevProject,
  triggerElement,
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [displayedProject, setDisplayedProject] = useState<WorkProject>(project);
  const [activeSection, setActiveSection] = useState<string>("case-overview");
  const [copied, setCopied] = useState(false);

  // Fluid, butter-smooth cross-fade transition between cases
  useEffect(() => {
    if (project.slug === displayedProject.slug) return;
    const content = contentRef.current;
    const overlay = overlayRef.current;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!content || reduced) {
      const animFrame = requestAnimationFrame(() => {
        setDisplayedProject(project);
        overlay?.scrollTo({ top: 0, behavior: "instant" });
      });
      return () => cancelAnimationFrame(animFrame);
    }

    // Cross-fade out old content gently, swap data, glide in new content
    const tween = gsap.to(content, {
      opacity: 0,
      y: -10,
      duration: 0.16,
      ease: "power2.inOut",
      onComplete: () => {
        setDisplayedProject(project);
        overlay?.scrollTo({ top: 0, behavior: "instant" });
        gsap.fromTo(
          content,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.28, ease: "power2.out", clearProps: "transform" }
        );
      },
    });

    return () => {
      tween.kill();
    };
  }, [project, displayedProject.slug]);

  // Body scroll lock with scrollbar width compensation
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    overlayRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      if (triggerElement && typeof triggerElement.focus === "function") {
        triggerElement.focus();
      }
    };
  }, [triggerElement]);

  // Keyboard navigation (Escape closes overlay)
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const isClickScrolling = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track active section for On This Page TOC
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const sectionIds = [
      "case-overview",
      "case-challenge",
      "case-solution",
      "case-media",
      "case-impact",
      "case-scope",
    ];

    function handleScroll() {
      if (!overlay || isClickScrolling.current) return;

      const overlayRect = overlay.getBoundingClientRect();
      const clientHeight = overlay.clientHeight;
      const scrollHeight = overlay.scrollHeight;
      const scrollTop = overlay.scrollTop;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 60;

      // 1. If user is at or near the bottom of scrollable container
      if (isAtBottom) {
        const scopeEl = overlay.querySelector<HTMLElement>("#case-scope");
        const impactEl = overlay.querySelector<HTMLElement>("#case-impact");

        if (scopeEl) {
          const scopeTop = scopeEl.getBoundingClientRect().top - overlayRect.top;
          if (scopeTop < clientHeight - 40) {
            setActiveSection("case-scope");
            return;
          }
        }
        if (impactEl) {
          const impactTop = impactEl.getBoundingClientRect().top - overlayRect.top;
          if (impactTop < clientHeight - 40) {
            setActiveSection("case-impact");
            return;
          }
        }
      }

      // 2. Check if bottom sections have scrolled prominently into view before absolute bottom
      const scopeEl = overlay.querySelector<HTMLElement>("#case-scope");
      if (scopeEl) {
        const scopeTop = scopeEl.getBoundingClientRect().top - overlayRect.top;
        if (scopeTop <= clientHeight * 0.75 && scrollTop + clientHeight >= scrollHeight - 350) {
          setActiveSection("case-scope");
          return;
        }
      }

      const impactEl = overlay.querySelector<HTMLElement>("#case-impact");
      if (impactEl) {
        const impactTop = impactEl.getBoundingClientRect().top - overlayRect.top;
        if (impactTop <= clientHeight * 0.65 && scrollTop + clientHeight >= scrollHeight - 650) {
          if (!scopeEl || scopeEl.getBoundingClientRect().top - overlayRect.top > clientHeight * 0.75) {
            setActiveSection("case-impact");
            return;
          }
        }
      }

      // 3. Normal scrolling through content
      const triggerY = clientHeight * 0.38;
      let currentActive = sectionIds[0];

      for (const id of sectionIds) {
        const el = overlay.querySelector<HTMLElement>(`#${id}`);
        if (!el) continue;
        const topRelativeToViewport = el.getBoundingClientRect().top - overlayRect.top;

        if (topRelativeToViewport <= triggerY) {
          currentActive = id;
        } else {
          break;
        }
      }

      setActiveSection(currentActive);
    }

    overlay.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      overlay.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [displayedProject.slug]);

  // Subtle GSAP entrance on mount only (overlay does not jolt on case switch)
  useGSAP(
    () => {
      if (!overlayRef.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.24, ease: "power2.out" }
      );
    },
    { scope: overlayRef, dependencies: [] }
  );

  const scrollTo = (id: string) => {
    setActiveSection(id);
    isClickScrolling.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);

    const el = overlayRef.current?.querySelector<HTMLElement>(`#${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const { caseStudy } = displayedProject;
  const wordmarkSrc = displayedProject.wordmark?.darkSrc || displayedProject.wordmark?.src;

  return (
    <div
      ref={overlayRef}
      tabIndex={-1}
      className={`${styles.overlay} dark`}
      data-theme="dark"
      role="dialog"
      aria-modal="true"
      aria-label={copy.caseOverlayLabel(displayedProject.name)}
    >
      {/* Clean 2-Column Architecture: [ Main Content ] [ Right TOC ("Neste case") ] */}
      <div className={styles.layout}>
        {/* Center: Main Editorial Case Content */}
        <main ref={contentRef} className={styles.content}>
          {/* Breadcrumbs + Action Buttons */}
          <div className={styles.articleHeaderBar}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <button
                type="button"
                className={styles.breadcrumbLink}
                onClick={onClose}
              >
                {copy.heading}
              </button>
              <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
              <span className={styles.breadcrumbCurrent}>{displayedProject.name}</span>
            </nav>

            <div className={styles.articleHeaderActions}>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={handleCopyLink}
                title={copy.copyLink}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>{copied ? copy.linkCopied : copy.copyLink}</span>
              </button>

              <button
                type="button"
                className={styles.mobileCloseBtn}
                onClick={onClose}
                aria-label={copy.closeCase}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>
          </div>

          {/* Hero / Title & Lede (Clean SWR layout, no AI clutter) */}
          <section id="case-overview" className={styles.hero}>
            <h1 className={styles.heroTitle}>
              {displayedProject.wordmark ? (
                <Image
                  src={wordmarkSrc!}
                  alt={displayedProject.name}
                  width={displayedProject.wordmark.width}
                  height={displayedProject.wordmark.height}
                  className={styles.wordmark}
                  priority
                />
              ) : (
                displayedProject.name
              )}
            </h1>

            <p className={styles.heroLede}>{displayedProject.summary[locale]}</p>
          </section>

          {/* Section: Challenge (H2 SWR Heading) */}
          <section className={styles.sectionBlock}>
            <h2 id="case-challenge" className={styles.sectionH2}>
              {copy.challenge}
            </h2>
            {caseStudy.challenge.paragraphs[locale].map((p, i) => (
              <p key={i} className={styles.paragraph}>{p}</p>
            ))}
          </section>

          {/* Section: Solution (Pure editorial prose, no card boxes) */}
          <section className={styles.sectionBlock}>
            <h2 id="case-solution" className={styles.sectionH2}>
              {copy.solution}
            </h2>
            {caseStudy.solution.paragraphs[locale].map((p, i) => (
              <p key={i} className={styles.paragraph}>{p}</p>
            ))}

            {caseStudy.solution.highlights && (
              <div className={styles.solutionHighlights}>
                {caseStudy.solution.highlights.map((h, i) => (
                  <div key={i} className={styles.solutionHighlightItem}>
                    <h3 className={styles.solutionHighlightTitle}>{h.title[locale]}</h3>
                    <p className={styles.paragraph}>{h.description[locale]}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section: Media & Screens */}
          <section className={styles.sectionBlock}>
            <h2 id="case-media" className={styles.sectionH2}>
              {copy.selectedMedia}
            </h2>
            <div className={styles.mediaGrid}>
              {displayedProject.media.map((item, i) => {
                if (item.kind !== "image") return null;
                const isFirst = i === 0;
                return (
                  <figure
                    key={i}
                    className={`${styles.mediaItem} ${isFirst ? styles.mediaItemFull : ""}`}
                  >
                    <div className={styles.mediaFrame}>
                      <Image
                        src={item.src}
                        alt={item.alt[locale]}
                        fill
                        sizes={isFirst ? "100vw, 920px" : "(max-width: 900px) 100vw, 440px"}
                        className={styles.mediaImage}
                        style={{ objectFit: item.fit ?? "cover", ...(item.fit === "contain" ? { transform: "none" } : {}) }}
                      />
                    </div>
                    <figcaption className={styles.mediaCaption}>
                      {item.caption[locale]}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </section>

          {/* Section: Results & Impact */}
          <section className={styles.sectionBlock}>
            <h2 id="case-impact" className={styles.sectionH2}>
              {copy.impact}
            </h2>
            {caseStudy.impact.paragraphs[locale].map((p, i) => (
              <p key={i} className={styles.paragraph}>{p}</p>
            ))}
          </section>

          {/* Section: Scope (Clean text list, no box container) */}
          <section className={styles.sectionBlock}>
            <h2 id="case-scope" className={styles.sectionH2}>
              {copy.scope}
            </h2>
            <ul className={styles.scopeList}>
              {caseStudy.scope[locale].map((item, i) => (
                <li key={i} className={styles.scopeItem}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Text-only Pagination Footer (No card boxes) */}
          <footer className={styles.pagination}>
            {prevProject ? (
              <button
                type="button"
                className={styles.pageBtn}
                onClick={() => onNavigateCase?.(prevProject.slug)}
              >
                <span className={styles.pageBtnSub}>← {copy.prevCase}</span>
                <span className={styles.pageBtnTitle}>{prevProject.name}</span>
              </button>
            ) : (
              <div />
            )}

            {nextProject ? (
              <button
                type="button"
                className={`${styles.pageBtn} ${styles.pageBtnNext}`}
                onClick={() => onNavigateCase?.(nextProject.slug)}
              >
                <span className={styles.pageBtnSub}>{copy.nextCase} →</span>
                <span className={styles.pageBtnTitle}>{nextProject.name}</span>
              </button>
            ) : (
              <div />
            )}
          </footer>
        </main>

        {/* Right: Sticky Table of Contents ("Neste case") */}
        <aside className={styles.toc} aria-label={copy.onThisPage}>
          <span className={styles.tocTitle}>{copy.onThisPage}</span>
          <nav className={styles.tocNav}>
            <button
              type="button"
              className={styles.tocLink}
              data-active={activeSection === "case-overview"}
              onClick={() => scrollTo("case-overview")}
            >
              {copy.overview}
            </button>
            <button
              type="button"
              className={styles.tocLink}
              data-active={activeSection === "case-challenge"}
              onClick={() => scrollTo("case-challenge")}
            >
              {copy.challenge}
            </button>
            <button
              type="button"
              className={styles.tocLink}
              data-active={activeSection === "case-solution"}
              onClick={() => scrollTo("case-solution")}
            >
              {copy.solution}
            </button>
            <button
              type="button"
              className={styles.tocLink}
              data-active={activeSection === "case-media"}
              onClick={() => scrollTo("case-media")}
            >
              {copy.selectedMedia}
            </button>
            <button
              type="button"
              className={styles.tocLink}
              data-active={activeSection === "case-impact"}
              onClick={() => scrollTo("case-impact")}
            >
              {copy.impact}
            </button>
            <button
              type="button"
              className={styles.tocLink}
              data-active={activeSection === "case-scope"}
              onClick={() => scrollTo("case-scope")}
            >
              {copy.scope}
            </button>
          </nav>

          <div className={styles.tocDivider} />

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.tocUtilityLink}
            onClick={onClose}
          >
            {copy.closeCase} ✕
          </button>
          <button
            type="button"
            className={styles.tocUtilityLink}
            onClick={() => scrollTo("case-overview")}
          >
            {copy.backToTop} ↑
          </button>
        </aside>
      </div>
    </div>
  );
}
