import type { MouseEvent } from "react";
import { FooterPart } from "../../app/layout/FooterPart";
import { ThemeSwitch } from "../../app/layout/ThemeSwitch";
import { useMenuClose } from "../../app/layout/useMenuClose";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { useEnterShop } from "../shop-entry/useEnterShop";
import "./ProductsScreen.css";

/** The situations the design shows: the screen as it usually is, then each one drawn. Show the one the real data or request is in. */
export type ProductsScreenSituation = "normal" | "empty";

export function ProductsScreen({ situation = "normal", onNavigate }: { situation?: ProductsScreenSituation; onNavigate?: (path: string) => void }) {
  const { t } = useT();
  useMenuClose();
  const { enter, failed, pending } = useEnterShop();

  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  const signUp = (event: MouseEvent) => {
    event.preventDefault();
    void enter();
  };
  const signUpLabel = pending ? t("auth.opening") : t("auth.signUp");

  return (
    <div className="studio-screen-products" style={{ display: "contents" }}>
      <main data-screen="products">
        <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
          <header className="pr-top">
            <a href="/" className="pr-brand" data-goto="home" onClick={goTo("/")}>
              {" "}
              <span className="pr-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M7 8c-1.5 1.6-2 3.4 0 4.5M17 8c1.5 1.6 2 3.4 0 4.5" />
                  <path d="M6 13.5c0 3.5 2.7 6 6 6s6-2.5 6-6c0-1.6-1-2.8-2.5-2.8h-7C7 10.7 6 11.9 6 13.5Z" />
                </svg>
              </span>
              {" "}
              <span>{t("app.name")}</span>
              {" "}
            </a>
            <nav className="pr-links ds-only-wide" aria-label="Site pages">
              <a href="/" data-goto="home" onClick={goTo("/")}>{t("nav.home")}</a>
              {" "}
              <a className="pr-on" href="#" aria-current="page">{t("nav.products")}</a>
              {" "}
              <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>{t("nav.howItWorks")}</a>
              {" "}
              <a href="/about" data-goto="about" onClick={goTo("/about")}>{t("nav.about")}</a>
              {" "}
              <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>{t("nav.contact")}</a>
            </nav>
            <span className="ds-spacer" />
            <ThemeSwitch className="ds-only-wide" />
            <a href="#" className="ds-btn ds-btn-sm ds-only-wide" onClick={signUp} aria-busy={pending}>{signUpLabel}</a>
            {" "}
            <a href="#" className="ds-btn ds-btn-ghost ds-btn-sm ds-only-wide" onClick={(event) => { event.preventDefault(); onNavigate?.("/editor"); }}>{t("auth.signIn")}</a>
            <details className="ds-menu ds-only-narrow">
              <summary className="ds-menu-button" aria-label="Open the menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </summary>
              <div className="ds-menu-list">
                <a href="/" data-goto="home" onClick={goTo("/")}>{t("nav.home")}</a>
                <a href="#">{t("nav.products")}</a>
                <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>{t("nav.howItWorks")}</a>
                <a href="/about" data-goto="about" onClick={goTo("/about")}>{t("nav.about")}</a>
                <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>{t("nav.contact")}</a>
                <a href="#" onClick={(event) => { event.preventDefault(); onNavigate?.("/editor"); }}>{t("auth.signIn")}</a>
                <a href="#" onClick={signUp}>{t("auth.signUp")}</a>
                <ThemeSwitch />
              </div>
            </details>
          </header>
          {failed ? <p role="alert" className="ds-muted" style={{ paddingBottom: "calc(16px * var(--space-scale, 1))" }}>{t("auth.openFailed")}</p> : null}
        </div>
        {situation === "empty" ? (
          <section data-state="empty">
            <div className="ds-page" style={{ paddingTop: "calc(48px * var(--space-scale, 1))", paddingBottom: "calc(64px * var(--space-scale, 1))" }}>
              <div className="ds-page-head pr-head" style={{ gridTemplateColumns: "1fr" }}>
                <div>
                  <span className="ds-eyebrow">{t("products.eyebrow")}</span>
                  <h1 className="ds-h1 ds-display">{t("products.heading")}</h1>
                  <p className="pr-lead">{t("products.lead")}</p>
                </div>
              </div>
              <div className="ds-empty">
                <div className="ds-empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="16" rx="3" />
                    <path d="m3 16 5-4 4 3 3-2 6 4" />
                    <circle cx="9" cy="9" r="1.5" />
                  </svg>
                </div>
                <h2 className="ds-h3">{t("products.empty")}</h2>
                <p className="ds-muted" style={{ marginTop: "calc(8px * var(--space-scale, 1))" }}>{t("products.emptyBody")}</p>
                <a href="#" className="ds-btn" style={{ marginTop: "calc(24px * var(--space-scale, 1))" }} onClick={signUp} aria-busy={pending}>{signUpLabel}</a>
              </div>
            </div>
          </section>
        ) : (
          <div data-state="loading" aria-busy="true" />
        )}
        <FooterPart onNavigate={onNavigate} />
      </main>
    </div>
  );
}
