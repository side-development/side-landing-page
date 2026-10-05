"use client";

import { useId, useRef } from "react";
import { ClaudeCodeWelcome } from "./ClaudeCodeWelcome";
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
        <span className={styles.windowTitle}><svg width="17" height="15" viewBox="0 0 17 15" fill="none"><path d="M1 3V1h6l2 2h7v11H1Z" fill="#299ac4" /><path d="M1 5h15v9H1Z" fill="#57bee5" /><path d="M6 8.5 8.5 6 11 8.5V12H6Z" fill="#2686b3" /><path d="M8 9h1v3H8Z" fill="#88d0eb" /></svg>✳ Claude Code</span>
      </div>
      <div className={styles.body} data-terminal-body>
        <p className={styles.lastLogin}>{copy.lastLogin}</p>
        <p className={styles.shell} data-terminal-shell><span>→</span><span>~</span><span data-terminal-type="claude" data-terminal-text="claude">claude</span></p>
        <ClaudeCodeWelcome locale={locale} />
        <p className={styles.command} data-terminal-command><span>›</span><span data-terminal-type="mcp" data-terminal-text="/mcp">/mcp</span></p>
        <div className={styles.mcp} data-terminal-response>
          <p className={styles.mcpHeading} data-terminal-line>{copy.manage}</p>
          <p className={styles.muted} data-terminal-line>{copy.serverCount}</p>
          <div className={styles.serverGroup}><p data-terminal-line>{copy.userMcps} <span className={styles.muted}>({copy.userDirectory}/.claude.json)</span></p><p className={styles.server} data-terminal-status data-terminal-line><span>› side mcp</span><span className={styles.muted}>·</span><span className={styles.check}>✓</span><span>{copy.connected}</span></p></div>
          <p className={styles.help} data-terminal-line>https://code.claude.com/docs/en/mcp {copy.help}</p>
        </div>
        <p className={styles.final} data-terminal-final>{copy.keys}</p>
      </div>
    </div>
  </figure>;
}
