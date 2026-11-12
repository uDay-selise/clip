// Ported by Studio from the agreed design .studio/designs/screens/contact.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import { FooterPart } from "../../app/layout/FooterPart";
import "./ContactScreen.css";

/** The situations the design shows: the screen as it usually is, then each one drawn. Show the one the real data or request is in. */
export type ContactScreenSituation = "normal" | "empty";

export function ContactScreen({ situation = "normal", onNavigate }: { situation?: ContactScreenSituation; onNavigate?: (path: string) => void }) {
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="studio-screen-contact" style={{ display: "contents" }}>
      <main data-screen="contact">
        <header>
          <div className="ds-bar ct-top">
            <a href="/" className="ds-brand-link" data-goto="home" onClick={goTo("/")}>
              <span className="ds-brand-text">Donkey</span>
            </a>
            <nav className="ct-links ds-only-wide" aria-label="Pages">
              <a href="/" data-goto="home" onClick={goTo("/")}>Home</a>
              {" "}
              <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>How it works</a>
              {" "}
              <a href="/products" data-goto="products" onClick={goTo("/products")}>Products</a>
              {" "}
              <a className="ct-on" aria-current="page">Contact</a>
            </nav>
            <span className="ds-spacer" />
            <div className="ds-theme-switch ds-only-wide" role="group" aria-label="Colour mode">
              <button className="ds-active" aria-label="Light">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              </button>
              {" "}
              <button aria-label="Dark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
                </svg>
              </button>
              {" "}
              <button aria-label="Auto">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 4v16" />
                  <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
                </svg>
              </button>
            </div>
            <a href="/editor/sign-in" className="ds-btn ds-btn-sm" data-goto="editor-sign-in" onClick={goTo("/editor/sign-in")}>Sign in</a>
            <details className="ds-menu ds-only-narrow">
              <summary className="ds-menu-button" aria-label="Open the menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </summary>
              <div className="ds-menu-list">
                <a href="/" data-goto="home" onClick={goTo("/")}>Home</a>
                <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>How it works</a>
                <a href="/products" data-goto="products" onClick={goTo("/products")}>Products</a>
                <a>Contact</a>
                <div className="ds-theme-switch" role="group" aria-label="Colour mode">
                  <button className="ds-active" aria-label="Light">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                    </svg>
                  </button>
                  <button aria-label="Dark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
                    </svg>
                  </button>
                  <button aria-label="Auto">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 4v16" />
                      <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              </div>
            </details>
          </div>
        </header>
        {situation === "empty" ? (
          <section data-state="empty">
            <div className="ds-page ct-hero">
              <span className="ds-eyebrow">Contact</span>
              <h1 className="ct-title">Talk to Donkey. We answer.</h1>
              <p className="ct-lead">A question about a product, an order on its way, or sending something back?</p>
            </div>
            <div className="ds-page" style={{ paddingBottom: "calc(64px * var(--space-scale, 1))" }}>
              <div className="ds-empty">
                <div className="ds-empty-icon">
                  <svg className="ct-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </div>
                <p className="ds-text">Contact details are on their way. Check back soon.</p>
                <div className="ds-row" style={{ justifyContent: "center" }}>
                  <a href="/" className="ds-btn ds-btn-secondary" data-goto="home" onClick={goTo("/")}>Go to the home page</a>
                </div>
              </div>
            </div>
          </section>
        ) : null}
        {situation !== "empty" ? (
          <div>
            <div className="ds-page ct-hero">
              <span className="ds-eyebrow ct-kicker">Contact</span>
              <h1 className="ct-title">Talk to Donkey. We answer.</h1>
              <p className="ct-lead">A question about a product, an order on its way, or sending something back? Reach us by email or phone and a real person replies.</p>
            </div>
            <section className="ct-band">
              <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
                <div className="ct-panel">
                  <div className="ct-cards">
                    <a className="ct-card" href="#">
                      {" "}
                      <span className="ct-card-label">Email us</span>
                      {" "}
                      <span className="ct-card-value" data-sample="PageWording#contact.email">hello@donkey.shop</span>
                      {" "}
                      <span className="ct-card-note">Best for orders, returns and anything with a photo.</span>
                      {" "}
                      <span className="ct-card-go"> <svg className="ct-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg> Write to us </span>
                      {" "}
                    </a>
                    {" "}
                    <a className="ct-card" href="#">
                      {" "}
                      <span className="ct-card-label">Call us</span>
                      {" "}
                      <span className="ct-card-value" data-sample="PageWording#contact.phone">01632 960 412</span>
                      {" "}
                      <span className="ct-card-note">Monday to Friday, 9am to 5pm.</span>
                      {" "}
                      <span className="ct-card-go"> <svg className="ct-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" /></svg> Call us </span>
                      {" "}
                    </a>
                  </div>
                  <div className="ct-address">
                    <span className="ct-card-label">Find us</span>
                    <p data-sample="PageWording#contact.address">12 Larkfield Road, Nottingham NG7 4DQ</p>
                  </div>
                  <p className="ct-hint">Shoppers order through Donkey app. Use Sign in in the top bar to get in and start.</p>
                </div>
              </div>
            </section>
            <div className="ds-page ct-help">
              <div>
                <h2 className="ds-h2">Before you write</h2>
                <p>Most answers are already here. How buying works covers delivery times and what to do if something isn't right.</p>
                <a href="/how-it-works" className="ct-inline" data-goto="how-it-works" onClick={goTo("/how-it-works")}>Read How it works <svg className="ct-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg> </a>
              </div>
              <div>
                <h2 className="ds-h2">Something from the shop</h2>
                <p>Have your order in front of you when you call. We can find it faster with the name on it and the date it came.</p>
                <a href="/products" className="ct-inline" data-goto="products" onClick={goTo("/products")}>Browse Products <svg className="ct-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg> </a>
              </div>
            </div>
            <section className="ds-band ds-band-bold ct-band">
              <div className="ds-page ct-cta" style={{ paddingTop: "0", paddingBottom: "0" }}>
                <div>
                  <span className="ds-eyebrow ct-eyebrow-band">Ready when you are</span>
                  <h2 className="ds-h1">Have a look at the shop.</h2>
                  <p className="ct-cta-lead">Everything Donkey sells, with prices in pounds. No account needed to browse.</p>
                </div>
                <div className="ct-cta-actions">
                  <a href="/products" className="ds-btn ds-btn-lg" data-goto="products" onClick={goTo("/products")}>See the products</a>
                  {" "}
                  <a href="/how-it-works" className="ds-btn ds-btn-secondary ds-btn-lg" data-goto="how-it-works" onClick={goTo("/how-it-works")}>How buying works</a>
                </div>
              </div>
            </section>
          </div>
        ) : null}
        <FooterPart onNavigate={onNavigate} />
      </main>
    </div>
  );
}
