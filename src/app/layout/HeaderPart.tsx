// Ported by Studio from the agreed design .studio/designs/parts/header.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import "./HeaderPart.css";

export function HeaderPart({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="studio-part-header" data-part-root="header" style={{ display: "contents" }}>
      <header style={{ background: "hsl(var(--background))", borderBottom: "1px solid hsl(var(--border))" }}>
        <div className="ds-bar site-top">
          <a href="/" className="ds-brand-link" data-goto="home" onClick={goTo("/")}>
            <span className="site-mark" aria-hidden="true">D</span>
            <span className="ds-brand-text">Donkey website</span>
          </a>
          <nav className="site-nav ds-only-wide" aria-label="Pages">
            <a href="/" data-goto="home" onClick={goTo("/")}>Home</a>
            {" "}
            <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>How it works</a>
            {" "}
            <a href="/about" data-goto="about" onClick={goTo("/about")}>About</a>
            {" "}
            <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>Contact</a>
          </nav>
          <span className="ds-spacer" />
          <div className="site-top-actions">
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
            <a href="/editor/sign-in" className="ds-btn ds-btn-secondary ds-btn-sm ds-only-wide" data-goto="editor-sign-in" onClick={goTo("/editor/sign-in")}>Sign in</a>
            {" "}
            <a className="ds-btn ds-btn-sm ds-only-wide" href="#" aria-label="Sign up">Sign up</a>
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
                <a href="/products" data-goto="products" onClick={goTo("/products")}>Products</a>
                {" "}
                <a href="/about" data-goto="about" onClick={goTo("/about")}>About</a>
                {" "}
                <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>Contact</a>
                {" "}
                <a href="/editor/sign-in" data-goto="editor-sign-in" onClick={goTo("/editor/sign-in")}>Sign in</a>
                {" "}
                <a href="#" aria-label="Sign up">Sign up</a>
                <div style={{ padding: "calc(8px * var(--space-scale, 1)) 0 0", borderTop: "1px solid hsl(var(--border))", marginTop: "calc(8px * var(--space-scale, 1))" }}>
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
              </div>
            </details>
          </div>
        </div>
      </header>
    </div>
  );
}
