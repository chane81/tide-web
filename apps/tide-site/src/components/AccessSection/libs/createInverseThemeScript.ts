/**
 * 반대 테마 구역의 인라인 스크립트 본문. 구역 끝에서 실행되어, 페이지 테마의 반대를 그 구역 data-theme에 붙인다.
 * HTML을 읽는 중에 실행되므로 그리기 전에 맞는 색이 된다. 이후 바뀜은 `InverseThemeSync`가 따라간다.
 */
export function createInverseThemeScript(): string {
  return `(function(s){if(!s)return;var d=document.documentElement.getAttribute("data-theme")==="dark";s.setAttribute("data-theme",d?"light":"dark")})(document.currentScript&&document.currentScript.closest("[data-inverse-theme]"))`;
}
