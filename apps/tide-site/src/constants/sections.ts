/** 페이지 구역 id와 내비 이름. 내비·푸터가 같은 목록을 쓴다. */
export const SECTIONS = [
  { id: "components", label: "컴포넌트" },
  { id: "theme", label: "테마" },
  { id: "access", label: "접근성" },
  { id: "install", label: "설치" },
  { id: "faq", label: "질문" },
] as const;

/** 주 행동. 내비·히어로·마무리에서 같은 말로 쓴다. */
export const MAIN_ACTION = { label: "tide 설치하기", href: "#install" } as const;
