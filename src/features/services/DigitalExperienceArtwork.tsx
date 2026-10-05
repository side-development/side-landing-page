import { useId } from "react";
import styles from "./digital-experience.module.css";

export function DigitalExperienceArtwork() {
  const id = useId();
  return <svg className={styles.sculpture} viewBox="0 0 560 560" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-ribbon`} x1="122" y1="140" x2="430" y2="460" gradientUnits="userSpaceOnUse"><stop style={{ stopColor: "var(--digital-light)" }} /><stop offset=".36" style={{ stopColor: "var(--digital-accent)" }} /><stop offset=".74" style={{ stopColor: "var(--digital-dark)" }} /><stop offset="1" style={{ stopColor: "var(--digital-accent)" }} /></linearGradient>
      <linearGradient id={`${id}-fold`} x1="170" y1="250" x2="370" y2="390" gradientUnits="userSpaceOnUse"><stop style={{ stopColor: "var(--digital-fold)" }} /><stop offset=".55" style={{ stopColor: "var(--digital-accent)" }} /><stop offset="1" style={{ stopColor: "var(--digital-front)" }} /></linearGradient>
    </defs>
    <ellipse className={styles.artShadow} cx="285" cy="491" rx="138" ry="12" fill="var(--digital-dark)" opacity=".06" />
    <g data-digital-ribbon>
      <path className={styles.backRibbon} data-digital-strand data-digital-open="M70 165C100 145 130 145 160 165C190 185 220 185 250 165C280 145 310 145 340 165C370 185 393 185 420 165C447 145 473 145 500 165" d="M355 128C450 132 481 208 408 285C349 331.33 290 377.67 231 424C175 468 96 417 110 347C124.33 295.67 138.67 244.33 153 193C169 123 251 101 302 143" stroke="var(--digital-back)" strokeWidth="70" strokeLinecap="round" />
      <path data-digital-strand data-digital-open="M65 270C90 256 115 256 140 270C165 284 190 284 215 270C240 256 265 256 290 270C315 284 340 284 365 270C390 256 415 256 440 270C465 284 487 284 510 270" d="M302 143C354 185 412 210 399 275C385 342 291 393 227 369C181 351 181 306 223 267C267 229 311 191 355 153C399 111 389 81 341 91C289 101 205 163 181 213" stroke={`url(#${id}-ribbon)`} strokeWidth="70" strokeLinecap="round" />
      <path data-digital-strand data-digital-open="M70 380C115 350 165 350 210 380C255 410 310 410 355 380C400 350 455 350 500 380" d="M110 347C98 407 165 459 231 424C269 394 307 364 345 334C403 287 415 249 391 218" stroke={`url(#${id}-fold)`} strokeWidth="70" strokeLinecap="round" />
      <path data-digital-highlight d="M203 395C237 417 270 391 306 362" stroke="var(--digital-highlight)" strokeOpacity=".22" strokeWidth="1.5" />
    </g>
  </svg>;
}
