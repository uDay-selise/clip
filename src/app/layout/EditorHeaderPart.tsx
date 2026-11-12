// Ported by Studio from the agreed design .studio/designs/parts/editor-header.html, at the start of a build.
// Its markup, classes and CSS are the design's: wire real data, translation keys, routes and SDK
// actions into it and change nothing visual. Studio writes it again only when the design is redrawn;
// then `git diff` shows what to carry over.
import type { MouseEvent } from "react";
import "./EditorHeaderPart.css";

export function EditorHeaderPart({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const goTo = (path: string) => (event: MouseEvent) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="studio-part-editor-header" data-part-root="editor-header" style={{ display: "contents" }}>
      <header style={{ background: "hsl(var(--card))", borderBottom: "1px solid hsl(var(--border))" }}>
        <div className="ds-bar ed-top">
          <a href="/editor" className="ed-brand" data-goto="editor" onClick={goTo("/editor")}>
            {" "}
            <span className="ed-mark" aria-hidden="true">D</span>
            {" "}
            <span className="ds-brand-text">Donkey website</span>
            {" "}
            <span className="ed-tag">Editors</span>
            {" "}
          </a>
          <nav className="ed-tabs ds-only-wide" aria-label="Editors' area">
            <a href="/editor" className="ed-tab ds-active" data-goto="editor" onClick={goTo("/editor")}>Products</a>
            {" "}
            <a href="/editor" className="ed-tab" data-goto="editor" onClick={goTo("/editor")}>Page wording</a>
            {" "}
            <a href="/editor" className="ed-tab" data-goto="editor" onClick={goTo("/editor")}>Form entries</a>
          </nav>
          <span className="ds-spacer" />
          <div className="ed-end">
            <div className="ds-theme-switch ds-only-wide" role="group" aria-label="Colour mode">
              <button className="ds-active" aria-label="Light">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              </button>
              {" "}
              <button aria-label="Dark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
                </svg>
              </button>
              {" "}
              <button aria-label="Auto">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 4v16" />
                  <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
                </svg>
              </button>
            </div>
            <div className="ds-user ds-only-wide" data-sample="">
              <span className="ds-avatar">RM</span>
              {" "}
              <span className="ds-user-text">
                <b className="ds-user-name" data-sample="me.name">Rosa Mbeki</b>
                <span className="ds-user-role" data-sample="me.role">Editor</span>
              </span>
            </div>
            <details className="ds-menu">
              <summary className="ds-btn ds-btn-ghost ds-btn-icon" aria-label="More actions for the editors' area">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="5" cy="12" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="19" cy="12" r="1.5" />
                </svg>
              </summary>
              <div className="ds-menu-list">
                <a href="/editor" data-goto="editor" onClick={goTo("/editor")}>Products</a>
                {" "}
                <a href="/editor" data-goto="editor" onClick={goTo("/editor")}>Page wording</a>
                {" "}
                <a href="/editor" data-goto="editor" onClick={goTo("/editor")}>Form entries</a>
                <div className="ds-theme-switch" role="group" aria-label="Colour mode">
                  <button className="ds-active" aria-label="Light">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                    </svg>
                  </button>
                  {" "}
                  <button aria-label="Dark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
                    </svg>
                  </button>
                  {" "}
                  <button aria-label="Auto">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 4v16" />
                      <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
                <a href="#">Sign out</a>
              </div>
            </details>
          </div>
        </div>
      </header>
    </div>
  );
}
