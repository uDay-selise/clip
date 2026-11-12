// Ported by Studio from the agreed design .studio/designs/screens/how-it-works.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import { FooterPart } from "../../app/layout/FooterPart";
import "./HowItWorksScreen.css";

export function HowItWorksScreen({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="studio-screen-how-it-works" style={{ display: "contents" }}>
      <main data-screen="how-it-works">
        <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
          <div className="hi-top">
            <a href="/" className="hi-brand" data-goto="home" onClick={goTo("/")}> <span className="hi-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="9" cy="7" r="3" /><circle cx="17" cy="8" r="2.4" /><path d="M3.5 20c0-3.6 2.6-6 5.9-6s5.9 2.4 5.9 6" /><path d="M17 14.4c2.2.3 3.6 2.1 3.6 4.6" /></svg></span> Donkey website </a>
            <nav className="hi-links ds-only-wide" aria-label="Site pages">
              <a href="/" data-goto="home" onClick={goTo("/")}>Home</a>
              {" "}
              <a href="/how-it-works" data-goto="how-it-works" aria-current="page" onClick={goTo("/how-it-works")}>How it works</a>
              {" "}
              <a href="/about" data-goto="about" onClick={goTo("/about")}>About</a>
              {" "}
              <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>Contact</a>
              {" "}
              <a href="/products" data-goto="products" onClick={goTo("/products")}>Products</a>
            </nav>
            <span className="ds-spacer" />
            <div className="hi-actions">
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
              <a href="/editor/sign-in" className="ds-btn ds-btn-ghost ds-only-wide" data-goto="editor-sign-in" onClick={goTo("/editor/sign-in")}>Sign in</a>
              {" "}
              <a href="/editor/sign-in" className="ds-btn ds-btn-sm" data-goto="editor-sign-in" onClick={goTo("/editor/sign-in")}>Sign up</a>
              <details className="ds-menu ds-only-narrow">
                <summary className="ds-menu-button" aria-label="Open the menu">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                </summary>
                <div className="ds-menu-list">
                  <a href="/" data-goto="home" onClick={goTo("/")}>Home</a>
                  {" "}
                  <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>How it works</a>
                  {" "}
                  <a href="/about" data-goto="about" onClick={goTo("/about")}>About</a>
                  {" "}
                  <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>Contact</a>
                  {" "}
                  <a href="/products" data-goto="products" onClick={goTo("/products")}>Products</a>
                  {" "}
                  <a href="/editor/sign-in" data-goto="editor-sign-in" onClick={goTo("/editor/sign-in")}>Sign in</a>
                  <div className="ds-theme-switch" role="group" aria-label="Colour mode">
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
                </div>
              </details>
            </div>
          </div>
        </div>
        <div className="ds-page hi-hero">
          <div className="hi-hero-grid">
            <div>
              <span className="ds-eyebrow" data-sample="PageWording#how-it-works.">How it works</span>
              <h1 className="ds-h1 hi-display" data-sample="PageWording#how-it-works.heading">From the shop to your door, in three steps.</h1>
              <p className="hi-lead" data-sample="PageWording#how-it-works.intro">Pick what you want, pay at the checkout, and we'll get it to you. Here's what happens along the way.</p>
            </div>
            <div className="hi-hero-note">
              <b>Delivery and returns, in plain words.</b>
              <div className="hi-note-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M3 7h11v10H3z" />
                  <path d="M14 10h4l3 3v4h-7z" />
                  <circle cx="7" cy="18" r="1.6" />
                  <circle cx="17" cy="18" r="1.6" />
                </svg>
                {" "}
                <span>Everything you need to know is below.</span>
              </div>
              <div className="hi-note-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z" />
                  <path d="M9 12h6" />
                </svg>
                {" "}
                <span>Questions? Contact us any time.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
          <ol className="hi-steps">
            <li className="hi-step">
              <span className="hi-step-num" aria-hidden="true">01</span>
              <h2 className="ds-h3">Pick what you want</h2>
              <p>Browse the products page and choose the things you'd like. Prices are in pounds and shown plainly.</p>
            </li>
            <li className="hi-step">
              <span className="hi-step-num" aria-hidden="true">02</span>
              <h2 className="ds-h3">Pay at the checkout</h2>
              <p>Sign up to open the shop, add your items to the basket, and pay once at the end.</p>
            </li>
            <li className="hi-step">
              <span className="hi-step-num" aria-hidden="true">03</span>
              <h2 className="ds-h3">Get it delivered</h2>
              <p>We pack your order and send it out. The delivery section below tells you how long it takes.</p>
            </li>
          </ol>
        </div>
        <div className="ds-page hi-info">
          <span className="ds-label-caps">The details</span>
          <h2 className="ds-h2" style={{ marginTop: "10px", letterSpacing: "-0.03em", maxWidth: "20em" }}>Delivery and returns, kept up to date by our team.</h2>
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
                <h3 className="ds-h3" id="delivery-title">Delivery</h3>
              </div>
              <p className="hi-panel-body" data-sample="PageWording#how-it-works.deliveryText">Orders arrive in 3 to 5 days. We post everything with a tracked service, Monday to Friday, and you'll get a note when your parcel is on its way. Postage is added at the checkout.</p>
            </section>
            <section className="hi-panel" aria-labelledby="returns-title">
              <div className="hi-panel-head">
                <span className="hi-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M4 12a8 8 0 1 0 2.4-5.7" />
                    <path d="M4 4v4h4" />
                  </svg>
                </span>
                <h3 className="ds-h3" id="returns-title">Returns</h3>
              </div>
              <p className="hi-panel-body" data-sample="PageWording#how-it-works.returnsText">Changed your mind? Send anything back within 30 days of it arriving, unused and in its original packaging. Email us with your order number and we'll sort out a refund.</p>
            </section>
          </div>
        </div>
        <section className="ds-band-bold hi-cta-band">
          <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
            <div className="hi-cta">
              <div>
                <span className="ds-label-caps">Ready when you are</span>
                <h2>Browse the products, then head into the shop.</h2>
                <p>Sign up to open the Donkey shop and place your first order. It only takes a moment.</p>
              </div>
              <a href="/editor/sign-in" className="ds-btn ds-btn-lg ds-btn-secondary" data-goto="editor-sign-in" onClick={goTo("/editor/sign-in")}>Sign up</a>
            </div>
          </div>
        </section>
        <FooterPart onNavigate={onNavigate} />
      </main>
    </div>
  );
}
