import type { ReactNode } from "react";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { useThemeMode } from "../theme/useThemeMode";
import type { ThemeMode } from "../theme/useThemeMode";

const ICONS: Record<ThemeMode, ReactNode> = {
  light: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  ),
  auto: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v16" />
      <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
    </svg>
  )
};

const ORDER: ThemeMode[] = ["light", "dark", "auto"];
const LABELS = { light: "theme.light", dark: "theme.dark", auto: "theme.auto" } as const;

export function ThemeSwitch({ className = "" }: { className?: string }) {
  const { t } = useT();
  const [mode, choose] = useThemeMode();

  return (
    <div className={`ds-theme-switch ${className}`} role="group" aria-label="Colour mode">
      {ORDER.map((option) => (
        <button
          key={option}
          type="button"
          className={mode === option ? "ds-active" : ""}
          aria-label={t(LABELS[option])}
          aria-pressed={mode === option}
          onClick={() => choose(option)}
        >
          {ICONS[option]}
        </button>
      ))}
    </div>
  );
}
