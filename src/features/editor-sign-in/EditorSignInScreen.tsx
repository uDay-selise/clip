// Ported by Studio from the agreed design .studio/designs/screens/editor-sign-in.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import { FooterPart } from "../../app/layout/FooterPart";
import "./EditorSignInScreen.css";

/** The situations the design shows: the screen as it usually is, then each one drawn. Show the one the real data or request is in. */
export type EditorSignInScreenSituation = "normal" | "not-allowed";

export function EditorSignInScreen({ situation = "normal", onNavigate }: { situation?: EditorSignInScreenSituation; onNavigate?: (path: string) => void }) {
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="studio-screen-editor-sign-in" style={{ display: "contents" }}>
      <main data-screen="editor-sign-in" className="esi-root">
        {situation === "not-allowed" ? (
          <section data-state="not-allowed">
            <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "calc(48px * var(--space-scale, 1))" }}>
              <div className="esi-top">
                <a href="/" className="esi-brand" data-goto="home" onClick={goTo("/")}> <span className="esi-mark" aria-hidden="true">{" "}<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M5 9h14M5 9v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9M5 9l2-4M19 9l-2-4M9 13h6" /></svg>{" "}</span> Donkey website </a>
                {" "}
                <span className="ds-spacer" />
                <div className="esi-switches">
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
                  <a href="/" className="ds-btn ds-btn-ghost ds-btn-sm" data-goto="home" onClick={goTo("/")}>Back to the shop</a>
                </div>
              </div>
              <div className="ds-page-narrow" style={{ paddingTop: "calc(64px * var(--space-scale, 1))", paddingBottom: "calc(64px * var(--space-scale, 1))" }}>
                <div className="ds-empty">
                  <div className="ds-empty-icon">
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <rect x="4" y="10" width="16" height="10" rx="2" />
                      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                    </svg>
                  </div>
                  <h2 className="ds-h2" style={{ marginTop: "calc(16px * var(--space-scale, 1))" }}>Editors only.</h2>
                  <p className="ds-muted" style={{ maxWidth: "32em", margin: "calc(8px * var(--space-scale, 1)) auto 0" }}>This area is for people invited to look after the shop. If you think you should be here, ask the shop owner to send you an invite.</p>
                  <div className="ds-row" style={{ justifyContent: "center", marginTop: "calc(24px * var(--space-scale, 1))" }}>
                    <a href="/" className="ds-btn" data-goto="home" onClick={goTo("/")}>Back to the shop</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}
        {situation !== "not-allowed" ? (
          <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "calc(48px * var(--space-scale, 1))" }}>
            <div className="esi-top">
              <a href="/" className="esi-brand" data-goto="home" onClick={goTo("/")}> <span className="esi-mark" aria-hidden="true">{" "}<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M5 9h14M5 9v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9M5 9l2-4M19 9l-2-4M9 13h6" /></svg>{" "}</span> Donkey website </a>
              {" "}
              <span className="ds-spacer" />
              <div className="esi-switches">
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
                <a href="/" className="ds-btn ds-btn-ghost ds-btn-sm" data-goto="home" onClick={goTo("/")}>Back to the shop</a>
              </div>
            </div>
            <section className="esi-hero">
              <span className="ds-deco esi-ring" aria-hidden="true" />
              {" "}
              <span className="ds-deco esi-ring-2" aria-hidden="true" />
              {" "}
              <span className="ds-deco esi-dot" aria-hidden="true" />
              <div className="esi-hero-inner">
                <span className="esi-eyebrow" data-sample="editorSignIn.pageKicker">Editors' area</span>
                <h1 data-sample="home.heading">Keep the shop looking sharp.</h1>
                <p data-sample="editorSignIn.intro">This is where the Donkey team updates the words on the site, the delivery and returns details, and every product with its price and photo. Shoppers never see this page.</p>
                <div className="esi-hero-actions">
                  <a href="/editor" className="ds-btn ds-btn-lg" data-goto="editor" onClick={goTo("/editor")}>Sign in</a>
                  {" "}
                  <span className="esi-help">For invited editors only.</span>
                </div>
              </div>
            </section>
            <div className="esi-cards">
              <div className="esi-card">
                <span className="ds-label-caps">What you can change</span>
                <h3>Every page's wording</h3>
                <p>The headline and intro on Home, How it works and Contact, kept warm and plain.</p>
              </div>
              <div className="esi-card">
                <span className="ds-label-caps">Products</span>
                <h3>Prices and photos</h3>
                <p className="ds-num"><span data-sample="">14</span> products on the site, <span data-sample="">9</span> of them visible to shoppers.</p>
              </div>
              <div className="esi-card">
                <span className="ds-label-caps">Delivery and returns</span>
                <h3>The details shoppers read first</h3>
                <p>One delivery text and one returns text, shown as you write them.</p>
              </div>
            </div>
            <div className="esi-footrow">
              <span data-sample="editorSignIn.help">Lost your invite email, or need a new one? Ask the shop owner to send it again.</span>
              {" "}
              <span className="ds-spacer" />
              {" "}
              <a href="/" data-goto="home" onClick={goTo("/")}>Home</a>
              {" "}
              <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>How it works</a>
              {" "}
              <a href="/products" data-goto="products" onClick={goTo("/products")}>Products</a>
              {" "}
              <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>Contact</a>
            </div>
          </div>
        ) : null}
        <FooterPart onNavigate={onNavigate} />
      </main>
    </div>
  );
}
