import type { MouseEvent } from "react";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { usePageWording } from "../../features/content/pageWording";
import { ThemeSwitch } from "./ThemeSwitch";
import { useMenuClose } from "./useMenuClose";
import "./FooterPart.css";

export function FooterPart({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const { t } = useT();
  useMenuClose();
  const { data: contact } = usePageWording("contact");
  const email = contact?.email?.trim() ?? "";
  const phone = contact?.phone?.trim() ?? "";
  const address = contact?.address?.trim() ?? "";

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
                <span className="ds-brand-text">{t("app.name")}</span>
              </a>
              <p className="site-foot-line">{t("footer.line")}</p>
            </div>
            <div>
              <span className="ds-label-caps" style={{ color: "inherit", opacity: "0.7" }}>{t("footer.pages")}</span>
              <div className="site-foot-links" style={{ marginTop: "calc(12px * var(--space-scale, 1))" }}>
                <a href="/" data-goto="home" onClick={goTo("/")}>{t("nav.home")}</a>
                {" "}
                <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>{t("nav.howItWorks")}</a>
                {" "}
                <a href="/about" data-goto="about" onClick={goTo("/about")}>{t("nav.about")}</a>
                {" "}
                <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>{t("nav.contact")}</a>
              </div>
            </div>
            <div>
              <span className="ds-label-caps" style={{ color: "inherit", opacity: "0.7" }}>{t("contact.eyebrow")}</span>
              <div className="site-foot-contact" style={{ marginTop: "calc(12px * var(--space-scale, 1))" }}>
                {email ? <a href={`mailto:${email}`}>{email}</a> : null}
                {email && phone ? " " : null}
                {phone ? <a href={`tel:${phone.replace(/[^+0-9]/g, "")}`}>{phone}</a> : null}
                {(email || phone) && address ? " " : null}
                {address ? <span style={{ opacity: "0.7" }}>{address}</span> : null}
              </div>
            </div>
          </div>
          <div className="site-foot-base">
            <span style={{ opacity: "0.7" }}>{t("footer.base")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
