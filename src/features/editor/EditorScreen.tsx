import { useState } from "react";
import type { MouseEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../app/providers/AuthProvider";
import { EditorHeaderPart } from "../../app/layout/EditorHeaderPart";
import type { EditorSection } from "../../app/layout/EditorHeaderPart";
import { FooterPart } from "../../app/layout/FooterPart";
import { LoadingScreen } from "../../shared/ui/LoadingScreen";
import { useT } from "../../lib/i18n/LocalizationProvider";
import { useEditorAccess } from "./useEditorAccess";
import { readAllProducts, ProductRows } from "./ProductRows";
import { WordingPanel } from "./WordingPanel";
import { FormEntries } from "./FormEntries";
import { EditorsPanel } from "./EditorsPanel";
import "./EditorScreen.css";

export function EditorScreen({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const { t } = useT();
  const { status, access, isLoading, refresh: refreshAccess } = useEditorAccess();
  const { logout } = useAuth();
  const [section, setSection] = useState<EditorSection>("products");
  const { data: products } = useQuery({ enabled: Boolean(access?.isEditor), queryKey: ["editor", "products"], queryFn: readAllProducts });

  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };

  if (status === "loading" || (status === "authenticated" && isLoading)) return <LoadingScreen />;

  if (status === "unauthenticated") {
    return (
      <div className="studio-screen-editor" style={{ display: "contents" }}>
        <main data-screen="editor">
          <div className="ds-page ed-mast">
            <div className="ed-mast-row">
              <span className="ed-mast-title">{t("editor.tagLine")}</span>
              <span className="ds-spacer" />
              <a href="/editor/sign-in" className="ds-btn ds-btn-ghost ds-btn-sm" onClick={goTo("/editor/sign-in")}>{t("editor.signInLink")}</a>
            </div>
          </div>
          <div className="ds-page ed-head">
            <span className="ds-eyebrow">{t("editor.notAllowedEyebrow")}</span>
            <h1>{t("editor.notAllowedHeading")}</h1>
            <p>{t("editor.notAllowedBody")}</p>
            <div className="ds-actions" style={{ marginTop: "24px" }}>
              <a href="/editor/sign-in" className="ds-btn" onClick={goTo("/editor/sign-in")}>{t("editor.goToSignIn")}</a>
              {" "}
              <a href="/" className="ds-btn ds-btn-ghost" data-goto="home" onClick={goTo("/")}>{t("editor.backToShop")}</a>
            </div>
          </div>
          <FooterPart onNavigate={onNavigate} />
        </main>
      </div>
    );
  }

  if (!access?.isEditor) {
    return (
      <div className="studio-screen-editor" style={{ display: "contents" }}>
        <main data-screen="editor" className="is-signed-out">
          <div className="ds-page ed-mast">
            <div className="ed-mast-row">
              <span className="ed-mast-title">{t("editor.tagLine")}</span>
              <span className="ds-spacer" />
              <a href="/" className="ds-btn ds-btn-ghost ds-btn-sm" data-goto="home" onClick={goTo("/")}>{t("editor.backToShop")}</a>
            </div>
          </div>
          <div className="ds-page ed-head">
            <span className="ds-eyebrow">{t("editor.notAllowedEyebrow")}</span>
            <h1>{t("editor.notAllowedHeading")}</h1>
            <p>{t("editor.notAllowedBody")}</p>
            <div className="ds-actions" style={{ marginTop: "24px" }}>
              <a href="/" className="ds-btn" data-goto="home" onClick={goTo("/")}>{t("editor.backToShop")}</a>
              {" "}
              <button className="ds-btn ds-btn-ghost" onClick={() => { void logout(); refreshAccess(); }}>{t("editor.signOut")}</button>
            </div>
          </div>
          <FooterPart onNavigate={onNavigate} />
        </main>
      </div>
    );
  }

  const visible = (products ?? []).filter((product) => product.visible === true).length;
  const heading = section === "products" ? "products" : section === "wording" ? "wording" : "entries";

  return (
    <div className="studio-screen-editor" style={{ display: "contents" }}>
      <main data-screen="editor">
        <EditorHeaderPart
          section={section}
          name={access.name}
          onSection={setSection}
          onNavigate={onNavigate}
          onSignOut={() => { void logout().then(() => onNavigate?.("/editor/sign-in")); }}
        />
        <div className="ds-page ed-mast">
          <div className="ed-mast-row">
            <span className="ed-mast-title">{t("editor.tagLine")}</span>
            <span className="ds-spacer" />
            <a href="/products" className="ds-btn ds-btn-ghost ds-btn-sm" data-goto="products" onClick={goTo("/products")}>{t("editor.viewProducts")}</a>
          </div>
        </div>
        {section === "products" ? (
          <section data-state={products && products.length === 0 ? "empty" : undefined}>
            <div className="ds-page ed-head">
              <span className="ds-eyebrow">{t("editor.eyebrowProducts")}</span>
              <h1>{t("editor.productsHeading")}</h1>
              <p>{t("editor.productsIntro")}</p>
              <div className="ed-figures">
                <div className="ed-fig ed-fig-bold">
                  <div className="ds-stat-label">{t("editor.figOnSite")}</div>
                  <div className="ds-stat-value">{visible}</div>
                </div>
                <div className="ed-fig">
                  <div className="ds-stat-label">{t("editor.figHidden")}</div>
                  <div className="ds-stat-value">{(products?.length ?? 0) - visible}</div>
                </div>
                <div className="ed-fig">
                  <div className="ds-stat-label">{t("editor.figAll")}</div>
                  <div className="ds-stat-value">{products?.length ?? 0}</div>
                </div>
              </div>
            </div>
            <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
              <ProductRows products={products ?? []} />
            </div>
          </section>
        ) : null}
        {section === "wording" ? <WordingPanel /> : null}
        {section === "entries" ? <FormEntries /> : null}
        <div className="ds-page" style={{ paddingTop: "24px", paddingBottom: "0" }}>
          <EditorsPanel editorName={access.name} />
        </div>
        <div className="ds-page ed-foot">
          <div className="ds-notice ds-notice-info">
            <span>{t("editor.footNote")}</span>
          </div>
        </div>
        <FooterPart onNavigate={onNavigate} />
      </main>
      <span hidden data-section={heading} />
    </div>
  );
}
