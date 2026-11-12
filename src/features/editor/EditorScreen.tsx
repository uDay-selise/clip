// Ported by Studio from the agreed design .studio/designs/screens/editor.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import { useEffect } from "react";
import { HeaderPart } from "../../app/layout/HeaderPart";
import { FooterPart } from "../../app/layout/FooterPart";
import "./EditorScreen.css";

/** The situations the design shows: the screen as it usually is, then each one drawn. Show the one the real data or request is in. */
export type EditorScreenSituation = "normal" | "empty" | "not-allowed" | "done";

export function EditorScreen({ situation = "normal", onNavigate }: { situation?: EditorScreenSituation; onNavigate?: (path: string) => void }) {
  // A situation may mark the whole page, as it does in the design.
  useEffect(() => {
    const marks = ({"not-allowed":["is-signed-out"]} as Record<string, string[]>)[situation] ?? [];
    document.documentElement.classList.add(...marks);
    return () => document.documentElement.classList.remove(...marks);
  }, [situation]);
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="studio-screen-editor" style={{ display: "contents" }}>
      <main data-screen="editor">
        <HeaderPart onNavigate={onNavigate} />
        {situation === "empty" ? (
          <section data-state="empty">
            <div className="ds-page ed-head">
              <span className="ds-eyebrow">Products</span>
              <h1>Everything on the shop floor, in one place.</h1>
              <p>Add a product, set its price and put it on the site. Shoppers see whatever you switch on right away.</p>
            </div>
            <div className="ds-page" style={{ paddingTop: "0" }}>
              <div className="ds-card ed-empty-inline">
                <div className="ds-empty">
                  <div className="ds-empty-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <path d="M4 8h16l-1.5 11h-13Z" />
                      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
                    </svg>
                  </div>
                  <h2 className="ds-h3">No products yet. Add your first one.</h2>
                  <p className="ds-muted">A name and a price is all it takes. Switch it on and it shows on the shop page.</p>
                  <div className="ed-empty-actions">
                    <button className="ds-btn">Add product</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="ds-page" style={{ paddingTop: "0" }}>
              <section className="ed-sec" aria-labelledby="ed-entries-empty-title">
                <div className="ed-sec-head">
                  <h2 id="ed-entries-empty-title">Form entries</h2>
                </div>
                <div className="ds-card ed-empty-inline">
                  <div className="ds-empty">
                    <div className="ds-empty-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <path d="M4 6h16v12H4Z" />
                        <path d="m4 7 8 6 8-6" />
                      </svg>
                    </div>
                    <h2 className="ds-h3">No entries yet.</h2>
                    <p className="ds-muted">When someone writes to the shop, their message lands here.</p>
                  </div>
                </div>
              </section>
            </div>
          </section>
        ) : null}
        {situation === "not-allowed" ? (
          <section data-state="not-allowed">
            <div className="ds-page ed-head">
              <span className="ds-eyebrow">Editors only</span>
              <h1>This area is for the Donkey team.</h1>
              <p>Sign in with the email address you were invited on to add products and change the site's words.</p>
              <div className="ds-actions" style={{ marginTop: "24px" }}>
                <a href="/editor/sign-in" className="ds-btn" data-goto="editor-sign-in" onClick={goTo("/editor/sign-in")}>Go to the sign-in page</a>
                {" "}
                <a href="/" className="ds-btn ds-btn-ghost" data-goto="home" onClick={goTo("/")}>Back to the shop</a>
              </div>
            </div>
          </section>
        ) : null}
        {situation === "done" ? (
          <section data-state="done">
            <div className="ds-page ed-mast">
              <div className="ed-mast-row">
                <span className="ed-mast-title">Donkey editors</span>
                {" "}
                <span className="ds-spacer" />
                {" "}
                <a href="/products" className="ds-btn ds-btn-ghost ds-btn-sm" data-goto="products" onClick={goTo("/products")}>View the products page</a>
                <details className="ds-menu">
                  <summary className="ds-btn ds-btn-ghost ds-btn-sm" aria-label="Open the editor menu">
                    <span className="ds-avatar ds-avatar-sm" data-sample="">AM</span>
                    {" "}
                    <span data-sample="me.name">Amara Osei</span>
                    {" "}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="ds-menu-list">
                    <a href="/" data-goto="home" onClick={goTo("/")}>Home</a>
                    {" "}
                    <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>How it works</a>
                    {" "}
                    <a href="/products" data-goto="products" onClick={goTo("/products")}>Products</a>
                    {" "}
                    <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>Contact</a>
                    {" "}
                    <a href="/editor/sign-in" data-goto="editor-sign-in" onClick={goTo("/editor/sign-in")}>Sign out</a>
                  </div>
                </details>
              </div>
            </div>
            <div className="ds-page ed-head">
              <span className="ds-eyebrow">Products</span>
              <h1>Everything on the shop floor, in one place.</h1>
              <p>Add a product, set its price and put it on the site. Shoppers see whatever you switch on right away.</p>
            </div>
            <div className="ds-page" style={{ paddingTop: "0" }}>
              <div className="ds-notice ds-notice-success">
                <span>Saved. Shoppers see this now.</span>
              </div>
            </div>
            <div className="ds-page" style={{ paddingTop: "24px" }}>
              <div className="ds-table-card">
                <div className="ds-table-card-head">
                  <h2 className="ds-h3">Products</h2>
                  <div className="ds-actions">
                    <a href="/products" className="ds-btn ds-btn-ghost ds-btn-sm" data-goto="products" onClick={goTo("/products")}>View the products page</a>
                  </div>
                </div>
                <div className="ds-table-wrap">
                  <table className="ds-table ds-table-compact">
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col" style={{ textAlign: "right" }}>Price</th>
                        <th scope="col">Visible</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="ed-name">
                            <div className="ds-img ed-thumb" data-sample="" />
                            <div>
                              <b data-sample="Product#9.name">Wheat straw lunch box</b>
                              <span data-sample="Product#9.group">Kitchen</span>
                            </div>
                          </div>
                        </td>
                        <td className="ed-price ds-num" data-sample="Product#9.pricePence">£15.50</td>
                        <td>
                          <div className="ed-switchcell">
                            <button className="ds-switch" role="switch" aria-checked="true" aria-label="Visible: Wheat straw lunch box" />
                            {" "}
                            <span>On</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="ed-name">
                            <div className="ds-img ed-thumb" data-sample="" />
                            <div>
                              <b data-sample="Product#1.name">Wool winter scarf</b>
                              <span data-sample="Product#1.group">Clothing</span>
                            </div>
                          </div>
                        </td>
                        <td className="ed-price ds-num" data-sample="Product#1.pricePence">£18.00</td>
                        <td>
                          <div className="ed-switchcell">
                            <button className="ds-switch" role="switch" aria-checked="true" aria-label="Visible: Wool winter scarf" />
                            {" "}
                            <span>On</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="ed-name">
                            <div className="ds-img ed-thumb" data-sample="" />
                            <div>
                              <b data-sample="Product#3.name">Enamel camping mug, sage</b>
                              <span data-sample="Product#3.group">Kitchen</span>
                            </div>
                          </div>
                        </td>
                        <td className="ed-price ds-num" data-sample="Product#3.pricePence">£12.50</td>
                        <td>
                          <div className="ed-switchcell">
                            <button className="ds-switch" role="switch" aria-checked="true" aria-label="Visible: Enamel camping mug, sage" />
                            {" "}
                            <span>On</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="ds-table-card-foot">
                  <span className="ds-muted" style={{ fontSize: "13px" }}>Showing the newest first</span>
                </div>
              </div>
            </div>
          </section>
        ) : null}
        {situation !== "empty" && situation !== "not-allowed" && situation !== "done" ? (
          <div>
            <div className="ds-page ed-mast">
              <div className="ed-mast-row">
                <span className="ed-mast-title">Donkey editors</span>
                {" "}
                <span className="ds-spacer" />
                {" "}
                <a href="/products" className="ds-btn ds-btn-ghost ds-btn-sm" data-goto="products" onClick={goTo("/products")}>View the products page</a>
                <details className="ds-menu">
                  <summary className="ds-btn ds-btn-ghost ds-btn-sm" aria-label="Open the editor menu">
                    <span className="ds-avatar ds-avatar-sm" data-sample="">AM</span>
                    {" "}
                    <span data-sample="me.name">Amara Osei</span>
                    {" "}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="ds-menu-list">
                    <a href="/" data-goto="home" onClick={goTo("/")}>Home</a>
                    {" "}
                    <a href="/how-it-works" data-goto="how-it-works" onClick={goTo("/how-it-works")}>How it works</a>
                    {" "}
                    <a href="/products" data-goto="products" onClick={goTo("/products")}>Products</a>
                    {" "}
                    <a href="/contact" data-goto="contact" onClick={goTo("/contact")}>Contact</a>
                    {" "}
                    <a href="/editor/sign-in" data-goto="editor-sign-in" onClick={goTo("/editor/sign-in")}>Sign out</a>
                  </div>
                </details>
              </div>
            </div>
            <div className="ds-page ed-head">
              <span className="ds-eyebrow">Products</span>
              <h1>Everything on the shop floor, in one place.</h1>
              <p>Add a product, set its price and put it on the site. Shoppers see whatever you switch on right away.</p>
              <div className="ed-figures">
                <div className="ed-fig ed-fig-bold">
                  <div className="ds-stat-label">On the site now</div>
                  <div className="ds-stat-value" data-sample="">6</div>
                </div>
                <div className="ed-fig">
                  <div className="ds-stat-label">Waiting in the wings</div>
                  <div className="ds-stat-value" data-sample="">2</div>
                </div>
                <div className="ed-fig">
                  <div className="ds-stat-label">Every product, all year</div>
                  <div className="ds-stat-value" data-sample="">8</div>
                </div>
              </div>
            </div>
            <div className="ds-band ed-band">
              <div className="ds-page" style={{ paddingTop: "0", paddingBottom: "0" }}>
                <div className="ed-cols">
                  <section className="ed-sec" aria-labelledby="ed-products-title">
                    <div className="ed-sec-head">
                      <h2 id="ed-products-title">Products</h2>
                      <p>Lowest order number shows first.</p>
                    </div>
                    <div className="ds-filter-bar ed-toolbar">
                      <label className="ds-search">
                        {" "}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <circle cx="11" cy="11" r="7" />
                          <path d="m20 20-3.5-3.5" />
                        </svg>
                        {" "}
                        <input className="ds-input ds-input-sm" type="search" placeholder="Search products" aria-label="Search products" />
                        {" "}
                      </label>
                      <select className="ds-select ds-input-sm ed-sort" aria-label="Show">
                        <option>All products</option>
                        <option>On the site only</option>
                        <option>Hidden only</option>
                      </select>
                      <span className="ds-spacer" />
                      {" "}
                      <span className="ds-muted" style={{ fontSize: "13px" }}>8 products</span>
                    </div>
                    <div className="ds-table-card">
                      <div className="ds-table-wrap">
                        <table className="ds-table ds-table-compact">
                          <thead>
                            <tr>
                              <th scope="col">Product</th>
                              <th scope="col" style={{ textAlign: "right" }}>Price</th>
                              <th scope="col" className="ds-only-wide" style={{ textAlign: "right" }}>Order</th>
                              <th scope="col">Visible</th>
                              <th scope="col">
                                <span className="ds-only-wide">Actions</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div className="ed-name">
                                  <div className="ds-img ed-thumb" data-sample="" />
                                  <div>
                                    <b data-sample="Product#1.name">Wool winter scarf</b>
                                    {" "}
                                    <span data-sample="Product#1.group">Clothing</span>
                                  </div>
                                </div>
                              </td>
                              <td className="ed-price ds-num" data-sample="Product#1.pricePence">£18.00</td>
                              <td className="ed-order ds-num ds-only-wide" data-sample="Product#1.sortOrder">1</td>
                              <td>
                                <div className="ed-switchcell">
                                  <button className="ds-switch" role="switch" aria-checked="true" aria-label="Visible: Wool winter scarf" />
                                  {" "}
                                  <span className="ds-only-wide">On</span>
                                </div>
                              </td>
                              <td>
                                <div className="ds-row-actions">
                                  <button className="ds-btn ds-btn-secondary ds-btn-sm ds-only-wide">Edit</button>
                                  <details className="ds-menu">
                                    <summary className="ds-btn ds-btn-ghost ds-btn-icon ds-btn-sm" aria-label="More actions for Wool winter scarf">
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                                        <circle cx="5" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="19" cy="12" r="1.2" fill="currentColor" />
                                      </svg>
                                    </summary>
                                    <div className="ds-menu-list">
                                      <a>Edit</a>
                                      {" "}
                                      <a>Duplicate</a>
                                      {" "}
                                      <a>Remove</a>
                                    </div>
                                  </details>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="ed-name">
                                  <div className="ds-img ed-thumb" data-sample="" />
                                  <div>
                                    <b data-sample="Product#2.name">Beeswax hand balm</b>
                                    {" "}
                                    <span data-sample="Product#2.group">Bath and body</span>
                                    <div className="ed-note">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                                        <circle cx="12" cy="12" r="9" />
                                        <path d="M12 8v5M12 16h.01" />
                                      </svg>
                                      {" "}
                                      <span data-sample="Product#2.medicineNote">External use only</span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="ed-price ds-num" data-sample="Product#2.pricePence">£6.50</td>
                              <td className="ed-order ds-num ds-only-wide" data-sample="Product#2.sortOrder">2</td>
                              <td>
                                <div className="ed-switchcell">
                                  <button className="ds-switch" role="switch" aria-checked="true" aria-label="Visible: Beeswax hand balm" />
                                  {" "}
                                  <span className="ds-only-wide">On</span>
                                </div>
                              </td>
                              <td>
                                <div className="ds-row-actions">
                                  <button className="ds-btn ds-btn-secondary ds-btn-sm ds-only-wide">Edit</button>
                                  <details className="ds-menu">
                                    <summary className="ds-btn ds-btn-ghost ds-btn-icon ds-btn-sm" aria-label="More actions for Beeswax hand balm">
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                                        <circle cx="5" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="19" cy="12" r="1.2" fill="currentColor" />
                                      </svg>
                                    </summary>
                                    <div className="ds-menu-list">
                                      <a>Edit</a>
                                      {" "}
                                      <a>Duplicate</a>
                                      {" "}
                                      <a>Remove</a>
                                    </div>
                                  </details>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="ed-name">
                                  <div className="ds-img ed-thumb" data-sample="" />
                                  <div>
                                    <b data-sample="Product#3.name">Enamel camping mug, sage</b>
                                    {" "}
                                    <span data-sample="Product#3.group">Kitchen</span>
                                  </div>
                                </div>
                              </td>
                              <td className="ed-price ds-num" data-sample="Product#3.pricePence">£12.50</td>
                              <td className="ed-order ds-num ds-only-wide" data-sample="Product#3.sortOrder">3</td>
                              <td>
                                <div className="ed-switchcell">
                                  <button className="ds-switch" role="switch" aria-checked="true" aria-label="Visible: Enamel camping mug, sage" />
                                  {" "}
                                  <span className="ds-only-wide">On</span>
                                </div>
                              </td>
                              <td>
                                <div className="ds-row-actions">
                                  <button className="ds-btn ds-btn-secondary ds-btn-sm ds-only-wide">Edit</button>
                                  <details className="ds-menu">
                                    <summary className="ds-btn ds-btn-ghost ds-btn-icon ds-btn-sm" aria-label="More actions for Enamel camping mug, sage">
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                                        <circle cx="5" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="19" cy="12" r="1.2" fill="currentColor" />
                                      </svg>
                                    </summary>
                                    <div className="ds-menu-list">
                                      <a>Edit</a>
                                      {" "}
                                      <a>Duplicate</a>
                                      {" "}
                                      <a>Remove</a>
                                    </div>
                                  </details>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="ed-name">
                                  <div className="ds-img ed-thumb" data-sample="" />
                                  <div>
                                    <b data-sample="Product#4.name">Raspberry leaf tea, 40 bags</b>
                                    {" "}
                                    <span data-sample="Product#4.group">Kitchen</span>
                                    <div className="ed-note">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                                        <circle cx="12" cy="12" r="9" />
                                        <path d="M12 8v5M12 16h.01" />
                                      </svg>
                                      {" "}
                                      <span data-sample="Product#4.medicineNote">Not for children under 12</span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="ed-price ds-num" data-sample="Product#4.pricePence">£4.20</td>
                              <td className="ed-order ds-num ds-only-wide" data-sample="Product#4.sortOrder">4</td>
                              <td>
                                <div className="ed-switchcell">
                                  <button className="ds-switch" role="switch" aria-checked="false" aria-label="Visible: Raspberry leaf tea, 40 bags" />
                                  {" "}
                                  <span className="ds-only-wide">Off</span>
                                </div>
                              </td>
                              <td>
                                <div className="ds-row-actions">
                                  <button className="ds-btn ds-btn-secondary ds-btn-sm ds-only-wide">Edit</button>
                                  <details className="ds-menu">
                                    <summary className="ds-btn ds-btn-ghost ds-btn-icon ds-btn-sm" aria-label="More actions for Raspberry leaf tea, 40 bags">
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                                        <circle cx="5" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="19" cy="12" r="1.2" fill="currentColor" />
                                      </svg>
                                    </summary>
                                    <div className="ds-menu-list">
                                      <a>Edit</a>
                                      {" "}
                                      <a>Duplicate</a>
                                      {" "}
                                      <a>Remove</a>
                                    </div>
                                  </details>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="ed-name">
                                  <div className="ds-img ed-thumb" data-sample="" />
                                  <div>
                                    <b data-sample="Product#5.name">Recycled cotton tote bag with long handles and inner pocket</b>
                                    {" "}
                                    <span data-sample="Product#5.group">Clothing</span>
                                  </div>
                                </div>
                              </td>
                              <td className="ed-price ds-num" data-sample="Product#5.pricePence">£9.00</td>
                              <td className="ed-order ds-num ds-only-wide" data-sample="Product#5.sortOrder">5</td>
                              <td>
                                <div className="ed-switchcell">
                                  <button className="ds-switch" role="switch" aria-checked="true" aria-label="Visible: Recycled cotton tote bag" />
                                  {" "}
                                  <span className="ds-only-wide">On</span>
                                </div>
                              </td>
                              <td>
                                <div className="ds-row-actions">
                                  <button className="ds-btn ds-btn-secondary ds-btn-sm ds-only-wide">Edit</button>
                                  <details className="ds-menu">
                                    <summary className="ds-btn ds-btn-ghost ds-btn-icon ds-btn-sm" aria-label="More actions for Recycled cotton tote bag">
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                                        <circle cx="5" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="19" cy="12" r="1.2" fill="currentColor" />
                                      </svg>
                                    </summary>
                                    <div className="ds-menu-list">
                                      <a>Edit</a>
                                      {" "}
                                      <a>Duplicate</a>
                                      {" "}
                                      <a>Remove</a>
                                    </div>
                                  </details>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="ed-name">
                                  <div className="ds-img ed-thumb" data-sample="" />
                                  <div>
                                    <b data-sample="Product#6.name">Soy wax candle, fig and cedar</b>
                                    {" "}
                                    <span data-sample="Product#6.group">Home</span>
                                  </div>
                                </div>
                              </td>
                              <td className="ed-price ds-num" data-sample="Product#6.pricePence">£14.00</td>
                              <td className="ed-order ds-num ds-only-wide" data-sample="Product#6.sortOrder">6</td>
                              <td>
                                <div className="ed-switchcell">
                                  <button className="ds-switch" role="switch" aria-checked="true" aria-label="Visible: Soy wax candle, fig and cedar" />
                                  {" "}
                                  <span className="ds-only-wide">On</span>
                                </div>
                              </td>
                              <td>
                                <div className="ds-row-actions">
                                  <button className="ds-btn ds-btn-secondary ds-btn-sm ds-only-wide">Edit</button>
                                  <details className="ds-menu">
                                    <summary className="ds-btn ds-btn-ghost ds-btn-icon ds-btn-sm" aria-label="More actions for Soy wax candle, fig and cedar">
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                                        <circle cx="5" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="19" cy="12" r="1.2" fill="currentColor" />
                                      </svg>
                                    </summary>
                                    <div className="ds-menu-list">
                                      <a>Edit</a>
                                      {" "}
                                      <a>Duplicate</a>
                                      {" "}
                                      <a>Remove</a>
                                    </div>
                                  </details>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="ed-name">
                                  <div className="ds-img ed-thumb" data-sample="" />
                                  <div>
                                    <b data-sample="Product#7.name">Linen tea towel, stripe</b>
                                    {" "}
                                    <span data-sample="Product#7.group">Home</span>
                                  </div>
                                </div>
                              </td>
                              <td className="ed-price ds-num" data-sample="Product#7.pricePence">£11.00</td>
                              <td className="ed-order ds-num ds-only-wide" data-sample="Product#7.sortOrder">7</td>
                              <td>
                                <div className="ed-switchcell">
                                  <button className="ds-switch" role="switch" aria-checked="true" aria-label="Visible: Linen tea towel, stripe" />
                                  {" "}
                                  <span className="ds-only-wide">On</span>
                                </div>
                              </td>
                              <td>
                                <div className="ds-row-actions">
                                  <button className="ds-btn ds-btn-secondary ds-btn-sm ds-only-wide">Edit</button>
                                  <details className="ds-menu">
                                    <summary className="ds-btn ds-btn-ghost ds-btn-icon ds-btn-sm" aria-label="More actions for Linen tea towel, stripe">
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                                        <circle cx="5" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="19" cy="12" r="1.2" fill="currentColor" />
                                      </svg>
                                    </summary>
                                    <div className="ds-menu-list">
                                      <a>Edit</a>
                                      {" "}
                                      <a>Duplicate</a>
                                      {" "}
                                      <a>Remove</a>
                                    </div>
                                  </details>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="ed-name">
                                  <div className="ds-img ed-thumb" data-sample="" />
                                  <div>
                                    <b data-sample="Product#8.name">Cedar soap dish</b>
                                    {" "}
                                    <span data-sample="Product#8.group">Bath and body</span>
                                  </div>
                                </div>
                              </td>
                              <td className="ed-price ds-num" data-sample="Product#8.pricePence">£8.75</td>
                              <td className="ed-order ds-num ds-only-wide" data-sample="Product#8.sortOrder">8</td>
                              <td>
                                <div className="ed-switchcell">
                                  <button className="ds-switch" role="switch" aria-checked="false" aria-label="Visible: Cedar soap dish" />
                                  {" "}
                                  <span className="ds-only-wide">Off</span>
                                </div>
                              </td>
                              <td>
                                <div className="ds-row-actions">
                                  <button className="ds-btn ds-btn-secondary ds-btn-sm ds-only-wide">Edit</button>
                                  <details className="ds-menu">
                                    <summary className="ds-btn ds-btn-ghost ds-btn-icon ds-btn-sm" aria-label="More actions for Cedar soap dish">
                                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                                        <circle cx="5" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                                        <circle cx="19" cy="12" r="1.2" fill="currentColor" />
                                      </svg>
                                    </summary>
                                    <div className="ds-menu-list">
                                      <a>Edit</a>
                                      {" "}
                                      <a>Duplicate</a>
                                      {" "}
                                      <a>Remove</a>
                                    </div>
                                  </details>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="ds-table-card-foot">
                        <span className="ds-muted" style={{ fontSize: "13px" }}>Showing all 8 products</span>
                      </div>
                    </div>
                  </section>
                  <section className="ed-sec" aria-labelledby="ed-add-title" style={{ marginTop: "0" }}>
                    <div className="ds-card ed-form-card">
                      <span className="ds-label-caps">New product</span>
                      <h2 id="ed-add-title">Add product</h2>
                      <p>Name and price are all you need. The rest can come later.</p>
                      <form className="ds-form">
                        <div className="ds-field">
                          <label className="ds-label" htmlFor="p-name">Name</label>
                          {" "}
                          <input className="ds-input" id="p-name" type="text" placeholder="Wool winter scarf" data-sample="Product#new.name" />
                        </div>
                        <div className="ds-field">
                          <label className="ds-label" htmlFor="p-desc">Description</label>
                          {" "}
                          <textarea className="ds-textarea" id="p-desc" rows={3} placeholder="What it is, what it is made of, who it suits" data-sample="Product#new.description" />
                          <p className="ds-hint">Up to 500 characters. Shoppers read this under the name.</p>
                        </div>
                        <div className="ds-form-row">
                          <div className="ds-field">
                            <label className="ds-label" htmlFor="p-price">Price</label>
                            <div className="ed-pricewrap">
                              <input className="ds-input" id="p-price" type="text" inputMode="decimal" placeholder="12.50" data-sample="Product#new.pricePence" />
                            </div>
                            <p className="ds-hint">In pounds and pence.</p>
                          </div>
                          <div className="ds-field">
                            <label className="ds-label" htmlFor="p-group">Group</label>
                            {" "}
                            <input className="ds-input" id="p-group" type="text" placeholder="Clothing" data-sample="Product#new.group" />
                          </div>
                        </div>
                        <div className="ds-field">
                          <label className="ds-label" htmlFor="p-note">Medicine note</label>
                          {" "}
                          <input className="ds-input" id="p-note" type="text" placeholder="Shown under the price, only if it applies" data-sample="Product#new.medicineNote" />
                        </div>
                        <div className="ds-field">
                          <span className="ds-label">Photo</span>
                          <div className="ed-photo">
                            <div className="ds-img" data-sample="" />
                            <div>
                              <button type="button" className="ds-btn ds-btn-secondary ds-btn-sm">Choose a photo</button>
                              <p className="ds-hint" style={{ marginTop: "6px" }}>A square picture works best.</p>
                            </div>
                          </div>
                        </div>
                        <div className="ds-form-row">
                          <div className="ds-field">
                            <label className="ds-label" htmlFor="p-order">Order</label>
                            {" "}
                            <input className="ds-input" id="p-order" type="number" defaultValue="9" data-sample="Product#new.sortOrder" />
                            <p className="ds-hint">Lowest shows first.</p>
                          </div>
                          <div className="ds-field" style={{ justifyContent: "flex-end" }}>
                            <div className="ed-visible" style={{ borderTop: "0", paddingTop: "0" }}>
                              <button className="ds-switch" role="switch" aria-checked="false" aria-label="Visible on the site" />
                              <div>
                                <b>Visible on the site</b>
                                {" "}
                                <small>Shoppers see it once this is on.</small>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ds-form-actions">
                          <button type="button" className="ds-btn ds-btn-secondary">Cancel</button>
                          {" "}
                          <button type="submit" className="ds-btn" data-situation="done">Save</button>
                        </div>
                      </form>
                    </div>
                  </section>
                </div>
                <section className="ed-sec" aria-labelledby="ed-entries-title">
                  <div className="ed-sec-head">
                    <h2 id="ed-entries-title">Form entries</h2>
                    <p>Messages the contact form sent to the shop.</p>
                  </div>
                  <div className="ed-entries">
                    <article className="ds-panel ed-entry">
                      <div className="ed-entry-top">
                        <b data-sample="Form entry#1.name">Priya Shah</b>
                        {" "}
                        <span className="ds-badge ds-badge-quiet">New</span>
                        {" "}
                        <time data-sample="Form entry#1.sentAt">14 March, 9:42 am</time>
                      </div>
                      <p data-sample="Form entry#1.message">Do you have the camping mug in a second colour? I would like three for a birthday present.</p>
                    </article>
                    <article className="ds-panel ed-entry">
                      <div className="ed-entry-top">
                        <b data-sample="Form entry#2.name">Tom Whitlock</b>
                        {" "}
                        <span className="ds-badge ds-badge-success">Replied</span>
                        {" "}
                        <time data-sample="Form entry#2.sentAt">12 March, 4:05 pm</time>
                      </div>
                      <p data-sample="Form entry#2.message">My order arrived with one item missing. Could you check the farm shop order from last Tuesday?</p>
                    </article>
                    <article className="ds-panel ed-entry">
                      <div className="ed-entry-top">
                        <b data-sample="Form entry#3.name">Rachel Nkemelu</b>
                        {" "}
                        <span className="ds-badge ds-badge-quiet">New</span>
                        {" "}
                        <time data-sample="Form entry#3.sentAt">9 March, 11:18 am</time>
                      </div>
                      <p data-sample="Form entry#3.message">Do you ship to Northern Ireland? The tea would make a good gift for my mum.</p>
                    </article>
                  </div>
                </section>
              </div>
            </div>
            <div className="ds-page ed-foot">
              <div className="ds-notice ds-notice-info">
                <span>Shoppers never see this area. Everything you save here goes live on the pages straight away.</span>
              </div>
            </div>
          </div>
        ) : null}
        <FooterPart onNavigate={onNavigate} />
      </main>
    </div>
  );
}
