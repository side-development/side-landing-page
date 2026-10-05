import { useId } from "react";
import styles from "./digital-experience.module.css";

export function DigitalExperienceArtwork() {
  const id = useId();
  return <svg className={styles.sculpture} viewBox="0 0 560 560" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-ribbon`} x1="122" y1="140" x2="430" y2="460" gradientUnits="userSpaceOnUse"><stop stopColor="#6b4dea" /><stop offset=".36" stopColor="#3919BD" /><stop offset=".74" stopColor="#260e88" /><stop offset="1" stopColor="#3919BD" /></linearGradient>
      <linearGradient id={`${id}-fold`} x1="170" y1="250" x2="370" y2="390" gradientUnits="userSpaceOnUse"><stop stopColor="#230c80" /><stop offset=".55" stopColor="#3919BD" /><stop offset="1" stopColor="#785be6" /></linearGradient>
    </defs>
    <ellipse className={styles.artShadow} cx="285" cy="491" rx="138" ry="12" fill="#26144f" opacity=".06" />
    <g data-digital-ribbon>
      <path className={styles.backRibbon} data-digital-strand data-digital-open="M70 165C95 150 130 150 160 160L230 177C260 190 290 186 320 168L390 158C430 145 470 150 500 170" d="M355 128C450 132 481 208 408 285L231 424C175 468 96 417 110 347L153 193C169 123 251 101 302 143" stroke="#28108a" strokeWidth="70" strokeLinecap="round" />
      <path data-digital-strand data-digital-open="M65 270C95 280 130 280 160 270C195 260 225 260 250 270C275 280 295 280 320 270L370 270C395 260 425 260 450 270C470 280 490 280 510 270" d="M302 143C354 185 412 210 399 275C385 342 291 393 227 369C181 351 181 306 223 267L355 153C399 111 389 81 341 91C289 101 205 163 181 213" stroke={`url(#${id}-ribbon)`} strokeWidth="70" strokeLinecap="round" />
      <path data-digital-strand data-digital-open="M70 380C135 350 190 350 250 380L340 385C410 410 460 395 500 370" d="M110 347C98 407 165 459 231 424L345 334C403 287 415 249 391 218" stroke={`url(#${id}-fold)`} strokeWidth="70" strokeLinecap="round" />
      <path data-digital-highlight d="M203 395C237 417 270 391 306 362" stroke="#876cee" strokeOpacity=".22" strokeWidth="1.5" />
    </g>
  </svg>;
}
