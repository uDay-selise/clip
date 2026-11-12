// Ported by Studio from the agreed design .studio/designs/screens/products.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import { FooterPart } from "../../app/layout/FooterPart";
import "./ProductsScreen.css";

/** The situations the design shows: the screen as it usually is, then each one drawn. Show the one the real data or request is in. */
export type ProductsScreenSituation = "normal" | "empty";

export function ProductsScreen({ situation = "normal", onNavigate }: { situation?: ProductsScreenSituation; onNavigate?: (path: string) => void }) {
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
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
              <span>Donkey website</span>
              {" "}
            </a>
            <nav className="pr-links ds-only-wide" aria-label="Site pages">
              <a href="/" data-goto="home" onClick={goTo("/")}>Home</a>
              {" "}
              <a className="pr-on" href="#" aria-current="page">Products</a>
              {" "}
              <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>How it works</a>
              {" "}
              <a href="/about" data-goto="about" onClick={goTo("/about")}>About</a>
              {" "}
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
            <a href="/" className="ds-btn ds-btn-sm ds-only-wide" data-goto="home" onClick={goTo("/")}>Sign up</a>
            {" "}
            <a href="/editor/sign-in" className="ds-btn ds-btn-ghost ds-btn-sm ds-only-wide" data-goto="editor-sign-in" onClick={goTo("/editor/sign-in")}>Sign in</a>
            <details className="ds-menu ds-only-narrow">
              <summary className="ds-menu-button" aria-label="Open the menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </summary>
              <div className="ds-menu-list">
                <a href="/" data-goto="home" onClick={goTo("/")}>Home</a>
                <a href="#">Products</a>
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
        {situation === "empty" ? (
          <section data-state="empty">
            <div className="ds-page" style={{ paddingTop: "calc(48px * var(--space-scale, 1))", paddingBottom: "calc(64px * var(--space-scale, 1))" }}>
              <div className="ds-page-head pr-head" style={{ gridTemplateColumns: "1fr" }}>
                <div>
                  <span className="ds-eyebrow">The shop</span>
                  <h1 className="ds-h1 ds-display">Everything we sell, priced plainly.</h1>
                  <p className="pr-lead">Every price is the full price in pounds, nothing added at the counter.</p>
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
                <h2 className="ds-h3">Our products are on their way. Check back soon.</h2>
                <p className="ds-muted" style={{ marginTop: "calc(8px * var(--space-scale, 1))" }}>In the meantime, sign up and we will let you know when the first things are ready.</p>
                <a href="/" className="ds-btn" style={{ marginTop: "calc(24px * var(--space-scale, 1))" }} data-goto="home" onClick={goTo("/")}>Sign up</a>
              </div>
            </div>
          </section>
        ) : null}
        {situation !== "empty" ? (
          <div>
            <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
              <div className="ds-page-head pr-head">
                <div>
                  <span className="ds-eyebrow">The shop</span>
                  <h1 className="ds-h1 ds-display">Everything we sell, priced plainly.</h1>
                  <p className="pr-lead">Six things on the shelf right now. Every price is the full price in pounds, nothing added at the counter.</p>
                </div>
                <div className="pr-counts">
                  <div className="pr-count">
                    <b data-sample="">6</b>
                    <span>On sale</span>
                  </div>
                  <div className="pr-count">
                    <b data-sample="">£12.50</b>
                    <span>From</span>
                  </div>
                  <div className="pr-count">
                    <b data-sample="">3 to 5 days</b>
                    <span>Delivery</span>
                  </div>
                </div>
              </div>
            </div>
            <section className="ds-band pr-band">
              <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
                <div className="pr-band-head">
                  <span className="ds-label-caps">On sale now</span>
                  {" "}
                  <span className="pr-band-note">Prices in pounds, no extras</span>
                </div>
                <div className="pr-grid">
                  <article className="pr-card">
                    <div className="pr-photo">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="3" />
                        <path d="m3 16 5-4 4 3 3-2 6 4" />
                        <circle cx="9" cy="9" r="1.5" />
                      </svg>
                    </div>
                    <div className="pr-tagline">
                      <span className="ds-badge ds-badge-success">In stock</span>
                      <span className="ds-badge ds-badge-quiet" data-sample="Product#1.group">Oils</span>
                    </div>
                    <div className="pr-body">
                      <h2 className="pr-name" data-sample="Product#1.name">Calm Nights lavender oil</h2>
                      <p className="pr-desc" data-sample="Product#1.description">A small bottle of cold-pressed lavender oil for the end of the day. Ten drops in a warm bath, or on the pillow.</p>
                      <p className="pr-med">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <path d="M12 3v18M5 8h14M5 16h14" />
                        </svg>
                        <span data-sample="Product#1.medicineNote">For adults. Keep away from children and ask your doctor if you are pregnant.</span>
                      </p>
                      <div className="pr-foot">
                        <span className="pr-price" data-sample="Product#1.price">£12.50</span>
                        {" "}
                        <a href="/" className="ds-btn ds-btn-secondary ds-btn-sm" data-goto="home" onClick={goTo("/")}>Sign up</a>
                      </div>
                    </div>
                  </article>
                  <article className="pr-card">
                    <div className="pr-photo">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="3" />
                        <path d="m3 16 5-4 4 3 3-2 6 4" />
                        <circle cx="9" cy="9" r="1.5" />
                      </svg>
                    </div>
                    <div className="pr-tagline">
                      <span className="ds-badge ds-badge-success">In stock</span>
                      <span className="ds-badge ds-badge-quiet" data-sample="Product#2.group">Balms</span>
                    </div>
                    <div className="pr-body">
                      <h2 className="pr-name" data-sample="Product#2.name">Hand balm, unscented</h2>
                      <p className="pr-desc" data-sample="Product#2.description">Beeswax and shea, in a tin that fits a coat pocket. For gardeners and anyone who washes up a lot.</p>
                      <div className="pr-foot">
                        <span className="pr-price" data-sample="Product#2.price">£8.00</span>
                        {" "}
                        <a href="/" className="ds-btn ds-btn-secondary ds-btn-sm" data-goto="home" onClick={goTo("/")}>Sign up</a>
                      </div>
                    </div>
                  </article>
                  <article className="pr-card">
                    <div className="pr-photo">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="3" />
                        <path d="m3 16 5-4 4 3 3-2 6 4" />
                        <circle cx="9" cy="9" r="1.5" />
                      </svg>
                    </div>
                    <div className="pr-tagline">
                      <span className="ds-badge ds-badge-warning">Low stock</span>
                      <span className="ds-badge ds-badge-quiet" data-sample="Product#3.group">Teas</span>
                    </div>
                    <div className="pr-body">
                      <h2 className="pr-name" data-sample="Product#3.name">Nettle and mint tea, 20 bags</h2>
                      <p className="pr-desc" data-sample="Product#3.description">Grown on a small farm near Frome, dried slowly and packed in paper. Bright and grassy, good after a heavy meal.</p>
                      <p className="pr-med">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <path d="M12 3v18M5 8h14M5 16h14" />
                        </svg>
                        <span data-sample="Product#3.medicineNote">A food, not a medicine. Not for children under 2.</span>
                      </p>
                      <div className="pr-foot">
                        <span className="pr-price" data-sample="Product#3.price">£6.40</span>
                        {" "}
                        <a href="/" className="ds-btn ds-btn-secondary ds-btn-sm" data-goto="home" onClick={goTo("/")}>Sign up</a>
                      </div>
                    </div>
                  </article>
                  <article className="pr-card">
                    <div className="pr-photo">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="3" />
                        <path d="m3 16 5-4 4 3 3-2 6 4" />
                        <circle cx="9" cy="9" r="1.5" />
                      </svg>
                    </div>
                    <div className="pr-tagline">
                      <span className="ds-badge ds-badge-success">In stock</span>
                      <span className="ds-badge ds-badge-quiet" data-sample="Product#4.group">Grow your own</span>
                    </div>
                    <div className="pr-body">
                      <h2 className="pr-name" data-sample="Product#4.name">Wildflower seed tin</h2>
                      <p className="pr-desc" data-sample="Product#4.description">Twelve kinds of seed for a strip of lawn or a window box, with a small card on when to sow and what will come up.</p>
                      <div className="pr-foot">
                        <span className="pr-price" data-sample="Product#4.price">£4.50</span>
                        {" "}
                        <a href="/" className="ds-btn ds-btn-secondary ds-btn-sm" data-goto="home" onClick={goTo("/")}>Sign up</a>
                      </div>
                    </div>
                  </article>
                  <article className="pr-card">
                    <div className="pr-photo">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="3" />
                        <path d="m3 16 5-4 4 3 3-2 6 4" />
                        <circle cx="9" cy="9" r="1.5" />
                      </svg>
                    </div>
                    <div className="pr-tagline">
                      <span className="ds-badge ds-badge-success">In stock</span>
                      <span className="ds-badge ds-badge-quiet" data-sample="Product#5.group">Balms</span>
                    </div>
                    <div className="pr-body">
                      <h2 className="pr-name" data-sample="Product#5.name">Donkey lip salve</h2>
                      <p className="pr-desc" data-sample="Product#5.description">A little tin of balm with a hint of honey. Sold in singles and in a pack of three for a few pence less.</p>
                      <div className="pr-foot">
                        <span className="pr-price" data-sample="Product#5.price">£3.20</span>
                        {" "}
                        <a href="/" className="ds-btn ds-btn-secondary ds-btn-sm" data-goto="home" onClick={goTo("/")}>Sign up</a>
                      </div>
                    </div>
                  </article>
                  <article className="pr-card">
                    <div className="pr-photo">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="16" rx="3" />
                        <path d="m3 16 5-4 4 3 3-2 6 4" />
                        <circle cx="9" cy="9" r="1.5" />
                      </svg>
                    </div>
                    <div className="pr-tagline">
                      <span className="ds-badge ds-badge-quiet" data-sample="Product#6.group">Oils</span>
                    </div>
                    <div className="pr-body">
                      <h2 className="pr-name" data-sample="Product#6.name">Rosehip face oil, 30ml</h2>
                      <p className="pr-desc" data-sample="Product#6.description">Pressed rosehip with a drop of vitamin E, in a dark glass bottle with a dropper. Three drops in the evening is plenty.</p>
                      <p className="pr-med">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <path d="M12 3v18M5 8h14M5 16h14" />
                        </svg>
                        <span data-sample="Product#6.medicineNote">Patch test first if your skin is sensitive.</span>
                      </p>
                      <div className="pr-foot">
                        <span className="pr-price" data-sample="Product#6.price">£18.00</span>
                        {" "}
                        <a href="/" className="ds-btn ds-btn-secondary ds-btn-sm" data-goto="home" onClick={goTo("/")}>Sign up</a>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </section>
            <div className="ds-page">
              <section className="pr-close">
                <svg className="ds-deco pr-close-shape" viewBox="0 0 200 200" aria-hidden="true">
                  <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="100" cy="100" r="64" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div>
                  <span className="ds-eyebrow">Ready to buy</span>
                  <h2 className="ds-h2">Take your pick into the shop.</h2>
                  <p>Signing up takes a minute. Then you can put things in a basket and pay at the checkout.</p>
                </div>
                <div className="pr-close-btn">
                  <a href="/" className="ds-btn ds-btn-lg" data-goto="home" onClick={goTo("/")}>Sign up</a>
                  {" "}
                  <a href="/how-it-works" className="ds-btn ds-btn-ghost" data-goto="how-it-works" onClick={goTo("/how-it-works")}>How it works</a>
                </div>
              </section>
            </div>
          </div>
        ) : null}
        <FooterPart onNavigate={onNavigate} />
      </main>
    </div>
  );
}
