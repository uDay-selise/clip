import type { MouseEvent } from "react";
import { FooterPart } from "../../app/layout/FooterPart";
import { ThemeSwitch } from "../../app/layout/ThemeSwitch";
import { useMenuClose } from "../../app/layout/useMenuClose";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { usePageWording } from "../content/pageWording";
import { useEnterShop } from "../shop-entry/useEnterShop";
import "./HomeScreen.css";

const PREVIEW = [
  { name: "home.preview1Name", body: "home.preview1Body", price: "home.preview1Price" },
  { name: "home.preview2Name", body: "home.preview2Body", price: "home.preview2Price" },
  { name: "home.preview3Name", body: "home.preview3Body", price: "home.preview3Price" }
] as const;

function PreviewRow({ row }: { row: (typeof PREVIEW)[number] }) {
  const { t } = useT();
  return (
    <div className="dn-preview-row">
      <div className="ds-img dn-thumb" aria-hidden="true" />
      <div className="dn-row-text">
        <b>{t(row.name)}</b>
        <span className="sm">{t(row.body)}</span>
      </div>
      <span className="dn-price">{t(row.price)}</span>
    </div>
  );
}

export function HomeScreen({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const { t } = useT();
  useMenuClose();
  const { enter, failed, pending } = useEnterShop();
  const { data: wording } = usePageWording("home");
  const intro = wording?.intro?.trim() || t("home.intro");

  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  const signUp = (event: MouseEvent) => {
    event.preventDefault();
    void enter();
  };
  const signIn = (event: MouseEvent) => {
    event.preventDefault();
    onNavigate?.("/editor");
  };
  const signUpLabel = pending ? t("auth.opening") : t("auth.signUp");

  return (
    <div className="studio-screen-home" style={{ display: "contents" }}>
      <main data-screen="home">
        <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
          <header className="dn-top">
            <a href="/" className="dn-brand" data-goto="home" onClick={goTo("/")}><span className="dn-mark" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M6 9c0-2.2 1.6-4 3.6-4h4.8C16.4 5 18 6.8 18 9v6c0 2.2-1.6 4-3.6 4H9.6C7.6 19 6 17.2 6 15Z" /><path d="M9.5 10.5v3M14.5 10.5v3" /></svg></span>{t("app.name")}</a>
            <nav className="dn-links ds-only-wide">
              <a href="/" data-goto="home" aria-current="page" onClick={goTo("/")}>{t("nav.home")}</a>
              <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>{t("nav.howItWorks")}</a>
              <a href="/about" data-goto="about" onClick={goTo("/about")}>{t("nav.about")}</a>
              <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>{t("nav.contact")}</a>
            </nav>
            <span className="ds-spacer" />
            <ThemeSwitch className="ds-only-wide" />
            <button className="ds-btn ds-btn-secondary ds-only-wide" onClick={signIn}>{t("auth.signIn")}</button>
            <details className="ds-menu ds-only-narrow">
              <summary className="ds-menu-button" aria-label="Open the menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </summary>
              <div className="ds-menu-list">
                <a href="/" data-goto="home" onClick={goTo("/")}>{t("nav.home")}</a>
                <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>{t("nav.howItWorks")}</a>
                <a href="/about" data-goto="about" onClick={goTo("/about")}>{t("nav.about")}</a>
                <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>{t("nav.contact")}</a>
                <a href="#" onClick={signIn}>{t("auth.signIn")}</a>
                <ThemeSwitch />
              </div>
            </details>
          </header>
        </div>
        <div className="ds-page dn-hero">
          <div>
            <span className="ds-eyebrow">{t("home.eyebrow")}</span>
            <h1>{t("home.headingLead")} <em>{t("home.headingAccent")}</em></h1>
            <p className="dn-lead">{intro}</p>
            <div className="ds-row">
              <button className="ds-btn ds-btn-lg" onClick={signUp} aria-busy={pending}>{signUpLabel}</button>
              {" "}
              <button className="ds-btn ds-btn-lg ds-btn-secondary" data-goto="how-it-works" onClick={goTo("/how-it-works")}>{t("home.howBuyingWorks")}</button>
            </div>
            {failed ? <p role="alert" className="ds-muted">{t("auth.openFailed")}</p> : null}
          </div>
          <div className="dn-hero-art">
            <div className="ds-img dn-art-img" aria-hidden="true" />
            <div className="dn-price-card">
              <span className="ds-label-caps">{t("home.fromShop")}</span>
              {" "}
              <b>{t("home.priceExample")}</b>
            </div>
          </div>
        </div>
        <section className="ds-band-bold dn-band">
          <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
            <h2 style={{ color: "inherit" }}>{t("home.bandHeading")}</h2>
            <div className="dn-tiles">
              <article className="dn-tile">
                <span className="dn-num">01</span>
                <h3 className="ds-h3">{t("home.tile1Title")}</h3>
                <p>{t("home.tile1Body")}</p>
              </article>
              <article className="dn-tile">
                <span className="dn-num">02</span>
                <h3 className="ds-h3">{t("home.tile2Title")}</h3>
                <p>{t("home.tile2Body")}</p>
              </article>
              <article className="dn-tile dn-tile-accent">
                <span className="dn-num">03</span>
                <h3 className="ds-h3">{t("home.tile3Title")}</h3>
                <p style={{ color: "hsl(var(--accent-foreground))" }}>{t("home.tile3Body")}</p>
              </article>
            </div>
          </div>
        </section>
        <div className="ds-page">
          <section className="dn-split">
            <div>
              <span className="ds-label-caps">{t("home.whatYouCanDo")}</span>
              <h2>{t("home.splitHeading")}</h2>
              <ul className="dn-list">
                <li>
                  <span className="dn-dot" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="m5 12 5 5 9-9" />
                    </svg>
                  </span>
                  <span>{t("home.list1")}</span>
                </li>
                <li>
                  <span className="dn-dot" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="m5 12 5 5 9-9" />
                    </svg>
                  </span>
                  <span>{t("home.list2")}</span>
                </li>
                <li>
                  <span className="dn-dot" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="m5 12 5 5 9-9" />
                    </svg>
                  </span>
                  <span>{t("home.list3")}</span>
                </li>
              </ul>
              <div className="ds-row" style={{ marginTop: "calc(28px * var(--space-scale, 1))" }}>
                <button className="ds-btn" onClick={signUp} aria-busy={pending}>{signUpLabel}</button>
                {" "}
                <button className="ds-btn ds-btn-ghost" data-goto="contact" onClick={goTo("/contact")}>{t("home.contactLink")}</button>
              </div>
            </div>
            <div className="dn-preview">
              <span className="ds-label-caps">{t("home.inShopNow")}</span>
              {PREVIEW.map((row) => (
                <PreviewRow key={row.name} row={row} />
              ))}
            </div>
          </section>
        </div>
        <div className="ds-page">
          <section className="dn-close">
            <h2>{t("home.closeHeading")}</h2>
            <button className="ds-btn ds-btn-lg" onClick={signUp} aria-busy={pending}>{signUpLabel}</button>
          </section>
        </div>
        <FooterPart onNavigate={onNavigate} />
      </main>
    </div>
  );
}
