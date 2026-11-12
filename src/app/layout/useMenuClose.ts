import { useEffect } from "react";
import { useT } from "../../lib/i18n/LocalizationProvider";

/** Runs the code of a design's compact switch: click, then close on Escape or a click outside. */
export function useMenuClose() {
  useEffect(() => {
    const closeAll = (element: Element) => {
      element.querySelectorAll<HTMLDetailsElement>("details.ds-menu[open]").forEach((menu) => {
        menu.removeAttribute("open");
      });
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      document.querySelectorAll<HTMLDetailsElement>("details.ds-menu[open]").forEach((menu) => {
        if (target && !menu.contains(target)) menu.removeAttribute("open");
      });
      const link = target?.closest("details.ds-menu a, details.ds-menu button");
      if (link) closeAll(link.closest("details.ds-menu") ?? document.body);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      document.querySelectorAll<HTMLDetailsElement>("details.ds-menu[open]").forEach((menu) => menu.removeAttribute("open"));
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
}

export function useDocumentTitle(title: string) {
  const { t } = useT();
  useEffect(() => {
    document.title = title ? `${title} · ${t("app.name")}` : t("app.name");
  }, [title, t]);
}
