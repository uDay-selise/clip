import type { MouseEvent } from "react";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { priceInPounds } from "./products";
import { ProductPhoto } from "./ProductPhoto";
import type { Product } from "./products";

type ProductCardProps = {
  product: Product;
  onSignUp: (event: MouseEvent) => void;
  pending: boolean;
  label: string;
};

export function ProductCard({ product, onSignUp, pending, label }: ProductCardProps) {
  const { t } = useT();
  const description = product.description?.trim() ?? "";
  const group = product.group?.trim() ?? "";
  const medicineNote = product.medicineNote?.trim() ?? "";

  return (
    <article className="pr-card">
      <div className="pr-photo">
        <ProductPhoto fileId={product.photoFileId} alt={product.name} />
      </div>
      <div className="pr-tagline">
        <span className="ds-badge ds-badge-success">{t("products.inStock")}</span>
        {group ? <span className="ds-badge ds-badge-quiet">{group}</span> : null}
      </div>
      <div className="pr-body">
        <h2 className="pr-name">{product.name}</h2>
        {description ? <p className="pr-desc">{description}</p> : null}
        {medicineNote ? (
          <p className="pr-med">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path d="M12 3v18M5 8h14M5 16h14" />
            </svg>
            <span>{medicineNote}</span>
          </p>
        ) : null}
        <div className="pr-foot">
          <span className="pr-price">{priceInPounds(product.pricePence)}</span>
          <a className="ds-btn ds-btn-secondary ds-btn-sm" href="#" onClick={onSignUp} aria-busy={pending}>{label}</a>
        </div>
      </div>
    </article>
  );
}
