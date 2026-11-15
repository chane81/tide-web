import type { Theme } from "./theme";

/**
 * hydration 전에 `<html data-theme>`를 정하는 인라인 스크립트 본문을 만든다(첫 렌더 깜빡임 방지).
 * 브라우저가 HTML을 읽는 중에 바로 실행되므로 import 없이 혼자 돌아야 한다.
 * 판단 규칙은 `resolveTheme`과 같다: 저장된 light·dark → 그 값, 없으면 `defaultTheme`, 그것도 없으면 `prefers-color-scheme`.
 */
export function createThemeInitScript(storageKey: string, defaultTheme?: Theme): string {
  const fallback = defaultTheme
    ? JSON.stringify(defaultTheme)
    : `window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"`;

  return `(function(){try{var t=localStorage.getItem(${JSON.stringify(storageKey)});if(t!=="light"&&t!=="dark"){t=${fallback}}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
}
