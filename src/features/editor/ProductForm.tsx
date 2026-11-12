import { useState } from "react";
import type { FormEvent } from "react";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { penceFromPounds, poundsFromPence } from "../products/products";
import type { Product, ProductInput } from "../products/products";
import { uploadProductPhoto } from "../products/productPhoto";
import { usePhotoLink } from "../products/usePhotoLink";

export type ProductFormProps = {
  product?: Product;
  busy: boolean;
  onSave: (input: ProductInput) => void;
  onCancel: () => void;
};

type Draft = {
  name: string;
  description: string;
  price: string;
  group: string;
  medicineNote: string;
  photoFileId: string;
  sortOrder: string;
  visible: boolean;
};

function draftOf(product?: Product): Draft {
  return {
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product ? poundsFromPence(product.pricePence) : "",
    group: product?.group ?? "",
    medicineNote: product?.medicineNote ?? "",
    photoFileId: product?.photoFileId ?? "",
    sortOrder: String(product?.sortOrder ?? 1),
    visible: product?.visible === true
  };
}

/** Adds a product or changes one: name and price are what a product needs. */
export function ProductForm({ product, busy, onSave, onCancel }: ProductFormProps) {
  const { t } = useT();
  const [draft, setDraft] = useState<Draft>(() => draftOf(product));
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const { data: photoUrl } = usePhotoLink(draft.photoFileId || undefined);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((current) => ({ ...current, [key]: value }));

  async function choosePhoto(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      set("photoFileId", await uploadProductPhoto(file));
    } catch (uploadError) {
      console.error("Could not upload the photo", uploadError);
      setError(t("productForm.photoFailed"));
    } finally {
      setUploading(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const pricePence = penceFromPounds(draft.price);
    const name = draft.name.trim();
    if (!name) {
      setError(t("productForm.needsName"));
      return;
    }
    if (pricePence === undefined) {
      setError(t("productForm.needsPrice"));
      return;
    }
    const order = Number(draft.sortOrder);
    const input: ProductInput = {
      description: draft.description.trim(),
      group: draft.group.trim(),
      medicineNote: draft.medicineNote.trim(),
      name,
      photoFileId: draft.photoFileId,
      pricePence,
      sortOrder: Number.isFinite(order) ? Math.trunc(order) : 1,
      visible: draft.visible
    };
    setError("");
    onSave(input);
  }

  return (
    <div className="ds-card ed-form-card">
      <span className="ds-label-caps">{product ? t("productForm.editLabel") : t("productForm.newLabel")}</span>
      <h2>{product ? t("productForm.editHeading") : t("productForm.newHeading")}</h2>
      <p>{product ? t("productForm.editNote") : t("productForm.newNote")}</p>
      <form className="ds-form" onSubmit={submit}>
        <div className="ds-field">
          <label className="ds-label" htmlFor="pf-name">{t("productForm.nameLabel")}</label>
          <input className="ds-input" id="pf-name" type="text" value={draft.name} onChange={(event) => set("name", event.target.value)} />
          <p className="ds-hint">{t("productForm.nameHint")}</p>
        </div>
        <div className="ds-field">
          <label className="ds-label" htmlFor="pf-desc">{t("productForm.descLabel")}</label>
          <textarea className="ds-textarea" id="pf-desc" rows={3} maxLength={500} value={draft.description} onChange={(event) => set("description", event.target.value)} />
          <p className="ds-hint">{t("productForm.descHint")}</p>
        </div>
        <div className="ds-form-row">
          <div className="ds-field">
            <label className="ds-label" htmlFor="pf-price">{t("productForm.priceLabel")}</label>
            <div className="ed-pricewrap">
              <input className="ds-input" id="pf-price" type="text" inputMode="decimal" value={draft.price} onChange={(event) => set("price", event.target.value)} />
            </div>
            <p className="ds-hint">{t("productForm.priceHint")}</p>
          </div>
          <div className="ds-field">
            <label className="ds-label" htmlFor="pf-group">{t("productForm.groupLabel")}</label>
            <input className="ds-input" id="pf-group" type="text" value={draft.group} onChange={(event) => set("group", event.target.value)} />
          </div>
        </div>
        <div className="ds-field">
          <label className="ds-label" htmlFor="pf-note">{t("productForm.noteLabel")}</label>
          <input className="ds-input" id="pf-note" type="text" value={draft.medicineNote} onChange={(event) => set("medicineNote", event.target.value)} />
        </div>
        <div className="ds-field">
          <span className="ds-label">{t("productForm.photoLabel")}</span>
          <div className="ed-photo">
            {photoUrl ? <img className="ds-img" src={photoUrl} alt="" /> : <div className="ds-img" aria-hidden="true" />}
            <div>
              <label className="ds-btn ds-btn-secondary ds-btn-sm" htmlFor="pf-photo">
                {uploading ? t("productForm.photoUploading") : t("productForm.photoChoose")}
              </label>
              <input
                id="pf-photo"
                type="file"
                accept="image/*"
                hidden
                onChange={(event) => { void choosePhoto(event.target.files?.[0]); event.target.value = ""; }}
              />
              <p className="ds-hint" style={{ marginTop: "6px" }}>{t("productForm.photoHint")}</p>
            </div>
          </div>
        </div>
        <div className="ds-form-row">
          <div className="ds-field">
            <label className="ds-label" htmlFor="pf-order">{t("productForm.orderLabel")}</label>
            <input className="ds-input" id="pf-order" type="number" value={draft.sortOrder} onChange={(event) => set("sortOrder", event.target.value)} />
            <p className="ds-hint">{t("productForm.orderHint")}</p>
          </div>
          <div className="ds-field" style={{ justifyContent: "flex-end" }}>
            <div className="ed-visible" style={{ borderTop: "0", paddingTop: "0" }}>
              <button
                type="button"
                className="ds-switch"
                role="switch"
                aria-checked={draft.visible}
                aria-label={t("productForm.visibleSwitch")}
                onClick={() => set("visible", !draft.visible)}
              />
              <div>
                <b>{t("productForm.visibleTitle")}</b>
                <small>{t("productForm.visibleNote")}</small>
              </div>
            </div>
          </div>
        </div>
        {error ? <p className="ds-field-error" role="alert">{error}</p> : null}
        <div className="ds-form-actions">
          <button type="button" className="ds-btn ds-btn-secondary" onClick={onCancel}>{t("productForm.cancel")}</button>
          {" "}
          <button type="submit" className="ds-btn" disabled={busy || uploading} aria-busy={busy}>
            {busy ? t("productForm.saving") : t("productForm.save")}
          </button>
        </div>
      </form>
    </div>
  );
}
