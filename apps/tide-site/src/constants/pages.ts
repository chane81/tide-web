/** 사이트의 페이지. 내비·푸터가 같은 목록을 쓴다. */
export const SITE_PAGES = [
  { href: "/", label: "소개" },
  { href: "/showcase", label: "작업 장면" },
  { href: "/catalog", label: "패키지" },
  { href: "/stats", label: "npm 현황" },
] as const;

/** 사이트 페이지 주소. 내비가 현재 페이지(`aria-current="page"`)를 고를 때 쓴다. */
export type SitePath = (typeof SITE_PAGES)[number]["href"];
