// Ported by Studio from the agreed design .studio/designs/screens/home.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import { FooterPart } from "../../app/layout/FooterPart";
import "./HomeScreen.css";

export function HomeScreen({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="studio-screen-home" style={{ display: "contents" }}>
      <main data-screen="home">
        <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
          <header className="dn-top">
            <a href="/" className="dn-brand" data-goto="home" onClick={goTo("/")}><span className="dn-mark" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M6 9c0-2.2 1.6-4 3.6-4h4.8C16.4 5 18 6.8 18 9v6c0 2.2-1.6 4-3.6 4H9.6C7.6 19 6 17.2 6 15Z" /><path d="M9.5 10.5v3M14.5 10.5v3" /></svg></span>Donkey website</a>
            <nav className="dn-links ds-only-wide">
              <a href="/" data-goto="home" onClick={goTo("/")}>Home</a>
              <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>How it works</a>
              <a href="/about" data-goto="about" onClick={goTo("/about")}>About</a>
              <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>Contact</a>
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
            <button className="ds-btn ds-btn-secondary ds-only-wide" data-goto="editor-sign-in" onClick={goTo("/editor/sign-in")}>Sign in</button>
            <details className="ds-menu ds-only-narrow">
              <summary className="ds-menu-button" aria-label="Open the menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </summary>
              <div className="ds-menu-list">
                <a href="/" data-goto="home" onClick={goTo("/")}>Home</a>
                <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>How it works</a>
                <a href="/about" data-goto="about" onClick={goTo("/about")}>About</a>
                <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>Contact</a>
                <a href="/editor/sign-in" data-goto="editor-sign-in" onClick={goTo("/editor/sign-in")}>Sign in</a>
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
          </header>
        </div>
        <div className="ds-page dn-hero">
          <div>
            <span className="ds-eyebrow">Donkey shop</span>
            <h1>Good things, <em>fair prices.</em></h1>
            <p className="dn-lead" data-sample="PageWording#home.intro">Donkey sells everyday goods chosen with care: homeware, pantry staples and small gifts. Browse what we have, see what it costs, and sign up to buy.</p>
            <div className="ds-row">
              <button className="ds-btn ds-btn-lg" data-goto="products" onClick={goTo("/products")}>Sign up</button>
              {" "}
              <button className="ds-btn ds-btn-lg ds-btn-secondary" data-goto="how-it-works" onClick={goTo("/how-it-works")}>How buying works</button>
            </div>
          </div>
          <div className="dn-hero-art">
            <div className="ds-img dn-art-img" data-sample="" />
            <div className="dn-price-card">
              <span className="ds-label-caps">From the shop</span>
              {" "}
              <b data-sample="">£12.50</b>
            </div>
          </div>
        </div>
        <section className="ds-band-bold dn-band">
          <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
            <h2 style={{ color: "inherit" }}>Pick what you like. Pay once. It arrives.</h2>
            <div className="dn-tiles">
              <article className="dn-tile">
                <span className="dn-num">01</span>
                <h3 className="ds-h3">Pick what you want</h3>
                <p>Every product shows its photo, name and price up front, so nothing is a surprise.</p>
              </article>
              <article className="dn-tile">
                <span className="dn-num">02</span>
                <h3 className="ds-h3">Pay at the checkout</h3>
                <p>One payment, in pounds, with no hidden charges added at the end.</p>
              </article>
              <article className="dn-tile dn-tile-accent">
                <span className="dn-num">03</span>
                <h3 className="ds-h3">It comes to your door</h3>
                <p style={{ color: "hsl(var(--accent-foreground))" }}>Orders are packed by hand and posted with care. Delivery details live on the How it works page.</p>
              </article>
            </div>
          </div>
        </section>
        <div className="ds-page">
          <section className="dn-split">
            <div>
              <span className="ds-label-caps">What you can do here</span>
              <h2>Look around freely. Sign up when you're ready to buy.</h2>
              <ul className="dn-list">
                <li>
                  <span className="dn-dot" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="m5 12 5 5 9-9" />
                    </svg>
                  </span>
                  <span>Browse every product and its price without signing in.</span>
                </li>
                <li>
                  <span className="dn-dot" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="m5 12 5 5 9-9" />
                    </svg>
                  </span>
                  <span>Read how delivery and returns work before you decide.</span>
                </li>
                <li>
                  <span className="dn-dot" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="m5 12 5 5 9-9" />
                    </svg>
                  </span>
                  <span>Use Sign up to head into the shop and place your order.</span>
                </li>
              </ul>
              <div className="ds-row" style={{ marginTop: "calc(28px * var(--space-scale, 1))" }}>
                <button className="ds-btn" data-goto="products" onClick={goTo("/products")}>Sign up</button>
                {" "}
                <button className="ds-btn ds-btn-ghost" data-goto="contact" onClick={goTo("/contact")}>Questions? Contact us</button>
              </div>
            </div>
            <div className="dn-preview">
              <span className="ds-label-caps">In the shop now</span>
              <div className="dn-preview-row">
                <div className="ds-img dn-thumb" data-sample="" />
                <div className="dn-row-text">
                  <b data-sample="Product#1.name">Stoneware mug</b>
                  <span className="sm" data-sample="Product#1.description">Glazed by hand, holds a large cup</span>
                </div>
                <span className="dn-price" data-sample="Product#1.pricePence">£12.50</span>
              </div>
              <div className="dn-preview-row">
                <div className="ds-img dn-thumb" data-sample="" />
                <div className="dn-row-text">
                  <b data-sample="Product#2.name">Sourdough starter kit</b>
                  <span className="sm" data-sample="Product#2.description">Jar, flour and a folded recipe card</span>
                </div>
                <span className="dn-price" data-sample="Product#2.pricePence">£18.00</span>
              </div>
              <div className="dn-preview-row">
                <div className="ds-img dn-thumb" data-sample="" />
                <div className="dn-row-text">
                  <b data-sample="Product#3.name">Linen tea towel</b>
                  <span className="sm" data-sample="Product#3.description">Washed flax, sage stripe</span>
                </div>
                <span className="dn-price" data-sample="Product#3.pricePence">£9.75</span>
              </div>
            </div>
          </section>
        </div>
        <div className="ds-page">
          <section className="dn-close">
            <h2>Ready to see it all?</h2>
            <button className="ds-btn ds-btn-lg" data-goto="products" onClick={goTo("/products")}>Sign up</button>
          </section>
        </div>
        <FooterPart onNavigate={onNavigate} />
      </main>
    </div>
  );
}
