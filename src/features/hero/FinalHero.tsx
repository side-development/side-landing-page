"use client";

import Image from "next/image";
import { useId, useLayoutEffect, useRef, useState } from "react";
import { BrandWordmark } from "./BrandWordmark";
import type { HeroCopy } from "./copy";
import styles from "./hero.module.css";

export function FinalHero({ copy, visible, focusOnReveal }: { copy: HeroCopy; visible: boolean; focusOnReveal: boolean }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggle = useRef<HTMLButtonElement>(null);
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!visible) return;
    section.current?.querySelectorAll("[data-wordmark], [data-part], [data-final-chrome]").forEach(element => {
      element.removeAttribute("style");
      element.removeAttribute("transform");
    });
    section.current?.removeAttribute("style");
    if (focusOnReveal) section.current?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
  }, [visible, focusOnReveal]);

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
          <div id={menuId} className={styles.sectionLinks} data-open={open}>
            <button type="button">{copy.work}</button>
            <button type="button">{copy.services}</button>
            <button type="button">{copy.why}</button>
          </div>
          <button className={styles.contact} type="button">{copy.contact}</button>
          <button ref={toggle} className={styles.menuToggle} type="button" aria-label={open ? copy.closeMenu : copy.menu} aria-expanded={open} aria-controls={menuId} onClick={toggleMenu}>
            <span /><span />
          </button>
        </nav>
      </header>
      <h1 className={styles.wordmarkHeading} aria-label="Side" tabIndex={-1}>
        <BrandWordmark className={styles.wordmark} data-wordmark />
      </h1>
      <div className={styles.finalSupport} data-final-chrome>
        <p className={styles.supportCopy}>{copy.support}</p>
        <p className={styles.signature}>{copy.signature}</p>
      </div>
    </section>
  );
}
