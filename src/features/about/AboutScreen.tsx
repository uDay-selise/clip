import type { MouseEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { FooterPart } from "../../app/layout/FooterPart";
import { ThemeSwitch } from "../../app/layout/ThemeSwitch";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { usePageWording } from "../content/pageWording";
import { useEnterShop } from "../shop-entry/useEnterShop";
import { readVisibleProducts, priceInPounds } from "../products/products";
import "./AboutScreen.css";

const SHELF_ICONS = [
  <><path d="M6 8h12l-1.5 11h-9L6 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 9h16M9 9v11" /></>,
  <><path d="M12 3c3 4 5 6 5 9a5 5 0 0 1-10 0c0-3 2-5 5-9Z" /></>
];

export function AboutScreen({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const { t } = useT();
  const { enter, failed, pending } = useEnterShop();
  const { data: wording } = usePageWording("about");
  const { data: products } = useQuery({ queryKey: ["products", "visible"], queryFn: readVisibleProducts });
  const intro = wording?.intro?.trim() || t("about.intro");
  const shelf = (products ?? []).slice(0, 3);

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
    <div className="studio-screen-about" style={{ display: "contents" }}>
      <main data-screen="about">
        <div className="ds-page ab-corner">
          <ThemeSwitch />
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
              <span className="ds-eyebrow">{t("about.eyebrow")}</span>
              <h1>{t("about.heading")}</h1>
              <p className="ab-hero-lead">{intro}</p>
              <div className="ab-hero-links">
                <a href="#" className="ds-btn ds-btn-lg" onClick={signUp} aria-busy={pending}>{label}</a>
                {" "}
                <a href="/products" className="ab-link" data-goto="products" onClick={goTo("/products")}>
                  {t("about.seeProducts")}
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
              </div>
              {failed ? <p role="alert" className="ds-muted">{t("auth.openFailed")}</p> : null}
            </div>
            <div className="ab-frame">
              <div className="ds-img" aria-hidden="true" />
              <div className="ab-tag">
                <span className="ab-dot" aria-hidden="true" />
                <span>{t("about.pickedByHand")}</span>
              </div>
            </div>
          </div>
        </section>
        <div className="ds-page ab-page">
          <section className="ab-story">
            <div>
              <span className="ds-eyebrow">{t("about.storyLabel")}</span>
              <h2 className="ds-h1">{t("about.storyHeading")}</h2>
              <p>{t("about.storyBody")}</p>
              <a href="/how-it-works" className="ab-link" data-goto="how-it-works" onClick={goTo("/how-it-works")}>
                {t("about.howBuying")}
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
          </section>
        </div>
        {shelf.length > 0 ? (
          <section className="ab-band ab-band-products">
            <div className="ds-page">
              <span className="ds-eyebrow">{t("about.sellLabel")}</span>
              <h2 className="ds-h1" style={{ maxWidth: "20ch" }}>{t("about.sellHeading")}</h2>
              <div className="ab-shelf">
                {shelf.map((product, index) => (
                  <article className="ab-item" key={product.itemId}>
                    <div className="ab-item-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75">
                        {SHELF_ICONS[index % SHELF_ICONS.length]}
                      </svg>
                    </div>
                    <h3>{product.name}</h3>
                    {product.description ? <p>{product.description}</p> : null}
                    <span className="ab-price">{priceInPounds(product.pricePence)}</span>
                  </article>
                ))}
              </div>
              <a href="/products" className="ab-link" data-goto="products" onClick={goTo("/products")}>
                {t("about.seeEveryProduct")}
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
          </section>
        ) : null}
        <div className="ds-page ab-close-wrap">
          <div className="ab-close">
            <div>
              <span className="ds-eyebrow">{t("about.ctaLabel")}</span>
              <h2 className="ds-h1">{t("about.ctaHeading")}</h2>
              <p>{t("about.ctaBody")}</p>
            </div>
            <a href="#" className="ds-btn ds-btn-secondary ds-btn-lg" onClick={signUp} aria-busy={pending}>{label}</a>
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
