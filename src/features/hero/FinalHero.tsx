"use client";

import Image from "next/image";
import { useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { BrandWordmark } from "./BrandWordmark";
import { useFinalHeroMotion } from "./useFinalHeroMotion";
import type { HeroCopy } from "./copy";
import styles from "./hero.module.css";

const mobileQuery = "(max-width: 800px)";
const mobileSnapshot = () => window.matchMedia(mobileQuery).matches;
const desktopSnapshot = () => false;
function subscribeMobile(callback: () => void) {
  const media = window.matchMedia(mobileQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function FinalHero({ copy, visible, focusOnReveal, onReplay }: { copy: HeroCopy; visible: boolean; focusOnReveal: boolean; onReplay?: () => void }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggle = useRef<HTMLButtonElement>(null);
  const section = useRef<HTMLElement>(null);
  const mobile = useSyncExternalStore(subscribeMobile, mobileSnapshot, desktopSnapshot);

  useLayoutEffect(() => {
    if (!visible) return;
    section.current?.querySelectorAll("[data-wordmark], [data-part], [data-final-chrome]").forEach(element => {
      element.removeAttribute("style");
      element.removeAttribute("transform");
    });
    section.current?.removeAttribute("style");
    if (focusOnReveal) section.current?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
  }, [visible, focusOnReveal]);

  useFinalHeroMotion(section, visible);

  function close() {
    setOpen(false);
    toggle.current?.focus();
  }

  function toggleMenu() {
    if (open) { close(); return; }
    setOpen(true);
    requestAnimationFrame(() => section.current?.querySelector<HTMLElement>(`#${CSS.escape(menuId)} button`)?.focus());
  }

  return (
    <section ref={section} className={styles.finalHero} data-final-hero data-visible={visible} aria-label="Side" aria-hidden={!visible} inert={!visible}>
      <header className={styles.finalHeader} data-final-chrome>
        <Image src="/brand/side-logo-black.svg" alt="Side" width={1265} height={1126} className={styles.smallSymbol} />
        <nav className={styles.navigation} aria-label={copy.navigation} onKeyDown={event => { if (event.key === "Escape") close(); }}>
          <div id={menuId} className={styles.sectionLinks} data-open={open} inert={mobile && !open} aria-hidden={mobile && !open}>
            <button type="button">{copy.work}</button>
            <button type="button">{copy.services}</button>
            <button type="button">{copy.why}</button>
          </div>
          <button className={styles.contact} type="button">{copy.contact}</button>
          <button ref={toggle} className={styles.menuToggle} type="button" aria-label={open ? copy.closeMenu : copy.menu} aria-expanded={open} aria-controls={menuId} onClick={toggleMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M4 12H20" /><path d="M4 12H20" /><path d="M4 12H20" />
            </svg>
          </button>
        </nav>
      </header>
      <h1 className={styles.wordmarkHeading} aria-label="Side" tabIndex={-1}>
        <BrandWordmark className={styles.wordmark} data-wordmark />
      </h1>
      <div className={styles.finalSupport} data-final-chrome>
        <div className={styles.supportGroup}>
          <p className={styles.supportCopy}><span className={styles.srOnly}>{copy.support}</span><span aria-hidden="true" data-support-text>{copy.support}</span><span className={styles.copyGlitch} aria-hidden="true" data-support-glitch /></p>
          {onReplay && <button className={styles.replay} type="button" onClick={onReplay}>{copy.replay}</button>}
        </div>
        <p className={styles.signature}><span className={styles.srOnly}>{copy.signature}</span><span aria-hidden="true" data-support-text>{copy.signature}</span><span className={styles.copyGlitch} aria-hidden="true" data-support-glitch /></p>
      </div>
    </section>
  );
}
