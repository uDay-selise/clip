import { useState } from "react";
import type { FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { readPageWording, savePageWording, usePageWordingWrites } from "../content/pageWording";
import type { PageWording, WordFields } from "../content/pageWording";

type WordingFormProps = {
  pageKey: string;
  titleKey: string;
  noteKey: string;
  /** Which of the page's own fields this page keeps, beyond heading and intro. */
  extra: ("delivery" | "contact")[];
};

type Draft = { heading: string; intro: string; deliveryText: string; returnsText: string; email: string; phone: string; address: string };

function draftOf(wording: PageWording | undefined): Draft {
  return {
    address: wording?.address ?? "",
    deliveryText: wording?.deliveryText ?? "",
    email: wording?.email ?? "",
    heading: wording?.heading ?? "",
    intro: wording?.intro ?? "",
    phone: wording?.phone ?? "",
    returnsText: wording?.returnsText ?? ""
  };
}

/** The words the team keeps for one page: heading and intro, plus delivery and returns or contact details. */
export function WordingForm({ pageKey, titleKey, noteKey, extra }: WordingFormProps) {
  const { t } = useT();
  const { data: wording, isLoading } = useQuery({ queryKey: ["pageWording", pageKey], queryFn: () => readPageWording(pageKey) });
  if (isLoading) return null;
  return <WordingFields key={wording?.itemId ?? pageKey} pageKey={pageKey} wording={wording} titleKey={titleKey} noteKey={noteKey} extra={extra} />;
}

function WordingFields({ pageKey, wording, titleKey, noteKey, extra }: WordingFormProps & { wording: PageWording | undefined }) {
  const { t } = useT();
  const { saved } = usePageWordingWrites();
  const [draft, setDraft] = useState<Draft>(() => draftOf(wording));
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "failed">("idle");

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setStatus("idle");
  };

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (extra.includes("delivery") && !draft.deliveryText.trim()) {
      setStatus("failed");
      return;
    }
    if (extra.includes("contact") && (!draft.email.trim() || !draft.phone.trim())) {
      setStatus("failed");
      return;
    }
    const fields: WordFields = {
      address: extra.includes("contact") ? draft.address.trim() : undefined,
      deliveryText: extra.includes("delivery") ? draft.deliveryText.trim() : undefined,
      email: extra.includes("contact") ? draft.email.trim() : undefined,
      heading: draft.heading.trim(),
      intro: draft.intro.trim(),
      phone: extra.includes("contact") ? draft.phone.trim() : undefined,
      returnsText: extra.includes("delivery") ? draft.returnsText.trim() : undefined
    };
    setStatus("saving");
    try {
      await savePageWording(pageKey, wording, fields);
      await saved();
      setStatus("saved");
    } catch (error) {
      console.error("Could not save the page's words", error);
      setStatus("failed");
    }
  }

  return (
    <div className="ds-card ed-form-card" style={{ position: "static" }}>
      <span className="ds-label-caps">{t(titleKey)}</span>
      <p style={{ marginTop: "12px" }}>{t(noteKey)}</p>
      {status === "saved" ? <div className="ds-notice ds-notice-success"><span>{t("editor.saved")}</span></div> : null}
      {status === "failed" ? <div className="ds-notice ds-notice-error"><span role="alert">{t("wording.saveFailed")}</span></div> : null}
      <form className="ds-form" onSubmit={submit}>
        <div className="ds-field">
          <label className="ds-label" htmlFor={`wf-${pageKey}-heading`}>{t("wording.headingLabel")}</label>
          <input className="ds-input" id={`wf-${pageKey}-heading`} type="text" maxLength={120} value={draft.heading} onChange={(event) => set("heading", event.target.value)} />
          <p className="ds-hint">{t("wording.headingHint")}</p>
        </div>
        <div className="ds-field">
          <label className="ds-label" htmlFor={`wf-${pageKey}-intro`}>{t("wording.introLabel")}</label>
          <textarea className="ds-textarea" id={`wf-${pageKey}-intro`} rows={3} maxLength={300} value={draft.intro} onChange={(event) => set("intro", event.target.value)} />
          <p className="ds-hint">{t("wording.introHint")}</p>
        </div>
        {extra.includes("delivery") ? (
          <>
            <div className="ds-field">
              <label className="ds-label" htmlFor={`wf-${pageKey}-delivery`}>{t("wording.deliveryLabel")}</label>
              <textarea className="ds-textarea" id={`wf-${pageKey}-delivery`} rows={4} maxLength={1000} required value={draft.deliveryText} onChange={(event) => set("deliveryText", event.target.value)} />
              <p className="ds-hint">{t("wording.deliveryHint")}</p>
            </div>
            <div className="ds-field">
              <label className="ds-label" htmlFor={`wf-${pageKey}-returns`}>{t("wording.returnsLabel")}</label>
              <textarea className="ds-textarea" id={`wf-${pageKey}-returns`} rows={4} maxLength={1000} required value={draft.returnsText} onChange={(event) => set("returnsText", event.target.value)} />
              <p className="ds-hint">{t("wording.returnsHint")}</p>
            </div>
          </>
        ) : null}
        {extra.includes("contact") ? (
          <>
            <div className="ds-field">
              <label className="ds-label" htmlFor={`wf-${pageKey}-email`}>{t("wording.emailLabel")}</label>
              <input className="ds-input" id={`wf-${pageKey}-email`} type="email" required value={draft.email} onChange={(event) => set("email", event.target.value)} />
            </div>
            <div className="ds-field">
              <label className="ds-label" htmlFor={`wf-${pageKey}-phone`}>{t("wording.phoneLabel")}</label>
              <input className="ds-input" id={`wf-${pageKey}-phone`} type="tel" required value={draft.phone} onChange={(event) => set("phone", event.target.value)} />
            </div>
            <div className="ds-field">
              <label className="ds-label" htmlFor={`wf-${pageKey}-address`}>{t("wording.addressLabel")}</label>
              <input className="ds-input" id={`wf-${pageKey}-address`} type="text" value={draft.address} onChange={(event) => set("address", event.target.value)} />
              <p className="ds-hint">{t("wording.addressHint")}</p>
            </div>
          </>
        ) : null}
        <div className="ds-form-actions">
          <button type="submit" className="ds-btn" disabled={status === "saving"} aria-busy={status === "saving"}>
            {status === "saving" ? t("productForm.saving") : t("wording.save")}
          </button>
        </div>
      </form>
    </div>
  );
}
