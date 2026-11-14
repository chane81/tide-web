import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { createPageMetadata } from "@/libs/createPageMetadata";

import { ShowcaseCredits } from "./_src/components/ShowcaseCredits";
import { ShowcaseHero } from "./_src/components/ShowcaseHero";
import { ShowcaseLayersSection } from "./_src/components/ShowcaseLayersSection";
import { ShowcaseStepsSection } from "./_src/components/ShowcaseStepsSection";

export const metadata = createPageMetadata({
  title: "작업 장면: 화면을 만드는 팀의 디자인 시스템 tide",
  description:
    "스케치, 코드, 키보드 검사까지 화면을 만드는 세 장면에서 tide Component 이름을 어떻게 이어 쓰는지 사진과 함께 보여 줍니다.",
});

/*
  design-taste-frontend 배정: hero film(영상이 없어 재생 단추 없이 사진 한 장), moment word-highlight(#layers).
  사진 네 장은 Wikimedia Commons 대역(stand-in)이고 출처는 푸터 credits 한 줄에 있다.
  렌더: 요청 데이터가 없어 기본 프리렌더(○ Static).
*/
export default function ShowcasePage() {
  return (
    <>
      <SiteNav current="/showcase" />
      <main id="top">
        <ShowcaseHero />
        <ShowcaseStepsSection />
        <ShowcaseLayersSection />
      </main>
      <SiteFooter credits={<ShowcaseCredits />} />
    </>
  );
}
