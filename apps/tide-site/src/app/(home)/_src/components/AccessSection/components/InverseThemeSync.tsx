"use client";

import { useEffect } from "react";

/** 페이지 테마가 바뀌면 `[data-inverse-theme]` 구역을 반대 테마로 다시 맞춘다. 그리는 것은 없다. */
export function InverseThemeSync() {
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const inverse = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      for (const el of document.querySelectorAll("[data-inverse-theme]")) {
        el.setAttribute("data-theme", inverse);
      }
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  return null;
}
