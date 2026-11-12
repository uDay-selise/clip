import { useState } from "react";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { WordingForm } from "./WordingForm";

const PAGES = [
  { key: "home", label: "editor.pageHome", title: "wording.homeTitle", note: "wording.homeNote", extra: [] },
  { key: "how-it-works", label: "editor.pageHow", title: "wording.howTitle", note: "wording.howNote", extra: ["delivery"] },
  { key: "contact", label: "editor.pageContact", title: "wording.contactTitle", note: "wording.contactNote", extra: ["contact"] }
] as const;

export function WordingPanel() {
  const { t } = useT();
  const [pageKey, setPageKey] = useState<string>("home");
  const page = PAGES.find((item) => item.key === pageKey) ?? PAGES[0];

  return (
    <div className="ds-page">
      <div className="ed-sec-head">
        <h2>{t("editor.wordingHeading")}</h2>
        <p>{t("editor.wordingNote")}</p>
      </div>
      <div className="ds-filter-bar ed-toolbar">
        {PAGES.map((item) => (
          <button
            key={item.key}
            type="button"
            className={pageKey === item.key ? "ds-btn ds-btn-sm" : "ds-btn ds-btn-ghost ds-btn-sm"}
            onClick={() => setPageKey(item.key)}
          >
            {t(item.label)}
          </button>
        ))}
      </div>
      <WordingForm
        key={page.key}
        pageKey={page.key}
        titleKey={page.title}
        noteKey={page.note}
        extra={[...page.extra] as ("delivery" | "contact")[]}
      />
    </div>
  );
}
