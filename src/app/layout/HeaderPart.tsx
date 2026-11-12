import type { MouseEvent } from "react";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { useEnterShop } from "./useEnterShop";
import { useMenuClose } from "./useMenuClose";
import { ThemeSwitch } from "./ThemeSwitch";
import "./HeaderPart.css";

export type HeaderPartProps = {
  active?: "home" | "how-it-works" | "about" | "contact" | "products";
  onNavigate?: (path: string) => void;
};

export function HeaderPart({ active, onNavigate }: HeaderPartProps) {
  const { t } = useT();
  const { enter, failed, pending } = useEnterShop();
  useMenuClose();

  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };

  function signIn(event: MouseEvent) {
    event.preventDefault();
    void enter();
  }

  const link = (path: string, label: string, key: string) => (
    <a href={path} data-goto={key} aria-current={active === key ? "page" : undefined} onClick={goTo(path)}>
      {t(label)}
    </a>
  );

  return (
    <div className="studio-part-header" data-part-root="header" style={{ display: "contents" }}>
      <header style={{ background: "hsl(var(--background))", borderBottom: "1px solid hsl(var(--border))" }}>
        <div className="ds-bar site-top">
          <a href="/" className="ds-brand-link" data-goto="home" onClick={goTo("/")}>
            <span className="site-mark" aria-hidden="true">D</span>
            <span className="ds-brand-text">{t("app.name")}</span>
          </a>
          <nav className="site-nav ds-only-wide" aria-label="Pages">
            {link("/", "nav.home", "home")}
            {" "}
            {link("/how-it-works", "nav.howItWorks", "how-it-works")}
            {" "}
            {link("/about", "nav.about", "about")}
            {" "}
            {link("/contact", "nav.contact", "contact")}
          </nav>
          <span className="ds-spacer" />
          <div className="site-top-actions">
            <ThemeSwitch className="ds-only-wide" />
            <a
              href="#"
              className={active ? "ds-btn ds-btn-ghost ds-btn-sm ds-only-wide" : "ds-btn ds-btn-secondary ds-btn-sm ds-only-wide"}
              onClick={signIn}
              aria-busy={pending}
            >
              {pending ? t("auth.opening") : t("auth.signIn")}
            </a>
            {" "}
            <a className="ds-btn ds-btn-sm ds-only-wide" href="#" onClick={signIn} aria-busy={pending}>
              {t("auth.signUp")}
            </a>
            <details className="ds-menu ds-only-narrow">
              <summary className="ds-menu-button" aria-label="Open the menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </summary>
              <div className="ds-menu-list">
                {link("/", "nav.home", "home")}
                {link("/how-it-works", "nav.howItWorks", "how-it-works")}
                {link("/about", "nav.about", "about")}
                {link("/contact", "nav.contact", "contact")}
                {link("/products", "nav.products", "products")}
                <a href="#" onClick={signIn}>{t("auth.signIn")}</a>
                <a href="#" onClick={signIn}>{t("auth.signUp")}</a>
                <ThemeSwitch />
              </div>
            </details>
          </div>
        </div>
        {failed ? <p role="alert" className="site-top-alert">{t("auth.openFailed")}</p> : null}
      </header>
    </div>
  );
}
