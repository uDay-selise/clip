import type { MouseEvent } from "react";
import { HeaderPart } from "../../app/layout/HeaderPart";
import { FooterPart } from "../../app/layout/FooterPart";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { usePageWording } from "../content/pageWording";
import { useEnterShop } from "../shop-entry/useEnterShop";
import "./HowItWorksScreen.css";

export function HowItWorksScreen({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const { t } = useT();
  const { enter, failed, pending } = useEnterShop();
  const { data: wording } = usePageWording("how-it-works");
  const delivery = wording?.deliveryText?.trim() || t("how.deliveryEmpty");
  const returns = wording?.returnsText?.trim() || t("how.returnsEmpty");

  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  const signUp = (event: MouseEvent) => {
    event.preventDefault();
    void enter();
  };
  const label = pending ? t("auth.opening") : t("auth.signUp");

  return (
    <div className="studio-screen-how-it-works" style={{ display: "contents" }}>
      <main data-screen="how-it-works">
        <HeaderPart active="how-it-works" onNavigate={onNavigate} />
        <div className="ds-page hi-hero">
          <div className="hi-hero-grid">
            <div>
              <span className="ds-eyebrow">{t("how.eyebrow")}</span>
              <h1 className="ds-h1 hi-display">{t("how.heading")}</h1>
              <p className="hi-lead">{t("how.intro")}</p>
            </div>
            <div className="hi-hero-note">
              <b>{t("how.noteTitle")}</b>
              {failed ? <p role="alert" className="hi-note-row">{t("auth.openFailed")}</p> : null}
              <div className="hi-note-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M3 7h11v10H3z" />
                  <path d="M14 10h4l3 3v4h-7z" />
                  <circle cx="7" cy="18" r="1.6" />
                  <circle cx="17" cy="18" r="1.6" />
                </svg>
                {" "}
                <span>{t("how.noteDelivery")}</span>
              </div>
              <div className="hi-note-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0Z" />
                  <path d="M9 12h6" />
                </svg>
                {" "}
                <span>{t("how.noteContact")}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
          <ol className="hi-steps">
            <li className="hi-step">
              <span className="hi-step-num" aria-hidden="true">01</span>
              <h2 className="ds-h3">{t("how.step1Title")}</h2>
              <p>{t("how.step1Body")}</p>
            </li>
            <li className="hi-step">
              <span className="hi-step-num" aria-hidden="true">02</span>
              <h2 className="ds-h3">{t("how.step2Title")}</h2>
              <p>{t("how.step2Body")}</p>
            </li>
            <li className="hi-step">
              <span className="hi-step-num" aria-hidden="true">03</span>
              <h2 className="ds-h3">{t("how.step3Title")}</h2>
              <p>{t("how.step3Body")}</p>
            </li>
          </ol>
        </div>
        <div className="ds-page hi-info">
          <span className="ds-label-caps">{t("how.detailsLabel")}</span>
          <h2 className="ds-h2" style={{ marginTop: "10px", letterSpacing: "-0.03em", maxWidth: "20em" }}>{t("how.detailsHeading")}</h2>
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
                <h3 className="ds-h3" id="delivery-title">{t("how.deliveryTitle")}</h3>
              </div>
              <p className="hi-panel-body">{delivery}</p>
            </section>
            <section className="hi-panel" aria-labelledby="returns-title">
              <div className="hi-panel-head">
                <span className="hi-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M4 12a8 8 0 1 0 2.4-5.7" />
                    <path d="M4 4v4h4" />
                  </svg>
                </span>
                <h3 className="ds-h3" id="returns-title">{t("how.returnsTitle")}</h3>
              </div>
              <p className="hi-panel-body">{returns}</p>
            </section>
          </div>
        </div>
        <section className="ds-band-bold hi-cta-band">
          <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
            <div className="hi-cta">
              <div>
                <span className="ds-label-caps">{t("how.ctaLabel")}</span>
                <h2>{t("how.ctaHeading")}</h2>
                <p>{t("how.ctaBody")}</p>
              </div>
              <a href="#" className="ds-btn ds-btn-lg ds-btn-secondary" onClick={signUp} aria-label={t("auth.signUp")} aria-busy={pending}>{label}</a>
            </div>
          </div>
        </section>
        <FooterPart onNavigate={onNavigate} />
      </main>
    </div>
  );
}
