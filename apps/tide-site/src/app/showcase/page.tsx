import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { createPageMetadata } from "@/libs/createPageMetadata";

import { ShowcaseHero } from "./_src/components/ShowcaseHero";
import { ShowcaseLayersSection } from "./_src/components/ShowcaseLayersSection";
import { ShowcaseScenesSection } from "./_src/components/ShowcaseScenesSection";

export const metadata = createPageMetadata({
  title: "쇼케이스: 화면 조각으로 보는 React 디자인 시스템 tide",
  description:
    "tide Component로 그린 화면 조각과 대비·색 기준을 빛 바탕 위 카드로 모았습니다. Component 35종, WCAG 2.2 AA.",
});

/*
  design-taste-frontend 배정: hero centred(처음 배정 film은 사진이 필요해 사진을 빼며 다시 배정), moment word-highlight(#layers).
  그림은 사진 대신 빛 번짐 판 위에 뜬 흰 카드(사용자 참고: 밝은 B2B 사이트의 후기 카드 장면). 카드에는 실제 tide 조각과
  tide 사실만 넣고, 사람 이름·후기는 넣지 않는다.
  렌더: 요청 데이터가 없어 기본 프리렌더(○ Static).
*/
export default function ShowcasePage() {
  return (
    <>
      <SiteNav current="/showcase" />
      <main id="top">
        <ShowcaseHero />
        <ShowcaseScenesSection />
        <ShowcaseLayersSection />
      </main>
      <SiteFooter />
    </>
  );
}
