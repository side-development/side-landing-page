"use client";

import Image from "next/image";
import { useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { BrandWordmark } from "./BrandWordmark";
import { NavUnderline } from "./NavUnderline";
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
  const menuOpen = mobile && visible && open;

  useLayoutEffect(() => {
    const media = window.matchMedia(mobileQuery);
    const resetMenu = () => setOpen(false);
    media.addEventListener("change", resetMenu);
    return () => media.removeEventListener("change", resetMenu);
  }, []);

  useLayoutEffect(() => {
    if (!menuOpen) return;
    const header = section.current?.querySelector("header");
    if (!header) return;
    const frame = requestAnimationFrame(() => header.querySelector<HTMLButtonElement>("nav button")?.focus({ preventScroll: true }));
    return () => cancelAnimationFrame(frame);
  }, [menuOpen]);

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
    toggle.current?.focus({ preventScroll: true });
  }

  function toggleMenu() {
    if (menuOpen) { close(); return; }
    setOpen(true);
  }

  return (
    <section ref={section} className={styles.finalHero} data-final-hero data-visible={visible} aria-label="Side" aria-hidden={!visible} inert={!visible}>
      <header className={styles.finalHeader} data-final-chrome data-menu-open={menuOpen}>
        <Image src="/brand/side-logo-black.svg" alt="Side" width={1265} height={1126} className={styles.smallSymbol} />
        <nav className={styles.navigation} aria-label={copy.navigation} onKeyDown={event => {
          if (!menuOpen) return;
          if (event.key === "Escape") { event.preventDefault(); close(); }
        }}>
          <div id={menuId} className={styles.sectionLinks} data-open={menuOpen} inert={mobile && !menuOpen} aria-hidden={mobile && !menuOpen}>
            <button type="button">{copy.work}<NavUnderline variant="work" /></button>
            <button type="button">{copy.services}<NavUnderline variant="services" /></button>
            <button type="button">{copy.why}<NavUnderline variant="why" /></button>
          </div>
          <button className={styles.contact} type="button">{copy.contact}<NavUnderline variant="contact" /></button>
          <button ref={toggle} className={styles.menuToggle} type="button" aria-label={menuOpen ? copy.closeMenu : copy.menu} aria-expanded={menuOpen} aria-controls={menuId} onClick={toggleMenu}>
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
