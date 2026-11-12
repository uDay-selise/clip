import { useT } from "../../lib/i18n/LocalizationProvider";
import type { Product } from "../products/products";
import { priceInPounds, readAllProducts as readProducts } from "../products/products";

export async function readAllProducts(): Promise<Product[]> {
  return readProducts();
}

export function ProductRows({ products }: { products: Product[] }) {
  const { t } = useT();

  if (products.length === 0) {
    return (
      <div className="ds-card ed-empty-inline">
        <div className="ds-empty">
          <div className="ds-empty-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path d="M4 8h16l-1.5 11h-13Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
          </div>
          <h2 className="ds-h3">{t("editor.productsEmpty")}</h2>
          <p className="ds-muted">{t("editor.productsEmptyNote")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ds-table-card">
      <div className="ds-table-wrap">
        <table className="ds-table ds-table-compact">
          <thead>
            <tr>
              <th scope="col">{t("editor.colProduct")}</th>
              <th scope="col" style={{ textAlign: "right" }}>{t("editor.colPrice")}</th>
              <th scope="col">{t("editor.colVisible")}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.itemId}>
                <td>
                  <div className="ed-name">
                    <div className="ds-img ed-thumb" aria-hidden="true" />
                    <div>
                      <b>{product.name}</b>
                      {product.group ? <span>{product.group}</span> : null}
                    </div>
                  </div>
                </td>
                <td className="ed-price ds-num">{priceInPounds(product.pricePence)}</td>
                <td>
                  <div className="ed-switchcell">
                    <span>{product.visible ? t("editor.on") : t("editor.off")}</span>
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
