import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "auto";
export const THEME_KEY = "donkey:theme";
const CHANGE_EVENT = "donkey:theme-change";

function readStored(chosen?: string | null): ThemeMode {
  const value = chosen ?? localStorage.getItem(THEME_KEY);
  return value === "light" || value === "dark" ? value : "auto";
}

function apply(mode: ThemeMode) {
  const wantsDark = mode === "dark" || (mode === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", wantsDark);
}

/** Runs before paint (index.html inline script) so the page never flashes the wrong mode. */
export const THEME_BOOT_SCRIPT = `(function(){try{var k=localStorage.getItem("${THEME_KEY}")||"auto";var d=k==="dark"||(k!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export function useThemeMode(): [ThemeMode, (mode: ThemeMode) => void] {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const stored = readStored();
    apply(stored);
    return stored;
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      const current = readStored();
      apply(current);
    };
    const onChange = (event: Event) => setMode(readStored((event as CustomEvent<string>).detail));
    media.addEventListener("change", sync);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener(CHANGE_EVENT, onChange);
    };
  }, []);

  const choose = (next: ThemeMode) => {
    localStorage.setItem(THEME_KEY, next);
    apply(next);
    setMode(next);
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: next }));
  };

  return [mode, choose];
}
