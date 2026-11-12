import type { MouseEvent } from "react";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { FooterPart } from "../../app/layout/FooterPart";
import { ThemeSwitch } from "../../app/layout/ThemeSwitch";
import { useMenuClose } from "../../app/layout/useMenuClose";
import { usePageWording } from "../content/pageWording";
import { useEnterShop } from "../shop-entry/useEnterShop";
import "./HowItWorksScreen.css";

function go(onNavigate?: (path: string) => void, path?: string) {
  return (event: MouseEvent) => {
    if (!onNavigate || !path) return;
    event.preventDefault();
    onNavigate(path);
  };
}

export function HowItWorksScreen({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const { t } = useT();
  useMenuClose();
  const { enter, failed, pending } = useEnterShop();
  const { data: wording } = usePageWording("how-it-works");
  const delivery = wording?.deliveryText?.trim() || t("how.deliveryEmpty");
  const returns = wording?.returnsText?.trim() || t("how.returnsEmpty");
  const goTo = (path: string) => go(onNavigate, path);

  return (
    <div className="studio-screen-how-it-works" style={{ display: "contents" }}>
      <main data-screen="how-it-works">
        <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
          <div className="hi-top">
            <a href="/" className="hi-brand" data-goto="home" onClick={goTo("/")}> <span className="hi-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="9" cy="7" r="3" /><circle cx="17" cy="8" r="2.4" /><path d="M3.5 20c0-3.6 2.6-6 5.9-6s5.9 2.4 5.9 6" /><path d="M17 14.4c2.2.3 3.6 2.1 3.6 4.6" /></svg></span> {t("app.name")} </a>
            <nav className="hi-links ds-only-wide" aria-label="Site pages">
              <a href="/" data-goto="home" onClick={goTo("/")}>{t("nav.home")}</a>
              {" "}
              <a href="/how-it-works" data-goto="how-it-works" aria-current="page" onClick={goTo("/how-it-works")}>{t("nav.howItWorks")}</a>
              {" "}
              <a href="/about" data-goto="about" onClick={goTo("/about")}>{t("nav.about")}</a>
              {" "}
              <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>{t("nav.contact")}</a>
              {" "}
              <a href="/products" data-goto="products" onClick={goTo("/products")}>{t("nav.products")}</a>
            </nav>
            <span className="ds-spacer" />
            <div className="hi-actions">
              <ThemeSwitch className="ds-only-wide" />
              <a href="#" className="ds-btn ds-btn-ghost ds-only-wide" onClick={(event) => { event.preventDefault(); onNavigate?.("/editor"); }}>{t("auth.signIn")}</a>
              {" "}
              <a href="#" className="ds-btn ds-btn-sm" onClick={(event) => { event.preventDefault(); void enter(); }} aria-busy={pending} aria-label={t("auth.signUp")}>{pending ? t("auth.opening") : t("auth.signUp")}</a>
              <details className="ds-menu ds-only-narrow">
                <summary className="ds-menu-button" aria-label="Open the menu">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </summary>
                <div className="ds-menu-list">
                  <a href="/" data-goto="home" onClick={goTo("/")}>{t("nav.home")}</a>
                  {" "}
                  <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>{t("nav.howItWorks")}</a>
                  {" "}
                  <a href="/about" data-goto="about" onClick={goTo("/about")}>{t("nav.about")}</a>
                  {" "}
                  <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>{t("nav.contact")}</a>
                  {" "}
                  <a href="/products" data-goto="products" onClick={goTo("/products")}>{t("nav.products")}</a>
                  {" "}
                  <a href="#" onClick={(event) => { event.preventDefault(); onNavigate?.("/editor"); }}>{t("auth.signIn")}</a>
                  <a href="#" onClick={(event) => { event.preventDefault(); void enter(); }}>{t("auth.signUp")}</a>
                  <div className="ds-theme-switch" role="group" aria-label="Colour mode">
                    <ThemeSwitch />
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
        <div className="ds-page hi-hero">
          <div className="hi-hero-grid">
            <div>
              <span className="ds-eyebrow">{t("how.eyebrow")}</span>
              <h1 className="ds-h1 hi-display">{t("how.heading")}</h1>
              <p className="hi-lead">{t("how.intro")}</p>
            </div>
            <div className="hi-hero-note">
              <b>{t("how.noteTitle")}</b>
              {failed ? <p role="alert" className="hi-note-row">{t("auth.openFailed")}</p> : null}
              <div className="hi-note-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M3 7h11v10H3z" />
                  <path d="M14 10h4l3 3v4h-7z" />
                  <circle cx="7" cy="18" r="1.6" />
                  <circle cx="17" cy="18" r="1.6" />
                </svg>
                {" "}
                <span>{t("how.noteDelivery")}</span>
              </div>
              <div className="hi-note-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z" />
                  <path d="M9 12h6" />
                </svg>
                {" "}
                <span>{t("how.noteContact")}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
          <ol className="hi-steps">
            <li className="hi-step">
              <span className="hi-step-num" aria-hidden="true">01</span>
              <h2 className="ds-h3">{t("how.step1Title")}</h2>
              <p>{t("how.step1Body")}</p>
            </li>
            <li className="hi-step">
              <span className="hi-step-num" aria-hidden="true">02</span>
              <h2 className="ds-h3">{t("how.step2Title")}</h2>
              <p>{t("how.step2Body")}</p>
            </li>
            <li className="hi-step">
              <span className="hi-step-num" aria-hidden="true">03</span>
              <h2 className="ds-h3">{t("how.step3Title")}</h2>
              <p>{t("how.step3Body")}</p>
            </li>
          </ol>
        </div>
        <div className="ds-page hi-info">
          <span className="ds-label-caps">{t("how.detailsLabel")}</span>
          <h2 className="ds-h2" style={{ marginTop: "10px", letterSpacing: "-0.03em", maxWidth: "20em" }}>{t("how.detailsHeading")}</h2>
          <div className="hi-info-grid">
            <section className="hi-panel" aria-labelledby="delivery-title">
              <div className="hi-panel-head">
                <span className="hi-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M3 7h11v10H3z" />
                    <path d="M14 10h4l3 3v4h-7z" />
                    <circle cx="7" cy="18" r="1.6" />
                    <circle cx="17" cy="18" r="1.6" />
                  </svg>
                </span>
                <h3 className="ds-h3" id="delivery-title">{t("how.deliveryTitle")}</h3>
              </div>
              <p className="hi-panel-body">{delivery}</p>
            </section>
            <section className="hi-panel" aria-labelledby="returns-title">
              <div className="hi-panel-head">
                <span className="hi-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M4 12a8 8 0 1 0 2.4-5.7" />
                    <path d="M4 4v4h4" />
                  </svg>
                </span>
                <h3 className="ds-h3" id="returns-title">{t("how.returnsTitle")}</h3>
              </div>
              <p className="hi-panel-body">{returns}</p>
            </section>
          </div>
        </div>
        <section className="ds-band-bold hi-cta-band">
          <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
            <div className="hi-cta">
              <div>
                <span className="ds-label-caps">{t("how.ctaLabel")}</span>
                <h2>{t("how.ctaHeading")}</h2>
                <p>{t("how.ctaBody")}</p>
              </div>
              <a href="#" className="ds-btn ds-btn-lg ds-btn-secondary" onClick={(event) => { event.preventDefault(); void enter(); }} aria-busy={pending}>{t("auth.signUp")}</a>
            </div>
          </div>
        </section>
        <FooterPart onNavigate={onNavigate} />
      </main>
    </div>
  );
}
