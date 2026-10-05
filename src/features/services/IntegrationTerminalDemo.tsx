"use client";

import { useId, useRef } from "react";
import { terminalCopy, terminalTranscript, type TerminalLocale } from "./terminalData";
import { useTerminalMotion } from "./useTerminalMotion";
import styles from "./terminal.module.css";

export function IntegrationTerminalDemo({ locale, replay = 0 }: { locale: TerminalLocale; replay?: number }) {
  const root = useRef<HTMLElement>(null);
  const id = useId();
  const copy = terminalCopy[locale];
  useTerminalMotion(root, locale, replay);

  return <figure ref={root} className={styles.terminal} data-terminal aria-labelledby={`${id}-label`}>
    <figcaption id={`${id}-label`} className={styles.srOnly}>{copy.accessible}</figcaption>
    <pre className={styles.srOnly}>{terminalTranscript(locale)}</pre>
    <div className={styles.visual} aria-hidden="true" data-native-cursor>
      <div className={styles.titlebar} data-terminal-titlebar>
        <span className={styles.trafficLights}><i /><i /><i /></span>
        <span className={styles.windowTitle}><svg width="13" height="12" viewBox="0 0 16 14" fill="none"><path d="M1 3a1 1 0 0 1 1-1h4l2 2h6a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z" stroke="currentColor" /></svg>side — claude</span>
        <span className={styles.demo}>Demo</span>
      </div>
      <div className={styles.body} data-terminal-body>
        <p className={styles.command} data-terminal-command><span className={styles.shellPrompt}>$</span><span data-terminal-type="claude" data-terminal-text="claude">claude</span><i className={styles.caret} data-terminal-caret="claude" /></p>
        <p className={styles.command} data-terminal-command><span className={styles.replPrompt}>&gt;</span><span data-terminal-type="mcp" data-terminal-text="/mcp">/mcp</span><i className={styles.caret} data-terminal-caret="mcp" /></p>
        <div className={styles.servers} data-terminal-response>
          <p className={styles.serverHeading}>MCP servers</p>
          <div className={styles.serverRows}>{["side", "github", "figma"].map(server => <p key={server} data-terminal-server><span>{server}</span><span className={styles.connected}>connected</span></p>)}</div>
        </div>
        <div className={styles.statuses}>{["MCP side connected", "context ready", "tools available"].map(status => <p key={status} data-terminal-status><span className={styles.check}>✓</span><span>{status}</span></p>)}</div>
        <p className={`${styles.command} ${styles.final}`} data-terminal-command><span className={styles.replPrompt}>&gt;</span><span data-terminal-type="final" data-terminal-text={copy.final}>{copy.final}</span><i className={styles.caret} data-terminal-caret="final" /></p>
        <p className={styles.idle} data-terminal-idle><span className={styles.replPrompt}>&gt;</span><i className={styles.caret} data-terminal-caret="idle" /></p>
      </div>
    </div>
  </figure>;
}
