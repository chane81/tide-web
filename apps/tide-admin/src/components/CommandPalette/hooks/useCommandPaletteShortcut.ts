"use client";

import { useEffect } from "react";

/** ⌘K(Windows·Linux는 Ctrl+K)를 누르면 `onToggle`을 부른다. 브라우저 기본 동작은 막는다. */
export function useCommandPaletteShortcut(onToggle: () => void): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return;
      if (event.key.toLowerCase() !== "k") return;

      event.preventDefault();
      onToggle();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onToggle]);
}
