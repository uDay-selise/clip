import { useState } from "react";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { usePageWording } from "../content/pageWording";

const PAGES = [
  { key: "home", label: "editor.pageHome" },
  { key: "how-it-works", label: "editor.pageHow" },
  { key: "contact", label: "editor.pageContact" }
] as const;

/** Read-only this step: the wording forms arrive with the delivery, returns and contact step. */
export function WordingPanel() {
  const { t } = useT();
  const [pageKey, setPageKey] = useState<string>("home");
  const { data: wording } = usePageWording(pageKey);

  return (
    <div className="ds-page">
      <div className="ed-sec-head">
        <h2>{t("editor.wordingHeading")}</h2>
        <p>{t("editor.wordingNote")}</p>
      </div>
      <div className="ds-filter-bar ed-toolbar">
        {PAGES.map((page) => (
          <button
            key={page.key}
            type="button"
            className={pageKey === page.key ? "ds-btn ds-btn-sm" : "ds-btn ds-btn-ghost ds-btn-sm"}
            onClick={() => setPageKey(page.key)}
          >
            {t(page.label)}
          </button>
        ))}
      </div>
      <div className="ds-card" style={{ padding: "calc(24px * var(--space-scale, 1))" }}>
        <span className="ds-label-caps">{t(PAGES.find((page) => page.key === pageKey)?.label ?? "editor.pageHome")}</span>
        <h3 style={{ margin: "8px 0 4px" }}>{wording?.heading?.trim() || t("editor.wordingDefaultHeading")}</h3>
        <p className="ds-muted">{wording?.intro?.trim() || t("editor.wordingDefaultIntro")}</p>
      </div>
    </div>
  );
}
