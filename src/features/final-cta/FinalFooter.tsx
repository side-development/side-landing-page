"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { BrandWordmark } from "@/features/hero/BrandWordmark";
import glass from "@/components/ui/glass-button.module.css";
import { NewsletterSignup } from "./NewsletterSignup";
import styles from "./final-footer.module.css";

function officialProfile(value: string | undefined, domain: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && (url.hostname === domain || url.hostname.endsWith(`.${domain}`))) return url.href;
  } catch { /* Leave unconfigured profiles noninteractive. */ }
}

function SocialIcon({ network, href }: { network: "Instagram" | "LinkedIn"; href?: string }) {
  const icon = <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    {network === "Instagram" ? <>
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="3.7" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </> : <>
      <path d="M5 9h3v11H5zM11 9h3v1.6c.7-1.1 1.7-1.9 3.2-1.9 2.4 0 3.8 1.5 3.8 4.5V20h-3v-6c0-1.6-.6-2.4-1.8-2.4-1.3 0-2.2.9-2.2 2.5V20h-3V9Z" fill="currentColor" />
      <circle cx="6.5" cy="5.5" r="1.8" fill="currentColor" />
    </>}
  </svg>;
  const content = <span className={glass.content}>{icon}</span>;
  return <span className={`${glass.wrap} ${styles.socialIcon}`}>
    {href
      ? <a className={`${glass.surface} ${glass.interactive} ${glass.icon}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={network}>{content}</a>
      : <span className={`${glass.surface} ${glass.icon}`} data-unconfigured role="img" aria-label={network}>{content}</span>}
    <span className={glass.shadow} aria-hidden="true" />
  </span>;
}

export function FinalFooter({ locale }: { locale: "pt-BR" | "en" }) {
  const english = locale === "en";
  const home = english ? "/en" : "/";
  const pathname = usePathname();
  const root = useRef<HTMLElement>(null);
  const localPath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const instagram = officialProfile(process.env.NEXT_PUBLIC_SIDE_INSTAGRAM_URL, "instagram.com");
  const linkedin = officialProfile(process.env.NEXT_PUBLIC_SIDE_LINKEDIN_URL, "linkedin.com");
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    // Text inputs can match :focus-visible even after a mouse click.
    // Track Tab separately so only keyboard navigation outlines the field.
    const keyboardFocus = (event: KeyboardEvent) => {
      if (event.key === "Tab") node.dataset.keyboardFocus = "true";
    };
    const pointerFocus = () => { delete node.dataset.keyboardFocus; };
    window.addEventListener("keydown", keyboardFocus, true);
    window.addEventListener("pointerdown", pointerFocus, true);
    return () => {
      window.removeEventListener("keydown", keyboardFocus, true);
      window.removeEventListener("pointerdown", pointerFocus, true);
      delete node.dataset.keyboardFocus;
    };
  }, []);
  useEffect(() => {
    if (location.hash !== "#side-footer") return;
    // Let scroll choreography and the localized route settle before aligning.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        root.current?.scrollIntoView({ block: "start", behavior: "instant" });
        root.current?.focus({ preventScroll: true });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  const navigation = english
    ? [["Work", "work"], ["Services", "services"], ["Why Side", "why-side"]]
    : [["Trabalhos", "work"], ["Serviços", "services"], ["Por que Side", "why-side"]];

  return <footer ref={root} id="side-footer" tabIndex={-1} className={styles.footer} role="contentinfo" data-final-footer>
    <div className={styles.watermark} aria-hidden="true"><BrandWordmark className={styles.wordmark} viewBox="-3 -3 1660 693" preserveAspectRatio="xMidYMax meet" /></div>
    <div className={styles.grid}>
      <div className={styles.identity}>
        <p className={styles.signature}>
          {english ? "Always by your side." : <>Sempre ao seu lado.<span lang="en">By your side.</span></>}
        </p>
        <small className={styles.copyright}>© 2026 Side</small>
      </div>
      <nav className={styles.navigation} aria-label={english ? "Footer navigation" : "Navegação do rodapé"}>
        <span className={styles.label}>Explore</span>
        <ul>
          {navigation.map(([label, anchor]) => <li key={anchor}><Link href={`${home}#${anchor}`} prefetch={false}>{label}</Link></li>)}
          <li><Link href={english ? "/en/contact" : "/contato"} prefetch={false}>{english ? "Contact" : "Contato"}</Link></li>
        </ul>
      </nav>
      <div className={styles.contact}>
        <span className={styles.label}>{english ? "Let's talk" : "Vamos conversar"}</span>
        <a href="mailto:contato@sidecode.com.br">contato@<wbr />sidecode.com.br</a>
      </div>
      <div className={styles.locale}>
        <span className={styles.label}>{english ? "Language" : "Idioma"}</span>
        <nav className={styles.languages} aria-label={english ? "Language" : "Idioma"}>
          <Link href={`${localPath}#side-footer`} hrefLang="pt-BR" lang="pt-BR" aria-label="Português" aria-current={!english ? "page" : undefined} prefetch={false}>PT</Link>
          <Link href={`/en${localPath === "/" ? "" : localPath}#side-footer`} hrefLang="en" lang="en" aria-label="English" aria-current={english ? "page" : undefined} prefetch={false}>EN</Link>
        </nav>
      </div>
      <div className={styles.updates}>
        <NewsletterSignup english={english} />
        <div className={styles.socials} aria-label={english ? "Social media" : "Redes sociais"}>
          <SocialIcon network="Instagram" href={instagram} />
          <SocialIcon network="LinkedIn" href={linkedin} />
        </div>
      </div>
    </div>
  </footer>;
}
