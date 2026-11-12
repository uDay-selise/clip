import type { MouseEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { ThemeSwitch } from "../../app/layout/ThemeSwitch";
import { useMenuClose } from "../../app/layout/useMenuClose";
import { FooterPart } from "../../app/layout/FooterPart";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { usePageWording } from "../content/pageWording";
import { useEnterShop } from "../shop-entry/useEnterShop";
import { readVisibleProducts } from "./products";
import { ProductCard } from "./ProductCard";
import "./ProductsScreen.css";

/** The situations the design shows: the screen as it usually is, then each one drawn. Show the one the real data or request is in. */
export type ProductsScreenSituation = "normal" | "empty";

export function ProductsScreen({ situation, onNavigate }: { situation?: ProductsScreenSituation; onNavigate?: (path: string) => void }) {
  const { t } = useT();
  useMenuClose();
  const { enter, failed, pending } = useEnterShop();
  const { data: wording } = usePageWording("how-it-works");
  const { data: products } = useQuery({ queryKey: ["products", "visible"], queryFn: readVisibleProducts });
  const showEmpty = situation === "empty" || products?.length === 0;
  const from = products && products.length > 0 ? formatPence(products.map((item) => Number(item.pricePence ?? 0))) : t("home.priceExample");
  const delivery = wording?.deliveryText?.trim() || t("how.deliveryEmpty");

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
    <div className="studio-screen-products" style={{ display: "contents" }}>
      <main data-screen="products">
        <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
          <header className="pr-top">
            <a href="/" className="pr-brand" data-goto="home" onClick={goTo("/")}>
              <span className="pr-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M7 8c-1.5 1.6-2 3.4 0 4.5M17 8c1.5 1.6 2 3.4 0 4.5" />
                  <path d="M6 13.5c0 3.5 2.7 6 6 6s6-2.5 6-6c0-1.6-1-2.8-2.5-2.8h-7C7 10.7 6 11.9 6 13.5Z" />
                </svg>
              </span>
              <span>{t("app.name")}</span>
            </a>
            <nav className="pr-links ds-only-wide" aria-label="Site pages">
              <a href="/" data-goto="home" onClick={goTo("/")}>{t("nav.home")}</a>
              {" "}
              <a className="pr-on" href="#" aria-current="page">{t("nav.products")}</a>
              {" "}
              <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>{t("nav.howItWorks")}</a>
              {" "}
              <a href="/about" data-goto="about" onClick={goTo("/about")}>{t("nav.about")}</a>
              {" "}
              <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>{t("nav.contact")}</a>
            </nav>
            <span className="ds-spacer" />
            <ThemeSwitch className="ds-only-wide" />
            <a href="#" className="ds-btn ds-btn-sm ds-only-wide" onClick={signUp} aria-busy={pending}>{label}</a>
            {" "}
            <a href="#" className="ds-btn ds-btn-ghost ds-btn-sm ds-only-wide" data-goto="editor-sign-in" onClick={signUp} aria-busy={pending}>{t("auth.signIn")}</a>
            <details className="ds-menu ds-only-narrow">
              <summary className="ds-menu-button" aria-label="Open the menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </summary>
              <div className="ds-menu-list">
                <a href="/" data-goto="home" onClick={goTo("/")}>{t("nav.home")}</a>
                <a href="#" onClick={(event) => event.preventDefault()}>{t("nav.products")}</a>
                <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>{t("nav.howItWorks")}</a>
                <a href="/about" data-goto="about" onClick={goTo("/about")}>{t("nav.about")}</a>
                <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>{t("nav.contact")}</a>
                <a href="#" onClick={signUp}>{t("auth.signIn")}</a>
                <a href="#" onClick={signUp}>{t("auth.signUp")}</a>
                <ThemeSwitch />
              </div>
            </details>
          </header>
        </div>
        {failed ? <p role="alert" className="ds-muted pr-alert">{t("auth.openFailed")}</p> : null}
        {showEmpty ? (
          <section data-state="empty">
            <div className="ds-page" style={{ paddingTop: "calc(48px * var(--space-scale, 1))", paddingBottom: "calc(64px * var(--space-scale, 1))" }}>
              <div className="ds-page-head pr-head" style={{ gridTemplateColumns: "1fr" }}>
                <div>
                  <span className="ds-eyebrow">{t("products.eyebrow")}</span>
                  <h1 className="ds-h1 ds-display">{t("products.heading")}</h1>
                  <p className="pr-lead">{t("products.lead")}</p>
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
                <h2 className="ds-h3">{t("products.empty")}</h2>
                <p className="ds-muted" style={{ marginTop: "calc(8px * var(--space-scale, 1))" }}>{t("products.emptyBody")}</p>
                <a href="#" className="ds-btn" style={{ marginTop: "calc(24px * var(--space-scale, 1))" }} onClick={signUp} aria-busy={pending}>{label}</a>
              </div>
            </div>
          </section>
        ) : (
          <div>
            <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
              <div className="ds-page-head pr-head">
                <div>
                  <span className="ds-eyebrow">{t("products.eyebrow")}</span>
                  <h1 className="ds-h1 ds-display">{t("products.heading")}</h1>
                  <p className="pr-lead">{t("products.lead")}</p>
                </div>
                <div className="pr-counts">
                  <div className="pr-count"><b>{products?.length ?? 0}</b><span>{t("products.countOnSale")}</span></div>
                  <div className="pr-count"><b>{from}</b><span>{t("products.countFrom")}</span></div>
                  <div className="pr-count"><b>{delivery}</b><span>{t("products.countDelivery")}</span></div>
                </div>
              </div>
            </div>
            <section className="ds-band pr-band">
              <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
                <div className="pr-band-head">
                  <span className="ds-label-caps">{t("products.onSaleLabel")}</span>
                  <span className="pr-band-note">{t("products.pricesNote")}</span>
                </div>
                <div className="pr-grid">
                  {(products ?? []).map((product) => (
                    <ProductCard key={product.itemId} product={product} onSignUp={signUp} pending={pending} label={label} />
                  ))}
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
                  <span className="ds-eyebrow">{t("products.ctaLabel")}</span>
                  <h2 className="ds-h2">{t("products.ctaHeading")}</h2>
                  <p>{t("products.ctaBody")}</p>
                </div>
                <div className="pr-close-btn">
                  <a href="#" className="ds-btn ds-btn-lg" onClick={signUp} aria-busy={pending}>{label}</a>
                  {" "}
                  <a className="ds-btn ds-btn-ghost" href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>{t("nav.howItWorks")}</a>
                </div>
              </section>
            </div>
          </div>
        )}
        <FooterPart onNavigate={onNavigate} />
      </main>
    </div>
  );
}

function formatPence(prices: number[]): string {
  const lowest = Math.min(...prices.map((value) => (Number.isFinite(value) ? value : 0)));
  return `£${(lowest / 100).toFixed(2)}`;
}
