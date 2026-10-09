import { forwardRef, type ButtonHTMLAttributes } from "react";
import styles from "./glass-button.module.css";

export interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "default" | "sm" | "lg" | "icon";
  contentClassName?: string;
}

// Adapted from the supplied component: same optical layers, native CSS Modules.
export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  function GlassButton({ className = "", children, size = "default", contentClassName = "", ...props }, ref) {
    return <div className={`${styles.wrap} ${className}`}>
      <button ref={ref} className={`${styles.surface} ${styles.interactive} ${styles[size]}`} {...props}>
        <span className={`${styles.content} ${contentClassName}`}>{children}</span>
      </button>
      <span className={styles.shadow} aria-hidden="true" />
    </div>;
  },
);

export default GlassButton;
