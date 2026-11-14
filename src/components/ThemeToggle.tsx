"use client";

import { Switch } from "@tide-design/components";
import { useLayoutEffect, useSyncExternalStore } from "react";

import { THEME_STORAGE_KEY } from "@/constants/theme";
import { type Theme, resolveTheme } from "@/libs/theme";

const root = () => document.documentElement;

/** `<html data-theme>`이 바뀌면 알린다. 인라인 스크립트·다른 토글이 바꿔도 따라간다. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributes: true, attributeFilter: ["data-theme"] });

  return () => observer.disconnect();
}

const getSnapshot = (): Theme => (root().getAttribute("data-theme") === "dark" ? "dark" : "light");
// 서버는 테마를 모른다. hydration 직후 실제 값으로 다시 그린다.
const getServerSnapshot = (): Theme => "light";

function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

/** 테마를 바꾸고 선택을 저장한다. */
function applyTheme(next: Theme) {
  root().setAttribute("data-theme", next);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // 저장소를 못 쓰면(사생활 보호 모드 등) 이번 방문에만 적용한다.
  }
}

/** 다크 테마 스위치. 누르면 `<html data-theme>`을 바꾸고 선택을 저장한다. */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // 개발 모드 Strict Mode 재마운트가 `<html>`의 속성을 지우므로 다시 붙인다. 프로덕션에서는 값이 같아 아무 일도 없다.
  useLayoutEffect(() => {
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    root().setAttribute("data-theme", resolveTheme(readStoredTheme(), prefersDark));
  }, []);

  return (
    <Switch
      size="sm"
      checked={theme === "dark"}
      onChange={(event) => applyTheme(event.currentTarget.checked ? "dark" : "light")}
    >
      다크 테마
    </Switch>
  );
}
