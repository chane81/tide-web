import type { TidePackage } from "./packages.types";

/** tide 패키지 세 개. 사실은 tide README와 node_modules/@tide-design/*의 package.json·dist에서 확인했다(0.15.0). */
export const packagesMock: TidePackage[] = [
  {
    id: "components",
    name: "@tide-design/components",
    summary:
      "React Component 34종과 앱이 불러올 styles.css가 들어 있습니다. react-aria 위에 만들었습니다.",
    install: "pnpm add @tide-design/components",
    note: null,
  },
  {
    id: "icons",
    name: "@tide-design/icons",
    summary: "아이콘 Component 2,029개입니다. 이름은 PlusIcon처럼 Icon으로 끝납니다.",
    install: "pnpm add @tide-design/icons",
    note: null,
  },
  {
    id: "foundation",
    name: "@tide-design/foundation",
    summary: "Token, Tailwind 연결 CSS, 앱 브랜드 색을 만드는 tide-color CLI가 들어 있습니다.",
    install: null,
    note: "components를 설치하면 함께 들어옵니다.",
  },
];
