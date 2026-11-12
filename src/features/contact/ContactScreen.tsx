import type { MouseEvent } from "react";
import { ThemeSwitch } from "../../app/layout/ThemeSwitch";
import { useMenuClose } from "../../app/layout/useMenuClose";
import { useEnterShop } from "../shop-entry/useEnterShop";
import { FooterPart } from "../../app/layout/FooterPart";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { usePageWording } from "../content/pageWording";
import "./ContactScreen.css";

/** The situations the design shows: the screen as it usually is, then each one drawn. Show the one the real data or request is in. */
export type ContactScreenSituation = "normal" | "empty";

export function ContactScreen({ situation, onNavigate }: { situation?: ContactScreenSituation; onNavigate?: (path: string) => void }) {
  const { t } = useT();
  useMenuClose();
  const { enter, pending } = useEnterShop();
  const { data: contact } = usePageWording("contact");
  const email = contact?.email?.trim() ?? "";
  const phone = contact?.phone?.trim() ?? "";
  const address = contact?.address?.trim() ?? "";
  const bothBlank = !email && !phone;
  const showEmpty = situation === "empty" || bothBlank;

  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  const signIn = (event: MouseEvent) => {
    event.preventDefault();
    void enter();
  };

  return (
    <div className="studio-screen-contact" style={{ display: "contents" }}>
      <main data-screen="contact">
        <header>
          <div className="ds-bar ct-top">
            <a href="/" className="ds-brand-link" data-goto="home" onClick={goTo("/")}>
              <span className="ds-brand-text">{t("app.name")}</span>
            </a>
            <nav className="ct-links ds-only-wide" aria-label="Pages">
              <a href="/" data-goto="home" onClick={goTo("/")}>{t("nav.home")}</a>
              {" "}
              <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>{t("nav.howItWorks")}</a>
              {" "}
              <a href="/products" data-goto="products" onClick={goTo("/products")}>{t("nav.products")}</a>
              {" "}
              <a className="ct-on" aria-current="page">{t("nav.contact")}</a>
            </nav>
            <span className="ds-spacer" />
            <ThemeSwitch className="ds-only-wide" />
            <a href="#" className="ds-btn ds-btn-sm" onClick={signIn} aria-busy={pending}>{pending ? t("auth.opening") : t("auth.signUp")}</a>
            <details className="ds-menu ds-only-narrow">
              <summary className="ds-menu-button" aria-label="Open the menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </summary>
              <div className="ds-menu-list">
                <a href="/" data-goto="home" onClick={goTo("/")}>{t("nav.home")}</a>
                <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>{t("nav.howItWorks")}</a>
                <a href="/products" data-goto="products" onClick={goTo("/products")}>{t("nav.products")}</a>
                <a aria-current="page">{t("nav.contact")}</a>
                <a href="#" onClick={signIn}>{t("auth.signIn")}</a>
                <a href="#" onClick={signIn}>{t("auth.signUp")}</a>
                <ThemeSwitch />
              </div>
            </details>
          </div>
        </header>
        {showEmpty ? (
          <section data-state="empty">
            <div className="ds-page ct-hero">
              <span className="ds-eyebrow">{t("contact.eyebrow")}</span>
              <h1 className="ct-title">{t("contact.title")}</h1>
              <p className="ct-lead">{t("contact.emptyLead")}</p>
            </div>
            <div className="ds-page" style={{ paddingBottom: "calc(64px * var(--space-scale, 1))" }}>
              <div className="ds-empty">
                <div className="ds-empty-icon">
                  <svg className="ct-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </div>
                <p className="ds-text">{t("contact.empty")}</p>
                <div className="ds-row" style={{ justifyContent: "center" }}>
                  <a href="/" className="ds-btn ds-btn-secondary" data-goto="home" onClick={goTo("/")}>{t("contact.backHome")}</a>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div>
            <div className="ds-page ct-hero">
              <span className="ds-eyebrow ct-kicker">{t("contact.eyebrow")}</span>
              <h1 className="ct-title">{t("contact.title")}</h1>
              <p className="ct-lead">{t("contact.lead")}</p>
            </div>
            <section className="ct-band">
              <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
                <div className="ct-panel">
                  <div className="ct-cards">
                    {email ? (
                      <a className="ct-card" href={`mailto:${email}`}>
                        <span className="ct-card-label">{t("contact.emailLabel")}</span>
                        <span className="ct-card-value">{email}</span>
                        <span className="ct-card-note">{t("contact.emailNote")}</span>
                        <span className="ct-card-go">
                          <svg className="ct-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                          {" "}{t("contact.emailGo")}
                        </span>
                      </a>
                    ) : null}
                    {phone ? (
                      <a className="ct-card" href={`tel:${phone.replace(/[^+0-9]/g, "")}`}>
                        <span className="ct-card-label">{t("contact.phoneLabel")}</span>
                        <span className="ct-card-value">{phone}</span>
                        <span className="ct-card-note">{t("contact.phoneNote")}</span>
                        <span className="ct-card-go">
                          <svg className="ct-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" /></svg>
                          {" "}{t("contact.phoneGo")}
                        </span>
                      </a>
                    ) : null}
                  </div>
                  {address ? (
                    <div className="ct-address">
                      <span className="ct-card-label">{t("contact.addressLabel")}</span>
                      <p>{address}</p>
                    </div>
                  ) : null}
                  <p className="ct-hint">{t("contact.hint")}</p>
                </div>
              </div>
            </section>
            <div className="ds-page ct-help">
              <div>
                <h2 className="ds-h2">{t("contact.beforeTitle")}</h2>
                <p>{t("contact.beforeBody")}</p>
                <a href="/how-it-works" className="ct-inline" data-goto="how-it-works" onClick={goTo("/how-it-works")}>{t("contact.beforeLink")} <svg className="ct-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
              </div>
              <div>
                <h2 className="ds-h2">{t("contact.orderTitle")}</h2>
                <p>{t("contact.orderBody")}</p>
                <a href="/products" className="ct-inline" data-goto="products" onClick={goTo("/products")}>{t("contact.orderLink")} <svg className="ct-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
              </div>
            </div>
            <section className="ds-band ds-band-bold ct-band">
              <div className="ds-page ct-cta" style={{ paddingTop: "0", paddingBottom: "0" }}>
                <div>
                  <span className="ds-eyebrow ct-eyebrow-band">{t("contact.ctaLabel")}</span>
                  <h2 className="ds-h1">{t("contact.ctaHeading")}</h2>
                  <p className="ct-cta-lead">{t("contact.ctaBody")}</p>
                </div>
                <div className="ct-cta-actions">
                  <a href="/products" className="ds-btn ds-btn-lg" data-goto="products" onClick={goTo("/products")}>{t("contact.ctaProducts")}</a>
                  {" "}
                  <a href="/how-it-works" className="ds-btn ds-btn-secondary ds-btn-lg" data-goto="how-it-works" onClick={goTo("/how-it-works")}>{t("home.howBuyingWorks")}</a>
                </div>
              </div>
            </section>
          </div>
        )}
        <FooterPart onNavigate={onNavigate} />
      </main>
    </div>
  );
}
