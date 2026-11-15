/** 소개 페이지(`/`)의 구역 id와 이름. 다른 페이지에서도 가도록 링크는 `/#id`로 적는다. */
export const SECTIONS = [
  { id: "components", label: "컴포넌트" },
  { id: "theme", label: "테마" },
  { id: "access", label: "접근성" },
  { id: "install", label: "설치" },
  { id: "faq", label: "질문" },
] as const;

/** 주 행동. 내비·히어로·마무리에서 같은 말로 쓴다. 어느 페이지에서든 소개 페이지의 설치 구역으로 간다. */
export const MAIN_ACTION = { label: "tide 설치하기", href: "/#install" } as const;
