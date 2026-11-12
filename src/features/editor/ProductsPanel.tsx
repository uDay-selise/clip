import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useT } from "../../lib/i18n/LocalizationProvider";
import {
  createProduct,
  readAllProducts,
  removeProduct,
  setProductVisible,
  updateProduct
} from "../products/products";
import type { Product, ProductInput } from "../products/products";
import { ProductForm } from "./ProductForm";
import { EditableProductRows } from "./EditableProductRows";

type Notice = { kind: "saved" | "failed" | "removed"; text: string } | undefined;

/** The editors' products: add, change, switch on or off, and remove every product. */
export function ProductsPanel() {
  const { t } = useT();
  const client = useQueryClient();
  const [editing, setEditing] = useState<Product | undefined>();
  const [confirming, setConfirming] = useState<Product | undefined>();
  const [notice, setNotice] = useState<Notice>();
  const [busyId, setBusyId] = useState<string | undefined>();

  const { data: products, isLoading } = useQuery({ queryKey: ["editor", "products"], queryFn: readAllProducts });
  const refresh = () => client.invalidateQueries({ queryKey: ["products"] });
  const list = products ?? [];

  const save = useMutation({
    mutationFn: async ({ product, input }: { product?: Product; input: ProductInput }) => {
      if (product) await updateProduct(product.itemId, input);
      else await createProduct(input);
    },
    onError: (error) => {
      console.error("Could not save the product", error);
      setNotice({ kind: "failed", text: t("productForm.saveFailed") });
    },
    onSuccess: async () => {
      setEditing(undefined);
      setNotice({ kind: "saved", text: t("editor.saved") });
      await refresh();
    },
  });

  const toggle = useMutation({
    mutationFn: ({ product }: { product: Product }) => setProductVisible(product.itemId, product.visible !== true),
    onMutate: ({ product }) => setBusyId(product.itemId),
    onError: (error) => {
      console.error("Could not change the product", error);
      setNotice({ kind: "failed", text: t("productForm.saveFailed") });
    },
    onSuccess: () => setNotice({ kind: "saved", text: t("editor.saved") }),
    onSettled: async () => {
      setBusyId(undefined);
      await refresh();
    }
  });

  const remove = useMutation({
    mutationFn: ({ product }: { product: Product }) => removeProduct(product.itemId),
    onError: (error) => {
      console.error("Could not remove the product", error);
      setNotice({ kind: "failed", text: t("productForm.removeFailed") });
    },
    onSuccess: () => {
      setConfirming(undefined);
      setEditing(undefined);
      setNotice({ kind: "removed", text: t("editor.removed") });
    },
    onSettled: async () => {
      await refresh();
    }
  });

  return (
    <div className="ds-page">
      {notice ? (
        <div className={`ds-notice ${notice.kind === "failed" ? "ds-notice-error" : "ds-notice-success"}`}>
          <span role={notice.kind === "failed" ? "alert" : undefined}>{notice.text}</span>
        </div>
      ) : null}
      {confirming ? (
        <div className="ds-notice ds-notice-error">
          <span>{t("editor.removeAsk")}</span>
          {" "}
          <button type="button" className="ds-btn ds-btn-sm" onClick={() => remove.mutate({ product: confirming })} disabled={remove.isPending}>
            {remove.isPending ? t("editor.removing") : t("editor.removeYes")}
          </button>
          {" "}
          <button type="button" className="ds-btn ds-btn-ghost ds-btn-sm" onClick={() => setConfirming(undefined)}>{t("productForm.cancel")}</button>
        </div>
      ) : null}
      <div className="ed-cols">
        <section className="ed-sec" style={{ marginTop: "0" }} aria-labelledby="ed-products-title">
          <div className="ed-sec-head">
            <h2 id="ed-products-title">{t("editor.tabProducts")}</h2>
            <p>{t("editor.productsOrderNote")}</p>
            <span className="ds-spacer" />
            <button type="button" className="ds-btn ds-btn-sm" onClick={() => { setEditing(undefined); setNotice(undefined); }}>{t("editor.addProduct")}</button>
          </div>
          {isLoading ? null : list.length === 0 ? (
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
          ) : (
            <EditableProductRows
              products={list}
              busyId={busyId}
              onToggle={(product) => toggle.mutate({ product })}
              onEdit={(product) => { setEditing(product); setNotice(undefined); }}
              onRemove={(product) => setConfirming(product)}
            />
          )}
        </section>
        <ProductForm
          key={editing?.itemId ?? "new"}
          product={editing}
          busy={save.isPending}
          onCancel={() => { setEditing(undefined); setNotice(undefined); }}
          onSave={(input) => { setBusyId(editing?.itemId); save.mutate({ product: editing, input }); }}
        />
      </div>
    </div>
  );
}
