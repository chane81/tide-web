"use client";

import { type Theme, resolveTheme } from "@tide-web/libs";
import { Switch } from "@tide-design/components";
import { type JSX, useLayoutEffect, useSyncExternalStore } from "react";

export interface ThemeToggleProps {
  /** 선택을 저장할 localStorage 키. 앱마다 정한다. */
  storageKey: string;
  /** 저장된 선택이 없을 때의 테마. 없으면 운영체제 설정을 따른다. 인라인 스크립트(`createThemeInitScript`)와 같은 값을 넘긴다. */
  defaultTheme?: Theme;
  /** 스위치 이름 */
  label?: string;
}

const root = () => document.documentElement;

/** `<html data-theme>`이 바뀌면 알린다. 인라인 스크립트·다른 토글이 바꿔도 따라간다. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributes: true, attributeFilter: ["data-theme"] });

  return () => observer.disconnect();
}

const getSnapshot = (): Theme => (root().getAttribute("data-theme") === "dark" ? "dark" : "light");

function readStoredTheme(storageKey: string) {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

/** 테마를 바꾸고 선택을 저장한다. */
function applyTheme(storageKey: string, next: Theme) {
  root().setAttribute("data-theme", next);
  try {
    localStorage.setItem(storageKey, next);
  } catch {
    // 저장소를 못 쓰면(사생활 보호 모드 등) 이번 방문에만 적용한다.
  }
}

/** 다크 테마 스위치. 누르면 `<html data-theme>`을 바꾸고 선택을 저장한다. */
export function ThemeToggle({
  storageKey,
  defaultTheme,
  label = "다크 테마",
}: ThemeToggleProps): JSX.Element {
  // 서버는 테마를 모른다. 기본 테마(없으면 light)로 그리고 hydration 직후 실제 값으로 다시 그린다.
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => defaultTheme ?? "light");

  // 개발 모드 Strict Mode 재마운트가 `<html>`의 속성을 지우므로 다시 붙인다. 프로덕션에서는 값이 같아 아무 일도 없다.
  useLayoutEffect(() => {
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    root().setAttribute(
      "data-theme",
      resolveTheme(readStoredTheme(storageKey), prefersDark, defaultTheme),
    );
  }, [storageKey, defaultTheme]);

  return (
    <Switch
      size="sm"
      checked={theme === "dark"}
      onChange={(event) => applyTheme(storageKey, event.currentTarget.checked ? "dark" : "light")}
    >
      {label}
    </Switch>
  );
}
