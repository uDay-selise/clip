// Ported by Studio from the agreed design .studio/designs/parts/footer.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import "./FooterPart.css";

export function FooterPart({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="studio-part-footer" data-part-root="footer" style={{ display: "contents" }}>
      <footer style={{ background: "hsl(var(--band))", color: "hsl(var(--band-foreground))", borderTop: "1px solid hsl(var(--border))" }}>
        <div className="ds-bar" style={{ flexDirection: "column", gap: "0" }}>
          <div className="site-foot">
            <div className="site-foot-brand">
              <a href="/" className="ds-brand-link" data-goto="home" onClick={goTo("/")}>
                <span className="site-foot-mark" aria-hidden="true">D</span>
                <span className="ds-brand-text">Donkey website</span>
              </a>
              <p className="site-foot-line">Everyday goods and small prices from Donkey.</p>
            </div>
            <div>
              <span className="ds-label-caps" style={{ color: "inherit", opacity: "0.7" }}>The pages</span>
              <div className="site-foot-links" style={{ marginTop: "calc(12px * var(--space-scale, 1))" }}>
                <a href="/" data-goto="home" onClick={goTo("/")}>Home</a>
                {" "}
                <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>How it works</a>
                {" "}
                <a href="/about" data-goto="about" onClick={goTo("/about")}>About</a>
                {" "}
                <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>Contact</a>
              </div>
            </div>
            <div>
              <span className="ds-label-caps" style={{ color: "inherit", opacity: "0.7" }}>Reach Donkey</span>
              <div className="site-foot-contact" style={{ marginTop: "calc(12px * var(--space-scale, 1))" }}>
                <a href="#" data-sample="PageWording#contact.email">hello@donkey.shop</a>
                {" "}
                <a href="#" data-sample="PageWording#contact.phone">01632 960 412</a>
                {" "}
                <span style={{ opacity: "0.7" }} data-sample="PageWording#contact.address">12 Larkfield Road, Nottingham NG7 4DQ</span>
              </div>
            </div>
          </div>
          <div className="site-foot-base">
            <span style={{ opacity: "0.7" }}>Donkey shop. Prices in pounds.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
