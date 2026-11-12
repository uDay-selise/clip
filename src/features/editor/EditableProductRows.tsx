import { useT } from "../../lib/i18n/LocalizationProvider";
import { priceInPounds } from "../products/products";
import type { Product } from "../products/products";
import { ProductPhoto } from "../products/ProductPhoto";

type EditableProductRowsProps = {
  products: Product[];
  busyId?: string;
  onToggle: (product: Product) => void;
  onEdit: (product: Product) => void;
  onRemove: (product: Product) => void;
};

/** The editors' view of every product: price, order, visibility, and the ways to change it. */
export function EditableProductRows({ products, busyId, onToggle, onEdit, onRemove }: EditableProductRowsProps) {
  const { t } = useT();

  return (
    <div className="ds-table-card">
      <div className="ds-table-wrap">
        <table className="ds-table ds-table-compact">
          <thead>
            <tr>
              <th scope="col">{t("editor.colProduct")}</th>
              <th scope="col" style={{ textAlign: "right" }}>{t("editor.colPrice")}</th>
              <th scope="col" className="ds-only-wide" style={{ textAlign: "right" }}>{t("editor.colOrder")}</th>
              <th scope="col">{t("editor.colVisible")}</th>
              <th scope="col"><span className="ds-only-wide">{t("editor.colActions")}</span></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.itemId}>
                <td>
                  <div className="ed-name">
                    <div className="ds-img ed-thumb">
                      <ProductPhoto fileId={product.photoFileId} alt="" className="ed-thumb-img" />
                    </div>
                    <div>
                      <b>{product.name}</b>
                      {product.group ? <span>{product.group}</span> : null}
                      {product.medicineNote ? (
                        <div className="ed-note">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 8v5M12 16h.01" />
                          </svg>
                          {" "}
                          <span>{product.medicineNote}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </td>
                <td className="ed-price ds-num">{priceInPounds(product.pricePence)}</td>
                <td className="ed-order ds-num ds-only-wide">{product.sortOrder ?? 1}</td>
                <td>
                  <div className="ed-switchcell">
                    <button
                      type="button"
                      className="ds-switch"
                      role="switch"
                      aria-checked={product.visible === true}
                      aria-label={`${t("editor.colVisible")}: ${product.name}`}
                      disabled={busyId === product.itemId}
                      onClick={() => onToggle(product)}
                    />
                    {" "}
                    <span className="ds-only-wide">{product.visible ? t("editor.on") : t("editor.off")}</span>
                  </div>
                </td>
                <td>
                  <div className="ds-row-actions">
                    <button type="button" className="ds-btn ds-btn-secondary ds-btn-sm ds-only-wide" onClick={() => onEdit(product)}>
                      {t("editor.editAction")}
                    </button>
                    {" "}
                    <details className="ds-menu">
                      <summary className="ds-btn ds-btn-ghost ds-btn-icon ds-btn-sm" aria-label={`${t("editor.moreActions")}: ${product.name}`}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <circle cx="5" cy="12" r="1.2" fill="currentColor" />
                          <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                          <circle cx="19" cy="12" r="1.2" fill="currentColor" />
                        </svg>
                      </summary>
                      <div className="ds-menu-list">
                        <a href="#" onClick={(event) => { event.preventDefault(); onEdit(product); }}>{t("editor.editAction")}</a>
                        <a href="#" onClick={(event) => { event.preventDefault(); onRemove(product); }}>{t("editor.removeAction")}</a>
                      </div>
                    </details>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ds-table-card-foot">
        <span className="ds-muted" style={{ fontSize: "13px" }}>{t("editor.productsCount").replace("{n}", String(products.length))}</span>
      </div>
    </div>
  );
}
