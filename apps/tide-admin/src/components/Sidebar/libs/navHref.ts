/** `https://…`처럼 앱 바깥으로 나가는 주소인지 본다. */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/** `/`와 `exact`는 정확히 같을 때만, 나머지는 하위 경로까지 활성으로 본다. 바깥 주소는 활성이 아니다. */
export function isNavHrefActive(href: string, pathname: string, exact = false): boolean {
  if (isExternalHref(href)) return false;
  if (href === "/" || exact) return pathname === href;

  return pathname === href || pathname.startsWith(`${href}/`);
}
