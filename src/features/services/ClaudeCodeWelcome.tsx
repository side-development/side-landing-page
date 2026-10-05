import styles from "./terminal.module.css";

import { terminalCopy, type TerminalLocale } from "./terminalData";

export function ClaudeCodeWelcome({ locale }: { locale: TerminalLocale }) {
  const copy = terminalCopy[locale];
  return <div className={styles.welcome} data-terminal-welcome>
    <p className={styles.welcomeLegend}>Claude Code <span>v2.1.72</span></p>
    <div className={styles.welcomeIdentity}>
      <p className={styles.welcomeBack}>{copy.welcome}</p>
      <svg className={styles.mascot} viewBox="0 0 80 55" aria-hidden="true" shapeRendering="crispEdges">
        <path d="M10 0H70V22H80V33H70V44H65V55H60V44H55V55H50V44H30V55H25V44H20V55H15V44H10V33H0V22H10Z" fill="currentColor" />
        <path d="M20 11H25V22H20Z M55 11H60V22H55Z" fill="#262a33" />
      </svg>
      <div className={styles.environment}><p>{copy.environment}</p><p>/Users/desenvolvedor</p></div>
    </div>
    <div className={styles.welcomeTips}>
      <p className={styles.tipsHeading}>{copy.tips}</p>
      <p>{copy.init}</p>
      <p>{copy.note}</p>
      <div className={styles.recent}><p className={styles.tipsHeading}>{copy.recent}</p><p>{copy.noActivity}</p></div>
    </div>
  </div>;
}
