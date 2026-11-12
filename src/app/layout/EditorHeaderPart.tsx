import type { MouseEvent } from "react";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { ThemeSwitch } from "./ThemeSwitch";
import { useMenuClose } from "./useMenuClose";
import "./EditorHeaderPart.css";

export type EditorSection = "products" | "wording" | "entries";

export type EditorHeaderPartProps = {
  section: EditorSection;
  name: string;
  onSection: (section: EditorSection) => void;
  onNavigate?: (path: string) => void;
  onSignOut: () => void;
};

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function EditorHeaderPart({ section, name, onSection, onNavigate, onSignOut }: EditorHeaderPartProps) {
  const { t } = useT();
  useMenuClose();

  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  const pick = (next: EditorSection) => (event: MouseEvent) => {
    event.preventDefault();
    onSection(next);
  };
  const signOut = (event: MouseEvent) => {
    event.preventDefault();
    onSignOut();
  };

  const items: { key: EditorSection; label: string }[] = [
    { key: "products", label: t("editor.tabProducts") },
    { key: "wording", label: t("editor.tabWording") },
    { key: "entries", label: t("editor.tabEntries") }
  ];

  return (
    <div className="studio-part-editor-header" data-part-root="editor-header" style={{ display: "contents" }}>
      <header style={{ background: "hsl(var(--card))", borderBottom: "1px solid hsl(var(--border))" }}>
        <div className="ds-bar ed-top">
          <a href="/editor" className="ed-brand" data-goto="editor" onClick={goTo("/editor")}>
            <span className="ed-mark" aria-hidden="true">D</span>
            <span className="ds-brand-text">{t("app.name")}</span>
            <span className="ed-tag">{t("editor.tag")}</span>
          </a>
          <nav className="ed-tabs ds-only-wide" aria-label={t("editor.tabsLabel")}>
            {items.map((item) => (
              <a
                key={item.key}
                href="#"
                className={section === item.key ? "ed-tab ds-active" : "ed-tab"}
                aria-current={section === item.key ? "page" : undefined}
                onClick={pick(item.key)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <span className="ds-spacer" />
          <div className="ed-end">
            <ThemeSwitch className="ds-only-wide" />
            <div className="ds-user ds-only-wide">
              <span className="ds-avatar" aria-hidden="true">{initialsOf(name)}</span>
              <span className="ds-user-text">
                <b className="ds-user-name">{name}</b>
                <span className="ds-user-role">{t("editor.roleLabel")}</span>
              </span>
            </div>
            <details className="ds-menu">
              <summary className="ds-btn ds-btn-ghost ds-btn-icon" aria-label={t("editor.menuLabel")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="5" cy="12" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="19" cy="12" r="1.5" />
                </svg>
              </summary>
              <div className="ds-menu-list">
                {items.map((item) => (
                  <a key={item.key} href="#" aria-current={section === item.key ? "page" : undefined} onClick={pick(item.key)}>
                    {item.label}
                  </a>
                ))}
                <ThemeSwitch />
                <a href="#" onClick={signOut}>{t("editor.signOut")}</a>
              </div>
            </details>
          </div>
        </div>
      </header>
    </div>
  );
}
