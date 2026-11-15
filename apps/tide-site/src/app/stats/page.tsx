import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { createPageMetadata } from "@/libs/createPageMetadata";

import { StatsHero } from "./_src/components/StatsHero";
import { StatsSourceSection } from "./_src/components/StatsSourceSection";

export const metadata = createPageMetadata({
  title: "npm 현황: tide 패키지 세 개의 버전과 다운로드 수",
  description:
    "@tide-design/components·icons·foundation의 최신 버전과 지난 7일 다운로드 수를 npm 공개 API에서 요청마다 읽어 보여 줍니다.",
});

/*
  design-taste-frontend 배정: hero collage, moment liquid-type(#source). nav·footer·close·buttons·mark는 소개 페이지와 같다.
  렌더: 요청마다 그린다. 정책은 데이터의 주인인 getNpmPackages()의 connection()에 있고,
  히어로의 <Suspense>(fallback tide Skeleton)가 그 경계다. 나머지는 프리렌더 셸이다(◐ Partial Prerender).
*/
export default function StatsPage() {
  return (
    <>
      <SiteNav current="/stats" />
      <main id="top">
        <StatsHero />
        <StatsSourceSection />
      </main>
      <SiteFooter />
    </>
  );
}
