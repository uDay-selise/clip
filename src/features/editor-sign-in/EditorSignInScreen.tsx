// Ported by Studio from the agreed design .studio/designs/screens/editor-sign-in.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import { useState } from "react";
import type { MouseEvent } from "react";
import { FooterPart } from "../../app/layout/FooterPart";
import { ThemeSwitch } from "../../app/layout/ThemeSwitch";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { useAuth } from "../../app/providers/AuthProvider";
import "./EditorSignInScreen.css";

/** The situations the design shows: the screen as it usually is, then each one drawn. Show the one the real data or request is in. */
export type EditorSignInScreenSituation = "normal" | "not-allowed";

export function EditorSignInScreen({ situation = "normal", onNavigate, signedOut }: { situation?: EditorSignInScreenSituation; onNavigate?: (path: string) => void; signedOut?: () => void }) {
  const { t } = useT();
  const { login } = useAuth();
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  const signIn = async () => {
    setPending(true);
    setFailed(false);
    try {
      await login("/editor");
    } catch (error) {
      console.error("Could not open the sign-in page", error);
      setFailed(true);
      setPending(false);
    }
  };
  return (
    <div className="studio-screen-editor-sign-in" style={{ display: "contents" }}>
      <main data-screen="editor-sign-in" className="esi-root">
        {situation === "not-allowed" ? (
          <section data-state="not-allowed">
            <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "calc(48px * var(--space-scale, 1))" }}>
              <div className="esi-top">
                <a href="/" className="esi-brand" data-goto="home" onClick={goTo("/")}> <span className="esi-mark" aria-hidden="true">{" "}<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M5 9h14M5 9v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9M5 9l2-4M19 9l-2-4M9 13h6" /></svg>{" "}</span> {t("app.name")} </a>
                {" "}
                <span className="ds-spacer" />
                <div className="esi-switches">
                  <ThemeSwitch />
                  {" "}
                  <a href="/" className="ds-btn ds-btn-ghost ds-btn-sm" data-goto="home" onClick={goTo("/")}>{t("editor.backToShop")}</a>
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
                  <h2 className="ds-h2" style={{ marginTop: "calc(16px * var(--space-scale, 1))" }}>{t("editor.notAllowedTitle")}</h2>
                  <p className="ds-muted" style={{ maxWidth: "32em", margin: "calc(8px * var(--space-scale, 1)) auto 0" }}>{t("editor.notAllowed")}</p>
                  <div className="ds-row" style={{ justifyContent: "center", marginTop: "calc(24px * var(--space-scale, 1))" }}>
                    <a href="/" className="ds-btn" data-goto="home" onClick={goTo("/")}>{t("editor.backToShop")}</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}
        {situation !== "not-allowed" ? (
          <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "calc(48px * var(--space-scale, 1))" }}>
            <div className="esi-top">
              <a href="/" className="esi-brand" data-goto="home" onClick={goTo("/")}> <span className="esi-mark" aria-hidden="true">{" "}<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M5 9h14M5 9v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9M5 9l2-4M19 9l-2-4M9 13h6" /></svg>{" "}</span> {t("app.name")} </a>
              {" "}
              <span className="ds-spacer" />
              <div className="esi-switches">
                <ThemeSwitch />
                {" "}
                {signedOut ? (
                  <a href="#" className="ds-btn ds-btn-ghost ds-btn-sm" onClick={(event) => { event.preventDefault(); signedOut(); }}>{t("editor.backToShop")}</a>
                ) : (
                  <a href="/" className="ds-btn ds-btn-ghost ds-btn-sm" data-goto="home" onClick={goTo("/")}>{t("editor.backToShop")}</a>
                )}
              </div>
            </div>
            <section className="esi-hero">
              <span className="ds-deco esi-ring" aria-hidden="true" />
              {" "}
              <span className="ds-deco esi-ring-2" aria-hidden="true" />
              {" "}
              <span className="ds-deco esi-dot" aria-hidden="true" />
              <div className="esi-hero-inner">
                <span className="esi-eyebrow" >{t("editor.kicker")}</span>
                <h1>{t("editor.heading")}</h1>
                <p>{t("editor.intro")}</p>
                <div className="esi-hero-actions">
                  <a href="#" className="ds-btn ds-btn-lg" data-goto="editor" onClick={(event) => { event.preventDefault(); void signIn(); }} aria-busy={pending}>{pending ? t("auth.opening") : t("auth.signIn")}</a>
                  {" "}
                  <span className="esi-help">{failed ? t("auth.openFailed") : t("editor.help")}</span>
                </div>
              </div>
            </section>
            <div className="esi-cards">
              <div className="esi-card">
                <span className="ds-label-caps">{t("editor.card1Label")}</span>
                <h3>{t("editor.card1Title")}</h3>
                <p>{t("editor.card1Body")}</p>
              </div>
              <div className="esi-card">
                <span className="ds-label-caps">{t("nav.products")}</span>
                <h3>{t("editor.card2Title")}</h3>
                <p>{t("editor.card2Body")}</p>
              </div>
              <div className="esi-card">
                <span className="ds-label-caps">{t("editor.card3Label")}</span>
                <h3>{t("editor.card3Title")}</h3>
                <p>{t("editor.card3Body")}</p>
              </div>
            </div>
            <div className="esi-footrow">
              <span>{t("editor.lostInvite")}</span>
              {" "}
              <span className="ds-spacer" />
              {" "}
              <a href="/" data-goto="home" onClick={goTo("/")}>{t("nav.home")}</a>
              {" "}
              <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>{t("nav.howItWorks")}</a>
              {" "}
              <a href="/products" data-goto="products" onClick={goTo("/products")}>{t("nav.products")}</a>
              {" "}
              <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>{t("nav.contact")}</a>
            </div>
          </div>
        ) : null}
        <FooterPart onNavigate={onNavigate} />
      </main>
    </div>
  );
}
