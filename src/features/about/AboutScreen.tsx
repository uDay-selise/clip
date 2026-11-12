// Ported by Studio from the agreed design .studio/designs/screens/about.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import { FooterPart } from "../../app/layout/FooterPart";
import "./AboutScreen.css";

export function AboutScreen({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="studio-screen-about" style={{ display: "contents" }}>
      <main data-screen="about">
        <div className="ds-page ab-corner">
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
        <section className="ds-band-bold ab-band ab-band-hero">
          <div className="ds-deco ab-hero-rings" aria-hidden="true">
            <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="100" cy="100" r="90" />
              <circle cx="100" cy="100" r="62" />
              <circle cx="100" cy="100" r="34" />
            </svg>
          </div>
          <div className="ds-page ab-hero">
            <div>
              <span className="ds-eyebrow" data-sample="">About Donkey</span>
              <h1 data-sample="PageWording.About.heading">We sell the things that make a house feel lived in.</h1>
              <p className="ab-hero-lead" data-sample="PageWording.About.intro">A small shop for kitchens, doorsteps and quiet corners. Every price is in pounds, and every item is picked by hand.</p>
              <div className="ab-hero-links">
                <a href="/editor/sign-in" className="ds-btn ds-btn-lg" data-goto="editor-sign-in" onClick={goTo("/editor/sign-in")}>Sign up</a>
                {" "}
                <a href="/products" className="ab-link" data-goto="products" onClick={goTo("/products")}>See our products <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg> </a>
              </div>
            </div>
            <div className="ab-frame">
              <div className="ds-img" data-sample="" aria-label="A photo of the Donkey shop" />
              <div className="ab-tag">
                <span className="ab-dot" aria-hidden="true" />
                <span data-sample="">Open since 2016, on Mill Lane</span>
              </div>
            </div>
          </div>
        </section>
        <div className="ds-page ab-page">
          <section className="ab-story">
            <div>
              <span className="ds-eyebrow">The short story</span>
              <h2 className="ds-h1">Made to last, sold at an honest price.</h2>
              <p data-sample="PageWording.About.intro">We started Donkey with one rule: only sell things we would keep in our own homes. That means everyday pieces that hold up, from people we know by name.</p>
              <p className="ab-muted-line" data-sample="">We look for small makers who care about how a thing wears in, not how fast it sells. When something runs out, we say so; we would rather be honest than busy.</p>
              <p className="ab-muted-line" data-sample="">Everything ships from our shop on Mill Lane, packed by the same people who chose it.</p>
              <a href="/how-it-works" className="ab-link" data-goto="how-it-works" onClick={goTo("/how-it-works")}>How buying from Donkey works <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg> </a>
            </div>
            <div className="ab-facts" data-sample="">
              <div className="ab-fact">
                <b>2016</b>
                <span>Year we opened the doors</span>
              </div>
              <div className="ab-fact">
                <b>40+</b>
                <span>Small makers we buy from</span>
              </div>
              <div className="ab-fact">
                <b>£12.50</b>
                <span>Where most of our prices start</span>
              </div>
              <div className="ab-fact">
                <b>3 to 5 days</b>
                <span>From our shop to your door</span>
              </div>
            </div>
          </section>
        </div>
        <section className="ab-band ab-band-products">
          <div className="ds-page">
            <span className="ds-eyebrow">What we sell</span>
            <h2 className="ds-h1" style={{ maxWidth: "20ch" }}>A few things you will find on the shelf.</h2>
            <div className="ab-shelf">
              <article className="ab-item" data-sample="Product#1">
                <div className="ab-item-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M6 8h12l-1.5 11h-9L6 8Z" />
                    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                  </svg>
                </div>
                <h3 data-sample="Product#1.name">Stoneware mug</h3>
                <p data-sample="Product#1.description">Thrown by hand in a soft oatmeal glaze. Holds a generous cup of tea.</p>
                <span className="ab-price" data-sample="Product#1.pricePence">£14.00</span>
              </article>
              <article className="ab-item" data-sample="Product#2">
                <div className="ab-item-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M4 9h16M9 9v11" />
                  </svg>
                </div>
                <h3 data-sample="Product#2.name">Linen tea towel</h3>
                <p data-sample="Product#2.description">Woven in a mill we have worked with for years. Softens with every wash.</p>
                <span className="ab-price" data-sample="Product#2.pricePence">£12.50</span>
              </article>
              <article className="ab-item" data-sample="Product#3">
                <div className="ab-item-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M12 3c3 4 5 6 5 9a5 5 0 0 1-10 0c0-3 2-5 5-9Z" />
                  </svg>
                </div>
                <h3 data-sample="Product#3.name">Beeswax candle</h3>
                <p data-sample="Product#3.description">A soft honey scent, poured in small batches. Burns for about forty hours.</p>
                <span className="ab-price" data-sample="Product#3.pricePence">£18.00</span>
              </article>
            </div>
            <a href="/products" className="ab-link" data-goto="products" onClick={goTo("/products")}>See every product and price <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg> </a>
          </div>
        </section>
        <div className="ds-page ab-close-wrap">
          <div className="ab-close">
            <div>
              <span className="ds-eyebrow">Ready when you are</span>
              <h2 className="ds-h1">Come and have a look around.</h2>
              <p>Shoppers sign up to buy. It is free, and it takes a minute.</p>
            </div>
            <a href="/editor/sign-in" className="ds-btn ds-btn-secondary ds-btn-lg" data-goto="editor-sign-in" onClick={goTo("/editor/sign-in")}>Sign up</a>
            <div className="ds-deco ab-rings" aria-hidden="true">
              <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="100" cy="100" r="90" />
                <circle cx="100" cy="100" r="62" />
                <circle cx="100" cy="100" r="34" />
              </svg>
            </div>
          </div>
        </div>
        <FooterPart onNavigate={onNavigate} />
      </main>
    </div>
  );
}
