import { useT } from "../../lib/i18n/LocalizationProvider";

/** The contact form's messages. The shop site has no form on Contact, so none arrive yet. */
export function FormEntries() {
  const { t } = useT();
  return (
    <div className="ds-page">
      <section className="ed-sec">
        <div className="ed-sec-head">
          <h2>{t("editor.tabEntries")}</h2>
        </div>
        <div className="ds-card ed-empty-inline">
          <div className="ds-empty">
            <div className="ds-empty-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                <path d="M4 6h16v12H4Z" />
                <path d="m4 7 8 6 8-6" />
              </svg>
            </div>
            <h2 className="ds-h3">{t("editor.entriesEmpty")}</h2>
            <p className="ds-muted">{t("editor.entriesEmptyNote")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
