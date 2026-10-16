"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { NavUnderline } from "@/features/hero/NavUnderline";
import type { WorkLocale } from "./projects";
import type { WorkNavCopy, WorkPageContent } from "./work-page-content";
import styles from "./work-nav.module.css";

const mobileQuery = "(max-width: 800px)";
const mobileSnapshot = () => window.matchMedia(mobileQuery).matches;
const desktopSnapshot = () => false;
function subscribeMobile(callback: () => void) {
  const media = window.matchMedia(mobileQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

/** Mirror of Home's top header navigation: symbol left, four links right + mobile drawer. Completely floating and unconstrained. */
export function WorkNav({ locale, nav, copy, currentPage = "work" }: { locale: WorkLocale; nav: WorkNavCopy; copy: Pick<WorkPageContent, "home">; currentPage?: "work" | "services" }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggle = useRef<HTMLButtonElement>(null);
  const mobile = useSyncExternalStore(subscribeMobile, mobileSnapshot, desktopSnapshot);
  const menuOpen = mobile && open;

  useLayoutEffect(() => {
    const media = window.matchMedia(mobileQuery);
    const resetMenu = () => setOpen(false);
    media.addEventListener("change", resetMenu);
    return () => media.removeEventListener("change", resetMenu);
  }, []);

  function close() {
    setOpen(false);
    toggle.current?.focus({ preventScroll: true });
  }

  function toggleMenu() {
    if (menuOpen) { close(); return; }
    setOpen(true);
  }

  const prefix = locale === "en" ? "/en" : "";
  const links = [
    { label: nav.work, href: locale === "en" ? "/en/work" : "/trabalhos", variant: "work" as const, current: currentPage === "work" },
    { label: nav.services, href: locale === "en" ? "/en/services" : "/servicos", variant: "services" as const, current: currentPage === "services" },
    { label: nav.why, href: `${prefix}/#why-side`, variant: "why" as const },
  ];

  return (
    <header className={styles.header} data-work-nav data-menu-open={menuOpen}>
      <Link href={locale === "en" ? "/en" : "/"} aria-label={copy.home} prefetch={false} className={styles.brand}>
        <Image src="/brand/side-logo-black.svg" alt="Side" width={1265} height={1126} className={styles.symbol} />
      </Link>
      <nav
        className={styles.navigation}
        aria-label={nav.navigation}
        onKeyDown={event => {
          if (!menuOpen) return;
          if (event.key === "Escape") { event.preventDefault(); close(); }
        }}
      >
        <div id={menuId} className={styles.sectionLinks} data-open={menuOpen} inert={mobile && !menuOpen} aria-hidden={mobile && !menuOpen}>
          <div className={styles.sectionLinkList}>
            <div className={styles.sectionLinkItems}>
              {links.map(link => (
                <Link
                  key={link.variant}
                  href={link.href}
                  prefetch={false}
                  aria-current={link.current ? "page" : undefined}
                  className={styles.link}
                  onClick={() => { if (menuOpen) close(); }}
                >
                  <span className={styles.label}>{link.label}<NavUnderline variant={link.variant} /></span>
                </Link>
              ))}
            </div>
            <Link
              href={locale === "en" ? "/en/contact" : "/contato"}
              prefetch={false}
              className={styles.menuContact}
              onClick={() => { if (menuOpen) close(); }}
            >
              {nav.contact}<span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <Link
          href={locale === "en" ? "/en/contact" : "/contato"}
          prefetch={false}
          className={`${styles.link} ${styles.contact}`}
          inert={menuOpen}
          aria-hidden={menuOpen || undefined}
        >
          <span className={styles.label}>{nav.contact}<NavUnderline variant="contact" /></span>
        </Link>
        <button
          ref={toggle}
          className={styles.menuToggle}
          type="button"
          aria-label={menuOpen ? nav.closeMenu : nav.menu}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={toggleMenu}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
            <path d="M4 12H20" /><path d="M4 12H20" /><path d="M4 12H20" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
